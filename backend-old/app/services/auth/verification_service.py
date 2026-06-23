# app/services/auth/verification_service.py

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas import StatusResponse
from app.utils.constants import UserTypeEnum
from app.utils.email_verification import EmailVerificationService


class VerificationService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.email_service = EmailVerificationService(db)

    async def verify_email(self, token: str, user_type: str) -> StatusResponse:
        """
        Verifies the email using the token and user type.
        """
        try:
            user_type_enum = UserTypeEnum(user_type)
            result = await self.email_service.verify_email_token(token, user_type_enum.value)
            return StatusResponse(**result)
        except HTTPException as e:
            raise e

    async def resend_verification(self, email: str, user_type: str) -> StatusResponse:
        """
        Resends the verification email if allowed.
        """
        try:
            user_type_enum = UserTypeEnum(user_type)
            await self.email_service.send_verification_email(email=email, user_type=user_type_enum)
            return StatusResponse(
                status="success",
                message="Verification email resent successfully."
            )
        except HTTPException as e:
            raise e

