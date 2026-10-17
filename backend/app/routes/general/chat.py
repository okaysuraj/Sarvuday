"""Chat endpoints and access checks."""

import asyncio
import json
import re
import time
from collections import deque
from datetime import datetime, timezone
from typing import Optional
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    WebSocket,
    WebSocketDisconnect,
    status,
)
from pydantic import BaseModel, Field
from sqlalchemy import and_, func, or_, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.postgres import get_db
from app.models.chat import DirectMessage, MessageType
from app.models.sessions import CounsellingSession
from app.models.users import Counsellor, NormalUser
from app.utils.constants import UserTypeEnum
from app.utils.oauth import MODEL_MAP, get_current_user, verify_access_token

router = APIRouter()
SOCKET_PROTOCOL = "sarvuday-chat"


class ConnectionManager:
    """Track sockets separately so web and mobile can share the same account."""

    def __init__(self):
        self.active_connections: dict[str, dict[WebSocket, str]] = {}

    def online_users(self, room_id: str):
        users = set(self.active_connections.get(room_id, {}).values())
        return [{"user_id": user_id} for user_id in sorted(users)]

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        protocols = websocket.scope.get("subprotocols", [])
        await websocket.accept(
            subprotocol=SOCKET_PROTOCOL if SOCKET_PROTOCOL in protocols else None
        )
        self.active_connections.setdefault(room_id, {})[websocket] = user_id
        await self.broadcast(
            room_id, {"type": "online", "users": self.online_users(room_id)}
        )

    def disconnect(self, room_id: str, websocket: WebSocket):
        room = self.active_connections.get(room_id)
        if room is not None:
            room.pop(websocket, None)
            if not room:
                self.active_connections.pop(room_id, None)

    async def broadcast(
        self, room_id: str, message: dict, exclude_user_id: str | None = None
    ):
        for connection, user_id in list(
            self.active_connections.get(room_id, {}).items()
        ):
            if user_id == exclude_user_id:
                continue
            try:
                await connection.send_json(message)
            except Exception:
                self.disconnect(room_id, connection)


manager = ConnectionManager()


def generate_room_id(user1: str, user2: str) -> str:
    """Generate a consistent room ID regardless of user order."""
    sorted_ids = sorted([user1, user2])
    return f"ROOM-{sorted_ids[0]}-{sorted_ids[1]}"


def is_user_in_room(user_id: str, room_id: str) -> bool:
    match = re.fullmatch(
        r"ROOM-((?:NUSER|CUSER)-[A-Za-z0-9]+)-((?:NUSER|CUSER)-[A-Za-z0-9]+)", room_id
    )
    return bool(match and user_id in match.groups())


async def require_room_access(db, current_user, room_id):
    if not is_user_in_room(current_user.user_id, room_id):
        raise HTTPException(
            status_code=403, detail="Not authorized to access this room"
        )
    if (
        current_user.user_type == UserTypeEnum.counsellor
        and not current_user.is_approved
    ):
        raise HTTPException(status_code=403, detail="Counsellor approval is required")
    participants = re.fullmatch(
        r"ROOM-((?:NUSER|CUSER)-[A-Za-z0-9]+)-((?:NUSER|CUSER)-[A-Za-z0-9]+)", room_id
    ).groups()
    patient = next(
        (value for value in participants if value.startswith("NUSER-")), None
    )
    counsellor = next(
        (value for value in participants if value.startswith("CUSER-")), None
    )
    if (
        not patient
        or not counsellor
        or generate_room_id(patient, counsellor) != room_id
    ):
        raise HTTPException(
            status_code=403, detail="Not authorized to access this room"
        )
    existing = await db.execute(
        select(CounsellingSession.session_id)
        .where(
            CounsellingSession.user_id == patient,
            CounsellingSession.counsellor_id == counsellor,
        )
        .limit(1)
    )
    if existing.first() is None:
        raise HTTPException(
            status_code=403, detail="A clinical relationship is required for messaging"
        )


@router.get("/rooms", status_code=status.HTTP_200_OK, summary="Get chat rooms")
async def get_chat_rooms(
    user_id: Optional[str] = Query(None),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Enforce authenticated user's ID
    active_user_id = current_user.user_id
    if user_id and user_id != active_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot access chat rooms for another user",
        )

    sessions_query = select(CounsellingSession).where(
        or_(
            CounsellingSession.user_id == active_user_id,
            CounsellingSession.counsellor_id == active_user_id,
        )
    )
    result = await db.execute(sessions_query)
    sessions = result.scalars().all()

    rooms = {}

    for session in sessions:
        other_user_id = (
            session.counsellor_id
            if session.user_id == active_user_id
            else session.user_id
        )
        other_user_type = (
            UserTypeEnum.counsellor
            if session.user_id == active_user_id
            else UserTypeEnum.normal_user
        )

        room_id = generate_room_id(active_user_id, other_user_id)

        if room_id not in rooms:
            if other_user_type == UserTypeEnum.counsellor:
                c_res = await db.execute(
                    select(Counsellor).where(Counsellor.user_id == other_user_id)
                )
                other_user = c_res.scalar_one_or_none()
            else:
                u_res = await db.execute(
                    select(NormalUser).where(NormalUser.user_id == other_user_id)
                )
                other_user = u_res.scalar_one_or_none()

            name = other_user.name if other_user else "Unknown User"

            # Count unseen messages
            unseen_query = select(func.count(DirectMessage.message_id)).where(
                and_(
                    DirectMessage.room_id == room_id,
                    DirectMessage.sender_id != active_user_id,
                    DirectMessage.is_read.is_(False),
                )
            )
            unseen_res = await db.execute(unseen_query)
            unseen_count = unseen_res.scalar_one()

            # Get last message
            last_msg_query = (
                select(DirectMessage)
                .where(DirectMessage.room_id == room_id)
                .order_by(DirectMessage.created_at.desc())
                .limit(1)
            )
            last_msg_res = await db.execute(last_msg_query)
            last_msg = last_msg_res.scalar_one_or_none()

            rooms[room_id] = {
                "room_id": room_id,
                "other_user_id": other_user_id,
                "other_user_name": name,
                "other_user_type": other_user_type.value,
                "unread_count": unseen_count,
                "last_message": last_msg.content if last_msg else None,
                "last_message_time": last_msg.created_at.isoformat()
                if last_msg
                else None,
            }

    return {"rooms": list(rooms.values())}


@router.get(
    "/rooms/{room_id}/messages",
    status_code=status.HTTP_200_OK,
    summary="Get chat history",
)
async def get_chat_history(
    room_id: str,
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await require_room_access(db, current_user, room_id)

    query = (
        select(DirectMessage)
        .where(DirectMessage.room_id == room_id)
        .order_by(DirectMessage.created_at.desc())
        .limit(limit)
        .offset(offset)
    )
    result = await db.execute(query)
    messages = list(reversed(result.scalars().all()))

    return {
        "messages": [
            {
                "message_id": m.message_id,
                "room_id": m.room_id,
                "sender_id": m.sender_id,
                "content": m.content,
                "is_read": m.is_read,
                "created_at": m.created_at.isoformat(),
            }
            for m in messages
        ]
    }


class MessageCreate(BaseModel):
    message_id: Optional[str] = Field(default=None, min_length=1, max_length=50)
    content: str = Field(min_length=1, max_length=10000)
    sender_type: Optional[str] = Field(default=None, max_length=50)
    message_type: str = "text"


@router.post(
    "/rooms/{room_id}/messages",
    status_code=status.HTTP_201_CREATED,
    summary="Save message via REST",
)
async def create_message(
    room_id: str,
    message: MessageCreate,
    user_id: Optional[str] = Query(None),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    active_user_id = current_user.user_id
    await require_room_access(db, current_user, room_id)
    if user_id is not None and user_id != active_user_id:
        raise HTTPException(
            status_code=403, detail="Cannot send messages as another user"
        )

    message_id = message.message_id if message.message_id else f"MSG-{uuid4().hex}"
    sender_type = current_user.user_type.value

    new_msg = DirectMessage(
        message_id=message_id,
        room_id=room_id,
        sender_id=active_user_id,
        sender_type=sender_type,
        content=message.content,
        message_type=MessageType.text,
        is_read=False,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )
    db.add(new_msg)
    await db.commit()

    # Broadcast to websocket if any users are connected via websocket fallback
    broadcast_data = {
        "type": "message",
        "message_id": message_id,
        "room_id": room_id,
        "sender_id": active_user_id,
        "content": new_msg.content,
        "is_read": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await manager.broadcast(room_id, broadcast_data)

    return {"status": "success", "message_id": message_id}


@router.websocket("/{room_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    room_id: str,
    token: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    # Current clients send credentials in the handshake headers. Older builds
    # still use ?token=; hide that query from Uvicorn's accept/close log messages.
    websocket.scope["query_string"] = b""
    protocols = websocket.scope.get("subprotocols", [])
    credential = next(
        (value for value in protocols if value.startswith("bearer.")), None
    )
    if credential:
        token = credential.removeprefix("bearer.")
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    try:
        payload = verify_access_token(token)
        user_id = payload["sub"]
        user_type = UserTypeEnum(payload["user_type"])
        result = await db.execute(
            select(MODEL_MAP[user_type]).where(MODEL_MAP[user_type].user_id == user_id)
        )
        user = result.scalar_one_or_none()
        if user is None:
            raise HTTPException(status_code=401, detail="Invalid identity")
        await require_room_access(db, user, room_id)
        sender_type = user.user_type.value
        expires_at = float(payload["exp"])
        # An idle socket must not keep a database transaction/connection checked
        # out. Capture identity first because rollback expires ORM attributes.
        await db.rollback()
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    frames = deque()
    await manager.connect(websocket, room_id, user_id)
    try:
        while True:
            remaining = expires_at - time.time()
            if remaining <= 0:
                await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                break
            try:
                raw = await asyncio.wait_for(
                    websocket.receive_text(), timeout=remaining
                )
            except TimeoutError:
                await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                break
            now = time.monotonic()
            while frames and frames[0] <= now - 60:
                frames.popleft()
            if len(raw.encode("utf-8")) > 65536 or len(frames) >= 120:
                await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                break
            frames.append(now)
            try:
                data = json.loads(raw)
                if not isinstance(data, dict):
                    raise ValueError()
            except (ValueError, TypeError):
                await websocket.close(code=status.WS_1003_UNSUPPORTED_DATA)
                break
            msg_type = data.get("type")
            if msg_type == "message":
                content = data.get("content")
                if not isinstance(content, str) or not 1 <= len(content) <= 10000:
                    await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
                    break
                message_id = f"MSG-{uuid4().hex}"
                message = DirectMessage(
                    message_id=message_id,
                    room_id=room_id,
                    sender_id=user_id,
                    sender_type=sender_type,
                    content=content,
                    message_type=MessageType.text,
                    is_read=False,
                    created_at=datetime.now(timezone.utc),
                    updated_at=datetime.now(timezone.utc),
                )
                db.add(message)
                await db.commit()
                await manager.broadcast(
                    room_id,
                    {
                        "type": "message",
                        "message_id": message_id,
                        "room_id": room_id,
                        "sender_id": user_id,
                        "content": content,
                        "is_read": False,
                        "created_at": message.created_at.isoformat(),
                    },
                )
            elif msg_type == "read":
                message_id = data.get("message_id")
                if isinstance(message_id, str) and len(message_id) <= 50:
                    result = await db.execute(
                        update(DirectMessage)
                        .where(
                            DirectMessage.message_id == message_id,
                            DirectMessage.room_id == room_id,
                            DirectMessage.sender_id != user_id,
                        )
                        .values(is_read=True)
                    )
                    await db.commit()
                    if result.rowcount:
                        await manager.broadcast(
                            room_id, {"type": "read_receipt", "message_id": message_id}
                        )
            elif msg_type in ("typing", "stop_typing"):
                await manager.broadcast(
                    room_id,
                    {
                        "type": "typing",
                        "user_id": user_id,
                        "is_typing": msg_type == "typing",
                    },
                    exclude_user_id=user_id,
                )
            elif msg_type in ("ice_candidate", "sdp_offer", "sdp_answer"):
                await manager.broadcast(
                    room_id,
                    {
                        "type": msg_type,
                        "payload": data.get("payload"),
                        "sender_id": user_id,
                    },
                    exclude_user_id=user_id,
                )
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(room_id, websocket)
        await db.rollback()
        await manager.broadcast(
            room_id, {"type": "online", "users": manager.online_users(room_id)}
        )
