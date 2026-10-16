from pydantic import BaseModel, Field, model_validator
from typing import List, Optional
from datetime import date, datetime

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
    date: Optional[date] = None
    duration_hours: float = Field(ge=0, le=24, allow_inf_nan=False)
    quality: Optional[str] = Field(default=None, max_length=50)
    deep_sleep_hours: Optional[float] = Field(default=None, ge=0, le=24, allow_inf_nan=False)

    @model_validator(mode="after")
    def validate_deep_sleep(self):
        if self.deep_sleep_hours is not None and self.deep_sleep_hours > self.duration_hours:
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

class MoodResponse(BaseModel):
    id: str
    mood: str
    energy_level: Optional[int]
    anxiety_level: Optional[int]
    sleep_quality: Optional[str]
    notes: str
    created_at: datetime

class JournalResponse(BaseModel):
    id: str
    content: str
    ai_sentiment_score: Optional[float]
    created_at: datetime
