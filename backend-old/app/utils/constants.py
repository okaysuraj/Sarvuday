# app/utils/constants.py

from enum import Enum

# Verify email route
verify_email_route = "/auth/verify-email"
admin_verify_email_route = "/"
reset_password_route = "/auth/reset-password"

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

# User ID generation configuration
USER_ID_CONFIG = {
    UserTypeEnum.normal_user.value: {"prefix": "NUSER", "length": 9},
    UserTypeEnum.counsellor.value: {"prefix": "CUSER", "length": 6},
    UserTypeEnum.admin.value: {"prefix": "ADMIN", "length": 3},
}

# Admin Role Enum
class AdminRoleEnum(str, Enum):
    super_admin = "super_admin"
    moderator = "moderator"
    auditor = "auditor"
    support = "support"

# User Emotions Enum
class UserEmotionsEnum(str, Enum):
    grateful = "grateful"
    happy = "happy"
    sad = "sad"
    fear = "fear"
    stress = "stress"
    anxiety = "anxiety"
    bipolar = "bipolar"
    depression = "depression"

# Emotions and their categories
EMOTION_CATEGORIES = {
    "positive": [UserEmotionsEnum.grateful.value, UserEmotionsEnum.happy.value],
    "negative": [UserEmotionsEnum.sad.value, UserEmotionsEnum.fear.value, UserEmotionsEnum.stress.value, UserEmotionsEnum.anxiety.value, UserEmotionsEnum.bipolar.value, UserEmotionsEnum.depression.value],
    "neutral": []
}

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

COUNSELLOR_AVAILABILITY_DAYS = 30
    
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

# Commission Percentage Constant
COMMISSION_PERCENTAGE = {
    CommissionTypeEnum.low.value: 5,
    CommissionTypeEnum.medium.value: 10,
    CommissionTypeEnum.high.value: 15,
}
