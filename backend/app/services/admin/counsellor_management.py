# app/services/admin/counsellor_management.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Counsellor, Admin
from fastapi import HTTPException, status
from app.schemas import (
    CounsellorFilterQuery, 
    CounsellorListResponse, 
    CounsellorBase, 
    ApproveCounsellorResponse, 
    DisapprovalCounsellorResponse
)
from sqlalchemy.sql import func
from app.utils.unique_id_generation import generate_counsellor_payment_id

class CounsellorManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_filtered_counsellors(
        self,
        filters: CounsellorFilterQuery
    ) -> CounsellorListResponse:
        """Get filtered list of counsellors with advanced query capabilities"""
        try:
            # Base query
            query = select(Counsellor)

            # Basic filters
            if filters.user_id:
                query = query.where(Counsellor.user_id == filters.user_id)
            if filters.name:
                query = query.where(Counsellor.name.ilike(f"%{filters.name}%"))
            if filters.email:
                query = query.where(Counsellor.email.ilike(f"%{filters.email}%"))
            if filters.phone_number:
                query = query.where(Counsellor.phone_number.ilike(f"%{filters.phone_number}%"))
            if filters.
            )


    async def approve_counsellor(
        self,
        counsellor_id: str,
        current_admin: Admin
    ) -> ApproveCounsellorResponse:
        result = await self.db.execute(select(Counsellor).where(Counsellor.user_id == counsellor_id))
        counsellor = result.scalar_one_or_none()
        if not counsellor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Counsellor not found"
            )
        
        counsellor.is_approved = True
        counsellor.approved_by = current_admin.user_id
        await self.db.commit()
        await self.db.refresh(counsellor)
        return ApproveCounsellorResponse(
            message="Counsellor Approved",
            counsellor=CounsellorBase.model_validate(counsellor)
        )
        
    async def disapprove_counsellor(
        self,
        counsellor_id: str,
        current_admin: Admin
    ) -> DisapprovalCounsellorResponse:
        result = await self.db.execute(select(Counsellor).where(Counsellor.user_id == counsellor_id))
        counsellor = result.scalar_one_or_none()
        if not counsellor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Counsellor not found"
            )
        
        counsellor.is_approved = False
        counsellor.approved_by = None
        await self.db.commit()
        await self.db.refresh(counsellor)
        return DisapprovalCounsellorResponse(
            message="Counsellor Disapproved",
            counsellor=CounsellorBase.model_validate(counsellor)
        )

