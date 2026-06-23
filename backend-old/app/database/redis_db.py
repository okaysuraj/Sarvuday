# # app/database/redis_db.py

# from redis import Redis
# from app.config import settings

# password = settings.redis_password
# host = settings.redis_host
# port = settings.redis_port

# redis_client = Redis(
#     host=host,
#     port=port,
#     decode_responses=True,
#     username="default",
#     password=password,
# )

# success = redis_client.set('foo', 'bar')
# # True

# result = redis_client.get('foo')
# print(result)
# # >>> bar

# async def connect_to_redis():
#     try:
#         print("Testing Redis connection...")
#         redis_client.ping()
#         print("✅ Redis is reachable")
#     except Exception as e:
#         print("❌ Redis connection failed:", e)
#         raise e

# async def close_redis_connection():
#     if redis_client:
#         redis_client.close()
#         print("✅ Redis connection closed")
