"""Request validation and response models for counsellors."""

from datetime import datetime
from typing import List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field, Json

from app.schemas.pagination import Pagination
from app.utils.constants import GenderEnum

# Common sorting types for counsellor queries
CounsellorSortBy = Literal[
    "created_at", "name", "session_fee", "experience_years", "average_rating"
]


# Counsellor Base
class CounsellorBase(BaseModel):
    user_id: str
    email: Optional[EmailStr] = None
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

    model_config = {"from_attributes": True}


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

    model_config = {"from_attributes": True}


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

    session_fee: Optional[float] = Field(default=None, ge=0)
    session_duration: Optional[int] = Field(default=None, ge=0)
    experience_years: Optional[int] = Field(default=None, ge=0)

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None


# Filter Query and Responses
class CounsellorFilterQuery(Pagination):
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
    min_experience: Optional[int] = Field(default=None, ge=0)
    max_experience: Optional[int] = Field(default=None, ge=0)
    min_fee: Optional[float] = Field(default=None, ge=0)
    max_fee: Optional[float] = Field(default=None, ge=0)

    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None

    sort_by: CounsellorSortBy = "created_at"


class CounsellorAdminView(CounsellorBase):
    """License metadata is available to reviewers, not the public directory."""

    license_number: Optional[str] = None
    license_issuing_authority: Optional[str] = None
    license_expiry_date: Optional[datetime] = None


class CounsellorListResponse(BaseModel):
    total: int
    limit: int = 10
    offset: int = 0
    counsellors: List[CounsellorAdminView]


# Other Responses
class CounsellorUpdateResponse(BaseModel):
    message: str
    counsellor: CounsellorBase


class CounsellorListWebView(BaseModel):
    total_count: int
    counsellors: List[CounsellorWebView]


class CounsellorDashboardView(BaseModel):
    upcoming_appointments: int
    total_sessions: int
    recent_payments: int
    completion_rate: float
    average_rating: Optional[float] = None
    patient_stats: Optional[Json] = None
    profile_completion: float
    revenue: float
