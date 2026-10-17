"""Initialize Firebase once for API requests and administrator commands."""

import firebase_admin
from firebase_admin import credentials

from app.config import settings


def initialize_firebase() -> None:
    if firebase_admin._apps:
        return

    certificate = credentials.Certificate(
        {
            "type": "service_account",
            "project_id": settings.firebase_project_id,
            "private_key_id": settings.private_key_id,
            "private_key": settings.firebase_private_key.replace("\\n", "\n"),
            "client_email": settings.firebase_client_email,
            "client_id": settings.client_id,
            "auth_uri": settings.auth_uri,
            "token_uri": settings.token_uri,
        }
    )
    firebase_admin.initialize_app(certificate)
