# app/services/auth/token_service.py
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException
from app.config import settings
from app.utils.constants import UserTypeEnum

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm

class TokenService:
    @staticmethod
    def generate_token(
        email: str, 
        user_type: UserTypeEnum, 
        expires_in_minutes: int
    ) -> str:
        """Generate JWT token with expiration"""
        payload = {
            "email": email,
            "user_type": user_type.value,
            "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_in_minutes)
        }
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    @staticmethod
    def decode_token(token: str) -> dict:
        """Decode and verify JWT token"""
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError as e:
            raise HTTPException(
                status_code=400,
                detail="Invalid or expired token"
            ) from e

    @staticmethod
    def is_token_expired(token: str) -> bool:
        """Check if the token is expired"""
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            exp = payload.get("exp")
            if exp is None:
                raise HTTPException(
                    status_code=400,
                    detail="Token does not contain expiration"
                )
            return datetime.now(timezone.utc) > datetime.fromtimestamp(exp, tz=timezone.utc)
        except JWTError:
            return True