# app/routes/admin/analytics.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.utils.oauth import ensure_admin_user
from app.models import Admin
from app.schemas import (
    PlatformAnalytics, 
    UserAnalytics, 
    CounsellorAnalytics
)
from app.services.admin import AnalyticsService

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/platform", response_model=PlatformAnalytics, status_code=status.HTTP_200_OK, summary="Get platform-wide analytics. Admin Authentication Required to access this route")
async def get_platform_analytics(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await AnalyticsService(db).get_platform_metrics()

@router.get("/users", response_model=UserAnalytics, status_code=status.HTTP_200_OK, summary="Get user analytics. Admin Authentication Required to access this route")
async def get_user_analytics(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await AnalyticsService(db).get_user_analytics()

@router.get("/counsellors", response_model=CounsellorAnalytics, status_code=status.HTTP_200_OK, summary="Get counsellor analytics. Admin Authentication Required to access this route")
async def get_counsellor_analytics(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await AnalyticsService(db).get_counsellor_analytics()