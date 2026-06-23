# app/services/counselling_services/counselling_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from app.models import Counsellor, NormalUser, CounsellorAvailability, CounsellingSession
from datetime import datetime, timezone, timedelta
from app.utils.unique_id_generation import generate_counselling_session_id
from app.services.counselling_services.daily_service import DailyService
from sqlalchemy.exc import IntegrityError
from app.schemas import CounsellingSessionJoinResponse



class CounsellingSessionService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.daily = DailyService()
    
    async def create_counselling_session(
        self,
        user_id: str,
        counsellor_id: str,
        appointment_id: str,
        availability_slot: CounsellorAvailability
    ) -> CounsellingSession:
        """Creates video session and returns the session object"""

        # Generate session ID
        session_id = generate_counselling_session_id()

        # Create Daily.co room
        room = await self.daily.create_room(
            name=session_id, scheduled_start_time=availability_slot.start_time, 
            scheduled_end_time=availability_slot.end_time
        )
        
        # Generate tokens
        user_token = await self.dai
        return CounsellingSessionJoinResponse(
            message="You can now join the session.",
            video_url=session.video_url,
            token=session.user_token
        )
    
    async def join_counsellor_session(self, current_user: Counsellor, session_id: str)-> CounsellingSessionJoinResponse:
        """Business logic for counsellor to join the session"""
        session = await self._get_session(session_id)
        
        session_scheduled_at = self._to_utc_aware(session.session_scheduled_at)
        session_expires_at = self._to_utc_aware(session.session_expires_at)
            
        if not session or session.video_session_completed or session_expires_at < datetime.now(timezone.utc):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Session is no longer available.")
        
        # Check if the user is allowed to join the session now
        if session_scheduled_at > datetime.now(timezone.utc):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Session is scheduled for a different time slot")
        
        return CounsellingSessionJoinResponse(
            message="You can now join the session.",
            video_url=session.video_url,
            token=session.counsellor_token
        )

    async def _get_session(self, session_id: str) -> CounsellingSession:
        """Fetch the counselling session details"""
        session = await self.db.execute(
            select(CounsellingSession).filter(CounsellingSession.session_id == session_id)
        )
        return session.scalar_one_or_none()
    
    def _to_utc_aware(self, dt):
        return dt if dt.tzinfo is not None else dt.replace(tzinfo=timezone.utc)
    
