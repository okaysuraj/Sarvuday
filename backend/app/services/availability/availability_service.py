"""Availability writes serialize by counsellor and preserve booked clinical history."""
from datetime import datetime, timezone
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import Appointment, Counsellor, CounsellorAvailability
from app.schemas import AddAvailabilitySlot, AvailableSlot, AvailableSlotsResponse, UpdateAvailabilitySlot
from app.utils.constants import CounsellorAvailabilityStatusEnum
from app.utils.unique_id_generation import generate_available_slot_id


def utc_naive(value):
    return value.astimezone(timezone.utc).replace(tzinfo=None) if value.tzinfo else value


class CounsellorAvailabilityService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_availability_slots(self, counsellor_id: str):
        await self._check_counsellor_eligibility(counsellor_id)
        records = (await self.db.execute(select(CounsellorAvailability)
            .where(CounsellorAvailability.counsellor_id == counsellor_id)
            .order_by(CounsellorAvailability.start_time).limit(500))).scalars().all()
        return AvailableSlotsResponse(slots=[AvailableSlot.model_validate(record) for record in records])

    async def _check_counsellor_eligibility(self, counsellor_id, *, lock=False):
        query = select(Counsellor).where(Counsellor.user_id == counsellor_id)
        if lock:
            query = query.with_for_update()
        counsellor = (await self.db.execute(query)).scalar_one_or_none()
        if counsellor is None:
            raise HTTPException(status_code=404, detail="Counsellor not found")
        if not counsellor.is_email_verified and not counsellor.is_phone_verified:
            raise HTTPException(status_code=403, detail="Counsellor account verification is required")
        if not counsellor.is_approved:
            raise HTTPException(status_code=403, detail="Counsellor approval is required")
        return counsellor

    def _validate_times(self, start, end):
        start, end = utc_naive(start), utc_naive(end)
        if start >= end:
            raise HTTPException(status_code=422, detail="Start time must be before end time")
        if start <= datetime.now(timezone.utc).replace(tzinfo=None):
            raise HTTPException(status_code=422, detail="Availability must start in the future")
        return start, end

    async def _assert_no_overlap(self, counsellor_id, start, end, exclude_id=None):
        query = select(CounsellorAvailability.availability_slot_id).where(
            CounsellorAvailability.counsellor_id == counsellor_id,
            CounsellorAvailability.start_time < end, CounsellorAvailability.end_time > start,
        )
        if exclude_id is not None:
            query = query.where(CounsellorAvailability.availability_slot_id != exclude_id)
        if (await self.db.execute(query.limit(1))).first():
            raise HTTPException(status_code=409, detail="Time slot overlaps with existing availability")

    async def add_availability_slot(self, counsellor_id: str, availability_data: AddAvailabilitySlot):
        # Lock a stable parent row even when no availability rows exist yet.
        await self._check_counsellor_eligibility(counsellor_id, lock=True)
        start, end = self._validate_times(availability_data.start_time, availability_data.end_time)
        await self._assert_no_overlap(counsellor_id, start, end)
        if availability_data.status == CounsellorAvailabilityStatusEnum.booked:
            raise HTTPException(status_code=422, detail="Only the booking workflow can book an availability slot")
        record = CounsellorAvailability(availability_slot_id=generate_available_slot_id(),
            counsellor_id=counsellor_id, start_time=start, end_time=end,
            notes=availability_data.notes, status=availability_data.status or CounsellorAvailabilityStatusEnum.available)
        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        return AvailableSlot.model_validate(record)

    async def _owned_slot(self, counsellor_id, slot_id):
        record = (await self.db.execute(select(CounsellorAvailability).where(
            CounsellorAvailability.availability_slot_id == slot_id,
            CounsellorAvailability.counsellor_id == counsellor_id,
        ).with_for_update())).scalar_one_or_none()
        if record is None:
            raise HTTPException(status_code=404, detail="Availability slot not found")
        if record.status == CounsellorAvailabilityStatusEnum.booked:
            raise HTTPException(status_code=409, detail="Booked slots cannot be changed")
        if record.is_locked and record.locked_until and utc_naive(record.locked_until) > datetime.now(timezone.utc).replace(tzinfo=None):
            raise HTTPException(status_code=409, detail="Availability is currently locked")
        if (await self.db.execute(select(Appointment.appointment_id).where(
                Appointment.availability_slot_id == slot_id).limit(1))).first():
            raise HTTPException(status_code=409, detail="Slots with appointment history cannot be changed")
        return record

    async def update_availability_slot(self, counsellor_id: str, slot_id: str, update_slot_data: UpdateAvailabilitySlot):
        await self._check_counsellor_eligibility(counsellor_id, lock=True)
        record = await self._owned_slot(counsellor_id, slot_id)
        values = update_slot_data.model_dump(exclude_unset=True)
        if values.get("start_time", record.start_time) is None or values.get("end_time", record.end_time) is None:
            raise HTTPException(status_code=422, detail="Availability times cannot be cleared")
        start, end = self._validate_times(values.get("start_time", record.start_time),
                                           values.get("end_time", record.end_time))
        await self._assert_no_overlap(counsellor_id, start, end, exclude_id=slot_id)
        record.start_time, record.end_time = start, end
        if "notes" in values:
            record.notes = values["notes"]
        await self.db.commit()
        await self.db.refresh(record)
        return AvailableSlot.model_validate(record)

    async def remove_availability_slot(self, counsellor_id: str, slot_id: str):
        await self._check_counsellor_eligibility(counsellor_id, lock=True)
        record = await self._owned_slot(counsellor_id, slot_id)
        await self.db.delete(record)
        await self.db.commit()
        return True
