"""Prescription endpoints and access checks."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import NormalUser
from app.schemas.prescription_schemas import PrescriptionBase, PrescriptionListResponse
from app.services.prescriptions.prescription_service import PrescriptionService
from app.utils.oauth import ensure_normal_user

router = APIRouter(
    prefix="/prescriptions", tags=["Normal User Prescription Management"]
)


@router.get(
    "",
    response_model=PrescriptionListResponse,
    status_code=status.HTTP_200_OK,
    summary="List prescriptions. Normal User Authentication required",
)
async def list_prescriptions(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await PrescriptionService(db).list_prescriptions(current_user.user_id)


@router.get(
    "/{prescription_id}",
    response_model=PrescriptionBase,
    status_code=status.HTTP_200_OK,
    summary="Get prescription by prescription ID. Normal User Authentication required",
)
async def get_prescription(
    prescription_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await PrescriptionService(db).get_prescription(
        current_user.user_id, prescription_id
    )
