import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_auth_login_invalid(client: AsyncClient):
    response = await client.post("/auth/user/login", json={
        "email": "invalid@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 404 # User not found
