"""Validate and maintain the published disorder catalog transactionally."""

import json

from fastapi import HTTPException, UploadFile
from pydantic import TypeAdapter, ValidationError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.content import Disorder
from app.schemas.records import record_fields
from app.schemas.disorders_schemas import (
    DisorderBulkCreateResponse,
    DisorderCreate,
    DisorderCreateResponse,
    DisordersListResponse,
    DisorderUpdate,
    DisorderUpdateResponse,
)
from app.utils.file_utils import MAX_FILE_SIZE_BYTES
from app.utils.unique_id_generation import generate_disorder_id

DISORDER_FIELDS = (
    "disorder_id",
    "disorder_title",
    "disorder_description",
    "symptoms",
    "preventions",
    "treatments",
    "best_advice",
)


class ContentManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def add_disorder(self, data: DisorderCreate) -> DisorderCreateResponse:
        record = Disorder(disorder_id=generate_disorder_id(), **data.model_dump())
        self.db.add(record)
        await self.db.commit()
        return DisorderCreateResponse(
            message="Disorder data added successfully", inserted_id=record.id
        )

    async def add_disorders_from_file(
        self, file: UploadFile
    ) -> DisorderBulkCreateResponse:
        contents = await file.read(MAX_FILE_SIZE_BYTES + 1)
        if len(contents) > MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=413, detail="The catalog file is too large."
            )
        try:
            records = TypeAdapter(list[DisorderCreate]).validate_python(
                json.loads(contents)
            )
        except (ValueError, UnicodeDecodeError, ValidationError) as exc:
            raise HTTPException(
                status_code=400,
                detail="Upload a JSON array containing valid disorder records.",
            ) from exc
        # Validate every row first, then commit all rows or none.
        rows = [
            Disorder(disorder_id=generate_disorder_id(), **record.model_dump())
            for record in records
        ]
        self.db.add_all(rows)
        await self.db.commit()
        identifiers = [row.id for row in rows]
        return DisorderBulkCreateResponse(
            message=f"Inserted {len(rows)} disorders",
            inserted_ids=identifiers,
            total_inserted=len(rows),
        )

    async def get_all_disorders(self) -> DisordersListResponse:
        records = list(
            await self.db.scalars(select(Disorder).order_by(Disorder.disorder_id))
        )
        return DisordersListResponse(
            total_count=len(records),
            disorders=[record_fields(row, *DISORDER_FIELDS) for row in records],
        )

    async def update_disorder(
        self, disorder_id: int, data: DisorderUpdate
    ) -> DisorderUpdateResponse:
        changes = data.model_dump(exclude_unset=True, exclude_none=True)
        if not changes:
            raise HTTPException(
                status_code=422, detail="Provide at least one field to update."
            )
        row = await self.db.scalar(
            select(Disorder)
            .where(Disorder.disorder_id == disorder_id)
            .with_for_update()
        )
        if row is None:
            raise HTTPException(status_code=404, detail="Disorder not found")
        modified = int(
            any(getattr(row, key) != value for key, value in changes.items())
        )
        for key, value in changes.items():
            setattr(row, key, value)
        await self.db.commit()
        return DisorderUpdateResponse(
            message="Disorder updated" if modified else "No changes made",
            modified_count=modified,
        )
