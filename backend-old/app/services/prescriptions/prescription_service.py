# app/services/prescriptions/prescription_service.py

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from typing import List, Optional
from app.models import Prescription, CounsellingSession
from datetime import datetime, timezone
from app.schemas import (
    PrescriptionListResponse,
    PrescriptionBase,
    PrescriptionCreate
)

class PrescriptionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_prescriptions(self, user_id: str) -> PrescriptionListResponse:
        # Query to get the total count of prescriptions
        count_query = select(func.count()).where(Prescription.user_id == user_id)
        total_result = await self.db.execute(count_query)
        total_count = total_result.scalar()

        # Query to get the list of prescriptions
        result = await self.db.execute(
            select(Prescription)
            .where(Prescription.user_id == user_id)
            .order_by(Prescription.generated_date.desc())
        )
        prescriptions = result.scalars().all()

        # Return the response in the desired format
        return PrescriptionListResponse(
            total_count=total_count,
            prescriptions=[PrescriptionBase.model_validate(prescription) for prescription in prescriptions]
        )

    async def get_prescription(
        self,
        user_id: str,
        prescription_id: str
    ) -> PrescriptionBase:
        # Fetch the prescription by ID
        prescription = await self.db.get(Prescription, prescription_id)
        if not prescription or prescription.user_id != user_id:
            raise HTTPException(status_code=404, detail="Prescription not found")

        # Return the prescription in the desired format
        return PrescriptionBase.model_validate(prescription)
    
    async def create_prescription(
        self,
        counsellor_id: str,
        prescription_data: PrescriptionCreate
    ) -> PrescriptionBase:
        """Create a new prescription"""
        # Verify the session belongs to this counsellor
        session = await self.db.execute(
            select(CounsellingSession).where(
                and_(
                    CounsellingSession.session_id == prescription_data.session_id,
                    CounsellingSession.counsellor_id == counsellor_id
                )
            )
        )
        session = session.scalars().first()
        
        if not session:
            raise ValueError("Session not found or doesn't belong to this counsellor")

        prescription = Prescription(
            **prescription_data.model_dump(),
            counsellor_id=counsellor_id,
            created_at=datetime.now(timezone.utc)
        )
        
        self.db.add(prescription)
        await self.db.commit()
        await self.db.refresh(prescription)
        return prescription
    
    async def get_user_prescriptions(
        self,
        user_id: str,
        counsellor_id: str
    ) -> List[PrescriptionBase]:
        """Get all prescriptions for a user by this counsellor"""
        result = await self.db.execute(
            select(Prescription).where(
                and_(
                    Prescription.user_id == user_id,
                    Prescription.counsellor_id == counsellor_id
                )
            ).order_by(Prescription.created_at.desc())
        )
        return result.scalars().all()
    
    async def get_session_prescription(
        self,
        session_id: str,
        counsellor_id: str
    ) -> Optional[PrescriptionBase]:
        """Get prescription for a specific session"""
        result = await self.db.execute(
            select(Prescription).where(
                and_(
                    Prescription.session_id == session_id,
                    Prescription.counsellor_id == counsellor_id
                )
            )
        )
        return result.scalars().first()