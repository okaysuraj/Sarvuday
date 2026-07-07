from pydantic import BaseModel, Field
from typing import List
from datetime import datetime, timezone
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
    sentiment_score: float = 0.0  # AI-driven mood analysis
    embedding: List[float] = []  # Vector representation for context
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChatHistory(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    session_id: str
    conversation: List[Message]
    context_summary: str = ""  # Long-term memory context summary
    crisis_flag: bool = False

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

class MoodTracking(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    mood: str
    energy_level: int
    anxiety_level: int
    sleep_quality: str
    notes: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class JournalEntry(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    content: str
    entry_type: str = "text"  # "text" or "voice"
    ai_sentiment_score: float = 0.0
    shared_with_therapist: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }

class CrisisLog(BaseModel):
    mongo_id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    trigger_source: str  # e.g., "chatbot", "journal", "manual"
    risk_level: str  # "high", "critical"
    action_taken: str
    resolved: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = {
        "validate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }
