"""Verify an unversioned PostgreSQL baseline; --apply records its Alembic revision."""
import argparse
from pathlib import Path
import re
import sys
from uuid import uuid4

from alembic import command
from alembic.config import Config
from alembic.migration import MigrationContext
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool


BACKEND_DIR = Path(__file__).resolve().parents[1]
BASELINE_REVISION = "20261016_0001"
BASELINE_SQL = (BACKEND_DIR / "migrations/sql/0001_baseline.sql").read_text(encoding="utf-8")
TABLE_NAMES = re.findall(r"CREATE TABLE (\w+)\s*\(", BASELINE_SQL)
ENUM_NAMES = re.findall(r"CREATE TYPE (\w+) AS ENUM", BASELINE_SQL)

# Compare catalog definitions, never application records. search_path makes types
# and foreign keys in the reference and application schemas render identically.
CATALOG_QUERIES = {
    "tables": """
        SELECT c.relname, c.relkind, c.relpersistence, c.relrowsecurity, c.relforcerowsecurity
        FROM pg_catalog.pg_class c JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = :schema AND c.relname = ANY(:tables)
        ORDER BY c.relname
    """,
    "enums": """
        SELECT t.typname, json_agg(e.enumlabel ORDER BY e.enumsortorder)::text
        FROM pg_catalog.pg_type t JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        JOIN pg_catalog.pg_enum e ON e.enumtypid = t.oid
        WHERE n.nspname = :schema AND t.typname = ANY(:enums)
        GROUP BY t.typname ORDER BY t.typname
    """,
    "columns": """
        SELECT c.relname, a.attname, pg_catalog.format_type(a.atttypid, a.atttypmod),
               a.attnotnull, pg_catalog.pg_get_expr(d.adbin, d.adrelid),
               a.attidentity, a.attgenerated, col.collname
        FROM pg_catalog.pg_attribute a
        JOIN pg_catalog.pg_class c ON c.oid = a.attrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        LEFT JOIN pg_catalog.pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
        LEFT JOIN pg_catalog.pg_collation col ON col.oid = a.attcollation
        WHERE n.nspname = :schema AND c.relname = ANY(:tables)
          AND a.attnum > 0 AND NOT a.attisdropped
        ORDER BY c.relname, a.attname
    """,
    "constraints": """
        SELECT c.relname, con.contype, pg_catalog.pg_get_constraintdef(con.oid, true),
               con.convalidated
        FROM pg_catalog.pg_constraint con
        JOIN pg_catalog.pg_class c ON c.oid = con.conrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = :schema AND c.relname = ANY(:tables)
          AND con.contype IN ('p', 'u', 'f', 'c', 'x')
        ORDER BY c.relname, con.contype, pg_catalog.pg_get_constraintdef(con.oid, true)
    """,
    "indexes": """
        SELECT c.relname, idx.relname, pg_catalog.pg_get_indexdef(i.indexrelid),
               i.indisvalid, i.indisready
        FROM pg_catalog.pg_index i JOIN pg_catalog.pg_class c ON c.oid = i.indrelid
        JOIN pg_catalog.pg_class idx ON idx.oid = i.indexrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = :schema AND c.relname = ANY(:tables)
        ORDER BY c.relname, idx.relname
    """,
    "triggers": """
        SELECT c.relname, t.tgname, pg_catalog.pg_get_triggerdef(t.oid), t.tgenabled
        FROM pg_catalog.pg_trigger t JOIN pg_catalog.pg_class c ON c.oid = t.tgrelid
        JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = :schema AND c.relname = ANY(:tables) AND NOT t.tgisinternal
        ORDER BY c.relname, t.tgname
    """,
}


def schema_snapshot(connection, schema):
    quote = connection.dialect.identifier_preparer.quote
    connection.execute(text("SELECT set_config('search_path', :path, true)"),
                       {"path": f"{quote(schema)}, pg_catalog"})
    parameters = {"schema": schema, "tables": TABLE_NAMES, "enums": ENUM_NAMES}
    result = {}
    for category, query in CATALOG_QUERIES.items():
        rows = [tuple(row) for row in connection.execute(text(query), parameters)]
        if category == "indexes":
            # pg_get_indexdef always qualifies the table with its schema.
            rows = [(table, name, definition.replace(f" ON {quote(schema)}.", " ON "), valid, ready)
                    for table, name, definition, valid, ready in rows]
        result[category] = rows
    return result


def baseline_differences(expected, actual):
    differences = []
    for category in CATALOG_QUERIES:
        for row in sorted(set(expected[category]) - set(actual[category]), key=repr):
            differences.append(f"{category}: missing or different baseline definition {row!r}")
        for row in sorted(set(actual[category]) - set(expected[category]), key=repr):
            differences.append(f"{category}: unexpected definition {row!r}")
    return differences


def verify_baseline(connection):
    original_path = connection.scalar(text("SHOW search_path"))
    target_schema = connection.scalar(text("SELECT current_schema()"))
    if not target_schema or target_schema.startswith("pg_"):
        raise RuntimeError("The application must use a non-system PostgreSQL schema.")
    quote = connection.dialect.identifier_preparer.quote
    try:
        # A savepoint removes all reference objects and restores search_path,
        # even when reference creation or inspection raises an exception.
        with connection.begin_nested() as reference:
            reference_schema = f"sarvuday_baseline_{uuid4().hex}"
            connection.exec_driver_sql(f"CREATE SCHEMA {quote(reference_schema)}")
            connection.execute(text("SELECT set_config('search_path', :path, true)"),
                               {"path": f"{quote(reference_schema)}, pg_catalog"})
            connection.exec_driver_sql(BASELINE_SQL)
            expected = schema_snapshot(connection, reference_schema)
            reference.rollback()
        existing = connection.execute(text("""
            SELECT c.relname FROM pg_catalog.pg_class c
            JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
            WHERE n.nspname = :schema AND c.relname = ANY(:tables) AND c.relkind = 'r'
            ORDER BY c.relname
        """), {"schema": target_schema, "tables": TABLE_NAMES}).scalars().all()
        if existing:
            tables = ", ".join(f"{quote(target_schema)}.{quote(name)}" for name in existing)
            connection.exec_driver_sql(f"LOCK TABLE {tables} IN ACCESS SHARE MODE")
        return baseline_differences(expected, schema_snapshot(connection, target_schema))
    finally:
        connection.execute(text("SELECT set_config('search_path', :path, true)"), {"path": original_path})


def adopt_baseline(connection, *, apply=False):
    heads = MigrationContext.configure(connection).get_current_heads()
    if heads:
        print(f"PostgreSQL already has Alembic revisions: {', '.join(heads)}; no adoption needed.", flush=True)
        return 0
    differences = verify_baseline(connection)
    if differences:
        print("Existing PostgreSQL schema does not match the baseline; no revision recorded.", file=sys.stderr)
        for difference in differences[:20]:
            print(f"  {difference}", file=sys.stderr)
        if len(differences) > 20:
            print(f"  {len(differences) - 20} additional differences.", file=sys.stderr)
        print("Resolve schema drift using backend/DATABASE.md before retrying.", file=sys.stderr)
        return 1
    print(f"Verified existing PostgreSQL schema against baseline {BASELINE_REVISION}.", flush=True)
    if apply:
        config = Config(str(BACKEND_DIR / "alembic.ini"))
        config.attributes["connection"] = connection
        command.stamp(config, BASELINE_REVISION)
        print(f"Recorded PostgreSQL baseline {BASELINE_REVISION}; existing records preserved.", flush=True)
    else:
        print("Verification only. Use --apply to record this baseline revision.", flush=True)
    return 0


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Record the baseline only after successful verification")
    args = parser.parse_args(argv)
    from app.database.postgres import POSTGRES_SYNC_URL
    engine = create_engine(POSTGRES_SYNC_URL, poolclass=NullPool,
                           connect_args={"options": "-c lock_timeout=15000 -c statement_timeout=60000"})
    try:
        with engine.begin() as connection:
            return adopt_baseline(connection, apply=args.apply)
    finally:
        engine.dispose()


if __name__ == "__main__":
    raise SystemExit(main())
