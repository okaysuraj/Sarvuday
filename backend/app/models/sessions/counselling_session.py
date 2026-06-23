# app/models/sessions/counselling_session.py

from sqlalchemy import Column, String, ForeignKey, DateTime, Index, Float, Text, Boolean
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin

class CounsellingSession(Base, BaseMixin):
    """Completed counselling session"""
    __tablename__ = "counselling_sessions"
    __table_args__ = (
        Index('session_id', 'user_id', 'counsellor_id'),
    )

    session_id = Column(String(20), primary_key=True, index=True, unique=True, nullable=False)

    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    counsellor_id = Column(String(20), ForeignKey("counsellors.user_id"), nullable=False)

    # Video call details
    video_url = Column(Text, nullable=False)
    user_token = Column(Text, nullable=False)
    counsellor_token = Column(Text, nullable=False)
    room_created_at = Column(DateTime, nullable=False)
    session_scheduled_at = Column(DateTime, nullable=False)
    session_expires_at = Column(DateTime, nullable=True)
    video_session_completed = Column(Boolean, default=False)
    session_room_deleted = Column(Boolean, default=False)
    
    rating = Column(Float, nullable=True)

    # Relationships
    user = relationship("NormalUser", back_populates="counselling_sessions")
    counsellor = relationship("Counsellor", back_populates="counselling_sessions")
    
    # Appointment
    appointment = relationship(
        "Appointment",
        back_populates="session"
    )
    
    prescription = relationship("Prescription", back_populates="session")

    