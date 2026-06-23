# app/services/chatbot/chatbot_inference.py

# chatbot_inference.py
from openai import OpenAI
from typing import List, Dict
from app.config import settings
from typing import AsyncGenerator

# Initialize the OpenAI-compatible client (LM Studio)
client = OpenAI(
    base_url=settings.chatbot_base_url,
    api_key=settings.chatbot_api_key
)

async def get_chatbot_response(
    model_name: str,
    temperature: float,
    chatbot_system_prompt: str,
    user_input: str,
    history_context: List[Dict[str, str]] = [],
) -> str:
    """
    Send the user input and conversation history to the LLM and return its response.
    """
    try:
        # Convert history_context to OpenAI message format
        messages = [{"role": "system", "content": chatbot_system_prompt}]
        
        # Check if conversation history is not empty and add it to the messages
        if history_context and len(history_context) > 0:
            for entry in history_context:
                messages.append({"role": "user", "content": entry["user"]})
                messages.append({"role": "assistant", "content": entry["assistant"]})
        
        # Add the current user input
        messages.append({"role": "user", "content": user_input})

        # Call the OpenAI-compatible API
        completion = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=temperature,
        )
        
        # Extract the assistant's response
        response = completion.choices[0].message.content

        return response.strip()

    except Exception as e:
        return f"Error generating response: {str(e)}"


async def stream_chatbot_response(
    model_name: str,
    temperature: float,
    chatbot_system_prompt: str,
    user_input: str,
    history_context: List[Dict[str, str]] = [],
) -> AsyncGenerator[str, None]:
    try:
        messages = [{"role": "system", "content": chatbot_system_prompt}]

        if history_context:
            for entry in history_context:
                messages.append({"role": "user", "content": entry["user"]})
                messages.append({"role": "assistant", "content": entry["assistant"]})

        messages.append({"role": "user", "content": user_input})

        response = client.chat.completions.create(
            model=model_name,
            messages=messages,
            temperature=temperature,
            stream=True,
        )

        # Streaming the tokens one by one
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

    except Exception as e:
        yield f"\n[Error generating response: {str(e)}]"



