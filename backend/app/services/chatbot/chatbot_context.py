# app/services/chatbot/chatbot_context.py

from typing import List, Dict
from transformers import AutoTokenizer
from app.config import settings

chatbot_tokenizer = settings.bert_tokenizer_path
max_total_tokens = settings.max_total_tokens
chatbot_system_prompt = settings.chatbot_system_prompt

# Initialize tokenizer once at module level
tokenizer = AutoTokenizer.from_pretrained(chatbot_tokenizer, use_fast=True)


def count_tokens(text: str) -> int:
    """
    Counts the number of tokens in a given string using the tokenizer.
    """
    try:
        if not isinstance(text, str):
            print(f"Warning: Non-string input received. Converting to string: {text} ({type(text)})")
            text = str(text)

        return len(tokenizer.encode(text, add_special_tokens=False))

    except Exception as e:
        print(f"Tokenizer error. Input: {text}\nException: {e}")
        raise


def truncate_context(messages: List[Dict[str, str]], max_tokens: int) -> List[Dict[str, str]]:
    """
    Trims the list of messages (with 'user' and 'assistant' keys) from the most recent backward
    to fit within the max token limit. Returns a list of messages that do not exceed the token budget.
    """
    trimmed_messages = []
    total_tokens = 0

    for msg in reversed(messages):  # Iterate from latest to oldest
        user_tokens = count_tokens(msg.get("user", ""))
        assistant_tokens = count_tokens(msg.get("assistant", ""))

        # Check if adding this message exceeds the token limit
        if total_tokens + user_tokens + assistant_tokens > max_tokens:
            break

        # Prepend the message to maintain chronological order
        trimmed_messages.insert(0, msg)
        total_tokens += user_tokens + assistant_tokens

    return trimmed_messages


def build_context_within_token_limit(user_input: str, history: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Combines system prompt with trimmed conversation history under token budget.
    """
    user_input_token_count = count_tokens(user_input)
    system_prompt_token_count = count_tokens(chatbot_system_prompt)
    buffer_tokens = 50  # Buffer for safety
    tokens_consumed = user_input_token_count + system_prompt_token_count + buffer_tokens

    if tokens_consumed > max_total_tokens:
        raise ValueError("User input exceeds maximum token limit.")

    # Calculate the remaining token budget for the conversation history
    token_budget = max_total_tokens - tokens_consumed
    if token_budget < 0:
        token_budget = 0

    # Trim the conversation history to fit within the token budget
    trimmed_history = truncate_context(history, token_budget)

    return trimmed_history