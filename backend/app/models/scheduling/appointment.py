"""Relational records and relationships for appointment."""

from sqlalchemy import Boolean, Column, ForeignKey, Index, String, Text, text
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.orm import relationship

from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import AppointmentStatusEnum


class Appointment(Base, BaseMixin):
    __tablename__ = "appointments"
    __table_args__ = (
        Index(
            "uq_appointment_review_identity",
            "appointment_id",
            "user_id",
            "counsellor_id",
            unique=True,
        ),
        Index("appointment_id", "availability_slot_id", "session_id"),
        Index(
            "uq_appointment_active_slot",
            "availability_slot_id",
            unique=True,
            postgresql_where=text("status IN ('pending', 'confirmed')"),
        ),
        Index("uq_appointment_session", "session_id", unique=True),
        Index("uq_appointment_payment", "payment_id", unique=True),
        Index("ix_appointments_user_status_created", "user_id", "status", "created_at"),
        Index(
            "ix_appointments_counsellor_status_created",
            "counsellor_id",
            "status",
            "created_at",
        ),
    )

    appointment_id = Column(String(20), primary_key=True, nullable=False)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    counsellor_id = Column(
        String(20), ForeignKey("counsellors.user_id"), nullable=False
    )
    availability_slot_id = Column(
        String(20),
        ForeignKey("counsellor_availability.availability_slot_id"),
        nullable=False,
    )
    session_id = Column(
        String(20), ForeignKey("counselling_sessions.session_id"), nullable=False
    )

    status = Column(
        SqlEnum(AppointmentStatusEnum), default=AppointmentStatusEnum.pending
    )
    reason = Column(Text)
    is_emergency = Column(Boolean, default=False)
    payment_id = Column(
        String(20), ForeignKey("user_payments.payment_id"), nullable=True
    )

    # Refund if any
    refund_id = Column(String(20), ForeignKey("user_refunds.refund_id"), nullable=True)
    cancellation_reason = Column(Text)

    user = relationship("NormalUser", back_populates="appointments")
    counsellor = relationship("Counsellor", back_populates="appointments")
    availability_slot = relationship(
        "CounsellorAvailability", back_populates="appointments"
    )
    payment = relationship(
        "UserPayment",
        back_populates="appointment",
        foreign_keys=[payment_id],
        uselist=False,
    )
    refund = relationship(
        "UserRefund",
        back_populates="appointment",
        foreign_keys=[refund_id],
        uselist=False,
    )
    counsellor_payment = relationship(
        "CounsellorPayment", back_populates="appointment", uselist=False
    )

    # Counselling Session
    session = relationship(
        "CounsellingSession", back_populates="appointment", foreign_keys=[session_id]
    )
