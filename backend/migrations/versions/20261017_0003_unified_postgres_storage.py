"""unified_postgres_storage

Revision ID: 20261017_0003
Revises: 20261016_0002
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "20261017_0003"
down_revision = "20261016_0002"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "accounts",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("user_type", sa.String(length=20), nullable=False),
        sa.CheckConstraint(
            "user_type IN ('normal_user', 'counsellor', 'admin')",
            name="ck_account_type",
        ),
        sa.PrimaryKeyConstraint("user_id"),
    )
    # Fail on historical ID collisions across roles instead of guessing ownership.
    op.execute("""INSERT INTO accounts (user_id, user_type)
        SELECT user_id, 'normal_user' FROM normal_users
        UNION ALL SELECT user_id, 'counsellor' FROM counsellors
        UNION ALL SELECT user_id, 'admin' FROM admins""")
    # Register identities for all writers, including administrator setup and SQL
    # imports. Keep the small registry when profiles are removed for audit linkage.
    op.execute("""CREATE FUNCTION register_profile_account() RETURNS trigger
        LANGUAGE plpgsql AS $$
        BEGIN
            IF TG_OP = 'UPDATE' AND NEW.user_id IS DISTINCT FROM OLD.user_id THEN
                RAISE EXCEPTION 'Profile identity cannot change' USING ERRCODE = '23514';
            END IF;
            INSERT INTO accounts (user_id, user_type) VALUES (NEW.user_id, TG_ARGV[0])
                ON CONFLICT (user_id) DO NOTHING;
            IF (SELECT user_type FROM accounts WHERE user_id = NEW.user_id) <> TG_ARGV[0] THEN
                RAISE EXCEPTION 'Account identity already belongs to another role' USING ERRCODE = '23514';
            END IF;
            RETURN NEW;
        END $$""")
    for table, role in (
        ("normal_users", "normal_user"),
        ("counsellors", "counsellor"),
        ("admins", "admin"),
    ):
        op.execute(
            f"CREATE TRIGGER register_account BEFORE INSERT OR UPDATE OF user_id ON {table} FOR EACH ROW EXECUTE FUNCTION register_profile_account('{role}')"
        )
    op.add_column(
        "chat_sessions",
        sa.Column(
            "imported_data",
            postgresql.JSONB(),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
    )
    op.create_table(
        "assessment_questions",
        sa.Column("question_type", sa.String(length=10), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("options", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "question_type IN ('BDI', 'HDRS', 'PHQ9') AND question_id >= 0",
            name="ck_question_type",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "question_type", "question_id", name="uq_assessment_question"
        ),
    )
    op.create_table(
        "contact_submissions",
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("subject", sa.String(length=300), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("submitted_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("is_resolved", sa.Boolean(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "disorders",
        sa.Column("disorder_id", sa.BigInteger(), nullable=False),
        sa.Column("disorder_title", sa.Text(), nullable=False),
        sa.Column("disorder_description", sa.Text(), nullable=False),
        sa.Column("symptoms", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column(
            "preventions", postgresql.JSONB(astext_type=sa.Text()), nullable=False
        ),
        sa.Column(
            "treatments", postgresql.JSONB(astext_type=sa.Text()), nullable=False
        ),
        sa.Column("best_advice", sa.Text(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("disorder_id"),
    )
    op.create_table(
        "exercises",
        sa.Column("public_id", sa.String(length=100), nullable=True),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("published", sa.Boolean(), nullable=False),
        sa.Column("duration_min", sa.Integer(), nullable=False),
        sa.Column(
            "instructions", postgresql.JSONB(astext_type=sa.Text()), nullable=False
        ),
        sa.Column("audio_url", sa.Text(), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint("duration_min >= 0", name="ck_exercise_duration"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("public_id"),
    )
    op.create_index(
        "ix_exercises_published_category",
        "exercises",
        ["published", "category"],
        unique=False,
    )
    op.create_table(
        "support_groups",
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("member_count", sa.Integer(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint("member_count >= 0", name="ck_group_members"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_groups_member_count", "support_groups", ["member_count"], unique=False
    )
    op.create_table(
        "assessment_results",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("assessment_type", sa.String(length=10), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False),
        sa.Column("result", sa.Text(), nullable=False),
        sa.Column("calculated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "assessment_type IN ('BDI', 'HDRS', 'PHQ9') AND score >= 0",
            name="ck_result_score_type",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["accounts.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_results_user_type_calculated",
        "assessment_results",
        ["user_id", "assessment_type", "calculated_at"],
        unique=False,
    )
    op.create_table(
        "crisis_logs",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("risk_level", sa.String(length=50), nullable=False),
        sa.Column("source", sa.String(length=100), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("is_resolved", sa.Boolean(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["accounts.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_crisis_created", "crisis_logs", ["created_at"], unique=False)
    op.create_index(
        "ix_crisis_user_created", "crisis_logs", ["user_id", "created_at"], unique=False
    )
    op.create_table(
        "biofeedback_telemetry",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("timestamp", sa.DateTime(timezone=True), nullable=False),
        sa.Column("source", sa.String(length=100), nullable=False),
        sa.Column("hrv", sa.Float(), nullable=True),
        sa.Column("stress_level", sa.Float(), nullable=True),
        sa.Column("stress_threshold", sa.Float(), nullable=True),
        sa.Column("recent_arousal", sa.Float(), nullable=True),
        sa.Column("cortisol_spike", sa.Float(), nullable=True),
        sa.Column("heart_rate", sa.Float(), nullable=True),
        sa.Column("sleep_score", sa.Float(), nullable=True),
        sa.Column("daily_steps", sa.Integer(), nullable=True),
        sa.Column(
            "calmness_trend", postgresql.JSONB(astext_type=sa.Text()), nullable=False
        ),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_telemetry_user_timestamp",
        "biofeedback_telemetry",
        ["user_id", "timestamp"],
        unique=False,
    )
    op.create_table(
        "community_posts",
        sa.Column("group_id", sa.String(length=64), nullable=True),
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("is_anonymous", sa.Boolean(), nullable=False),
        sa.Column("has_trigger_warning", sa.Boolean(), nullable=False),
        sa.Column("likes", sa.Integer(), nullable=False),
        sa.Column("hugs", sa.Integer(), nullable=False),
        sa.Column("relates", sa.Integer(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "likes >= 0 AND hugs >= 0 AND relates >= 0", name="ck_post_reactions"
        ),
        sa.ForeignKeyConstraint(
            ["group_id"],
            ["support_groups.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_posts_group_created",
        "community_posts",
        ["group_id", "created_at"],
        unique=False,
    )
    op.create_index(
        "ix_posts_user_created",
        "community_posts",
        ["user_id", "created_at"],
        unique=False,
    )
    op.create_table(
        "exercise_progress",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("exercise_id", sa.String(length=64), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["exercise_id"],
            ["exercises.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "user_id", "exercise_id", name="uq_exercise_progress_user_exercise"
        ),
    )
    op.create_table(
        "flagged_content",
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("user_initials", sa.String(length=100), nullable=False),
        sa.Column("user_name", sa.Text(), nullable=False),
        sa.Column("source", sa.String(length=100), nullable=False),
        sa.Column("tags", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("resolution_action", sa.String(length=50), nullable=True),
        sa.Column("resolved_by", sa.String(length=20), nullable=True),
        sa.Column("resolved_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["resolved_by"],
            ["admins.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_flags_status_created",
        "flagged_content",
        ["status", "created_at"],
        unique=False,
    )
    op.create_table(
        "journal_entries",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("entry_type", sa.String(length=50), nullable=False),
        sa.Column("ai_sentiment_score", sa.Float(), nullable=True),
        sa.Column("triggers", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("shared_with_therapist", sa.Boolean(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_journal_user_created",
        "journal_entries",
        ["user_id", "created_at"],
        unique=False,
    )
    op.create_table(
        "mood_tracking",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("mood", sa.SmallInteger(), nullable=False),
        sa.Column("energy_level", sa.SmallInteger(), nullable=True),
        sa.Column("anxiety_level", sa.SmallInteger(), nullable=True),
        sa.Column("sleep_quality", sa.String(length=50), nullable=True),
        sa.Column("emotions", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "energy_level BETWEEN 0 AND 10 AND anxiety_level BETWEEN 0 AND 10",
            name="ck_mood_levels",
        ),
        sa.CheckConstraint("mood BETWEEN 0 AND 4", name="ck_mood_range"),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_mood_user_created", "mood_tracking", ["user_id", "created_at"], unique=False
    )
    op.create_table(
        "sleep_tracking",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("date", sa.Date(), nullable=False),
        sa.Column("duration_hours", sa.Float(), nullable=False),
        sa.Column("quality", sa.String(length=50), nullable=True),
        sa.Column("deep_sleep_hours", sa.Float(), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "duration_hours BETWEEN 0 AND 24 AND (deep_sleep_hours IS NULL OR deep_sleep_hours BETWEEN 0 AND duration_hours)",
            name="ck_sleep_duration",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_sleep_user_created",
        "sleep_tracking",
        ["user_id", "created_at"],
        unique=False,
    )
    op.create_index(
        "ix_sleep_user_date", "sleep_tracking", ["user_id", "date"], unique=False
    )
    op.create_table(
        "user_goals",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("frequency", sa.String(length=50), nullable=False),
        sa.Column("progress_total", sa.Integer(), nullable=False),
        sa.Column("progress_current", sa.Integer(), nullable=False),
        sa.Column("streak", sa.Integer(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "progress_total >= 1 AND progress_current BETWEEN 0 AND progress_total AND streak >= 0",
            name="ck_goal_progress",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_goals_user_created", "user_goals", ["user_id", "created_at"], unique=False
    )
    op.create_table(
        "user_medications",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("name", sa.String(length=200), nullable=False),
        sa.Column("dosage", sa.String(length=200), nullable=False),
        sa.Column("schedule", sa.String(length=200), nullable=False),
        sa.Column("type", sa.String(length=50), nullable=False),
        sa.Column("refill_days", sa.Integer(), nullable=True),
        sa.Column("is_taken", sa.Boolean(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint("refill_days >= 0", name="ck_medication_refill"),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_medications_user_created",
        "user_medications",
        ["user_id", "created_at"],
        unique=False,
    )
    op.create_table(
        "user_wallets",
        sa.Column("user_id", sa.String(length=20), nullable=False),
        sa.Column("balance", sa.Numeric(precision=14, scale=2), nullable=False),
        sa.Column("vault_savings", sa.Numeric(precision=14, scale=2), nullable=False),
        sa.Column("vault_goal", sa.Numeric(precision=14, scale=2), nullable=False),
        sa.Column("reward_points", sa.Integer(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "balance >= 0 AND vault_savings >= 0 AND vault_goal >= 0 AND reward_points >= 0",
            name="ck_wallet_balances",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id"),
    )
    op.create_table(
        "chat_turns",
        sa.Column("session_id", sa.String(length=20), nullable=False),
        sa.Column("position", sa.Integer(), nullable=False),
        sa.Column("user_input", sa.Text(), nullable=False),
        sa.Column("assistant_response", sa.Text(), nullable=False),
        sa.Column("timestamp", sa.DateTime(timezone=True), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["session_id"],
            ["chat_sessions.session_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id", "position", name="uq_chat_turn_position"),
    )
    op.create_index(
        "uq_appointment_review_identity",
        "appointments",
        ["appointment_id", "user_id", "counsellor_id"],
        unique=True,
    )
    op.create_table(
        "counsellor_reviews",
        sa.Column("counsellor_id", sa.String(length=20), nullable=False),
        sa.Column("user_id", sa.String(length=20), nullable=True),
        sa.Column("appointment_id", sa.String(length=20), nullable=True),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("verified_appointment", sa.Boolean(), nullable=False),
        sa.Column("author", sa.Text(), nullable=False),
        sa.Column("helpful_count", sa.Integer(), nullable=False),
        sa.Column("id", sa.String(length=64), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column(
            "imported_data",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'{}'::jsonb"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "NOT verified_appointment OR (appointment_id IS NOT NULL AND user_id IS NOT NULL)",
            name="ck_verified_review_appointment",
        ),
        sa.CheckConstraint(
            "rating BETWEEN 1 AND 5 AND helpful_count >= 0", name="ck_review_rating"
        ),
        sa.ForeignKeyConstraint(
            ["appointment_id", "user_id", "counsellor_id"],
            [
                "appointments.appointment_id",
                "appointments.user_id",
                "appointments.counsellor_id",
            ],
            name="fk_review_appointment_participants",
        ),
        sa.ForeignKeyConstraint(
            ["appointment_id"],
            ["appointments.appointment_id"],
        ),
        sa.ForeignKeyConstraint(
            ["counsellor_id"],
            ["counsellors.user_id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["normal_users.user_id"],
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("appointment_id"),
    )
    op.create_index(
        "ix_reviews_counsellor_verified_created",
        "counsellor_reviews",
        ["counsellor_id", "verified_appointment", "created_at"],
        unique=False,
    )
    op.create_foreign_key(
        "fk_admin_account", "admins", "accounts", ["user_id"], ["user_id"]
    )
    op.create_foreign_key(
        "fk_counsellor_account", "counsellors", "accounts", ["user_id"], ["user_id"]
    )
    op.create_foreign_key(
        "fk_normal_user_account", "normal_users", "accounts", ["user_id"], ["user_id"]
    )


def downgrade():
    raise RuntimeError(
        "This migration holds patient records. Restore a verified backup for rollback."
    )
