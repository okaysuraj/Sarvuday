# app/services/appointments/availability_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update
from sqlalchemy import select, and_, or_
from app.models import CounsellorAvailability, Counsellor
from app.schemas import AvailableSlotsResponse, AddAvailabilitySlot, UpdateAvailabilitySlot, AvailableSlot
from fastapi import HTTPException, status
from app.utils.unique_id_generation import generate_available_slot_id


class CounsellorAvailabilityService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_availability_slots(
        self,
        counsellor_id: str
    ) -> AvailableSlotsResponse:
        """Get all availability slots for counsellor"""
        # Check eligibility first
        await self._check_counsellor_eligibility(counsellor_id)
        
        result = await self.db.execute(
            select(CounsellorAvailability).where(
                CounsellorAvailability.counsellor_id == counsellor_id, 
            ).order_by(
                CounsellorAvailability.start_time
            )
        )
        slots = result.scalars().all()
        
        return AvailableSlotsResponse(
            slots=[AvailableSlot.model_validate(slot) for slot in slots]
        )

    async def add_availability_slot(
        self,
        counsellor_id: str,
        availability_data: AddAvailabilitySlot
    ) -> AvailableSlot:
        """Add new availability slot"""
        # Check eligibility first
        await self._check_counsellor_eligibility(counsellor_id)

        start_time = availability_data.start_time
        end_time = availability_data.end_time
        notes = availability_data.notes
        
        if start_time >= end_time:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start time must be before end time"
            )

        # Check for overlapping slots
        overlapping = await self.db.execute(
            select(CounsellorAvailability).where(
                and_(
                    CounsellorAvailability.counsellor_id == counsellor_id,
                    or_(
                        and_(
                            CounsellorAvailability.start_time < end_time,
                            CounsellorAvailability.end_time > start_time
                        )
                    )
                )
            )
        )
        
        if overlapping.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Time slot overlaps with existing availability"
            )

        availability_slot_id = generate_available_slot_id()
        
        slot = CounsellorAvailability(
            availability_slot_id=availability_slot_id,
            counsellor_id=counsellor_id,
            start_time=start_time,
            end_time=end_time,
            notes=notes
        )
        
        self.db.add(slot)
        await self.db.commit()
        await self.db.refresh(slot)
        
        return AvailableSlot.model_validate(slot)

    async def remove_availability_slot(
        self,
        counsellor_id: str,
        slot_id: str,
    ) -> bool:
        """Remove availability slot"""
        # Check eligibility first
        await self._check_counsellor_eligibility(counsellor_id)
        
        result = await self.db.execute(
            delete(CounsellorAvailability).where(
                and_(
                    CounsellorAvailability.availability_slot_id == slot_id,
                    CounsellorAvailability.counsellor_id == counsellor_id
                )
            )
        )
        await self.db.commit()
        return result.rowcount > 0

    async def update_availability_slot(
        self,
        counsellor_id: str,
        slot_id: str,
        update_slot_data: UpdateAvailabilitySlot
    ) -> AvailableSlot:
        """Update availability slot (optimized)"""
        # Check eligibility first
        await self._check_counsellor_eligibility(counsellor_id)

        # Get existing slot first for validation
        existing_slot = await self.db.execute(
            select(CounsellorAvailability).where(
                CounsellorAvailability.availability_slot_id == slot_id,
                CounsellorAvailability.counsellor_id == counsellor_id
            )
        )
        existing_slot = existing_slot.scalars().first()
        
        if not existing_slot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Slot not found or not owned by counsellor"
            )

        # Build update values dynamically
        update_values = update_slot_data.model_dump(exclude_unset=True)
        
        # Handle time validation
        start_time = update_values.get('start_time', existing_slot.start_time)
        end_time = update_values.get('end_time', existing_slot.end_time)
        
        if start_time >= end_time:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Start time must be before end time"
            )

        # Perform the update
        await self.db.execute(
            update(CounsellorAvailability)
            .where(
                CounsellorAvailability.availability_slot_id == slot_id,
                CounsellorAvailability.counsellor_id == counsellor_id
            )
            .values(**update_values)
        )
        await self.db.commit()
        # Refresh and return the updated object
        await self.db.refresh(existing_slot)
        return AvailableSlot.model_validate(existing_slot)
    
    async def _check_counsellor_eligibility(self, counsellor_id: str):
        """Check if counsellor exists, is verified, and approved"""
        counsellor = await self.db.execute(
            select(Counsellor).where(Counsellor.user_id == counsellor_id)
        )
        counsellor = counsellor.scalars().first()
        
        if not counsellor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Counsellor not found"
            )
        if not counsellor.is_email_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Counsellor account is not verified"
            )
        if not counsellor.is_approved:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Counsellor account is not approved by admin"
            )
        return True