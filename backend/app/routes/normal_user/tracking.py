"""Personal tracking: only supplied records and measured telemetry are returned."""
import logging
from datetime import date, datetime, time, timedelta, timezone
from math import sqrt
from typing import Optional

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo import ReturnDocument
from pymongo.errors import PyMongoError

from app.database import get_mongo_db
from app.models import NormalUser
from app.models.mongodb_models import JournalEntry, MoodTracking
from app.schemas.tracking_schemas import GoalCreate, JournalCreate, MedicationCreate, MoodCreate, SleepCreate
from app.utils.oauth import ensure_normal_user

router = APIRouter(prefix="/tracking", tags=["Tracking"])
logger = logging.getLogger(__name__)


def database_error(exc):
    logger.error("Tracking database operation failed: %s", type(exc).__name__)
    raise HTTPException(status_code=503, detail="Tracking service is unavailable") from exc


def object_id(value):
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=422, detail="Invalid record ID")
    return ObjectId(value)


def serialize(record):
    return {
        **{key: value.isoformat() if isinstance(value, datetime) else value
           for key, value in record.items() if key not in {"_id", "user_id"}},
        "id": str(record["_id"]),
    }


@router.post("/mood", status_code=status.HTTP_201_CREATED)
async def log_mood(data: MoodCreate, current_user: NormalUser = Depends(ensure_normal_user),
                   mongo_db=Depends(get_mongo_db)):
    record = MoodTracking(user_id=current_user.user_id, mood=str(data.moodIndex),
                          **data.model_dump(exclude={"moodIndex"}))
    try:
        result = await mongo_db.mood_tracking.insert_one(record.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id)}
    except PyMongoError as exc:
        database_error(exc)


@router.get("/mood/history")
async def get_mood_history(start_date: Optional[date] = None, end_date: Optional[date] = None,
                           limit: int = Query(100, ge=1, le=100), offset: int = Query(0, ge=0),
                           current_user: NormalUser = Depends(ensure_normal_user),
                           mongo_db=Depends(get_mongo_db)):
    if start_date and end_date and start_date > end_date:
        raise HTTPException(status_code=422, detail="Start date must precede end date")
    query = {"user_id": current_user.user_id}
    window = {}
    if start_date:
        window["$gte"] = datetime.combine(start_date, time.min, tzinfo=timezone.utc)
    if end_date:
        window["$lt"] = datetime.combine(end_date + timedelta(days=1), time.min, tzinfo=timezone.utc)
    if window:
        query["created_at"] = window
    try:
        records = await mongo_db.mood_tracking.find(query).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [serialize(record) for record in records]
    except PyMongoError as exc:
        database_error(exc)


@router.post("/journal", status_code=status.HTTP_201_CREATED)
async def submit_journal(data: JournalCreate, current_user: NormalUser = Depends(ensure_normal_user),
                         mongo_db=Depends(get_mongo_db)):
    # Sentiment stays unknown until a configured inference service analyzes it.
    record = JournalEntry(user_id=current_user.user_id, content=data.text, triggers=data.triggers)
    try:
        result = await mongo_db.journal_entries.insert_one(record.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id), "sentiment": None}
    except PyMongoError as exc:
        database_error(exc)


@router.get("/journal")
async def get_journal_entries(limit: int = Query(100, ge=1, le=100), offset: int = Query(0, ge=0),
                              current_user: NormalUser = Depends(ensure_normal_user),
                              mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.journal_entries.find({"user_id": current_user.user_id}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [serialize(record) for record in records]
    except PyMongoError as exc:
        database_error(exc)


@router.post("/sleep", status_code=status.HTTP_201_CREATED)
async def log_sleep(data: SleepCreate, current_user: NormalUser = Depends(ensure_normal_user),
                     mongo_db=Depends(get_mongo_db)):
    now = datetime.now(timezone.utc)
    record = {**data.model_dump(exclude={"date"}), "user_id": current_user.user_id,
              "date": (data.date or now.date()).isoformat(), "created_at": now}
    try:
        result = await mongo_db.sleep_tracking.insert_one(record)
        return {"status": "success", "id": str(result.inserted_id)}
    except PyMongoError as exc:
        database_error(exc)


@router.get("/sleep")
async def get_sleep_history(limit: int = Query(30, ge=1, le=100), offset: int = Query(0, ge=0),
                            current_user: NormalUser = Depends(ensure_normal_user),
                            mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.sleep_tracking.find({"user_id": current_user.user_id}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [serialize(record) for record in records]
    except PyMongoError as exc:
        database_error(exc)


@router.get("/medications")
async def get_medications(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                          current_user: NormalUser = Depends(ensure_normal_user),
                          mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.user_medications.find({"user_id": current_user.user_id}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [serialize(record) for record in records]
    except PyMongoError as exc:
        database_error(exc)


@router.post("/medications", status_code=status.HTTP_201_CREATED)
async def add_medication(data: MedicationCreate, current_user: NormalUser = Depends(ensure_normal_user),
                         mongo_db=Depends(get_mongo_db)):
    record = {**data.model_dump(), "user_id": current_user.user_id, "is_taken": False,
              "created_at": datetime.now(timezone.utc)}
    try:
        result = await mongo_db.user_medications.insert_one(record)
        return {"status": "success", "id": str(result.inserted_id)}
    except PyMongoError as exc:
        database_error(exc)


@router.patch("/medications/{med_id}/toggle")
async def toggle_medication(med_id: str, current_user: NormalUser = Depends(ensure_normal_user),
                            mongo_db=Depends(get_mongo_db)):
    # A single atomic write prevents two clients losing one another's updates.
    query = {"_id": object_id(med_id), "user_id": current_user.user_id}
    try:
        record = await mongo_db.user_medications.find_one_and_update(
            query, [{"$set": {"is_taken": {"$not": [{"$ifNull": ["$is_taken", False]}]},
                              "updated_at": datetime.now(timezone.utc)}}],
            return_document=ReturnDocument.AFTER)
        if record is None:
            raise HTTPException(status_code=404, detail="Medication not found")
        return {"status": "success", "is_taken": record["is_taken"]}
    except PyMongoError as exc:
        database_error(exc)


@router.get("/goals")
async def get_goals(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                    current_user: NormalUser = Depends(ensure_normal_user),
                    mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.user_goals.find({"user_id": current_user.user_id}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [serialize(record) for record in records]
    except PyMongoError as exc:
        database_error(exc)


@router.post("/goals", status_code=status.HTTP_201_CREATED)
async def create_goal(data: GoalCreate, current_user: NormalUser = Depends(ensure_normal_user),
                      mongo_db=Depends(get_mongo_db)):
    record = {**data.model_dump(), "user_id": current_user.user_id, "streak": 0,
              "progress_current": 0, "created_at": datetime.now(timezone.utc)}
    try:
        result = await mongo_db.user_goals.insert_one(record)
        return {"status": "success", "id": str(result.inserted_id)}
    except PyMongoError as exc:
        database_error(exc)


@router.patch("/goals/{goal_id}/increment")
async def increment_goal(goal_id: str, current_user: NormalUser = Depends(ensure_normal_user),
                         mongo_db=Depends(get_mongo_db)):
    query = {"_id": object_id(goal_id), "user_id": current_user.user_id}
    # Completion counts once. Repeated taps at the cap cannot inflate the streak.
    progress = {"$ifNull": ["$progress_current", 0]}
    total = {"$max": [1, {"$ifNull": ["$progress_total", 1]}]}
    next_progress = {"$min": [total, {"$add": [progress, 1]}]}
    crossed = {"$and": [{"$lt": [progress, total]}, {"$gte": [next_progress, total]}]}
    try:
        record = await mongo_db.user_goals.find_one_and_update(
            query, [{"$set": {"progress_current": next_progress,
                              "streak": {"$add": [{"$ifNull": ["$streak", 0]}, {"$cond": [crossed, 1, 0]}]},
                              "updated_at": datetime.now(timezone.utc)}}],
            return_document=ReturnDocument.AFTER)
        if record is None:
            raise HTTPException(status_code=404, detail="Goal not found")
        return {"status": "success", "progress_current": record["progress_current"], "streak": record["streak"]}
    except PyMongoError as exc:
        database_error(exc)


@router.get("/biofeedback")
async def get_biofeedback(current_user: NormalUser = Depends(ensure_normal_user),
                          mongo_db=Depends(get_mongo_db)):
    try:
        record = await mongo_db.biofeedback_telemetry.find_one(
            {"user_id": current_user.user_id}, sort=[("timestamp", -1)])
        fields = ("hrv", "stress_level", "stress_threshold", "recent_arousal", "cortisol_spike",
                  "heart_rate", "sleep_score", "daily_steps")
        return {
            "status": "success" if record else "no_data",
            **{field: record.get(field) if record else None for field in fields},
            "calmness_trend": record.get("calmness_trend", []) if record else [],
            "measured_at": record.get("timestamp").isoformat() if record and isinstance(record.get("timestamp"), datetime) else None,
            "source": record.get("source") if record else None,
        }
    except PyMongoError as exc:
        database_error(exc)


def correlate_records(sleeps, moods):
    # Keep the latest real report per date. Missing measurements remain absent.
    sleep_by_date = {}
    for record in sleeps:
        if record.get("date") and isinstance(record.get("duration_hours"), (float, int)):
            sleep_by_date.setdefault(str(record["date"]), record["duration_hours"])
    mood_by_date = {}
    for record in moods:
        created = record.get("created_at")
        if isinstance(created, datetime):
            try:
                mood = float(record["mood"])
            except (KeyError, TypeError, ValueError):
                continue
            mood_by_date.setdefault(created.date().isoformat(), mood)
    points = [
        {"date": day, "day": date.fromisoformat(day).strftime("%a"), "sleep": duration, "mood": mood_by_date.get(day)}
        for day, duration in sorted(sleep_by_date.items())
    ]
    pairs = [(p["sleep"], p["mood"]) for p in points if p["mood"] is not None]
    coefficient = None
    if len(pairs) >= 3:
        avg_x = sum(p[0] for p in pairs) / len(pairs)
        avg_y = sum(p[1] for p in pairs) / len(pairs)
        numerator = sum((x - avg_x) * (y - avg_y) for x, y in pairs)
        denominator = sqrt(sum((x - avg_x) ** 2 for x, _ in pairs) * sum((y - avg_y) ** 2 for _, y in pairs))
        if denominator:
            coefficient = round(numerator / denominator, 3)
    return points, pairs, coefficient


@router.get("/correlation")
async def get_correlation_data(current_user: NormalUser = Depends(ensure_normal_user),
                               mongo_db=Depends(get_mongo_db)):
    cutoff = datetime.now(timezone.utc) - timedelta(days=30)
    try:
        sleeps = await mongo_db.sleep_tracking.find({"user_id": current_user.user_id, "date": {"$gte": cutoff.date().isoformat()}}).sort("created_at", -1).limit(500).to_list(length=500)
        moods = await mongo_db.mood_tracking.find({"user_id": current_user.user_id, "created_at": {"$gte": cutoff}}).sort("created_at", -1).limit(500).to_list(length=500)
        points, pairs, coefficient = correlate_records(sleeps, moods)
        return {"status": "success" if points else "no_data", "data_points": points,
                "matched_days": len(pairs), "correlation": coefficient, "mood_scale": {"min": 0, "max": 4},
                "insight": f"You have {len(pairs)} days with both sleep and mood records.",
                "sleep_quality_trend": None, "mood_consistency": None}
    except PyMongoError as exc:
        database_error(exc)
