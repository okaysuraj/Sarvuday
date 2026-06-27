import json
from uuid import uuid4
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, update
from typing import Dict
from datetime import datetime, timezone

from app.database import get_db
from app.models.chat import DirectMessage, MessageType
from app.models.sessions import CounsellingSession
from app.models.users import NormalUser, Counsellor
from app.utils.constants import UserTypeEnum
from app.utils.oauth import MODEL_MAP, verify_access_token

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        # room_id -> { user_id: WebSocket }
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = {}
        self.active_connections[room_id][user_id] = websocket
        
        # Broadcast online users
        online_users = [{"user_id": uid} for uid in self.active_connections[room_id].keys()]
        await self.broadcast(room_id, {"type": "online", "users": online_users})

    def disconnect(self, room_id: str, user_id: str):
        if room_id in self.active_connections and user_id in self.active_connections[room_id]:
            del self.active_connections[room_id][user_id]
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]
            else:
                # Need to broadcast async if we want to update online users, but disconnect is sync here
                pass

    async def broadcast(self, room_id: str, message: dict):
        if room_id in self.active_connections:
            for uid, connection in list(self.active_connections[room_id].items()):
                try:
                    await connection.send_json(message)
                except Exception:
                    self.disconnect(room_id, uid)
                
    async def broadcast_except(self, room_id: str, message: dict, exclude_user_id: str):
        if room_id in self.active_connections:
            for uid, connection in list(self.active_connections[room_id].items()):
                if uid != exclude_user_id:
                    try:
                        await connection.send_json(message)
                    except Exception:
                        self.disconnect(room_id, uid)

manager = ConnectionManager()

def generate_room_id(user1: str, user2: str) -> str:
    """Generate a consistent room ID regardless of user order."""
    sorted_ids = sorted([user1, user2])
    return f"ROOM-{sorted_ids[0]}-{sorted_ids[1]}"

@router.get("/rooms", status_code=status.HTTP_200_OK, summary="Get chat rooms")
async def get_chat_rooms(
    user_id: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    # We will find all counselling sessions for this user_id
    # The user could be either a NormalUser or a Counsellor
    sessions_query = select(CounsellingSession).where(
        or_(
            CounsellingSession.user_id == user_id,
            CounsellingSession.counsellor_id == user_id
        )
    )
    result = await db.execute(sessions_query)
    sessions = result.scalars().all()
    
    rooms = {}
    
    for session in sessions:
        other_user_id = session.counsellor_id if session.user_id == user_id else session.user_id
        other_user_type = UserTypeEnum.counsellor if session.user_id == user_id else UserTypeEnum.normal_user
        
        room_id = generate_room_id(user_id, other_user_id)
        
        if room_id not in rooms:
            # Fetch the name of the other user
            if other_user_type == UserTypeEnum.counsellor:
                c_res = await db.execute(select(Counsellor).where(Counsellor.user_id == other_user_id))
                other_user = c_res.scalar_one_or_none()
            else:
                u_res = await db.execute(select(NormalUser).where(NormalUser.user_id == other_user_id))
                other_user = u_res.scalar_one_or_none()
                
            name = other_user.name if other_user else "Unknown User"
            
            # Count unseen messages
            unseen_query = select(DirectMessage).where(
                and_(
                    DirectMessage.room_id == room_id,
                    DirectMessage.sender_id != user_id,
                    DirectMessage.is_read == False
                )
            )
            unseen_res = await db.execute(unseen_query)
            unseen_count = len(unseen_res.scalars().all())
            
            # Get last message
            last_msg_query = select(DirectMessage).where(DirectMessage.room_id == room_id).order_by(DirectMessage.created_at.desc()).limit(1)
            last_msg_res = await db.execute(last_msg_query)
            last_msg = last_msg_res.scalar_one_or_none()
            
            rooms[room_id] = {
                "room_id": room_id,
                "other_user_id": other_user_id,
                "other_user_name": name,
                "other_user_type": other_user_type.value,
                "unread_count": unseen_count,
                "last_message": last_msg.content if last_msg else None,
                "last_message_time": last_msg.created_at.isoformat() if last_msg else None
            }
            
    return {"rooms": list(rooms.values())}

@router.get("/rooms/{room_id}/messages", status_code=status.HTTP_200_OK, summary="Get chat history")
async def get_chat_history(
    room_id: str,
    limit: int = Query(100),
    db: AsyncSession = Depends(get_db)
):
    query = select(DirectMessage).where(DirectMessage.room_id == room_id).order_by(DirectMessage.created_at.asc()).limit(limit)
    result = await db.execute(query)
    messages = result.scalars().all()
    
    return {
        "messages": [
            {
                "message_id": m.message_id,
                "room_id": m.room_id,
                "sender_id": m.sender_id,
                "content": m.content,
                "is_read": m.is_read,
                "created_at": m.created_at.isoformat()
            }
            for m in messages
        ]
    }

from pydantic import BaseModel
from typing import Optional

class MessageCreate(BaseModel):
    message_id: Optional[str] = None
    content: str
    sender_type: str
    message_type: str = "text"

@router.post("/rooms/{room_id}/messages", status_code=status.HTTP_201_CREATED, summary="Save message via REST")
async def create_message(
    room_id: str,
    message: MessageCreate,
    user_id: str = Query(...),
    db: AsyncSession = Depends(get_db)
):
    message_id = message.message_id if message.message_id else f"MSG-{uuid4().hex[:8]}"
    new_msg = DirectMessage(
        message_id=message_id,
        room_id=room_id,
        sender_id=user_id,
        sender_type=message.sender_type,
        content=message.content,
        message_type=MessageType.text,
        is_read=False,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc)
    )
    db.add(new_msg)
    await db.commit()
    
    # Broadcast to websocket if any users are connected via websocket fallback
    broadcast_data = {
        "type": "message",
        "message_id": message_id,
        "room_id": room_id,
        "sender_id": user_id,
        "content": new_msg.content,
        "is_read": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await manager.broadcast(room_id, broadcast_data)
    
    return {"status": "success", "message_id": message_id}

@router.websocket("/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, token: str = Query(None), db: AsyncSession = Depends(get_db)):
    if not token:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
        
    try:
        payload = verify_access_token(token)
        user_id = payload["sub"]
        user_type = UserTypeEnum(payload["user_type"])
        model = MODEL_MAP[user_type]
        result = await db.execute(select(model).where(model.user_id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
    except Exception:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    
    await manager.connect(websocket, room_id, user_id)
    try:
        while True:
            data_str = await websocket.receive_text()
            data = json.loads(data_str)
            
            msg_type = data.get("type")
            
            if msg_type == "message":
                # Save to database
                message_id = f"MSG-{uuid4().hex[:8]}"
                new_msg = DirectMessage(
                    message_id=message_id,
                    room_id=room_id,
                    sender_id=user_id,
                    sender_type=user.user_type.value,
                    content=data.get("content"),
                    message_type=MessageType.text,
                    is_read=False,
                    created_at=datetime.now(timezone.utc),
                    updated_at=datetime.now(timezone.utc)
                )
                db.add(new_msg)
                await db.commit()
                
                broadcast_data = {
                    "type": "message",
                    "message_id": message_id,
                    "room_id": room_id,
                    "sender_id": user_id,
                    "content": new_msg.content,
                    "is_read": False,
                    "created_at": datetime.now(timezone.utc).isoformat()
                }
                await manager.broadcast(room_id, broadcast_data)
                
            elif msg_type == "read":
                msg_id = data.get("message_id")
                # Update database
                query = update(DirectMessage).where(DirectMessage.message_id == msg_id).values(is_read=True)
                await db.execute(query)
                await db.commit()
                
                await manager.broadcast(room_id, {"type": "read_receipt", "message_id": msg_id})
                
            elif msg_type in ["typing", "stop_typing"]:
                await manager.broadcast_except(room_id, {
                    "type": "typing",
                    "user_id": user_id,
                    "is_typing": (msg_type == "typing")
                }, exclude_user_id=user_id)
                
            elif msg_type in ["ice_candidate", "sdp_offer", "sdp_answer"]:
                # Relay WebRTC signaling to other user
                await manager.broadcast_except(room_id, {
                    "type": msg_type,
                    "payload": data.get("payload"),
                    "sender_id": user_id
                }, exclude_user_id=user_id)
                
    except WebSocketDisconnect:
        manager.disconnect(room_id, user_id)
        # Notify others
        online_users = [{"user_id": uid} for uid in manager.active_connections.get(room_id, {}).keys()]
        await manager.broadcast(room_id, {"type": "online", "users": online_users})
