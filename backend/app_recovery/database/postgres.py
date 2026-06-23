# app/database/postgres.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from typing import AsyncGenerator
from app.config import settings


# PostgreSQL connection string (async)
POSTGRES_DATABASE_URL = (
    f"postgresql+asyncpg://{settings.postgres_db_username}:{settings.postgres_db_password}"
    f"@{settings.postgres_db_hostname}:{settings.postgres_db_port}/{settings.postgres_db_name}"
)

# PostgreSQL connection string (sync - for WebSocket handlers)
POSTGRES_SYNC_URL = (
    f"postgresql+psycopg2://{settings.postgres_db_username}:{settings.postgres_db_password}"
    f"@{settings.postgres_db_hostname}:{settings.postgres_db_port}/{settings.postgres_db_name}"
)

# Async Engine (for REST API routes)
engine = create_async_engine(
    POSTGRES_DATABASE_URL,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
)

# Sync Engine (for WebSocket handlers)
sync_engine = create_engine(POSTGRES_SYNC_URL, pool_size=5, max_overflow=10)
SessionLocal = sessionmaker(bind=sync_engine, expire_on_commit=False)


# Session and Base
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

# Correct return type
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session
