import asyncio
from app.database.postgres import engine
from sqlalchemy import text

async def check():
    async with engine.begin() as conn:
        res = await conn.execute(text("SELECT t.typname, e.enumlabel FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid;"))
        print('enums:', res.fetchall())

if __name__ == "__main__":
    asyncio.run(check())
