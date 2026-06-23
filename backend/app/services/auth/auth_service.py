# app/services/auth/auth_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, status
from app.models import NormalUser, Counsellor, Admin
# from app.utils.phone_verification import send_verification_sms
from app.utils.unique_id_generation import generate_user_id
from app.utils.constants import UserTypeEnum
from app.schemas import UserRegister, UserRegisterResponse, UserLogin, UserLoginResponse, UserBase
from app.config import settings
from app.utils.helper import hash_password, verify_password

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    # --------------------------
    # Core Authentication Logic
    # --------------------------
    async def register_user(self, user_data: UserRegister) -> UserRegisterResponse:
        """Handle user registration"""
        if user_data.user_type == UserTypeEnum.admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin registration not allowed through this route. Contact the super admin."
            )

        if await self._get_user_by_email(user_data.email, user_data.use
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        return user

    async def _get_user_by_email(self, email: str, user_type: UserTypeEnum):
        model = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor,
            UserTypeEnum.admin: Admin
        }[user_type]
        result = await self.db.execute(select(model).where(model.email == email))
        return result.scalars().first()
    
    async def _get_user_by_phone(self, phone_number: str, user_type: UserTypeEnum):
        model = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor,
            UserTypeEnum.admin: Admin
        }[user_type]
        result = await self.db.execute(select(model).where(model.phone_number == phone_number))
        return result.scalars().first()

    def _create_user_object(self, user_data: UserRegister, user_id: str):
        user_class = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor
        }[user_data.user_type]
        
        return user_class(
            user_id=user_id,
            email=user_data.email,
            name=user_data.name,
            phone_number=user_data.phone_number,
            gender=user_data.gender,
            hashed_password=hash_password(user_data.password),
            user_type=user_data.user_type,
            terms_accepted=user_data.terms_accepted,
            privacy_policy_accepted=user_data.privacy_policy_accepted
        )
        