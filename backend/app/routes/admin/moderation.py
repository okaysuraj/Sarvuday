from datetime import datetime, timezone
from typing import Literal
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from pymongo.errors import PyMongoError
from bson import ObjectId
from app.database import get_mongo_db
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/moderation", tags=["Admin Content Moderation"])

class ModerationAction(BaseModel):
    action: Literal["approve", "remove", "escalate", "dismiss", "reject", "warn", "flag"]


@router.get("/crisis-logs")
async def get_crisis_logs(current_admin=Depends(ensure_admin_user), mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.crisis_logs.find({}, {"notes": 0}).sort("created_at", -1).limit(50).to_list(length=50)
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Support request logs are unavailable") from exc
    return [{"id": str(record["_id"]), "user_id": record["user_id"],
             "risk_level": record.get("risk_level"), "source": record.get("source"),
             "is_resolved": record.get("is_resolved", False),
             "created_at": record["created_at"].isoformat()} for record in records]

@router.get("/queue")
async def get_moderation_queue(current_admin=Depends(ensure_admin_user), mongo_db=Depends(get_mongo_db)):
    try:
        items = await mongo_db.flagged_content.find({"status": {"$ne": "resolved"}}).sort("created_at", -1).limit(50).to_list(length=50)
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Moderation queue is unavailable") from exc
    return [{"id": str(item["_id"]), "user": {"initials": item.get("user_initials", ""),
            "name": item.get("user_name", "Anonymous"), "time": item["created_at"].isoformat() if item.get("created_at") else None,
            "source": item.get("source", "Platform")}, "tags": item.get("tags", []),
            "content": item.get("content", ""), "status": item.get("status", "pending")} for item in items]

@router.post("/{item_id}/action")
async def apply_moderation_action(item_id: str, payload: ModerationAction,
                                  current_admin=Depends(ensure_admin_user), mongo_db=Depends(get_mongo_db)):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=422, detail="Invalid moderation item ID")
    try:
        result = await mongo_db.flagged_content.update_one({"_id": ObjectId(item_id), "status": {"$ne": "resolved"}},
            {"$set": {"status": "resolved", "resolution_action": payload.action,
                      "resolved_by": current_admin.user_id, "resolved_at": datetime.now(timezone.utc)}})
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Moderation action could not be saved") from exc
    if result.matched_count != 1:
        raise HTTPException(status_code=404, detail="No open moderation item found")
    return {"status": "success", "message": "Moderation decision saved."}
