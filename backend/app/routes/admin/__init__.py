"""init   endpoints and access checks."""

from fastapi import APIRouter

from . import (
    admin_management,
    analytics,
    compliance,
    content_management,
    counselling_session_management,
    counsellor_management,
    dashboard,
    moderation,
    normal_user_management,
)

admin_router = APIRouter()

admin_router.include_router(dashboard.router)
admin_router.include_router(admin_management.router)
admin_router.include_router(counsellor_management.router)
admin_router.include_router(normal_user_management.router)
admin_router.include_router(content_management.router)
admin_router.include_router(analytics.router)
admin_router.include_router(counselling_session_management.router)
admin_router.include_router(compliance.router)
admin_router.include_router(moderation.router)
