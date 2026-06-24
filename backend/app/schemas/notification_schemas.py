# app/schemas/notification_schemas.py

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class NotificationBase(BaseModel):
    notification_id: str
    user_id: str
    user_type: str
    title: str
    message: str
    type: str
    is_read: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class NotificationListResponse(BaseModel):
    notifications: List[NotificationBase]
    total: int = 0

    class Config:
        from_attributes = True
