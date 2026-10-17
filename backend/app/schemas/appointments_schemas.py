"""Request validation and response models for appointments."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.schemas.dates import UTCDateTime
from app.utils.constants import AppointmentStatusEnum, GenderEnum, PaymentStatusEnum


# NormalUser Base View for Appointments
class NormalUserAppointmentView(BaseModel):
    user_id: str
    name: str
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None

    model_config = {"from_attributes": True}


class CounsellorAppointmentView(BaseModel):
    user_id: str
    name: str
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None

    # Platform engagement
    average_rating: float = 0.0
    total_reviews: int = 0
    is_featured: bool = False

    model_config = {"from_attributes": True}


class SessionAppointmentView(BaseModel):
    session_id: str
    session_scheduled_at: UTCDateTime
    session_expires_at: UTCDateTime

    model_config = {"from_attributes": True}


class AppointmentBase(BaseModel):
    appointment_id: str
    status: AppointmentStatusEnum
    availability_slot_id: str
    payment_id: Optional[str] = None
    reason: Optional[str] = None
    created_at: datetime
    session: SessionAppointmentView
    user: NormalUserAppointmentView
    counsellor: CounsellorAppointmentView

    model_config = {"from_attributes": True}


class CreateAppointmentRequest(BaseModel):
    counsellor_id: str
    availability_slot_id: str
    reason: Optional[str] = None
    payment_id: Optional[str] = None


class CreateAppointmentResponse(BaseModel):
    message: str
    appointment: AppointmentBase


class AppointmentListResponse(BaseModel):
    total_count: int
    appointments: List[AppointmentBase]


class CancelAppointmentResponse(BaseModel):
    message: str
    appointment_id: str
    cancelled_at: datetime
    refund_status: str = PaymentStatusEnum.pending
    refund_payment_id: Optional[str] = None
