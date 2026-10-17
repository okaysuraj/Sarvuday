"""Regressions against a real transaction pooler, using reserved local databases."""
import os
from pathlib import Path
import subprocess
import sys
import textwrap

from alembic.migration import MigrationContext
import psycopg2
import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url

from scripts import adopt_legacy_postgres as adoption


POOLED_URL = "postgresql+psycopg2://audit:local-audit-only@127.0.0.1:56439/sarvuday_pooler_audit"
DIRECT_URL = POOLED_URL.replace(":56439/", ":55439/")
pytestmark = pytest.mark.skipif(os.environ.get("SARVUDAY_RUN_POOLER_TESTS") != "1",
                                reason="Enable disposable local PgBouncer tests explicitly")


@pytest.fixture
def pooler_database():
    direct = make_url(DIRECT_URL)
    pooled = make_url(POOLED_URL)
    assert direct.host == pooled.host == "127.0.0.1"
    assert direct.port == 55439 and pooled.port == 56439
    assert direct.database == pooled.database == "sarvuday_pooler_audit"
    engine = create_engine(direct)
    try:
        with engine.begin() as connection:
            # Only this reserved disposable database is recreated.
            connection.execute(text("DROP SCHEMA public CASCADE"))
            connection.execute(text("CREATE SCHEMA public"))
            connection.exec_driver_sql(adoption.BASELINE_SQL)
            connection.execute(text("""
                INSERT INTO normal_users (user_id, email, name, preferred_languages)
                VALUES ('AUDIT-POOLED', 'pooled@example.invalid', 'Existing user', 'English, Hindi')
            """))
        yield engine
    finally:
        engine.dispose()


def run_backend(source, **overrides):
    environment = dict(os.environ, DATABASE_URL=POOLED_URL, **overrides)
    return subprocess.run([sys.executable, "-c", textwrap.dedent(source)],
                          cwd=Path(__file__).resolve().parents[1], env=environment,
                          capture_output=True, text=True, timeout=60)


def test_pooler_rejects_old_startup_options(pooler_database):
    url = make_url(POOLED_URL).set(drivername="postgresql")
    with pytest.raises(psycopg2.OperationalError, match="unsupported startup parameter"):
        psycopg2.connect(url.render_as_string(hide_password=False),
                         options="-c lock_timeout=15000 -c statement_timeout=60000")


def test_adoption_and_migrations_run_through_transaction_pooler(pooler_database):
    with pooler_database.begin() as connection:
        for table, column in adoption.LEGACY_COLUMN_ADDITIONS:
            connection.exec_driver_sql(f"ALTER TABLE {table} DROP COLUMN {column}")
    result = run_backend("""
        from scripts.adopt_legacy_postgres import main as verify
        from scripts.prepare_deploy import main as prepare
        assert verify([]) == 0
        assert prepare(['--adopt-legacy']) == 0
        assert prepare(['--adopt-legacy']) == 0
    """)
    assert result.returncode == 0, result.stderr
    assert "Verified existing PostgreSQL schema" in result.stdout
    assert "Added 18 missing legacy columns" in result.stdout
    assert result.stdout.count("Database schemas are ready for application startup.") == 2
    with pooler_database.connect() as connection:
        assert MigrationContext.configure(connection).get_current_heads() == ("20261016_0002",)
        row = connection.execute(text("""
            SELECT name, preferred_languages, bio, is_anonymous FROM normal_users WHERE user_id = 'AUDIT-POOLED'
        """)).one()
        assert tuple(row) == ("Existing user", ["English", "Hindi"], None, None)


def test_sync_and_async_runtime_timeouts_work_after_commit_and_rollback(pooler_database):
    result = run_backend("""
        import asyncio
        from sqlalchemy import text
        from app.database.postgres import engine, sync_engine

        with sync_engine.connect() as connection:
            for end in ('commit', 'rollback', 'commit'):
                assert connection.scalar(text('SHOW statement_timeout')) == '250ms'
                getattr(connection, end)()

        async def check():
            async with engine.connect() as connection:
                for end in ('commit', 'rollback', 'commit'):
                    assert await connection.scalar(text('SHOW statement_timeout')) == '250ms'
                    await getattr(connection, end)()
            await engine.dispose()
        asyncio.run(check())
        sync_engine.dispose()
    """, DATABASE_STATEMENT_TIMEOUT_MS="250")
    assert result.returncode == 0, result.stderr


def test_runtime_timeout_cancels_query_through_pooler(pooler_database):
    result = run_backend("""
        import asyncio
        from sqlalchemy import text
        from sqlalchemy.exc import DBAPIError
        from app.database.postgres import engine, sync_engine

        with sync_engine.connect() as connection:
            try:
                connection.execute(text('SELECT pg_sleep(1)'))
            except DBAPIError as error:
                assert error.orig.pgcode == '57014'
                connection.rollback()
            else:
                raise AssertionError('Synchronous timeout did not cancel the query')
            assert connection.scalar(text('SELECT 1')) == 1

        async def check():
            async with engine.connect() as connection:
                try:
                    await connection.execute(text('SELECT pg_sleep(1)'))
                except DBAPIError as error:
                    assert error.orig.sqlstate == '57014'
                    await connection.rollback()
                else:
                    raise AssertionError('Asynchronous timeout did not cancel the query')
                assert await connection.scalar(text('SELECT 1')) == 1
            await engine.dispose()
        asyncio.run(check())
        sync_engine.dispose()
    """, DATABASE_STATEMENT_TIMEOUT_MS="100")
    assert result.returncode == 0, result.stderr
