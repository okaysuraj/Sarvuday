"""Counsellor management endpoints and access checks."""

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Admin
from app.schemas.admins_schemas import (
    ApproveCounsellorResponse,
    DisapprovalCounsellorResponse,
)
from app.schemas.counsellors_schemas import (
    CounsellorFilterQuery,
    CounsellorListResponse,
)
from app.services.admin import CounsellorManagementService
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/counsellors", tags=["Counsellor Management by Admin"])


@router.get(
    "",
    response_model=CounsellorListResponse,
    status_code=status.HTTP_200_OK,
    summary="List counsellors with filters. Admin Authentication Required to access this route",
)
async def list_counsellors(
    filters: CounsellorFilterQuery = Query(),
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await CounsellorManagementService(db).get_filtered_counsellors(filters)


@router.post(
    "/approve/{counsellor_id}",
    response_model=ApproveCounsellorResponse,
    status_code=status.HTTP_200_OK,
    summary="Approve counsellor account. Admin Authentication Required to access this route",
)
async def approve_counsellor(
    counsellor_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await CounsellorManagementService(db).approve_counsellor(
        counsellor_id, current_admin
    )


@router.post(
    "/disapprove/{counsellor_id}",
    response_model=DisapprovalCounsellorResponse,
    status_code=status.HTTP_200_OK,
    summary="Disapprove counsellor account. Admin Authentication Required to access this route",
)
async def disapprove_counsellor(
    counsellor_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await CounsellorManagementService(db).disapprove_counsellor(
        counsellor_id, current_admin
    )
