"""Counselling sessions endpoints and access checks."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import NormalUser
from app.schemas.counselling_session_schemas import CounsellingSessionJoinResponse
from app.services.counselling_services.counselling_service import (
    CounsellingSessionService,
)
from app.utils.oauth import ensure_normal_user

router = APIRouter(prefix="/sessions", tags=["Normal User Counselling Sessions"])


@router.get(
    "/join/{session_id}",
    response_model=CounsellingSessionJoinResponse,
    status_code=status.HTTP_200_OK,
    summary="Join counselling session. Normal User Authentication required",
)
async def join_session(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await CounsellingSessionService(db).join_session(current_user, session_id)
