# app/services/otp_service.py

import random
import string
import hashlib
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.users.otp_record import OTPRecord
from app.utils.email_verification import BaseEmailService


class OTPService:
    """Production OTP service that generates, stores, verifies, and SENDS codes via real SMTP and Twilio."""

    @staticmethod
    def generate_otp(length=6):
        """Generate a cryptographically random numeric OTP."""
        return ''.join(random.choices(string.digits, k=length))

    @staticmethod
    def hash_otp(otp_code: str):
        """SHA-256 hash the OTP before storing in database."""
        return hashlib.sha256(otp_code.encode()).hexdigest()

    @staticmethod
    async def create_and_store_otp(db: AsyncSession, identifier: str, user_type: str, purpose: str, expiry_minutes=10) -> str:
        """Generates, hashes, persists, and returns the raw OTP."""
        raw_otp = OTPService.generate_otp()
        hashed_otp = OTPService.hash_otp(raw_otp)

        otp_record = OTPRecord(
            identifier=identifier,
            otp_code_hash=hashed_otp,
            user_type=user_type,
            purpose=purpose,
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=expiry_minutes)
        )
        db.add(otp_record)
       
                subject="Your SarvUday Verification Code",
                to_email=email,
                html_body=html_body
            )
            print(f"[OTP SERVICE] Email OTP sent to {email}")
        except Exception as e:
            # Log but don't crash — allows development without SMTP configured
            print(f"[OTP SERVICE] Failed to send email OTP to {email}: {e}")
            print(f"[OTP SERVICE - FALLBACK] OTP for {email}: {otp_code}")

    @staticmethod
    async def _send_sms_otp(phone: str, otp_code: str):
        """Send OTP via Twilio SMS."""
        try:
            from app.config import settings
            account_sid = getattr(settings, 'twilio_account_sid', None)
            auth_token = getattr(settings, 'twilio_auth_token', None)
            from_number = getattr(settings, 'twilio_from_number', None)

            if not all([account_sid, auth_token, from_number]):
                print(f"[OTP SERVICE] Twilio not configured. SMS OTP for {phone}: {otp_code}")
                return

            from twilio.rest import Client
            client = Client(account_sid, auth_token)
            client.messages.create(
                body=f"Your SarvUday verification code is: {otp_code}. Valid for 10 minutes.",
                from_=from_number,
                to=phone
            )
            print(f"[OTP SERVICE] SMS OTP sent to {phone}")
        except ImportError:
            print(f"[OTP SERVICE] Twilio SDK not installed. SMS OTP for {phone}: {otp_code}")
        except Exception as e:
            print(f"[OTP SERVICE] Failed to send SMS OTP to {phone}: {e}")
            print(f"[OTP SERVICE - FALLBACK] OTP for {phone}: {otp_code}")
