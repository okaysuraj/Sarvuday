# app/database/mysql.py
# Deprecated: PostgreSQL is the primary relational database for SurvUday.
from app.database.postgres import engine, Base, async_session, get_db

__all__ = ["engine", "Base", "async_session", "get_db"]