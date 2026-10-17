"""Relational records and relationships for prescription."""

from sqlalchemy import JSON, Column, DateTime, ForeignKey, Index, String, Text
from sqlalchemy.orm import relationship

from app.database.postgres import Base
from app.models.base import BaseMixin


class Prescription(Base, BaseMixin):
    """Stores all prescriptions after a completed counselling session"""

    __tablename__ = "prescriptions"
    __table_args__ = (Index("idx_prescription_user", "user_id"), {})

    prescription_id = Column(String(20), primary_key=True, nullable=False)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    counsellor_id = Column(
        String(20), ForeignKey("counsellors.user_id"), nullable=True, index=True
    )
    session_id = Column(
        String(50), ForeignKey("counselling_sessions.session_id"), nullable=False
    )
    generated_date = Column(DateTime, nullable=False)
    prescription_url = Column(String(255), nullable=True)
    # Legacy PDF-only prescriptions keep unknown clinical fields null.
    diagnosis = Column(Text, nullable=True)
    medications = Column(JSON, nullable=True)
    recommendations = Column(JSON, nullable=True)

    user = relationship("NormalUser", back_populates="prescription")
    session = relationship("CounsellingSession", back_populates="prescription")
