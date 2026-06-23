# app/schemas/auth_schemas.py

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.utils.constants import GenderEnum, UserTypeEnum

# User Base
class UserBase(BaseModel):
    user_type: UserTypeEnum
    user_id: str
    name: str
    email: EmailStr
    phone_number: Optional[str] = Field(None, min_length=10, max_length=15)
    gender: Optional[GenderEnum] = None
    is_email_verified: bool = False
    is_phone_verified: bool = False
    is_approved: Optional[bool] = None
    firebase_uid: Optional[str] = None
    terms_accepted: bool = False
    privacy_policy_accepted: bool = False
    created_at: datetime

    class Config:
        from_attributes = True

# User Register
class UserRegister(BaseModel):
    user_type: UserTypeEnum
    name: str
    email: EmailStr
    phone_number: Optional[str] = Field(None, min_length=10, max_length=15)
    password: str
    gender: GenderEnum
    terms_accepted: bool = False
    privacy_policy_accepted: bool = False

    class Config:
        from_attributes = True

# User Register Response
class UserRegisterResponse(BaseModel):
    status: str
    message: str
    user: UserBase

    class Config:
        from_attributes = True

# User Login
class UserLogin(BaseModel):
    user_type: UserTypeEnum
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = Field(None, min_length=10, max_length=15)
    password: str

    class Config:
        from_attributes = True

# User Login Response
class UserLoginResponse(BaseModel):
    status: str
    user_type: UserTypeEnum
    access_token: str
    token_type: str
    last_login_at: Optional[datetime]

    class Config:
        from_attributes = True

# Password Reset Request
class PasswordResetRequest(BaseModel):
    email: EmailStr
    user_type: UserTypeEnum

# Token Validation Response
class TokenValidationResponse(BaseModel):
    valid: bool
    email: Optional[str]
    user_type: Optional[UserTypeEnum]
    error: Optional[str]

# Password Reset Confirm
class PasswordResetConfirm(BaseModel):
    token: str
    user_type: str
    new_password: str

# Password Update Request
class PasswordUpdateRequest(BaseModel):
    current_password: str
    new_password: str

# Google Login Request
class GoogleLoginRequest(BaseModel):
    user_type: UserTypeEnum
    id_token: str

# Phone Verification
class PhoneVerificationRequest(BaseModel):
    phone_number: str = Field(min_length=10, max_length=15)

class PhoneVerificationConfirm(BaseModel):
    otp: str = Field(min_length=6, max_length=6)

