# app/routes/__init__.py

from fastapi import APIRouter, status
from .general import general_router
from .general.chat import router as chat_router
from .general.ai_chat import router as ai_chat_router
from .general.notifications import router as notifications_router
from .general.payments import router as payments_router
from .general.contact import router as contact_router
from .auth import auth_router
from .admin import admin_router
from .assessments import assessment_router
from .normal_user import normal_user_router
from .counsellor import counsellor_router
from .ai import router as ai_insights_router

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

api_router.include_router(
    ai_chat_router,
    prefix="/ai",
    tags=["AI Chat"],
)

api_router.include_router(
    notifications_router,
    prefix="/notifications",
    tags=["Notifications"],
)

api_router.include_router(
    payments_router,
    prefix="/payments",
    tags=["Payments"],
)

api_router.include_router(
    contact_router,
    prefix="/contact",
    tags=["Contact"],
)

api_router.include_router(
    ai_insights_router,
    prefix="/ai-insights",
)

__all__ = ["api_router"]
