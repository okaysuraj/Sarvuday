"""Dashboard endpoints and access checks."""

from typing import Optional

from fastapi import APIRouter, Depends, File, Form, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Admin, Counsellor, NormalUser, UserPayment
from app.schemas.admins_schemas import (
    AdminBase,
    AdminUpdateRequest,
    AdminUpdateResponse,
)
from app.services.admin import AdminManagementService
from app.utils.constants import PaymentStatusEnum
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/dashboard", tags=["Admin Dashboard"])

# ---------------------------
# Admin Self Profile Endpoints
# ---------------------------


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    summary="Get admin dashboard overview. Admin Authentication Required to access this route",
)
async def get_admin_dashboard(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    # Get active users
    users_result = await db.execute(select(func.count(NormalUser.user_id)))
    total_users = users_result.scalar() or 0

    # Get active therapists
    counsellors_result = await db.execute(select(func.count(Counsellor.user_id)))
    total_counsellors = counsellors_result.scalar() or 0

    # Pending checkouts and refunded payments are not collected revenue.
    revenue_result = await db.execute(
        select(func.sum(UserPayment.amount)).where(
            UserPayment.status == PaymentStatusEnum.completed,
            UserPayment.refunded.is_(False),
        )
    )
    total_revenue = revenue_result.scalar() or 0.0

    return {
        "total_active_users": total_users,
        "active_therapists": total_counsellors,
        "total_revenue": float(total_revenue),
    }


@router.get(
    "/profile",
    response_model=AdminBase,
    status_code=status.HTTP_200_OK,
    summary="Get admin profile. Admin Authentication Required to access this route",
)
async def get_admin_profile(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await AdminManagementService(db).get_admin_by_id(
        current_admin.user_id, current_admin
    )


@router.patch(
    "/profile",
    response_model=AdminUpdateResponse,
    status_code=status.HTTP_200_OK,
    summary="Update admin profile. Admin Authentication Required to access this route",
)
async def update_admin_profile(
    name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None),
    current_admin: Admin = Depends(ensure_admin_user),
    db: AsyncSession = Depends(get_db),
):
    # Prepare the update data
    update_data = AdminUpdateRequest(name=name, phone_number=phone_number)

    return await AdminManagementService(db).update_admin(
        current_admin.user_id, update_data, profile_pic
    )
