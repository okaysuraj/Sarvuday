"""Request validation and response models for prescription."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class PrescriptionBase(BaseModel):
    prescription_id: str
    session_id: str
    user_id: str
    counsellor_id: Optional[str] = None
    diagnosis: Optional[str] = None
    medications: Optional[List[dict]] = None
    recommendations: Optional[List[str]] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class PrescriptionListResponse(BaseModel):
    total_count: int
    prescriptions: List[PrescriptionBase]


class PrescriptionCreate(BaseModel):
    session_id: str
    user_id: str
    diagnosis: str = Field(min_length=1, max_length=20000)
    medications: List[dict] = Field(
        ...,
        json_schema_extra={
            "examples": [
                [{"name": "Medication A", "dosage": "10mg", "frequency": "daily"}]
            ]
        },
    )
    recommendations: List[str] = Field(
        ...,
        json_schema_extra={
            "examples": [["Follow up in 2 weeks", "Get blood work done"]]
        },
    )
