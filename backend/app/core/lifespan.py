"""Verify provisioned databases before accepting traffic; never migrate at startup."""
import logging
from contextlib import asynccontextmanager
from pathlib import Path
import firebase_admin
from firebase_admin import credentials
from alembic.config import Config
from alembic.script import ScriptDirectory
from fastapi import FastAPI
from sqlalchemy import text
from app.config import settings
from app.database import engine, connect_to_mongo, close_mongo_connection
from app.database.mongo import mongo_db
from app.database.mongo_schema import SCHEMA_VERSION
from app.database.postgres import sync_engine

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.ready = False
    try:
        await connect_to_mongo()
        version = await mongo_db["_schema_versions"].find_one({"_id": "application"})
        if not version or version.get("version") != SCHEMA_VERSION:
            raise RuntimeError("MongoDB schema is not current. Run python -m scripts.provision_mongo --apply before deployment.")
        migration_config = Config(str(Path(__file__).parents[2] / "alembic.ini"))
        expected = set(ScriptDirectory.from_config(migration_config).get_heads())
        async with engine.connect() as connection:
            versions = set((await connection.execute(text("SELECT version_num FROM alembic_version"))).scalars())
            if versions != expected:
                raise RuntimeError("PostgreSQL schema is not current. Run alembic upgrade head before deployment.")
        if not firebase_admin._apps:
            cred = credentials.Certificate({
                "type": "service_account", "project_id": settings.firebase_project_id,
                "private_key_id": settings.private_key_id,
                "private_key": settings.firebase_private_key.replace("\\n", "\n"),
                "client_email": settings.firebase_client_email, "client_id": settings.client_id,
                "auth_uri": settings.auth_uri, "token_uri": settings.token_uri,
            })
            firebase_admin.initialize_app(cred)
        app.state.ready = True
        logger.info("Application dependencies verified")
        yield
    finally:
        app.state.ready = False
        close_mongo_connection()
        await engine.dispose()
        sync_engine.dispose()
