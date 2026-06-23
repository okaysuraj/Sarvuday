# app/services/appointments/appointment_service.py

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone
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
from app.models import Appointment, NormalUser, Counsellor
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
from .dummy_payment import create_dummy_user_payment
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

        # TODO: Integrate payment logic here before booking
        # ✅ Create a dummy payment
        payment_id = await create_dummy_user_payment(self.db, user_id)

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
        appointment = await self.db.get(Appointment, appointment_id)
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")

        await validate_user_access_to_appointment(user_type, user_id, appointment)

        return await cancel_appointment_logic(
            self.db,
            appointment,
            reason
        )
