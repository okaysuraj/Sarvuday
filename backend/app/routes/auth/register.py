# app/routes/auth/register.py

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, status
from app.database import get_db
from app.services.auth import AuthService
from app.schemas import (
    UserRegister, 
    UserRegisterResponse
)

router = APIRouter()

@router.post(
    "/register",
    response_model=UserRegisterResponse,
    response_model_exclude_unset=True,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user (Normal user or Counsellor)"
)
async def register(user_data: UserRegister, db: AsyncSession = Depends(get_db)):
    "User Registration"
    return await AuthService(db).register_user(user_data)
