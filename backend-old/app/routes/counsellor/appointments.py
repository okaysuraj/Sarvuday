# app/routes/counsellor/appointments.py

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Counsellor
from app.utils.oauth import ensure_counsellor_user
from app.schemas import (
    AppointmentBase,
    AppointmentListResponse,
    CancelAppointmentResponse,
)
from app.services.appointments.appointment_service import AppointmentService

router = APIRouter(prefix="/appointments", tags=["Counsellor Appointments Management"])

@router.get("", response_model=AppointmentListResponse, status_code=status.HTTP_200_OK, summary="List all scheduled appointments. Counsellor Authentication required")
async def get_appointments(
    status: str = Query(None),
    upcoming: bool = Query(True),
    limit: int = Query(10, ge=1, le=100),
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).list_appointments(current_user.user_type, current_user.user_id, status, upcoming, limit)


@router.get("/{appointment_id}", response_model=AppointmentBase, status_code=status.HTTP_200_OK, summary="Get appointment details  by appointment ID. Counsellor Authentication required")
async def get_appointment_details(
    appointment_id: str,
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).get_appointment_details(current_user, appointment_id)


@router.patch("/cancel/{appointment_id}", response_model=CancelAppointmentResponse, status_code=status.HTTP_200_OK, summary="Cancel an appointment. Counsellor Authentication required")
async def cancel_appointment(
    appointment_id: str,
    reason: str = Query(None),
    current_user: Counsellor = Depends(ensure_counsellor_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).cancel_appointment(current_user.user_type, current_user.user_id, appointment_id, reason)
