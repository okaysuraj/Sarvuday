import asyncio
from sqlalchemy import text
from app.database.postgres import engine

async def alter_tables():
    async with engine.begin() as conn:
        tables_res = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = [row[0] for row in tables_res.fetchall()]
        
        for table in tables:
            cols_res = await conn.execute(text(f"SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '{table}'"))
            cols = cols_res.fetchall()
            for col_name, data_type in cols:
                if 'timestamp' in data_type.lower() and 'without time zone' in data_type.lower():
                    print(f"Altering {table}.{col_name} to timestamp with time zone")
                    try:
                        await conn.execute(text(f"ALTER TABLE {table} ALTER COLUMN {col_name} TYPE timestamp with time zone USING {col_name} AT TIME ZONE 'UTC'"))
                    except Exception as e:
                        print(f"Failed to alter {table}.{col_name}: {e}")

asyncio.run(alter_tables())
