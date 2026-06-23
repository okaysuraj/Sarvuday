# app/services/admin/content_management.py

from sqlalchemy.ext.asyncio import AsyncSession
from app.database import disorders_collection
from fastapi import HTTPException, status, UploadFile
from app.utils.unique_id_generation import get_next_disorder_id
import json
from app.schemas import (
    DisorderCreate,
    DisorderCreateResponse,
    DisordersListResponse,
    DisorderUpdate,
    DisorderUpdateResponse,
    DisorderBase,
    DisorderBulkCreateResponse
)

class ContentManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def add_disorder(
        self,
        disorder_data: DisorderCreate,
    ) -> DisorderCreateResponse:
        try:
            # Generate the disorder_id
            disorder_id = await get_next_disorder_id()
            
            # Create complete document with generated ID
            complete_data = {
                "disorder_id": disorder_id,
                **disorder_data.model_dump()
            }
            
            result = disorders_collection.insert_one(complete_data)
            return DisorderCreateResponse(
                message="Disorder Data Added Successfully",
                inserted_id=str(result.inserted_id)
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"MongoDB insertion failed: {str(e)}"
            )

    async def add_disorders_from_file(
        self,
        file: UploadFile,
    ) -> DisorderBulkCreateResponse:
        try:
            contents = await file.read()
            disorders_list = json.loads(contents)
            
            if not isinstance(disorders_list, list):
                raise ValueError("File should contain a JSON array of disorders")
            
            # Get starting ID
            last_disorder = disorders_collection.find_one(
                {},
                sort=[("disorder_id", -1)]
            )
            start_num = 1
            if last_disorder and "disorder_id" in last_disorder:
                start_num = int(last_disorder["disorder_id"].split("_")[1]) + 1
            
            # Prepare documents with generated IDs
            documents = []
            for i, disorder_data in enumerate(disorders_list):
                try:
                    validated_data = DisorderCreate(**disorder_data)
                    documents.append({
                        "disorder_id": f"disorder_{start_num + i}",
                        **validated_data.model_dump()
                    })
                except Exception as e:
                    raise ValueError(f"Invalid disorder data at index {i}: {str(e)}")
            
            # Bulk insert
            if documents:
                result = disorders_collection.insert_many(documents)
                return DisorderBulkCreateResponse(
                    message=f"Successfully inserted {len(documents)} disorders",
                    inserted_ids=[str(id) for id in result.inserted_ids],
                    total_inserted=len(documents)
                )
            return DisorderBulkCreateResponse(
                message="No valid disorders found in file",
                inserted_ids=[],
                total_inserted=0
            )
            
        except ValueError as ve:
            raise HTTPException(status_code=400, detail=str(ve))
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Bulk insertion failed: {str(e)}"
            )
            
    async def get_all_disorders(self) -> DisordersListResponse:
        try:
            disorders_cursor = disorders_collection.find()
            disorders = list(disorders_cursor)
            return DisordersListResponse(
                total_count=len(disorders),
                disorders=[DisorderBase.model_validate(disorder) for disorder in disorders]
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"MongoDB retrieval failed: {str(e)}"
            )
        

    async def update_disorder(
        self,
        disorder_id: str,
        update_data: DisorderUpdate
    ) -> DisorderUpdateResponse:
        try:
            # Ensure disorder_id is used for the filter (and _id for MongoDB)
            result = disorders_collection.update_one(
                {"disorder_id": disorder_id},  # Use your custom disorder_id
                {"$set": update_data.model_dump(exclude_unset=True)}  # Use model_dump for dict conversion
            )
            return DisorderUpdateResponse(
                message="Disorder Data Updated Successfully" if result.modified_count > 0 else "No changes made",
                modified_count=result.modified_count
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"MongoDB update failed: {str(e)}"
            )