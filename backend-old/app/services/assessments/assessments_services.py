# app/services/assessments/assessments_services.py

from fastapi import HTTPException, status
from datetime import datetime, timezone
from app.database import assessments_collection, users_scores_collection
from app.schemas import AssessmentSchema, ScoreResponseSchema, ScoreRequestSchema, ComprehensiveScoreResponse
from app.utils.constants import (
    MAX_BDI_SCORE,
    MAX_HDRS_SCORE,
    MAX_PHQ9_SCORE
)

class AssessmentsService:
    def fetch_assessment_data(self, question_type: str) -> AssessmentSchema:
        questions_cursor = assessments_collection.find(
            {"questionType": question_type}
        ).sort("id", 1)

        questions = list(questions_cursor)
        total_count = len(questions)

        if not questions:
            raise HTTPException(
                status_code=404,
                detail=f"{question_type} questions not found."
            )

        for question in questions:
            question.pop("_id", None)

        return AssessmentSchema(
            total_count=total_count,
            questions=questions
        )

    def save_score_to_db(self, user_id: str, assessment_type: str, score: ScoreResponseSchema) -> None:
        """Save user score to database"""
        try:
            users_scores_collection.insert_one({
                "user_id": user_id,
                "assessment_type": assessment_type,
                "score": score.final_score,
                "result": score.result,
                "calculated_at": datetime.now(timezone.utc)
            })
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save score: {str(e)}"
            )

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
            final_score=total_score,
            max_score=MAX_BDI_SCORE,
            result=result
        )

    def calculate_hdrs_score(self, responses: ScoreRequestSchema) -> ScoreResponseSchema:
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
            final_score=total_score,
            max_score=MAX_HDRS_SCORE,
            result=result
        )

    def calculate_phq9_score(self, responses: ScoreRequestSchema) -> ScoreResponseSchema:
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
            final_score=total_score,
            max_score=MAX_PHQ9_SCORE,
            result=result
        )

    def get_user_comprehensive_scores(self, user_id: str) -> ComprehensiveScoreResponse:
        """Fetch scores from database and convert string keys back to integers"""
        pipeline = [
            {"$match": {"user_id": user_id}},
            {"$sort": {"calculated_at": -1}},
            {"$group": {
                "_id": "$assessment_type",
                "latest_score": {"$first": "$$ROOT"}
            }}
        ]
        
        results = {}
        latest_timestamp = None
        
        for doc in users_scores_collection.aggregate(pipeline):
            assessment_type = doc["_id"]
            score_data = doc["latest_score"]
            
            
            results[assessment_type.lower()] = ScoreResponseSchema(
                final_score=score_data["score"],
                max_score=self._get_max_score(assessment_type),
                result=score_data["result"]
            )
            
            score_time = score_data["calculated_at"]
            if not latest_timestamp or score_time > latest_timestamp:
                latest_timestamp = score_time
        
        return ComprehensiveScoreResponse(
            bdi=results.get("bdi"),
            phq9=results.get("phq9"),
            hdrs=results.get("hdrs"),
            last_updated=latest_timestamp.isoformat() if latest_timestamp else None
        )
    
    def _get_max_score(self, assessment_type: str) -> int:
        return {
            "BDI": MAX_BDI_SCORE,
            "PHQ9": MAX_PHQ9_SCORE,
            "HDRS": MAX_HDRS_SCORE
        }.get(assessment_type, 0)