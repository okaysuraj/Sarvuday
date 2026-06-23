# app/integrations/daily_service.py

from fastapi import HTTPException
import httpx
from datetime import datetime, timezone, timedelta
from app.config import settings

DAILY_BASE_URL = settings.daily_base_url
DAILY_API_KEY = settings.daily_api_key

class DailyService:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json"
        }

    async def create_room(self, name: str, scheduled_start_time: datetime, scheduled_end_time: datetime) -> dict:
        """Create a Daily room valid from scheduled time for given duration."""
        room_expires_at = scheduled_end_time - timedelta(minutes=10)
        expires_at_unix = int(room_expires_at.timestamp())

        payload = {
            "name": name,
            "privacy": "private",
            "properties": {
                "exp": expires_at_unix,
                "start_video_off": True,
                "start_audio_off": True,
            }
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(f"{DAILY_BASE_URL}/rooms", headers=self.headers, json=payload)

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to create video room.")

        return response.json()


    async def create_token(self, room_name: str, user_id: str, scheduled_start_time: datetime, scheduled_end_time: datetime) -> str:
        """Create a token to join the specified Daily room."""
        room_expires_at = scheduled_end_time - timedelta(minutes=10)
        expires_at_unix = int(room_expires_at.timestamp())

        payload = {
            "properties": {
                "room_name": room_name,
                "user_name": user_id,
                "is_owner": False,
                "enable_screenshare": True,
                "exp": expires_at_unix
            },
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(f"{DAILY_BASE_URL}/meeting-tokens", headers=self.headers, json=payload)

        if response.status_code not in (200, 201):
            print(response.text)
            raise HTTPException(status_code=500, detail="Failed to generate meeting token.")

        return response.json()["token"]
    

    async def delete_room(room_name: str):
        headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json"
        }
        async with httpx.AsyncClient() as client:
            response = await client.delete(f"{DAILY_BASE_URL}/rooms/{room_name}", headers=headers)
            if response.status_code == 200:
                return True
            else:
                return False
            
    async def delete_rooms(room_names: list):
        headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {"room_names": room_names}
        async with httpx.AsyncClient() as client:
            response = await client.delete(f"{DAILY_BASE_URL}/batch/rooms", headers=headers, json=payload)
            if response.status_code == 200:
                return True
            else:
                return False

                
        


