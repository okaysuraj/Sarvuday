"""Frozen existing relational schema. Contains no demonstration or seed data."""
from pathlib import Path
from alembic import op

revision = "20261016_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    sql = (Path(__file__).parents[1] / "sql" / "0001_baseline.sql").read_text(encoding="utf-8")
    op.execute(sql)


def downgrade():
    raise RuntimeError("Baseline downgrade deletes clinical records. Restore a verified backup instead.")
