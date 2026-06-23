# app/routes/normal_user/chatbot_sessions.py

from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import Optional
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.schemas import (
    ChatSessionResponse,
    ChatSessionCreateRequest,
    ChatHistoryResponse,
    UpdateTitleRequest,
    ChatRequest,
    ChatResponse,
    UpdateTitleResponse,
    ChatSessionListResponse,
)
from app.config import settings
from app.services.chatbot.chatbot_service import ChatBotService

router = APIRouter(prefix="/chatbot", tags=["Chatbot Sessions"])

@router.get("", response_model=ChatSessionListResponse, status_code=status.HTTP_200_OK, summary="List all chat sessions. Normal User Authentication required")
async def list_sessions(
    limit: int = Query(10, ge=1, le=20),
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).list_sessions(current_user.user_id, limit)

@router.post("", response_model=ChatSessionResponse, status_code=status.HTTP_201_CREATED, summary="Start new chat session. Normal User Authentication required")
async def create_session(
    chat_session_title: Optional[ChatSessionCreateRequest] = None,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    title = chat_session_title.title if chat_session_title and chat_session_title.title else None
    return await ChatBotService(db).create_session(current_user.user_id, title)


@router.delete("/{session_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a chat session using ID. Normal User Authentication required")
async def delete_session(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).delete_session(current_user.user_id, session_id)

@router.delete("", status_code=status.HTTP_204_NO_CONTENT, summary="Delete all chat sessions")
async def delete_all_sessions(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).delete_all_sessions(current_user.user_id)

@router.patch("/title/{session_id}", response_model=UpdateTitleResponse, status_code=status.HTTP_200_OK, summary="Update chat session title. Normal User Authentication required")
async def update_title(
    session_id: str,
    title_data: UpdateTitleRequest,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).update_title(current_user.user_id, session_id, title_data.title)


# Chat Inference
@router.post("/inference/{session_id}", response_model=ChatResponse, status_code=status.HTTP_200_OK, summary="Get Chatbot Inference. Normal User Authentication required")
async def chat_inference(
    session_id: str,
    input_data: ChatRequest,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    chatbot_model = settings.chatbot_model
    chatbot_temperature = settings.chatbot_temperature
    user_input = input_data.user_input
    
    return await ChatBotService(db).chat_inference(current_user.user_id, session_id, chatbot_model, chatbot_temperature, user_input)

# Stream response
@router.post("/inference/stream/{session_id}")
async def stream_chat_endpoint(
    session_id: str,
    input_data: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: NormalUser = Depends(ensure_normal_user)
):
    chatbot_model = settings.chatbot_model
    chatbot_temperature = settings.chatbot_temperature
    user_input = input_data.user_input

    # Return the StreamingResponse from the service
    generator = ChatBotService(db).stream_chat_inference(
        user_id=current_user.user_id,
        session_id=session_id,
        chatbot_model=chatbot_model,
        temperature=chatbot_temperature,
        user_input=user_input
    )

    return StreamingResponse(generator, media_type="text/plain")


# Chat History
@router.get("/history/{session_id}", response_model=ChatHistoryResponse, status_code=status.HTTP_200_OK, summary="Get chat history of a session by session ID. Normal User Authentication required")
async def get_session_history(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).get_chat_history(current_user.user_id, session_id)


@router.get("/{session_id}", response_model=ChatSessionResponse, status_code=status.HTTP_200_OK, summary="Get session details by session ID. Normal User Authentication required")
async def get_session(
    session_id: str,
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    return await ChatBotService(db).get_session(current_user.user_id, session_id)


