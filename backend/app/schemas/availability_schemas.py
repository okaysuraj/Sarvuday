# app/schemas/availability_schemas.py

from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime, timezone
from app.utils.constants import CounsellorAvailabilityStatusEnum

class AddAvailabilitySlot(BaseModel):
    start_time: datetime
    end_time: datetime
    status: Optional[CounsellorAvailabilityStatusEnum] = CounsellorAvailabilityStatusEnum.available
    notes: Optional[str] = Field(default=None, max_length=5000)

class UpdateAvailabilitySlot(BaseModel):
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    notes: Optional[str] = Field(default=None, max_length=5000)

class AvailableSlot(BaseModel):
    availability_slot_id: str
    counsellor_id: str
    start_time: datetime
    end_time: datetime
    status: CounsellorAvailabilityStatusEnum
    notes: Optional[str] = None

    @field_validator("start_time", "end_time", mode="before")
    @classmethod
    def explicit_utc_offset(cls, value):
        if isinstance(value, datetime):
            return value.astimezone(timezone.utc) if value.tzinfo else value.replace(tzinfo=timezone.utc)
        return value

    class Config:
        from_attributes = True

class AvailableSlotsResponse(BaseModel):
    slots: List[AvailableSlot]
