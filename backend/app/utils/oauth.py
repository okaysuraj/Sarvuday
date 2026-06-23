# app/utils/oauth.py

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models import NormalUser, Counsellor, Admin
from app.utils.constants import AdminRoleEnum, UserTypeEnum
from app.services.auth import AuthService
from jose import JWTError
from sqlalchemy import select
from typing import Optional

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Model mapping for user types
MODEL_MAP = {
    UserTypeEnum.normal_user: NormalUser,
    UserTypeEnum.counsellor: Counsellor,
    UserTypeEnum.admin: Admin
}

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> NormalUser | Counsellor | Admin:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )

    try:
        payload = AuthService.verify_access_token(token)
        # print(f"Token payload: {payload}")  # Debug
        
        user_id = payload["sub"]
        user_type = UserTypeEnum(payload["user_type"])
        model = MODEL_MAP[user_type]

        # print(f"Looking for {user_type} with ID: {user_id}")  # Debug
        
        # More robust user lookup
        user = await db.execute(
            select(model)
            .where(model.user_id == user_id)
            .limit(1)
        )
        user = user.scalar_one_or_none()

        if not user:
            print(f"User not found in {model.__tablename__} table")  # Debug
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found in database"
            )

        return user

    except KeyError as e:
        print(f"Missing token field: {str(e)}")
        raise credentials_exception
    except JWTError as e:
        print(f"JWT Error: {str(e)}")
        raise credentials_exception

async def get_current_user_optional(
    token: Optional[str] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):
    """Returns user object if token is valid, otherwise None."""
    if not token:
        return None

    try:
        payload = AuthService.verify_access_token(token)
        user_id = payload["sub"]
        user_type = UserTypeEnum(payload["user_type"])
        model = MODEL_MAP[user_type]

        result = await db.execute(select(model).where(model.user_id == user_id))
        user = result.scalar_one_or_none()
        return user
    except Exception:
        return None
    
    
def ensure_super_admin(current_user: Admin = Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.admin or current_user.role != AdminRoleEnum.super_admin:
        raise HTTPException(status_code=403, detail="Only super admins can access this route")
    return current_user

def ensure_admin_user(current_user: Admin = Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.admin:
        raise HTTPException(status_code=403, detail="Only admins can access this route")
    return current_user

def ensure_counsellor_user(current_user=Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.counsellor:
        raise HTTPException(status_code=403, detail="Only counsellors can access this route")
    return current_user

def ensure_normal_user(current_user: NormalUser = Depends(get_current_user)):
    if current_user.user_type != UserTypeEnum.normal_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only normal users can access this route"
        )
    return current_user


