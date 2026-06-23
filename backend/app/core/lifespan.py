# app/core/lifespan.py

from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.firebase_config import *
from app.database import engine, Base, connect_to_mongo, close_mongo_connection
from app.database.redis_db import connect_to_redis, close_redis_connection
from app.core.scheduler import sentiment_scheduler  # import your scheduler instance

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handles startup/shutdown for DBs and models."""
    
    # MongoDB and Redis
    connect_to_mongo()
    await connect_to_redis()

    # PostgreSQL
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("[SUCCESS] PostgreSQL tables created.")

    # Start the APScheduler
    await sentiment_scheduler.start(app)

    yield  # <-- app runs here

    # Shutdown tasks

    # Shutdown the scheduler gracefully
    await sentiment_scheduler.shutdown()

    close_mongo_connection()
    await close_redis_connection()

    print("[SUCCESS] Resources cleaned up.")

