"""OpenAI responses using the conversation history owned by PostgreSQL."""

import logging
from collections.abc import AsyncIterator

from fastapi import HTTPException
from openai import AsyncOpenAI, OpenAIError

from app.config import settings

logger = logging.getLogger(__name__)
UNAVAILABLE_MESSAGE = "The assistant is temporarily unavailable. Please try again."
_client: AsyncOpenAI | None = None


def get_openai_client() -> AsyncOpenAI:
    """Create one connection pool per worker, only when chat is configured."""
    global _client
    key = settings.openai_api_key.get_secret_value().strip()
    if not key:
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)
    if _client is None:
        _client = AsyncOpenAI(
            api_key=key,
            base_url="https://api.openai.com/v1",
            timeout=60.0,
            max_retries=1,
        )
    return _client


async def close_openai_client() -> None:
    global _client
    if _client is not None:
        await _client.close()
        _client = None


def response_arguments(user_input: str, history: list[dict[str, str]] | None) -> dict:
    messages = []
    for entry in history or []:
        messages.extend(
            [
                {"role": "user", "content": entry["user"]},
                {"role": "assistant", "content": entry["assistant"]},
            ]
        )
    messages.append({"role": "user", "content": user_input})
    return {
        "model": settings.openai_model,
        "instructions": settings.chatbot_system_prompt,
        "input": messages,
        "max_output_tokens": settings.openai_max_output_tokens,
        # SQL owns chat history; do not create a second response history store.
        "store": False,
    }


async def get_chatbot_response(
    user_input: str,
    history_context: list[dict[str, str]] | None = None,
) -> str:
    try:
        response = await get_openai_client().responses.create(
            **response_arguments(user_input, history_context)
        )
    except OpenAIError as exc:
        # Provider error bodies can contain user content. Log only the error type.
        logger.warning("OpenAI request failed (%s)", type(exc).__name__)
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE) from None
    text = response.output_text.strip()
    if response.status != "completed" or not text:
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)
    return text


async def stream_chatbot_response(
    user_input: str,
    history_context: list[dict[str, str]] | None = None,
) -> AsyncIterator[str]:
    completed = False
    has_text = False
    try:
        stream = await get_openai_client().responses.create(
            **response_arguments(user_input, history_context), stream=True
        )
        async with stream:
            async for event in stream:
                if event.type == "response.output_text.delta":
                    has_text = has_text or bool(event.delta.strip())
                    yield event.delta
                elif event.type == "response.completed":
                    completed = True
                elif event.type in {"response.failed", "response.incomplete", "error"}:
                    raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)
    except OpenAIError as exc:
        logger.warning("OpenAI stream failed (%s)", type(exc).__name__)
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE) from None
    # A disconnected or truncated stream must never become a saved chat turn.
    if not completed or not has_text:
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)
