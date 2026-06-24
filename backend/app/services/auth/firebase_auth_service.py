# app/services/auth/firebase_auth_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.models import NormalUser, Counsellor, Admin
from app.utils.unique_id_generation import generate_user_id
from app.utils.constants import UserTypeEnum
from app.schemas import FirebaseRegisterRequest, FirebaseLoginRequest, UserLoginResponse
from firebase_admin import auth
from jose import jwt
from datetime import timedelta
from app.config import settings

ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm


class FirebaseAuthService:
    """Handles Firebase-based authentication (email, phone, Google).
    
    The frontend uses Firebase for all auth flows and sends the Firebase
    id_token to the backend for verification and JWT issuance.
    """

    MODEL_MAP = {
        UserTypeEnum.normal_user: NormalUser,
        UserTypeEnum.counsellor: Counsellor,
        UserTypeEnum.admin: Admin,
    }

    def __init__(self, db: AsyncSession):
        self.db = db

    async def firebase_register(self, payload: FirebaseRegisterRequest) -> UserLoginResponse:
        """Register a new user via Firebase ID token."""
        decoded_token = self._verify_firebase_token(payload.id_token)

        email = decoded_token.get("email")
        phone = decoded_token.get("phone_number")
        firebase_uid = decoded_token.get("uid")

        if not email and not phone:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Firebase token must contain an email or phone number.",
            )

        if payload.user_type == UserTypeEnum.admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin registration is not allowed through this route.",
            )

        # Check if user already exists
        existing = await self._find_user_by_firebase_uid(firebase_uid, payload.user_type)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User already registered. Please log in.",
            )

        if email:
            existing_email = await self._find_user_by_email(email, payload.user_type)
            if existing_email:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already registered.",
                )

        # Create user
        user_id = await generate_user_id(payload.user_type.value, self.db)
        user_class = self.MODEL_MAP[payload.user_type]

        user = user_class(
            user_id=user_id,
            email=email or "",
            phone_number=phone,
            name=payload.name,
            gender=payload.gender,
            firebase_uid=firebase_uid,
            user_type=payload.user_type,
            is_email_verified=bool(email and decoded_token.get("email_verified", False)),
            is_phone_verified=bool(phone),
            terms_accepted=payload.terms_accepted,
            privacy_policy_accepted=payload.privacy_policy_accepted,
            last_login_at=datetime.now(timezone.utc).replace(tzinfo=None),
        )

        try:
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
        except Exception:
            await self.db.rollback()
            raise

        access_token = self._create_access_token(user)

        return UserLoginResponse(
            status="success",
            access_token=access_token,
            user_type=user.user_type.value,
            token_type="bearer",
            last_login_at=user.last_login_at,
        )

    async def firebase_login(self, payload: FirebaseLoginRequest) -> UserLoginResponse:
        """Authenticate a user via Firebase ID token.
        
        Auto-detects user_type by searching all user tables if not provided.
        """
        decoded_token = self._verify_firebase_token(payload.id_token)
        firebase_uid = decoded_token.get("uid")
        email = decoded_token.get("email")

        if not firebase_uid:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Firebase token: no UID found.",
            )

        user = None

        if payload.user_type:
            # Look up in the specified table
            user = await self._find_user_by_firebase_uid(firebase_uid, payload.user_type)
            if not user and email:
                user = await self._find_user_by_email(email, payload.user_type)
                # Link firebase_uid if found by email
                if user and not user.firebase_uid:
                    user.firebase_uid = firebase_uid
        else:
            # Auto-detect: search all user tables
            for user_type in [UserTypeEnum.normal_user, UserTypeEnum.counsellor, UserTypeEnum.admin]:
                user = await self._find_user_by_firebase_uid(firebase_uid, user_type)
                if user:
                    break
            if not user and email:
                for user_type in [UserTypeEnum.normal_user, UserTypeEnum.counsellor, UserTypeEnum.admin]:
                    user = await self._find_user_by_email(email, user_type)
                    if user:
                        if not user.firebase_uid:
                            user.firebase_uid = firebase_uid
                        break

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found. Please register first.",
            )

        # Update verification status and last login
        if email and decoded_token.get("email_verified", False):
            user.is_email_verified = True
        if decoded_token.get("phone_number"):
            user.is_phone_verified = True
        user.last_login_at = datetime.now(timezone.utc).replace(tzinfo=None)

        try:
            await self.db.commit()
        except Exception:
            await self.db.rollback()
            raise

        access_token = self._create_access_token(user)

        return UserLoginResponse(
            status="success",
            access_token=access_token,
            user_type=user.user_type.value,
            token_type="bearer",
            last_login_at=user.last_login_at,
        )

    # ---- Helpers ----

    def _create_access_token(self, user) -> str:
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

    def _verify_firebase_token(self, id_token: str) -> dict:
        try:
            return auth.verify_id_token(id_token)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Invalid Firebase token: {str(e)}",
            )

    async def _find_user_by_firebase_uid(self, uid: str, user_type: UserTypeEnum):
        model = self.MODEL_MAP[user_type]
        result = await self.db.execute(
            select(model).where(model.firebase_uid == uid)
        )
        return result.scalars().first()

    async def _find_user_by_email(self, email: str, user_type: UserTypeEnum):
        model = self.MODEL_MAP[user_type]
        result = await self.db.execute(
            select(model).where(model.email == email)
        )
        return result.scalars().first()
