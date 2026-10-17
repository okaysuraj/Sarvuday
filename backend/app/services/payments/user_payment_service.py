"""User payment service business logic and persistence."""

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.concurrency import run_in_threadpool

from app.config import settings
from app.models import NormalUser, UserPayment
from app.schemas.payment_schemas import (
    UserPaymentBase,
    UserPaymentInitiate,
    UserPaymentInitiateResponse,
    UserPaymentListResponse,
)
from app.services.payments.stripe_service import reconcile_intent, require_stripe


class UserPaymentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_payment_history(
        self, user_id: str, limit: int = 10, offset: int = 0
    ) -> UserPaymentListResponse:
        summary = select(
            func.count(), func.coalesce(func.sum(UserPayment.amount), 0)
        ).where(UserPayment.user_id == user_id)
        total_count, total_amount = (await self.db.execute(summary)).one()

        # Query to get the list of payments
        result = await self.db.execute(
            select(UserPayment)
            .where(UserPayment.user_id == user_id)
            .order_by(UserPayment.transaction_date.desc())
            .limit(limit)
            .offset(offset)
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
        self, user_id: str, payment_id: str
    ) -> UserPaymentBase:
        payment = await self.db.get(UserPayment, payment_id)
        if not payment or payment.user_id != user_id:
            raise HTTPException(status_code=404, detail="Payment not found")
        return UserPaymentBase.model_validate(payment)

    async def initiate_payment(
        self, current_user: NormalUser, payment_data: UserPaymentInitiate
    ) -> UserPaymentInitiateResponse:
        raise HTTPException(
            status_code=410,
            detail="Use /payments/create-intent with an availability slot to start checkout.",
        )

    async def verify_payment(self, user_id: str, verification_data):
        stripe = require_stripe()
        result = await self.db.execute(
            select(UserPayment)
            .where(
                UserPayment.payment_id == verification_data.payment_id,
                UserPayment.user_id == user_id,
            )
            .with_for_update()
        )
        payment = result.scalar_one_or_none()
        if not payment or payment.payment_gateway != "STRIPE":
            raise HTTPException(status_code=404, detail="Payment not found")
        try:
            intent = await run_in_threadpool(
                stripe.PaymentIntent.retrieve,
                payment.transaction_id,
                api_key=settings.stripe_secret_key,
                expand=["latest_charge"],
            )
        except stripe.StripeError:
            raise HTTPException(
                status_code=502, detail="Payment provider is temporarily unavailable"
            )
        reconcile_intent(payment, intent, require_unreversed_charge=True)
        await self.db.commit()
        return {"status": "completed", "payment_id": payment.payment_id}
