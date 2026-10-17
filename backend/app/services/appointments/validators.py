"""Validators business logic and persistence."""

from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Appointment, Counsellor, CounsellorAvailability
from app.schemas.appointments_schemas import CreateAppointmentRequest
from app.utils.constants import CounsellorAvailabilityStatusEnum, UserTypeEnum


async def validate_slot_availability(
    db: AsyncSession, booking_data: CreateAppointmentRequest
) -> CounsellorAvailability:
    result = await db.execute(
        select(CounsellorAvailability)
        .where(
            CounsellorAvailability.counsellor_id == booking_data.counsellor_id,
            CounsellorAvailability.availability_slot_id
            == booking_data.availability_slot_id,
        )
        .with_for_update()
    )
    slot = result.scalar_one_or_none()

    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")

    if slot.status != CounsellorAvailabilityStatusEnum.available:
        raise HTTPException(status_code=409, detail="Time slot is no longer available")

    start = (
        slot.start_time.replace(tzinfo=timezone.utc)
        if slot.start_time.tzinfo is None
        else slot.start_time
    )
    if start <= datetime.now(timezone.utc):
        raise HTTPException(status_code=409, detail="Time slot has already started")
    counsellor = await db.get(Counsellor, slot.counsellor_id)
    if not counsellor or not counsellor.is_approved:
        raise HTTPException(status_code=409, detail="Counsellor is unavailable")

    return slot


async def validate_user_access_to_appointment(
    user_type: UserTypeEnum, user_id: str, appointment: Appointment
) -> None:
    """
    Raises an HTTP 403 error if the current user does not have permission
    to access the given appointment.
    - Normal users can access only their own appointments.
    - Counsellors can access only appointments assigned to them.
    - Admins can access all appointments.
    """
    if user_type == UserTypeEnum.normal_user:
        if appointment.user_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to access this appointment.",
            )

    elif user_type == UserTypeEnum.counsellor:
        if appointment.counsellor_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You are not authorized to access this appointment.",
            )

    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this appointment.",
        )
