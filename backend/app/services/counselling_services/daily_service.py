"""Daily service business logic and persistence."""

from datetime import datetime, timezone

import httpx
from fastapi import HTTPException

from app.config import settings

DAILY_BASE_URL = settings.daily_base_url
DAILY_API_KEY = settings.daily_api_key


class DailyService:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json",
        }

    async def create_room(
        self, name: str, scheduled_start_time: datetime, scheduled_end_time: datetime
    ) -> dict:
        """Create a Daily room valid from scheduled time for given duration."""
        if not DAILY_API_KEY:
            raise HTTPException(
                status_code=503, detail="Video consultation service is not configured"
            )
        room_expires_at = (
            scheduled_end_time.replace(tzinfo=timezone.utc)
            if scheduled_end_time.tzinfo is None
            else scheduled_end_time
        )
        expires_at_unix = int(room_expires_at.timestamp())

        payload = {
            "name": name,
            "privacy": "private",
            "properties": {
                "exp": expires_at_unix,
                "start_video_off": True,
                "start_audio_off": True,
            },
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{DAILY_BASE_URL}/rooms", headers=self.headers, json=payload
            )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to create video room.")

        return response.json()

    async def create_token(
        self,
        room_name: str,
        user_id: str,
        scheduled_start_time: datetime,
        scheduled_end_time: datetime,
    ) -> str:
        """Create a token to join the specified Daily room."""
        if not DAILY_API_KEY:
            raise HTTPException(
                status_code=503, detail="Video consultation service is not configured"
            )
        room_expires_at = (
            scheduled_end_time.replace(tzinfo=timezone.utc)
            if scheduled_end_time.tzinfo is None
            else scheduled_end_time
        )
        expires_at_unix = int(room_expires_at.timestamp())

        payload = {
            "properties": {
                "room_name": room_name,
                "user_name": user_id,
                "user_id": user_id,
                "nbf": int(
                    (
                        scheduled_start_time.replace(tzinfo=timezone.utc)
                        if scheduled_start_time.tzinfo is None
                        else scheduled_start_time
                    ).timestamp()
                ),
                "is_owner": False,
                "enable_screenshare": True,
                "exp": expires_at_unix,
            },
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{DAILY_BASE_URL}/meeting-tokens", headers=self.headers, json=payload
            )

        if response.status_code not in (200, 201):
            raise HTTPException(
                status_code=500, detail="Failed to generate meeting token."
            )

        return response.json()["token"]

    async def delete_room(self, room_name: str):
        headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json",
        }
        async with httpx.AsyncClient() as client:
            response = await client.delete(
                f"{DAILY_BASE_URL}/rooms/{room_name}", headers=headers
            )
            if response.status_code in (200, 204, 404):
                return True
            else:
                return False

    async def delete_rooms(self, room_names: list):
        # httpx.delete does not accept json; use the supported per-room API.
        for room_name in room_names:
            if not await self.delete_room(room_name):
                return False
        return True
