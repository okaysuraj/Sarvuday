"""Availability endpoints and access checks."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Counsellor
from app.schemas.availability_schemas import (
    AddAvailabilitySlot,
    AvailableSlot,
    AvailableSlotsResponse,
    UpdateAvailabilitySlot,
)
from app.services.availability.availability_service import CounsellorAvailabilityService
from app.utils.oauth import ensure_counsellor_user

router = APIRouter(prefix="/availability", tags=["Counsellor Availability Management"])


@router.get(
    "",
    response_model=AvailableSlotsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get availability slots. Counsellor Authentication required",
)
async def get_availability(
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await CounsellorAvailabilityService(db).get_availability_slots(
        current_user.user_id
    )


@router.post(
    "",
    response_model=AvailableSlot,
    status_code=status.HTTP_201_CREATED,
    summary="Add availability slot. Counsellor Authentication required",
)
async def add_availability(
    availability_data: AddAvailabilitySlot,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await CounsellorAvailabilityService(db).add_availability_slot(
        current_user.user_id, availability_data
    )


@router.delete(
    "/{slot_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Remove availability slot. Counsellor Authentication required",
)
async def remove_availability(
    slot_id: str,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await CounsellorAvailabilityService(db).remove_availability_slot(
        current_user.user_id, slot_id
    )


@router.patch(
    "/{slot_id}",
    response_model=AvailableSlot,
    status_code=status.HTTP_200_OK,
    summary="Update availability slot. Counsellor Authentication required",
)
async def update_availability(
    slot_id: str,
    update_slot_data: UpdateAvailabilitySlot,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db),
):
    return await CounsellorAvailabilityService(db).update_availability_slot(
        current_user.user_id, slot_id, update_slot_data
    )
