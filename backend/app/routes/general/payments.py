"""Payment APIs. Only provider-confirmed payments can settle appointments."""

from datetime import datetime, timezone
from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.concurrency import run_in_threadpool

from app.config import settings
from app.models.wellness import UserWallet
from app.database.postgres import get_db
from app.models import Counsellor, CounsellorAvailability, UserPayment
from app.services.payments.stripe_service import reconcile_intent, require_stripe
from app.utils.constants import (
    CounsellorAvailabilityStatusEnum,
    PaymentMethodEnum,
    PaymentStatusEnum,
)
from app.utils.oauth import ensure_normal_user
from app.utils.unique_id_generation import generate_user_payment_id

router = APIRouter()


class CreatePaymentIntentRequest(BaseModel):
    availability_slot_id: str = Field(min_length=1, max_length=20)


class CreatePaymentIntentResponse(BaseModel):
    clientSecret: str
    publishableKey: str
    payment_id: str


class TopupWalletRequest(BaseModel):
    amount: Decimal = Field(gt=0, le=100000, max_digits=10, decimal_places=2)


@router.post(
    "/create-intent",
    response_model=CreatePaymentIntentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_payment_intent(
    payload: CreatePaymentIntentRequest,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    stripe = require_stripe()
    if not settings.stripe_publishable_key:
        raise HTTPException(
            status_code=503, detail="Payment service is not configured."
        )
    result = await db.execute(
        select(CounsellorAvailability, Counsellor)
        .join(Counsellor, Counsellor.user_id == CounsellorAvailability.counsellor_id)
        .where(
            CounsellorAvailability.availability_slot_id == payload.availability_slot_id
        )
    )
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Time slot not found.")
    slot, counsellor = row
    if (
        not counsellor.is_approved
        or slot.status != CounsellorAvailabilityStatusEnum.available
    ):
        raise HTTPException(status_code=409, detail="Time slot is unavailable.")
    now = datetime.now(timezone.utc)
    start_time = (
        slot.start_time.replace(tzinfo=timezone.utc)
        if slot.start_time.tzinfo is None
        else slot.start_time
    )
    if start_time <= now:
        raise HTTPException(status_code=409, detail="Time slot has already started.")
    fee = Decimal(str(counsellor.session_fee or 0)).quantize(Decimal("0.01"))
    if fee <= 0:
        raise HTTPException(
            status_code=400, detail="This session does not require payment."
        )
    payment_id = generate_user_payment_id()
    try:
        intent = await run_in_threadpool(
            stripe.PaymentIntent.create,
            api_key=settings.stripe_secret_key,
            amount=int(fee * 100),
            currency="inr",
            automatic_payment_methods={"enabled": True},
            metadata={
                "payment_id": payment_id,
                "user_id": current_user.user_id,
                "availability_slot_id": slot.availability_slot_id,
                "counsellor_id": counsellor.user_id,
            },
            idempotency_key=payment_id,
        )
    except stripe.StripeError:
        raise HTTPException(
            status_code=502, detail="Payment provider is temporarily unavailable."
        )
    db.add(
        UserPayment(
            payment_id=payment_id,
            user_id=current_user.user_id,
            amount=fee,
            status=PaymentStatusEnum.pending,
            payment_method=PaymentMethodEnum.credit_card,
            currency="INR",
            transaction_id=intent.id,
            transaction_date=now,
            payment_gateway="STRIPE",
            payment_receipt_url="",
            payment_response={
                "availability_slot_id": slot.availability_slot_id,
                "counsellor_id": counsellor.user_id,
                "provider_status": intent.status,
            },
        )
    )
    await db.commit()
    return CreatePaymentIntentResponse(
        clientSecret=intent.client_secret,
        publishableKey=settings.stripe_publishable_key,
        payment_id=payment_id,
    )


@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)):
    stripe = require_stripe()
    if not settings.stripe_webhook_secret:
        raise HTTPException(
            status_code=503, detail="Payment webhook is not configured."
        )
    body = await request.body()
    if len(body) > 1024 * 1024:
        raise HTTPException(status_code=413, detail="Webhook payload is too large.")
    try:
        event = stripe.Webhook.construct_event(
            body,
            request.headers.get("stripe-signature", ""),
            settings.stripe_webhook_secret,
        )
    except (ValueError, stripe.SignatureVerificationError):
        raise HTTPException(
            status_code=400, detail="Invalid payment webhook signature."
        )
    if event["type"] == "payment_intent.succeeded":
        intent = event["data"]["object"]
        result = await db.execute(
            select(UserPayment)
            .where(UserPayment.transaction_id == intent["id"])
            .with_for_update()
        )
        payment = result.scalar_one_or_none()
        if payment is None:
            raise HTTPException(
                status_code=503, detail="Payment record is not available yet."
            )
        reconcile_intent(payment, intent)
        await db.commit()
    return {"received": True}


@router.get("/wallet")
async def get_wallet(
    current_user=Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)
):
    wallet = await db.scalar(
        select(UserWallet).where(UserWallet.user_id == current_user.user_id)
    )
    return {
        "status": "success",
        "balance": float(wallet.balance if wallet else 0),
        "vault_savings": float(wallet.vault_savings if wallet else 0),
        "vault_goal": float(wallet.vault_goal if wallet else 0),
        "reward_points": int(wallet.reward_points if wallet else 0),
        "topup_available": False,
    }


@router.post("/wallet/topup")
async def topup_wallet(
    payload: TopupWalletRequest, current_user=Depends(ensure_normal_user)
):
    raise HTTPException(
        status_code=503,
        detail="Wallet top-ups are unavailable until verified payment settlement is configured.",
    )


@router.get("/history")
async def get_payment_history(
    current_user=Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(UserPayment)
        .where(UserPayment.user_id == current_user.user_id)
        .order_by(UserPayment.transaction_date.desc())
        .limit(50)
    )
    return [
        {
            "payment_id": p.payment_id,
            "amount": float(p.amount),
            "status": p.status.value,
            "payment_method": p.payment_method.value,
            "currency": p.currency,
            "transaction_id": p.transaction_id,
            "transaction_date": p.transaction_date.isoformat()
            if p.transaction_date
            else None,
            "receipt_url": p.payment_receipt_url,
        }
        for p in result.scalars().all()
    ]
