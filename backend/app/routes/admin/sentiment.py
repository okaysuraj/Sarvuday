# app/api/routes/sentiment.py

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Union
from app.database import get_db
from app.models import Admin
from app.utils.oauth import ensure_admin_user
from app.schemas import SentimentInput, SentimentPrediction, SentimentAnalysisSummaryResponse
from app.services.sentiments_analysis.sentiment_service import SentimentAnalysisService

router = APIRouter(prefix="/sentiments", tags=["Sentiment Analysis by Admin"])

@router.post(
    "/predict",
    response_model=Union[SentimentPrediction, List[SentimentPrediction]],
    status_code=status.HTTP_200_OK,
    summary="Dummy route for admin to check sentiment model working. Admin Authentication Required to access this route"
)
async def predict_sentiment(
    input_data: SentimentInput,
    current_user: Admin = Depends(ensure_admin_user),
):
    return await SentimentAnalysisService().analyze(input_data)



@router.post(
    "/daily-run/manual",
    response_model=SentimentAnalysisSummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Sentiment Analysis Manual Run for all users. Admin Authentication Required to access this route"
)
async def manual_daily_sentiment_analysis(
    db: AsyncSession = Depends(get_db),
    current_user: Admin = Depends(ensure_admin_user)
):
    summary = await SentimentAnalysisService(db=db).run_daily_analysis()

    return SentimentAnalysisSummaryResponse(
        message="Sentiment Analysis completed successfully",
        summary=summary
    )


    