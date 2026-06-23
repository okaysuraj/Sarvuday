# app/models/session/user_sentiment.py

from sqlalchemy import Column, String, Integer, ForeignKey, TIMESTAMP, Index, Float
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin

class UserSentiment(Base, BaseMixin):
    """Daily sentiment record for a user"""
    __tablename__ = "user_sentiments"
    __table_args__ = (
        Index('idx_user_id', 'user_id'),
        Index('idx_sentiment_date', 'date'),
        {},
    )

    sentiment_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False, index=True)
    date = Column(TIMESTAMP(timezone=True), nullable=False)

    dominant_emotion = Column(String(50), nullable=False)
    emotion_intensity_score = Column(Float, nullable=False)
    message_count = Column(Integer, nullable=False)

    # Relationships    
    sentiment_user = relationship("NormalUser", back_populates="user_sentiments")
