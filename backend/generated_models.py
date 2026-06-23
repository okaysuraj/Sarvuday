from typing import Optional
import datetime
import decimal
import enum

from sqlalchemy import Boolean, DateTime, Double, Enum, ForeignKeyConstraint, Index, Integer, JSON, Numeric, PrimaryKeyConstraint, String, Text, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class Adminroleenum(str, enum.Enum):
    SUPER_ADMIN = 'super_admin'
    MODERATOR = 'moderator'
    AUDITOR = 'auditor'
    SUPPORT = 'support'


class Appointmentstatusenum(str, enum.Enum):
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    SCHEDULED = 'scheduled'
    CANCELLED = 'cancelled'
    COMPLETED = 'completed'
    RESCHEDULED = 'rescheduled'


class Commissiontypeenum(str, enum.Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'


class Counselloravailabilitystatusenum(str, enum.Enum):
    AVAILABLE = 'available'
    UNAVAILABLE = 'unavailable'
    BOOKED = 'booked'
    ON_LEAVE = 'on_leave'


class Counsellorpayoutmethodenum(str, enum.Enum):
    BANK_TRANSFER = 'bank_transfer'
    CHEQUE = 'cheque'
    UPI = 'upi'


class Counsellorpayoutstatusenum(str, enum.Enum):
    PENDING = 'pending'
    INITIATED = 'initiated'
    COMPLETED = 'completed'
    FAILED = 'failed'


class Genderenum(str, enum.Enum):
    MALE = 'male'
    FEMALE = 'female'
    OTHER = 'other'


class Messagetype(str, enum.Enum):
    TEXT = 'text'
    IMAGE = 'image'
    FILE = 'file'
    SYSTEM = 'system'


class Paymentmethodenum(str, enum.Enum):
    CREDIT_CARD = 'credit_card'
    DEBIT_CARD = 'debit_card'
    CARD = 'card'
    NET_BANKING = 'net_banking'
    UPI = 'upi'


class Paymentstatusenum(str, enum.Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    SUCCESS = 'success'
    FAILED = 'failed'
    REFUNDED = 'refunded'


class Usertypeenum(str, enum.Enum):
    NORMAL_USER = 'normal_user'
    COUNSELLOR = 'counsellor'
    ADMIN = 'admin'


class Admins(Base):
    __tablename__ = 'admins'
    __table_args__ = (
        PrimaryKeyConstraint('user_id', name='admins_pkey'),
        UniqueConstraint('email', name='admins_email_key'),
        UniqueConstraint('firebase_uid', name='admins_firebase_uid_key'),
        UniqueConstraint('phone_number', name='admins_phone_number_key'),
        Index('idx_admin_email', 'email'),
        Index('idx_admin_id', 'user_id'),
        Index('ix_admins_user_id', 'user_id', unique=True)
    )

    user_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[Adminroleenum] = mapped_column(Enum(Adminroleenum, values_callable=lambda cls: [member.value for member in cls], name='adminroleenum'), nullable=False)
    user_type: Mapped[Usertypeenum] = mapped_column(Enum(Usertypeenum, values_callable=lambda cls: [member.value for member in cls], name='usertypeenum'), nullable=False)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_phone_verified: Mapped[bool] = mapped_column(Boolean, nullable=False)
    is_approved: Mapped[bool] = mapped_column(Boolean, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(15))
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255))
    firebase_uid: Mapped[Optional[str]] = mapped_column(String(255))
    gender: Mapped[Optional[Genderenum]] = mapped_column(Enum(Genderenum, values_callable=lambda cls: [member.value for member in cls], name='genderenum'))
    profile_pic: Mapped[Optional[str]] = mapped_column(String(255))
    last_verification_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    last_login_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))

    counsellors: Mapped[list['Counsellors']] = relationship('Counsellors', back_populates='admins')


class DirectMessages(Base):
    __tablename__ = 'direct_messages'
    __table_args__ = (
        PrimaryKeyConstraint('message_id', name='direct_messages_pkey'),
        Index('idx_dm_room', 'room_id'),
        Index('idx_dm_room_created', 'room_id', 'created_at')
    )

    message_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    room_id: Mapped[str] = mapped_column(String(100), nullable=False)
    sender_id: Mapped[str] = mapped_column(String(20), nullable=False)
    sender_type: Mapped[str] = mapped_column(String(20), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    message_type: Mapped[Optional[Messagetype]] = mapped_column(Enum(Messagetype, values_callable=lambda cls: [member.value for member in cls], name='messagetype'))
    is_read: Mapped[Optional[bool]] = mapped_column(Boolean)


class NormalUsers(Base):
    __tablename__ = 'normal_users'
    __table_args__ = (
        PrimaryKeyConstraint('user_id', name='normal_users_pkey'),
        UniqueConstraint('email', name='normal_users_email_key'),
        UniqueConstraint('firebase_uid', name='normal_users_firebase_uid_key'),
        UniqueConstraint('phone_number', name='normal_users_phone_number_key'),
        Index('idx_normal_user_email', 'email'),
        Index('idx_normal_user_id', 'user_id'),
        Index('ix_normal_users_user_id', 'user_id', unique=True)
    )

    user_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(15))
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255))
    firebase_uid: Mapped[Optional[str]] = mapped_column(String(255))
    gender: Mapped[Optional[Genderenum]] = mapped_column(Enum(Genderenum, values_callable=lambda cls: [member.value for member in cls], name='genderenum'))
    user_type: Mapped[Optional[Usertypeenum]] = mapped_column(Enum(Usertypeenum, values_callable=lambda cls: [member.value for member in cls], name='usertypeenum'))
    profile_pic: Mapped[Optional[str]] = mapped_column(String(255))
    is_email_verified: Mapped[Optional[bool]] = mapped_column(Boolean)
    is_phone_verified: Mapped[Optional[bool]] = mapped_column(Boolean)
    last_verification_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    preferred_languages: Mapped[Optional[str]] = mapped_column(Text)
    primary_concerns: Mapped[Optional[str]] = mapped_column(Text)
    country: Mapped[Optional[str]] = mapped_column(String(100))
    state: Mapped[Optional[str]] = mapped_column(String(100))
    city: Mapped[Optional[str]] = mapped_column(String(100))
    address: Mapped[Optional[str]] = mapped_column(Text)
    pincode: Mapped[Optional[str]] = mapped_column(String(10))
    last_login_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    terms_accepted: Mapped[Optional[bool]] = mapped_column(Boolean)
    privacy_policy_accepted: Mapped[Optional[bool]] = mapped_column(Boolean)
    total_sessions_attended: Mapped[Optional[int]] = mapped_column(Integer)
    device_token: Mapped[Optional[str]] = mapped_column(String(255))

    chat_sessions: Mapped[list['ChatSessions']] = relationship('ChatSessions', back_populates='user')
    notifications: Mapped[list['Notifications']] = relationship('Notifications', back_populates='user')
    user_payments: Mapped[list['UserPayments']] = relationship('UserPayments', back_populates='user')
    chat_histories: Mapped[list['ChatHistories']] = relationship('ChatHistories', back_populates='user')
    counselling_sessions: Mapped[list['CounsellingSessions']] = relationship('CounsellingSessions', back_populates='user')
    user_refunds: Mapped[list['UserRefunds']] = relationship('UserRefunds', back_populates='user')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='user')
    prescriptions: Mapped[list['Prescriptions']] = relationship('Prescriptions', back_populates='user')


class OtpRecords(Base):
    __tablename__ = 'otp_records'
    __table_args__ = (
        PrimaryKeyConstraint('otp_id', name='otp_records_pkey'),
        Index('ix_otp_records_identifier', 'identifier')
    )

    otp_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    identifier: Mapped[str] = mapped_column(String(255), nullable=False)
    otp_code_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    user_type: Mapped[str] = mapped_column(String(50), nullable=False)
    purpose: Mapped[str] = mapped_column(String(50), nullable=False)
    expires_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    is_used: Mapped[Optional[bool]] = mapped_column(Boolean)


class ChatSessions(Base):
    __tablename__ = 'chat_sessions'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='chat_sessions_user_id_fkey'),
        PrimaryKeyConstraint('session_id', name='chat_sessions_pkey'),
        Index('idx_chat_session_id', 'session_id', 'user_id'),
        Index('ix_chat_sessions_session_id', 'session_id', unique=True)
    )

    session_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    title: Mapped[Optional[str]] = mapped_column(String(255))
    message_count: Mapped[Optional[int]] = mapped_column(Integer)
    emotions_detected: Mapped[Optional[str]] = mapped_column(Text)
    is_crisis: Mapped[Optional[bool]] = mapped_column(Boolean)
    is_deleted: Mapped[Optional[bool]] = mapped_column(Boolean)

    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='chat_sessions')
    chat_histories: Mapped[list['ChatHistories']] = relationship('ChatHistories', back_populates='session')


class Counsellors(Base):
    __tablename__ = 'counsellors'
    __table_args__ = (
        ForeignKeyConstraint(['approved_by'], ['admins.user_id'], name='counsellors_approved_by_fkey'),
        PrimaryKeyConstraint('user_id', name='counsellors_pkey'),
        UniqueConstraint('email', name='counsellors_email_key'),
        UniqueConstraint('firebase_uid', name='counsellors_firebase_uid_key'),
        UniqueConstraint('phone_number', name='counsellors_phone_number_key'),
        Index('idx_approved_counsellor', 'is_approved'),
        Index('idx_counsellor_email', 'email'),
        Index('idx_counsellor_id', 'user_id'),
        Index('ix_counsellors_user_id', 'user_id', unique=True)
    )

    user_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    phone_number: Mapped[Optional[str]] = mapped_column(String(15))
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255))
    firebase_uid: Mapped[Optional[str]] = mapped_column(String(255))
    gender: Mapped[Optional[Genderenum]] = mapped_column(Enum(Genderenum, values_callable=lambda cls: [member.value for member in cls], name='genderenum'))
    user_type: Mapped[Optional[Usertypeenum]] = mapped_column(Enum(Usertypeenum, values_callable=lambda cls: [member.value for member in cls], name='usertypeenum'))
    profile_pic: Mapped[Optional[str]] = mapped_column(String(255))
    bio: Mapped[Optional[str]] = mapped_column(Text)
    education_qualifications: Mapped[Optional[str]] = mapped_column(Text)
    certifications: Mapped[Optional[str]] = mapped_column(Text)
    specializations: Mapped[Optional[str]] = mapped_column(Text)
    license_number: Mapped[Optional[str]] = mapped_column(String(255))
    license_issuing_authority: Mapped[Optional[str]] = mapped_column(String(255))
    license_expiry_date: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    identity_proof_url: Mapped[Optional[str]] = mapped_column(String(255))
    license_proof_url: Mapped[Optional[str]] = mapped_column(String(255))
    session_fee: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(7, 2))
    session_duration: Mapped[Optional[int]] = mapped_column(Integer)
    experience_years: Mapped[Optional[int]] = mapped_column(Integer)
    is_email_verified: Mapped[Optional[bool]] = mapped_column(Boolean)
    is_phone_verified: Mapped[Optional[bool]] = mapped_column(Boolean)
    is_approved: Mapped[Optional[bool]] = mapped_column(Boolean)
    last_verification_sent_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    approved_by: Mapped[Optional[str]] = mapped_column(String(20))
    languages: Mapped[Optional[str]] = mapped_column(Text)
    country: Mapped[Optional[str]] = mapped_column(String(100))
    state: Mapped[Optional[str]] = mapped_column(String(100))
    city: Mapped[Optional[str]] = mapped_column(String(100))
    address: Mapped[Optional[str]] = mapped_column(Text)
    pincode: Mapped[Optional[str]] = mapped_column(String(10))
    average_rating: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(3, 2))
    total_reviews: Mapped[Optional[int]] = mapped_column(Integer)
    is_featured: Mapped[Optional[bool]] = mapped_column(Boolean)
    last_login_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    terms_accepted: Mapped[Optional[bool]] = mapped_column(Boolean)
    privacy_policy_accepted: Mapped[Optional[bool]] = mapped_column(Boolean)
    device_token: Mapped[Optional[str]] = mapped_column(String(255))

    admins: Mapped[Optional['Admins']] = relationship('Admins', back_populates='counsellors')
    counselling_sessions: Mapped[list['CounsellingSessions']] = relationship('CounsellingSessions', back_populates='counsellor')
    counsellor_availability: Mapped[list['CounsellorAvailability']] = relationship('CounsellorAvailability', back_populates='counsellor')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='counsellor')
    prescriptions: Mapped[list['Prescriptions']] = relationship('Prescriptions', back_populates='counsellor')
    counsellor_payments: Mapped[list['CounsellorPayments']] = relationship('CounsellorPayments', back_populates='counsellor')


class Notifications(Base):
    __tablename__ = 'notifications'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='notifications_user_id_fkey'),
        PrimaryKeyConstraint('notification_id', name='notifications_pkey'),
        Index('idx_notification_user', 'user_id')
    )

    notification_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    type: Mapped[Optional[str]] = mapped_column(String(50))
    is_read: Mapped[Optional[bool]] = mapped_column(Boolean)

    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='notifications')


class UserPayments(Base):
    __tablename__ = 'user_payments'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='user_payments_user_id_fkey'),
        PrimaryKeyConstraint('payment_id', name='user_payments_pkey'),
        Index('idx_payment_transaction_id', 'transaction_id'),
        Index('idx_user_payment_id', 'payment_id'),
        Index('idx_user_payment_status', 'status')
    )

    payment_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    amount: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    payment_method: Mapped[Paymentmethodenum] = mapped_column(Enum(Paymentmethodenum, values_callable=lambda cls: [member.value for member in cls], name='paymentmethodenum'), nullable=False)
    transaction_id: Mapped[str] = mapped_column(String(255), nullable=False)
    transaction_date: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    payment_gateway: Mapped[str] = mapped_column(String(50), nullable=False)
    payment_receipt_url: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    status: Mapped[Optional[Paymentstatusenum]] = mapped_column(Enum(Paymentstatusenum, values_callable=lambda cls: [member.value for member in cls], name='paymentstatusenum'))
    currency: Mapped[Optional[str]] = mapped_column(String(10))
    payment_response: Mapped[Optional[dict]] = mapped_column(JSON)
    refunded: Mapped[Optional[bool]] = mapped_column(Boolean)

    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='user_payments')
    user_refunds: Mapped[list['UserRefunds']] = relationship('UserRefunds', back_populates='payment')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='payment')


class ChatHistories(Base):
    __tablename__ = 'chat_histories'
    __table_args__ = (
        ForeignKeyConstraint(['session_id'], ['chat_sessions.session_id'], name='chat_histories_session_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='chat_histories_user_id_fkey'),
        PrimaryKeyConstraint('message_id', name='chat_histories_pkey'),
        Index('idx_chat_user', 'user_id')
    )

    message_id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    session_id: Mapped[str] = mapped_column(String(20), nullable=False)
    role: Mapped[str] = mapped_column(String(10), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    timestamp: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    emotion_intensity_score: Mapped[Optional[str]] = mapped_column(String(10))
    primary_emotion: Mapped[Optional[str]] = mapped_column(String(50))
    is_crisis: Mapped[Optional[bool]] = mapped_column(Boolean)

    session: Mapped['ChatSessions'] = relationship('ChatSessions', back_populates='chat_histories')
    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='chat_histories')


class CounsellingSessions(Base):
    __tablename__ = 'counselling_sessions'
    __table_args__ = (
        ForeignKeyConstraint(['counsellor_id'], ['counsellors.user_id'], name='counselling_sessions_counsellor_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='counselling_sessions_user_id_fkey'),
        PrimaryKeyConstraint('session_id', name='counselling_sessions_pkey'),
        Index('idx_counselling_session', 'user_id', 'counsellor_id'),
        Index('ix_counselling_sessions_session_id', 'session_id', unique=True)
    )

    session_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    counsellor_id: Mapped[str] = mapped_column(String(20), nullable=False)
    video_url: Mapped[str] = mapped_column(Text, nullable=False)
    user_token: Mapped[str] = mapped_column(Text, nullable=False)
    counsellor_token: Mapped[str] = mapped_column(Text, nullable=False)
    room_created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    session_scheduled_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    session_expires_at: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    video_session_completed: Mapped[Optional[bool]] = mapped_column(Boolean)
    session_room_deleted: Mapped[Optional[bool]] = mapped_column(Boolean)
    rating: Mapped[Optional[float]] = mapped_column(Double(53))

    counsellor: Mapped['Counsellors'] = relationship('Counsellors', back_populates='counselling_sessions')
    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='counselling_sessions')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='session')
    prescriptions: Mapped[list['Prescriptions']] = relationship('Prescriptions', back_populates='session')


class CounsellorAvailability(Base):
    __tablename__ = 'counsellor_availability'
    __table_args__ = (
        ForeignKeyConstraint(['counsellor_id'], ['counsellors.user_id'], name='counsellor_availability_counsellor_id_fkey'),
        PrimaryKeyConstraint('availability_slot_id', name='counsellor_availability_pkey'),
        Index('idx_availability_slot', 'counsellor_id', 'start_time', unique=True)
    )

    availability_slot_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    counsellor_id: Mapped[str] = mapped_column(String(20), nullable=False)
    start_time: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    end_time: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    status: Mapped[Optional[Counselloravailabilitystatusenum]] = mapped_column(Enum(Counselloravailabilitystatusenum, values_callable=lambda cls: [member.value for member in cls], name='counselloravailabilitystatusenum'))
    notes: Mapped[Optional[str]] = mapped_column(Text)

    counsellor: Mapped['Counsellors'] = relationship('Counsellors', back_populates='counsellor_availability')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='availability_slot')


class UserRefunds(Base):
    __tablename__ = 'user_refunds'
    __table_args__ = (
        ForeignKeyConstraint(['payment_id'], ['user_payments.payment_id'], name='user_refunds_payment_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='user_refunds_user_id_fkey'),
        PrimaryKeyConstraint('refund_id', name='user_refunds_pkey'),
        Index('idx_refund_id', 'refund_id'),
        Index('idx_refund_transaction_id', 'transaction_id')
    )

    refund_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    refund_method: Mapped[Paymentmethodenum] = mapped_column(Enum(Paymentmethodenum, values_callable=lambda cls: [member.value for member in cls], name='paymentmethodenum'), nullable=False)
    transaction_id: Mapped[str] = mapped_column(String(255), nullable=False)
    payment_gateway: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    user_id: Mapped[Optional[str]] = mapped_column(String(20))
    payment_id: Mapped[Optional[str]] = mapped_column(String(20))
    refund_amount: Mapped[Optional[decimal.Decimal]] = mapped_column(Numeric(10, 2))
    currency: Mapped[Optional[str]] = mapped_column(String(10))
    refund_date: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    payment_response: Mapped[Optional[dict]] = mapped_column(JSON)
    refunded_invoice_url: Mapped[Optional[str]] = mapped_column(String(255))
    refund_reason: Mapped[Optional[str]] = mapped_column(Text)

    payment: Mapped[Optional['UserPayments']] = relationship('UserPayments', back_populates='user_refunds')
    user: Mapped[Optional['NormalUsers']] = relationship('NormalUsers', back_populates='user_refunds')
    appointments: Mapped[list['Appointments']] = relationship('Appointments', back_populates='refund')


class Appointments(Base):
    __tablename__ = 'appointments'
    __table_args__ = (
        ForeignKeyConstraint(['availability_slot_id'], ['counsellor_availability.availability_slot_id'], name='appointments_availability_slot_id_fkey'),
        ForeignKeyConstraint(['counsellor_id'], ['counsellors.user_id'], name='appointments_counsellor_id_fkey'),
        ForeignKeyConstraint(['payment_id'], ['user_payments.payment_id'], name='appointments_payment_id_fkey'),
        ForeignKeyConstraint(['refund_id'], ['user_refunds.refund_id'], name='appointments_refund_id_fkey'),
        ForeignKeyConstraint(['session_id'], ['counselling_sessions.session_id'], name='appointments_session_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='appointments_user_id_fkey'),
        PrimaryKeyConstraint('appointment_id', name='appointments_pkey'),
        Index('idx_appointment', 'availability_slot_id', 'session_id')
    )

    appointment_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    counsellor_id: Mapped[str] = mapped_column(String(20), nullable=False)
    availability_slot_id: Mapped[str] = mapped_column(String(20), nullable=False)
    session_id: Mapped[str] = mapped_column(String(20), nullable=False)
    payment_id: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    status: Mapped[Optional[Appointmentstatusenum]] = mapped_column(Enum(Appointmentstatusenum, values_callable=lambda cls: [member.value for member in cls], name='appointmentstatusenum'))
    reason: Mapped[Optional[str]] = mapped_column(Text)
    refund_id: Mapped[Optional[str]] = mapped_column(String(20))
    cancellation_reason: Mapped[Optional[str]] = mapped_column(Text)

    availability_slot: Mapped['CounsellorAvailability'] = relationship('CounsellorAvailability', back_populates='appointments')
    counsellor: Mapped['Counsellors'] = relationship('Counsellors', back_populates='appointments')
    payment: Mapped['UserPayments'] = relationship('UserPayments', back_populates='appointments')
    refund: Mapped[Optional['UserRefunds']] = relationship('UserRefunds', back_populates='appointments')
    session: Mapped['CounsellingSessions'] = relationship('CounsellingSessions', back_populates='appointments')
    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='appointments')
    counsellor_payments: Mapped[list['CounsellorPayments']] = relationship('CounsellorPayments', back_populates='appointment')


class Prescriptions(Base):
    __tablename__ = 'prescriptions'
    __table_args__ = (
        ForeignKeyConstraint(['counsellor_id'], ['counsellors.user_id'], name='prescriptions_counsellor_id_fkey'),
        ForeignKeyConstraint(['session_id'], ['counselling_sessions.session_id'], name='prescriptions_session_id_fkey'),
        ForeignKeyConstraint(['user_id'], ['normal_users.user_id'], name='prescriptions_user_id_fkey'),
        PrimaryKeyConstraint('prescription_id', name='prescriptions_pkey'),
        Index('idx_prescription_user', 'user_id')
    )

    prescription_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(20), nullable=False)
    counsellor_id: Mapped[str] = mapped_column(String(20), nullable=False)
    session_id: Mapped[str] = mapped_column(String(20), nullable=False)
    generated_date: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    prescription_url: Mapped[Optional[str]] = mapped_column(String(255))
    diagnosis: Mapped[Optional[str]] = mapped_column(Text)
    medications: Mapped[Optional[dict]] = mapped_column(JSON)
    recommendations: Mapped[Optional[dict]] = mapped_column(JSON)

    counsellor: Mapped['Counsellors'] = relationship('Counsellors', back_populates='prescriptions')
    session: Mapped['CounsellingSessions'] = relationship('CounsellingSessions', back_populates='prescriptions')
    user: Mapped['NormalUsers'] = relationship('NormalUsers', back_populates='prescriptions')


class CounsellorPayments(Base):
    __tablename__ = 'counsellor_payments'
    __table_args__ = (
        ForeignKeyConstraint(['appointment_id'], ['appointments.appointment_id'], name='counsellor_payments_appointment_id_fkey'),
        ForeignKeyConstraint(['counsellor_id'], ['counsellors.user_id'], name='counsellor_payments_counsellor_id_fkey'),
        PrimaryKeyConstraint('payment_id', name='counsellor_payments_pkey'),
        Index('idx_counsellor_payment_id', 'payment_id'),
        Index('idx_counsellor_payment_status', 'status'),
        Index('idx_payout_date', 'payout_date')
    )

    payment_id: Mapped[str] = mapped_column(String(20), primary_key=True)
    counsellor_id: Mapped[str] = mapped_column(String(20), nullable=False)
    appointment_id: Mapped[str] = mapped_column(String(20), nullable=False)
    commission_type: Mapped[Commissiontypeenum] = mapped_column(Enum(Commissiontypeenum, values_callable=lambda cls: [member.value for member in cls], name='commissiontypeenum'), nullable=False)
    commission_percentage: Mapped[float] = mapped_column(Double(53), nullable=False)
    platform_fee: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    net_payout_amount: Mapped[decimal.Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    payout_method: Mapped[Counsellorpayoutmethodenum] = mapped_column(Enum(Counsellorpayoutmethodenum, values_callable=lambda cls: [member.value for member in cls], name='counsellorpayoutmethodenum'), nullable=False)
    transaction_id: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(True), nullable=False)
    status: Mapped[Optional[Counsellorpayoutstatusenum]] = mapped_column(Enum(Counsellorpayoutstatusenum, values_callable=lambda cls: [member.value for member in cls], name='counsellorpayoutstatusenum'))
    payout_date: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime(True))
    invoice_url: Mapped[Optional[str]] = mapped_column(String(255))
    currency: Mapped[Optional[str]] = mapped_column(String(10))

    appointment: Mapped['Appointments'] = relationship('Appointments', back_populates='counsellor_payments')
    counsellor: Mapped['Counsellors'] = relationship('Counsellors', back_populates='counsellor_payments')
