# app/services/payments/counsellor_payment_service.py

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from decimal import Decimal
from app.models import CounsellorPayment
from app.schemas import CounsellorPaymentListResponse, CounsellorPaymentBase

class CounsellorPaymentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_payment_history(
        self,
        counsellor_id: str,
        limit: int = 10,
        offset: int = 0
    ) -> CounsellorPaymentListResponse:
        # Query to get the total count of payments
        count_query = select(func.count()).where(CounsellorPayment.counsellor_id == counsellor_id)
        total_result = await self.db.execute(count_query)
        total_count = total_result.scalar()

        # Query to get the total amount of payments
        total_amount_query = select(func.sum(CounsellorPayment.final_amount)).where(CounsellorPayment.counsellor_id == counsellor_id)
        total_amount_result = await self.db.execute(total_amount_query)
        total_amount = total_amount_result.scalar() or Decimal(0)

        # Query to get the list of payments
        result = await self.db.execute(
            select(CounsellorPayment)
            .where(CounsellorPayment.counsellor_id == counsellor_id)
            .order_by(CounsellorPayment.transaction_date.desc())
            .limit(limit).offset(offset)
        )
        payments = result.scalars().all()

        # Return the response in the desired format
        return CounsellorPaymentListResponse(
            total_count=total_count,
            total_amount=total_amount,
            limit=limit,
            offset=offset,
            payments=[CounsellorPaymentBase.model_validate(payment) for payment in payments],
        )
    
    

    async def get_payment_details(
        self,
        counsellor_id: str,
        payment_id: str
    ) -> CounsellorPaymentBase:
        payment = await self.db.get(CounsellorPayment, payment_id)
        if not payment or payment.counsellor_id != counsellor_id:
            raise HTTPException(status_code=404, detail="Payment not found")
        return CounsellorPaymentBase.model_validate(payment)


    