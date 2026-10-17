"""Separate process liveness from dependency readiness for hosting health checks."""

import asyncio

from fastapi import APIRouter, HTTPException, Request
from sqlalchemy import text

from app.database.postgres import engine

router = APIRouter(include_in_schema=False)


@router.get("/health/live")
async def liveness():
    return {"status": "alive"}


async def check_postgres() -> None:
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))


@router.get("/health/ready")
async def readiness(request: Request):
    if not getattr(request.app.state, "ready", False):
        raise HTTPException(status_code=503, detail="Service is not ready")
    try:
        await asyncio.wait_for(check_postgres(), timeout=3)
    except Exception as error:
        raise HTTPException(
            status_code=503, detail="Service dependencies are unavailable"
        ) from error
    return {"status": "ready"}
