"""Patient-owned check-ins, journal, habits, telemetry and wallet balances."""

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    Numeric,
    SmallInteger,
    String,
    Text,
)
from sqlalchemy.dialects.postgresql import JSONB

from app.database.postgres import Base
from app.models.records import RecordMixin


class MoodTracking(RecordMixin, Base):
    __tablename__ = "mood_tracking"
    __table_args__ = (
        CheckConstraint("mood BETWEEN 0 AND 4", name="ck_mood_range"),
        CheckConstraint(
            "energy_level BETWEEN 0 AND 10 AND anxiety_level BETWEEN 0 AND 10",
            name="ck_mood_levels",
        ),
        Index("ix_mood_user_created", "user_id", "created_at"),
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    mood = Column(SmallInteger, nullable=False)
    energy_level = Column(SmallInteger)
    anxiety_level = Column(SmallInteger)
    sleep_quality = Column(String(50))
    emotions = Column(JSONB, nullable=False, default=list)
    notes = Column(Text, nullable=False, default="")


class JournalEntry(RecordMixin, Base):
    __tablename__ = "journal_entries"
    __table_args__ = (Index("ix_journal_user_created", "user_id", "created_at"),)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    entry_type = Column(String(50), nullable=False, default="text")
    ai_sentiment_score = Column(Float)
    triggers = Column(JSONB, nullable=False, default=list)
    shared_with_therapist = Column(Boolean, nullable=False, default=False)


class SleepTracking(RecordMixin, Base):
    __tablename__ = "sleep_tracking"
    __table_args__ = (
        CheckConstraint(
            "duration_hours BETWEEN 0 AND 24 AND (deep_sleep_hours IS NULL OR deep_sleep_hours BETWEEN 0 AND duration_hours)",
            name="ck_sleep_duration",
        ),
        Index("ix_sleep_user_created", "user_id", "created_at"),
        Index("ix_sleep_user_date", "user_id", "date"),
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    date = Column(Date, nullable=False)
    duration_hours = Column(Float, nullable=False)
    quality = Column(String(50))
    deep_sleep_hours = Column(Float)


class UserMedication(RecordMixin, Base):
    __tablename__ = "user_medications"
    __table_args__ = (
        CheckConstraint("refill_days >= 0", name="ck_medication_refill"),
        Index("ix_medications_user_created", "user_id", "created_at"),
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    name = Column(String(200), nullable=False)
    dosage = Column(String(200), nullable=False, default="")
    schedule = Column(String(200), nullable=False, default="")
    type = Column(String(50), nullable=False, default="Prescription")
    refill_days = Column(Integer)
    is_taken = Column(Boolean, nullable=False, default=False)
    updated_at = Column(DateTime(timezone=True))


class UserGoal(RecordMixin, Base):
    __tablename__ = "user_goals"
    __table_args__ = (
        CheckConstraint(
            "progress_total >= 1 AND progress_current BETWEEN 0 AND progress_total AND streak >= 0",
            name="ck_goal_progress",
        ),
        Index("ix_goals_user_created", "user_id", "created_at"),
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False, default="")
    frequency = Column(String(50), nullable=False, default="Daily")
    progress_total = Column(Integer, nullable=False, default=1)
    progress_current = Column(Integer, nullable=False, default=0)
    streak = Column(Integer, nullable=False, default=0)
    updated_at = Column(DateTime(timezone=True))


class BiofeedbackTelemetry(RecordMixin, Base):
    __tablename__ = "biofeedback_telemetry"
    __table_args__ = (Index("ix_telemetry_user_timestamp", "user_id", "timestamp"),)
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    timestamp = Column(DateTime(timezone=True), nullable=False)
    source = Column(String(100), nullable=False)
    hrv = Column(Float)
    stress_level = Column(Float)
    stress_threshold = Column(Float)
    recent_arousal = Column(Float)
    cortisol_spike = Column(Float)
    heart_rate = Column(Float)
    sleep_score = Column(Float)
    daily_steps = Column(Integer)
    calmness_trend = Column(JSONB, nullable=False, default=list)


class UserWallet(RecordMixin, Base):
    __tablename__ = "user_wallets"
    __table_args__ = (
        CheckConstraint(
            "balance >= 0 AND vault_savings >= 0 AND vault_goal >= 0 AND reward_points >= 0",
            name="ck_wallet_balances",
        ),
    )
    user_id = Column(
        String(20), ForeignKey("normal_users.user_id"), nullable=False, unique=True
    )
    balance = Column(Numeric(14, 2), nullable=False, default=0)
    vault_savings = Column(Numeric(14, 2), nullable=False, default=0)
    vault_goal = Column(Numeric(14, 2), nullable=False, default=0)
    reward_points = Column(Integer, nullable=False, default=0)
