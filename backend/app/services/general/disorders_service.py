"""Public access to the same catalog maintained by administrators."""

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.disorders_schemas import DisordersListResponse
from app.services.admin.content_management import ContentManagementService


class DisordersService:
    @staticmethod
    async def fetch_disorders_data(db: AsyncSession) -> DisordersListResponse:
        result = await ContentManagementService(db).get_all_disorders()
        if not result.disorders:
            raise HTTPException(status_code=404, detail="No disorders found.")
        return result
