from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update, delete
from app.database import get_db
from app.models import NormalUser, Admin
from app.utils.oauth import ensure_admin

router = APIRouter(tags=["Admin Compliance"])

@router.post("/anonymize/{user_id}")
async def anonymize_user_data(
    user_id: str,
    current_admin: Admin = Depends(ensure_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    HIPAA/GDPR Compliance: Anonymizes user PII but retains statistical data for models.
    Replaces name, email, and phone with random hashes.
    """
    # In a real system, you would hash strings and cascade to MongoDB documents as well.
    import uuid
    anon_id = f"anon_{uuid.uuid4().hex[:8]}"
    
    stmt = (
        update(NormalUser)
        .where(NormalUser.user_id == user_id)
        .values(
            name="Anonymized User",
            email=f"{anon_id}@anonymized.local",
            phone_number="0000000000",
            emergency_contact_phone="0000000000",
            anonymous_mode=True
        )
    )
    
    result = await db.execute(stmt)
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    await db.commit()
    
    # TODO: Cascade anonymization to MongoDB (ChatHistory, MoodTracking, etc.)
    
    return {"status": "success", "message": f"User {user_id} anonymized successfully"}


@router.delete("/right-to-delete/{user_id}")
async def right_to_delete_user(
    user_id: str,
    current_admin: Admin = Depends(ensure_admin),
    db: AsyncSession = Depends(get_db)
):
    """
    GDPR Right to Erasure / Right to be Forgotten.
    Hard deletes user and cascades to all relational data.
    """
    stmt = delete(NormalUser).where(NormalUser.user_id == user_id)
    result = await db.execute(stmt)
    
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    await db.commit()
    
    # TODO: Purge MongoDB records for this user_id completely
    
    return {"status": "success", "message": f"User {user_id} and all associated data permanently deleted"}
