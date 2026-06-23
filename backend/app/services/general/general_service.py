# app/services/disorders_services.py

from fastapi import HTTPException
from app.database import disorders_collection
from app.schemas import DisordersListResponse


class DisordersService:
    
    @classmethod
    def fetch_disorders_data(cls) -> DisordersListResponse:

        disorders_cursor = disorders_collection.find()
        disorders = list(disorders_cursor)
        total_count = len(disorders)

        if not disorders:
            raise HTTPException(status_code=404, detail="No disorders found.")

        # Optional cleanup: convert ObjectId to string and remove Mongo _id
        for disorder in disorders:
            disorder.pop("_id", None)

        return DisordersListResponse(
            total_count=total_count,
            disorders=disorders
        )