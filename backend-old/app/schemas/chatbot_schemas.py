# app/schemas/chatbot_schemas.py

from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

class ChatSessionCreateRequest(BaseModel):
    title: Optional[str] = None

class ChatSessionResponse(BaseModel):
    session_id: str
    title: Optional[str]
    message_count: int
    emotions_detected: Optional[Dict[str, float]] = None
    is_crisis: bool = False
    created_at: datetime

    class Config:
        from_attributes = True

class ChatSessionListResponse(BaseModel):
    total_count: int
    chat_sessions: List[ChatSessionResponse]

class ChatRequest(BaseModel):
    user_input: str

class ChatResponse(BaseModel):
    response: str

class UpdateTitleRequest(BaseModel):
    title: str

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


