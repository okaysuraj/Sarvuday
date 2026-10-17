"""Authenticated community access with private author identities."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.community import CommunityPost, SupportGroup
from app.schemas.community_schemas import PostCreate, PostInteract
from app.schemas.records import record_fields
from app.utils.oauth import ensure_normal_user

router = APIRouter(tags=["Community"])


def post_response(record):
    result = record_fields(
        record,
        "id",
        "content",
        "is_anonymous",
        "has_trigger_warning",
        "likes",
        "hugs",
        "relates",
        "created_at",
    )
    result["group_id"] = record.group_id or ""
    return result


async def require_group(db, group_id):
    if await db.get(SupportGroup, group_id) is None:
        raise HTTPException(status_code=404, detail="Support group not found")


async def feed(db, group_id, limit, offset):
    records = await db.scalars(
        select(CommunityPost)
        .where(CommunityPost.group_id == group_id)
        .order_by(CommunityPost.created_at.desc(), CommunityPost.id.desc())
        .offset(offset)
        .limit(limit)
    )
    return [post_response(record) for record in records]


@router.get("/groups")
async def get_support_groups(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    records = await db.scalars(
        select(SupportGroup)
        .order_by(SupportGroup.member_count.desc(), SupportGroup.id)
        .offset(offset)
        .limit(limit)
    )
    return [
        record_fields(record, "id", "name", "description", "member_count", "created_at")
        for record in records
    ]


@router.get("/groups/{group_id}/feed")
async def get_group_feed(
    group_id: str,
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    await require_group(db, group_id)
    return await feed(db, group_id, limit, offset)


@router.get("/feed")
async def get_general_feed(
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    return await feed(db, None, limit, offset)


@router.post("/posts", status_code=201)
async def create_post(
    data: PostCreate,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    if data.group_id:
        await require_group(db, data.group_id)
    record = CommunityPost(
        user_id=current_user.user_id,
        **data.model_dump(exclude={"group_id"}),
        group_id=data.group_id or None,
    )
    db.add(record)
    await db.commit()
    return {"status": "success", "id": record.id}


@router.post("/posts/{post_id}/interact")
async def interact_with_post(
    post_id: str,
    data: PostInteract,
    current_user=Depends(ensure_normal_user),
    db: AsyncSession = Depends(get_db),
):
    field = {
        "hug": CommunityPost.hugs,
        "relate": CommunityPost.relates,
        "like": CommunityPost.likes,
    }[data.action]
    identifier = await db.scalar(
        update(CommunityPost)
        .where(CommunityPost.id == post_id)
        .values({field: field + 1})
        .returning(CommunityPost.id)
    )
    if identifier is None:
        raise HTTPException(status_code=404, detail="Community post not found")
    await db.commit()
    return {"status": "success"}
