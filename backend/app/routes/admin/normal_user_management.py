"""Normal user management endpoints and access checks."""

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Admin
from app.schemas.normal_users_schemas import UserFilterQuery, UserListResponse
from app.services.admin import NormalUserManagementService
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/users", tags=["Normal User Management by Admin"])


@router.get(
    "",
    response_model=UserListResponse,
    status_code=status.HTTP_200_OK,
    summary="List normal users with filters. Admin Authentication Required to access this route",
)
async def list_normal_users(
    filters: UserFilterQuery = Query(),
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await NormalUserManagementService(db).get_filtered_normal_users(filters)
