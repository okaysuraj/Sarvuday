"""Consistent, non-null page bounds for administrative searches."""

from typing import Literal

from pydantic import BaseModel, Field


class Pagination(BaseModel):
    sort_order: Literal["asc", "desc"] = "desc"
    limit: int = Field(default=10, ge=1, le=100)
    offset: int = Field(default=0, ge=0)
