"""Published assessment questions and account-owned historical results."""

from sqlalchemy import (
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


class AssessmentQuestion(RecordMixin, Base):
    __tablename__ = "assessment_questions"
    __table_args__ = (
        UniqueConstraint("question_type", "question_id", name="uq_assessment_question"),
        CheckConstraint(
            "question_type IN ('BDI', 'HDRS', 'PHQ9') AND question_id >= 0",
            name="ck_question_type",
        ),
    )
    question_type = Column(String(10), nullable=False)
    question_id = Column(Integer, nullable=False)
    question = Column(Text, nullable=False)
    options = Column(JSONB, nullable=False)


class AssessmentResult(RecordMixin, Base):
    __tablename__ = "assessment_results"
    __table_args__ = (
        CheckConstraint(
            "assessment_type IN ('BDI', 'HDRS', 'PHQ9') AND score >= 0",
            name="ck_result_score_type",
        ),
        Index(
            "ix_results_user_type_calculated",
            "user_id",
            "assessment_type",
            "calculated_at",
        ),
    )
    user_id = Column(String(20), ForeignKey("accounts.user_id"), nullable=False)
    assessment_type = Column(String(10), nullable=False)
    score = Column(Integer, nullable=False)
    result = Column(Text, nullable=False)
    calculated_at = Column(DateTime(timezone=True), nullable=False)
