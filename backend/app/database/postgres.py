# app/database/postgres.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from typing import AsyncGenerator
from app.config import settings


# PostgreSQL connection string (async)
# Neon provides postgresql:// which we need to convert to asyncpg/psycopg2
# if the user pastes the raw URL.
POSTGRES_DATABASE_URL = settings.database_url.replace("postgres://", "postgresql+asyncpg://").replace("postgresql://", "postgresql+asyncpg://")

# PostgreSQL connection string (sync - for WebSocket handlers)
POSTGRES_SYNC_URL = settings.database_url.replace("postgres://", "postgresql+psycopg2://").replace("postgresql://", "postgresql+psycopg2://")

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
