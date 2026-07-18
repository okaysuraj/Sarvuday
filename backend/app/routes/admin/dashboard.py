# app/routes/admin/dashboard.py

from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.database import get_db
from app.utils.oauth import ensure_admin_user
from app.models import Admin
from app.schemas import (
    AdminBase, 
    AdminUpdateRequest, 
    AdminUpdateResponse
)
from app.services.admin import AdminManagementService

router = APIRouter(prefix="/dashboard", tags=["Admin Dashboard"])

# ---------------------------
# Admin Self Profile Endpoints
# ---------------------------

@router.get("", status_code=status.HTTP_200_OK, summary="Get admin dashboard overview. Admin Authentication Required to access this route")
async def get_admin_dashboard(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    from sqlalchemy import select, func
    from app.models import NormalUser, Counsellor, Payment

    # Get active users
    users_result = await db.execute(select(func.count(NormalUser.user_id)))
    total_users = users_result.scalar() or 0

    # Get active therapists
    counsellors_result = await db.execute(select(func.count(Counsellor.user_id)))
    total_counsellors = counsellors_result.scalar() or 0

    # Get total revenue
    revenue_result = await db.execute(select(func.sum(Payment.amount)))
    total_revenue = revenue_result.scalar() or 0.0

    return {
        "total_active_users": total_users,
        "active_therapists": total_counsellors,
        "total_revenue": float(total_revenue)
    }

@router.get("/profile", response_model=AdminBase, status_code=status.HTTP_200_OK, summary="Get admin profile. Admin Authentication Required to access this route")
async def get_admin_profile(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await AdminManagementService(db).get_admin_by_id(current_admin.user_id, current_admin)

@router.patch("/profile", response_model=AdminUpdateResponse, status_code=status.HTTP_200_OK, summary="Update admin profile. Admin Authentication Required to access this route")
async def update_admin_profile(
    name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None),
    current_admin: Admin = Depends(ensure_admin_user),
    db: AsyncSession = Depends(get_db)
):
    # Prepare the update data
    update_data = AdminUpdateRequest(
        name=name,
        phone_number=phone_number
    )

    return await AdminManagementService(db).update_admin(current_admin.user_id, update_data, profile_pic)
