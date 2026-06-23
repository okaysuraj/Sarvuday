# app/services/payments/user_payment_service.py

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime
from decimal import Decimal
from app.models import NormalUser, UserPayment
from app.schemas import (
    UserPaymentBase,
    UserPaymentListResponse,
    UserPaymentInitiate,
    UserPaymentInitiateResponse,
)
from app.utils.unique_id_generation import generate_user_payment_id
from app.utils.constants import PaymentStatusEnum


class UserPaymentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_payment_history(
        self,
        user_id: str,
        limit: int = 10,
        offset: int = 0
    ) -> UserPaymentListResponse:
        # Query to get the total count of payments
        count_query = select(func.count()).where(UserPayment.user_id == user_id)
        total_result = await self.db.execute(count_query)
        total_count = total_result.scalar()

        # Query to get the total amount of payments
        total_amount_query = select(func.sum(UserPayment.final_amount)).where(UserPayment.user_id == user_id)
        total_amount_result = await self.db.execute(total_amount_query)
        total_amount = total_amount_result.scalar() or Decimal(0)

        # Query to get the list of payments
        result = await self.db.execute(
            select(UserPayment)
            .where(UserPayment.user_id == user_id)
            .order_by(UserPayment.transaction_date.desc())
            .limit(limit).offset(offset)
        )
        payments = result.scalars().all()

        # Return the response in the desired format
        return UserPaymentListResponse(
            total_count=total_count,
            total_amount=total_amount,
            limit=limit,
            offset=offset,
            payments=[UserPaymentBase.model_validate(payment) for payment in payments],
        )

    async def get_payment_details(
        self,
        user_id: str,
        payment_id: str
    ) -> UserPaymentBase:
        payment = await self.db.get(UserPayment, payment_id)
        if not payment or payment.user_id != user_id:
            raise HTTPException(status_code=404, detail="Payment not found")
        return UserPaymentBase.model_validate(payment)

    async def initiate_payment(
        self,
        current_user: NormalUser,
        payment_data: UserPaymentInitiate
    ) -> UserPaymentInitiateResponse:
        # In final implementation, this would call a payment gateway
        
        pass


    async def verify_payment(
        self,
        user_id: str,
        verification_data: str
    ):
        pass