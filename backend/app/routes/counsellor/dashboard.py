# app/routes/counsellor/dashboard.py

from fastapi import APIRouter, Depends, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Counsellor
from datetime import datetime
from app.utils.oauth import ensure_counsellor_user
from typing import Optional
from app.utils.constants import GenderEnum
from app.schemas.counsellors_schemas import (
    CounsellorBase,
    CounsellorUpdateRequest,
    CounsellorUpdateResponse,
    CounsellorDashboardView
)
from app.services.counsellor.counsellor_management_service import CounsellorManagementService


router = APIRouter(prefix="/dashboard", tags=["Counsellor Dashboard"])


@router.get("", response_model=CounsellorDashboardView, status_code=status.HTTP_200_OK, summary="Get counsellor dashboard. Counsellor Authentication required")
async def get_dashboard(
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellorManagementService(db).get_dashboard_data(current_user.user_id)



@router.get("/profile", response_model=CounsellorBase, status_code=status.HTTP_200_OK, summary="Get counsellor profile. Counsellor Authentication required")
async def get_profile(
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellorManagementService(db).get_profile(current_user.user_id)


@router.patch("/profile", response_model=CounsellorUpdateResponse, status_code=status.HTTP_200_OK, summary="Update profile. Counsellor Authentication required")
async def update_profile(
    name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    gender: Optional[GenderEnum] = Form(None),
    bio: Optional[str] = Form(None),
    certifications: Optional[str] = Form(None),
    specializations: Optional[str] = Form(None),
    education_qualifications: Optional[str] = Form(None),
    languages: Optional[str] = Form(None),
    license_number: Optional[str] = Form(None),
    license_issuing_authority: Optional[str] = Form(None),
    license_expiry_date: Optional[datetime] = Form(None),
    identity_proof_url: Optional[str] = Form(None),
    license_proof_url: Optional[str] = Form(None),
    session_fee: Optional[float] = Form(None),
    session_duration: Optional[int] = Form(None),
    experience_years: Optional[int] = Form(None),
    country: Optional[str] = Form(None),
    state: Optional[str] = Form(None),
    city: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    pincode: Optional[str] = Form(None),
    profile_pic: Optional[UploadFile] = File(None),
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    # Convert comma-separated lists to actual lists
    certifications_list = certifications.split(",") if certifications else None
    specializations_list = specializations.split(",") if specializations else None
    education_qualifications_list = education_qualifications.split(",") if education_qualifications else None
    languages_list = languages.split(",") if languages else None

    # Prepare the update data without modifying the existing Pydantic model
    update_data = CounsellorUpdateRequest(
        name=name,
        phone_number=phone_number,
        gender=gender,
        bio=bio,
        certifications=certifications_list,
        specializations=specializations_list,
        education_qualifications=education_qualifications_list,
        languages=languages_list,
        license_number=license_number,
        license_issuing_authority=license_issuing_authority,
        license_expiry_date=license_expiry_date,  # Handle conversion if needed
        identity_proof_url=identity_proof_url,
        license_proof_url=license_proof_url,
        session_fee=session_fee,
        session_duration=session_duration,
        experience_years=experience_years,
        country=country,
        state=state,
        city=city,
        address=address,
        pincode=pincode,
    )

    service = CounsellorManagementService(db)
    return await service.update_profile(current_user.user_id, update_data, profile_pic)


@router.delete("/profile", status_code=status.HTTP_204_NO_CONTENT, summary="delete counsellor account. Counsellor Authentication required")
async def delete_counsellor(
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await CounsellorManagementService(db).delete_account(current_user.user_id)

