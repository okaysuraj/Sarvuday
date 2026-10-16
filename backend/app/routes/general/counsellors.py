from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from pymongo.errors import DuplicateKeyError, PyMongoError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db, get_mongo_db
from app.models import Appointment, NormalUser
from app.schemas import CounsellorListWebView, CounsellorWebView
from app.services.general import CounsellorService
from app.utils.constants import AppointmentStatusEnum
from app.utils.oauth import ensure_normal_user

router = APIRouter()


@router.get("", response_model=CounsellorListWebView)
async def get_counsellors(db: AsyncSession = Depends(get_db)):
    return await CounsellorService.fetch_counsellors(db)


@router.get("/{counsellor_id}", response_model=CounsellorWebView)
async def get_counsellor(counsellor_id: str, db: AsyncSession = Depends(get_db)):
    return await CounsellorService.fetch_counsellor_by_id(db, counsellor_id)


@router.get("/{counsellor_id}/reviews")
async def get_counsellor_reviews(counsellor_id: str, limit: int = Query(50, ge=1, le=100),
                                  offset: int = Query(0, ge=0), mongo_db=Depends(get_mongo_db)):
    try:
        # Historical unverified/seeding rows need provenance review before publication.
        records = await mongo_db.counsellor_reviews.find(
            {"counsellor_id": counsellor_id, "verified_appointment": True}
        ).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [{"id": str(record["_id"]), "author": record["author"], "rating": record["rating"],
                 "content": record["content"], "helpfulCount": record.get("helpfulCount", 0),
                 "created_at": record["created_at"].isoformat()} for record in records]
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Reviews are unavailable") from exc


class ReviewCreate(BaseModel):
    appointment_id: str = Field(min_length=1, max_length=20)
    rating: int = Field(ge=1, le=5)
    content: str = Field(min_length=1, max_length=10000)


@router.post("/{counsellor_id}/reviews", status_code=status.HTTP_201_CREATED)
async def submit_counsellor_review(counsellor_id: str, payload: ReviewCreate,
                                    current_user: NormalUser = Depends(ensure_normal_user),
                                    db: AsyncSession = Depends(get_db), mongo_db=Depends(get_mongo_db)):
    appointment = (await db.execute(select(Appointment).where(
        Appointment.appointment_id == payload.appointment_id,
        Appointment.user_id == current_user.user_id,
        Appointment.counsellor_id == counsellor_id,
        Appointment.status == AppointmentStatusEnum.completed,
    ))).scalar_one_or_none()
    if appointment is None:
        raise HTTPException(status_code=403, detail="A completed appointment is required to review this counsellor")
    record = {"counsellor_id": counsellor_id, "user_id": current_user.user_id,
              "appointment_id": appointment.appointment_id, "verified_appointment": True,
              "author": current_user.name, "rating": payload.rating, "content": payload.content,
              "helpfulCount": 0, "created_at": datetime.now(timezone.utc)}
    try:
        result = await mongo_db.counsellor_reviews.insert_one(record)
        return {"status": "success", "id": str(result.inserted_id), "message": "Review submitted successfully"}
    except DuplicateKeyError as exc:
        raise HTTPException(status_code=409, detail="This appointment already has a review") from exc
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Reviews are unavailable") from exc
