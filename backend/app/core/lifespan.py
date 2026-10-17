"""Verify dependencies before accepting traffic and close their pools on shutdown."""

from contextlib import asynccontextmanager
from pathlib import Path

from alembic.config import Config
from alembic.script import ScriptDirectory
from fastapi import FastAPI
from sqlalchemy import text

from app.core.firebase import initialize_firebase
from app.database.postgres import engine


async def verify_postgres_schema() -> None:
    config = Config(str(Path(__file__).parents[2] / "alembic.ini"))
    expected = set(ScriptDirectory.from_config(config).get_heads())
    async with engine.connect() as connection:
        result = await connection.execute(
            text("SELECT version_num FROM alembic_version")
        )
        if set(result.scalars()) != expected:
            raise RuntimeError(
                "PostgreSQL schema is not current. Run alembic upgrade head before deployment."
            )


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.ready = False
    try:
        # Migrations run during deployment, before API workers accept traffic.
        await verify_postgres_schema()
        initialize_firebase()
        app.state.ready = True
        yield
    finally:
        app.state.ready = False
        await engine.dispose()
