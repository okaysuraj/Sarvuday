"""Request validation and response models for community."""

from typing import Literal

from pydantic import BaseModel, Field


class PostCreate(BaseModel):
    content: str = Field(min_length=1, max_length=10000)
    is_anonymous: bool = False
    has_trigger_warning: bool = False
    group_id: str = Field(default="", max_length=64)


class PostInteract(BaseModel):
    action: Literal["hug", "relate", "like"]
