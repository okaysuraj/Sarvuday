"""Counsellor management business logic and persistence."""

from fastapi import HTTPException, status
from sqlalchemy import cast, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Admin, Counsellor
from app.schemas.admins_schemas import (
    ApproveCounsellorResponse,
    DisapprovalCounsellorResponse,
)
from app.schemas.counsellors_schemas import (
    CounsellorAdminView,
    CounsellorBase,
    CounsellorFilterQuery,
    CounsellorListResponse,
)
from app.services.admin.account_queries import account_page, filter_accounts


class CounsellorManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_filtered_counsellors(
        self, filters: CounsellorFilterQuery
    ) -> CounsellorListResponse:
        query = filter_accounts(select(Counsellor), Counsellor, filters)
        for field in ("is_approved", "is_featured"):
            value = getattr(filters, field)
            if value is not None:
                query = query.where(getattr(Counsellor, field).is_(value))
        for field in ("certifications", "specializations", "languages"):
            values = getattr(filters, field)
            if values:
                query = query.where(
                    cast(getattr(Counsellor, field), JSONB).contains(values)
                )
        for field, minimum, maximum in (
            ("experience_years", filters.min_experience, filters.max_experience),
            ("session_fee", filters.min_fee, filters.max_fee),
        ):
            column = getattr(Counsellor, field)
            if minimum is not None:
                query = query.where(column >= minimum)
            if maximum is not None:
                query = query.where(column <= maximum)
        total, counsellors = await account_page(self.db, query, Counsellor, filters)
        return CounsellorListResponse(
            total=total,
            limit=filters.limit,
            offset=filters.offset,
            counsellors=[
                CounsellorAdminView.model_validate(user) for user in counsellors
            ],
        )

    async def approve_counsellor(
        self, counsellor_id: str, current_admin: Admin
    ) -> ApproveCounsellorResponse:
        result = await self.db.execute(
            select(Counsellor).where(Counsellor.user_id == counsellor_id)
        )
        counsellor = result.scalar_one_or_none()
        if not counsellor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Counsellor not found"
            )

        counsellor.is_approved = True
        counsellor.approved_by = current_admin.user_id
        await self.db.commit()
        await self.db.refresh(counsellor)
        return ApproveCounsellorResponse(
            message="Counsellor Approved",
            counsellor=CounsellorBase.model_validate(counsellor),
        )

    async def disapprove_counsellor(
        self, counsellor_id: str, current_admin: Admin
    ) -> DisapprovalCounsellorResponse:
        result = await self.db.execute(
            select(Counsellor).where(Counsellor.user_id == counsellor_id)
        )
        counsellor = result.scalar_one_or_none()
        if not counsellor:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Counsellor not found"
            )

        counsellor.is_approved = False
        counsellor.approved_by = None
        await self.db.commit()
        await self.db.refresh(counsellor)
        return DisapprovalCounsellorResponse(
            message="Counsellor Disapproved",
            counsellor=CounsellorBase.model_validate(counsellor),
        )
