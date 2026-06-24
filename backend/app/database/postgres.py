# app/database/postgres.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from typing import AsyncGenerator
from app.config import settings


# PostgreSQL connection string (async)
# Neon provides postgresql:// which we need to convert to asyncpg/psycopg2
# We also strip the query string because asyncpg doesn't support 'sslmode=require' in the URL.
base_url = settings.database_url.split("?")[0]

POSTGRES_DATABASE_URL = base_url.replace("postgres://", "postgresql+asyncpg://").replace("postgresql://", "postgresql+asyncpg://")

# PostgreSQL connection string (sync - for WebSocket handlers)
POSTGRES_SYNC_URL = base_url.replace("postgres://", "postgresql+psycopg2://").replace("postgresql://", "postgresql+psycopg2://")

# Async Engine (for REST API routes)
engine = create_async_engine(
    POSTGRES_DATABASE_URL,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    connect_args={"ssl": "require"} if "neon.tech" in base_url else {}
)

# Sync Engine (for WebSocket handlers)
sync_engine = create_engine(
    POSTGRES_SYNC_URL, 
    pool_size=5, 
    max_overflow=10,
    connect_args={"sslmode": "require"} if "neon.tech" in base_url else {}
)
SessionLocal = sessionmaker(bind=sync_engine, expire_on_commit=False)


# Session and Base
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

# Correct return type
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session
