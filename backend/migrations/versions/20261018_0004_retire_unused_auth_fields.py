"""Remove unused local-password and verification-delivery fields.

Firebase owns authentication. Nonempty legacy values require explicit archival
before removal, so deploying this revision cannot silently discard them.
"""

import sqlalchemy as sa
from alembic import op

revision = "20261018_0004"
down_revision = "20261017_0003"
branch_labels = None
depends_on = None

PROFILE_TABLES = ("normal_users", "counsellors", "admins")


def upgrade():
    connection = op.get_bind()
    for table in PROFILE_TABLES:
        count = connection.scalar(
            sa.text(
                f"SELECT count(*) FROM {table} WHERE hashed_password IS NOT NULL OR last_verification_sent_at IS NOT NULL"
            )
        )
        if count:
            raise RuntimeError(
                f"{table} contains legacy authentication values. Archive and clear the two retired fields before retrying; no fields were dropped."
            )
    for table in PROFILE_TABLES:
        op.drop_column(table, "hashed_password")
        op.drop_column(table, "last_verification_sent_at")


def downgrade():
    # Only empty columns are removed by upgrade, so restoring their shape is safe.
    for table in PROFILE_TABLES:
        op.add_column(
            table, sa.Column("hashed_password", sa.String(255), nullable=True)
        )
        op.add_column(
            table, sa.Column("last_verification_sent_at", sa.DateTime(), nullable=True)
        )
