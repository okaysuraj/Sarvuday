import asyncio
import httpx
from unittest.mock import patch
from app.schemas.auth_schemas import UserTypeEnum, GenderEnum
from app.services.auth.firebase_auth_service import FirebaseAuthService

async def run():
    # Mock firebase token verification
    async def mock_verify(*args, **kwargs):
        return {
            "uid": "fakeuid123",
            "email": "testnew@example.com",
            "phone_number": "",
            "name": "Test User",
            "email_verified": True
        }

    from app.main import app
    from fastapi.testclient import TestClient

    with patch.object(FirebaseAuthService, '_verify_firebase_token', new=mock_verify):
        client = TestClient(app)
        res = client.post("/auth/firebase-register", json={
            "user_type": "normal_user",
            "id_token": "fake_token",
            "name": "Test User",
            "gender": "male",
            "terms_accepted": True,
            "privacy_policy_accepted": True
        })
        print("Status:", res.status_code)
        print("Body:", res.json())

if __name__ == '__main__':
    asyncio.run(run())
