# app/schemas/__init__.py

from .common_schemas import StatusResponse

from .auth_schemas import UserBase, UserRegister, UserRegisterResponse, UserLogin, UserLoginResponse, PasswordResetRequest, PasswordResetConfirm, PasswordUpdateRequest, PhoneVerificationRequest, PhoneVerificationConfirm, TokenValidationResponse, GoogleLoginRequest

from .admins_schemas import AdminBase, AdminCreate, AdminCreateResponse, AdminUpdateRequest, AdminUpdateResponse, AdminFilterQuery, AdminListResponse, ApproveCounsellorResponse, DisapprovalCounsellorResponse, PlatformAnalytics, UserAnalytics, CounsellorAnalytics

from .counsellors_schemas import CounsellorBase, CounsellorAdminView, CounsellorUpdateRequest, CounsellorUpdateResponse, CounsellorApprovalResponse, CounsellorFilterQuery, CounsellorListResponse, CounsellorWebView, CounsellorListWebView, CounsellorDashboardView

from .normal_users_schemas import NormalUserBase, UserUpdateRequest, UserUpdateResponse, UserFilterQuery, UserListResponse, DashboardOverviewResponse, SentimentTrendsResponse, CounsellingSessionResponse

from .appointments_schemas import NormalUserAppointmentView, CounsellorAppointmentView, AppointmentBase, AppointmentListResponse, CreateAppointmentRequest, CreateAppointmentResponse,  UpdateAppointmentRequest, CancelAppointmentResponse, AppointmentFilterQuery, SessionAppointmentView

from .availability_schemas import AddAvailabilitySlot, UpdateAvailabilitySlot, AvailableSlot, AvailableSlotsResponse

from .assessments_schemas import AssessmentSchema, ScoreRequestSchema, ScoreResponseSchema, ComprehensiveScoreResponse

from .chatbot_schemas import ChatSessionCreateRequest, ChatSessionResponse, ChatRequest, ChatResponse, UpdateTitleRequest, UpdateTitleResponse, ChatHistoryResponse, ChatSessionListResponse

from .disorders_schemas import DisorderCreate, DisorderCreateResponse, DisordersListResponse, DisorderUpdate, DisorderUpdateResponse, DisorderBase, DisorderBulkCreateResponse

from .sentiments_schemas import SentimentInput, SentimentPrediction, UserMessage, UserSentiment, EmotionStreakResponse, SentimentAnalysisSummary, SentimentAnalysisSummaryResponse

from .payment_schemas import CounsellorPaymentBase, CounsellorPaymentCreate, CounsellorPaymentResponse, CounsellorPaymentUpdate, CounsellorPaymentListResponse, UserPaymentBase, UserPaymentInitiate, UserPaymentInitiateResponse, PaymentRefundRequest, PaymentRefundResponse, UserPaymentListResponse

from .counselling_session_schemas import CounsellingSessionJoinResponse

from .prescription_schemas import PrescriptionBase, PrescriptionListResponse, PrescriptionCreate

__all__ = [
    # Common Schemas
    "StatusResponse",
    
    # Auth
    "UserBase",
    "UserRegister",
    "UserRegisterResponse",
    "UserLogin",
    "UserLoginResponse",
    "PasswordResetRequest",
    "PasswordResetConfirm",
    "PasswordUpdateRequest",
    "PhoneVerificationRequest",
    "PhoneVerificationConfirm",
    "TokenValidationResponse",
    "GoogleLoginRequest",
    
    # Admin
    "AdminBase",
    "AdminCreate",
    "AdminCreateResponse",
    "AdminUpdateRequest",
    "AdminUpdateResponse",
    "AdminFilterQuery",
    "AdminListResponse",
    "ApproveCounsellorResponse",
    "DisapprovalCounsellorResponse",
    "PlatformAnalytics",
    "UserAnalytics",
    "CounsellorAnalytics",
    
    # Counsellor
    "CounsellorBase",
    "CounsellorAdminView",
    "CounsellorUpdateRequest",
    "CounsellorUpdateResponse",
    "CounsellorApprovalResponse",
    "CounsellorFilterQuery",
    "CounsellorListResponse",
    "CounsellorWebView",
    "CounsellorListWebView",
    "CounsellorDashboardView",
    
    # Normal User
    "NormalUserBase",
    "UserUpdateRequest",
    "UserUpdateResponse",
    "UserFilterQuery",
    "UserListResponse",
    "DashboardOverviewResponse",
    "SentimentTrendsResponse",
    
    # Availability
    "AddAvailabilitySlot",
    "UpdateAvailabilitySlot",
    "AvailableSlot",
    "AvailableSlotsResponse",
    
    # Appointment
    "NormalUserAppointmentView",
    "CounsellorAppointmentView",
    "AppointmentBase",
    "AppointmentListResponse",
    "CreateAppointmentRequest",
    "CreateAppointmentResponse",
    "UpdateAppointmentRequest",
    "CancelAppointmentResponse",
    "AppointmentFilterQuery",
    "SessionAppointmentView",
    
    # Assessments
    "AssessmentSchema",
    "ScoreRequestSchema",
    "ScoreResponseSchema",
    "ComprehensiveScoreResponse",
    
    # Chatbot
    "ChatSessionCreateRequest",
    "ChatSessionResponse",
    "ChatRequest",
    "ChatResponse",
    "UpdateTitleRequest",
    "UpdateTitleResponse",
    "ChatHistoryResponse",
    "ChatSessionListResponse",
    
    # Disorders
    "DisorderCreate",
    "DisorderCreateResponse",
    "DisordersListResponse",
    "DisorderUpdate",
    "DisorderUpdateResponse",
    "DisorderBase",
    "DisorderBulkCreateResponse",
    
    # Sentiments
    "SentimentInput",
    "SentimentPrediction",
    "UserMessage",
    "UserSentiment",
    "EmotionStreakResponse",
    "SentimentAnalysisSummary",
    "SentimentAnalysisSummaryResponse",
    
    # Payments
    'CounsellorPaymentBase',
    "CounsellorPaymentCreate",
    "CounsellorPaymentResponse",
    "CounsellorPaymentUpdate",
    "CounsellorPaymentListResponse",
    "UserPaymentBase",
    "UserPaymentInitiate",
    "UserPaymentInitiateResponse",
    "PaymentRefundRequest",
    "PaymentRefundResponse",
    "UserPaymentListResponse",
    
    # Counselling Session
    "CounsellingSessionJoinResponse",
    
    # Prescriptions
    "PrescriptionBase",
    "PrescriptionListResponse",
    "PrescriptionCreate",
    
]