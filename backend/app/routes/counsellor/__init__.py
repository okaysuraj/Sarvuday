"""init   endpoints and access checks."""

from fastapi import APIRouter

from . import (
    appointments,
    availability,
    counselling_sessions,
    dashboard,
    payments,
    prescriptions,
)

counsellor_router = APIRouter()

counsellor_router.include_router(dashboard.router)
counsellor_router.include_router(availability.router)
counsellor_router.include_router(appointments.router)
counsellor_router.include_router(counselling_sessions.router)
counsellor_router.include_router(payments.router)
counsellor_router.include_router(prescriptions.router)
