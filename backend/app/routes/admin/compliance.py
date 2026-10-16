"""Privacy operations require a verified cross-store retention workflow."""
from fastapi import APIRouter, Depends, HTTPException
from app.utils.oauth import ensure_admin_user

router = APIRouter(tags=["Admin Privacy Operations"])

@router.post("/anonymize/{user_id}")
async def anonymize_user_data(user_id: str, current_admin=Depends(ensure_admin_user)):
    raise HTTPException(status_code=503, detail="Anonymization is unavailable until cross-store retention and audit workflows are configured.")

@router.delete("/right-to-delete/{user_id}")
async def right_to_delete_user(user_id: str, current_admin=Depends(ensure_admin_user)):
    raise HTTPException(status_code=503, detail="Account erasure is unavailable until cross-store retention and audit workflows are configured.")
