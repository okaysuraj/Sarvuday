"""Create an administrator linked to an existing, verified Firebase account."""

import argparse
import asyncio

from firebase_admin import auth
from sqlalchemy import select

from app.core.firebase import initialize_firebase
from app.database.postgres import async_session, engine
from app.models.users.admin import Admin
from app.utils.constants import AdminRoleEnum, UserTypeEnum
from app.utils.unique_id_generation import generate_user_id


async def create_admin(email: str, name: str):
    initialize_firebase()
    identity = await asyncio.to_thread(auth.get_user_by_email, email)
    if not identity.email_verified:
        raise ValueError(
            "Verify this account's email in Firebase before granting administrator access."
        )
    async with async_session() as session:
        existing = await session.scalar(select(Admin).where(Admin.email == email))
        if existing:
            print("An administrator with this email already exists.")
            return
        admin = Admin(
            user_id=generate_user_id(UserTypeEnum.admin.value),
            email=email,
            name=name,
            firebase_uid=identity.uid,
            role=AdminRoleEnum.super_admin,
            user_type=UserTypeEnum.admin,
            is_approved=True,
            is_email_verified=True,
        )
        session.add(admin)
        await session.commit()
        print("Super admin created successfully.")


async def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--email", required=True, help="Verified Firebase account email"
    )
    parser.add_argument("--name", required=True, help="Administrator display name")
    args = parser.parse_args()
    try:
        await create_admin(args.email, args.name)
    finally:
        await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
