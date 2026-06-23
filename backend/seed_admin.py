import asyncio
import sys
from sqlalchemy import select
from datetime import datetime, timezone

from app.database import async_session
from app.models import Admin
from app.utils.constants import AdminRoleEnum, UserTypeEnum, GenderEnum
from app.utils.unique_id_generation import generate_user_id

async def seed_admin(email: str, name: str):
    async with async_session() as session:
        # Check if already exists
        res = await session.execute(select(Admin).where(Admin.email == email))
        if res.scalars().first():
            print(f"Admin with email {email} already exists!")
            return
            
        user_id = generate_user_id(UserTypeEnum.admin.value)
        
        new_admin = Admin(
            user_id=user_id,
            email=email,
            name=name,
            gender=GenderEnum.other,
            role=AdminRoleEnum.super_admin,
            user_type=UserTypeEnum.admin,
            is_email_verified=True,
            last_login_at=datetime.now(timezone.utc)
        )
        
        session.add(new_admin)
        await session.commit()
        
        # Also create in Firebase
        import firebase_admin
        from firebase_admin import auth, credentials
        import os
        
        # Make sure app is initialized
        import app.firebase_config
        
        try:
            user = auth.create_user(
                email=email,
                password="AdminPassword123!",
                display_name=name
            )
            print(f"Created Firebase user for {email}. Password: AdminPassword123!")
            
            # Link firebase_uid
            new_admin.firebase_uid = user.uid
            await session.commit()
        except Exception as e:
            print(f"Firebase user creation failed (maybe exists?): {e}")
            
        print(f"Successfully created Super Admin account for {email}")
        print("To login, go to the Login page and use this email and 'AdminPassword123!'.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python seed_admin.py <email> <name>")
        sys.exit(1)
        
    email = sys.argv[1]
    name = sys.argv[2]
    asyncio.run(seed_admin(email, name))
