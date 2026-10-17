"""Counselling service business logic and persistence."""

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models import (
    Appointment,
    CounsellingSession,
    Counsellor,
    CounsellorAvailability,
    NormalUser,
)
from app.schemas.counselling_session_schemas import CounsellingSessionJoinResponse
from app.services.counselling_services.daily_service import DailyService
from app.utils.constants import AppointmentStatusEnum, UserTypeEnum
from app.utils.unique_id_generation import generate_counselling_session_id


class CounsellingSessionService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.daily = DailyService()

    async def create_counselling_session(
        self,
        user_id: str,
        counsellor_id: str,
        availability_slot: CounsellorAvailability,
    ) -> CounsellingSession:
        """Creates video session and returns the session object"""

        # Generate session ID
        session_id = generate_counselling_session_id()

        # Create Daily.co room
        room = await self.daily.create_room(
            name=session_id,
            scheduled_start_time=availability_slot.start_time,
            scheduled_end_time=availability_slot.end_time,
        )

        # Generate tokens
        user_token = await self.daily.create_token(
            room_name=room["name"],
            user_id=user_id,
            scheduled_start_time=availability_slot.start_time,
            scheduled_end_time=availability_slot.end_time,
        )

        counsellor_token = await self.daily.create_token(
            room_name=room["name"],
            user_id=counsellor_id,
            scheduled_start_time=availability_slot.start_time,
            scheduled_end_time=availability_slot.end_time,
        )

        # Create CounsellingSession object
        session = CounsellingSession(
            session_id=session_id,
            user_id=user_id,
            counsellor_id=counsellor_id,
            video_url=room["url"],
            user_token=user_token,
            counsellor_token=counsellor_token,
            room_created_at=datetime.now(timezone.utc).replace(tzinfo=None),
            session_scheduled_at=self._to_utc_aware(
                availability_slot.start_time
            ).replace(tzinfo=None),
            session_expires_at=self._to_utc_aware(availability_slot.end_time).replace(
                tzinfo=None
            ),
        )

        self.db.add(session)

        try:
            await self.db.flush()
        except IntegrityError:
            await self.db.rollback()
            raise HTTPException(
                status_code=400, detail="Could not create counselling session."
            )

        return session

    async def delete_counselling_room(
        self, session_id: str, *, counsellor_id: str | None = None
    ):
        # Delete Daily.co room
        session = await self._get_session(session_id)
        if session is None:
            raise HTTPException(status_code=404, detail="Session not found")
        if counsellor_id is not None and session.counsellor_id != counsellor_id:
            raise HTTPException(
                status_code=403, detail="Only the assigned counsellor can end this room"
            )
        if not session.session_room_deleted:
            status = await self.daily.delete_room(room_name=session_id)

            if status:
                session.session_room_deleted = True
                await self.db.commit()
            return status
        else:
            return True

    async def delete_counselling_rooms_batch(self):
        # Query sessions where session_room_deleted is False
        sessions = await self.db.execute(
            select(CounsellingSession.session_id)
            .filter(
                CounsellingSession.session_room_deleted.is_(False),
                CounsellingSession.session_expires_at
                <= datetime.now(timezone.utc).replace(tzinfo=None),
            )
            .limit(100)
        )
        session_id_list = [session_id for (session_id,) in sessions.fetchall()]

        # Call Daily.co to delete rooms in batch
        if session_id_list:
            status = await self.daily.delete_rooms(room_names=session_id_list)

            # Mark rooms as deleted in the database if successful
            if status:
                await self.db.execute(
                    CounsellingSession.__table__.update()
                    .where(CounsellingSession.session_id.in_(session_id_list))
                    .values(session_room_deleted=True)
                )
                await self.db.commit()
            return status
        return True

    async def join_session(
        self, current_user: NormalUser | Counsellor, session_id: str
    ) -> CounsellingSessionJoinResponse:
        """Apply identical ownership and timing rules to both participants."""
        is_counsellor = current_user.user_type == UserTypeEnum.counsellor
        owner_field = "counsellor_id" if is_counsellor else "user_id"
        session = await self._get_session(session_id)
        if not session or getattr(session, owner_field) != current_user.user_id:
            raise HTTPException(
                status_code=403, detail="Unauthorized to access this session."
            )
        await self._assert_active_appointment(session)
        now = datetime.now(timezone.utc)
        if (
            session.video_session_completed
            or session.session_room_deleted
            or self._to_utc_aware(session.session_expires_at) <= now
        ):
            raise HTTPException(
                status_code=403, detail="Session is no longer available."
            )
        if self._to_utc_aware(session.session_scheduled_at) > now:
            raise HTTPException(status_code=403, detail="Session has not started yet.")
        return CounsellingSessionJoinResponse(
            message="You can now join the session.",
            video_url=session.video_url,
            token=session.counsellor_token if is_counsellor else session.user_token,
        )

    async def _assert_active_appointment(self, session):
        active = await self.db.execute(
            select(Appointment.appointment_id)
            .where(
                Appointment.session_id == session.session_id,
                Appointment.user_id == session.user_id,
                Appointment.counsellor_id == session.counsellor_id,
                Appointment.status == AppointmentStatusEnum.confirmed,
            )
            .limit(1)
        )
        if active.first() is None:
            raise HTTPException(
                status_code=403,
                detail="A confirmed active appointment is required to join this session",
            )

    async def _get_session(self, session_id: str) -> CounsellingSession:
        """Fetch the counselling session details"""
        session = await self.db.execute(
            select(CounsellingSession).filter(
                CounsellingSession.session_id == session_id
            )
        )
        return session.scalar_one_or_none()

    def _to_utc_aware(self, dt):
        if dt is None:
            raise HTTPException(status_code=409, detail="Session timing is unavailable")
        return (
            dt.astimezone(timezone.utc)
            if dt.tzinfo is not None
            else dt.replace(tzinfo=timezone.utc)
        )
