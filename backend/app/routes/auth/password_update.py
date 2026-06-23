# app/routes/auth/password_update.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import get_current_user
from app.services.auth import PasswordUpdateService
from app.models import (
    NormalUser, 
    Counsellor, 
    Admin
)
from app.schemas import (
    PasswordUpdateRequest, 
    StatusResponse
)

router = APIRouter()

# Update Password
@router.post("/update-password", response_model=StatusResponse, status_code=status.HTTP_200_OK, summary="Update Password (For all -> Normal Users | Counsellors | Admins). Authentication required (Admin/Counsellor/Normal User)")
async def update_password(
    data: PasswordUpdateRequest, 
    current_user: NormalUser | Counsellor | Admin = Depends(get_current_user), 
    db: AsyncSession = Depends(get_db)
):
    return await PasswordUpdateService(db).update_password(data, current_user)

