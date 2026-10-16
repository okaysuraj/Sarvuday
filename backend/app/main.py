# app/main.py

import asyncio
from fastapi import FastAPI, HTTPException
from sqlalchemy import text
from app.config import settings
from app.database import engine
from app.database.mongo import mongo_db
from app.core.middleware import configure_middlewares
from app.core.lifespan import lifespan
from app.routes import api_router

app = FastAPI(
    title="SurvUday API", 
    version="1.0", 
    docs_url="/docs" if settings.environment != "production" or settings.enable_api_docs else None,
    redoc_url="/redoc" if settings.environment != "production" or settings.enable_api_docs else None,
    openapi_url="/openapi.json" if settings.environment != "production" or settings.enable_api_docs else None,
    lifespan=lifespan
)

configure_middlewares(app)
app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Welcome to SurvUday App API"}


@app.get("/health/live", include_in_schema=False)
async def liveness():
    return {"status": "alive"}


@app.get("/health/ready", include_in_schema=False)
async def readiness():
    if not getattr(app.state, "ready", False):
        raise HTTPException(status_code=503, detail="Service is not ready")
    async def check_sql():
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
    try:
        await asyncio.wait_for(asyncio.gather(check_sql(), mongo_db.command("ping")), timeout=3)
    except Exception:
        raise HTTPException(status_code=503, detail="Service dependencies are unavailable")
    return {"status": "ready"}
