# app/routes/auth/phone_verification.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import get_current_user
from app.models import (
    NormalUser, 
    Counsellor, 
    Admin
)
from app.schemas import (
    PhoneVerificationRequest, 
    StatusResponse, 
    PhoneVerificationConfirm
)
from app.services.auth import PhoneVerificationService

router = APIRouter()

# User phone number verification Routes
@router.post("/request-otp", response_model=StatusResponse, status_code=status.HTTP_200_OK, summary="OTP Sent For Phone Number Verification. Authentication required (Admin/Counsellor/Normal User)")
async def verify_phone(
    data: PhoneVerificationRequest, 
    current_user: NormalUser | Counsellor | Admin = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    """
    Send OTP for Phone Number Verification.
    """
    return await PhoneVerificationService.generate_and_store_otp(user=current_user, phone_number=data.phone_number)

@router.post("/verify-otp", response_model=StatusResponse, status_code=status.HTTP_200_OK, summary="OTP Verify For Phone Number Verification. Authentication required (Admin/Counsellor/Normal User)")
async def verify_phone(
    data: PhoneVerificationConfirm, 
    current_user: NormalUser | Counsellor | Admin = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    """
    Verify OTP to confirm phone number verification.
    """
    return await PhoneVerificationService.verify_and_mark(user=current_user, submitted_otp=data.otp, db=db)