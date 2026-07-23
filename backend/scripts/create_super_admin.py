import asyncio
from app.database.postgres import async_session
from app.models.users.admin import Admin
from app.utils.constants import AdminRoleEnum, UserTypeEnum
from app.utils.unique_id_generation import generate_user_id

async def main():
    async with async_session() as session:
        admin = Admin(
            user_id=generate_user_id(UserTypeEnum.admin.value),
            email="superadmin@admin.com",
            name="Super Admin",
            role=AdminRoleEnum.super_admin,
            user_type=UserTypeEnum.admin,
            is_approved=True,
            is_email_verified=True,
        )
        session.add(admin)
        await session.commit()
        print("Super admin created successfully.")

if __name__ == "__main__":
    asyncio.run(main())
