"""Fetchers business logic and persistence."""

from datetime import datetime, timedelta, timezone

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func

from app.models import (
    Appointment,
    CounsellingSession,
    Counsellor,
    CounsellorAvailability,
    NormalUser,
)
from app.schemas.appointments_schemas import (
    AppointmentBase,
    AppointmentListResponse,
    CounsellorAppointmentView,
    NormalUserAppointmentView,
    SessionAppointmentView,
)
from app.schemas.availability_schemas import AvailableSlot, AvailableSlotsResponse
from app.utils.constants import UserTypeEnum


async def fetch_appointment_details(
    db: AsyncSession, current_user: NormalUser | Counsellor, appointment_id: str
) -> AppointmentBase:
    # Base query
    stmt = (
        select(Appointment, CounsellingSession, NormalUser, Counsellor)
        .join(
            CounsellingSession, CounsellingSession.session_id == Appointment.session_id
        )
        .join(NormalUser, NormalUser.user_id == Appointment.user_id)
        .join(Counsellor, Counsellor.user_id == Appointment.counsellor_id)
        .where(Appointment.appointment_id == appointment_id)
    )

    # Restrict based on user type
    if isinstance(current_user, NormalUser):
        stmt = stmt.where(Appointment.user_id == current_user.user_id)
    elif isinstance(current_user, Counsellor):
        stmt = stmt.where(Appointment.counsellor_id == current_user.user_id)
    else:
        raise HTTPException(status_code=403, detail="Unauthorized user type")

    # Execute and validate
    result = await db.execute(stmt)
    row = result.first()

    if not row:
        raise HTTPException(
            status_code=404, detail="Appointment not found or access denied"
        )

    appointment, session, user, counsellor = row

    return AppointmentBase(
        appointment_id=appointment.appointment_id,
        status=appointment.status,
        availability_slot_id=appointment.availability_slot_id,
        payment_id=appointment.payment_id,
        reason=appointment.reason,
        created_at=appointment.created_at,
        session=SessionAppointmentView.model_validate(session),
        user=NormalUserAppointmentView.model_validate(user),
        counsellor=CounsellorAppointmentView.model_validate(counsellor),
    )


async def fetch_appointment_list(
    db: AsyncSession,
    user_type: UserTypeEnum,
    user_id: str,
    status: str = None,
    upcoming: bool = True,
    limit: int = 10,
    offset: int = 0,
) -> AppointmentListResponse:
    now = datetime.now(timezone.utc).replace(tzinfo=None)

    base_stmt = (
        select(Appointment, CounsellingSession, NormalUser, Counsellor)
        .join(
            CounsellingSession, CounsellingSession.session_id == Appointment.session_id
        )
        .join(NormalUser, NormalUser.user_id == Appointment.user_id)
        .join(Counsellor, Counsellor.user_id == Appointment.counsellor_id)
    )

    if user_type == UserTypeEnum.counsellor:
        base_stmt = base_stmt.where(Appointment.counsellor_id == user_id)
    elif user_type == UserTypeEnum.normal_user:
        base_stmt = base_stmt.where(Appointment.user_id == user_id)
    else:
        raise HTTPException(status_code=404, detail="Invalid User")

    if status:
        base_stmt = base_stmt.where(Appointment.status == status)

    if upcoming:
        base_stmt = base_stmt.where(CounsellingSession.session_scheduled_at > now)

    count_query = select(func.count()).select_from(base_stmt.subquery())
    total = (await db.execute(count_query)).scalar()

    result = await db.execute(
        base_stmt.order_by(CounsellingSession.session_scheduled_at)
        .offset(offset)
        .limit(limit)
    )

    appointments = []
    for appointment, session, user, counsellor in result.all():
        appointments.append(
            AppointmentBase(
                appointment_id=appointment.appointment_id,
                status=appointment.status,
                availability_slot_id=appointment.availability_slot_id,
                payment_id=appointment.payment_id,
                reason=appointment.reason,
                created_at=appointment.created_at,
                session=SessionAppointmentView.model_validate(session),
                user=NormalUserAppointmentView.model_validate(user),
                counsellor=CounsellorAppointmentView.model_validate(counsellor),
            )
        )

    return AppointmentListResponse(total_count=total, appointments=appointments)


async def fetch_available_slots(
    db: AsyncSession, counsellor_id: str, date: datetime = None
) -> AvailableSlotsResponse:
    if counsellor_id:
        counsellor = await db.get(Counsellor, counsellor_id)
        if not counsellor:
            raise HTTPException(status_code=404, detail="Counsellor not found")

    query = select(CounsellorAvailability).where(
        CounsellorAvailability.status == "available",
        CounsellorAvailability.start_time
        >= datetime.now(timezone.utc).replace(tzinfo=None),
    )

    if counsellor_id:
        query = query.where(CounsellorAvailability.counsellor_id == counsellor_id)

    if date:
        # The endpoint supplies a datetime. Dates are selected by their UTC
        # calendar day; naive values follow the existing UTC scheduling contract.
        target_date = (
            date.astimezone(timezone.utc).date() if date.tzinfo else date.date()
        )
        day_start = datetime.combine(target_date, datetime.min.time())
        query = query.where(
            CounsellorAvailability.start_time >= day_start,
            CounsellorAvailability.start_time < day_start + timedelta(days=1),
        )

    result = await db.execute(query.order_by(CounsellorAvailability.start_time))
    slots = result.scalars().all()

    return AvailableSlotsResponse(
        slots=[AvailableSlot.model_validate(slot) for slot in slots]
    )
