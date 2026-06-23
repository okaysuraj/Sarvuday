# app/routes/counsellor/prescriptions.py

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Counsellor
from app.utils.oauth import ensure_counsellor_user
from app.schemas import (
    PrescriptionBase, 
    PrescriptionCreate, 
    PrescriptionListResponse
)
from app.services.prescriptions.prescription_service import PrescriptionService

router = APIRouter(prefix="/prescriptions", tags=["Counsellor Prescriptions Management"])

@router.post("", response_model=PrescriptionBase, status_code=status.HTTP_201_CREATED, summary="Generate prescription. Counsellor Authentication required")
async def create_prescription(
    prescription_data: PrescriptionCreate,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await PrescriptionService(db).create_prescription(current_user.user_id, prescription_data)


@router.get("/{user_id}", response_model=PrescriptionListResponse, status_code=status.HTTP_200_OK, summary="Get user's prescriptions. Counsellor Authentication required")
async def get_prescriptions(
    user_id: str = Query,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await PrescriptionService(db).get_users_prescription(current_user.user_id, user_id)
