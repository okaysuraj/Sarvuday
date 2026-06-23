# app/services/counsellor/counsellor_management_service.py

from fastapi import HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.models import Counsellor
from app.schemas import (
    CounsellorBase, 
    CounsellorUpdateRequest, 
    CounsellorUpdateResponse,
    CounsellorDashboardView
)
from typing import Optional
from app.utils.file_utils import replace_uploaded_file, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES

class CounsellorManagementService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_dashboard_data(self, counsellor_id: str) -> CounsellorDashboardView:
        """Get counsellor dashboard summary"""
        result = await self.db.execute(
            select(Counsellor).where(Counsellor.user_id == counsellor_id)
        )
        counsellor = result.scalars().first()
        
        if not counsellor:
            return None
            
        return CounsellorDashboardView(
            upcoming_appointments=0,
            total_sessions=0,
            recent_payments=0,
            completion_rate=0,
            average_rating=0,
            profile_completion=self._calculate_profile_completion(counsellor),
            revenue=0,
        )

    async def get_profile(self, counsellor_id: str) -> Optional[CounsellorBase]:
        """Get counsellor profile"""
        result = await self.db.execute(
            select(Counsellor).where(Counsellor.user_id == counsellor_id)
        )
        counsellor = result.scalars().first()
        return counsellor

    async def update_profile(
        self, 
        counsellor_id: str, 
        update_data: CounsellorUpdateRequest,
        profile_pic: Optional[UploadFile] = None
    ) -> CounsellorUpdateResponse:
        counsellor = await self._get_counsellor(counsellor_id)

        # Replace old profile picture if new one is provided
        if profile_pic:
            new_path = replace_uploaded_file(
                file=profile_pic,
                old_relative_path=counsellor.profile_pic,
                subdir="profile_pictures",
                allowed_types=ALLOWED_IMAGE_TYPES,
                label="profile picture",
                max_size=MAX_FILE_SIZE_BYTES
            )
            update_data.profile_pic = new_path

        for field, value in update_data.model_dump(exclude_unset=True).items():
            setattr(counsellor, field, value)

        self.db.add(counsellor)
        await self.db.commit()
        await self.db.refresh(counsellor)

        return CounsellorUpdateResponse(
            message="Data Updated successfully",
            counsellor=CounsellorBase.model_validate(counsellor)
        )

    async def delete_account(self, user_id: str) -> bool:
        """Soft delete counsellor account"""
        counsellor = await self._get_counsellor(user_id)
        
        await self.db.delete(counsellor)
        await self.db.commit()
        await self.db.refresh(counsellor)
        
        return None
    
    async def _get_counsellor(self, user_id: str) -> Counsellor:
        """Internal method to get user or raise 404"""
        counsellor = await self.db.get(Counsellor, user_id)
        if not counsellor:
            raise HTTPException(status_code=404, detail="Counsellor not found")
        return counsellor

    def _calculate_profile_completion(self, counsellor: Counsellor) -> float:
        """Calculate profile completion percentage"""
        required_fields = [
            'email', 'phone_number', 'hashed_password', 'name', 'gender', 'profile_pic', 'bio', 'education_qualifications', 'certifications', 
            'specializations',  'license_number', 'license_issuing_authority', 'license_expiry_date', 'identity_proof_url', 'license_proof_url', 'session_fee', 'session_duration', 'experience_years', 'languages', 'country', 'state', 'city', 'address', 'pincode', 'terms_accepted', 'privacy_policy_accepted'
        ]
        completed = sum(
            1 for field in required_fields 
            if getattr(counsellor, field) not in [None, ""]
        )
        return (completed / len(required_fields)) * 100