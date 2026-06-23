# app/schemas/availability_schemas.py

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.utils.constants import CounsellorAvailabilityStatusEnum

class AddAvailabilitySlot(BaseModel):
    start_time: datetime
    end_time: datetime
    status: Optional[CounsellorAvailabilityStatusEnum] = CounsellorAvailabilityStatusEnum.available
    notes: Optional[str] = None

class UpdateAvailabilitySlot(BaseModel):
    start_time: Optional[datetime]
    end_time: Optional[datetime]
    notes: Optional[str]

class AvailableSlot(BaseModel):
    availability_slot_id: str
    counsellor_id: str
    start_time: datetime
    end_time: datetime
    status: CounsellorAvailabilityStatusEnum
    notes: Optional[str] = None

    class Config:
        from_attributes = True

class AvailableSlotsResponse(BaseModel):
    slots: List[AvailableSlot]
