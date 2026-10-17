"""Assessments services business logic and persistence."""

from datetime import datetime, timezone

from fastapi import HTTPException

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.assessment import AssessmentQuestion, AssessmentResult
from app.schemas.assessments_schemas import (
    AssessmentSchema,
    ComprehensiveScoreResponse,
    ScoreRequestSchema,
    ScoreResponseSchema,
)
from app.utils.constants import MAX_BDI_SCORE, MAX_HDRS_SCORE, MAX_PHQ9_SCORE


class AssessmentsService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def validate_responses(
        self, question_type: str, responses: ScoreRequestSchema
    ):
        """Only score complete answers that match the published question options."""
        assessment = await self.fetch_assessment_data(question_type)
        options = {
            question.id: {option.score for option in question.options}
            for question in assessment.questions
        }
        if {answer.question_id for answer in responses.responses} != set(options):
            raise HTTPException(
                status_code=422, detail="Answer every question in this assessment."
            )
        if any(
            answer.selected_option_score not in options[answer.question_id]
            for answer in responses.responses
        ):
            raise HTTPException(
                status_code=422, detail="Select one of the published answer options."
            )

    async def fetch_assessment_data(self, question_type: str) -> AssessmentSchema:
        records = list(
            await self.db.scalars(
                select(AssessmentQuestion)
                .where(AssessmentQuestion.question_type == question_type)
                .order_by(AssessmentQuestion.question_id)
            )
        )
        if not records:
            raise HTTPException(
                status_code=404, detail=f"{question_type} questions not found."
            )
        questions = [
            {
                "id": row.question_id,
                "questionType": row.question_type,
                "question": row.question,
                "options": row.options,
            }
            for row in records
        ]
        return AssessmentSchema(total_count=len(questions), questions=questions)

    async def save_score_to_db(
        self, user_id: str, assessment_type: str, score: ScoreResponseSchema
    ) -> None:
        self.db.add(
            AssessmentResult(
                user_id=user_id,
                assessment_type=assessment_type,
                score=score.final_score,
                result=score.result,
                calculated_at=datetime.now(timezone.utc),
            )
        )
        await self.db.commit()

    def calculate_bdi_score(self, responses: ScoreRequestSchema) -> ScoreResponseSchema:
        total_score = sum(r.selected_option_score for r in responses.responses)

        if total_score <= 10:
            result = "normal"
        elif total_score <= 16:
            result = "mild depression"
        elif total_score <= 20:
            result = "borderline depression"
        elif total_score <= 30:
            result = "moderate depression"
        elif total_score <= 40:
            result = "severe depression"
        else:
            result = "extreme depression"

        return ScoreResponseSchema(
            final_score=total_score, max_score=MAX_BDI_SCORE, result=result
        )

    def calculate_hdrs_score(
        self, responses: ScoreRequestSchema
    ) -> ScoreResponseSchema:
        total_score = sum(r.selected_option_score for r in responses.responses)

        if total_score <= 7:
            result = "normal"
        elif total_score <= 12:
            result = "mild depression"
        elif total_score <= 19:
            result = "moderate depression"
        else:
            result = "severe depression"

        return ScoreResponseSchema(
            final_score=total_score, max_score=MAX_HDRS_SCORE, result=result
        )

    def calculate_phq9_score(
        self, responses: ScoreRequestSchema
    ) -> ScoreResponseSchema:
        total_score = sum(r.selected_option_score for r in responses.responses)

        if total_score <= 4:
            result = "minimal depression"
        elif total_score <= 9:
            result = "mild depression"
        elif total_score <= 14:
            result = "moderate depression"
        elif total_score <= 19:
            result = "moderately severe depression"
        else:
            result = "severe depression"

        return ScoreResponseSchema(
            final_score=total_score, max_score=MAX_PHQ9_SCORE, result=result
        )

    async def get_user_comprehensive_scores(
        self, user_id: str
    ) -> ComprehensiveScoreResponse:
        """Return the latest result for each assessment taken by this user."""
        # DISTINCT ON uses the ownership/type/time index to select one latest row per type.
        records = await self.db.scalars(
            select(AssessmentResult)
            .where(AssessmentResult.user_id == user_id)
            .distinct(AssessmentResult.assessment_type)
            .order_by(
                AssessmentResult.assessment_type,
                AssessmentResult.calculated_at.desc(),
                AssessmentResult.id.desc(),
            )
        )
        results = {}
        latest_timestamp = None
        for row in records:
            results[row.assessment_type.lower()] = ScoreResponseSchema(
                final_score=row.score,
                max_score=self._get_max_score(row.assessment_type),
                result=row.result,
            )
            if latest_timestamp is None or row.calculated_at > latest_timestamp:
                latest_timestamp = row.calculated_at

        return ComprehensiveScoreResponse(
            bdi=results.get("bdi"),
            phq9=results.get("phq9"),
            hdrs=results.get("hdrs"),
            last_updated=latest_timestamp.isoformat() if latest_timestamp else None,
        )

    def _get_max_score(self, assessment_type: str) -> int:
        return {
            "BDI": MAX_BDI_SCORE,
            "PHQ9": MAX_PHQ9_SCORE,
            "HDRS": MAX_HDRS_SCORE,
        }.get(assessment_type, 0)
