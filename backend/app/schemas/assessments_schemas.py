# app/schemas/assessments_schemas.py

from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class OptionSchema(BaseModel):
    text: str
    score: int

class QuestionSchema(BaseModel):
    id: int
    question_type: str = Field(..., alias="questionType")
    question: str
    options: List[OptionSchema]

    class Config:
        validate_by_name = True

class AssessmentSchema(BaseModel):
    total_count: int
    questions: List[QuestionSchema]

class QuestionResponseSchema(BaseModel):
    question_id: int
    selected_option_score: int

class ScoreRequestSchema(BaseModel):
    responses: List[QuestionResponseSchema]

    @field_validator('responses')
    def check_duplicate_questions(cls, v):
        question_ids = [r.question_id for r in v]
        if len(question_ids) != len(set(question_ids)):
            raise ValueError("Duplicate question IDs in responses")
        return v

class ScoreResponseSchema(BaseModel):
    final_score: int
    max_score: int
    result: str

class ComprehensiveScoreResponse(BaseModel):
    bdi: Optional[ScoreResponseSchema] = None
    phq9: Optional[ScoreResponseSchema] = None
    hdrs: Optional[ScoreResponseSchema] = None
    last_updated: Optional[str] = None


