import sys
import asyncio
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
import pytest
import pytest_asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
import asyncio

from app.main import app
from app.database.postgres import async_session, get_db

# Create a test session fixture that rolls back
@pytest_asyncio.fixture()
async def db_session():
    async with async_session() as session:
        async with session.begin():
            yield session
            await session.rollback()

# Override the get_db dependency in the FastAPI app
@pytest_asyncio.fixture()
async def client(db_session: AsyncSession):
    async def override_get_db():
        yield db_session
        
    app.dependency_overrides[get_db] = override_get_db
    
    # Need to use ASGITransport in recent httpx/fastapi
    from httpx import ASGITransport
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
        
    app.dependency_overrides.clear()
