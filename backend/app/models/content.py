"""Published reference content and patient exercise completion records."""

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB

from app.database.postgres import Base
from app.models.records import RecordMixin


class Disorder(RecordMixin, Base):
    __tablename__ = "disorders"
    disorder_id = Column(BigInteger, nullable=False, unique=True)
    disorder_title = Column(Text, nullable=False)
    disorder_description = Column(Text, nullable=False)
    symptoms = Column(JSONB, nullable=False, default=list)
    preventions = Column(JSONB, nullable=False, default=list)
    treatments = Column(JSONB, nullable=False, default=list)
    best_advice = Column(Text, nullable=False)


class Exercise(RecordMixin, Base):
    __tablename__ = "exercises"
    __table_args__ = (
        CheckConstraint("duration_min >= 0", name="ck_exercise_duration"),
        Index("ix_exercises_published_category", "published", "category"),
    )
    public_id = Column(String(100), unique=True)
    title = Column(Text, nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False, default="")
    published = Column(Boolean, nullable=False, default=False)
    duration_min = Column(Integer, nullable=False, default=0)
    instructions = Column(JSONB, nullable=False, default=list)
    audio_url = Column(Text)


class ExerciseProgress(RecordMixin, Base):
    __tablename__ = "exercise_progress"
    __table_args__ = (
        UniqueConstraint(
            "user_id", "exercise_id", name="uq_exercise_progress_user_exercise"
        ),
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    exercise_id = Column(String(64), ForeignKey("exercises.id"), nullable=False)
    updated_at = Column(DateTime(timezone=True), nullable=False)
    completed_at = Column(DateTime(timezone=True))
