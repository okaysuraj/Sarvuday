# app/routes/counsellors/counselling_sessions.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Counsellor, Admin
from app.utils.oauth import ensure_counsellor_user
from app.services.counselling_services.counselling_service import CounsellingSessionService
from app.schemas import CounsellingSessionJoinResponse

router = APIRouter(prefix="/sessions", tags=["Counselling Session Management"])

@router.get("/join/{session_id}", response_model=CounsellingSessionJoinResponse, status_code=status.HTTP_200_OK, summary="Join counselling session. Counsellor Authentication required")
async def join_session(
    session_id: str,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellingSessionService(db).join_counsellor_session(current_user, session_id)

@router.delete("/delete/{session_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete counselling session room. Specifically hit this endpoint after the counselling ended")
async def delete_session_rooms(
    session_id: str,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    status = await CounsellingSessionService(db).delete_counselling_room(session_id)
    if status:
        return None
    else:
        raise HTTPException("Failed to delete the session room")
