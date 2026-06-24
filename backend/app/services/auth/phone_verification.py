import random
from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas import StatusResponse
from app.config import settings



class PhoneVerificationService:

    @staticmethod
    async def generate_and_store_otp(user, phone_number: str) -> StatusResponse:
        otp = str(random.randint(100000, 999999))

        
        # Simulate sending OTP (replace with actual SMS logic)
        print(f"DEBUG OTP for {phone_number}: {otp}")
        
        return StatusResponse(
            status="success",
            message="OTP sent to your phone number."
        )

    @staticmethod
    async def verify_and_mark(user, submitted_otp: str, db: AsyncSession) -> StatusResponse:


        # if not stored_otp or stored_otp != submitted_otp:
        #     return PhoneVerificationResponse(
        #         status="failed",
        #         message="Invalid or expired OTP."
        #     )



        user.is_phone_verified = True
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return StatusResponse(
            status="success",
            message="Phone number verified successfully."
        )
