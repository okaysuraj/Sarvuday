# app/core/lifespan.py



from contextlib import asynccontextmanager

from fastapi import FastAPI


from app.database import engine, Base, connect_to_mongo, close_mongo_connection
import firebase_admin
from firebase_admin import credentials
from app.config import settings



@asynccontextmanager

async def lifespan(app: FastAPI):

    """Handles startup/shutdown for DBs and models."""

    

    # MongoDB
    connect_to_mongo()

    # Firebase Admin SDK Initialization
    if not firebase_admin._apps:
        try:
            # Replace escaped newlines in the private key if any exist
            private_key = settings.firebase_private_key.replace('\\n', '\n')
            
            cred = credentials.Certificate({
                "type": "service_account",
                "project_id": settings.firebase_project_id,
                "private_key_id": settings.private_key_id,
                "private_key": private_key,
                "client_email": settings.firebase_client_email,
                "client_id": settings.client_id,
                "auth_uri": settings.auth_uri,
                "token_uri": settings.token_uri,
            })
            firebase_admin.initialize_app(cred)
            print("[SUCCESS] Firebase Admin SDK initialized.")
        except Exception as e:
            print(f"[ERROR] Failed to initialize Firebase Admin SDK: {e}")

    


    # PostgreSQL

    async with engine.begin() as conn:

        await conn.run_sync(Base.metadata.create_all)

    print("[SUCCESS] PostgreSQL tables created.")


    yield  # <-- app runs here



    # Shutdown tasks





    close_mongo_connection()

    


    print("[SUCCESS] Resources cleaned up.")



