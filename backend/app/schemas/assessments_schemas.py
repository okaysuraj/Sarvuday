"""Request validation and response models for assessments."""

from typing import List, Optional

from pydantic import BaseModel, Field, field_validator


class OptionSchema(BaseModel):
    text: str
    score: int


class QuestionSchema(BaseModel):
    id: int
    question_type: str = Field(..., alias="questionType")
    question: str
    options: List[OptionSchema]

    model_config = {"validate_by_name": True}


class AssessmentSchema(BaseModel):
    total_count: int
    questions: List[QuestionSchema]


class QuestionResponseSchema(BaseModel):
    question_id: int
    selected_option_score: int = Field(ge=0, le=4)


class ScoreRequestSchema(BaseModel):
    responses: List[QuestionResponseSchema] = Field(min_length=1, max_length=100)

    @field_validator("responses")
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
