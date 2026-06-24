

from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


class PrescriptionBase(BaseModel):
    prescription_id: str
    session_id: str
    user_id: str
    counsellor_id: str
    diagnosis: str
    medications: List[dict]
    recommendations: List[str]
    created_at: datetime
    
    model_config = {"from_attributes": True} 

class PrescriptionListResponse(BaseModel):
    total_count: int
    prescriptions: List[PrescriptionBase]
    

class PrescriptionCreate(BaseModel):
    session_id: str
    user_id: str
    diagnosis: str
    medications: List[dict] = Field(
        ...,
        example=[{"name": "Medication A", "dosage": "10mg", "frequency": "daily"}]
    )
    recommendations: List[str] = Field(
        ...,
        example=["Follow up in 2 weeks", "Get blood work done"]
    )

