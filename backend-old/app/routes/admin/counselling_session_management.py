# app/routes/admin/counselling_session_management.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import ensure_admin_user
from app.models import Admin
from app.services.counselling_services.counselling_service import CounsellingSessionService

router = APIRouter(prefix="/sessions", tags=["Counselling Session Management by Admin"])

@router.delete("", status_code=status.HTTP_200_OK, summary="Delete all the completed counselling sessions rooms")
async def delete_counselling_session_rooms(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    status = await CounsellingSessionService(db).delete_counselling_rooms_batch()
    if status:
        return True
    else:
        raise HTTPException("Failed to delete the session rooms")

@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete counselling session room with session id")
async def delete_session_rooms(
    session_id: str,
    current_user: Admin = Depends(ensure_admin_user),
    db: AsyncSession = Depends(get_db)
):
    status = await CounsellingSessionService(db).delete_counselling_room(session_id)
    if status:
        return None
    else:
        raise HTTPException("Failed to delete the session room")
