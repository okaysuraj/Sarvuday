# app/routes/ws_chat.py
# Production WebSocket endpoint for real-time user <-> counsellor messaging.

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from sqlalchemy import select, and_, or_
from jose import jwt, JWTError
from datetime import datetime
from typing import Dict, List
import json

from app.database.postgres import SessionLocal
from app.config import settings
from app.models.sessions.direct_message import DirectMessage, MessageType
from pydantic import BaseModel

class ChatMessageCreate(BaseModel):
    content: str
    sender_type: str
    message_type: str = "text"

ws_router = APIRouter()


import asyncio
from app.database.redis_db import redis_client

class ConnectionManager:
    """Manages active WebSocket connections per chat room using Redis Pub/Sub."""

    def __init__(self):
        # Local connections: room_id -> list of (websocket, user_id, user_type)
        self.active_connections: Dict[str, List[tuple]] = {}
        # PubSub tasks: room_id -> asyncio.Task
        self.pubsub_tasks: Dict[str, asyncio.Task] = {}

    async def connect(self, websocket: WebSocket, room_id: str, user_id: str, user_type: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
            
            # Start listening to this room's Redis channel
            self.pubsub_tasks[room_id] = asyncio.create_task(
                        u = db.query(NormalUser).filter(NormalUser.user_id == other_id).first()
                        if u: name = u.name
                    rooms_dict[room_id] = {
                        "other_user_name": name,
                        "other_user_id": other_id,
                        "other_user_pic": None
                    }
                except Exception:
                    rooms_dict[room_id] = {
                        "other_user_name": "Unknown",
                        "other_user_id": "Unknown",
                        "other_user_pic": None
                    }

        result = []
        for room_id, meta in rooms_dict.items():
            last_msg = db.query(DirectMessage).filter(
                DirectMessage.room_id == room_id
            ).order_by(DirectMessage.created_at.desc()).first()

            unread_count = db.query(func.count(DirectMessage.message_id)).filter(
                DirectMessage.room_id == room_id,
                DirectMessage.sender_id != user_id,
                DirectMessage.is_read == False
            ).scalar()

            result.append({
                "room_id": room_id,
                "other_user_name": meta["other_user_name"],
                "other_user_id": meta["other_user_id"],
                "other_user_pic": meta["other_user_pic"],
                "last_message": last_msg.content[:50] if last_msg else "Start a conversation",
                "last_message_at": last_msg.created_at.isoformat() if last_msg else None,
                "unread_count": unread_count or 0
            })

        result.sort(key=lambda x: x["last_message_at"] or "0000-00-00T00:00:00", reverse=True)
        return {"rooms": result}
    finally:
        db.close()

