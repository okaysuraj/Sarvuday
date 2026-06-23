# app/routes/counsellor/__init__.py

from fastapi import APIRouter
from . import counselling_sessions, dashboard, availability, appointments, payments, prescriptions

counsellor_router = APIRouter()

counsellor_router.include_router(dashboard.router)
counsellor_router.include_router(availability.router)
counsellor_router.include_router(appointments.router)
counsellor_router.include_router(counselling_sessions.router)
counsellor_router.include_router(payments.router)
counsellor_router.include_router(prescriptions.router)