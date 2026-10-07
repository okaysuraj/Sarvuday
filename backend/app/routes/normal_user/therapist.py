# app/routes/normal_user/therapist.py

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.users import NormalUser
from app.models.users.counsellor import Counsellor
from app.utils.oauth import ensure_normal_user
from app.database import get_db

router = APIRouter(prefix="/therapists", tags=["Therapists"])

@router.get("/")
async def get_therapists(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db)
):
    try:
        query = select(Counsellor).where(Counsellor.is_approved == True)
        result = await db.execute(query)
        counsellors = result.scalars().all()

        therapists_data = []
        for c in counsellors:
            specialties = [s.strip() for s in c.specializations.split(",")] if c.specializations else []
            therapists_data.append({
                "id": c.user_id,
                "name": c.name,
                "specialties": specialties,
                "rating": float(c.average_rating) if c.average_rating else 5.0,
                "accepts_insurance": True,
                "virtual": True,
                "bio": c.bio or "",
                "experience_years": c.experience_years or 0,
                "session_fee": float(c.session_fee) if c.session_fee else 0.0,
                "profile_pic": c.profile_pic or ""
            })
        return therapists_data
    except Exception as e:
        print(f"Error fetching therapists: {e}")
        return []
