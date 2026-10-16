# app/database/mongo.py

import logging
from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger(__name__)

# Synchronous PyMongo client for legacy sync services
_client_options = dict(
    serverSelectionTimeoutMS=settings.mongo_timeout_ms,
    connectTimeoutMS=settings.mongo_timeout_ms,
    socketTimeoutMS=settings.database_statement_timeout_ms,
    waitQueueTimeoutMS=settings.mongo_timeout_ms,
    tz_aware=True,
)
sync_client = MongoClient(settings.mongo_uri, maxPoolSize=5, connect=False, **_client_options)
sync_mongo_db = sync_client[settings.mongo_db_name]

# Asynchronous Motor client for FastAPI async routes and dependency injection
client = AsyncIOMotorClient(settings.mongo_uri, maxPoolSize=settings.mongo_max_pool_size, **_client_options)
mongo_db = client[settings.mongo_db_name]

def get_mongo_db():
    """Returns the async Motor database for async FastAPI endpoints."""
    return mongo_db

def get_sync_mongo_db():
    """Returns the sync PyMongo database for synchronous services."""
    return sync_mongo_db

# Asynchronous collections (used with await)
chatbot_collection = mongo_db["chatbot_history"]
assessments_collection = mongo_db["assessments_data"]
users_scores_collection = mongo_db["users_scores"]
disorders_collection = mongo_db["disorders_data"]

# Synchronous collections
sync_chatbot_collection = sync_mongo_db["chatbot_history"]
sync_assessments_collection = sync_mongo_db["assessments_data"]
sync_users_scores_collection = sync_mongo_db["users_scores"]
sync_disorders_collection = sync_mongo_db["disorders_data"]

async def connect_to_mongo():
    await mongo_db.command("ping")
    logger.info("MongoDB connection verified")

def close_mongo_connection():
    try:
        client.close()
        sync_client.close()
        logger.info("MongoDB connection closed")
    except Exception as e:
        logger.error(f"Error closing MongoDB connection: {e}")
