# app/routes/admin/normal_user_management.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import ensure_admin_user
from app.schemas import (
    UserListResponse,
    UserFilterQuery
)
from app.models import Admin
from app.services.admin import NormalUserManagementService

router = APIRouter(prefix="/users", tags=["Normal User Management by Admin"])

@router.get("", response_model=UserListResponse, status_code=status.HTTP_200_OK, summary="List normal users with filters. Admin Authentication Required to access this route")
async def list_normal_users(
    filters: UserFilterQuery = Depends(),
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await NormalUserManagementService(db).get_filtered_normal_users(filters)