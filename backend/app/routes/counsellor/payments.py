# app/routes/counsellor/payments.py

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Counsellor
from app.utils.oauth import ensure_counsellor_user
from app.schemas import (
    CounsellorPaymentListResponse, 
    CounsellorPaymentBase
)
from app.services.payments.counsellor_payment_service import CounsellorPaymentService

router = APIRouter(prefix="/payments", tags=["Counsellor Payment Management"])

@router.get("", response_model=CounsellorPaymentListResponse,  status_code=status.HTTP_200_OK, summary="Get payment history. Counsellor Authentication required")
async def get_payments(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellorPaymentService(db).get_payment_history(current_user.user_id, limit, offset)


@router.get("/{payment_id}", response_model=CounsellorPaymentBase, status_code=status.HTTP_200_OK, summary="Get payment details by payment ID. Counsellor Authentication required")
async def get_payment_details(
    payment_id: str,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellorPaymentService(db).get_payment_details(current_user.user_id, payment_id)

