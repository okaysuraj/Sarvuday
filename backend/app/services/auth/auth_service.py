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
from app.utils.email_verification import EmailVerificationService

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.email_verifier = EmailVerificationService(db)

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

        if await self._get_user_by_email(user_data.email, user_data.user_type):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        user_id = generate_user_id(user_data.user_type.value)
        user = self._create_user_object(user_data, user_id)
        
        self.db.add(user)
        await self.db.commit()
        await self.email_verifier.send_verification_email(user.email, user_data.user_type)
        
        return UserRegisterResponse(
            status="success",
            message="Registration successful. Please check your email as we have sent the email verification link. Click the verification button and verify the email.",
            user=UserBase.model_validate(user)
        )

    async def login_user(self, user_data: UserLogin) -> UserLoginResponse:
        """Authenticate user and return JWT"""
        user = await self._validate_login_credentials(user_data)
        user.last_login_at = datetime.now(timezone.utc)
        await self.db.commit()
        
        return UserLoginResponse(
            status="success",
            access_token=self.create_access_token(user),
            user_type=user.user_type.value,
            token_type="bearer",
            last_login_at=user.last_login_at
        )

    # --------------------------
    # Token Handling
    # --------------------------
    def create_access_token(self, user) -> str:
        """Generate JWT for authenticated user"""
        payload = {
            "sub": user.user_id,
            "email": user.email,
            "user_type": user.user_type.value,
            "exp": datetime.now(timezone.utc) + timedelta(
                minutes=ACCESS_TOKEN_EXPIRE_MINUTES
            )
        }
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    @staticmethod
    def verify_access_token(token: str) -> dict:
        """Validate JWT and return payload"""
        try:
            payload = jwt.decode(
                token, 
                SECRET_KEY, 
                algorithms=[ALGORITHM]
            )
            if not all(key in payload for key in ["sub", "email", "user_type"]):
                raise JWTError("Missing required claims")
            return payload
        except JWTError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid token: {str(e)}"
            )

    # --------------------------
    # Helper Methods
    # --------------------------
    async def _validate_login_credentials(self, user_data: UserLogin):
        if user_data.email:
            user = await self._get_user_by_email(user_data.email, user_data.user_type)
            if not user.is_email_verified:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Email not verified. Try Google Login or Login using Phone Number"
                )
        elif user_data.phone_number:
            user = await self._get_user_by_phone(user_data.phone_number, user_data.user_type)
            if not user.is_phone_verified:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Phone Number not verified. Try Google Login or Login using Email"
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_206_PARTIAL_CONTENT,
                detail="Email or Phone Number required"
            )
            
        if not user or not verify_password(user_data.password, user.hashed_password):
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
        