"""Relational records and relationships for admin."""

from sqlalchemy import TIMESTAMP, Boolean, Column, ForeignKey, Index, String
from sqlalchemy import Enum as SqlEnum
from sqlalchemy.orm import relationship

from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import AdminRoleEnum, GenderEnum, UserTypeEnum


class Admin(Base, BaseMixin):
    """Represents platform administrators."""

    __tablename__ = "admins"
    __table_args__ = (
        Index("idx_admin_id", "user_id"),
        Index("idx_admin_email", "email"),
        {},
    )

    # Core identification and auth fields
    user_id = Column(
        String(20),
        ForeignKey("accounts.user_id", name="fk_admin_account"),
        primary_key=True,
        index=True,
        unique=True,
        nullable=False,
    )
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(15), unique=True, nullable=True)
    firebase_uid = Column(String(255), unique=True, nullable=True)

    # Profile information
    name = Column(String(255), nullable=False)
    gender = Column(SqlEnum(GenderEnum), nullable=True)
    profile_pic = Column(String(255), nullable=True)
    role = Column(
        SqlEnum(AdminRoleEnum), default=AdminRoleEnum.moderator, nullable=False
    )
    user_type = Column(
        SqlEnum(UserTypeEnum), default=UserTypeEnum.admin, nullable=False
    )

    # Status and engagement tracking
    is_email_verified = Column(Boolean, default=False, nullable=False)
    is_phone_verified = Column(Boolean, default=False, nullable=False)
    is_approved = Column(Boolean, default=False, nullable=False)
    last_login_at = Column(TIMESTAMP(timezone=True), nullable=True)

    # Relationships
    approved_counsellors = relationship("Counsellor", back_populates="approver")
