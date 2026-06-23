# app/models/base.py

from sqlalchemy import Column, TIMESTAMP
from datetime import datetime

class BaseMixin:
    """Common columns for all tables except primary key"""
    
    created_at = Column(
        TIMESTAMP,
        default=datetime.utcnow,
        nullable=False
    )
    
    updated_at = Column(
        TIMESTAMP,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

