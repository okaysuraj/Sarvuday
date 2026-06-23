# app/services/auth/google_auth_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from fastapi import HTTPException, status
from app.models import NormalUser, Counsellor, Admin
# from app.utils.phone_verification import send_verification_sms
from app.utils.unique_id_generation import generate_user_id
from app.utils.constants import UserTypeEnum
from app.schemas import GoogleLoginRequest, UserLoginResponse
from firebase_admin import auth
from app.services.auth import AuthService


class GoogleAuthService:
    
    def __init__(self, db: AsyncSession):
        self.db = db
        self.service = AuthService(db)
    
    # Google One Tap SignUp/SignIn
    async def google_login(self, payload: GoogleLoginRequest)-> UserLoginResponse:
        user_type = payload.user_type
        id_token = payload.id_token
        
        decoded_token = await self._verify_firebase_token(id_token)
        email = decoded_token.get("email")
        if not email:
            raise HTTPException(status_code=400, detail="Email not found in Firebase token")
        existing_user = await self._get_user_by_email(email, user_type)
        
        if existing_user:
            existing_user.last_login_at = datetime.now(timezone.utc)
            try:
                await self.db.commit()
            except Exception:
                await self.db.rollback()
                raise
            access_token = self.service.create_access_token(existing_user)
            
            return UserLoginResponse(
                status="success",
                user_type=existing_user.user_type.value,
                access_token=access_token,
                token_type="bearer",
                last_login_at=existing_user.last_login_at
            )
        
        if user_type == UserTypeEnum.admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Admin registration not allowed through this route. Contact the super admin."
            )
            
        user_id = await generate_user_id(user_type.value, self.db)
        user_data = {
            "email": email,
            "name": decoded_token.get("name", ""),
            "firebase_uid": decoded_token["uid"],
            "is_verified": True,
            "last_login_at": datetime.now(timezone.utc),
            "terms_accepted": True,
            "privacy_policy_accepted": True
        }
    
        user = self._create_user_object(user_type, user_id, user_data)
        
        try:
            self.db.add(user)
            await self.db.commit()
            await self.db.refresh(user)
        except Exception:
            await self.db.rollback()
            raise
        
        access_token = self.service.create_access_token(user)
        
        return UserLoginResponse(
            status="success",
            access_token=access_token,
            user_type=user.user_type.value,
            token_type="bearer",
            last_login_at=user.last_login_at
        )
        

    async def _verify_firebase_token(self, id_token: str) -> dict:
        try:
            decoded_token = auth.verify_id_token(id_token)
            return decoded_token
        except Exception as e:
            print(f"[Firebase Token Error] {e}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Firebase token"
            )
            
    async def _get_user_by_email(self, email: str, user_type: UserTypeEnum):
        model = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor,
            UserTypeEnum.admin: Admin
        }[user_type]
        result = await self.db.execute(select(model).where(model.email == email))
        return result.scalars().first()

    def _create_user_object(self, user_type: UserTypeEnum, user_id: str, user_data: dict):
        user_class = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor
        }[user_type]
        
        return user_class(
            user_id=user_id,
            email=user_data["email"],
            name=user_data["name"],
            firebase_uid=user_data["firebase_uid"],
            user_type=user_type,
            is_verified=user_data["is_verified"],
            last_login_at=user_data["last_login_at"],
            terms_accepted=user_data["terms_accepted"],
            privacy_policy_accepted=user_data["privacy_policy_accepted"]
        )
        