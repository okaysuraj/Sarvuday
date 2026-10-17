"""init   endpoints and access checks."""

from fastapi import APIRouter

from . import (
    appointments,
    chatbot_sessions,
    counselling_sessions,
    dashboard,
    payments,
    prescription,
    therapist,
    tracking,
)

normal_user_router = APIRouter()

normal_user_router.include_router(dashboard.router)
normal_user_router.include_router(chatbot_sessions.router)
normal_user_router.include_router(appointments.router)
normal_user_router.include_router(payments.router)
normal_user_router.include_router(counselling_sessions.router)
normal_user_router.include_router(prescription.router)
normal_user_router.include_router(tracking.router)
normal_user_router.include_router(therapist.router)
