"""Stable ownership key shared by the three existing profile types."""

from sqlalchemy import CheckConstraint, Column, String

from app.database.postgres import Base


class Account(Base):
    __tablename__ = "accounts"
    __table_args__ = (
        CheckConstraint(
            "user_type IN ('normal_user', 'counsellor', 'admin')",
            name="ck_account_type",
        ),
    )

    user_id = Column(String(20), primary_key=True)
    user_type = Column(String(20), nullable=False)
