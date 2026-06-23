# app/services/general/counsellors_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from app.models import Counsellor
from app.schemas import CounsellorWebView, CounsellorListWebView

class CounsellorService:

    @classmethod
    async def fetch_counsellors(cls, db: AsyncSession) -> CounsellorListWebView:
        query = select(Counsellor).where(Counsellor.is_approved == True)
        
        result = await db.execute(query)
        counsellors = result.scalars().all()

        if not counsellors:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No approved counsellors found.")
        
        return CounsellorListWebView(
            total_count=len(counsellors),
            counsellors=[CounsellorWebView.model_validate(c) for c in counsellors]
        )

