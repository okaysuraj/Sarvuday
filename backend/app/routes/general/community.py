"""Authenticated community access with anonymous-author privacy and explicit failures."""
from datetime import datetime
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo.errors import PyMongoError
from app.database import get_mongo_db
from app.models.mongodb_models import CommunityPost
from app.schemas import PostCreate, PostInteract
from app.utils.oauth import ensure_normal_user

router = APIRouter(tags=["Community"])


def valid_id(value):
    if not ObjectId.is_valid(value):
        raise HTTPException(status_code=422, detail="Invalid community record ID")
    return ObjectId(value)


def post_response(record):
    # Account IDs are not display names and must never disclose anonymous authors.
    return {"id": str(record["_id"]), "group_id": record.get("group_id", ""),
            "content": record["content"], "is_anonymous": record.get("is_anonymous", False),
            "has_trigger_warning": record.get("has_trigger_warning", False),
            "likes": record.get("likes", 0), "hugs": record.get("hugs", 0), "relates": record.get("relates", 0),
            "created_at": record["created_at"].isoformat() if isinstance(record["created_at"], datetime) else record["created_at"]}


@router.get("/groups")
async def get_support_groups(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                             current_user=Depends(ensure_normal_user), mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.support_groups.find({}).sort("member_count", -1).skip(offset).limit(limit).to_list(length=limit)
        return [{"id": str(record["_id"]), "name": record["name"], "description": record["description"],
                 "member_count": record.get("member_count", 0), "created_at": record["created_at"]} for record in records]
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Support groups are unavailable") from exc


@router.get("/groups/{group_id}/feed")
async def get_group_feed(group_id: str, limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                         current_user=Depends(ensure_normal_user), mongo_db=Depends(get_mongo_db)):
    group_object_id = valid_id(group_id)
    try:
        if await mongo_db.support_groups.find_one({"_id": group_object_id}) is None:
            raise HTTPException(status_code=404, detail="Support group not found")
        records = await mongo_db.community_posts.find({"group_id": group_id}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [post_response(record) for record in records]
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Community feed is unavailable") from exc


@router.get("/feed")
async def get_general_feed(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0),
                           current_user=Depends(ensure_normal_user), mongo_db=Depends(get_mongo_db)):
    try:
        records = await mongo_db.community_posts.find({"group_id": {"$in": ["", None]}}).sort("created_at", -1).skip(offset).limit(limit).to_list(length=limit)
        return [post_response(record) for record in records]
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Community feed is unavailable") from exc


@router.post("/posts", status_code=status.HTTP_201_CREATED)
async def create_post(data: PostCreate, current_user=Depends(ensure_normal_user), mongo_db=Depends(get_mongo_db)):
    try:
        if data.group_id:
            if await mongo_db.support_groups.find_one({"_id": valid_id(data.group_id)}) is None:
                raise HTTPException(status_code=404, detail="Support group not found")
        record = CommunityPost(user_id=current_user.user_id, **data.model_dump())
        result = await mongo_db.community_posts.insert_one(record.model_dump(by_alias=True))
        return {"status": "success", "id": str(result.inserted_id)}
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Your post could not be saved") from exc


@router.post("/posts/{post_id}/interact")
async def interact_with_post(post_id: str, data: PostInteract, current_user=Depends(ensure_normal_user),
                             mongo_db=Depends(get_mongo_db)):
    identifier = valid_id(post_id)
    field = {"hug": "hugs", "relate": "relates", "like": "likes"}[data.action]
    try:
        result = await mongo_db.community_posts.update_one({"_id": identifier}, {"$inc": {field: 1}})
    except PyMongoError as exc:
        raise HTTPException(status_code=503, detail="Your reaction could not be saved") from exc
    if result.matched_count != 1:
        raise HTTPException(status_code=404, detail="Community post not found")
    return {"status": "success"}
