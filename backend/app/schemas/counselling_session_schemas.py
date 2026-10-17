"""Request validation and response models for counselling session."""

from pydantic import BaseModel


class CounsellingSessionJoinResponse(BaseModel):
    message: str
    video_url: str
    token: str
