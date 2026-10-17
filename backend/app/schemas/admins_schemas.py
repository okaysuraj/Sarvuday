"""Request validation and response models for admins."""

from datetime import datetime
from typing import Any, List, Literal, Optional

from pydantic import BaseModel, EmailStr, Field

from app.schemas.counsellors_schemas import CounsellorBase
from app.schemas.pagination import Pagination
from app.utils.constants import AdminRoleEnum, GenderEnum, UserTypeEnum

# Reusable sort types
AdminSortBy = Literal["created_at", "name", "role"]


# Shared base schema
class AdminBase(BaseModel):
    user_id: str
    email: EmailStr
    name: str
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    gender: Optional[GenderEnum] = None
    profile_pic: Optional[str] = None
    role: AdminRoleEnum
    user_type: UserTypeEnum = UserTypeEnum.admin
    is_email_verified: bool = False
    is_phone_verified: bool = False
    is_approved: bool = True
    created_at: datetime

    model_config = {"from_attributes": True}


# Schema for creating an admin
class AdminCreate(BaseModel):
    user_type: UserTypeEnum
    email: EmailStr
    name: str
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    gender: GenderEnum
    role: AdminRoleEnum = AdminRoleEnum.moderator

    model_config = {"from_attributes": True}


# Simple response wrappers
class AdminCreateResponse(BaseModel):
    status: str
    message: str
    user: AdminBase


class AdminUpdateRequest(BaseModel):
    name: Optional[str] = None
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    profile_pic: Optional[str] = None


class AdminUpdateResponse(BaseModel):
    message: str
    admin: AdminBase


# Filter and pagination for list endpoints
class AdminFilterQuery(Pagination):
    user_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[GenderEnum] = None
    role: Optional[AdminRoleEnum] = None
    is_email_verified: Optional[bool] = None
    is_phone_verified: Optional[bool] = None
    is_approved: Optional[bool] = None

    sort_by: AdminSortBy = "created_at"


class AdminListResponse(BaseModel):
    total: int
    admins: List[AdminBase]


# Counsellor approval responses
class ApproveCounsellorResponse(BaseModel):
    message: str
    counsellor: CounsellorBase


class DisapprovalCounsellorResponse(BaseModel):
    message: str
    counsellor: CounsellorBase


# Platform-wide analytics schemas
class PlatformAnalytics(BaseModel):
    admin: dict[str, int]
    normal_users: dict[str, int]
    counsellors: dict[str, int]
    content_analytics: dict[str, int]


class UserAnalytics(BaseModel):
    demographics: dict[str, dict[str, int]]
    behavior: dict[str, int | None]
    trends: dict[str, dict[str, int]]


class CounsellorAnalytics(BaseModel):
    status: dict[str, int]
    performance: dict[str, Any]
    sessions: int
    specialties: dict[str, int]
