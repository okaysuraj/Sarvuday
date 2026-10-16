"""The exercise catalog is clinical content curated in MongoDB, without seed rows."""
from fastapi import APIRouter, Depends, HTTPException, Query
from bson import ObjectId
from pymongo.errors import PyMongoError
from app.database import get_mongo_db

router = APIRouter(tags=["Exercises"])


def present(record):
    return {**{key: value for key, value in record.items() if key not in {"_id", "status"}},
            "id": record.get("id") or str(record["_id"])}


@router.get("/")
async def get_exercises(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                        mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.exercises.find({"published": True}).sort("title", 1).skip(offset).limit(limit).to_list(length=limit)
        return [present(record) for record in records]
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Exercise catalog is unavailable") from exc


@router.get("/{exercise_id}")
async def get_exercise_by_id(exercise_id: str, mongo_db=Depends(get_mongo_db)):
    identifiers = [{"id": exercise_id}]
    if ObjectId.is_valid(exercise_id):
        identifiers.append({"_id": ObjectId(exercise_id)})
    try:
        record = await mongo_db.exercises.find_one({"published": True, "$or": identifiers})
        if record is None:
            raise HTTPException(status_code=404, detail="Exercise not found")
        return present(record)
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Exercise catalog is unavailable") from exc
