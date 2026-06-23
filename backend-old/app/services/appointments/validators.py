# app/services/appointments/validators.py

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.utils.constants import UserTypeEnum, CounsellorAvailabilityStatusEnum
from app.models import CounsellorAvailability, Appointment
from app.schemas import CreateAppointmentRequest


async def validate_slot_availability(
    db: AsyncSession,
    booking_data: CreateAppointmentRequest
) -> CounsellorAvailability:
    result = await db.execute(
        select(CounsellorAvailability).where(
            CounsellorAvailability.counsellor_id == booking_data.counsellor_id,
            CounsellorAvailability.availability_slot_id == booking_data.availability_slot_id
        )
    )
    slot = result.scalar_one_or_none()

    if not slot:
        raise HTTPException(status_code=404, detail="Time slot not found")

    if slot.status != CounsellorAvailabilityStatusEnum.available:
        raise HTTPException(status_code=400, detail="Time slot is no longer available")

    return slot


async def validate_user_access_to_appointment(user_type: UserTypeEnum, user_id: str, appointment: Appointment) -> None:
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
