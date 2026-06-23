# app/schemas/normal_users_schemas.py

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List, Literal
from datetime import datetime
from app.utils.constants import GenderEnum, UserTypeEnum

UserSortBy = Literal["created_at", "name", "last_login_at"]
SortOrder = Literal["asc", "desc"]

class NormalUserBase(BaseModel):
    user_type: UserTypeEnum = UserTypeEnum.normal_user
    user_id: str
    name: str
    email: EmailStr
    gender: Optional[GenderEnum]
    phone_number: Optional[str] = Field(default=None, min_length=10, max_length=15)
    
    @field_validator('phone_number', mode='before')
    @classmethod
    def empty_str_to_none(cls, v):
        if v == "":
            return None
        return v

    profile_pic: Optional[str]

    preferred_languages: Optional[List[str]]
    primary_concerns: Optional[List[str]]
    country: Optional[str]
    state: Optional[str]
    city: Optional[str]
    address: Optional[str]
    pincode: Optional[str]

    is_email_verified: bool = False
    is_phone_verified: bool = False
    terms_accepted: bool = False
    privacy_policy_accepted: bool = False
    last_login_at: Optional[datetime]
    total_sessions_attended: int = 0
    created_at: datetime

    class Config:
        from_attributes = True

class UserUpdateRequest(BaseModel):
    name: 
    gender: Optional[GenderEnum] = None
    preferred_languages: Optional[List[str]] = None
    primary_concerns: Optional[List[str]] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    pincode: Optional[str] = None

class UserUpdateResponse(BaseModel):
    message: str
    user: NormalUserBase

class UserFilterQuery(BaseModel):
    user_id: Optional[str] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    gender: Optional[GenderEnum] = None
    is_email_verified: Optional[bool] = None
    is_phone_verified: Optional[bool] = None
    preferred_languages: Optional[List[str]] = None
    primary_concerns: Optional[List[str]] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None

    sort_by: Optional[UserSortBy] = "created_at"
    sort_order: Optional[SortOrder] = "desc"
    limit: Optional[int] = 10
    offset: Optional[int] = 0

class UserListResponse(BaseModel):
    total: int
    limit: Optional[int] = 10
    offset: Optional[int] = 0
    users: List[NormalUserBase]

# Additional Schemas
class CounsellingSessionResponse(BaseModel):
    session_id: str
    session_scheduled_at: datetime
    session_expires_at: datetime
    counsellor_id: str
    
    class Config:
        from_attributes = True

class DashboardOverviewResponse(BaseModel):
    user: NormalUserBase
    chat_sessions_count: int
    total_sessions: int
    total_messages: int
    last_active: datetime
    upcoming_sessions: List[CounsellingSessionResponse]

