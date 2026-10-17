"""Disorders endpoints and access checks."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.postgres import get_db

from app.schemas.disorders_schemas import DisordersListResponse
from app.services.general import DisordersService

router = APIRouter()


@router.get("", response_model=DisordersListResponse, summary="List disorders")
async def list_disorders(db: AsyncSession = Depends(get_db)):
    return await DisordersService.fetch_disorders_data(db)
