# app/schemas/payment_schemas.py

from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Dict, List, Any
from decimal import Decimal
from app.utils.constants import (
    CommissionTypeEnum,
    CounsellorPayoutStatusEnum,
    CounsellorPayoutMethodEnum,
    PaymentStatusEnum,
    PaymentMethodEnum
)
from app.schemas.normal_users_schemas import NormalUserBase
from app.schemas.counsellors_schemas import CounsellorBase
from app.schemas.appointments_schemas import AppointmentBase

# --- Counsellor Payment Schemas ---
class CounsellorPaymentBase(BaseModel):
    payment_id: str
    counsellor_id: str
    appointment_id: str
    commission_type: CommissionTypeEnum
    commission_percentage: float = Field(..., ge=0, le=100)
    platform_fee: Decimal
    net_payout_amount: Decimal
    status: CounsellorPayoutStatusEnum = CounsellorPayoutStatusEnum.pending
    payout_method: CounsellorPayoutMethodEnum
    currency: str = "INR"

    class Config:
        from_attributes = True
        json_encoders = {Decimal: float}

class CounsellorPaymentCreate(BaseModel):
    appointment_id: str
    commission_type: CommissionTypeEnum
    commission_percentage: float = Field(..., ge=0, le=100)
    platform_fee: Decimal
    payout_method: CounsellorPayoutMethodEnum

class CounsellorPaymentResponse(CounsellorPaymentBase):
    counsellor: CounsellorBase
    appointment: AppointmentBase
    payout_date: Optional[datetime]
    payment_gateway_txn_id: Optional[str]
    invoice_url: Optional[str]
    invoice_date: Optional[datetime]

class CounsellorPaymentUpdate(BaseModel):
    status: Optional[CounsellorPayoutStatusEnum]
    payout_date: Optional[datetime]
    payment_gateway_txn_id: Optional[str]
    invoice_url: Optional[str]

class CounsellorPaymentListResponse(BaseModel):
    total_count: int
    total_amount: Decimal
    limit: int
    offset: int
    payments: List[CounsellorPaymentResponse]

class UserPaymentBase(BaseModel):
    payment_id: str
    user_id: str
    appointment_id: str
    amount: Decimal
    status: PaymentStatusEnum = PaymentStatusEnum.pending
    payment_method: PaymentMethodEnum
    currency: str = "INR"
    transaction_id: str
    transaction_date: datetime
    payment_gateway: str
    payment_receipt_url: str

    class Config:
        from_attributes = True
        json_encoders = {Decimal: float}

class UserPaymentInitiate(BaseModel):
    appointment_id: str
    payment_method: PaymentMethodEnum
    amount: Decimal
    currency: str = "INR"

class UserPaymentInitiateResponse(UserPaymentBase):
    message: str
    user: NormalUserBase
    appointment: AppointmentBase
    payment_response: Optional[Dict[str, Any]]

class PaymentRefundRequest(BaseModel):
    refund_amount: Optional[Decimal]
    reason: Optional[str]

class PaymentRefundResponse(BaseModel):
    message: str
    refund_id: str
    refund_amount: Decimal
    refund_transaction_id: Optional[str]
    refunded_invoice_url: Optional[str]
    refund_date: datetime

class UserPaymentListResponse(BaseModel):
    total_count: int
    total_amount: Decimal
    limit: int
    offset: int
    payments: List[UserPaymentBase]
