# routes/normal_user/__init__.py
from fastapi import APIRouter
from . import chatbot_sessions, dashboard, appointments, payments, counselling_sessions, prescription, tracking, therapist

normal_user_router = APIRouter()

normal_user_router.include_router(dashboard.router)
normal_user_router.include_router(chatbot_sessions.router)
normal_user_router.include_router(appointments.router)
normal_user_router.include_router(payments.router)
normal_user_router.include_router(counselling_sessions.router)
normal_user_router.include_router(prescription.router)
normal_user_router.include_router(tracking.router)
normal_user_router.include_router(therapist.router)

