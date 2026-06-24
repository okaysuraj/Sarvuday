# app/models/users/normal_user.py

from sqlalchemy import Column, String, Boolean, Enum as SqlEnum, Text, Integer, TIMESTAMP, DateTime, Index
from sqlalchemy.orm import relationship
from app.database.postgres import Base
from app.models.base import BaseMixin
from app.utils.constants import GenderEnum, UserTypeEnum

class NormalUser(Base, BaseMixin):
    """Platform user seeking mental health support"""
    __tablename__ = "normal_users"
    __table_args__ = (
        Index('idx_normal_user_id', 'user_id'),
        Index('idx_normal_user_email', 'email'),
        {}
    )

    user_id = Column(String(20), primary_key=True, index=True, unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(15), unique=True)
    hashed_password = Column(String(255))
    firebase_uid = Column(String(255), unique=True)

    name = Column(String(255), nullable=False)
    gender = Column(SqlEnum(GenderEnum))
    user_type = Column(SqlEnum(UserTypeEnum), default=UserTypeEnum.normal_user)
    profile_pic = Column(String(255))

    is_email_verified = Column(Boolean, default=False)
    is_phone_verified = Column(Boolean, default=False)
    last_verification_sent_at = Column(DateTime)

    preferred_languages = Column(Text)
    primary_concerns = Column(Text)
    country = Column(String(100))
    state = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    pincode = Column(String(10))

    last_login_at = Column(TIMESTAMP)
    terms_accepted = Column(Boolean, default=False)
    privacy_policy_accepted = Column(Boolean, default=False)
    total_sessions_attended = Column(Integer, default=0)

    # Relationships
    chat_sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")
    appointments = relationship("Appointment", back_populates="user")
    counselling_sessions = relationship("CounsellingSession", back_populates="user")
    prescription = relationship("Prescription", back_populates="user")
    
    payments = relationship("UserPayment", back_populates="user")
    refunds = relationship("UserRefund", back_populates="user")
