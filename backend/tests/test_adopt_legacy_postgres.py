import os
from uuid import uuid4

from alembic import command
from alembic.config import Config
from alembic.migration import MigrationContext
import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from sqlalchemy.exc import ProgrammingError

from app.database.postgres import POSTGRES_SYNC_URL
from scripts import adopt_legacy_postgres as adoption


@pytest.fixture
def legacy_connection():
    if os.environ.get("SARVUDAY_RUN_DATABASE_TESTS") != "1":
        pytest.skip("Enable disposable local database tests explicitly")
    target = make_url(POSTGRES_SYNC_URL)
    assert target.host == "127.0.0.1" and target.port == 55439 and target.database == "sarvuday_audit"
    engine = create_engine(target)
    try:
        with engine.connect() as connection:
            transaction = connection.begin()
            try:
                schema = f"audit_legacy_{uuid4().hex}"
                connection.exec_driver_sql(f"CREATE SCHEMA {schema}")
                connection.execute(text("SELECT set_config('search_path', :path, true)"),
                                   {"path": f"{schema}, pg_catalog"})
                connection.exec_driver_sql(adoption.BASELINE_SQL)
                yield connection
            finally:
                transaction.rollback()
    finally:
        engine.dispose()


def reference_schemas(connection):
    return connection.execute(text("""
        SELECT nspname FROM pg_catalog.pg_namespace
        WHERE nspname LIKE 'sarvuday_baseline_%' ORDER BY nspname
    """)).scalars().all()


def test_preview_verifies_without_stamping_or_leaving_reference_objects(legacy_connection):
    original_path = legacy_connection.scalar(text("SHOW search_path"))
    before = reference_schemas(legacy_connection)

    assert adoption.adopt_baseline(legacy_connection) == 0
    assert MigrationContext.configure(legacy_connection).get_current_heads() == ()
    assert reference_schemas(legacy_connection) == before
    assert legacy_connection.scalar(text("SHOW search_path")) == original_path


def test_adoption_then_upgrade_preserves_legacy_data_and_is_repeatable(legacy_connection):
    legacy_connection.execute(text("""
        INSERT INTO normal_users (user_id, email, name, preferred_languages)
        VALUES ('AUDIT-ADOPT', 'adoption@example.invalid', 'Existing user', 'English, Hindi')
    """))

    assert adoption.adopt_baseline(legacy_connection, apply=True) == 0
    assert MigrationContext.configure(legacy_connection).get_current_heads() == (adoption.BASELINE_REVISION,)
    config = Config(str(adoption.BACKEND_DIR / "alembic.ini"))
    config.attributes["connection"] = legacy_connection
    command.upgrade(config, "head")

    row = legacy_connection.execute(text("""
        SELECT name, email, preferred_languages FROM normal_users WHERE user_id = 'AUDIT-ADOPT'
    """)).one()
    assert tuple(row) == ("Existing user", "adoption@example.invalid", ["English", "Hindi"])
    assert MigrationContext.configure(legacy_connection).get_current_heads() == ("20261016_0002",)
    assert adoption.adopt_baseline(legacy_connection, apply=True) == 0
    assert MigrationContext.configure(legacy_connection).get_current_heads() == ("20261016_0002",)


@pytest.mark.parametrize("drift", [
    "ALTER TYPE genderenum ADD VALUE 'unexpected'",
    "DROP TABLE notifications",
    "ALTER TABLE normal_users DROP COLUMN bio",
    "ALTER TABLE normal_users ALTER COLUMN name TYPE varchar(100)",
    "ALTER TABLE normal_users ALTER COLUMN email DROP NOT NULL",
    "ALTER TABLE normal_users ALTER COLUMN created_at SET DEFAULT '2000-01-01'::timestamptz",
    "ALTER TABLE normal_users ADD COLUMN unexpected_field TEXT",
    "ALTER TABLE normal_users DROP CONSTRAINT normal_users_email_key",
    "ALTER TABLE chat_sessions DROP CONSTRAINT chat_sessions_user_id_fkey",
    "ALTER TABLE normal_users ADD CONSTRAINT extra_check CHECK (name <> '')",
    "DROP INDEX idx_normal_user_email",
])
def test_schema_drift_is_reported_without_stamping(legacy_connection, capsys, drift):
    legacy_connection.exec_driver_sql(drift)

    assert adoption.adopt_baseline(legacy_connection, apply=True) == 1
    assert MigrationContext.configure(legacy_connection).get_current_heads() == ()
    assert "does not match the baseline; no revision recorded" in capsys.readouterr().err
    assert reference_schemas(legacy_connection) == []


def test_reference_failure_restores_search_path_and_keeps_transaction_usable(legacy_connection, monkeypatch):
    original_path = legacy_connection.scalar(text("SHOW search_path"))
    monkeypatch.setattr(adoption, "BASELINE_SQL", "SELECT invalid_reference_statement")

    with pytest.raises(ProgrammingError):
        adoption.verify_baseline(legacy_connection)

    assert legacy_connection.scalar(text("SHOW search_path")) == original_path
    assert reference_schemas(legacy_connection) == []


def test_unrelated_objects_are_preserved(legacy_connection):
    legacy_connection.exec_driver_sql("CREATE TABLE unrelated_records (id integer PRIMARY KEY)")
    legacy_connection.exec_driver_sql("INSERT INTO unrelated_records VALUES (42)")

    assert adoption.adopt_baseline(legacy_connection, apply=True) == 0
    assert legacy_connection.scalar(text("SELECT id FROM unrelated_records")) == 42
