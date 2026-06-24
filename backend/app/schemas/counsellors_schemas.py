# app/schemas/counsellors_schemas.py

from pydantic import BaseModel, EmailStr, Field, Json
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
from app.utils.constants import (
    GenderEnum
)
from typing import Literal

# Common sorting types for counsellor queries
CounsellorSortBy = Literal["created_at", "name", "session_fee", "experience_years", "average_rating"]
SortOrder = Literal["asc", "desc"]

# Counsellor Base
class CounsellorBase(BaseModel):
    user_id: str
    email: EmailStr
    name: str
    gender: Optional[GenderEnum]
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    profile_pic: Optional[str]
    bio: Optional[str]

    certifications: Optional[List[str]]
    specializations: Optional[List[str]]
    education_qualifications: Optional[List[str]]
    languages: Optional[List[str]]

    session_fee: Optional[float] = Field(0.0, ge=0)
    session_duration: Optional[int] = Field(0, ge=0)
    experience_years: Optional[int] = Field(0, ge=0)

    country: Optional[str]
    state: Optional[str]
    city: Optional[str]

    average_rating: float = 0.0
    total_reviews: int = 0
    is_email_verified: bool = False
    is_phone_verified: bool = False
    is_approved: bool = False
    is_featured: bool = False

    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            Decimal: lambda v: float(v) if v is not None else None
        }

# Admin View
class CounsellorAdminView(CounsellorBase):
    approved_by: Optional[str]
    address: Optional[str]
    pincode: Optional[str]

    license_number: Optional[str]
    license_issuing_authority: Optional[str]
    license_expiry_date: Optional[datetime]
    identity_proof_url: Optional[str]
    license_proof_url: Optional[str]

    terms_accepted: bool = False
    privacy_policy_accepted: bool = False

# Web View
class CounsellorWebView(BaseModel):
    user_id: str
    name: str
    gender: Optional[GenderEnum]
    profile_pic: Optional[str]
    bio: Optional[str]

    certifications: Optional[List[str]]
    specializations: Optional[List[str]]
    education_qualifications: Optional[List[str]]
    languages: Optional[List[str]]

    session_fee: Optional[float] = 0.0
    session_duration: Optional[int] = 0
    experience_years: Optional[int] = 0

    country: Optional[str]
    state: Optional[str]
    city: Optional[str]

    average_rating: float = 0.0
    total_reviews: int = 0
    is_featured: bool = False

    class Config:
        from_attributes = True
        json_encoders = {
            Decimal: lambda v: float(v) if v is not None else None
        }

# Update Request
class CounsellorUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None
    bio: Optional[str] = None

    certifications: Optional[List[str]] = None
    specializations: Optional[List[str]] = None
    education_qualifications: Optional[List[str]] = None
    languages: Optional[List[str]] = None

    license_number: Optional[str] = None
    license_issuing_authority: Optional[str] = None
    license_expiry_date: Optional[datetime] = None
    identity_proof_url: Optional[str] = None
    license_proof_url: Optional[str] = None

    session_fee: Optional[float] = None
    session_duration: Optional[int] = None
    experience_years: Optional[int] = None

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None

# Filter Query and Responses
class CounsellorFilterQuery(BaseModel):
    user_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[GenderEnum] = None
    is_approved: Optional[bool] = None
    is_email_verified: Optional[bool] = None
    is_phone_verified: Optional[bool] = None
    is_featured: Optional[bool] = None

    certifications: Optional[List[str]] = None
    specializations: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    min_experience: Optional[int] = None
    max_experience: Optional[int] = None
    min_fee: Optional[float] = None
    max_fee: Optional[float] = None

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None

    sort_by: Optional[Literal["created_at", "name", "session_fee", "experience_years", "average_rating"]] = "created_at"
    sort_order: Optional[Literal["asc", "desc"]] = "desc"
    limit: Optional[int] = 10
    offset: Optional[int] = 0

class CounsellorListResponse(BaseModel):
    total: int
    limit: int = 10
    offset: int = 0
    counsellors: List[CounsellorBase]

# Other Responses
class CounsellorUpdateResponse(BaseModel):
    message: str
    counsellor: CounsellorBase

class CounsellorApprovalResponse(BaseModel):
    message: str
    counsellor: CounsellorAdminView

class CounsellorListWebView(BaseModel):
    total_count: int
    counsellors: List[CounsellorWebView]

class CounsellorDashboardView(BaseModel):
    upcoming_appointments: int
    total_sessions: int
    recent_payments: int
    completion_rate: int
    average_rating: float
    patient_stats: Optional[Json] = None
    profile_completion: float
    revenue: float

