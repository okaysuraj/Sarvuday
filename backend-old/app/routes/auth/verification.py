# app/routes/auth/verification.py

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, status
from app.database import get_db
from app.schemas import StatusResponse
from app.services.auth import VerificationService

router = APIRouter()

# Email Verification Route
@router.get(
    "/verify-email",
    response_model=StatusResponse,
    status_code=status.HTTP_200_OK,
    summary="Verify user's email"
)
async def verify_email(token: str, user_type: str, db: AsyncSession = Depends(get_db)):
    """
    Verify the email using the provided token and user type.
    """
    return await VerificationService(db).verify_email(token, user_type)

@router.post("/resend-verification-email", response_model=StatusResponse, status_code=status.HTTP_200_OK, summary="Resend Verification Email")
async def resend_verification(email: str, user_type: str, db: AsyncSession = Depends(get_db)):
    """
    Endpoint to resend the email verification link to a user.
    This delegates the actual logic to the handler function.
    """
    return await VerificationService(db).resend_verification(email, user_type)