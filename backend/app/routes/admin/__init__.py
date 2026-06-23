# app/routes/admin/__init__.py

from fastapi import APIRouter
from . import (
    dashboard,
    admin_management,
    counsellor_management,
    normal_user_management,
    content_management,
    analytics,
    sentiment,
    counselling_session_management
)

admin_router = APIRouter()

admin_router.include_router(dashboard.router)
admin_router.include_router(admin_management.router)
admin_router.include_router(counsellor_management.router)
admin_router.include_router(normal_user_management.router)
admin_router.include_router(content_management.router)
admin_router.include_router(analytics.router)
admin_router.include_router(sentiment.router)
admin_router.include_router(counselling_session_management.router)