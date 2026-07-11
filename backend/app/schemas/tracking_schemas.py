from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MoodCreate(BaseModel):
    moodIndex: int
    emotions: Optional[List[str]] = []
    energy_level: Optional[int] = 5
    anxiety_level: Optional[int] = 5
    sleep_quality: Optional[str] = "Good"
    notes: Optional[str] = ""

class JournalCreate(BaseModel):
    text: str
    triggers: Optional[List[str]] = []

class MoodResponse(BaseModel):
    id: str
    mood: str
    energy_level: int
    anxiety_level: int
    sleep_quality: str
    notes: str
    created_at: datetime

class JournalResponse(BaseModel):
    id: str
    content: str
    ai_sentiment_score: float
    created_at: datetime
