# app/services/sentiments_analysis/streak.py

from datetime import datetime, timedelta, timezone
from typing import Dict, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from app.utils.constants import UserEmotionsEnum, EMOTION_CATEGORIES
from app.models import UserSentiment
from app.schemas import EmotionStreakResponse


class StreakAnalyzer:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def calculate_streaks(self, user_id: str, days: int = 30) -> EmotionStreakResponse:
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=days)

        result = await self.db.execute(
            select(UserSentiment)
            .where(
                UserSentiment.user_id == user_id,
                UserSentiment.date >= cutoff_date
            )
            .order_by(desc(UserSentiment.date))
        )
        records = result.scalars().all()

        # Build streaks grouped by category and emotion
        streaks_by_category: Dict[str, Dict[str, int]] = {}

        for category, emotions in EMOTION_CATEGORIES.items():
            streaks_by_category[category] = {}
            for emotion in emotions:
                streak = self._calculate_emotion_streak(records, emotion)
                streaks_by_category[category][emotion] = streak

        return EmotionStreakResponse(streaks_by_category=streaks_by_category)

    def _calculate_emotion_streak(self, records: List[UserSentiment], emotion: str) -> int:
        streak = 0
        for record in records:
            if record.dominant_emotion == emotion:
                streak += 1
            else:
                break
        return streak

