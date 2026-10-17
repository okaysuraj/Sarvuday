"""Prescriptions endpoints and access checks."""

from fastapi import APIRouter, Depends, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Counsellor
from app.schemas.prescription_schemas import (
    PrescriptionBase,
    PrescriptionCreate,
    PrescriptionListResponse,
)
from app.services.prescriptions.prescription_service import PrescriptionService
from app.utils.oauth import ensure_counsellor_user

router = APIRouter(
    prefix="/prescriptions", tags=["Counsellor Prescriptions Management"]
)


@router.post(
    "",
    response_model=PrescriptionBase,
    status_code=status.HTTP_201_CREATED,
    summary="Generate prescription. Counsellor Authentication required",
)
async def create_prescription(
    prescription_data: PrescriptionCreate,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await PrescriptionService(db).create_prescription(
        current_user.user_id, prescription_data
    )


@router.get(
    "/{user_id}",
    response_model=PrescriptionListResponse,
    status_code=status.HTTP_200_OK,
    summary="Get user's prescriptions. Counsellor Authentication required",
)
async def get_prescriptions(
    user_id: str = Path(..., description="Target patient user ID"),
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await PrescriptionService(db).get_user_prescriptions(
        user_id, current_user.user_id
    )
