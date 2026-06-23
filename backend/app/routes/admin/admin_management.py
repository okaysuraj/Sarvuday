# app/routes/admin/admin_management.py

from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import ensure_super_admin, ensure_admin_user
from app.models import Admin
from app.schemas import (
    AdminCreate,
    AdminCreateResponse,
    AdminListResponse,
    AdminFilterQuery
)
from app.services.admin import AdminManagementService

router = APIRouter(prefix="/management", tags=["Admin Management"])

# -------------------
# Admin CRUD Endpoints
# -------------------

@router.get("", response_model=AdminListResponse, status_code=status.HTTP_200_OK, summary="List admins with filters. Admin Authentication Required to access this route")
async def list_admins(
    filters: AdminFilterQuery = Depends(),
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await AdminManagementService(db).get_all_admins(filters, current_admin)

@router.post("/add", response_model=AdminCreateResponse, status_code=status.HTTP_201_CREATED, summary="Super admin can add new admins. Super Admin Authentication Required to access this route")
async def create_admin(
    admin_data: AdminCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_super_admin)
):
    return await AdminManagementService(db).create_admin(admin_data, current_admin)


@router.delete("/{admin_id}", status_code=status.HTTP_204_NO_CONTENT, summary="delete admin account. Super Admin Authentication Required to access this route")
async def delete_admin(
    admin_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_super_admin)
):
    return await AdminManagementService(db).delete_admin(admin_id)
