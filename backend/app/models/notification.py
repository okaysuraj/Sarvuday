# app/models/notification.py

from sqlalchemy import Column, String, Boolean, Text, Enum as SqlEnum, Index
from app.database.postgres import Base
from app.models.base import BaseMixin
from enum import Enum


class NotificationTypeEnum(str, Enum):
    appointment = "appointment"
    session = "session"
    system = "system"
    payment = "payment"
    approval = "approval"
    chat = "chat"


class Notification(Base, BaseMixin):
    """User notifications for platform events."""
    __tablename__ = "notifications"
    __table_args__ = (
        Index('idx_notification_user', 'user_id', 'is_read'),
        {}
    )

    notification_id = Column(String(50), primary_key=True, index=True, nullable=False)
    user_id = Column(String(20), nullable=False, index=True)
    user_type = Column(String(20), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(SqlEnum(NotificationTypeEnum), default=NotificationTypeEnum.system, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
