from pydantic import BaseModel
from typing import List, Optional
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
    content: str
    is_anonymous: Optional[bool] = False
    has_trigger_warning: Optional[bool] = False
    group_id: Optional[str] = ""

class PostInteract(BaseModel):
    action: str  # "hug", "relate", "like"

class PostResponse(BaseModel):
    id: str
    group_id: str
    user_id: str
    content: str
    is_anonymous: bool
    has_trigger_warning: bool
    likes: int
    hugs: int
    relates: int
    created_at: datetime
