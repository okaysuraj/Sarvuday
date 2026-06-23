# app/utils/unique_id_generation.py

import uuid
from app.database import disorders_collection

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
    return generate_prefixed_uuid(f"CHAT", 12)

def generate_available_slot_id() -> str:
    return generate_prefixed_uuid(f"SLOT", 12)

def generate_appointment_id() -> str:
    return generate_prefixed_uuid(f"APT", 12)

def generate_user_payment_id() -> str:
    return generate_prefixed_uuid(f"PAY", 12)

def generate_user_refund_id() -> str:
    return generate_prefixed_uuid(f"REF", 12)

def generate_counsellor_payment_id() -> str:
    return generate_prefixed_uuid(f"PAY", 12)

def generate_counselling_session_id() -> str:
    return generate_prefixed_uuid(f"CS", 12)

def generate_prescription_id() -> str:
    return generate_prefixed_uuid(f"PRE", 12)


# -------------------------
# Disorder ID (Mongo auto-increment style — kept as-is)
# -------------------------

async def get_next_disorder_id() -> str:
    """
    Generate the next disorder ID in incremental manner.
    Still uses Mongo auto-increment behavior for compatibility.
    """
    last_disorder = disorders_collection.find_one(
        {}, sort=[("disorder_id", -1)]
    )

    if last_disorder and "disorder_id" in last_disorder:
        try:
            last_num = int(last_disorder["disorder_id"])
            return str(last_num + 1)
        except ValueError:
            return "1"
    return "1"
