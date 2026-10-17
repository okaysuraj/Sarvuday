"""Account-scoped summaries. Unsupported analysis never returns invented results."""

from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.wellness import MoodTracking
from app.models.safety import CrisisLog
from app.utils.oauth import ensure_normal_user

router = APIRouter(tags=["AI & Insights"])


class TextInput(BaseModel):
    text: str = Field(min_length=1, max_length=50000)


class VoiceInput(BaseModel):
    audio_url: str = Field(min_length=1, max_length=2048)


class CrisisInput(BaseModel):
    risk_level: str = Field(
        default="manual", pattern="^(manual|low|medium|high|critical)$"
    )
    source: str = Field(default="manual", min_length=1, max_length=100)
    notes: str = Field(default="", max_length=10000)


@router.post("/sentiment-analysis")
async def analyze_sentiment(
    payload: TextInput, current_user=Depends(ensure_normal_user)
):
    # Keyword screening is not a validated clinical risk prediction model.
    text = payload.text.lower()
    flagged = any(
        phrase in text
        for phrase in (
            "suicide",
            "kill myself",
            "harm myself",
            "end it all",
            "overdose",
        )
    )
    return {
        "method": "keyword_screening",
        "sentiment_score": None,
        "risk_level": "requires_review" if flagged else "not_assessed",
        "requires_intervention": flagged,
        "emergency_services_contacted": False,
        "immediate_action": "Seek urgent local help if you are in immediate danger. This app has not contacted emergency services."
        if flagged
        else None,
    }


@router.get("/summary")
async def get_ai_summary(
    current_user=Depends(ensure_normal_user), db: AsyncSession = Depends(get_db)
):
    values = list(
        await db.scalars(
            select(MoodTracking.mood)
            .where(MoodTracking.user_id == current_user.user_id)
            .order_by(MoodTracking.created_at.desc(), MoodTracking.id.desc())
            .limit(30)
        )
    )
    average = round(sum(values) / len(values), 2) if values else None
    return {
        "method": "record_summary",
        "record_count": len(values),
        "average_recorded_mood": average,
        "overall_mood": f"Average self-reported mood: {average} out of 4 across {len(values)} check-ins."
        if values
        else None,
        "key_themes": [],
        "recommendations": [],
        "mood_scale": {"min": 0, "max": 4},
    }


@router.post("/voice-analysis")
async def analyze_voice_tone(
    payload: VoiceInput, current_user=Depends(ensure_normal_user)
):
    raise HTTPException(
        status_code=503,
        detail="Voice analysis is unavailable until an analysis provider is configured.",
    )


@router.post("/crisis-alert")
async def trigger_crisis_alert(
    payload: CrisisInput,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    record = CrisisLog(**payload.model_dump(), user_id=current_user.user_id)
    db.add(record)
    await db.commit()
    return {
        "status": "success",
        "crisis_logged": True,
        "log_id": record.id,
        "alert_triggered": False,
        "emergency_services_contacted": False,
        "message": "Your request was saved. This app has not contacted emergency services or confirmed a clinician response.",
    }
