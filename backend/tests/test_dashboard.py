from httpx import AsyncClient
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.normal_user.user_management_service import UserManagementService
from fastapi import HTTPException

@pytest.mark.asyncio
async def test_dashboard_overview_nonexistent_user(db_session: AsyncSession):
    service = UserManagementService(db_session)
    with pytest.raises(HTTPException) as excinfo:
        await service.get_dashboard_overview("INVALID_USER")
    assert excinfo.value.status_code == 404

@pytest.mark.asyncio
async def test_dashboard_overview_endpoint(client: AsyncClient):
    # Testing the endpoint without auth should return 401 Unauthorized
    # This proves the route is active and auth dependency is working
    response = await client.get("/user/dashboard/profile")
    assert response.status_code == 401
