"""Apply PostgreSQL migrations before deploying the API."""

import argparse
import subprocess
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    # Older Render build commands still pass this flag. Adoption is complete;
    # Alembic now owns every schema change, including creating a new database.
    parser.add_argument("--adopt-legacy", action="store_true", help=argparse.SUPPRESS)
    parser.parse_args(argv)
    print("Running PostgreSQL migrations...", flush=True)
    result = subprocess.run(
        [sys.executable, "-m", "alembic", "upgrade", "head"], cwd=BACKEND_DIR
    )
    if result.returncode:
        print(
            "PostgreSQL migrations failed; deployment preparation stopped.",
            file=sys.stderr,
        )
        return result.returncode
    print("Database schema is ready for application startup.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
