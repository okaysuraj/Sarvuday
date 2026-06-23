# app/routes/normal_user/appointments.py

from datetime import datetime
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.schemas import (
    AppointmentBase,
    AppointmentListResponse,
    AvailableSlotsResponse,
    CreateAppointmentRequest,
    CreateAppointmentResponse,
    CancelAppointmentResponse
)
from app.services.appointments.appointment_service import AppointmentService

router = APIRouter(prefix="/appointments", tags=["Normal User Appointments"])

@router.get("", response_model=AppointmentListResponse, status_code=status.HTTP_200_OK, summary="List all user appointments. Normal User Authentication required")
async def list_appointments(
    status: str = Query(None),
    upcoming: bool = Query(True),
    limit: int = Query(10, ge=1, le=100),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).list_appointments(current_user.user_type, current_user.user_id, status, upcoming, limit)

@router.get("/slots", response_model=AvailableSlotsResponse, status_code=status.HTTP_200_OK, summary="Get available slots. Normal User Authentication required")
async def get_available_slots(
    counsellor_id: str = Query(None),
    date: datetime = Query(None),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).get_available_slots(counsellor_id, date)


@router.post("", response_model=CreateAppointmentResponse, status_code=status.HTTP_201_CREATED, summary="Book appointment with counsellor. Normal User Authentication required")
async def book_appointment(
    booking_data: CreateAppointmentRequest,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).book_appointment(current_user.user_id, booking_data)


@router.get("/{appointment_id}", response_model=AppointmentBase, status_code=status.HTTP_200_OK, summary="Get appointment details by appointment ID. Normal User Authentication required")
async def get_appointment(
    appointment_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).get_appointment_details(current_user, appointment_id)


@router.patch("/cancel/{appointment_id}", response_model=CancelAppointmentResponse, status_code=status.HTTP_200_OK, summary="Cancel appointment by appointment ID. Normal User Authentication required")
async def cancel_appointment(
    appointment_id: str,
    reason: str = Query(None),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await AppointmentService(db).cancel_appointment(current_user.user_type, current_user.user_id, appointment_id, reason)


