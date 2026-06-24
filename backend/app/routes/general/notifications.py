# app/routes/general/notifications.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import get_current_user
from app.schemas import NotificationListResponse
from app.services.notifications.notification_service import NotificationService

router = APIRouter()


@router.get(
    "",
    response_model=NotificationListResponse,
    status_code=status.HTTP_200_OK,
    summary="Get all notifications for the current user",
)
async def get_notifications(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await NotificationService(db).get_notifications(current_user.user_id)


@router.patch(
    "/{notification_id}/read",
    status_code=status.HTTP_200_OK,
    summary="Mark a notification as read",
)
async def mark_notification_read(
    notification_id: str,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await NotificationService(db).mark_as_read(current_user.user_id, notification_id)
