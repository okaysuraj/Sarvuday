"""Private support requests, moderation decisions and contact submissions."""

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Index, String, Text
from sqlalchemy.dialects.postgresql import JSONB

from app.database.postgres import Base
from app.models.records import RecordMixin


class CrisisLog(RecordMixin, Base):
    __tablename__ = "crisis_logs"
    __table_args__ = (
        Index("ix_crisis_created", "created_at"),
        Index("ix_crisis_user_created", "user_id", "created_at"),
    )
    user_id = Column(String(20), ForeignKey("accounts.user_id"), nullable=False)
    risk_level = Column(String(50), nullable=False)
    source = Column(String(100), nullable=False)
    notes = Column(Text, nullable=False, default="")
    is_resolved = Column(Boolean, nullable=False, default=False)


class FlaggedContent(RecordMixin, Base):
    __tablename__ = "flagged_content"
    __table_args__ = (Index("ix_flags_status_created", "status", "created_at"),)
    content = Column(Text, nullable=False)
    status = Column(String(50), nullable=False, default="pending")
    user_initials = Column(String(100), nullable=False, default="")
    user_name = Column(Text, nullable=False, default="Anonymous")
    source = Column(String(100), nullable=False, default="Platform")
    tags = Column(JSONB, nullable=False, default=list)
    resolution_action = Column(String(50))
    resolved_by = Column(String(20), ForeignKey("admins.user_id"))
    resolved_at = Column(DateTime(timezone=True))


class ContactSubmission(RecordMixin, Base):
    __tablename__ = "contact_submissions"
    name = Column(String(200), nullable=False)
    email = Column(String(320), nullable=False)
    subject = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    submitted_at = Column(DateTime(timezone=True), nullable=False)
    is_resolved = Column(Boolean, nullable=False, default=False)
