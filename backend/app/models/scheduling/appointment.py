# app/models/scheduling/appointment.py

from sqlalchemy import Column, String, Text, Enum as SqlEnum, ForeignKey, Index, Boolean
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import AppointmentStatusEnum

class Appointment(Base, BaseMixin):
    __tablename__ = "appointments"
    __table_args__ = (
        Index('appointment_id', 'availability_slot_id', 'session_id'),
    )

    appointment_id = Column(String(20), primary_key=True, nullable=False)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    counsellor_id = Column(String(20), ForeignKey("counsellors.user_id"), nullable=False)
    availability_slot_id = Column(String(20), ForeignKey("counsellor_availability.availability_slot_id"), nullable=False)
    session_id = Column(String(20), ForeignKey("counselling_sessions.session_id"), nullable=False)

    status = Column(SqlEnum(AppointmentStatusEnum), default=AppointmentStatusEnum.pending)
    reason = Column(Text)
    is_emergency = Column(Boolean, default=False)
    payment_id = Column(String(20), ForeignKey("user_payments.payment_id"), nullable=False)
    
    # Refund if any
    refund_id = Column(String(20), ForeignKey("user_refunds.refund_id"), nullable=True)
    cancellation_reason = Column(Text)

    user = relationship("NormalUser", back_populates="appointments")
    counsellor = relationship("Counsellor", back_populates="appointments")
    availability_slot = relationship("CounsellorAvailability", back_populates="appointments")
    payment = relationship("UserPayment", back_populates="appointment", foreign_keys=[payment_id], uselist=False)
    refund = relationship("UserRefund", back_populates="appointment", foreign_keys=[refund_id], uselist=False)
    counsellor_payment = relationship("CounsellorPayment", back_populates="appointment", uselist=False)
    
    # Counselling Session
    session = relationship(
        "CounsellingSession",
        back_populates="appointment",
        foreign_keys=[session_id]
    )
