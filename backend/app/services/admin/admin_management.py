# app/services/admin/admin_management.py

from typing import Optional
from fastapi import HTTPException, status, UploadFile
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import Admin
from app.schemas import (
    AdminBase,
    AdminCreate,
    AdminCreateResponse,
    AdminUpdateRequest,
    AdminListResponse,
    AdminFilterQuery,
    AdminUpdateResponse
)

from app.utils.constants import UserTypeEnum, AdminRoleEnum
from app.utils.unique_id_generation import generate_user_id
from app.utils.file_utils import replace_uploaded_file, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES


class AdminManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_admin(self, admin_data: AdminCreate, created_by: Admin) -> AdminCreateResponse:
        """Handle admin registration"""
        self._validate_user_type(admin_data.user_type)

        if await self._get_admin_by_email(admin_data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        user_id = generate_user_id(admin_data.user_type.value)
        new_admin = self._build_admin(admin_data, user_id, created_by)

        self.db.add(new_admin)
        await self.db.commit()
        await self.db.refresh(new_admin)

        return AdminCreateResponse(
            status="success",
            message="Admin created successfully. Please login via Firebase SSO.",
            user=AdminBase.model_validate(new_admin)
        )

    async def get_admin_by_id(self, admin_id: str, current_admin: Admin) -> AdminBase:
        admin = await self._get_admin(admin_id)
        
        # If the requested admin is a super_admin, and the current admin is not super_admin -> Forbidden
        if admin.role == AdminRoleEnum.super_admin and current_admin.role != AdminRoleEnum.super_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this admin's details."
            )
        
        return AdminBase.model_validate(admin)

    async def get_all_admins(self, filters: AdminFilterQuery, current_admin: Admin) -> AdminListResponse:
        """Retrieve paginated list of admins with optional filtering and sorting"""
        try:
            query = select(Admin)

            # Exclude super_admins if current user is NOT super_admin
            if current_admin.role != AdminRoleEnum.super_admin:
                query = query.where(Admin.role != AdminRoleEnum.super_admin)

            query = self._apply_filters(query, filters)

            # Total count before pagination
            total_query = select(func.count()).select_from(query.subquery())
            total = (await self.db.execute(total_query)).scalar()

            # Sorting
            sort_column = getattr(Admin, filters.sort_by) if hasattr(Admin, filters.sort_by) else Admin.created_at
            sort_column = sort_column.desc() if filters.sort_order.lower() == "desc" else sort_column
            query = query.order_by(sort_column)

            # Pagination
            query = query.offset(filters.offset).limit(filters.limit)

            result = await self.db.execute(query)
            admins = result.scalars().all()

            return AdminListResponse(
                total=total,
                admins=[AdminBase.model_validate(admin) for admin in admins]
            )

        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to retrieve admins: {str(e)}"
            )

    async def update_admin(self, admin_id: str, update_data: AdminUpdateRequest, profile_pic: Optional[UploadFile] = None) -> AdminUpdateResponse:
        admin = await self._get_admin(admin_id)
        
        # Replace old profile picture if new one is provided
        if profile_pic:
            new_path = replace_uploaded_file(
                file=profile_pic,
                old_relative_path=admin.profile_pic,
                subdir="profile_pictures",
                allowed_types=ALLOWED_IMAGE_TYPES,
                label="profile picture",
                max_size=MAX_FILE_SIZE_BYTES
            )
            update_data.profile_pic = new_path

        for field, value in update_data.model_dump(exclude_unset=True).items():
            setattr(admin, field, value)

        try:
            await self.db.commit()
            await self.db.refresh(admin)
        except SQLAlchemyError as e:
            await self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Database update failed: {str(e)}"
            )

        return AdminUpdateResponse(
            message="Admin data updated successfully",
            admin=AdminBase.model_validate(admin)
        )

    async def delete_admin(self, user_id: str) -> None:
        admin = await self._get_admin(user_id)

        await self.db.delete(admin)
        await self.db.commit()
        await self.db.refresh(admin)

    # -------------------------
    # Private helper methods
    # -------------------------

    def _validate_user_type(self, user_type: UserTypeEnum) -> None:
        if user_type != UserTypeEnum.admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only Admin registration allowed by this route"
            )

    def _build_admin(self, admin_data: AdminCreate, user_id: str, created_by: Admin) -> Admin:
        """Construct an Admin ORM object"""
        return Admin(
            user_id=user_id,
            user_type=admin_data.user_type,
            email=admin_data.email,
            name=admin_data.name,
            phone_number=admin_data.phone_number,
            gender=admin_data.gender,
            is_approved=True,
            role=admin_data.role or AdminRoleEnum.moderator,
        )

    async def _get_admin_by_email(self, email: str) -> Admin:
        result = await self.db.execute(
            select(Admin).where(Admin.email == email)
        )
        return result.scalars().first()

    async def _get_admin(self, user_id: str) -> Admin:
        admin = await self.db.get(Admin, user_id)
        if not admin:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Admin not found"
            )
        return admin

    def _apply_filters(self, query, filters: AdminFilterQuery):
        """Apply filtering conditions dynamically"""
        if filters.user_id:
            query = query.where(Admin.user_id == filters.user_id)
        if filters.name:
            query = query.where(Admin.name.ilike(f"%{filters.name}%"))
        if filters.email:
            query = query.where(Admin.email.ilike(f"%{filters.email}%"))
        if filters.phone_number:
            query = query.where(Admin.phone_number.ilike(f"%{filters.phone_number}%"))
        if filters.gender:
            query = query.where(Admin.gender == filters.gender)
        if filters.role:
            query = query.where(Admin.role == filters.role)
        if filters.is_email_verified is not None:
            query = query.where(Admin.is_email_verified == filters.is_email_verified)
        if filters.is_phone_verified is not None:
            query = query.where(Admin.is_phone_verified == filters.is_phone_verified)
        if filters.is_approved is not None:
            query = query.where(Admin.is_approved == filters.is_approved)

        return query
