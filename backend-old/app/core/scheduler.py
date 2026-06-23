# app/core/scheduler.py

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from app.config import settings
from typing import Optional

class SentimentScheduler:
    def __init__(self):
        self.scheduler: Optional[AsyncIOScheduler] = None

    async def start(self, app):
        """Initialize and start the scheduler with the app context"""
        if self.scheduler and self.scheduler.running:
            return

        self.scheduler = AsyncIOScheduler(timezone="Asia/Kolkata")

        @self.scheduler.scheduled_job(
            CronTrigger(
                hour=settings.sentiment_job_hour,
                minute=settings.sentiment_job_minute
            )
        )
        async def run_sentiment_job():
            from app.database import async_session
            from app.services.sentiments_analysis.sentiment_service import SentimentAnalysisService

            async with async_session() as db:
                service = SentimentAnalysisService(db=db)
                await service.run_daily_analysis()

        self.scheduler.start()
        print(f"✅ APScheduler started with daily {settings.sentiment_job_hour}:{settings.sentiment_job_minute} IST sentiment analysis job.")

    async def shutdown(self):
        """Shutdown the scheduler gracefully"""
        if self.scheduler and self.scheduler.running:
            self.scheduler.shutdown()
            print("✅ Scheduler shut down gracefully")

# Global scheduler instance
sentiment_scheduler = SentimentScheduler()
