"""Request validation and response models for tracking."""

from datetime import date as Date
from datetime import datetime
from typing import Any, List, Literal, Optional

from pydantic import BaseModel, Field, model_validator


class MoodCreate(BaseModel):
    moodIndex: int = Field(ge=0, le=4)
    emotions: List[str] = Field(default_factory=list, max_length=30)
    energy_level: Optional[int] = Field(default=None, ge=0, le=10)
    anxiety_level: Optional[int] = Field(default=None, ge=0, le=10)
    sleep_quality: Optional[str] = Field(default=None, max_length=50)
    notes: str = Field(default="", max_length=10000)


class JournalCreate(BaseModel):
    text: str = Field(min_length=1, max_length=50000)
    triggers: List[str] = Field(default_factory=list, max_length=50)


class SleepCreate(BaseModel):
    date: Optional[Date] = None
    duration_hours: float = Field(ge=0, le=24, allow_inf_nan=False)
    quality: Optional[str] = Field(default=None, max_length=50)
    deep_sleep_hours: Optional[float] = Field(
        default=None, ge=0, le=24, allow_inf_nan=False
    )

    @model_validator(mode="after")
    def validate_deep_sleep(self):
        if (
            self.deep_sleep_hours is not None
            and self.deep_sleep_hours > self.duration_hours
        ):
            raise ValueError("Deep sleep cannot exceed total sleep duration")
        return self


class MedicationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    dosage: str = Field(default="", max_length=200)
    schedule: str = Field(default="", max_length=200)
    type: str = Field(default="Prescription", max_length=50)
    refill_days: Optional[int] = Field(default=None, ge=0, le=3650)


class GoalCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(default="", max_length=5000)
    frequency: str = Field(default="Daily", max_length=50)
    progress_total: int = Field(default=1, ge=1, le=100000)


class RecordCreated(BaseModel):
    status: Literal["success"] = "success"
    id: str


class TrackingRecord(BaseModel):
    id: str
    created_at: datetime


class MoodRecord(TrackingRecord):
    mood: str
    energy_level: int | None
    anxiety_level: int | None
    sleep_quality: str | None
    emotions: list[str]
    notes: str


class JournalRecord(TrackingRecord):
    content: str
    entry_type: str
    ai_sentiment_score: float | None
    triggers: list[str]
    shared_with_therapist: bool


class JournalCreated(RecordCreated):
    sentiment: float | None = None


class SleepRecord(TrackingRecord):
    date: Date
    duration_hours: float
    quality: str | None
    deep_sleep_hours: float | None


class MedicationRecord(TrackingRecord):
    name: str
    dosage: str
    schedule: str
    type: str
    refill_days: int | None
    is_taken: bool
    updated_at: datetime | None


class MedicationToggled(BaseModel):
    status: Literal["success"] = "success"
    is_taken: bool


class GoalRecord(TrackingRecord):
    title: str
    description: str
    frequency: str
    progress_total: int
    progress_current: int
    streak: int
    updated_at: datetime | None


class GoalProgress(BaseModel):
    status: Literal["success"] = "success"
    progress_current: int
    streak: int


class BiofeedbackResponse(BaseModel):
    status: Literal["success", "no_data"]
    hrv: float | None
    stress_level: float | None
    stress_threshold: float | None
    recent_arousal: float | None
    cortisol_spike: float | None
    heart_rate: float | None
    sleep_score: float | None
    daily_steps: int | None
    calmness_trend: list[Any]
    measured_at: datetime | None
    source: str | None


class CorrelationPoint(BaseModel):
    date: Date
    day: str
    sleep: float
    mood: float | None


class CorrelationResponse(BaseModel):
    status: Literal["success", "no_data"]
    data_points: list[CorrelationPoint]
    matched_days: int
    correlation: float | None
    mood_scale: dict[str, int]
    insight: str
    sleep_quality_trend: float | None = None
    mood_consistency: float | None = None
