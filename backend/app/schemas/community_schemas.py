"""Request validation and response models for community."""

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class PostCreate(BaseModel):
    content: str = Field(min_length=1, max_length=10000)
    is_anonymous: bool = False
    has_trigger_warning: bool = False
    group_id: str = Field(default="", max_length=64)


class PostInteract(BaseModel):
    action: Literal["hug", "relate", "like"]


class SupportGroupResponse(BaseModel):
    id: str
    name: str
    description: str
    member_count: int
    created_at: datetime


class CommunityPostResponse(BaseModel):
    id: str
    group_id: str
    content: str
    is_anonymous: bool
    has_trigger_warning: bool
    likes: int
    hugs: int
    relates: int
    created_at: datetime
