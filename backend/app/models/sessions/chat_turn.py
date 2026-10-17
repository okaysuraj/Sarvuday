"""Ordered exchanges saved in the same transaction as their session count."""

from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)

from app.database.postgres import Base
from app.models.records import RecordMixin


class ChatTurn(RecordMixin, Base):
    __tablename__ = "chat_turns"
    __table_args__ = (
        UniqueConstraint("session_id", "position", name="uq_chat_turn_position"),
    )
    session_id = Column(
        String(20), ForeignKey("chat_sessions.session_id"), nullable=False
    )
    position = Column(Integer, nullable=False)
    user_input = Column(Text, nullable=False)
    assistant_response = Column(Text, nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
