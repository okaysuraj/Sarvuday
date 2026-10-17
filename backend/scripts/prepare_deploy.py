"""Apply PostgreSQL migrations before deploying the API."""

import argparse
import subprocess
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--adopt-legacy",
        action="store_true",
        help="Repair reviewed omissions, verify and record a legacy PostgreSQL baseline before migrations",
    )
    args = parser.parse_args(argv)
    steps = []
    if args.adopt_legacy:
        steps.append(
            (
                "legacy PostgreSQL verification",
                ["-m", "scripts.adopt_legacy_postgres", "--apply"],
            )
        )
    steps.append(("PostgreSQL migrations", ["-m", "alembic", "upgrade", "head"]))
    for label, arguments in steps:
        print(f"Running {label}...", flush=True)
        try:
            subprocess.run([sys.executable, *arguments], cwd=BACKEND_DIR, check=True)
        except subprocess.CalledProcessError as error:
            print(
                f"{label} failed; deployment preparation stopped.",
                file=sys.stderr,
                flush=True,
            )
            return error.returncode
    print("Database schemas are ready for application startup.", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
