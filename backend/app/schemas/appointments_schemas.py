# app/schemas/appointment_schemas.py

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.utils.constants import AppointmentStatusEnum, PaymentStatusEnum, GenderEnum


# NormalUser Base View for Appointments
class NormalUserAppointmentView(BaseModel):
    user_id: str
    name: str
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None

    class Config:
        from_attributes = True

class CounsellorAppointmentView(BaseModel):
    user_id: str
    name: str
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None
    
    # Platform engagement
    average_rating: float = 0.0
    total_reviews: int = 0
    is_featured: bool = False
    
    class Config:
        from_attributes = True

class SessionAppointmentView(BaseModel):
    session_id: str
    session_scheduled_at: datetime
    session_expires_at: datetime
    
    class Config:
        from_attributes = True
        
class AppointmentBase(BaseModel):
    appointment_id: str
    status: AppointmentStatusEnum
    availability_slot_id: str
    payment_id: str
    reason: Optional[str] = None
    created_at: datetime
    session: SessionAppointmentView
    user: NormalUserAppointmentView
    counsellor: CounsellorAppointmentView

    class Config:
        from_attributes = True
        
class CreateAppointmentRequest(BaseModel):
    counsellor_id: str
    availability_slot_id: str
    reason: Optional[str] = None

class CreateAppointmentResponse(BaseModel):
    message: str
    appointment: AppointmentBase
    
class AppointmentListResponse(BaseModel):
    total_count: int
    appointments: List[AppointmentBase]

class UpdateAppointmentRequest(BaseModel):
    appointment_id: str
    payment_id: str
    status: Optional[AppointmentStatusEnum] = None

class CancelAppointmentResponse(BaseModel):
    message: str
    appointment_id: str
    cancelled_at: datetime
    refund_status: str = PaymentStatusEnum.pending
    refund_payment_id: Optional[str] = None

class AppointmentFilterQuery(BaseModel):
    user_id: Optional[str] = None
    counsellor_id: Optional[str] = None
    status: Optional[AppointmentStatusEnum] = None
    from_date: Optional[datetime] = None
    to_date: Optional[datetime] = None
    include_past: bool = False
    include_cancelled: bool = False
    limit: Optional[int] = 10
    offset: Optional[int] = 0
