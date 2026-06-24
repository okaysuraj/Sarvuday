from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.models import Appointment, CounsellorAvailability
from app.utils.constants import AppointmentStatusEnum, CounsellorAvailabilityStatusEnum
from app.utils.unique_id_generation import generate_appointment_id
from app.schemas import (
    CreateAppointmentRequest,
    AppointmentBase,
    SessionAppointmentView,
    NormalUserAppointmentView,
    CounsellorAppointmentView
)
from app.services.counselling_services.counselling_service import CounsellingSessionService


async def create_appointment_record(
    db: AsyncSession,
    user_id: str,
    slot: CounsellorAvailability,
    booking_data: CreateAppointmentRequest,
    payment_id: str
) -> AppointmentBase:
    appointment_id = generate_appointment_id()
    
    session = await CounsellingSessionService(db).create_counselling_session(
        user_id=user_id,
        counsellor_id=booking_data.counsellor_id,
        appointment_id=appointment_id,
        availability_slot=slot
    )

    appointment = Appointment(
        appointment_id=appointment_id,
        availability_slot_id=slot.availability_slot_id,
        session_id=session.session_id,
        status=AppointmentStatusEnum.confirmed,
        reason=booking_data.reason,
        created_at=datetime.now(timezone.utc),
        user_id=user_id,
        counsellor_id=slot.counsellor_id,
        payment_id=payment_id
    )

    # Update slot status
    slot.status = CounsellorAvailabilityStatusEnum.booked

    # Add to session
    db.add_all([appointment, slot])

    # Flush to generate IDs and make objects persistent
    await db.flush()

    # Query with relationships (appointment is now persistent)
    result = await db.execute(
        select(Appointment)
        .options(
            selectinload(Appointment.user),
            selectinload(Appointment.counsellor)
        )
        .where(Appointment.appointment_id == appointment_id)
    )
    full_appointment = result.scalar_one()

    return AppointmentBase(
        appointment_id=full_appointment.appointment_id,
        status=full_appointment.status,
        availability_slot_id=full_appointment.availability_slot_id,
        payment_id=full_appointment.payment_id,
        reason=full_appointment.reason,
        created_at=full_appointment.created_at,
        session=SessionAppointmentView.model_validate(session),
        user=NormalUserAppointmentView.model_validate(full_appointment.user),
        counsellor=CounsellorAppointmentView.model_validate(full_appointment.counsellor)
    )

