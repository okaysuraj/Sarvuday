# app/services/normal_user/user_management_service.py

from fastapi import HTTPException, UploadFile
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import datetime, timedelta, timezone
from app.models import (
    NormalUser,
    ChatSession,
    CounsellingSession
)
from app.schemas import (
    NormalUserBase,
    UserUpdateRequest,
    UserUpdateResponse,
    DashboardOverviewResponse
)
from app.utils.file_utils import replace_uploaded_file, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES

class UserManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard_overview(self, user_id: str) -> DashboardOverviewResponse:
        """Get comprehensive dashboard overview"""
        # Get user basic info
        user = await self._get_user(user_id)
        
        # Get recent chat sessions count
        chat_sessions_count = await self.db.execute(
            select(func.count()).where(ChatSession.user_id == user_id)
        )
        
        # Get upcoming appointments
        upcoming_appointments = await self.db.execute(
            select(CounsellingSession).where(
                CounsellingSession.user_id == user_id,
                CounsellingSession.session_scheduled_at > datetime.now()
            ).order_by(CounsellingSession.

    async def update_user_profile(
        self,
        user_id: str,
        update_data: UserUpdateRequest,
        profile_pic: Optional[UploadFile] = None
    ) -> UserUpdateResponse:
        user = await self._get_user(user_id)

        # Replace old profile picture if new one is provided
        if profile_pic:
            new_path = replace_uploaded_file(
                file=profile_pic,
                old_relative_path=user.profile_pic,
                subdir="profile_pictures",
                allowed_types=ALLOWED_IMAGE_TYPES,
                label="profile picture",
                max_size=MAX_FILE_SIZE_BYTES
            )
            update_data.profile_pic = new_path

        for field, value in update_data.model_dump(exclude_unset=True).items():
            setattr(user, field, value)

        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)

        return UserUpdateResponse(
            message="Data Updated successfully",
            user=NormalUserBase.model_validate(user)
        )
        
    async def delete_account(self, user_id: str) -> bool:
        """Soft delete counsellor account"""
        user = await self._get_user(user_id)
        
        await self.db.delete(user)
        await self.db.commit()
        await self.db.refresh(user)
        
        return None

    async def _get_user(self, user_id: str) -> NormalUser:
        """Internal method to get user or raise 404"""
        user = await self.db.get(NormalUser, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    
    