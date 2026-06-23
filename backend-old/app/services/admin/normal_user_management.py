# app/services/admin/counsellor_management.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import NormalUser
from fastapi import HTTPException, status
from app.schemas import (
    UserListResponse,
    UserFilterQuery,
    NormalUserBase
)
from sqlalchemy.sql import func

class NormalUserManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_filtered_normal_users(
        self,
        filters: UserFilterQuery
    ) -> UserListResponse:
        """Get filtered list of normal_users with advanced query capabilities"""
        try:
            # Base query
            query = select(NormalUser)

            # Basic filters
            if filters.user_id:
                query = query.where(NormalUser.user_id == filters.user_id)
            if filters.name:
                query = query.where(NormalUser.name.ilike(f"%{filters.name}%"))
            if filters.email:
                query = query.where(NormalUser.email.ilike(f"%{filters.email}%"))
            if filters.phone_number:
                query = query.where(NormalUser.phone_number.ilike(f"%{filters.phone_number}%"))
            if filters.gender:
                query = query.where(NormalUser.gender == filters.gender)
            if filters.is_email_verified is not None:
                query = query.where(NormalUser.is_email_verified == filters.is_email_verified)
            if filters.is_phone_verified is not None:
                query = query.where(NormalUser.is_phone_verified == filters.is_phone_verified)

            # Array filters
            if filters.preferred_languages:
                query = query.where(NormalUser.preferred_languages.contains(filters.preferred_languages))
            if filters.primary_concerns:
                query = query.where(NormalUser.primary_concerns.contains(filters.primary_concerns))

            # Location filters
            if filters.country:
                query = query.where(NormalUser.country == filters.country)
            if filters.state:
                query = query.where(NormalUser.state == filters.state)
            if filters.city:
                query = query.where(NormalUser.city == filters.city)

            # Get total count before pagination
            count_query = select(func.count()).select_from(query.subquery())
            total_result = await self.db.execute(count_query)
            total = total_result.scalar()

            # Apply sorting
            sort_column = getattr(NormalUser, filters.sort_by, NormalUser.created_at)
            if filters.sort_order.lower() == "desc":
                sort_column = sort_column.desc()
            query = query.order_by(sort_column)

            # Apply pagination
            query = query.offset(filters.offset).limit(filters.limit)

            # Execute query
            result = await self.db.execute(query)
            normal_users = result.scalars().all()

            return UserListResponse(
                total=total,
                limit=filters.limit,
                offset=filters.offset,
                counsellors=[NormalUserBase.model_validate(user) for user in normal_users],
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to fetch normal users: {str(e)}"
            )