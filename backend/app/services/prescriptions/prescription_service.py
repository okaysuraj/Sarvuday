"""Prescription service business logic and persistence."""

from datetime import datetime, timezone

from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import CounsellingSession, Prescription
from app.schemas.prescription_schemas import (
    PrescriptionBase,
    PrescriptionCreate,
    PrescriptionListResponse,
)
from app.utils.unique_id_generation import generate_prescription_id


class PrescriptionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_prescriptions(self, user_id: str, limit: int = 100, offset: int = 0):
        query = select(Prescription).where(Prescription.user_id == user_id)
        total = (
            await self.db.execute(select(func.count()).select_from(query.subquery()))
        ).scalar_one()
        records = (
            (
                await self.db.execute(
                    query.order_by(Prescription.generated_date.desc())
                    .limit(min(max(limit, 1), 100))
                    .offset(max(offset, 0))
                )
            )
            .scalars()
            .all()
        )
        return PrescriptionListResponse(
            total_count=total,
            prescriptions=[PrescriptionBase.model_validate(p) for p in records],
        )

    async def get_prescription(self, user_id: str, prescription_id: str):
        record = await self.db.get(Prescription, prescription_id)
        if record is None or record.user_id != user_id:
            raise HTTPException(status_code=404, detail="Prescription not found")
        return PrescriptionBase.model_validate(record)

    async def create_prescription(
        self, counsellor_id: str, prescription_data: PrescriptionCreate
    ):
        session = (
            await self.db.execute(
                select(CounsellingSession).where(
                    CounsellingSession.session_id == prescription_data.session_id,
                    CounsellingSession.counsellor_id == counsellor_id,
                    CounsellingSession.user_id == prescription_data.user_id,
                )
            )
        ).scalar_one_or_none()
        if session is None:
            raise HTTPException(status_code=404, detail="Patient session not found")
        if not session.video_session_completed:
            raise HTTPException(
                status_code=409,
                detail="Complete the clinical session before creating a prescription",
            )
        now = datetime.now(timezone.utc)
        record = Prescription(
            **prescription_data.model_dump(),
            prescription_id=generate_prescription_id(),
            counsellor_id=counsellor_id,
            generated_date=now.replace(tzinfo=None),
            created_at=now,
        )
        self.db.add(record)
        await self.db.commit()
        await self.db.refresh(record)
        return PrescriptionBase.model_validate(record)

    async def get_user_prescriptions(self, user_id: str, counsellor_id: str):
        query = select(Prescription).where(
            Prescription.user_id == user_id, Prescription.counsellor_id == counsellor_id
        )
        total = (
            await self.db.execute(select(func.count()).select_from(query.subquery()))
        ).scalar_one()
        records = (
            (
                await self.db.execute(
                    query.order_by(Prescription.created_at.desc()).limit(100)
                )
            )
            .scalars()
            .all()
        )
        return PrescriptionListResponse(
            total_count=total,
            prescriptions=[PrescriptionBase.model_validate(p) for p in records],
        )
