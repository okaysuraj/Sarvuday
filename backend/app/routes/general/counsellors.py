# app/routes/general/counsellors.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.general import CounsellorService
from app.schemas import CounsellorListWebView, CounsellorWebView

router = APIRouter()

@router.get(
    "",
    response_model=CounsellorListWebView,
    status_code=status.HTTP_200_OK,
    summary="Get all approved and active counsellors",
)
async def get_counsellors(db: AsyncSession = Depends(get_db)):
    return await CounsellorService.fetch_counsellors(db)

@router.get(
    "/{counsellor_id}",
    response_model=CounsellorWebView,
    status_code=status.HTTP_200_OK,
    summary="Get a specific counsellor by ID",
)
async def get_counsellor(counsellor_id: str, db: AsyncSession = Depends(get_db)):
    return await CounsellorService.fetch_counsellor_by_id(db, counsellor_id)
