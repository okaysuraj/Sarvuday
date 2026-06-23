# services/payments/creators.py

from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import UserPayment
from app.utils.constants import PaymentStatusEnum, PaymentMethodEnum
from app.utils.unique_id_generation import generate_user_payment_id

async def create_dummy_user_payment(db: AsyncSession, user_id: str) -> str:
    payment_id = generate_user_payment_id()

    dummy_payment = UserPayment(
        payment_id=payment_id,
        user_id=user_id,
        amount=0.00,
        status=PaymentStatusEnum.completed,
        payment_method=PaymentMethodEnum.upi,
        currency="INR",
        transaction_id="DUMMY_TXN_ID",
        transaction_date=datetime.now(timezone.utc),
        payment_gateway="DUMMY_GATEWAY",
        payment_response={"message": "Dummy payment"},
        payment_receipt_url="https://example.com/dummy_receipt"
    )

    db.add(dummy_payment)
    await db.flush()  # Makes the `payment_id` available for foreign key references

    return payment_id
