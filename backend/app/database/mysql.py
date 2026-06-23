# app/database/mysql.py

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from typing import AsyncGenerator
from app.config import settings


# MySQL connection string
MYSQL_DATABASE_URL = (
    f"mysql+aiomysql://{settings.mysql_db_username}:{settings.mysql_db_password}"
    f"@{settings.mysql_db_hostname}:{settings.mysql_db_port}/{settings.mysql_db_name}"
)

# Async Engine
engine = create_async_engine(
    MYSQL_DATABASE_URL,
    echo=False,
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
)


# Session and Base
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

# Correct return type
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        yield session