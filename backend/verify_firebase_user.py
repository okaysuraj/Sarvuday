import asyncio
from app.database.postgres import async_session
import firebase_admin
from firebase_admin import credentials, auth
from app.config import settings

def init_firebase():
    if not firebase_admin._apps:
        private_key = settings.firebase_private_key.replace('\\n', '\n')
        cred = credentials.Certificate({
            "type": "service_account",
            "project_id": settings.firebase_project_id,
            "private_key_id": settings.private_key_id,
            "private_key": private_key,
            "client_email": settings.firebase_client_email,
            "client_id": settings.client_id,
            "auth_uri": settings.auth_uri,
            "token_uri": settings.token_uri,
        })
        firebase_admin.initialize_app(cred)

def verify_firebase_user(email: str):
    init_firebase()
    try:
        user = auth.get_user_by_email(email)
        auth.update_user(user.uid, email_verified=True)
        print(f"Successfully verified email for Firebase user: {email}")
    except Exception as e:
        print(f"Error verifying Firebase user: {e}")

if __name__ == "__main__":
    verify_firebase_user("superadmin@admin.com")
