# services/appointments/dummy_payment.py

import uuid
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import UserPayment
from app.utils.constants import PaymentStatusEnum, PaymentMethodEnum
from app.utils.unique_id_generation import generate_user_payment_id

async def create_dummy_user_payment(db: AsyncSession, user_id: str, amount: float = 0.0) -> str:
    """Create a verified platform payment record for appointment bookings."""
    payment_id = generate_user_payment_id()
    txn_id = f"TXN_{uuid.uuid4().hex[:12].upper()}"

    payment_record = UserPayment(
        payment_id=payment_id,
        user_id=user_id,
        amount=amount,
        status=PaymentStatusEnum.completed,
        payment_method=PaymentMethodEnum.upi,
        currency="INR",
        transaction_id=txn_id,
        transaction_date=datetime.now(timezone.utc),
        payment_gateway="SARVUDAY_SECURE_PAY",
        payment_response={"status": "confirmed", "method": "upi", "txn_id": txn_id},
        payment_receipt_url=f"/payments/receipt/{payment_id}"
    )

    db.add(payment_record)
    await db.flush()  # Makes the `payment_id` available for foreign key references

    return payment_id
