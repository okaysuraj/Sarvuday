"""Personal tracking with owner-scoped queries and atomic habit updates."""

from datetime import date, datetime, time, timedelta, timezone
from math import sqrt

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import case, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.wellness import (
    BiofeedbackTelemetry,
    JournalEntry,
    MoodTracking,
    SleepTracking,
    UserGoal,
    UserMedication,
)
from app.schemas.records import record_fields
from app.schemas.tracking_schemas import (
    GoalCreate,
    JournalCreate,
    MedicationCreate,
    MoodCreate,
    SleepCreate,
)
from app.utils.oauth import ensure_normal_user

router = APIRouter(prefix="/tracking", tags=["Tracking"])

# Explicit fields keep ownership keys and import metadata out of responses.
HISTORY_FIELDS = {
    MoodTracking: (
        "mood",
        "energy_level",
        "anxiety_level",
        "sleep_quality",
        "emotions",
        "notes",
    ),
    JournalEntry: (
        "content",
        "entry_type",
        "ai_sentiment_score",
        "triggers",
        "shared_with_therapist",
    ),
    SleepTracking: ("date", "duration_hours", "quality", "deep_sleep_hours"),
    UserMedication: (
        "name",
        "dosage",
        "schedule",
        "type",
        "refill_days",
        "is_taken",
        "updated_at",
    ),
    UserGoal: (
        "title",
        "description",
        "frequency",
        "progress_total",
        "progress_current",
        "streak",
        "updated_at",
    ),
}


def serialize(record):
    result = record_fields(record, "id", "created_at", *HISTORY_FIELDS[type(record)])
    if isinstance(record, MoodTracking):
        result["mood"] = str(record.mood)
    return result


async def save_record(db, record):
    db.add(record)
    await db.commit()
    return {"status": "success", "id": record.id}


async def history(db, model, user_id, limit, offset, *filters):
    records = await db.scalars(
        select(model)
        .where(model.user_id == user_id, *filters)
        .order_by(model.created_at.desc(), model.id.desc())
        .offset(offset)
        .limit(limit)
    )
    return [serialize(record) for record in records]


@router.post("/mood", status_code=201)
async def log_mood(
    data: MoodCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await save_record(
        db,
        MoodTracking(
            user_id=current_user.user_id,
            mood=data.moodIndex,
            **data.model_dump(exclude={"moodIndex"}),
        ),
    )


@router.get("/mood/history")
async def get_mood_history(
    start_date: date | None = None,
    end_date: date | None = None,
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=422, detail="Start date must precede end date")
    filters = []
    if start_date:
        filters.append(
            MoodTracking.created_at
            >= datetime.combine(start_date, time.min, tzinfo=timezone.utc)
        )
    if end_date:
        filters.append(
            MoodTracking.created_at
            < datetime.combine(
                end_date + timedelta(days=1), time.min, tzinfo=timezone.utc
            )
        )
    return await history(
        db, MoodTracking, current_user.user_id, limit, offset, *filters
    )


@router.post("/journal", status_code=201)
async def submit_journal(
    data: JournalCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    result = await save_record(
        db,
        JournalEntry(
            user_id=current_user.user_id, content=data.text, triggers=data.triggers
        ),
    )
    return {**result, "sentiment": None}


@router.get("/journal")
async def get_journal_entries(
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await history(db, JournalEntry, current_user.user_id, limit, offset)


@router.post("/sleep", status_code=201)
async def log_sleep(
    data: SleepCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await save_record(
        db,
        SleepTracking(
            user_id=current_user.user_id,
            date=data.date or datetime.now(timezone.utc).date(),
            **data.model_dump(exclude={"date"}),
        ),
    )


@router.get("/sleep")
async def get_sleep_history(
    limit: int = Query(30, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await history(db, SleepTracking, current_user.user_id, limit, offset)


@router.get("/medications")
async def get_medications(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await history(db, UserMedication, current_user.user_id, limit, offset)


@router.post("/medications", status_code=201)
async def add_medication(
    data: MedicationCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await save_record(
        db, UserMedication(user_id=current_user.user_id, **data.model_dump())
    )


@router.patch("/medications/{med_id}/toggle")
async def toggle_medication(
    med_id: str,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    taken = await db.scalar(
        update(UserMedication)
        .where(
            UserMedication.id == med_id, UserMedication.user_id == current_user.user_id
        )
        .values(is_taken=~UserMedication.is_taken, updated_at=func.now())
        .returning(UserMedication.is_taken)
    )
    if taken is None:
        raise HTTPException(status_code=404, detail="Medication not found")
    await db.commit()
    return {"status": "success", "is_taken": taken}


@router.get("/goals")
async def get_goals(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await history(db, UserGoal, current_user.user_id, limit, offset)


@router.post("/goals", status_code=201)
async def create_goal(
    data: GoalCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await save_record(
        db, UserGoal(user_id=current_user.user_id, **data.model_dump())
    )


@router.patch("/goals/{goal_id}/increment")
async def increment_goal(
    goal_id: str,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    # Both assignments use the old row under one lock. Completion counts once.
    crossed = UserGoal.progress_current == UserGoal.progress_total - 1
    row = (
        await db.execute(
            update(UserGoal)
            .where(UserGoal.id == goal_id, UserGoal.user_id == current_user.user_id)
            .values(
                progress_current=func.least(
                    UserGoal.progress_total, UserGoal.progress_current + 1
                ),
                streak=UserGoal.streak + case((crossed, 1), else_=0),
                updated_at=func.now(),
            )
            .returning(UserGoal.progress_current, UserGoal.streak)
        )
    ).one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    await db.commit()
    return {
        "status": "success",
        "progress_current": row.progress_current,
        "streak": row.streak,
    }


@router.get("/biofeedback")
async def get_biofeedback(
    current_user=Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)
):
    record = await db.scalar(
        select(BiofeedbackTelemetry)
        .where(BiofeedbackTelemetry.user_id == current_user.user_id)
        .order_by(BiofeedbackTelemetry.timestamp.desc(), BiofeedbackTelemetry.id.desc())
        .limit(1)
    )
    fields = (
        "hrv",
        "stress_level",
        "stress_threshold",
        "recent_arousal",
        "cortisol_spike",
        "heart_rate",
        "sleep_score",
        "daily_steps",
    )
    return {
        "status": "success" if record else "no_data",
        **{field: getattr(record, field) if record else None for field in fields},
        "calmness_trend": record.calmness_trend if record else [],
        "measured_at": record.timestamp.isoformat() if record else None,
        "source": record.source if record else None,
    }


def correlate_records(sleeps, moods):
    """Compare the latest self-reported values on dates with both measurements."""
    sleep_by_date = {}
    for record in sleeps:
        sleep_by_date.setdefault(str(record["date"]), record["duration_hours"])
    mood_by_date = {}
    for record in moods:
        mood_by_date.setdefault(
            record["created_at"].date().isoformat(), float(record["mood"])
        )
    points = [
        {
            "date": day,
            "day": date.fromisoformat(day).strftime("%a"),
            "sleep": duration,
            "mood": mood_by_date.get(day),
        }
        for day, duration in sorted(sleep_by_date.items())
    ]
    pairs = [(p["sleep"], p["mood"]) for p in points if p["mood"] is not None]
    coefficient = None
    if len(pairs) >= 3:
        avg_x = sum(p[0] for p in pairs) / len(pairs)
        avg_y = sum(p[1] for p in pairs) / len(pairs)
        numerator = sum((x - avg_x) * (y - avg_y) for x, y in pairs)
        denominator = sqrt(
            sum((x - avg_x) ** 2 for x, _ in pairs)
            * sum((y - avg_y) ** 2 for _, y in pairs)
        )
        if denominator:
            coefficient = round(numerator / denominator, 3)
    return points, pairs, coefficient


@router.get("/correlation")
async def get_correlation_data(
    current_user=Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)
):
    cutoff = datetime.now(timezone.utc) - timedelta(days=30)
    sleeps = await db.scalars(
        select(SleepTracking)
        .where(
            SleepTracking.user_id == current_user.user_id,
            SleepTracking.date >= cutoff.date(),
        )
        .order_by(SleepTracking.created_at.desc(), SleepTracking.id.desc())
        .limit(500)
    )
    moods = await db.scalars(
        select(MoodTracking)
        .where(
            MoodTracking.user_id == current_user.user_id,
            MoodTracking.created_at >= cutoff,
        )
        .order_by(MoodTracking.created_at.desc(), MoodTracking.id.desc())
        .limit(500)
    )
    points, pairs, coefficient = correlate_records(
        [{"date": s.date, "duration_hours": s.duration_hours} for s in sleeps],
        [{"created_at": m.created_at, "mood": m.mood} for m in moods],
    )
    return {
        "status": "success" if points else "no_data",
        "data_points": points,
        "matched_days": len(pairs),
        "correlation": coefficient,
        "mood_scale": {"min": 0, "max": 4},
        "insight": f"You have {len(pairs)} days with both sleep and mood records.",
        "sleep_quality_trend": None,
        "mood_consistency": None,
    }
