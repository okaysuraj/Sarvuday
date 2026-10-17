"""Request validation and response models for availability."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field

from app.schemas.dates import UTCDateTime
from app.utils.constants import CounsellorAvailabilityStatusEnum


class AddAvailabilitySlot(BaseModel):
    start_time: datetime
    end_time: datetime
    status: Optional[CounsellorAvailabilityStatusEnum] = (
        CounsellorAvailabilityStatusEnum.available
    )
    notes: Optional[str] = Field(default=None, max_length=5000)


class UpdateAvailabilitySlot(BaseModel):
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    notes: Optional[str] = Field(default=None, max_length=5000)


class AvailableSlot(BaseModel):
    availability_slot_id: str
    counsellor_id: str
    start_time: UTCDateTime
    end_time: UTCDateTime
    status: CounsellorAvailabilityStatusEnum
    notes: Optional[str] = None

    model_config = {"from_attributes": True}


class AvailableSlotsResponse(BaseModel):
    slots: List[AvailableSlot]
