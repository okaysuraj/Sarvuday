# app/routes/admin/counsellor_management.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import ensure_admin_user
from app.schemas import (
    CounsellorListResponse, 
    CounsellorFilterQuery, 
    ApproveCounsellorResponse,  
    DisapprovalCounsellorResponse
)
from app.models import Admin
from app.services.admin import CounsellorManagementService

router = APIRouter(prefix="/counsellors", tags=["Counsellor Management by Admin"])

@router.get("", response_model=CounsellorListResponse, status_code=status.HTTP_200_OK, summary="List counsellors with filters. Admin Authentication Required to access this route")
async def list_counsellors(
    filters: CounsellorFilterQuery = Depends(),
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await CounsellorManagementService(db).get_filtered_counsellors(filters)


@router.post("/approve/{counsellor_id}", response_model=ApproveCounsellorResponse, status_code=status.HTTP_200_OK, summary="Approve counsellor account. Admin Authentication Required to access this route")
async def approve_counsellor(
    counsellor_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await CounsellorManagementService(db).approve_counsellor(counsellor_id, current_admin)


@router.post("/disapprove/{counsellor_id}", response_model=DisapprovalCounsellorResponse, status_code=status.HTTP_200_OK, summary="Disapprove counsellor account. Admin Authentication Required to access this route")
async def disapprove_counsellor(
    counsellor_id: str,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await CounsellorManagementService(db).disapprove_counsellor(counsellor_id, current_admin)

# # Make payment to counsellor route
# @router.post("/payment/{counsellor_id}", status_code=status.HTTP_200_OK, summary="Make payment to counsellor. Admin Authentication Required to access this route")
# async def make_payment_to_counsellor(
#     counsellor_id: str,
#     amount: float = Query(..., description="Amount to be paid to the counsellor"),
#     db: AsyncSession = Depends(get_db),
#     current_admin: Admin = Depends(ensure_admin_user)
# ):
#     """
#     Endpoint to make a payment to a counsellor.
#     """

#     try:
#         return await handle_make_payment_to_counsellor(counsellor_id, amount, current_admin, db)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
    