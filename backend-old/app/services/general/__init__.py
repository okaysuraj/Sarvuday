# app/services/general/__init__.py

from .general_service import DisordersService
from .counsellors_service import CounsellorService

__all__ = [
    "DisordersService",
    "CounsellorService",
]