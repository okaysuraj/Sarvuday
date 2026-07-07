# app/models/scheduling/availability.py

from sqlalchemy import Column, String, Text, DateTime, Enum as SqlEnum, ForeignKey, Index, Boolean
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import CounsellorAvailabilityStatusEnum

class CounsellorAvailability(Base, BaseMixin):
    __tablename__ = "counsellor_availability"
    __table_args__ = (
        Index('idx_availability_slot', 'counsellor_id', 'start_time', unique=True),
    )

    availability_slot_id = Column(String(20), primary_key=True, nullable=False)
    counsellor_id = Column(String(20), ForeignKey("counsellors.user_id"), nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    status = Column(SqlEnum(CounsellorAvailabilityStatusEnum), default=CounsellorAvailabilityStatusEnum.available)
    notes = Column(Text)
    is_locked = Column(Boolean, default=False)
    locked_until = Column(DateTime, nullable=True)

    counsellor = relationship("Counsellor", back_populates="availability")
    appointments = relationship("Appointment", back_populates="availability_slot")
