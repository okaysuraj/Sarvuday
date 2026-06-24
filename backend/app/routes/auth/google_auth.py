# app/routes/auth/google_auth.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import GoogleLoginRequest, UserLoginResponse
from app.services.auth import GoogleAuthService

router = APIRouter()

# One Tap Google Login Route
@router.post("/google-login", response_model=UserLoginResponse, status_code=status.HTTP_200_OK, summary="One Tap Google Login")
async def google_login(
    payload: GoogleLoginRequest, 
    db: AsyncSession = Depends(get_db)
):
    return await GoogleAuthService(db).google_login(payload)