# app/routes/auth/firebase_auth.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas import FirebaseRegisterRequest, FirebaseLoginRequest, UserLoginResponse
from app.services.auth import FirebaseAuthService

router = APIRouter()


@router.post(
    "/firebase-register",
    response_model=UserLoginResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user via Firebase (Email/Phone/Google)",
)
async def firebase_register(
    payload: FirebaseRegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register using a Firebase ID token from email, phone, or Google sign-up."""
    return await FirebaseAuthService(db).firebase_register(payload)


@router.post(
    "/firebase-login",
    response_model=UserLoginResponse,
    status_code=status.HTTP_200_OK,
    summary="Login via Firebase (Email/Phone/Google)",
)
async def firebase_login(
    payload: FirebaseLoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Authenticate using a Firebase ID token from email, phone, or Google sign-in."""
    return await FirebaseAuthService(db).firebase_login(payload)
