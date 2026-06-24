# app/services/chatbot/chatbot_service.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import chatbot_collection
from fastapi import HTTPException
from app.utils.unique_id_generation import generate_chat_session_id
from app.config import settings
from app.models import ChatSession, NormalUser
from app.schemas import (
    ChatSessionResponse,
    ChatHistoryResponse,
    ChatResponse,
    UpdateTitleResponse,
    ChatSessionListResponse
)
from typing import List, Dict, Optional
from datetime import datetime, timezone
from app.services.chatbot.chatbot_inference import get_chatbot_response, stream_chatbot_response
from app.services.chatbot.chatbot_context import build_context_within_token_limit

class ChatBotService:
    def __init__(self, db: AsyncSession):
        self.db = db
        
    # --- Chat Session Management ---

    async def list_sessions(self, user_id: str, limit: int) -> ChatSessionListResponse:
        result = await self.db.execute(
            select(ChatSession)
            .where(ChatSession.user_id == user_id, ChatSession.is_deleted == False)
            .order_by(ChatSession.created_at.desc())
            .limit(limit)
        )
        sessions = result.scalars().all()
        return ChatSessionListResponse(
            total_count=len(sessions),
            chat_sessions=[ChatSessionResponse.model_validate(session) for session in sessions]
        )

    async def create_session(self, user_id: str, title: Optional[str]) -> ChatSessionResponse:
        session_id = generate_chat_session_id()

        chat_session = ChatSession(
            session_id=session_id,
            user_id=user_id,
            title=title or session_id,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc)
        )
        
        self.db.add(chat_session)
        await self.db.commit()
        await self.db.refresh(chat_session)

        return ChatSessionResponse.model_validate(chat_session)

    async def delete_session(self, user_id: str, session_id: str):
        session = await self._validate_user_session(session_id, user_id)
        session.is_deleted = True
        await self.db.commit()
        return None
    
    async def delete_all_sessions(self, user_id: str):
        result = await self.db.execute(
            select(ChatSession).where(ChatSession.user_id == user_id)
        )
        sessions = result.scalars().all()
        for s in sessions:
            s.is_deleted = True
        await self.db.commit()
        return None


    async def update_title(self, user_id: str, session_id: str, title: str)->UpdateTitleResponse:
        session = await self._validate_user_session(session_id, user_id)

        if session.is_deleted:
            raise HTTPException(status_code=404, detail="Session has been deleted.")
        
        session.title = title
        await self.db.commit()
        await self.db.refresh(session)
        return UpdateTitleResponse(
            message="Title updated successfully",
            title=session.title
        )
    
    
    # --- Chat Handling ---
    
    async def get_session(self, user_id: str, session_id: str) -> ChatSessionResponse:
        session = await self._validate_user_session(session_id, user_id)
        return ChatSessionResponse.model_validate(session)
    
    async def get_chat_history(self, user_id: str, session_id: str)->ChatHistoryResponse:
        session = await self._validate_user_session(session_id, user_id)
        if session.is_deleted:
            raise HTTPException(status_code=404, detail="Session has been deleted.")
        
        conversation_history = await self._get_chat_history_conversations(session_id)
        
        return ChatHistoryResponse(
            user_id=user_id,
            session_id=session_id,
            conversation_history=conversation_history
        )
    

    async def chat_inference(self, user_id: str, session_id: str, chatbot_model: str, temperature: float, user_input: str) -> ChatResponse:
        session = await self._validate_user_session(session_id, user_id)
        if session.is_deleted:
            raise HTTPException(status_code=404, detail="Session has been deleted.")

        # Fetch conversation history from the database or initialize an empty list
        conversation_history = await self._get_chat_history_conversations(session_id)
        
        if conversation_history and len(conversation_history) > 0:
            # Build context within token limit
            history_context = build_context_within_token_limit(user_input, conversation_history)
        else:
            history_context = []

        response = await get_chatbot_response(
            model_name=chatbot_model,
            temperature=temperature,
            chatbot_system_prompt=settings.chatbot_system_prompt,
            user_input=user_input,
            history_context=history_context
        )

        # # Save only after successful generation
        # Save the new interaction
        if response:
            await self._save_conversation(user_id=user_id, session_id=session_id, user_input=user_input, assistant_response=response)

            return ChatResponse.model_validate(
                {"response": response}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to generate response.")
        
    async def stream_chat_inference(
        self,
        user_id: str,
        session_id: str,
        chatbot_model: str,
        temperature: float,
        user_input: str
    ):
        session = await self._validate_user_session(session_id, user_id)
        if session.is_deleted:
            raise HTTPException(status_code=404, detail="Session has been deleted.")

        # Fetch conversation history
        conversation_history = await self._get_chat_history_conversations(session_id)
        
        if conversation_history:
            history_context = build_context_within_token_limit(user_input, conversation_history)
        else:
            history_context = []

        # Call the streaming generator from inference module
        async for chunk in stream_chatbot_response(
            model_name=chatbot_model,
            temperature=temperature,
            chatbot_system_prompt=settings.chatbot_system_prompt,
            user_input=user_input,
            history_context=history_context
        ):
            yield chunk  # Yield each streamed piece
        
        
        
    
    # ----- Helper Functions ------
    # --- MongoDB Helpers ---
    
    async def _get_chat_history_conversations(self, session_id: str) -> List[Dict[str, str]]:
        """
        Fetch the conversation history from the database using the session ID.
        If the session does not exist, return an empty list.
        """
        session = chatbot_collection.find_one({"session_id": session_id})
        return session.get("conversation", []) if session else []


    async def _save_conversation(self, user_id: str, session_id: str, user_input: str, assistant_response: str) -> None:
        # Step 1: Save to MongoDB
        # Create the conversation object
        conversation_object = {
            "user": user_input,
            "assistant": assistant_response,
            "timestamp": datetime.now(timezone.utc)
        }

        # Update the session in MongoDB
        chatbot_collection.update_one(
            {"user_id": user_id, "session_id": session_id},
            {
                "$push": {"conversation": conversation_object},  # Append the new conversation object
                "$setOnInsert": {"created_at": datetime.now(timezone.utc)}  # Set created_at only if the session is new
            },
            upsert=True  # Create a new document if the session ID does not exist
        )
        
        # Step 2: Update MySQL ChatSession table
        result = await self.db.execute(
            select(ChatSession)
            .where(ChatSession.session_id == session_id, ChatSession.user_id == user_id)
        )
        chat_session = result.scalar_one_or_none()

        if chat_session:
            chat_session.message_count += 1
            
            # TODO: update emotions_detected and is_crisis
            
            await self.db.commit()
            await self.db.refresh(chat_session)


    async def _fetch_chat_history(self, session_id: str, current_user: NormalUser, db: AsyncSession) -> ChatHistoryResponse:
        """
        Fetch the chat history from the database using the session ID.
        Return the response as a list of conversations in the same format as saved in the database.
        """
        # Validate the session
        session = await self._validate_user_session(session_id, current_user, db)
        if session.is_deleted:
            raise HTTPException(status_code=404, detail="Session has been deleted.")

        # Fetch conversation history from the database
        conversation_history = await self._get_chat_history_conversations(session_id)

        # Return the chat history response
        return ChatHistoryResponse(
            session_id=session_id,
            conversation_history=conversation_history  # Return the raw conversation history as it is
        )
    
    # --- Validation ---
    async def _validate_user_session(self, session_id: str, user_id: str) -> ChatSession:
        result = await self.db.execute(
            select(ChatSession).where(
                ChatSession.session_id == session_id,
                ChatSession.user_id == user_id
            )
        )
        session = result.scalar_one_or_none()
        if not session or session.is_deleted:
            raise HTTPException(status_code=403, detail="Invalid or unauthorized session.")
        return session