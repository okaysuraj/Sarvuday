"""Keep recent conversation pairs within an approximate model context budget."""

from app.config import settings


def count_tokens(text: str) -> int:
    """Estimate one token per four characters without loading a tokenizer model."""
    return len(str(text)) // 4


def truncate_context(
    messages: list[dict[str, str]], max_tokens: int
) -> list[dict[str, str]]:
    recent = []
    total = 0
    for message in reversed(messages):
        size = count_tokens(message.get("user", "")) + count_tokens(
            message.get("assistant", "")
        )
        if total + size > max_tokens:
            break
        recent.append(message)
        total += size
    # Reverse once instead of repeatedly inserting at the start of a growing list.
    return list(reversed(recent))


def build_context_within_token_limit(
    user_input: str, history: list[dict[str, str]]
) -> list[dict[str, str]]:
    reserved = (
        count_tokens(user_input) + count_tokens(settings.chatbot_system_prompt) + 50
    )
    if reserved > settings.max_total_tokens:
        raise ValueError("User input exceeds maximum token limit.")
    return truncate_context(history, settings.max_total_tokens - reserved)
