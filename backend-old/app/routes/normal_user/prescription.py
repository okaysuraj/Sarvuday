# app/routes/normal_user/prescription.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.schemas import (
    PrescriptionListResponse,
    PrescriptionBase
)
from app.services.prescriptions.prescription_service import PrescriptionService

router = APIRouter(prefix="/prescriptions", tags=["Normal User Prescription Management"])


@router.get("", response_model=PrescriptionListResponse, status_code=status.HTTP_200_OK, summary="List prescriptions. Normal User Authentication required")
async def list_prescriptions(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await PrescriptionService(db).list_prescriptions(current_user.user_id)

@router.get("/{prescription_id}", response_model=PrescriptionBase, status_code=status.HTTP_200_OK, summary="Get prescription by prescription ID. Normal User Authentication required")
async def get_prescription(
    prescription_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await PrescriptionService(db).get_prescription(current_user.user_id, prescription_id)
