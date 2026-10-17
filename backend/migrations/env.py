"""Migrations use DATABASE_URL; no Firebase connectivity is required."""

from alembic import context
from sqlalchemy import create_engine, pool

import app.models  # noqa: F401 -- register the complete metadata
from app.database.postgres import POSTGRES_SYNC_URL, Base

config = context.config
target_metadata = Base.metadata

if context.is_offline_mode():
    context.configure(
        url=POSTGRES_SYNC_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()
else:

    def run_migrations(connection):
        context.configure(
            connection=connection, target_metadata=target_metadata, compare_type=True
        )
        with context.begin_transaction():
            context.run_migrations()

    connection = config.attributes.get("connection")
    if connection is not None:
        run_migrations(connection)
    else:
        engine = create_engine(POSTGRES_SYNC_URL, poolclass=pool.NullPool)
        try:
            with engine.connect() as connection:
                run_migrations(connection)
        finally:
            engine.dispose()
