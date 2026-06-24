import random
from sqlalchemy.ext.asyncio import AsyncSession
# from app.database.redis_db import redis_client
from app.schemas import StatusResponse
from app.config import settings

REDIS_OTP_EXPIRY_SECONDS = settings.redis_otp_expiry_seconds

class PhoneVerificationService:

    @staticmethod
    async def generate_and_store_otp(user, phone_number: str) -> StatusResponse:
        otp = str(random.randint(100000, 999999))
        redis_key = f"phone_verify:{user.user_id}"
        # await redis_client.set(redis_key, otp, ex=REDIS_OTP_EXPIRY_SECONDS)
        
        # Simulate sending OTP (replace with actual SMS logic)
        print(f"DEBUG OTP for {phone_number}: {otp}")
        
        return StatusResponse(
            status="success",
            message="OTP sent to your phone number."
        )

    @staticmethod
    async def verify_and_mark(user, submitted_otp: str, db: AsyncSession) -> StatusResponse:
        redis_key = f"phone_verify:{user.user_id}"
        # stored_otp = await redis_client.get(redis_key)

        # if not stored_otp or stored_otp != submitted_otp:
        #     return PhoneVerificationResponse(
        #         status="failed",
        #         message="Invalid or expired OTP."
        #     )

        # await redis_client.delete(redis_key)

        user.is_phone_verified = True
        db.add(user)
        await db.commit()
        await db.refresh(user)

        return StatusResponse(
            status="success",
            message="Phone number verified successfully."
        )
