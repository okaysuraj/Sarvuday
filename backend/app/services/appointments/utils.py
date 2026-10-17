"""Utils business logic and persistence."""

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Appointment, CounsellorAvailability
from app.schemas.appointments_schemas import CancelAppointmentResponse
from app.utils.constants import (
    AppointmentStatusEnum,
    CounsellorAvailabilityStatusEnum,
)


async def cancel_appointment_logic(
    db: AsyncSession, appointment: Appointment, reason: str = None
) -> CancelAppointmentResponse:
    if appointment.status not in (
        AppointmentStatusEnum.pending,
        AppointmentStatusEnum.confirmed,
    ):
        raise HTTPException(
            status_code=409, detail="Only an active appointment can be cancelled"
        )
    if appointment.payment_id:
        raise HTTPException(
            status_code=503,
            detail="Paid appointment cancellation is unavailable until verified refund handling is configured",
        )

    slot = (
        await db.execute(
            select(CounsellorAvailability)
            .where(
                CounsellorAvailability.availability_slot_id
                == appointment.availability_slot_id
            )
            .with_for_update()
        )
    ).scalar_one_or_none()
    if slot is None:
        raise HTTPException(status_code=409, detail="Appointment timing is unavailable")
    start = (
        slot.start_time.replace(tzinfo=timezone.utc)
        if slot.start_time.tzinfo is None
        else slot.start_time.astimezone(timezone.utc)
    )
    if start <= datetime.now(timezone.utc):
        raise HTTPException(
            status_code=409,
            detail="An appointment that has started cannot be cancelled",
        )
    slot.status = CounsellorAvailabilityStatusEnum.available
    db.add(slot)

    appointment.status = AppointmentStatusEnum.cancelled
    if reason:
        appointment.cancellation_reason = reason

    db.add(appointment)
    await db.commit()

    return CancelAppointmentResponse(
        message="Appointment cancelled successfully",
        appointment_id=appointment.appointment_id,
        cancelled_at=datetime.now(timezone.utc),
        refund_status="not_required",
        refund_payment_id=None,
    )
