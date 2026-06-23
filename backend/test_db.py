import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()
async def run():
    db_url = f"postgresql+asyncpg://{os.getenv('POSTGRES_DB_USERNAME')}:{os.getenv('POSTGRES_DB_PASSWORD')}@{os.getenv('POSTGRES_DB_HOSTNAME')}:{os.getenv('POSTGRES_DB_PORT')}/{os.getenv('POSTGRES_DB_NAME')}"
    engine = create_async_engine(db_url)
    async with engine.begin() as conn:
        res = await conn.execute(text("SELECT email, phone_number, is_email_verified FROM normal_users"))
        print(res.fetchall())
    await engine.dispose()

if __name__ == '__main__':
    asyncio.run(run())
