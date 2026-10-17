"""Chatbot service business logic and persistence."""

from datetime import datetime, timezone
from typing import Dict, List, Optional

from fastapi import HTTPException
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import ChatSession
from app.models.sessions.chat_turn import ChatTurn
from app.schemas.chatbot_schemas import (
    ChatHistoryResponse,
    ChatResponse,
    ChatSessionListResponse,
    ChatSessionResponse,
    UpdateTitleResponse,
)
from app.services.chatbot.chatbot_context import build_context_within_token_limit
from app.services.chatbot.chatbot_inference import (
    get_chatbot_response,
    stream_chatbot_response,
)
from app.utils.unique_id_generation import generate_chat_session_id


class ChatBotService:
    def __init__(self, db: AsyncSession):
        self.db = db

    # --- Chat Session Management ---

    async def list_sessions(self, user_id: str, limit: int) -> ChatSessionListResponse:
        result = await self.db.execute(
            select(ChatSession)
            .where(ChatSession.user_id == user_id, ChatSession.is_deleted.is_(False))
            .order_by(ChatSession.created_at.desc())
            .limit(limit)
        )
        sessions = result.scalars().all()
        return ChatSessionListResponse(
            total_count=len(sessions),
            chat_sessions=[
                ChatSessionResponse.model_validate(session) for session in sessions
            ],
        )

    async def create_session(
        self, user_id: str, title: Optional[str]
    ) -> ChatSessionResponse:
        session_id = generate_chat_session_id()

        chat_session = ChatSession(
            session_id=session_id,
            user_id=user_id,
            title=title or session_id,
            created_at=datetime.now(timezone.utc),
            updated_at=datetime.now(timezone.utc),
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
        await self.db.execute(
            update(ChatSession)
            .where(ChatSession.user_id == user_id)
            .values(is_deleted=True)
        )
        await self.db.commit()

    async def update_title(
        self, user_id: str, session_id: str, title: str
    ) -> UpdateTitleResponse:
        session = await self._validate_user_session(session_id, user_id)

        session.title = title
        await self.db.commit()
        await self.db.refresh(session)
        return UpdateTitleResponse(
            message="Title updated successfully", title=session.title
        )

    # --- Chat Handling ---

    async def get_session(self, user_id: str, session_id: str) -> ChatSessionResponse:
        session = await self._validate_user_session(session_id, user_id)
        return ChatSessionResponse.model_validate(session)

    async def get_chat_history(
        self, user_id: str, session_id: str
    ) -> ChatHistoryResponse:
        await self._validate_user_session(session_id, user_id)
        conversation_history = await self._get_chat_history_conversations(
            user_id, session_id
        )

        return ChatHistoryResponse(
            user_id=user_id,
            session_id=session_id,
            conversation_history=conversation_history,
        )

    async def chat_inference(
        self,
        user_id: str,
        session_id: str,
        user_input: str,
    ) -> ChatResponse:
        await self._validate_user_session(session_id, user_id)
        # Read the validated session history before calling the provider.
        conversation_history = await self._get_chat_history_conversations(
            user_id, session_id
        )

        history_context = self._build_context(user_input, conversation_history)
        await self.db.rollback()  # Release the read connection during inference.

        response = await get_chatbot_response(
            user_input=user_input,
            history_context=history_context,
        )

        # Save the new interaction
        if response:
            await self._save_conversation(
                user_id=user_id,
                session_id=session_id,
                user_input=user_input,
                assistant_response=response,
            )

            return ChatResponse.model_validate({"response": response})
        else:
            raise HTTPException(status_code=500, detail="Failed to generate response.")

    async def stream_chat_inference(
        self,
        user_id: str,
        session_id: str,
        user_input: str,
    ):
        await self._validate_user_session(session_id, user_id)
        # Fetch conversation history
        conversation_history = await self._get_chat_history_conversations(
            user_id, session_id
        )

        history_context = self._build_context(user_input, conversation_history)
        await self.db.rollback()  # Release the read connection during inference.

        chunks = []
        async for chunk in stream_chatbot_response(
            user_input=user_input,
            history_context=history_context,
        ):
            chunks.append(chunk)
            yield chunk
        # Cancellation or provider failure skips this block: partial replies are not saved.
        if chunks:
            await self._save_conversation(
                user_id, session_id, user_input, "".join(chunks)
            )

    @staticmethod
    def _build_context(user_input, history):
        try:
            return build_context_within_token_limit(user_input, history)
        except ValueError as exc:
            raise HTTPException(
                status_code=422, detail="This message exceeds the conversation limit."
            ) from exc

    async def _get_chat_history_conversations(
        self, user_id: str, session_id: str
    ) -> List[Dict]:
        rows = await self.db.scalars(
            select(ChatTurn)
            .join(ChatSession, ChatSession.session_id == ChatTurn.session_id)
            .where(
                ChatSession.user_id == user_id,
                ChatSession.is_deleted.is_(False),
                ChatTurn.session_id == session_id,
            )
            .order_by(ChatTurn.position)
        )
        return [
            {
                "user": row.user_input,
                "assistant": row.assistant_response,
                "timestamp": row.timestamp,
            }
            for row in rows
        ]

    async def _save_conversation(
        self, user_id: str, session_id: str, user_input: str, assistant_response: str
    ) -> None:
        # Lock only while saving, never during inference. Concurrent replies get
        # distinct positions and the message count commits with the actual turn.
        session = await self.db.scalar(
            select(ChatSession)
            .where(
                ChatSession.session_id == session_id,
                ChatSession.user_id == user_id,
                ChatSession.is_deleted.is_(False),
            )
            .with_for_update()
            .execution_options(populate_existing=True)
        )
        if session is None:
            raise HTTPException(
                status_code=403, detail="Invalid or unauthorized session."
            )
        position = await self.db.scalar(
            select(func.coalesce(func.max(ChatTurn.position), -1) + 1).where(
                ChatTurn.session_id == session_id
            )
        )
        self.db.add(
            ChatTurn(
                session_id=session_id,
                position=position,
                user_input=user_input,
                assistant_response=assistant_response,
                timestamp=datetime.now(timezone.utc),
            )
        )
        session.message_count = position + 1
        await self.db.commit()

    # --- Validation ---
    async def _validate_user_session(
        self, session_id: str, user_id: str
    ) -> ChatSession:
        result = await self.db.execute(
            select(ChatSession).where(
                ChatSession.session_id == session_id, ChatSession.user_id == user_id
            )
        )
        session = result.scalar_one_or_none()
        if not session or session.is_deleted:
            raise HTTPException(
                status_code=403, detail="Invalid or unauthorized session."
            )
        return session
