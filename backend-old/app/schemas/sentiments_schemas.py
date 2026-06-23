# app/schemas/sentiments_schemas.py

from pydantic import BaseModel
from typing import List, Dict, Union
from datetime import datetime
from app.utils.constants import UserEmotionsEnum


class SentimentInput(BaseModel):
    texts: Union[str, List[str]]

class SentimentPrediction(BaseModel):
    sentiment: UserEmotionsEnum
    emotion_intensity_score: float

class UserMessage(BaseModel):
    content: str
    timestamp: datetime
    
class ErrorDetail(BaseModel):
    user_id: str
    error: str

class SentimentAnalysisSummary(BaseModel):
    date: str
    total_users: int
    successful: int
    skipped: int
    failed: int
    errors: List[ErrorDetail] = []

class SentimentAnalysisSummaryResponse(BaseModel):
    message: str
    summary: SentimentAnalysisSummary

class UserSentiment(BaseModel):
    user_id: str
    date: datetime
    dominant_emotion: UserEmotionsEnum
    emotion_intensity_score: float
    message_count: int

class EmotionStreakResponse(BaseModel):
    streaks_by_category: Dict[str, Dict[str, int]]

