from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from bson import ObjectId
from app.utils.constants import AssessmentTypeEnum

# Helper class to handle MongoDB ObjectId properly with Pydantic
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema


class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChatHistory(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    session_id: str
    conversation: List[Message]

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }


class AssessmentOption(BaseModel):
    text: str
    score: int


class AssessmentQuestion(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    id: int
    question_type: str = Field(alias="questionType")
    question: str
    options: List[AssessmentOption]

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }


class AssessmentScores(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    assessment_type: AssessmentTypeEnum
    final_score: int
    result: str
    calculated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }


class DisordersData(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    disorder_id: int
    disorder_title: str
    disorder_description: str
    symptoms: List[str]
    preventions: List[str]
    treatments: List[str]
    best_advice: str

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }
