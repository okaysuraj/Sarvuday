"""Own booking and cancellation transactions; delegate read-only appointment queries."""

from datetime import datetime, timezone
from decimal import Decimal

from app.config import settings
from app.models import (
    Appointment,
    Counsellor,
    CounsellorAvailability,
    NormalUser,
    UserPayment,
)
from app.schemas.appointments_schemas import (
    AppointmentBase,
    AppointmentListResponse,
    CancelAppointmentResponse,
    CounsellorAppointmentView,
    CreateAppointmentRequest,
    CreateAppointmentResponse,
    NormalUserAppointmentView,
    SessionAppointmentView,
)
from app.schemas.availability_schemas import AvailableSlotsResponse
from app.services.counselling_services.counselling_service import (
    CounsellingSessionService,
)
from app.services.payments.stripe_service import reconcile_intent, require_stripe
from app.utils.constants import (
    AppointmentStatusEnum,
    CounsellorAvailabilityStatusEnum,
    UserTypeEnum,
)
from app.utils.unique_id_generation import generate_appointment_id
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from starlette.concurrency import run_in_threadpool

from .fetchers import (
    fetch_appointment_details,
    fetch_appointment_list,
    fetch_available_slots,
)
from .validators import validate_slot_availability, validate_user_access_to_appointment


class AppointmentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_appointments(
        self,
        user_type: UserTypeEnum,
        user_id: str,
        status: str = None,
        upcoming: bool = True,
        limit: int = 10,
        offset: int = 0,
    ) -> AppointmentListResponse:
        return await fetch_appointment_list(
            self.db, user_type, user_id, status, upcoming, limit, offset
        )

    async def get_appointment_details(
        self, current_user: NormalUser | Counsellor, appointment_id: str
    ) -> AppointmentBase:
        return await fetch_appointment_details(self.db, current_user, appointment_id)

    async def get_available_slots(
        self, counsellor_id: str, date: datetime = None
    ) -> AvailableSlotsResponse:
        return await fetch_available_slots(self.db, counsellor_id, date)

    async def book_appointment(
        self, user_id: str, booking_data: CreateAppointmentRequest
    ) -> CreateAppointmentResponse:

        slot = await validate_slot_availability(self.db, booking_data)

        counsellor = await self.db.get(Counsellor, slot.counsellor_id)
        if counsellor.session_fee is None:
            raise HTTPException(
                status_code=409, detail="Session pricing is unavailable"
            )
        fee = Decimal(str(counsellor.session_fee)).quantize(Decimal("0.01"))
        if fee < 0:
            raise HTTPException(status_code=409, detail="Session pricing is invalid")
        payment_id = None
        if fee > 0:
            if not booking_data.payment_id:
                raise HTTPException(
                    status_code=402, detail="A verified payment is required"
                )
            result = await self.db.execute(
                select(UserPayment)
                .where(
                    UserPayment.payment_id == booking_data.payment_id,
                    UserPayment.user_id == user_id,
                )
                .with_for_update()
            )
            payment = result.scalar_one_or_none()
            if (
                not payment
                or payment.payment_gateway != "STRIPE"
                or Decimal(str(payment.amount)) != fee
            ):
                raise HTTPException(
                    status_code=409, detail="Payment does not match this booking"
                )
            expected = payment.payment_response or {}
            if (
                expected.get("availability_slot_id") != slot.availability_slot_id
                or expected.get("counsellor_id") != slot.counsellor_id
            ):
                raise HTTPException(
                    status_code=409, detail="Payment belongs to a different session"
                )
            reused = await self.db.execute(
                select(Appointment.appointment_id).where(
                    Appointment.payment_id == payment.payment_id
                )
            )
            if reused.first():
                raise HTTPException(
                    status_code=409, detail="Payment is already attached to a booking"
                )
            stripe = require_stripe()
            try:
                intent = await run_in_threadpool(
                    stripe.PaymentIntent.retrieve,
                    payment.transaction_id,
                    api_key=settings.stripe_secret_key,
                    expand=["latest_charge"],
                )
            except stripe.StripeError:
                raise HTTPException(
                    status_code=502,
                    detail="Payment provider is temporarily unavailable",
                )
            reconcile_intent(payment, intent, require_unreversed_charge=True)
            payment_id = payment.payment_id

        booked_appointment = await self._create_appointment(
            user_id, slot, booking_data, payment_id
        )

        # ✅ Commit the transaction to persist the appointment, session, and payment
        await self.db.commit()

        return CreateAppointmentResponse(
            message="Appointment Booked Successfully",
            appointment=AppointmentBase.model_validate(booked_appointment),
        )

    async def cancel_appointment(
        self,
        user_type: UserTypeEnum,
        user_id: str,
        appointment_id: str,
        reason: str = None,
    ) -> CancelAppointmentResponse:
        appointment = (
            await self.db.execute(
                select(Appointment)
                .where(Appointment.appointment_id == appointment_id)
                .with_for_update()
            )
        ).scalar_one_or_none()
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")

        await validate_user_access_to_appointment(user_type, user_id, appointment)

        return await self._cancel_appointment(appointment, reason)

    async def _create_appointment(
        self,
        user_id: str,
        slot: CounsellorAvailability,
        booking_data: CreateAppointmentRequest,
        payment_id: str | None,
    ) -> AppointmentBase:
        appointment_id = generate_appointment_id()

        session = await CounsellingSessionService(self.db).create_counselling_session(
            user_id=user_id,
            counsellor_id=booking_data.counsellor_id,
            availability_slot=slot,
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
            payment_id=payment_id,
        )

        # Update slot status
        slot.status = CounsellorAvailabilityStatusEnum.booked

        # Add to session
        self.db.add_all([appointment, slot])

        # Flush to generate IDs and make objects persistent
        await self.db.flush()

        # Query with relationships (appointment is now persistent)
        result = await self.db.execute(
            select(Appointment)
            .options(
                selectinload(Appointment.user), selectinload(Appointment.counsellor)
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
            counsellor=CounsellorAppointmentView.model_validate(
                full_appointment.counsellor
            ),
        )

    async def _cancel_appointment(
        self, appointment: Appointment, reason: str = None
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
            await self.db.execute(
                select(CounsellorAvailability)
                .where(
                    CounsellorAvailability.availability_slot_id
                    == appointment.availability_slot_id
                )
                .with_for_update()
            )
        ).scalar_one_or_none()
        if slot is None:
            raise HTTPException(
                status_code=409, detail="Appointment timing is unavailable"
            )
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
        self.db.add(slot)

        appointment.status = AppointmentStatusEnum.cancelled
        if reason:
            appointment.cancellation_reason = reason

        self.db.add(appointment)
        await self.db.commit()

        return CancelAppointmentResponse(
            message="Appointment cancelled successfully",
            appointment_id=appointment.appointment_id,
            cancelled_at=datetime.now(timezone.utc),
            refund_status="not_required",
            refund_payment_id=None,
        )
