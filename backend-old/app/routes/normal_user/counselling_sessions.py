# app/routes/normal_user/sessions.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import NormalUser
from app.database import get_db
from app.utils.oauth import ensure_normal_user
from app.services.counselling_services.counselling_service import CounsellingSessionService
from app.schemas import CounsellingSessionJoinResponse


router = APIRouter(prefix="/sessions", tags=["Normal User Counselling Sessions"])


@router.get("/join/{session_id}", response_model=CounsellingSessionJoinResponse, status_code=status.HTTP_200_OK, summary="Join counselling session. Normal User Authentication required")
async def join_session(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellingSessionService(db).join_user_session(current_user, session_id)