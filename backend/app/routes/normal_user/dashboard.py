# app/routes/normal_user/dashboard.py

from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from typing import Optional
from app.utils.constants import GenderEnum
from app.schemas import (
    NormalUserBase, 
    UserUpdateRequest,
    UserUpdateResponse,
    DashboardOverviewResponse
)
from app.services.normal_user.user_management_service import UserManagementService

router = APIRouter(prefix="/dashboard", tags=["Normal User Dashboard"])

@router.get("", response_model=DashboardOverviewResponse, status_code=status.HTTP_200_OK, summary="Get user dashboard overview. Normal User Authentication required")
async def get_dashboard(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await UserManagementService(db).get_dashboard_overview(current_user.user_id)


@router.get("/profile", response_model=NormalUserBase, status_code=status.HTTP_200_OK, summary="Get user profile. Normal User Authentication required")
async def get_profile(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await UserManagementService(db).get_user_profile(current_user.user_id)

@router.patch("/profile", response_model=UserUpdateResponse, status_code=status.HTTP_200_OK, summary="Update user profile. Normal User Authentication required")
async def update_profile(
    name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    gender: Optional[GenderEnum] = Form(None),
    preferred_languages: Optional[str] = Form(None),
    primary_concerns: Optional[str] = Form(None),
    country: Optional[str] = Form(None),
    state: Optional[str] = Form(None),
    city: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    pincode: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    # Convert comma-separated to list
    langs = preferred_languages.split(",") if preferred_languages else None
    concerns = primary_concerns.split(",") if primary_concerns else None

    update_data = UserUpdateRequest(
        name=name,
        phone_number=phone_number,
        gender=gender,
        preferred_languages=langs,
        primary_concerns=concerns,
        country=country,
        state=state,
        city=city,
        address=address,
        pincode=pincode,
    )
    return await UserManagementService(db).update_user_profile(current_user.user_id, update_data, profile_pic)

@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT, summary="Delete Users Account. Normal User Authentication required")
async def delete_account(current_user: NormalUser = Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)):
    return await UserManagementService(db).delete_account(current_user.user_id)
