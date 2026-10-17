"""Request validation and response models for payment."""

from datetime import datetime
from decimal import Decimal
from typing import Annotated, Any, Dict, List, Optional

from pydantic import BaseModel, PlainSerializer

from app.schemas.appointments_schemas import AppointmentBase
from app.schemas.normal_users_schemas import NormalUserBase
from app.utils.constants import (
    CommissionTypeEnum,
    CounsellorPayoutMethodEnum,
    CounsellorPayoutStatusEnum,
    PaymentMethodEnum,
    PaymentStatusEnum,
)

Money = Annotated[Decimal, PlainSerializer(float, return_type=float, when_used="json")]


# Counsellor payouts expose only fields that exist on the stored record.
class CounsellorPaymentBase(BaseModel):
    payment_id: str
    counsellor_id: str
    appointment_id: str
    commission_type: CommissionTypeEnum
    net_payout_amount: Money
    status: CounsellorPayoutStatusEnum = CounsellorPayoutStatusEnum.pending
    payout_method: CounsellorPayoutMethodEnum
    currency: str = "INR"
    payout_date: Optional[datetime] = None
    transaction_id: str
    invoice_url: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class CounsellorPaymentListResponse(BaseModel):
    total_count: int
    total_amount: Money
    limit: int
    offset: int
    payments: List[CounsellorPaymentBase]


class UserPaymentBase(BaseModel):
    payment_id: str
    user_id: str
    appointment_id: Optional[str] = None
    amount: Money
    status: PaymentStatusEnum = PaymentStatusEnum.pending
    payment_method: PaymentMethodEnum
    currency: str = "INR"
    transaction_id: str
    transaction_date: datetime
    payment_gateway: str
    payment_receipt_url: str

    model_config = {"from_attributes": True}


class UserPaymentInitiate(BaseModel):
    appointment_id: str
    payment_method: PaymentMethodEnum
    amount: Money
    currency: str = "INR"


class UserPaymentInitiateResponse(UserPaymentBase):
    message: str
    user: NormalUserBase
    appointment: AppointmentBase
    payment_response: Optional[Dict[str, Any]]


class UserPaymentListResponse(BaseModel):
    total_count: int
    total_amount: Money
    limit: int
    offset: int
    payments: List[UserPaymentBase]
