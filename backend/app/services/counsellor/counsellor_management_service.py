"""Counsellor management service business logic and persistence."""

from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import HTTPException, UploadFile
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import (
    Appointment,
    CounsellingSession,
    Counsellor,
    CounsellorAvailability,
    CounsellorPayment,
)
from app.schemas.counsellors_schemas import (
    CounsellorBase,
    CounsellorDashboardView,
    CounsellorUpdateRequest,
    CounsellorUpdateResponse,
)
from app.utils.constants import AppointmentStatusEnum, CounsellorPayoutStatusEnum
from app.utils.file_utils import (
    ALLOWED_IMAGE_TYPES,
    MAX_FILE_SIZE_BYTES,
    replace_uploaded_file,
)


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
            raise HTTPException(status_code=404, detail="Counsellor not found")
        now = datetime.now(timezone.utc)
        # Scheduling columns currently hold UTC timestamps without an offset.
        upcoming = (
            await self.db.execute(
                select(func.count())
                .select_from(Appointment)
                .join(
                    CounsellorAvailability,
                    Appointment.availability_slot_id
                    == CounsellorAvailability.availability_slot_id,
                )
                .where(
                    Appointment.counsellor_id == counsellor_id,
                    Appointment.status.in_(
                        [AppointmentStatusEnum.pending, AppointmentStatusEnum.confirmed]
                    ),
                    CounsellorAvailability.start_time > now.replace(tzinfo=None),
                )
            )
        ).scalar_one()
        counts = (
            await self.db.execute(
                select(
                    func.count(Appointment.appointment_id),
                    func.count(Appointment.appointment_id).filter(
                        Appointment.status == AppointmentStatusEnum.completed
                    ),
                ).where(Appointment.counsellor_id == counsellor_id)
            )
        ).one()
        payouts = (
            await self.db.execute(
                select(
                    func.coalesce(func.sum(CounsellorPayment.net_payout_amount), 0),
                    func.count(CounsellorPayment.payment_id).filter(
                        CounsellorPayment.payout_date >= now - timedelta(days=30)
                    ),
                ).where(
                    CounsellorPayment.counsellor_id == counsellor_id,
                    CounsellorPayment.status == CounsellorPayoutStatusEnum.completed,
                )
            )
        ).one()
        rating = (
            await self.db.execute(
                select(func.avg(CounsellingSession.rating)).where(
                    CounsellingSession.counsellor_id == counsellor_id
                )
            )
        ).scalar_one()
        return CounsellorDashboardView(
            upcoming_appointments=upcoming,
            total_sessions=counts[1],
            recent_payments=payouts[1],
            completion_rate=round(counts[1] * 100 / counts[0], 2) if counts[0] else 0,
            average_rating=float(rating) if rating is not None else None,
            profile_completion=self._calculate_profile_completion(counsellor),
            revenue=float(payouts[0]),
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
        profile_pic: Optional[UploadFile] = None,
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
                max_size=MAX_FILE_SIZE_BYTES,
            )
            update_data.profile_pic = new_path

        for field, value in update_data.model_dump(exclude_unset=True).items():
            setattr(counsellor, field, value)

        self.db.add(counsellor)
        await self.db.commit()
        await self.db.refresh(counsellor)

        return CounsellorUpdateResponse(
            message="Data Updated successfully",
            counsellor=CounsellorBase.model_validate(counsellor),
        )

    async def delete_account(self, user_id: str) -> bool:
        raise HTTPException(
            status_code=503,
            detail="Account erasure is unavailable until retention and audit workflows are configured.",
        )

    async def _get_counsellor(self, user_id: str) -> Counsellor:
        """Internal method to get user or raise 404"""
        counsellor = await self.db.get(Counsellor, user_id)
        if not counsellor:
            raise HTTPException(status_code=404, detail="Counsellor not found")
        return counsellor

    def _calculate_profile_completion(self, counsellor: Counsellor) -> float:
        """Calculate profile completion percentage"""
        required_fields = [
            "email",
            "phone_number",
            "name",
            "gender",
            "profile_pic",
            "bio",
            "education_qualifications",
            "certifications",
            "specializations",
            "license_number",
            "license_issuing_authority",
            "license_expiry_date",
            "identity_proof_url",
            "license_proof_url",
            "session_fee",
            "session_duration",
            "experience_years",
            "languages",
            "country",
            "state",
            "city",
            "address",
            "pincode",
            "terms_accepted",
            "privacy_policy_accepted",
        ]
        completed = sum(
            1
            for field in required_fields
            if getattr(counsellor, field) not in [None, ""]
        )
        return (completed / len(required_fields)) * 100
