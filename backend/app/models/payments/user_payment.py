"""Relational records and relationships for user payment."""

from sqlalchemy import (
    DECIMAL,
    JSON,
    TIMESTAMP,
    Boolean,
    Column,
    ForeignKey,
    Index,
    String,
)
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.orm import relationship

from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import PaymentMethodEnum, PaymentStatusEnum


class UserPayment(Base, BaseMixin):
    __tablename__ = "user_payments"
    __table_args__ = (
        Index("idx_user_payment_id", "payment_id"),
        Index("idx_user_payment_status", "status"),
        Index("idx_payment_transaction_id", "transaction_id"),
        {},
    )

    payment_id = Column(String(20), primary_key=True, nullable=False)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)

    amount = Column(DECIMAL(10, 2), nullable=False)
    status = Column(SqlEnum(PaymentStatusEnum), default=PaymentStatusEnum.pending)
    payment_method = Column(SqlEnum(PaymentMethodEnum), nullable=False)
    currency = Column(String(10), default="INR")

    transaction_id = Column(String(255), nullable=False)
    transaction_date = Column(TIMESTAMP(timezone=True), nullable=False)
    payment_gateway = Column(String(50), nullable=False)
    payment_response = Column(JSON, nullable=True)
    payment_receipt_url = Column(String(255), nullable=False)
    refunded = Column(Boolean, default=False)

    user = relationship("NormalUser", back_populates="payments")
    appointment = relationship("Appointment", back_populates="payment", uselist=False)
    refunds = relationship("UserRefund", back_populates="payment")
