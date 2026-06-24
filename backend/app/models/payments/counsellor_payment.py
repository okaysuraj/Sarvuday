# app/models/payments/counsellor_payment.py

from sqlalchemy import Column, String, ForeignKey, Enum as SqlEnum, TIMESTAMP, Index, DECIMAL
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import CommissionTypeEnum, CounsellorPayoutStatusEnum, CounsellorPayoutMethodEnum

class CounsellorPayment(Base, BaseMixin):
    __tablename__ = "counsellor_payments"
    __table_args__ = (
        Index('idx_payment_id', 'payment_id'),
        Index('idx_status', 'status'),
        Index('idx_payout_date', 'payout_date'),
        {}
    )

    payment_id = Column(String(20), primary_key=True, nullable=False, unique=True)
    counsellor_id = Column(String(20), ForeignKey("counsellors.user_id"), nullable=False)
    appointment_id = Column(String(20), ForeignKey("appointments.appointment_id"), nullable=False)

    commission_type = Column(SqlEnum(CommissionTypeEnum), nullable=False)
    net_payout_amount = Column(DECIMAL(10, 2), nullable=False)

    status = Column(SqlEnum(CounsellorPayoutStatusEnum), default=CounsellorPayoutStatusEnum.pending)
    payout_method = Column(SqlEnum(CounsellorPayoutMethodEnum), default=CounsellorPayoutMethodEnum.bank_transfer, nullable=False)

    payout_date = Column(TIMESTAMP(timezone=True), nullable=True)
    transaction_id = Column(String(255), nullable=False)
    invoice_url = Column(String(255), nullable=True)
    currency = Column(String(10), default='INR')

    counsellor = relationship("Counsellor", back_populates="payments")
    appointment = relationship("Appointment", back_populates="counsellor_payment")
