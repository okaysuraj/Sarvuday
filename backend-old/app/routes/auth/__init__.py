# app/routes/auth/__init__.py

from fastapi import APIRouter
from . import register, verification, login, password_reset, password_update, phone_verification, google_auth


auth_router = APIRouter()

# Include each router
auth_router.include_router(register.router)
auth_router.include_router(verification.router)
auth_router.include_router(login.router)
auth_router.include_router(password_reset.router)
auth_router.include_router(password_update.router)
auth_router.include_router(phone_verification.router)
auth_router.include_router(google_auth.router)

