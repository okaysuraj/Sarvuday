# app/models/base.py

from sqlalchemy import Column, TIMESTAMP, text, func

class BaseMixin:
    """Common columns for all tables except primary key"""
    
    created_at = Column(TIMESTAMP(timezone=True),
        server_default=text('CURRENT_TIMESTAMP'),
        nullable=False
    )
    
    updated_at = Column(TIMESTAMP(timezone=True),
        server_default=text('CURRENT_TIMESTAMP'),
        onupdate=func.now(),
        nullable=False
    )

