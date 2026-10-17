"""Shared provider verification. Client claims never mark a payment complete."""

from collections.abc import Mapping
from decimal import Decimal, InvalidOperation

from fastapi import HTTPException

from app.config import settings
from app.utils.constants import PaymentStatusEnum


def require_stripe():
    if not settings.stripe_secret_key:
        raise HTTPException(
            status_code=503, detail="Payment service is not configured."
        )
    import stripe

    return stripe


def reconcile_intent(payment, intent, *, require_unreversed_charge=False):
    failure = HTTPException(
        status_code=409, detail="Payment has not been confirmed for this booking."
    )
    if not isinstance(intent, Mapping):
        raise failure
    metadata = intent.get("metadata")
    expected = payment.payment_response
    if not isinstance(metadata, Mapping) or not isinstance(expected, Mapping):
        raise failure
    if any(
        not isinstance(metadata.get(key), str) or not metadata[key]
        for key in ("payment_id", "user_id", "availability_slot_id", "counsellor_id")
    ) or any(
        not isinstance(expected.get(key), str) or not expected[key]
        for key in ("availability_slot_id", "counsellor_id")
    ):
        raise failure
    try:
        amount = Decimal(str(payment.amount))
        if not amount.is_finite():
            raise failure
        expected_amount = int(amount * 100)
    except (ValueError, TypeError, InvalidOperation, OverflowError):
        raise failure
    received = intent.get("amount_received")
    if (
        amount <= 0
        or amount * 100 != expected_amount
        or not isinstance(received, int)
        or isinstance(received, bool)
        or not isinstance(payment.currency, str)
    ):
        raise failure
    if (
        intent.get("id") != payment.transaction_id
        or metadata.get("payment_id") != payment.payment_id
        or metadata.get("user_id") != payment.user_id
        or metadata.get("availability_slot_id") != expected.get("availability_slot_id")
        or metadata.get("counsellor_id") != expected.get("counsellor_id")
        or str(intent.get("currency", "")).upper() != payment.currency.upper()
        or received != expected_amount
        or intent.get("status") != "succeeded"
    ):
        raise HTTPException(
            status_code=409, detail="Payment has not been confirmed for this booking."
        )
    if payment.refunded or payment.status == PaymentStatusEnum.refunded:
        raise HTTPException(status_code=409, detail="Payment was refunded.")
    charge = intent.get("latest_charge")
    if isinstance(charge, Mapping):
        if (
            charge.get("payment_intent") != payment.transaction_id
            or charge.get("paid") is not True
            or charge.get("refunded") is True
            or charge.get("disputed") is True
            or charge.get("amount_refunded", 0) != 0
        ):
            raise HTTPException(
                status_code=409,
                detail="Payment charge was refunded, disputed, or is unavailable.",
            )
    elif require_unreversed_charge:
        raise HTTPException(
            status_code=409, detail="Payment charge verification is unavailable."
        )
    payment.status = PaymentStatusEnum.completed
    payment.payment_response = {
        **expected,
        "provider_status": "succeeded",
        "verified_by_provider": True,
    }
