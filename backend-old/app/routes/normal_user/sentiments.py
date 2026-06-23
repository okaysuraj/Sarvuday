# app/routes/normal_user/sentiment.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.services.sentiments_analysis.streak import StreakAnalyzer
from app.services.sentiments_analysis.sentiment_service import SentimentAnalysisService
from app.schemas import (
    SentimentInput,
    SentimentPrediction,
    EmotionStreakResponse
)

router = APIRouter(prefix="/sentiments", tags=["Sentiment Analysis by Users"])

@router.get("/streak", response_model=EmotionStreakResponse, status_code=status.HTTP_200_OK, summary="Get User Sentiment Streaks. Normal User Authentication required")
async def get_emotion_streak(
    days: int = 30,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await StreakAnalyzer(db).calculate_streaks(current_user.user_id, days)


@router.post(
    "/analyze-message",
    response_model=SentimentPrediction,
    status_code=status.HTTP_200_OK,
    summary="Analyze a chatbot session conversation using sentiment model. Normal User Authentication required"
)
async def analyze_chat_session(
    input_data: SentimentInput,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    result = await SentimentAnalysisService(db=db).analyze(input_data)

    # Since we send a single string, the result is always a single prediction
    return result if isinstance(result, SentimentPrediction) else result[0]
