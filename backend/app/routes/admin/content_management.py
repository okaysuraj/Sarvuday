# app/routes/admin/content_management.py

from fastapi import APIRouter, Depends, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import Admin
from app.utils.oauth import ensure_admin_user
from app.schemas import (
    DisorderCreate, 
    DisorderCreateResponse, 
    DisordersListResponse, 
    DisorderUpdate, 
    DisorderUpdateResponse, 
    DisorderBulkCreateResponse
)
from app.services.admin import ContentManagementService

router = APIRouter(prefix="/disorders", tags=["Content Management by Admins"])

@router.post("", response_model=DisorderCreateResponse, status_code=status.HTTP_201_CREATED, summary="Add new disorder. Admin Authentication Required to access this route")
async def add_disorder(
    disorder_data: DisorderCreate,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await ContentManagementService(db).add_disorder(disorder_data)


@router.post("/bulk", response_model=DisorderBulkCreateResponse, status_code=status.HTTP_201_CREATED, summary="Add new disorders in bulk using JSON file. Admin Authentication Required to access this route")
async def bulk_create_disorders(
    file: UploadFile,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    # TODO: File processing
    return await ContentManagementService(db).add_disorders_from_file(file)


@router.get("", response_model=DisordersListResponse, status_code=status.HTTP_200_OK, summary="List all disorders")
async def list_disorders(
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await ContentManagementService(db).get_all_disorders()

@router.patch("/{disorder_id}", response_model=DisorderUpdateResponse, status_code=status.HTTP_200_OK, summary="Update disorder. Admin Authentication Required to access this route")
async def update_disorder(
    disorder_id: str,
    update_data: DisorderUpdate,
    db: AsyncSession = Depends(get_db),
    current_admin: Admin = Depends(ensure_admin_user)
):
    return await ContentManagementService(db).update_disorder(disorder_id, update_data)