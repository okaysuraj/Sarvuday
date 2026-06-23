# app/routes/__init__.py

from fastapi import APIRouter, status, HTTPException
from .general import general_router
from .general.chat import router as chat_router
from .auth import auth_router
from .admin import admin_router
from .assessments import assessment_router
from .normal_user import normal_user_router
from .counsellor import counsellor_router

api_router = APIRouter()

# Including each router with proper prefix and tags
api_router.include_router(
    general_router, 
    prefix="/content", 
    tags=["General Info"], 
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

api_router.include_router(
    auth_router, 
    prefix="/auth", 
    tags=["Authentication"], 
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

api_router.include_router(
    admin_router, 
    prefix="/admin",
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

api_router.include_router(
    assessment_router, 
    prefix="/assessments",
    tags=["Assessments"],
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)


api_router.include_router(
    normal_user_router, 
    prefix="/user",
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

api_router.include_router(
    counsellor_router, 
    prefix="/counsellor",
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

api_router.include_router(
    chat_router,
    prefix="/chat",
    tags=["Chat"],
    responses={
        status.HTTP_404_NOT_FOUND: {"description": "Not found"},
        status.HTTP_500_INTERNAL_SERVER_ERROR: {"description": "Internal server error"},
    },
)

__all__ = ["api_router"]
