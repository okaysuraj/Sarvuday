# app/utils/email_verification_service.py

from app.utils.email_verification import BaseEmailService
from app.utils.email_verification import TokenService
from app.models import NormalUser, Counsellor, Admin
from app.utils.constants import UserTypeEnum, verify_email_route
from datetime import datetime, timezone, timedelta
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from app.schemas import StatusResponse
from app.config import settings
from app.utils.helper import generate_secure_password, hash_password

EMAIL_RESEND_RATE_LIMIT_MINUTES = settings.email_resend_rate_limit_minutes
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
BACKEND_BASE_URL = settings.backend_base_url

class EmailVerificationService(BaseEmailService):
    def __init__(self, db: AsyncSession):
        super().__init__()
        self.db = db
        self.model_map = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor,
            UserTypeEnum.admin: Admin
        }

    async def send_verification_email(self, email: str, user_type: UserTypeEnum):
        """Send email verification link to user with rate limiting"""
        Model = self.model_map.get(user_type)
        if not Model:
            raise HTTPException(status_code=400, detail="Invalid user type")

        user = await self._get_user_by_email(Model, email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user.is_email_verified:
            raise HTTPException(status_code=400, detail="User's email already verified")

        now = datetime.now(timezone.utc)
        if user.last_verification_sent_at and now - user.last_verification_sent_at < timedelta(minutes=EMAIL_RESEND_RATE_LIMIT_MINUTES):
            raise HTTPException(
                status_code=429,
                detail=f"Verification email already sent recently. Please wait {EMAIL_RESEND_RATE_LIMIT_MINUTES} minutes."
            )

        token = TokenService.generate_token(
            email,
            user_type,
            ACCESS_TOKEN_EXPIRE_MINUTES
        )
        link = self._generate_verification_link(token, user_type.value)

        html_body = await self.render_template(
            f"{user_type.value}/verify_email.html",
            {"link": link}
        )
        await self.send_html_email("Verify Your Email", email, html_body)

        user.last_verification_sent_at = now
        await self.db.commit()

    async def verify_email_token(self, token: str, user_type: str) -> StatusResponse:
        """Verify email using JWT token"""
        try:
            payload = TokenService.decode_token(token)
            email = payload.get("email")
            if not email:
                raise HTTPException(status_code=400, detail="Invalid token")

            Model = self.model_map.get(UserTypeEnum(user_type.lower()))
            if not Model:
                raise HTTPException(status_code=400, detail="Invalid user type")

            user = await self._get_user_by_email(Model, email)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            if user.is_email_verified:
                raise HTTPException(status_code=400, detail="User already verified")

            user.is_email_verified = True
            await self.db.commit()
            
            if user_type.lower() == UserTypeEnum.admin.value:
                new_password = generate_secure_password()
                user.hashed_password = hash_password(new_password)
                
                await self.db.commit()
                await self.db.refresh(user)
                
                html_body = await self.render_template(
                    "admin/new_password.html",
                    {"new_password": new_password}
                )
                await self.send_html_email("Your New Password", email, html_body)
                
                return {"status": "success", "message": "Email successfully verified. A new password has been sent to you by email. Please Check and update after login"}

            return {"status": "success", "message": "Email successfully verified"}

        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e)) from e

    def _generate_verification_link(self, token: str, user_type: str) -> str:
        """Generate verification link with token"""
        return f"{BACKEND_BASE_URL}{verify_email_route}?token={token}&user_type={user_type}"

    async def _get_user_by_email(self, Model, email: str):
        """Helper to get user by email"""
        result = await self.db.execute(select(Model).where(Model.email == email))
        return result.scalars().first()
