# app/services/auth/__init__.py

from .firebase_auth_service import FirebaseAuthService

__all__ = [
    "FirebaseAuthService",
]