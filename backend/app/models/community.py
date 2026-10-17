"""Community posts keep author identity private; reviews require appointments."""

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    ForeignKey,
    ForeignKeyConstraint,
    Index,
    Integer,
    String,
    Text,
)

from app.database.postgres import Base
from app.models.records import RecordMixin


class SupportGroup(RecordMixin, Base):
    __tablename__ = "support_groups"
    __table_args__ = (
        CheckConstraint("member_count >= 0", name="ck_group_members"),
        Index("ix_groups_member_count", "member_count"),
    )
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=False, default="")
    member_count = Column(Integer, nullable=False, default=0)


class CommunityPost(RecordMixin, Base):
    __tablename__ = "community_posts"
    __table_args__ = (
        CheckConstraint(
            "likes >= 0 AND hugs >= 0 AND relates >= 0", name="ck_post_reactions"
        ),
        Index("ix_posts_group_created", "group_id", "created_at"),
        Index("ix_posts_user_created", "user_id", "created_at"),
    )
    group_id = Column(String(64), ForeignKey("support_groups.id"))
    user_id = Column(String(20), ForeignKey("normal_users.user_id"), nullable=False)
    content = Column(Text, nullable=False)
    is_anonymous = Column(Boolean, nullable=False, default=False)
    has_trigger_warning = Column(Boolean, nullable=False, default=False)
    likes = Column(Integer, nullable=False, default=0)
    hugs = Column(Integer, nullable=False, default=0)
    relates = Column(Integer, nullable=False, default=0)


class CounsellorReview(RecordMixin, Base):
    __tablename__ = "counsellor_reviews"
    __table_args__ = (
        ForeignKeyConstraint(
            ["appointment_id", "user_id", "counsellor_id"],
            [
                "appointments.appointment_id",
                "appointments.user_id",
                "appointments.counsellor_id",
            ],
            name="fk_review_appointment_participants",
        ),
        CheckConstraint(
            "rating BETWEEN 1 AND 5 AND helpful_count >= 0", name="ck_review_rating"
        ),
        CheckConstraint(
            "NOT verified_appointment OR (appointment_id IS NOT NULL AND user_id IS NOT NULL)",
            name="ck_verified_review_appointment",
        ),
        Index(
            "ix_reviews_counsellor_verified_created",
            "counsellor_id",
            "verified_appointment",
            "created_at",
        ),
    )
    counsellor_id = Column(
        String(20), ForeignKey("counsellors.user_id"), nullable=False
    )
    user_id = Column(String(20), ForeignKey("normal_users.user_id"))
    appointment_id = Column(
        String(20), ForeignKey("appointments.appointment_id"), unique=True
    )
    rating = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    verified_appointment = Column(Boolean, nullable=False, default=False)
    author = Column(Text, nullable=False)
    helpful_count = Column(Integer, nullable=False, default=0)
