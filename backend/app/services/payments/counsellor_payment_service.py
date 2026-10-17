"""Counsellor payment service business logic and persistence."""

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import CounsellorPayment
from app.schemas.payment_schemas import (
    CounsellorPaymentBase,
    CounsellorPaymentListResponse,
)


class CounsellorPaymentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_payment_history(
        self, counsellor_id: str, limit: int = 10, offset: int = 0
    ) -> CounsellorPaymentListResponse:
        summary = select(
            func.count(),
            func.coalesce(func.sum(CounsellorPayment.net_payout_amount), 0),
        ).where(CounsellorPayment.counsellor_id == counsellor_id)
        total_count, total_amount = (await self.db.execute(summary)).one()

        # Query to get the list of payments
        result = await self.db.execute(
            select(CounsellorPayment)
            .where(CounsellorPayment.counsellor_id == counsellor_id)
            .order_by(CounsellorPayment.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        payments = result.scalars().all()

        # Return the response in the desired format
        return CounsellorPaymentListResponse(
            total_count=total_count,
            total_amount=total_amount,
            limit=limit,
            offset=offset,
            payments=[
                CounsellorPaymentBase.model_validate(payment) for payment in payments
            ],
        )

    async def get_payment_details(
        self, counsellor_id: str, payment_id: str
    ) -> CounsellorPaymentBase:
        payment = await self.db.get(CounsellorPayment, payment_id)
        if not payment or payment.counsellor_id != counsellor_id:
            raise HTTPException(status_code=404, detail="Payment not found")
        return CounsellorPaymentBase.model_validate(payment)
