# app/services/auth/password_reset_service.py

from typing import Union
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from jose import JWTError
from app.models import NormalUser, Counsellor, Admin
from app.utils.constants import UserTypeEnum, reset_password_route
from app.utils.email_verification import BaseEmailService, TokenService
from app.schemas import StatusResponse, TokenValidationResponse
from app.utils.helper import hash_password
from app.config import settings

RESET_TOKEN_EXPIRE_MINUTES = settings.reset_token_expire_minutes
BACKEND_BASE_URL = settings.backend_base_url
FRONTEND_BASE_URL = settings.frontend_base_url



class PasswordResetService(BaseEmailService):
    def __init__(self, db: AsyncSession):
        super().__init__()
        self.db = db
        self.model_map = {
            UserTypeEnum.normal_user: NormalUser,
            UserTypeEnum.counsellor: Counsellor,
            UserTypeEnum.admin: Admin
        }

    async def request_password_reset(self, email: str, user_type: UserTypeEnum) -> StatusResponse:
        """
        Step 1: Initiate password reset process
        - Verify user exists
        - Generate secure token
        - Send reset email with link
        """
        Model = self.model_map.get(user_type)
        if not Model:
            raise HTTPException(status_code=400, detail="Invalid user type")

        user = await self._get_user_by_email(Model, email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        token = TokenService.generate_token(
            email=email,
            user_type=user_type,
            expires_in_minutes=RESET_TOKEN_EXPIRE_MINUTES
        )
        
        print(f"DEBUG - Reset Token: {token}")
        
        reset_link = self._generate_reset_link(token, user_type.value)
        
        await self._send_reset_email(email, user_type.value, reset_link)
        
        return StatusResponse(
            status="success",
            message="Password reset email sent"
        )

    async def validate_reset_token(self, token: str) -> TokenValidationResponse:
        """
        Step 2: Validate token when user clicks email link
        - Decode and verify token
        - Return user information if valid
        """
        try:
            payload = TokenService.decode_token(token)
            if not all(key in payload for key in ["email", "user_type"]):
                raise JWTError("Missing required token fields")
                
            return TokenValidationResponse(
                valid=True,
                email=payload["email"],
                user_type=payload["user_type"]
            )
        except JWTError:
            return TokenValidationResponse(
                valid=False,
                error="Invalid or expired token"
            )

    async def reset_password(
        self,
        token: str,
        new_password: str,
        user_type: Union[str, UserTypeEnum]
    ) -> StatusResponse:
        """
        Step 3: Complete password reset
        - Verify token again
        - Find user
        - Update password
        """
        try:
            # Token validation
            validation = await self.validate_reset_token(token)
            if not validation.valid:
                raise HTTPException(status_code=400, detail=validation.error)
            
            # Convert string user_type to enum if needed
            if isinstance(user_type, str):
                user_type = UserTypeEnum(user_type)
            
            # Get user model and fetch user
            Model = self.model_map.get(user_type)
            if not Model:
                raise HTTPException(status_code=400, detail="Invalid user type")
                
            user = await self._get_user_by_email(Model, validation.email)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            
            # Update password
            user.hashed_password = hash_password(new_password)
            await self.db.commit()
            
            return StatusResponse(
                status="success",
                message="Password updated successfully"
            )
            
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(
                status_code=500,
                detail=f"Password reset failed: {str(e)}"
            )

    async def _send_reset_email(self, email: str, user_type: str, reset_link: str):
        """Helper to send the reset email"""
        html_body = await self.render_template(
            f"{user_type}/reset_password.html",
            {"link": reset_link}
        )
        await self.send_html_email(
            subject="Password Reset Request",
            to_email=email,
            html_body=html_body
        )

    def _generate_reset_link(self, token: str, user_type: str) -> str:
        """Generate the frontend reset link"""
        return (
            f"{FRONTEND_BASE_URL}"
            f"{reset_password_route}?"
            f"token={token}"
            f"&user_type={user_type}"
        )

    async def _get_user_by_email(self, Model, email: str):
        """Fetch user by email helper"""
        result = await self.db.execute(
            select(Model)
            .where(Model.email == email)
            .limit(1)
        )
        return result.scalars().first()