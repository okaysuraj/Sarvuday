"""Preview or apply the verified repair of an unversioned PostgreSQL schema."""

import argparse

from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool

from app.database.legacy_schema import adopt_baseline
from app.database.postgres import POSTGRES_SYNC_URL, set_transaction_timeouts


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Apply reviewed repairs and record the verified baseline",
    )
    args = parser.parse_args(argv)
    engine = create_engine(POSTGRES_SYNC_URL, poolclass=NullPool)
    try:
        with engine.begin() as connection:
            set_transaction_timeouts(
                connection, statement_timeout_ms=60000, lock_timeout_ms=15000
            )
            return adopt_baseline(connection, apply=args.apply)
    finally:
        engine.dispose()


if __name__ == "__main__":
    raise SystemExit(main())
