// Page imports and route permissions live together so navigation has one source of truth.
import { lazy } from 'react';
const Home = lazy(() => import('./pages/landing/Home'));
const Splash = lazy(() => import('./pages/landing/Splash'));
const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login'));
const ForgotPassword = lazy(() => import('./components/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const RoleSelection = lazy(() => import('./pages/onboarding/RoleSelection'));
const BasicProfileSetup = lazy(() => import('./pages/onboarding/BasicProfileSetup'));
const AgeDemographics = lazy(() => import('./pages/onboarding/AgeDemographics'));
const SymptomsSelection = lazy(() => import('./pages/onboarding/SymptomsSelection'));
const StressFactors = lazy(() => import('./pages/onboarding/StressFactors'));
const HistoryIntake = lazy(() => import('./pages/onboarding/HistoryIntake'));
const ConsentAgreement = lazy(() => import('./pages/onboarding/ConsentAgreement'));
const Disclaimer = lazy(() => import('./pages/onboarding/Disclaimer'));
const EmergencyContact = lazy(() => import('./pages/onboarding/EmergencyContact'));
const PreferencesSetup = lazy(() => import('./pages/onboarding/PreferencesSetup'));
const Disorders = lazy(() => import('./pages/tracking/Disorders'));
const ApprovedCounsellors = lazy(() => import('./pages/counsellor/ApprovedCounsellors'));
const Assessments = lazy(() => import('./pages/tracking/Assessments'));
const ContactUs = lazy(() => import('./pages/landing/ContactUs'));
const About = lazy(() => import('./pages/landing/About'));
const PrivacyPolicy = lazy(() => import('./pages/landing/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/landing/Terms'));
const NormalUserDashboard = lazy(() => import('./pages/dashboard/NormalUserDashboard'));
const Chat = lazy(() => import('./pages/chat/Chat'));
const VideoCallPage = lazy(() => import('./pages/chat/VideoCallPage'));
const CounsellorDashboard = lazy(() => import('./pages/counsellor/CounsellorDashboard'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ContentModeration = lazy(() => import('./pages/admin/ContentModeration'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const TherapistSearch = lazy(() => import('./pages/counsellor/TherapistSearch'));
const TherapistProfile = lazy(() => import('./pages/counsellor/TherapistProfile'));
const BookingType = lazy(() => import('./pages/booking/BookingType'));
const BookingSlot = lazy(() => import('./pages/booking/BookingSlot'));
const BookingPayment = lazy(() => import('./pages/booking/BookingPayment'));
const UserProfile = lazy(() => import('./pages/profile/UserProfile'));
const Notifications = lazy(() => import('./pages/dashboard/Notifications'));
const MyRecords = lazy(() => import('./pages/dashboard/MyRecords'));
const MoodTracker = lazy(() => import('./pages/tracking/MoodTracker'));
const MoodCheckIn = lazy(() => import('./pages/tracking/MoodCheckIn'));
const DailyJournal = lazy(() => import('./pages/tracking/DailyJournal'));
const AIChatHome = lazy(() => import('./pages/chat/AIChatHome'));
const AIChatSession = lazy(() => import('./pages/chat/AIChatSession'));
const AIMoodAnalysisResult = lazy(() => import('./pages/chat/AIMoodAnalysisResult'));
const AIRecommendations = lazy(() => import('./pages/chat/AIRecommendations'));
const AvailabilityManagement = lazy(() => import('./pages/settings/AvailabilityManagement'));
const PatientList = lazy(() => import('./pages/counsellor/PatientList'));
const EarningsDashboard = lazy(() => import('./pages/financial/EarningsDashboard'));
const EditProfile = lazy(() => import('./pages/profile/EditProfile'));
const AppointmentsList = lazy(() => import('./pages/booking/AppointmentsList'));
const WaitingRoom = lazy(() => import('./pages/chat/WaitingRoom'));
const SessionRoom = lazy(() => import('./pages/chat/SessionRoom'));
const SessionNotes = lazy(() => import('./pages/chat/SessionNotes'));
const SessionSummary = lazy(() => import('./pages/chat/SessionSummary'));
const CommunityFeed = lazy(() => import('./pages/community/CommunityFeed'));
const PostCreation = lazy(() => import('./pages/community/PostCreation'));
const SupportGroups = lazy(() => import('./pages/community/SupportGroups'));
const GroupChat = lazy(() => import('./pages/community/GroupChat'));
const TherapistReviews = lazy(() => import('./pages/counsellor/TherapistReviews'));
const SettingsLayout = lazy(() => import('./pages/settings/SettingsLayout'));
const PrivacySettings = lazy(() => import('./pages/settings/PrivacySettings'));
const ReminderSettings = lazy(() => import('./pages/settings/ReminderSettings'));
const AccountData = lazy(() => import('./pages/settings/AccountData'));
const Wallet = lazy(() => import('./pages/financial/Wallet'));
const Subscriptions = lazy(() => import('./pages/financial/Subscriptions'));
const EmergencyHelp = lazy(() => import('./pages/community/EmergencyHelp'));
const GoalTracking = lazy(() => import('./pages/tracking/GoalTracking'));
const SleepTracking = lazy(() => import('./pages/tracking/SleepTracking'));
const SleepMoodCorrelation = lazy(() => import('./pages/tracking/SleepMoodCorrelation'));
const MedicationPlan = lazy(() => import('./pages/tracking/MedicationPlan'));
const StressTriggerAnalysis = lazy(() => import('./pages/tracking/StressTriggerAnalysis'));
const TriggerStressFactors = lazy(() => import('./pages/tracking/TriggerStressFactors'));
const ProgressDashboard = lazy(() => import('./pages/tracking/ProgressDashboard'));
const WeeklyReport = lazy(() => import('./pages/tracking/WeeklyReport'));
const TodayMoodSnapshot = lazy(() => import('./pages/tracking/TodayMoodSnapshot'));
const MoodCalendar = lazy(() => import('./pages/tracking/MoodCalendar'));
const VoiceMoodJournal = lazy(() => import('./pages/tracking/VoiceMoodJournal'));
const WearableIntegration = lazy(() => import('./pages/tracking/WearableIntegration'));
const GuidedMeditation = lazy(() => import('./pages/tracking/GuidedMeditation'));

export const publicRoutes = [
  { path: '/', Page: Home },
  { path: '/splash', Page: Splash },
  { path: '/register', Page: Register },
  { path: '/login', Page: Login },
  { path: '/forgot-password', Page: ForgotPassword },
  { path: '/reset-password', Page: ResetPassword },
  { path: '/onboarding/role-selection', Page: RoleSelection },
  { path: '/onboarding/basic-profile', Page: BasicProfileSetup },
  { path: '/onboarding/age-demographics', Page: AgeDemographics },
  { path: '/onboarding/symptoms', Page: SymptomsSelection },
  { path: '/onboarding/stress-factors', Page: StressFactors },
  { path: '/onboarding/history', Page: HistoryIntake },
  { path: '/onboarding/consent', Page: ConsentAgreement },
  { path: '/onboarding/disclaimer', Page: Disclaimer },
  { path: '/onboarding/emergency-contact', Page: EmergencyContact },
  { path: '/onboarding/preferences', Page: PreferencesSetup },
  { path: '/disorders', Page: Disorders },
  { path: '/approved-counsellors', Page: ApprovedCounsellors },
  { path: '/counsellors', Page: ApprovedCounsellors },
  { path: 'counsellors/:id/book', Page: BookingSlot },
  { path: 'counsellors/:counsellorId/reviews', Page: TherapistReviews },
  { path: 'appointments', Page: AppointmentsList },
  { path: '/assessments', Page: Assessments },
  { path: '/contact-us', Page: ContactUs },
  { path: '/contact', Page: ContactUs },
  { path: '/about', Page: About },
  { path: '/privacy', Page: PrivacyPolicy },
  { path: '/terms', Page: Terms },
  { path: '/emergency', Page: EmergencyHelp },
];

export const dashboardRoutes = [
  { path: '/normal-user-dashboard/*', Page: NormalUserDashboard },
  { path: '/chat', Page: Chat },
  { path: '/therapists', Page: TherapistSearch },
  { path: '/therapists/:id', Page: TherapistProfile },
  { path: '/booking/type', Page: BookingType },
  { path: '/booking/slot', Page: BookingSlot },
  { path: '/booking/payment', Page: BookingPayment },
  { path: '/profile', Page: UserProfile },
  { path: '/profile/edit', Page: EditProfile },
  { path: '/notifications', Page: Notifications },
  { path: '/my-records', Page: MyRecords },
  { path: '/mood-tracker', Page: MoodTracker },
  { path: '/mood-tracker/add', Page: MoodCheckIn },
  { path: '/journal', Page: DailyJournal },
  { path: '/journal/analysis', Page: AIMoodAnalysisResult },
  { path: '/insights', Page: AIRecommendations },
  {
    path: '/counsellor-dashboard',
    roles: ['counsellor'],
    Page: CounsellorDashboard,
  },
  {
    path: '/counsellor-dashboard/patients',
    roles: ['counsellor'],
    Page: PatientList,
  },
  { path: '/schedule', roles: ['counsellor'], Page: AvailabilityManagement },
  { path: '/earnings', roles: ['counsellor'], Page: EarningsDashboard },
  { path: '/ai-chat', Page: AIChatHome },
  { path: '/ai-chat/session', Page: AIChatSession },
  { path: '/counselling-session/:sessionId', Page: VideoCallPage },
  {
    path: '/counsellor-dashboard/*',
    roles: ['counsellor'],
    Page: CounsellorDashboard,
  },
  { path: '/admin-dashboard/*', roles: ['admin'], Page: AdminDashboard },
  {
    path: '/admin-dashboard/moderation',
    roles: ['admin'],
    Page: ContentModeration,
  },
  { path: '/session/waiting', Page: WaitingRoom },
  { path: '/session/:sessionId', Page: SessionRoom },
  { path: '/session/notes', Page: SessionNotes },
  { path: '/session/summary', Page: SessionSummary },
  { path: '/community', Page: CommunityFeed },
  { path: '/community/new', Page: PostCreation },
  { path: '/community/groups', Page: SupportGroups },
  { path: '/community/groups/:groupId', Page: GroupChat },
  {
    path: '/settings',
    Page: SettingsLayout,
    children: [
      { index: true, redirect: 'privacy' },
      { path: 'privacy', Page: PrivacySettings },
      { path: 'reminders', Page: ReminderSettings },
      { path: 'data', Page: AccountData },
    ],
  },
  { path: '/wallet', Page: Wallet },
  { path: '/subscriptions', Page: Subscriptions },
  { path: '/goals', Page: GoalTracking },
  { path: '/sleep', Page: SleepTracking },
  { path: '/sleep/correlation', Page: SleepMoodCorrelation },
  { path: '/medication', Page: MedicationPlan },
  { path: '/stress/analysis', Page: StressTriggerAnalysis },
  { path: '/stress/factors', Page: TriggerStressFactors },
  { path: '/progress', Page: ProgressDashboard },
  { path: '/progress/weekly', Page: WeeklyReport },
  { path: '/progress/today', Page: TodayMoodSnapshot },
  { path: '/progress/calendar', Page: MoodCalendar },
  { path: '/journal/voice', Page: VoiceMoodJournal },
  { path: '/wearables', Page: WearableIntegration },
  { path: '/meditation', Page: GuidedMeditation },
  { path: '/dashboard', redirect: '/normal-user-dashboard' },
  { path: '/admin/users', roles: ['admin'], Page: UserManagement },
  { path: '/admin/analytics', roles: ['admin'], Page: AdminDashboard },
  { path: '/admin/moderation', roles: ['admin'], Page: ContentModeration },
];
