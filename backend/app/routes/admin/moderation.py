"""Administrator moderation queries; private support notes stay out of lists."""

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.safety import CrisisLog, FlaggedContent
from app.schemas.records import record_fields
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/moderation", tags=["Admin Content Moderation"])


class ModerationAction(BaseModel):
    action: Literal[
        "approve", "remove", "escalate", "dismiss", "reject", "warn", "flag"
    ]


@router.get("/crisis-logs")
async def get_crisis_logs(
    current_admin=Depends(ensure_admin_user), db: AsyncSession = Depends(get_db)
):
    records = await db.scalars(
        select(CrisisLog)
        .order_by(CrisisLog.created_at.desc(), CrisisLog.id.desc())
        .limit(50)
    )
    return [
        record_fields(
            record, "id", "user_id", "risk_level", "source", "is_resolved", "created_at"
        )
        for record in records
    ]


@router.get("/queue")
async def get_moderation_queue(
    current_admin=Depends(ensure_admin_user), db: AsyncSession = Depends(get_db)
):
    records = await db.scalars(
        select(FlaggedContent)
        .where(FlaggedContent.status != "resolved")
        .order_by(FlaggedContent.created_at.desc(), FlaggedContent.id.desc())
        .limit(50)
    )
    return [
        {
            "id": item.id,
            "user": {
                "initials": item.user_initials,
                "name": item.user_name,
                "time": item.created_at.isoformat(),
                "source": item.source,
            },
            "tags": item.tags,
            "content": item.content,
            "status": item.status,
        }
        for item in records
    ]


@router.post("/{item_id}/action")
async def apply_moderation_action(
    item_id: str,
    payload: ModerationAction,
    current_admin=Depends(ensure_admin_user),
    db: AsyncSession = Depends(get_db),
):
    # Resolving an already handled item fails instead of overwriting the audit trail.
    identifier = await db.scalar(
        update(FlaggedContent)
        .where(FlaggedContent.id == item_id, FlaggedContent.status != "resolved")
        .values(
            status="resolved",
            resolution_action=payload.action,
            resolved_by=current_admin.user_id,
            resolved_at=func.now(),
        )
        .returning(FlaggedContent.id)
    )
    if identifier is None:
        raise HTTPException(status_code=404, detail="No open moderation item found")
    await db.commit()
    return {"status": "success", "message": "Moderation decision saved."}
