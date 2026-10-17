"""Build model messages once for complete and streamed assistant replies."""

import logging
from collections.abc import AsyncIterator

from fastapi import HTTPException
from openai import AsyncOpenAI

from app.config import settings

logger = logging.getLogger(__name__)
client = AsyncOpenAI(
    base_url=settings.chatbot_base_url, api_key=settings.chatbot_api_key
)
UNAVAILABLE_MESSAGE = "The assistant is temporarily unavailable. Please try again."


def build_messages(
    system_prompt: str, user_input: str, history: list[dict[str, str]] | None
):
    messages = [{"role": "system", "content": system_prompt}]
    for entry in history or []:
        messages.extend(
            [
                {"role": "user", "content": entry["user"]},
                {"role": "assistant", "content": entry["assistant"]},
            ]
        )
    messages.append({"role": "user", "content": user_input})
    return messages


async def get_chatbot_response(
    model_name: str,
    temperature: float,
    chatbot_system_prompt: str,
    user_input: str,
    history_context: list[dict[str, str]] | None = None,
) -> str:
    try:
        completion = await client.chat.completions.create(
            model=model_name,
            messages=build_messages(chatbot_system_prompt, user_input, history_context),
            temperature=temperature,
        )
        return (completion.choices[0].message.content or "").strip()
    except Exception:
        logger.exception("Assistant completion failed")
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)


async def stream_chatbot_response(
    model_name: str,
    temperature: float,
    chatbot_system_prompt: str,
    user_input: str,
    history_context: list[dict[str, str]] | None = None,
) -> AsyncIterator[str]:
    try:
        stream = await client.chat.completions.create(
            model=model_name,
            messages=build_messages(chatbot_system_prompt, user_input, history_context),
            temperature=temperature,
            stream=True,
        )
        async for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
    except Exception:
        logger.exception("Assistant stream failed")
        raise HTTPException(status_code=503, detail=UNAVAILABLE_MESSAGE)
