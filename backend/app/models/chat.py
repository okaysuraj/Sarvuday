from sqlalchemy import Column, String, Boolean, Enum as SQLEnum, Text
from enum import Enum
from app.database.postgres import Base
from app.models.base import BaseMixin

class MessageType(str, Enum):
    text = "text"
    image = "image"
    file = "file"
    system = "system"

class DirectMessage(Base, BaseMixin):
    __tablename__ = "direct_messages"

    message_id = Column(String(50), primary_key=True, index=True)
    room_id = Column(String(100), index=True, nullable=False)
    sender_id = Column(String(50), index=True, nullable=False)
    sender_type = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    message_type = Column(SQLEnum(MessageType, name="messagetype"), default=MessageType.text, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
