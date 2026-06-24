# app/services/notifications/notification_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from fastapi import HTTPException, status
from uuid import uuid4
from app.models.notification import Notification, NotificationTypeEnum
from app.schemas import NotificationBase, NotificationListResponse


class NotificationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_notifications(self, user_id: str, limit: int = 50) -> NotificationListResponse:
        """Get all notifications for a user, newest first."""
        query = (
            select(Notification)
            .where(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
            .limit(limit)
        )
        result = await self.db.execute(query)
        notifications = result.scalars().all()

        return NotificationListResponse(
            notifications=[
                NotificationBase.model_validate(n) for n in notifications
            ],
            total=len(notifications),
        )

    async def mark_as_read(self, user_id: str, notification_id: str):
        """Mark a single notification as read."""
        query = (
            update(Notification)
            .where(
                Notification.notification_id == notification_id,
                Notification.user_id == user_id,
            )
            .values(is_read=True)
        )
        result = await self.db.execute(query)
        if result.rowcount == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Notification not found.",
            )
        await self.db.commit()
        return {"status": "success", "message": "Notification marked as read."}

    async def create_notification(
        self,
        user_id: str,
        user_type: str,
        title: str,
        message: str,
        notification_type: NotificationTypeEnum = NotificationTypeEnum.system,
    ) -> Notification:
        """Create a notification for a user."""
        notification = Notification(
            notification_id=f"NOTIF-{uuid4().hex[:12]}",
            user_id=user_id,
            user_type=user_type,
            title=title,
            message=message,
            type=notification_type,
            is_read=False,
        )
        self.db.add(notification)
        await self.db.commit()
        return notification
