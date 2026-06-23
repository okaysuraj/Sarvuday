# app/models/events.py
from sqlalchemy import event
from datetime import datetime, timezone
from .base import Base

@event.listens_for(Base, 'before_update', propagate=True)
def update_timestamp(mapper, connection, target):
    target.updated_at = datetime.now(timezone.utc)
    
