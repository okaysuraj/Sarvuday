"""Shared identity for imported and newly created feature records."""

from uuid import uuid4

from sqlalchemy import Column, DateTime, String, func, text
from sqlalchemy.dialects.postgresql import JSONB


class RecordMixin:
    # Opaque strings preserve existing links; new records use UUIDs.
    id = Column(String(64), primary_key=True, default=lambda: uuid4().hex)
    created_at = Column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
    # Unmapped import fields are retained for reconciliation, never exposed by APIs.
    imported_data = Column(JSONB, nullable=False, server_default=text("'{}'::jsonb"))
