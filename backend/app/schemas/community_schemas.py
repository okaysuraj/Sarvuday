from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

class SupportGroupCreate(BaseModel):
    name: str
    description: str

class SupportGroupResponse(BaseModel):
    id: str
    name: str
    description: str
    member_count: int
    created_at: datetime

class PostCreate(BaseModel):
    content: str = Field(min_length=1, max_length=10000)
    is_anonymous: bool = False
    has_trigger_warning: bool = False
    group_id: str = Field(default="", max_length=24)

class PostInteract(BaseModel):
    action: Literal["hug", "relate", "like"]

class PostResponse(BaseModel):
    id: str
    group_id: str
    content: str
    is_anonymous: bool
    has_trigger_warning: bool
    likes: int
    hugs: int
    relates: int
    created_at: datetime
