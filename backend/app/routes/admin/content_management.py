"""Content management endpoints and access checks."""

from fastapi import APIRouter, Depends, UploadFile, status

from sqlalchemy.ext.asyncio import AsyncSession
from app.database.postgres import get_db
from app.models import Admin
from app.schemas.disorders_schemas import (
    DisorderBulkCreateResponse,
    DisorderCreate,
    DisorderCreateResponse,
    DisordersListResponse,
    DisorderUpdate,
    DisorderUpdateResponse,
)
from app.services.admin import ContentManagementService
from app.utils.oauth import ensure_admin_user

router = APIRouter(prefix="/disorders", tags=["Content Management by Admins"])


def content_service(db: AsyncSession = Depends(get_db)) -> ContentManagementService:
    return ContentManagementService(db)


@router.post(
    "",
    response_model=DisorderCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add new disorder. Admin Authentication Required to access this route",
)
async def add_disorder(
    disorder_data: DisorderCreate,
    service: ContentManagementService = Depends(content_service),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await service.add_disorder(disorder_data)


@router.post(
    "/bulk",
    response_model=DisorderBulkCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Add new disorders in bulk using JSON file. Admin Authentication Required to access this route",
)
async def bulk_create_disorders(
    file: UploadFile,
    service: ContentManagementService = Depends(content_service),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await service.add_disorders_from_file(file)


@router.get(
    "",
    response_model=DisordersListResponse,
    status_code=status.HTTP_200_OK,
    summary="List all disorders",
)
async def list_disorders(
    service: ContentManagementService = Depends(content_service),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await service.get_all_disorders()


@router.patch(
    "/{disorder_id}",
    response_model=DisorderUpdateResponse,
    status_code=status.HTTP_200_OK,
    summary="Update disorder. Admin Authentication Required to access this route",
)
async def update_disorder(
    disorder_id: int,
    update_data: DisorderUpdate,
    service: ContentManagementService = Depends(content_service),
    current_admin: Admin = Depends(ensure_admin_user),
):
    return await service.update_disorder(disorder_id, update_data)
