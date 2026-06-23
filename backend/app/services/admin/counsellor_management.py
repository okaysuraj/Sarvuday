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
            if filters.gender:
                query = query.where(Counsellor.gender == filters.gender)
            if filters.is_approved is not None:
                query = query.where(Counsellor.is_approved == filters.is_approved)
            if filters.is_email_verified is not None:
                query = query.where(Counsellor.is_email_verified == filters.is_email_verified)
            if filters.is_phone_verified is not None:
                query = query.where(Counsellor.is_phone_verified == filters.is_phone_verified)
            if filters.is_featured is not None:
                query = query.where(Counsellor.is_featured == filters.is_featured)

            # Array filters
            if filters.certifications:
                query = query.where(Counsellor.certifications.contains(filters.certifications))
            if filters.specializations:
                query = query.where(Counsellor.specializations.contains(filters.specializations))
            if filters.languages:
                query = query.where(Counsellor.languages.contains(filters.languages))

            # Range filters
            if filters.min_experience is not None:
                query = query.where(Counsellor.experience_years >= filters.min_experience)
            if filters.max_experience is not None:
                query = query.where(Counsellor.experience_years <= filters.max_experience)
            if filters.min_fee is not None:
                query = query.where(Counsellor.session_fee >= filters.min_fee)
            if filters.max_fee is not None:
                query = query.where(Counsellor.session_fee <= filters.max_fee)

            # Location filters
            if filters.country:
                query = query.where(Counsellor.country == filters.country)
            if filters.state:
                query = query.where(Counsellor.state == filters.state)
            if filters.city:
                query = query.where(Counsellor.city == filters.city)

            # Get total count before pagination
            count_query = select(func.count()).select_from(query.subquery())
            total_result = await self.db.execute(count_query)
            total = total_result.scalar()

            # Apply sorting
            sort_column = getattr(Counsellor, filters.sort_by, Counsellor.created_at)
            if filters.sort_order.lower() == "desc":
                sort_column = sort_column.desc()
            query = query.order_by(sort_column)

            # Apply pagination
            query = query.offset(filters.offset).limit(filters.limit)

            # Execute query
            result = await self.db.execute(query)
            counsellors = result.scalars().all()

            return CounsellorListResponse(
                total=total,
                limit=filters.limit,
                offset=filters.offset,
                counsellors=[CounsellorBase.model_validate(c) for c in counsellors],
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to fetch counsellors: {str(e)}"
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

