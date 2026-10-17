"""Disorders endpoints and access checks."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.schemas.disorders_schemas import DisordersListResponse
from app.services.admin.content_management import ContentManagementService

router = APIRouter()


@router.get("", response_model=DisordersListResponse, summary="List disorders")
async def list_disorders(db: AsyncSession = Depends(get_db)):
    result = await ContentManagementService(db).get_all_disorders()
    if not result.disorders:
        raise HTTPException(status_code=404, detail="No disorders found.")
    return result
