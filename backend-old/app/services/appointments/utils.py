# app/services/appointments/utils.py

from datetime import datetime, timezone
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import CancelAppointmentResponse
from app.models import Appointment, CounsellorAvailability
from app.utils.constants import AppointmentStatusEnum, PaymentStatusEnum, CounsellorAvailabilityStatusEnum


async def cancel_appointment_logic(
    db: AsyncSession,
    appointment: Appointment,
    reason: str = None
) -> datetime:
    if appointment.status == AppointmentStatusEnum.cancelled:
        raise HTTPException(status_code=400, detail="Appointment already cancelled")

    slot = await db.get(CounsellorAvailability, appointment.availability_slot_id)
    if slot:
        slot.status = CounsellorAvailabilityStatusEnum.available
        db.add(slot)

    appointment.status = AppointmentStatusEnum.cancelled
    if reason:
        appointment.cancellation_reason = reason

    db.add(appointment)
    await db.commit()
    
    refund_payment_id = None
    refund_status = PaymentStatusEnum.pending
    
    # TODO: Trigger refund process if integrated
    
    if refund_payment_id:
        refund_status = PaymentStatusEnum.refunded

    return CancelAppointmentResponse(
        message="Appointment cancelled successfully",
        appointment_id=appointment.appointment_id,
        cancelled_at=datetime.now(timezone.utc),
        refund_status=refund_status,
        refund_payment_id=refund_payment_id
    )

