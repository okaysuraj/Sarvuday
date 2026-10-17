"""Shared constants helpers used by API features."""

from enum import Enum


# Gender Enum
class GenderEnum(str, Enum):
    male = "male"
    female = "female"
    other = "other"


# User Type Enum
class UserTypeEnum(str, Enum):
    normal_user = "normal_user"
    counsellor = "counsellor"
    admin = "admin"


# Admin Role Enum
class AdminRoleEnum(str, Enum):
    super_admin = "super_admin"
    moderator = "moderator"
    auditor = "auditor"
    support = "support"


# Assessments scoring constants
MAX_BDI_SCORE = 63
MAX_HDRS_SCORE = 53
MAX_PHQ9_SCORE = 27


# Assessment Type Enum
class AssessmentTypeEnum(str, Enum):
    BDI = "BDI"
    HDRS = "HDRS"
    PHQ9 = "PHQ9"


# Appointment Status Enum
class AppointmentStatusEnum(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"
    completed = "completed"
    rescheduled = "rescheduled"


# Counsellor Availability Status Enum
class CounsellorAvailabilityStatusEnum(str, Enum):
    available = "available"
    unavailable = "unavailable"
    booked = "booked"
    on_leave = "on_leave"


# Payment Status Enum
class PaymentStatusEnum(str, Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"
    refunded = "refunded"


# Counsellor Payout Status Enum
class CounsellorPayoutStatusEnum(str, Enum):
    pending = "pending"
    initiated = "initiated"
    completed = "completed"
    failed = "failed"


# Payment Method Enum
class PaymentMethodEnum(str, Enum):
    credit_card = "credit_card"
    debit_card = "debit_card"
    net_banking = "net_banking"
    upi = "upi"


# Payout Method Enum
class CounsellorPayoutMethodEnum(str, Enum):
    bank_transfer = "bank_transfer"
    cheque = "cheque"
    upi = "upi"


# Commission Type Enum
class CommissionTypeEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
