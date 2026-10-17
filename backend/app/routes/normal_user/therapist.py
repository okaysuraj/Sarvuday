"""Therapist endpoints and access checks."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.users import NormalUser
from app.models.users.counsellor import Counsellor
from app.utils.oauth import ensure_normal_user

router = APIRouter(prefix="/therapists", tags=["Therapists"])


@router.get("/")
async def get_therapists(
    current_user: NormalUser = Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
):
    try:
        query = (
            select(Counsellor)
            .where(Counsellor.is_approved.is_(True))
            .order_by(Counsellor.user_id)
            .limit(limit)
            .offset(offset)
        )
        result = await db.execute(query)
        counsellors = result.scalars().all()

        therapists_data = []
        for c in counsellors:
            specialties = c.specializations or []
            therapists_data.append(
                {
                    "id": c.user_id,
                    "name": c.name,
                    "specialties": specialties,
                    "rating": float(c.average_rating)
                    if c.total_reviews and c.average_rating is not None
                    else None,
                    "accepts_insurance": None,
                    "virtual": True,
                    "bio": c.bio or "",
                    "experience_years": c.experience_years or 0,
                    "session_fee": float(c.session_fee) if c.session_fee else 0.0,
                    "profile_pic": c.profile_pic or "",
                }
            )
        return therapists_data
    except Exception as e:
        raise HTTPException(
            status_code=503, detail="Therapist directory is unavailable"
        ) from e
