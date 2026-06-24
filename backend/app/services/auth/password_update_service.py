# app/services/auth/password_update_service.py

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import NormalUser, Counsellor, Admin
from app.utils.helper import hash_password, verify_password
from app.schemas import PasswordUpdateRequest, StatusResponse


class PasswordUpdateService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def update_password(
        self,
        data: PasswordUpdateRequest,
        user: NormalUser | Counsellor | Admin  # Using modern union syntax
    ) -> StatusResponse:
        """
        Optimized password update flow that:
        1. Verifies current password
        2. Updates to new password
        3. Handles all edge cases
        """
        # 1. Verify current password matches
        if not verify_password(data.current_password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Current password is incorrect"
            )

        # 2. Update password
        try:
            user.hashed_password = hash_password(data.new_password)
            await self.db.commit()
            await self.db.refresh(user)
            
            return StatusResponse(
                status="success",
                message="Password updated successfully"
            )
            
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Password update failed: {str(e)}"
            )