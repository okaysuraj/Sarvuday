"""Shared unique id generation helpers used by API features."""

import secrets
import uuid

# -------------------------
# Generic UUID4 Generator with Prefix
# -------------------------


def generate_prefixed_uuid(prefix: str, length: int = 8) -> str:
    """
    Generate a UUID4-based ID with a human-readable prefix.
    """
    return f"{prefix}-{uuid.uuid4().hex[:length].upper()}"


# -------------------------
# User ID Generator
# -------------------------


def generate_user_id(user_type: str) -> str:
    """
    Generate a UUID-based user ID for normal_user, counsellor, or admin.
    Format: NUSER-1A2B3C4D, CUSER-AB12CD34, ADMIN-EF567890
    """
    prefix_map = {
        "normal_user": "NUSER",
        "counsellor": "CUSER",
        "admin": "ADMIN",
    }

    prefix = prefix_map.get(user_type.lower())
    if not prefix:
        raise ValueError("Invalid user type")

    return generate_prefixed_uuid(prefix, 12)


# -------------------------
# Other Entity UUID4-Based Generators
# -------------------------


def generate_chat_session_id() -> str:
    return generate_prefixed_uuid("CHAT", 12)


def generate_available_slot_id() -> str:
    return generate_prefixed_uuid("SLOT", 12)


def generate_appointment_id() -> str:
    return generate_prefixed_uuid("APT", 12)


def generate_user_payment_id() -> str:
    return generate_prefixed_uuid("PAY", 12)


def generate_counselling_session_id() -> str:
    return generate_prefixed_uuid("CS", 12)


def generate_prescription_id() -> str:
    return generate_prefixed_uuid("PRE", 12)


# -------------------------
# Numeric catalog IDs must round-trip through JavaScript without losing precision.
# -------------------------


def generate_disorder_id() -> int:
    return secrets.randbelow(2**53 - 1) + 1
