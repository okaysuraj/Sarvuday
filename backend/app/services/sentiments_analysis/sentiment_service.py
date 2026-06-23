# app/services/sentiment_service.py

from typing import List, Union, Optional
from datetime import datetime, timezone, timedelta, date
import httpx
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from app.config import settings
from app.models import UserSentiment, NormalUser
from app.schemas import SentimentInput, SentimentPrediction, UserMessage, SentimentAnalysisSummary
from app.services.sentiments_analysis.data_aggregation import MessageAggregator

class SentimentAnalysisService:
    def __init__(
        self,
        db: Optional[AsyncSession] = None,
        model_base_url: str = settings.sentiment_model_base_url,
    ):
        self.db = db
        self.model_base_url = model_base_url

    async def analyze(self, input_data: SentimentInput) -> Union[SentimentPrediction, List[SentimentPrediction]]:
        """Send text input to sentiment model server and return prediction(s)."""
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.post(
                    f"{self.model_base_url}/predict",
                    json=input_data.model_dump()
                )
                response.raise_for_status()
            except httpx.HTTPError as e:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY
                detail="Database session (db) must be provided for sentiment analysis."
            )

        # Check if analysis already done for user and date
        existing_result = await self.db.execute(
            select(UserSentiment).where(
                and_(
                    UserSentiment.user_id == user_id,
                    UserSentiment.date == target_date
                )
            )
        )
        existing_sentiment = existing_result.scalars().first()

        if existing_sentiment:
            # Already analyzed, return existing record (could also skip or log)
            return existing_sentiment

        messages: List[UserMessage] = await MessageAggregator.get_user_messages(user_id, target_date)

        if not messages:
            raise HTTPException(status_code=404, detail=f"No messages for user {user_id} on {target_date}.")

        full_text = " ".join(msg.content for msg in messages)
        predictions = await self.analyze(SentimentInput(texts=full_text))

        if not predictions:
            return None

        # Always ensure predictions is a list
        if isinstance(predictions, SentimentPrediction):
            predictions = [predictions]

        sentiment = UserSentiment(
            user_id=user_id,
            date=target_date,
            dominant_emotion=predictions[0].sentiment,
            emotion_intensity_score=predictions[0].emotion_intensity_score,
            message_count=len(messages)
        )

        self.db.add(sentiment)
        await self.db.commit()
        await self.db.refresh(sentiment)
        return sentiment

