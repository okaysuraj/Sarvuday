# app/routes/general/ai_chat.py
# 
# Proxy routes that map the frontend's /ai/* endpoints to the existing
# chatbot service which lives at /user/chatbot/*.
# The frontend's AIChat.jsx calls these endpoints directly.

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional, List

from app.database import get_db
from app.models import NormalUser, Counsellor
from app.utils.oauth import ensure_normal_user
from app.services.chatbot.chatbot_service import ChatBotService
from app.config import settings

router = APIRouter()


# ---------- Request/Response models for the AI endpoints ----------

class AIChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class AIChatResponse(BaseModel):
    reply: str
    is_crisis: bool = False
    session_id: str


class AIMatchedCounsellor(BaseModel):
    name: str
    specialization: str
    match_score: str


class AIMatchResponse(BaseModel):
    matches: List[AIMatchedCounsellor]


# ---------- Routes ----------

@router.get(
    "/sessions",
    status_code=status.HTTP_200_OK,
    summary="List all AI chat sessions for the current user",
)
async def list_ai_sessions(
    limit: int = Query(20, ge=1, le=50),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns a list of session objects for the sidebar."""
    service = ChatBotService(db)
    result = await service.list_sessions(current_user.user_id, limit)
    # The frontend expects a flat list of session objects
    return result.chat_sessions if hasattr(result, "chat_sessions") else result


@router.get(
    "/chat/{session_id}",
    status_code=status.HTTP_200_OK,
    summary="Get chat history for a specific AI session",
)
async def get_ai_chat_history(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns the conversation messages for a session."""
    service = ChatBotService(db)
    result = await service.get_chat_history(current_user.user_id, session_id)
    # Frontend expects a flat list of {role, content} messages
    flat_messages = []
    
    history = result.conversation_history if hasattr(result, "conversation_history") else []
    for turn in history:
        # turn is a ConversationMessage object, or dict if fallback
        user_msg = getattr(turn, "user", None) or (turn.get("user") if isinstance(turn, dict) else None)
        asst_msg = getattr(turn, "assistant", None) or (turn.get("assistant") if isinstance(turn, dict) else None)
        
        if user_msg:
            flat_messages.append({"role": "user", "content": user_msg})
        if asst_msg:
            flat_messages.append({"role": "assistant", "content": asst_msg})
            
    return flat_messages


@router.post(
    "/chat",
    response_model=AIChatResponse,
    status_code=status.HTTP_200_OK,
    summary="Send a message to the AI chatbot",
)
async def ai_chat(
    payload: AIChatRequest,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Send a message and get an AI response.
    If session_id is not provided, a new session is created.
    """
    service = ChatBotService(db)

    # Create session if needed
    session_id = payload.session_id
    if not session_id:
        new_session = await service.create_session(current_user.user_id, None)
        session_id = new_session.session_id if hasattr(new_session, "session_id") else new_session["session_id"]

    # Run inference
    chatbot_model = settings.chatbot_model
    chatbot_temperature = settings.chatbot_temperature

    try:
        result = await service.chat_inference(
            user_id=current_user.user_id,
            session_id=session_id,
            chatbot_model=chatbot_model,
            temperature=chatbot_temperature,
            user_input=payload.message,
        )

        reply = result.response if hasattr(result, "response") else str(result)
        is_crisis = result.is_crisis if hasattr(result, "is_crisis") else False

        return AIChatResponse(
            reply=reply,
            is_crisis=is_crisis,
            session_id=session_id,
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        # Fallback if chatbot service is unavailable
        return AIChatResponse(
            reply="I'm sorry, the AI service is currently unavailable. Please try again later.",
            is_crisis=False,
            session_id=session_id,
        )


@router.delete(
    "/sessions/{session_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an AI chat session",
)
async def delete_ai_session(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    service = ChatBotService(db)
    return await service.delete_session(current_user.user_id, session_id)


@router.get(
    "/match-counsellor",
    response_model=AIMatchResponse,
    status_code=status.HTTP_200_OK,
    summary="Match user with counsellors based on detected emotions",
)
async def match_counsellor(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Match user to counsellors based on the user's primary concerns
    and chat session emotion data. Uses specialization-based matching.
    """
    # Fetch approved counsellors
    result = await db.execute(
        select(Counsellor).where(Counsellor.is_approved == True).limit(5)
    )
    counsellors = result.scalars().all()

    matches = []
    for c in counsellors:
        specialization = c.specializations or "General Counselling"
        # Calculate a simple relevance score based on user concerns
        user_concerns = (current_user.primary_concerns or "").lower()
        spec_lower = specialization.lower()

        # Simple word overlap scoring
        concern_words = set(user_concerns.split(",")) if user_concerns else set()
        spec_words = set(spec_lower.split(","))
        overlap = len(concern_words & spec_words) if concern_words and spec_words else 0

        if overlap > 0:
            score = "High"
        elif c.average_rating and float(c.average_rating) >= 4.0:
            score = "Good"
        else:
            score = "Fair"

        matches.append(AIMatchedCounsellor(
            name=c.name,
            specialization=specialization,
            match_score=score,
        ))

    # Sort by match score priority
    priority = {"High": 0, "Good": 1, "Fair": 2}
    matches.sort(key=lambda m: priority.get(m.match_score, 3))

    return AIMatchResponse(matches=matches[:5])
