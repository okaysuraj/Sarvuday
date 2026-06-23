# app/schemas/admins_schemas.py

from pydantic import BaseModel, EmailStr, Field, Json
from typing import Optional, List, Literal
from datetime import datetime
from app.utils.constants import GenderEnum, UserTypeEnum, AdminRoleEnum
from app.schemas.counsellors_schemas import CounsellorBase

# Reusable sort types
AdminSortBy = Literal["created_at", "name", "role"]
SortOrder = Literal["asc", "desc"]

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

    class Config:
        from_attributes = True

# Schema for creating an admin
class AdminCreate(BaseModel):
    user_type: UserTypeEnum
    email: EmailStr
    name: str
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    gender: GenderEnum
    role: AdminRoleEnum = AdminRoleEnum.moderator

    class Config:
        from_attributes = True

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
class AdminFilterQuery(BaseModel):
    user_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[GenderEnum] = None
    role: Optional[AdminRoleEnum] = None
    is_email_verified: Optional[bool] = None
    is_phone_verified: Optional[bool] = None
    is_approved: Optional[bool] = None
    is_deleted: Optional[bool] = None

    sort_by: Optional[AdminSortBy] = "created_at"
    sort_order: Optional[SortOrder] = "desc"
    limit: Optional[int] = 10
    offset: Optional[int] = 0

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
    admin: Optional[Json] = None
    normal_users: Optional[Json] = None
    counsellors: Optional[Json] = None
    mongodb_analytics: Optional[Json] = None

class UserAnalytics(BaseModel):
    demographics: Optional[Json] = None
    behavior: Optional[Json] = None
    trends: Optional[Json] = None

class CounsellorAnalytics(BaseModel):
    status: Optional[int] = None
    performance: Optional[Json] = None
    sessions: Optional[int] = None
    specialties: Optional[str] = None
