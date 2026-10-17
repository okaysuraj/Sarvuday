"""Register the full SQL model registry for relationships and Alembic."""

from .base import BaseMixin
from .account import Account
from .assessment import AssessmentQuestion, AssessmentResult
from .community import CommunityPost, CounsellorReview, SupportGroup
from .content import Disorder, Exercise, ExerciseProgress
from .safety import ContactSubmission, CrisisLog, FlaggedContent
from .sessions.chat_turn import ChatTurn
from .wellness import (
    BiofeedbackTelemetry,
    JournalEntry,
    MoodTracking,
    SleepTracking,
    UserGoal,
    UserMedication,
    UserWallet,
)
from .chat import DirectMessage
from .medical import Prescription
from .notification import Notification
from .payments import CounsellorPayment, UserPayment, UserRefund
from .scheduling import Appointment, CounsellorAvailability
from .sessions import ChatSession, CounsellingSession
from .users import Admin, Counsellor, NormalUser

__all__ = [
    "Account",
    "AssessmentQuestion",
    "AssessmentResult",
    "CommunityPost",
    "CounsellorReview",
    "SupportGroup",
    "Disorder",
    "Exercise",
    "ExerciseProgress",
    "ContactSubmission",
    "CrisisLog",
    "FlaggedContent",
    "ChatTurn",
    "BiofeedbackTelemetry",
    "JournalEntry",
    "MoodTracking",
    "SleepTracking",
    "UserGoal",
    "UserMedication",
    "UserWallet",
    "BaseMixin",
    "NormalUser",
    "Counsellor",
    "Admin",
    "ChatSession",
    "CounsellingSession",
    "CounsellorAvailability",
    "Appointment",
    "UserPayment",
    "UserRefund",
    "CounsellorPayment",
    "Prescription",
    "DirectMessage",
    "Notification",
]
