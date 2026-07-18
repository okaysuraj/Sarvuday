from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from app.models.users import NormalUser
from app.utils.oauth import ensure_normal_user
from app.database.mongo import get_mongo_db

router = APIRouter(prefix="/therapists", tags=["Therapists"])

@router.get("/")
async def get_therapists(
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        # Mock implementation for now, in reality fetch from DB
        return [
            {
                "id": "t1",
                "name": "Dr. Sarah Jenkins",
                "specialties": ["Anxiety", "Depression"],
                "rating": 4.9,
                "accepts_insurance": True,
                "virtual": True
            },
            {
                "id": "t2",
                "name": "Dr. Marcus Cole",
                "specialties": ["Family", "ADHD"],
                "rating": 4.8,
                "accepts_insurance": False,
                "virtual": False
            }
        ]
    except Exception as e:
        print(f"Error fetching therapists: {e}")
        return []
