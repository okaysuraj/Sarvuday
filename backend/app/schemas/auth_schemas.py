"""Request validation and response models for auth."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.utils.constants import GenderEnum, UserTypeEnum


# User Login Response
class UserLoginResponse(BaseModel):
    status: str
    user_id: str
    user_type: UserTypeEnum
    access_token: str
    token_type: str
    last_login_at: Optional[datetime]

    model_config = {"from_attributes": True}


# Firebase Register Request (used by frontend for email/phone sign-up)
class FirebaseRegisterRequest(BaseModel):
    user_type: UserTypeEnum
    id_token: str = Field(min_length=1, max_length=16384)
    name: str = Field(min_length=1, max_length=255)
    gender: Optional[GenderEnum] = GenderEnum.other
    terms_accepted: bool = False
    privacy_policy_accepted: bool = False


# Firebase Login Request (used by frontend for email/phone sign-in)
class FirebaseLoginRequest(BaseModel):
    user_type: Optional[UserTypeEnum] = None
    id_token: str = Field(min_length=1, max_length=16384)


# Phone Verification
