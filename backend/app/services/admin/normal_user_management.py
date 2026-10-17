"""Search patient accounts for authorized administrators."""

from sqlalchemy import cast, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import NormalUser
from app.schemas.normal_users_schemas import (
    UserDirectoryEntry,
    UserFilterQuery,
    UserListResponse,
)
from app.services.admin.account_queries import account_page, filter_accounts


class NormalUserManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_filtered_normal_users(
        self, filters: UserFilterQuery
    ) -> UserListResponse:
        query = filter_accounts(select(NormalUser), NormalUser, filters)
        if filters.preferred_languages:
            # These legacy columns are JSON; containment requires JSONB.
            query = query.where(
                cast(NormalUser.preferred_languages, JSONB).contains(
                    filters.preferred_languages
                )
            )
        total, users = await account_page(self.db, query, NormalUser, filters)
        return UserListResponse(
            total=total,
            limit=filters.limit,
            offset=filters.offset,
            users=[UserDirectoryEntry.model_validate(user) for user in users],
        )
