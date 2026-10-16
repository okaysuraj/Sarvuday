# app/database/__init__.py

from .postgres import engine, async_session, Base, get_db
from .mongo import (
    chatbot_collection, assessments_collection, users_scores_collection, disorders_collection,
    sync_chatbot_collection, sync_assessments_collection, sync_users_scores_collection, sync_disorders_collection,
    connect_to_mongo, close_mongo_connection, get_mongo_db, get_sync_mongo_db
)


__all__ = [
    "engine",
    "async_session",
    "Base",
    "get_db",
    
    # MongoDB Async
    "chatbot_collection",
    "assessments_collection",
    "users_scores_collection",
    "disorders_collection",
    "connect_to_mongo",
    "close_mongo_connection",
    "get_mongo_db",

    # MongoDB Sync
    "sync_chatbot_collection",
    "sync_assessments_collection",
    "sync_users_scores_collection",
    "sync_disorders_collection",
    "get_sync_mongo_db",
]