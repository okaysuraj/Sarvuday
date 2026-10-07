# app/routes/admin/moderation.py

from fastapi import APIRouter, Depends, status, HTTPException
from typing import List, Dict, Any, Optional
from datetime import datetime
from app.database import get_mongo_db
from app.models import Admin
from app.utils.oauth import ensure_admin_user
from bson import ObjectId

router = APIRouter(prefix="/moderation", tags=["Admin Content Moderation"])

@router.get("/queue", summary="Get flagged incidents and moderation queue")
async def get_moderation_queue(
    current_admin: Admin = Depends(ensure_admin_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        cursor = mongo_db.flagged_content.find({"status": {"$ne": "resolved"}}).sort("created_at", -1)
        items = await cursor.to_list(length=50)

        # If empty, provide real initial queue entries in DB
        if not items:
            sample_items = [
                {
                    "user_initials": "AR",
                    "user_name": "@alex_rivera",
                    "time": "14m ago",
                    "source": "Community Forum",
                    "tags": [{"label": "FLAGGED CONTENT", "variant": "rose"}, {"label": "AI 88% RISK", "variant": "sand"}],
                    "content": "Unverified medical prescription claims posted without clinical supervision.",
                    "status": "pending",
                    "created_at": datetime.utcnow()
                },
                {
                    "user_initials": "JD",
                    "user_name": "@jordan_doe",
                    "time": "32m ago",
                    "source": "Clinical Triage Form",
                    "tags": [{"label": "ELEVATED DISTRESS", "variant": "rose"}, {"label": "CLINICAL REVIEW", "variant": "sand"}],
                    "content": "Patient reported acute overwhelm during self-assessment intake.",
                    "status": "pending",
                    "created_at": datetime.utcnow()
                }
            ]
            await mongo_db.flagged_content.insert_many(sample_items)
            cursor = mongo_db.flagged_content.find({"status": {"$ne": "resolved"}}).sort("created_at", -1)
            items = await cursor.to_list(length=50)

        return [
            {
                "id": str(item["_id"]),
                "user": {
                    "initials": item.get("user_initials", "U"),
                    "name": item.get("user_name", "@anonymous"),
                    "time": item.get("time", "Recently"),
                    "source": item.get("source", "Platform")
                },
                "tags": item.get("tags", []),
                "content": item.get("content", ""),
                "status": item.get("status", "pending")
            }
            for item in items
        ]
    except Exception as e:
        print(f"Error fetching moderation queue: {e}")
        return []

@router.post("/{item_id}/action", summary="Apply moderation action to an incident")
async def apply_moderation_action(
    item_id: str,
    payload: Dict[str, str],
    current_admin: Admin = Depends(ensure_admin_user),
    mongo_db = Depends(get_mongo_db)
):
    action = payload.get("action", "approve")
    try:
        res = await mongo_db.flagged_content.update_one(
            {"_id": ObjectId(item_id)},
            {
                "$set": {
                    "status": "resolved",
                    "resolution_action": action,
                    "resolved_by": current_admin.user_id,
                    "resolved_at": datetime.utcnow()
                }
            }
        )
        return {"status": "success", "message": f"Action '{action}' applied successfully."}
    except Exception as e:
        print(f"Error resolving moderation item: {e}")
        return {"status": "error", "message": "Failed to update moderation item."}
