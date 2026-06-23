# app/schemas/counselling_session_schemas.py

from pydantic import BaseModel

class CounsellingSessionJoinResponse(BaseModel):
    message: str
    video_url: str
    token: str