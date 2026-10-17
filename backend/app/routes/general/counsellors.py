"""Counsellors endpoints and access checks."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models import Appointment, NormalUser
from app.models.community import CounsellorReview
from app.schemas.counsellors_schemas import CounsellorListWebView, CounsellorWebView
from app.schemas.records import record_fields
from app.services.general.counsellors_service import (
    fetch_counsellor_by_id,
    fetch_counsellors,
)
from app.utils.constants import AppointmentStatusEnum
from app.utils.oauth import ensure_normal_user

router = APIRouter()


@router.get("", response_model=CounsellorListWebView)
async def get_counsellors(db: AsyncSession = Depends(get_db)):
    return await fetch_counsellors(db)


@router.get("/{counsellor_id}", response_model=CounsellorWebView)
async def get_counsellor(counsellor_id: str, db: AsyncSession = Depends(get_db)):
    return await fetch_counsellor_by_id(db, counsellor_id)


@router.get("/{counsellor_id}/reviews")
async def get_counsellor_reviews(
    counsellor_id: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    # Unverified historical rows remain private until provenance is reviewed.
    records = await db.scalars(
        select(CounsellorReview)
        .where(
            CounsellorReview.counsellor_id == counsellor_id,
            CounsellorReview.verified_appointment.is_(True),
        )
        .order_by(CounsellorReview.created_at.desc(), CounsellorReview.id.desc())
        .offset(offset)
        .limit(limit)
    )
    return [
        {
            **record_fields(row, "id", "author", "rating", "content", "created_at"),
            "helpfulCount": row.helpful_count,
        }
        for row in records
    ]


class ReviewCreate(BaseModel):
    appointment_id: str = Field(min_length=1, max_length=20)
    rating: int = Field(ge=1, le=5)
    content: str = Field(min_length=1, max_length=10000)


@router.post("/{counsellor_id}/reviews", status_code=status.HTTP_201_CREATED)
async def submit_counsellor_review(
    counsellor_id: str,
    payload: ReviewCreate,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    appointment = (
        await db.execute(
            select(Appointment).where(
                Appointment.appointment_id == payload.appointment_id,
                Appointment.user_id == current_user.user_id,
                Appointment.counsellor_id == counsellor_id,
                Appointment.status == AppointmentStatusEnum.completed,
            )
        )
    ).scalar_one_or_none()
    if appointment is None:
        raise HTTPException(
            status_code=403,
            detail="A completed appointment is required to review this counsellor",
        )
    record = CounsellorReview(
        counsellor_id=counsellor_id,
        user_id=current_user.user_id,
        appointment_id=appointment.appointment_id,
        verified_appointment=True,
        author=current_user.name,
        rating=payload.rating,
        content=payload.content,
    )
    db.add(record)
    try:
        await db.commit()
    except IntegrityError as exc:
        await db.rollback()
        if getattr(exc.orig, "sqlstate", None) == "23505":
            raise HTTPException(
                status_code=409, detail="This appointment already has a review"
            ) from exc
        raise
    return {
        "status": "success",
        "id": record.id,
        "message": "Review submitted successfully",
    }
