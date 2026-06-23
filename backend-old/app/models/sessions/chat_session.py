# app/models/sessions/chat_session.py

from sqlalchemy import Column, String, Boolean, Text, Integer, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.database.mysql import Base
from app.models.base import BaseMixin

class ChatSession(Base, BaseMixin):
    """Chat session between user and chatbot"""
    __tablename__ = "chat_sessions"
    __table_args__ = (Index('idx_chat_session_id', 'session_id', "user_id"),)

    session_id = Column(String(20), primary_key=True, unique=True, index=True, nullable=False)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)

    title = Column(String(255))
    message_count = Column(Integer, default=0)
    emotions_detected = Column(Text)  # e.g. {"happy": 0.8, "sad": 0.2}
    is_crisis = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)

    # Relationship
    user = relationship("NormalUser", back_populates="chat_sessions")

    