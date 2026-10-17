"""Payments endpoints and access checks."""

from fastapi import APIRouter, Depends, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import NormalUser
from app.schemas.payment_schemas import (
    UserPaymentBase,
    UserPaymentInitiate,
    UserPaymentInitiateResponse,
    UserPaymentListResponse,
)
from app.services.payments.user_payment_service import UserPaymentService
from app.utils.oauth import ensure_normal_user


class VerifyPaymentRequest(BaseModel):
    payment_id: str = Field(min_length=1, max_length=20)


router = APIRouter(prefix="/payments", tags=["Normal User Payment Management"])


@router.get(
    "",
    response_model=UserPaymentListResponse,
    status_code=status.HTTP_200_OK,
    summary="Get Payment history. Normal User Authentication required",
)
async def payment_history(
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await UserPaymentService(db).get_payment_history(
        current_user.user_id, limit, offset
    )


@router.get(
    "/{payment_id}",
    response_model=UserPaymentBase,
    status_code=status.HTTP_200_OK,
    summary="Payment details by Payment ID. Normal User Authentication required",
)
async def payment_details(
    payment_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await UserPaymentService(db).get_payment_details(
        current_user.user_id, payment_id
    )


@router.post(
    "/initiate",
    response_model=UserPaymentInitiateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Initiate a payment to confirm counselling booking. Normal User Authentication required",
)
async def initiate_payment(
    payment_data: UserPaymentInitiate,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await UserPaymentService(db).initiate_payment(current_user, payment_data)


@router.post(
    "/verify",
    status_code=status.HTTP_201_CREATED,
    summary="Verify the initiated payment to confirm booking. Normal User Authentication required",
)
async def verify_payment(
    verification_data: VerifyPaymentRequest,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await UserPaymentService(db).verify_payment(
        current_user.user_id, verification_data
    )
