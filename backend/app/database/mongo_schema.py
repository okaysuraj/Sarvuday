"""Versioned MongoDB validators and indexes; provisioning never inserts feature data."""
from pymongo import ASCENDING, DESCENDING, IndexModel

SCHEMA_VERSION = 2
STRING = {"bsonType": "string"}
DATE = {"bsonType": "date"}
NUMBER = {"bsonType": ["double", "int", "long", "decimal"]}
NULLABLE_NUMBER = {"bsonType": ["double", "int", "long", "decimal", "null"]}
NULLABLE_STRING = {"bsonType": ["string", "null"]}
BOOL = {"bsonType": "bool"}
ARRAY = {"bsonType": "array"}


def schema(required, properties):
    return {"$jsonSchema": {"bsonType": "object", "required": required, "properties": properties}}


USER_CREATED = {"user_id": STRING, "created_at": DATE}
TRACKING_INDEX = [IndexModel([("user_id", ASCENDING), ("created_at", DESCENDING)], name="user_created")]
SCHEMAS = {
    "mood_tracking": schema(["user_id", "mood", "created_at"], {
        **USER_CREATED, "mood": {"enum": ["0", "1", "2", "3", "4"]},
        "energy_level": {**NULLABLE_NUMBER, "minimum": 0, "maximum": 10},
        "anxiety_level": {**NULLABLE_NUMBER, "minimum": 0, "maximum": 10},
        "sleep_quality": NULLABLE_STRING, "emotions": ARRAY,
    }),
    "journal_entries": schema(["user_id", "content", "created_at"], {
        **USER_CREATED, "content": STRING, "ai_sentiment_score": NULLABLE_NUMBER, "triggers": ARRAY,
    }),
    "sleep_tracking": schema(["user_id", "date", "duration_hours", "created_at"], {
        **USER_CREATED, "date": {"bsonType": "string", "pattern": "^\\d{4}-\\d{2}-\\d{2}$"},
        "duration_hours": {**NUMBER, "minimum": 0, "maximum": 24},
        "deep_sleep_hours": {**NULLABLE_NUMBER, "minimum": 0, "maximum": 24},
    }),
    "user_medications": schema(["user_id", "name", "created_at"], {
        **USER_CREATED, "name": STRING, "is_taken": BOOL, "refill_days": NULLABLE_NUMBER,
    }),
    "user_goals": schema(["user_id", "title", "progress_total", "created_at"], {
        **USER_CREATED, "title": STRING, "progress_total": {**NUMBER, "minimum": 1},
        "progress_current": {**NUMBER, "minimum": 0}, "streak": {**NUMBER, "minimum": 0},
    }),
    "biofeedback_telemetry": schema(["user_id", "timestamp", "source"], {
        "user_id": STRING, "timestamp": DATE, "source": STRING, "hrv": NULLABLE_NUMBER,
        "heart_rate": NULLABLE_NUMBER, "daily_steps": NULLABLE_NUMBER,
    }),
    "chatbot_history": schema(["user_id", "session_id", "conversation"], {
        "user_id": STRING, "session_id": STRING, "conversation": ARRAY,
    }),
    "assessments_data": schema(["id", "questionType", "question", "options"], {
        "id": NUMBER, "questionType": STRING, "question": STRING, "options": ARRAY,
    }),
    "users_scores": schema(["user_id", "assessment_type", "score", "result", "calculated_at"], {
        "user_id": STRING, "assessment_type": STRING, "score": NUMBER, "result": STRING, "calculated_at": DATE,
    }),
    "disorders_data": schema(["disorder_id", "disorder_title", "disorder_description"], {
        "disorder_id": {"bsonType": ["int", "long", "string"]}, "disorder_title": STRING, "disorder_description": STRING,
    }),
    "support_groups": schema(["name", "description", "created_at"], {
        "name": STRING, "description": STRING, "created_at": DATE, "member_count": {**NUMBER, "minimum": 0},
    }),
    "community_posts": schema(["user_id", "content", "created_at"], {
        **USER_CREATED, "content": STRING, "group_id": STRING, "is_anonymous": BOOL,
    }),
    "counsellor_reviews": schema(["counsellor_id", "user_id", "appointment_id", "rating", "content", "created_at"], {
        **USER_CREATED, "counsellor_id": STRING, "appointment_id": STRING,
        "rating": {**NUMBER, "minimum": 1, "maximum": 5}, "content": STRING, "verified_appointment": BOOL,
    }),
    "crisis_logs": schema(["user_id", "risk_level", "created_at"], {
        **USER_CREATED, "risk_level": {"enum": ["manual", "low", "medium", "high", "critical"]},
    }),
    "flagged_content": schema(["content", "status", "created_at"], {
        "content": STRING, "status": STRING, "created_at": DATE,
    }),
    "contact_submissions": schema(["name", "email", "subject", "message", "submitted_at"], {
        "name": STRING, "email": STRING, "subject": STRING, "message": STRING, "submitted_at": DATE,
    }),
    "user_wallets": schema(["user_id"], {
        "user_id": STRING, "balance": {**NUMBER, "minimum": 0},
        "vault_savings": {**NUMBER, "minimum": 0}, "reward_points": {**NUMBER, "minimum": 0},
    }),
    "exercises": schema(["title", "category", "description", "published"], {
        "title": STRING, "category": STRING, "description": STRING, "published": BOOL,
        "duration_min": {**NUMBER, "minimum": 0}, "instructions": ARRAY,
    }),
    "exercise_progress": schema(["user_id", "exercise_id", "updated_at"], {
        "user_id": STRING, "exercise_id": STRING, "updated_at": DATE, "completed_at": {"bsonType": ["date", "null"]},
    }),
}
INDEXES = {name: TRACKING_INDEX for name in (
    "mood_tracking", "journal_entries", "sleep_tracking", "user_medications", "user_goals", "crisis_logs",
)}
INDEXES.update({
    "sleep_tracking": [*TRACKING_INDEX, IndexModel([("user_id", 1), ("date", -1)], name="user_sleep_date")],
    "biofeedback_telemetry": [IndexModel([("user_id", 1), ("timestamp", -1)], name="user_telemetry_time")],
    "chatbot_history": [IndexModel([("user_id", 1), ("session_id", 1)], unique=True, name="unique_user_chat")],
    "assessments_data": [IndexModel([("questionType", 1), ("id", 1)], unique=True, name="unique_assessment_question")],
    "users_scores": [IndexModel([("user_id", 1), ("calculated_at", -1), ("assessment_type", 1)], name="user_score_time")],
    "disorders_data": [IndexModel([("disorder_id", 1)], unique=True, name="unique_disorder_id")],
    "support_groups": [IndexModel([("member_count", -1)], name="group_members")],
    "community_posts": [IndexModel([("group_id", 1), ("created_at", -1)], name="group_post_time")],
    "counsellor_reviews": [
        IndexModel([("counsellor_id", 1), ("verified_appointment", 1), ("created_at", -1)], name="verified_review_time"),
        IndexModel([("appointment_id", 1)], unique=True, partialFilterExpression={"appointment_id": {"$type": "string"}}, name="unique_appointment_review"),
    ],
    "flagged_content": [IndexModel([("status", 1), ("created_at", -1)], name="moderation_status_time")],
    "contact_submissions": [IndexModel([("is_resolved", 1), ("submitted_at", -1)], name="unresolved_contact_time")],
    "user_wallets": [IndexModel([("user_id", 1)], unique=True, name="unique_user_wallet")],
    "exercises": [
        IndexModel([("published", 1), ("title", 1)], name="published_exercise_title"),
        IndexModel([("id", 1)], unique=True, partialFilterExpression={"id": {"$type": "string"}}, name="unique_exercise_id"),
    ],
    "exercise_progress": [IndexModel([("user_id", 1), ("exercise_id", 1)], unique=True, name="unique_user_exercise")],
})


async def provision_mongo(db):
    existing = set(await db.list_collection_names())
    for name, validator in SCHEMAS.items():
        if name in existing:
            await db.command({"collMod": name, "validator": validator,
                              "validationLevel": "strict", "validationAction": "error"})
        else:
            await db.create_collection(name, validator=validator,
                                       validationLevel="strict", validationAction="error")
        if INDEXES.get(name):
            await db[name].create_indexes(INDEXES[name])
    # Only publish the schema version after every validator and index succeeds.
    await db["_schema_versions"].update_one(
        {"_id": "application"}, {"$set": {"version": SCHEMA_VERSION}}, upsert=True)
