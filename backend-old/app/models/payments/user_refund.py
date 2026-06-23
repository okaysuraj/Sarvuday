# app/models/payments/user_refund.py

from sqlalchemy import Column, String, Enum as SqlEnum, ForeignKey, TIMESTAMP, Index, DECIMAL, JSON, Text
from sqlalchemy.orm import relationship
from app.database.mysql import Base
from app.models.base import BaseMixin
from app.utils.constants import PaymentMethodEnum

class UserRefund(Base, BaseMixin):
    __tablename__ = "user_refunds"
    __table_args__ = (
        Index('idx_refund_id', 'refund_id'),
        Index('idx_transaction_id', 'transaction_id'),
        {'mysql_engine': 'InnoDB', 'mysql_charset': 'utf8mb4'}
    )

    refund_id = Column(String(20), primary_key=True, nullable=False, unique=True)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=True)
    payment_id = Column(String(20), ForeignKey("user_payments.payment_id"), nullable=True)

    refund_amount = Column(DECIMAL(10, 2), nullable=True)
    refund_method = Column(SqlEnum(PaymentMethodEnum), nullable=False)
    currency = Column(String(10), default='INR')

    transaction_id = Column(String(255), nullable=False)
    refund_date = Column(TIMESTAMP, nullable=True)
    payment_gateway = Column(String(50), nullable=False)
    payment_response = Column(JSON, nullable=True)
    refunded_invoice_url = Column(String(255), nullable=True)
    refund_reason = Column(Text, nullable=True)

    user = relationship("NormalUser", back_populates="refunds")
    payment = relationship("UserPayment", back_populates="refunds")
    appointment = relationship("Appointment", back_populates="refund", uselist=False)
