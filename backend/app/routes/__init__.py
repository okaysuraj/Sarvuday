"""Public API prefixes; each feature owns its routes and request validation."""

from fastapi import APIRouter

from .admin import admin_router
from .ai import router as ai_insights_router
from .assessments import assessment_router
from .auth import auth_router
from .counsellor import counsellor_router
from .general import general_router
from .general.ai_chat import router as ai_chat_router
from .general.chat import router as chat_router
from .general.community import router as community_router
from .general.contact import router as contact_router
from .general.exercises import router as exercises_router
from .general.notifications import router as notifications_router
from .general.payments import router as payments_router
from .normal_user import normal_user_router

api_router = APIRouter()
documented_errors = {
    404: {"description": "Not found"},
    500: {"description": "Internal server error"},
}
for router, prefix, tags in (
    (general_router, "/content", ["General Info"]),
    (auth_router, "/auth", ["Authentication"]),
    (admin_router, "/admin", []),
    (assessment_router, "/assessments", ["Assessments"]),
    (normal_user_router, "/user", []),
    # Older mobile builds use this alias for the same patient API.
    (normal_user_router, "/normal_user", []),
    (counsellor_router, "/counsellor", []),
    (chat_router, "/chat", ["Chat"]),
):
    api_router.include_router(
        router, prefix=prefix, tags=tags, responses=documented_errors
    )
for router, prefix, tags in (
    (ai_chat_router, "/ai", ["AI Chat"]),
    (notifications_router, "/notifications", ["Notifications"]),
    (payments_router, "/payments", ["Payments"]),
    (contact_router, "/contact", ["Contact"]),
    (ai_insights_router, "/ai-insights", []),
    (community_router, "/community", ["Community"]),
    (exercises_router, "/exercises", ["Exercises"]),
):
    api_router.include_router(router, prefix=prefix, tags=tags)
