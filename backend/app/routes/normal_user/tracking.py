from fastapi import APIRouter, Depends, status
from typing import List, Optional
from datetime import datetime
from app.database import get_mongo_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.schemas import MoodCreate, JournalCreate, MoodResponse, JournalResponse
from app.models.mongodb_models import MoodTracking, JournalEntry
import traceback

router = APIRouter(prefix="/tracking", tags=["Tracking"])

@router.post("/mood", response_model=dict, status_code=status.HTTP_201_CREATED)
async def log_mood(
    data: MoodCreate,
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        new_mood = MoodTracking(
            user_id=current_user.user_id,
            mood=str(data.moodIndex),
            energy_level=data.energy_level or 5,
            anxiety_level=data.anxiety_level or 5,
            sleep_quality=data.sleep_quality or "Good",
            notes=data.notes or ""
        )
        
        result = await mongo_db.mood_tracking.insert_one(new_mood.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id)}
    except Exception as e:
        print(f"Error logging mood: {e}")
        return {"status": "error", "message": "Failed to log mood"}

@router.get("/mood/history")
async def get_mood_history(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        query = {"user_id": current_user.user_id}
        # Simplified query without date filtering for now
        cursor = mongo_db.mood_tracking.find(query).sort("created_at", -1)
        moods = await cursor.to_list(length=100)
        
        return [
            {
                "id": str(m["_id"]),
                "mood": m["mood"],
                "energy_level": m["energy_level"],
                "anxiety_level": m["anxiety_level"],
                "sleep_quality": m["sleep_quality"],
                "notes": m.get("notes", ""),
                "created_at": m["created_at"].isoformat() if isinstance(m["created_at"], datetime) else m["created_at"]
            }
            for m in moods
        ]
    except Exception as e:
        print(f"Error getting mood history: {e}")
        return []

@router.post("/journal", response_model=dict, status_code=status.HTTP_201_CREATED)
async def submit_journal(
    data: JournalCreate,
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        # Create journal entry
        new_journal = JournalEntry(
            user_id=current_user.user_id,
            content=data.text,
            entry_type="text",
            ai_sentiment_score=0.0 # Placeholder
        )
        result = await mongo_db.journal_entries.insert_one(new_journal.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id)}
    except Exception as e:
        print(f"Error submitting journal: {e}")
        return {"status": "error", "message": "Failed to submit journal"}

@router.get("/journal")
async def get_journal_entries(
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        cursor = mongo_db.journal_entries.find({"user_id": current_user.user_id}).sort("created_at", -1)
        journals = await cursor.to_list(length=100)
        
        return [
            {
                "id": str(j["_id"]),
                "content": j["content"],
                "ai_sentiment_score": j.get("ai_sentiment_score", 0.0),
                "created_at": j["created_at"].isoformat() if isinstance(j["created_at"], datetime) else j["created_at"]
            }
            for j in journals
        ]
    except Exception as e:
        print(f"Error getting journal history: {e}")
        return []
