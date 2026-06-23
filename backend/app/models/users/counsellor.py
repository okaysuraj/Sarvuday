# app/models/users/counsellor.py

from sqlalchemy import (
    Column, String, Boolean, Enum as SqlEnum, Text, Integer,
    ForeignKey, TIMESTAMP, DateTime, Index, DECIMAL
)
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import GenderEnum, UserTypeEnum

class Counsellor(Base, BaseMixin):
    """Represents a licensed mental health counsellor on the platform."""
    __tablename__ = "counsellors"
    __table_args__ = (
        Index('idx_counsellor_id', 'user_id'),
        Index('idx_counsellor_email', 'email'),
        Index('idx_approved_counsellor', 'is_approved'),
        {}
    )

    # Unique platform ID
    user_id = Column(String(20), primary_key=True, nullable=False, unique=True, index=True)

    # Authentication
    email = Column(String(255), nullable=False, unique=True)
    phone_number = Column(String(15), unique=True)
    hashed_password = Column(String(255))
    firebase_uid = Column(String(255), unique=True)

    # Profile
    name = Column(String(255), nullable=False)
    gender = Column(SqlEnum(GenderEnum))
    user_type = Column(SqlEnum(UserTypeEnum), default=UserTypeEnum.counsellor)
    profile_pic = Column(String(255))
    bio = Column(Text)

    # Professional Info
    education_qualifications = Column(Text)
    certifications = Column(Text)
    specializations = Column(Text)
    license_number = Column(String(255))
    license_issuing_authority = Column(String(255))
    license_expiry_date = Column(DateTime)
    identity_proof_url = Column(String(255))
    license_proof_url = Column(String(255))

    # Practice Details
    session_fee = Column(DECIMAL(7, 2), default=0.0)
    session_duration = Column(Integer, default=0)
    experience_years = Column(Integer, default=0)

    # Verification
    is_email_verified = Column(Boolean, default=False)
    is_phone_verified = Column(Boolean, default=False)
    is_approved = Column(Boolean, default=False)
    last_verification_sent_at = Column(DateTime)
    approved_by = Column(String(20), ForeignKey("admins.user_id"))

    # Location
    languages = Column(Text)
    country = Column(String(100))
    state = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    pincode = Column(String(10))

    # Platform Engagement
    average_rating = Column(DECIMAL(3, 2), default=0.0)
    total_reviews = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    last_login_at = Column(TIMESTAMP)
    terms_accepted = Column(Boolean, default=False)
    privacy_policy_accepted = Column(Boolean, default=False)

    # Relationships
    approver = relationship("Admin", back_populates="approved_counsellors")
    availability = relationship("CounsellorAvailability", back_populates="counsellor", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="counsellor")
    payments = relationship("CounsellorPayment", back_populates="counsellor")
    counselling_sessions = relationship("CounsellingSession", back_populates="counsellor")
