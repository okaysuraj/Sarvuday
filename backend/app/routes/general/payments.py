# app/routes/general/payments.py
#
# Top-level payments route for Stripe PaymentIntent creation.
# The frontend calls POST /payments/create-intent from the appointments page.

from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import Optional
from app.database import get_db
from app.utils.oauth import get_current_user
from app.config import settings

router = APIRouter()


class CreatePaymentIntentRequest(BaseModel):
    amount: float
    currency: str = "inr"
    appointment_id: Optional[str] = None


class CreatePaymentIntentResponse(BaseModel):
    clientSecret: str
    publishableKey: str


@router.post(
    "/create-intent",
    response_model=CreatePaymentIntentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a Stripe PaymentIntent for appointment booking",
)
async def create_payment_intent(
    payload: CreatePaymentIntentRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a Stripe PaymentIntent and return the client secret."""
    if not settings.stripe_secret_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe is not configured. Please set STRIPE_SECRET_KEY in your .env file.",
        )

    try:
        import stripe
        stripe.api_key = settings.stripe_secret_key

        # Convert amount to paise (smallest currency unit for INR)
        amount_in_paise = int(payload.amount * 100)

        intent = stripe.PaymentIntent.create(
            amount=amount_in_paise,
            currency=payload.currency,
            metadata={
                "user_id": current_user.user_id,
                "appointment_id": payload.appointment_id or "",
            },
        )

        return CreatePaymentIntentResponse(
            clientSecret=intent.client_secret,
            publishableKey=settings.stripe_publishable_key or "",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create payment intent: {str(e)}",
        )
