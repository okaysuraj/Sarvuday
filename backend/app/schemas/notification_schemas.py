"""Request validation and response models for notification."""

from datetime import datetime
from typing import List

from pydantic import BaseModel


class NotificationBase(BaseModel):
    notification_id: str
    user_id: str
    user_type: str
    title: str
    message: str
    type: str
    is_read: bool = False
    created_at: datetime

    model_config = {"from_attributes": True}


class NotificationListResponse(BaseModel):
    notifications: List[NotificationBase]
    total: int = 0

    model_config = {"from_attributes": True}
