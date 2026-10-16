"""Bounded, worker-local PostgreSQL pools. Importing never opens a connection."""
from typing import AsyncGenerator
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings


def database_urls(value: str):
    url = make_url(value)
    if url.get_backend_name() not in {"postgres", "postgresql"}:
        raise ValueError("DATABASE_URL must use PostgreSQL")
    # asyncpg uses ssl; psycopg2 uses sslmode. Preserve other URL options.
    query = dict(url.query)
    sslmode = query.pop("sslmode", None)
    async_args = {"ssl": sslmode} if sslmode else {}
    application_name = query.pop("application_name", "sarvuday-api")
    # channel_binding is a libpq option unsupported by asyncpg.
    query.pop("channel_binding", None)
    async_args["server_settings"] = {
        "application_name": application_name,
        "statement_timeout": str(settings.database_statement_timeout_ms),
    }
    return (
        url.set(drivername="postgresql+asyncpg", query=query),
        url.set(drivername="postgresql+psycopg2"),
        async_args,
    )


POSTGRES_DATABASE_URL, POSTGRES_SYNC_URL, _connect_args = database_urls(settings.database_url)
engine = create_async_engine(
    POSTGRES_DATABASE_URL,
    connect_args=_connect_args,
    pool_size=settings.database_pool_size,
    max_overflow=settings.database_max_overflow,
    pool_timeout=settings.database_pool_timeout,
    pool_pre_ping=True,
    pool_recycle=1800,
)
sync_engine = create_engine(
    POSTGRES_SYNC_URL,
    pool_size=2,
    max_overflow=2,
    pool_timeout=settings.database_pool_timeout,
    pool_pre_ping=True,
    pool_recycle=1800,
    connect_args={"options": f"-c statement_timeout={settings.database_statement_timeout_ms}"},
)
SessionLocal = sessionmaker(bind=sync_engine, expire_on_commit=False)
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
        except BaseException:
            await session.rollback()
            raise
