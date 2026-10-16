import React, { lazy, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageLoader from './components/common/PageLoader';

// Public & Onboarding (Code-split)
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

// Dashboards & Features (Code-split)
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

// Tracking Suite (Code-split)
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

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
        {/* Public routes with Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/onboarding/role-selection" element={<RoleSelection />} />
          <Route path="/onboarding/basic-profile" element={<BasicProfileSetup />} />
          <Route path="/onboarding/age-demographics" element={<AgeDemographics />} />
          <Route path="/onboarding/symptoms" element={<SymptomsSelection />} />
          <Route path="/onboarding/stress-factors" element={<StressFactors />} />
          <Route path="/onboarding/history" element={<HistoryIntake />} />
          <Route path="/onboarding/consent" element={<ConsentAgreement />} />
          <Route path="/onboarding/disclaimer" element={<Disclaimer />} />
          <Route path="/onboarding/emergency-contact" element={<EmergencyContact />} />
          <Route path="/onboarding/preferences" element={<PreferencesSetup />} />
          <Route path="/disorders" element={<Disorders />} />
          <Route path="/approved-counsellors" element={<ApprovedCounsellors />} />
          <Route path="/counsellors" element={<ApprovedCounsellors />} />
          <Route path="counsellors/:id/book" element={<BookingSlot />} />
          <Route path="counsellors/:counsellorId/reviews" element={<TherapistReviews />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
        </Route>

        {/* Dashboard routes without Header/Footer */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route
            path="/normal-user-dashboard/*"
            element={
              <ProtectedRoute>
                <NormalUserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/therapists"
            element={
              <ProtectedRoute>
                <TherapistSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/therapists/:id"
            element={
              <ProtectedRoute>
                <TherapistProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/type"
            element={
              <ProtectedRoute>
                <BookingType />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/slot"
            element={
              <ProtectedRoute>
                <BookingSlot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/payment"
            element={
              <ProtectedRoute>
                <BookingPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-records"
            element={
              <ProtectedRoute>
                <MyRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood-tracker"
            element={
              <ProtectedRoute>
                <MoodTracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood-tracker/add"
            element={
              <ProtectedRoute>
                <MoodCheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <DailyJournal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal/analysis"
            element={
              <ProtectedRoute>
                <AIMoodAnalysisResult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <AIRecommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counsellor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['counsellor']}>
                <CounsellorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counsellor-dashboard/patients"
            element={
              <ProtectedRoute allowedRoles={['counsellor']}>
                <PatientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute allowedRoles={['counsellor']}>
                <AvailabilityManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/earnings"
            element={
              <ProtectedRoute allowedRoles={['counsellor']}>
                <EarningsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-chat"
            element={
              <ProtectedRoute>
                <AIChatHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-chat/session"
            element={
              <ProtectedRoute>
                <AIChatSession />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counselling-session/:sessionId"
            element={
              <ProtectedRoute>
                <VideoCallPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counsellor-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['counsellor']}>
                <CounsellorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/moderation"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ContentModeration />
              </ProtectedRoute>
            }
          />
          <Route path="/session/waiting" element={<WaitingRoom />} />
          <Route path="/session/:sessionId" element={<SessionRoom />} />
          <Route path="/session/notes" element={<SessionNotes />} />
          <Route path="/session/summary" element={<SessionSummary />} />
          <Route path="/community" element={<CommunityFeed />} />
          <Route path="/community/new" element={<PostCreation />} />
          <Route path="/community/groups" element={<SupportGroups />} />
          <Route path="/community/groups/:groupId" element={<GroupChat />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="privacy" replace />} />
            <Route path="privacy" element={<PrivacySettings />} />
            <Route path="reminders" element={<ReminderSettings />} />
            <Route path="data" element={<AccountData />} />
          </Route>
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          
          {/* Tracking Routes */}
          <Route path="/goals" element={<ProtectedRoute><GoalTracking /></ProtectedRoute>} />
          <Route path="/sleep" element={<ProtectedRoute><SleepTracking /></ProtectedRoute>} />
          <Route path="/sleep/correlation" element={<ProtectedRoute><SleepMoodCorrelation /></ProtectedRoute>} />
          <Route path="/medication" element={<ProtectedRoute><MedicationPlan /></ProtectedRoute>} />
          <Route path="/stress/analysis" element={<ProtectedRoute><StressTriggerAnalysis /></ProtectedRoute>} />
          <Route path="/stress/factors" element={<ProtectedRoute><TriggerStressFactors /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressDashboard /></ProtectedRoute>} />
          <Route path="/progress/weekly" element={<ProtectedRoute><WeeklyReport /></ProtectedRoute>} />
          <Route path="/progress/today" element={<ProtectedRoute><TodayMoodSnapshot /></ProtectedRoute>} />
          <Route path="/progress/calendar" element={<ProtectedRoute><MoodCalendar /></ProtectedRoute>} />
          <Route path="/journal/voice" element={<ProtectedRoute><VoiceMoodJournal /></ProtectedRoute>} />
          <Route path="/wearables" element={<ProtectedRoute><WearableIntegration /></ProtectedRoute>} />
          <Route path="/meditation" element={<ProtectedRoute><GuidedMeditation /></ProtectedRoute>} />
          <Route path="/dashboard" element={<Navigate to="/normal-user-dashboard" replace />} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/moderation" element={<ProtectedRoute allowedRoles={['admin']}><ContentModeration /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<main className="max-w-xl mx-auto p-8"><h1 className="text-2xl font-semibold">Page not found</h1><a className="inline-block underline mt-4" href="/">Return home</a></main>} />
      </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
