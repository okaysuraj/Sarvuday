# app/routes/auth/login.py

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.auth import AuthService
from app.database import get_db
from app.schemas import (
    UserLogin, 
    UserLoginResponse
)

router = APIRouter()

# User Login Route
@router.post(
    "/login",
    response_model=UserLoginResponse,
    status_code=status.HTTP_200_OK,
    summary="User Login (Normal Users | Counsellors | Admins)"
)
async def login(user_data: UserLogin, db: AsyncSession = Depends(get_db)):
    return await AuthService(db).login_user(user_data)


# User Logout Route
@router.post("/logout", summary="User Logout")
async def logout_user(user_id: int, db: AsyncSession = Depends(get_db)):
    # TODO: Implement logout logic, e.g., invalidate user session or token
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Logout functionality will be implemented in the future."
    )