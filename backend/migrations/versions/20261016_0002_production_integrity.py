"""Prescription data, phone identities, booking integrity, and hot query indexes."""

import sqlalchemy as sa
from alembic import op

revision = "20261016_0002"
down_revision = "20261016_0001"
branch_labels = None
depends_on = None


def upgrade():
    # Preserve list semantics for JSON arrays and comma-separated legacy profiles.
    for table, fields in {
        "normal_users": ("preferred_languages", "primary_concerns"),
        "counsellors": (
            "education_qualifications",
            "certifications",
            "specializations",
            "languages",
        ),
    }.items():
        for column in fields:
            op.alter_column(
                table,
                column,
                existing_type=sa.Text(),
                type_=sa.JSON(),
                postgresql_using=f"CASE WHEN {column} IS NULL THEN NULL "
                f"WHEN btrim({column}) = '' THEN '[]'::json "
                f"WHEN left(btrim({column}), 1) = '[' THEN {column}::json "
                f"ELSE to_json(regexp_split_to_array({column}, '\\s*,\\s*')) END",
            )
    op.alter_column(
        "normal_users", "email", existing_type=sa.String(255), nullable=True
    )
    op.alter_column("counsellors", "email", existing_type=sa.String(255), nullable=True)
    op.alter_column(
        "appointments", "payment_id", existing_type=sa.String(20), nullable=True
    )
    op.add_column(
        "prescriptions", sa.Column("counsellor_id", sa.String(20), nullable=True)
    )
    op.add_column("prescriptions", sa.Column("diagnosis", sa.Text(), nullable=True))
    op.add_column("prescriptions", sa.Column("medications", sa.JSON(), nullable=True))
    op.add_column(
        "prescriptions", sa.Column("recommendations", sa.JSON(), nullable=True)
    )
    op.create_foreign_key(
        "fk_prescriptions_counsellor",
        "prescriptions",
        "counsellors",
        ["counsellor_id"],
        ["user_id"],
    )
    op.execute("""UPDATE prescriptions AS p SET counsellor_id = s.counsellor_id
                  FROM counselling_sessions AS s WHERE s.session_id = p.session_id""")
    op.create_check_constraint(
        "ck_availability_positive_duration",
        "counsellor_availability",
        "end_time > start_time",
    )
    op.create_index(
        "ix_prescriptions_counsellor_id", "prescriptions", ["counsellor_id"]
    )
    op.create_index(
        "uq_appointment_active_slot",
        "appointments",
        ["availability_slot_id"],
        unique=True,
        postgresql_where=sa.text("status IN ('pending', 'confirmed')"),
    )
    op.create_index(
        "uq_appointment_session", "appointments", ["session_id"], unique=True
    )
    op.create_index(
        "uq_appointment_payment", "appointments", ["payment_id"], unique=True
    )
    op.create_index(
        "ix_appointments_user_status_created",
        "appointments",
        ["user_id", "status", "created_at"],
    )
    op.create_index(
        "ix_appointments_counsellor_status_created",
        "appointments",
        ["counsellor_id", "status", "created_at"],
    )
    op.create_index(
        "ix_availability_counsellor_status_start",
        "counsellor_availability",
        ["counsellor_id", "status", "start_time"],
    )
    op.create_index(
        "ix_messages_room_created", "direct_messages", ["room_id", "created_at"]
    )
    op.create_index(
        "ix_notifications_recipient_created",
        "notifications",
        ["user_id", "user_type", "created_at"],
    )


def downgrade():
    raise RuntimeError(
        "This migration adds clinical records; restore a verified backup instead of dropping fields."
    )
