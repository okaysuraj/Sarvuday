# app/routes/auth/password_reset.py

from fastapi import APIRouter, Depends, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import (
    PasswordResetRequest, 
    StatusResponse, 
    PasswordResetConfirm,
    TokenValidationResponse
)
from app.services.auth import PasswordResetService

router = APIRouter()

@router.post(
    "/request-reset-password",
    response_model=StatusResponse,
    status_code=status.HTTP_200_OK,
    summary="Request password reset"
)
async def request_reset_password(
    data: PasswordResetRequest, 
    db: AsyncSession = Depends(get_db)
):
    """Send password reset link to user's email"""
    return await PasswordResetService(db).request_password_reset(data.email, data.user_type)

@router.get(
    "/validate-reset-token",
    response_model=TokenValidationResponse,
    summary="Validate reset token (for frontend link)"
)
async def validate_token(
    token: str = Query(..., description="Reset token"),
    user_type: str = Query(..., description="User type"),
    db: AsyncSession = Depends(get_db)
):
    """Validate reset token when user clicks email link"""
    return await PasswordResetService(db).validate_reset_token(token, user_type)

@router.post(
    "/reset-password",
    response_model=StatusResponse,
    status_code=status.HTTP_200_OK,
    summary="Reset user's password"
)
async def reset_password(
    data: PasswordResetConfirm, 
    db: AsyncSession = Depends(get_db)
):
    """Complete password reset with new password"""
    return await PasswordResetService(db).reset_password(data.token, data.new_password, data.user_type)

