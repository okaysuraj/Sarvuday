import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_read_root(client: AsyncClient):
    response = await client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SurvUday App API"}

@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    # Depending on your app, maybe /api/health or just skip if there isn't one
    response = await client.get("/docs")
    assert response.status_code == 200
