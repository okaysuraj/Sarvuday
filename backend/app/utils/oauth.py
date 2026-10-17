"""Verify API tokens, load the account and enforce its current role and approval."""

from typing import Optional

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError as JWTError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database.postgres import get_db
from app.models import Admin, Counsellor, NormalUser
from app.utils.constants import AdminRoleEnum, UserTypeEnum

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/firebase-login")
optional_oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/firebase-login", auto_error=False
)


def verify_access_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm],
            options={"require": ["exp", "sub"]},
        )
        if not isinstance(payload.get("sub"), str) or not payload["sub"]:
            raise JWTError("Invalid subject")
        try:
            UserTypeEnum(payload.get("user_type"))
        except (ValueError, TypeError) as exc:
            raise JWTError("Invalid user type") from exc
        return payload
    except JWTError as e:
        raise JWTError(f"Token validation failed: {str(e)}")


# Model mapping for user types
MODEL_MAP = {
    UserTypeEnum.normal_user: NormalUser,
    UserTypeEnum.counsellor: Counsellor,
    UserTypeEnum.admin: Admin,
}


async def get_current_user(
    token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
) -> NormalUser | Counsellor | Admin:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = verify_access_token(token)

        user_id = payload["sub"]
        user_type = UserTypeEnum(payload["user_type"])
        model = MODEL_MAP[user_type]

        user = await db.execute(select(model).where(model.user_id == user_id).limit(1))
        user = user.scalar_one_or_none()

        if not user:
            raise credentials_exception

        if user_type == UserTypeEnum.admin and not user.is_approved:
            raise HTTPException(
                status_code=403, detail="Administrator access has not been approved"
            )

        return user

    except (KeyError, ValueError, TypeError, JWTError):
        raise credentials_exception


async def get_current_user_optional(
    token: Optional[str] = Depends(optional_oauth2_scheme),
    db: AsyncSession = Depends(get_db),
):
    """Returns user object if token is valid, otherwise None."""
    if not token:
        return None

    try:
        return await get_current_user(token=token, db=db)
    except HTTPException as exc:
        if exc.status_code not in (401, 403):
            raise
        return None


def ensure_super_admin(current_user: Admin = Depends(get_current_user)):
    if (
        current_user.user_type != UserTypeEnum.admin
        or current_user.role != AdminRoleEnum.super_admin
    ):
        raise HTTPException(
            status_code=403, detail="Only super admins can access this route"
        )
    return current_user


def ensure_admin_user(current_user: Admin = Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.admin:
        raise HTTPException(status_code=403, detail="Only admins can access this route")
    return current_user


def ensure_counsellor_user(current_user=Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.counsellor:
        raise HTTPException(
            status_code=403, detail="Only counsellors can access this route"
        )
    if not current_user.is_approved:
        raise HTTPException(status_code=403, detail="Counsellor approval is required")
    return current_user


def ensure_normal_user(current_user: NormalUser = Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.normal_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only normal users can access this route",
        )
    return current_user
