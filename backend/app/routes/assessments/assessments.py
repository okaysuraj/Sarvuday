"""Assessments endpoints and access checks."""

from fastapi import APIRouter, Depends, status

from sqlalchemy.ext.asyncio import AsyncSession
from app.database.postgres import get_db

from app.models import Admin, Counsellor, NormalUser
from app.schemas.assessments_schemas import (
    AssessmentSchema,
    ComprehensiveScoreResponse,
    ScoreRequestSchema,
    ScoreResponseSchema,
)
from app.services.assessments.assessments_services import AssessmentsService
from app.utils.constants import AssessmentTypeEnum
from app.utils.oauth import get_current_user, get_current_user_optional

router = APIRouter()


def assessment_service(db: AsyncSession = Depends(get_db)) -> AssessmentsService:
    return AssessmentsService(db)


# Assessment routes
@router.get(
    "/bdi",
    response_model=AssessmentSchema,
    status_code=status.HTTP_200_OK,
    summary="Get BDI assessment questions",
)
async def get_bdi_data(service: AssessmentsService = Depends(assessment_service)):
    """Retrieve all questions for Beck Depression Inventory (BDI) assessment"""
    return await service.fetch_assessment_data(AssessmentTypeEnum.BDI.value)


@router.get(
    "/hdrs",
    response_model=AssessmentSchema,
    status_code=status.HTTP_200_OK,
    summary="Get HDRS assessment questions",
)
async def get_hdrs_data(service: AssessmentsService = Depends(assessment_service)):
    """Retrieve all questions for Hamilton Depression Rating Scale (HDRS) assessment"""
    return await service.fetch_assessment_data(AssessmentTypeEnum.HDRS.value)


@router.get(
    "/phq9",
    response_model=AssessmentSchema,
    status_code=status.HTTP_200_OK,
    summary="Get PHQ-9 assessment questions",
)
async def get_phq9_data(service: AssessmentsService = Depends(assessment_service)):
    """Retrieve all questions for Patient Health Questionnaire-9 (PHQ-9) assessment"""
    return await service.fetch_assessment_data(AssessmentTypeEnum.PHQ9.value)


# Scoring routes
@router.post(
    "/score/bdi",
    response_model=ScoreResponseSchema,
    status_code=status.HTTP_200_OK,
    summary="Calculate BDI score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.",
)
async def bdi_score(
    payload: ScoreRequestSchema,
    user: NormalUser | Counsellor | Admin | None = Depends(get_current_user_optional),
    service: AssessmentsService = Depends(assessment_service),
):
    """Calculate and store Beck Depression Inventory (BDI) score"""
    await service.validate_responses(AssessmentTypeEnum.BDI.value, payload)
    score = service.calculate_bdi_score(payload)

    if user:
        await service.save_score_to_db(
            user.user_id, AssessmentTypeEnum.BDI.value, score
        )

    return score


@router.post(
    "/score/hdrs",
    response_model=ScoreResponseSchema,
    status_code=status.HTTP_200_OK,
    summary="Calculate HDRS score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.",
)
async def hdrs_score(
    payload: ScoreRequestSchema,
    user: NormalUser | Counsellor | Admin | None = Depends(get_current_user_optional),
    service: AssessmentsService = Depends(assessment_service),
):
    """Calculate and store Hamilton Depression Rating Scale (HDRS) score"""
    await service.validate_responses(AssessmentTypeEnum.HDRS.value, payload)
    score = service.calculate_hdrs_score(payload)

    if user:
        await service.save_score_to_db(
            user.user_id, AssessmentTypeEnum.HDRS.value, score
        )

    return score


@router.post(
    "/score/phq9",
    response_model=ScoreResponseSchema,
    status_code=status.HTTP_200_OK,
    summary="Calculate PHQ-9 score. Scores will be saved corresponding to logged in user (Admin/Counsellor/Normal User) if logged in, otherwise scores will not be saved but can access this route.",
)
async def phq9_score(
    payload: ScoreRequestSchema,
    user: NormalUser | Counsellor | Admin | None = Depends(get_current_user_optional),
    service: AssessmentsService = Depends(assessment_service),
):
    """Calculate and store Patient Health Questionnaire-9 (PHQ-9) score"""
    await service.validate_responses(AssessmentTypeEnum.PHQ9.value, payload)
    score = service.calculate_phq9_score(payload)

    if user:
        await service.save_score_to_db(
            user.user_id, AssessmentTypeEnum.PHQ9.value, score
        )

    return score


# Comprehensive Score
@router.get(
    "/score/comprehensive",
    response_model=ComprehensiveScoreResponse,
    status_code=status.HTTP_200_OK,
    summary="Get comprehensive assessment scores. Authentication required (Admin/Counsellor/Normal User)",
)
async def get_comprehensive_scores(
    user: NormalUser | Counsellor | Admin = Depends(get_current_user),
    service: AssessmentsService = Depends(assessment_service),
):
    """
    Get comprehensive assessment results for authenticated user.

    Returns:
    - Most recent scores for BDI, PHQ-9, and HDRS assessments
    - Timestamp of last update
    - None for assessments not completed
    """
    return await service.get_user_comprehensive_scores(user.user_id)
