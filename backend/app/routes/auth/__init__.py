# app/routes/auth/__init__.py

from fastapi import APIRouter
from . import firebase_auth

auth_router = APIRouter()

# Include each router
auth_router.include_router(firebase_auth.router)

