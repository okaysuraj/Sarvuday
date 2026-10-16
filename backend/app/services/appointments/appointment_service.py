# app/services/appointments/appointment_service.py

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from app.utils.constants import UserTypeEnum
from app.schemas import (
    AppointmentBase,
    AppointmentListResponse,
    AvailableSlotsResponse,
    CreateAppointmentRequest,
    CreateAppointmentResponse,
    CancelAppointmentResponse,
    AppointmentBase
)
from app.models import Appointment, NormalUser, Counsellor, UserPayment
from sqlalchemy import select
from decimal import Decimal
from starlette.concurrency import run_in_threadpool
from app.services.payments.stripe_service import require_stripe, reconcile_intent
from app.config import settings
from .fetchers import (
    fetch_appointment_list,
    fetch_available_slots,
    fetch_appointment_details
)
from .validators import (
    validate_user_access_to_appointment,
    validate_slot_availability
)
from .creators import (
    create_appointment_record
)
from .utils import cancel_appointment_logic


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
        offset: int = 0
    ) -> AppointmentListResponse:
        return await fetch_appointment_list(
            self.db, user_type, user_id, status, upcoming, limit, offset
        )
    
    async def get_appointment_details(
        self,
        current_user: NormalUser | Counsellor,
        appointment_id: str
    ) -> AppointmentBase:
        return await fetch_appointment_details(
            self.db, current_user, appointment_id
        )

    async def get_available_slots(
        self,
        counsellor_id: str,
        date: datetime = None
    ) -> AvailableSlotsResponse:
        return await fetch_available_slots(
            self.db, counsellor_id, date
        )

    async def book_appointment(
        self,
        user_id: str,
        booking_data: CreateAppointmentRequest
    ) -> CreateAppointmentResponse:
        
        slot = await validate_slot_availability(self.db, booking_data)

        counsellor = await self.db.get(Counsellor, slot.counsellor_id)
        if counsellor.session_fee is None:
            raise HTTPException(status_code=409, detail="Session pricing is unavailable")
        fee = Decimal(str(counsellor.session_fee)).quantize(Decimal("0.01"))
        if fee < 0:
            raise HTTPException(status_code=409, detail="Session pricing is invalid")
        payment_id = None
        if fee > 0:
            if not booking_data.payment_id:
                raise HTTPException(status_code=402, detail="A verified payment is required")
            result = await self.db.execute(select(UserPayment).where(
                UserPayment.payment_id == booking_data.payment_id,
                UserPayment.user_id == user_id,
            ).with_for_update())
            payment = result.scalar_one_or_none()
            if not payment or payment.payment_gateway != "STRIPE" or Decimal(str(payment.amount)) != fee:
                raise HTTPException(status_code=409, detail="Payment does not match this booking")
            expected = payment.payment_response or {}
            if expected.get("availability_slot_id") != slot.availability_slot_id or expected.get("counsellor_id") != slot.counsellor_id:
                raise HTTPException(status_code=409, detail="Payment belongs to a different session")
            reused = await self.db.execute(select(Appointment.appointment_id).where(Appointment.payment_id == payment.payment_id))
            if reused.first():
                raise HTTPException(status_code=409, detail="Payment is already attached to a booking")
            stripe = require_stripe()
            try:
                intent = await run_in_threadpool(stripe.PaymentIntent.retrieve, payment.transaction_id,
                                                api_key=settings.stripe_secret_key, expand=["latest_charge"])
            except stripe.StripeError:
                raise HTTPException(status_code=502, detail="Payment provider is temporarily unavailable")
            reconcile_intent(payment, intent, require_unreversed_charge=True)
            payment_id = payment.payment_id

        booked_appointment = await create_appointment_record(self.db, user_id, slot, booking_data, payment_id)
        
        # ✅ Commit the transaction to persist the appointment, session, and payment
        await self.db.commit()

        return CreateAppointmentResponse(
            message="Appointment Booked Successfully",
            appointment=AppointmentBase.model_validate(booked_appointment)
        )
        
    async def cancel_appointment(
        self,
        user_type: UserTypeEnum,
        user_id: str,
        appointment_id: str,
        reason: str = None
    ) -> CancelAppointmentResponse:
        appointment = (await self.db.execute(select(Appointment).where(
            Appointment.appointment_id == appointment_id).with_for_update())).scalar_one_or_none()
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")

        await validate_user_access_to_appointment(user_type, user_id, appointment)

        return await cancel_appointment_logic(
            self.db,
            appointment,
            reason
        )
