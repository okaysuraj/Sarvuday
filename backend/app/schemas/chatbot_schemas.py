"""Request validation and response models for chatbot."""

from datetime import datetime
from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class ChatSessionCreateRequest(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)


class ChatSessionResponse(BaseModel):
    session_id: str
    title: Optional[str]
    message_count: int
    emotions_detected: Optional[Dict[str, float]] = None
    is_crisis: bool = False
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatSessionListResponse(BaseModel):
    total_count: int
    chat_sessions: List[ChatSessionResponse]


class ChatRequest(BaseModel):
    user_input: str = Field(min_length=1, max_length=10000)


class ChatResponse(BaseModel):
    response: str


class UpdateTitleRequest(BaseModel):
    title: str = Field(min_length=1, max_length=255)


class UpdateTitleResponse(BaseModel):
    message: str
    title: str


class ConversationMessage(BaseModel):
    user: str
    assistant: str
    timestamp: datetime


class ChatHistoryResponse(BaseModel):
    user_id: str
    session_id: str
    conversation_history: List[ConversationMessage]
