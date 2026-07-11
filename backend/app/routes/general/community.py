from fastapi import APIRouter, Depends, status
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from app.database import get_mongo_db
from app.models import NormalUser
from app.utils.oauth import ensure_normal_user
from app.schemas import SupportGroupCreate, PostCreate, PostInteract, SupportGroupResponse, PostResponse
from app.models.mongodb_models import SupportGroup, CommunityPost
import traceback

router = APIRouter(prefix="/community", tags=["Community"])

@router.get("/groups")
async def get_support_groups(mongo_db = Depends(get_mongo_db)):
    try:
        cursor = mongo_db.support_groups.find().sort("member_count", -1)
        groups = await cursor.to_list(length=50)
        
        return [
            {
                "id": str(g["_id"]),
                "name": g["name"],
                "description": g["description"],
                "member_count": g.get("member_count", 0),
                "created_at": g["created_at"].isoformat() if isinstance(g["created_at"], datetime) else g["created_at"]
            }
            for g in groups
        ]
    except Exception as e:
        print(f"Error getting support groups: {e}")
        return []

@router.get("/groups/{group_id}/feed")
async def get_group_feed(
    group_id: str,
    mongo_db = Depends(get_mongo_db)
):
    try:
        query = {"group_id": group_id}
        cursor = mongo_db.community_posts.find(query).sort("created_at", -1)
        posts = await cursor.to_list(length=50)
        
        return [
            {
                "id": str(p["_id"]),
                "group_id": p.get("group_id", ""),
                "user_id": p.get("user_id", ""),
                "content": p["content"],
                "is_anonymous": p.get("is_anonymous", False),
                "has_trigger_warning": p.get("has_trigger_warning", False),
                "likes": p.get("likes", 0),
                "hugs": p.get("hugs", 0),
                "relates": p.get("relates", 0),
                "created_at": p["created_at"].isoformat() if isinstance(p["created_at"], datetime) else p["created_at"]
            }
            for p in posts
        ]
    except Exception as e:
        print(f"Error getting group feed: {e}")
        return []

@router.get("/feed")
async def get_general_feed(mongo_db = Depends(get_mongo_db)):
    try:
        # For general feed we could just return posts with empty group_id or all
        cursor = mongo_db.community_posts.find({"group_id": {"$in": ["", None]}}).sort("created_at", -1)
        posts = await cursor.to_list(length=50)
        
        return [
            {
                "id": str(p["_id"]),
                "group_id": p.get("group_id", ""),
                "user_id": p.get("user_id", ""),
                "content": p["content"],
                "is_anonymous": p.get("is_anonymous", False),
                "has_trigger_warning": p.get("has_trigger_warning", False),
                "likes": p.get("likes", 0),
                "hugs": p.get("hugs", 0),
                "relates": p.get("relates", 0),
                "created_at": p["created_at"].isoformat() if isinstance(p["created_at"], datetime) else p["created_at"]
            }
            for p in posts
        ]
    except Exception as e:
        print(f"Error getting general feed: {e}")
        return []

@router.post("/posts", response_model=dict, status_code=status.HTTP_201_CREATED)
async def create_post(
    data: PostCreate,
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        new_post = CommunityPost(
            user_id=current_user.user_id,
            content=data.content,
            is_anonymous=data.is_anonymous,
            has_trigger_warning=data.has_trigger_warning,
            group_id=data.group_id or ""
        )
        result = await mongo_db.community_posts.insert_one(new_post.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id)}
    except Exception as e:
        print(f"Error creating post: {e}")
        return {"status": "error", "message": "Failed to create post"}

@router.post("/posts/{post_id}/interact")
async def interact_with_post(
    post_id: str,
    data: PostInteract,
    current_user: NormalUser = Depends(ensure_normal_user),
    mongo_db = Depends(get_mongo_db)
):
    try:
        action = data.action
        if action not in ["hug", "relate", "like"]:
            return {"status": "error", "message": "Invalid action"}
        
        # Increment the corresponding counter
        field_map = {
            "hug": "hugs",
            "relate": "relates",
            "like": "likes"
        }
        
        field = field_map[action]
        result = await mongo_db.community_posts.update_one(
            {"_id": ObjectId(post_id)},
            {"$inc": {field: 1}}
        )
        
        if result.modified_count > 0:
            return {"status": "success"}
        return {"status": "error", "message": "Post not found"}
    except Exception as e:
        print(f"Error interacting with post: {e}")
        return {"status": "error", "message": "Failed to interact"}
