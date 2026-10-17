"""Only explicitly published exercises are visible to clients."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.content import Exercise
from app.schemas.records import record_fields

router = APIRouter(tags=["Exercises"])


def present(record):
    result = record_fields(
        record,
        "title",
        "category",
        "description",
        "published",
        "duration_min",
        "instructions",
        "audio_url",
    )
    result["id"] = record.public_id or record.id
    return result


@router.get("/")
async def get_exercises(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    records = await db.scalars(
        select(Exercise)
        .where(Exercise.published.is_(True))
        .order_by(Exercise.title, Exercise.id)
        .offset(offset)
        .limit(limit)
    )
    return [present(record) for record in records]


@router.get("/{exercise_id}")
async def get_exercise_by_id(exercise_id: str, db: AsyncSession = Depends(get_db)):
    # Public aliases remain usable after importing the old opaque record IDs.
    record = await db.scalar(
        select(Exercise).where(
            Exercise.published.is_(True),
            or_(Exercise.id == exercise_id, Exercise.public_id == exercise_id),
        )
    )
    if record is None:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return present(record)
