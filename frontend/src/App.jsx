// src/App.jsx

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/landing/Home';
import Splash from './pages/landing/Splash';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import RoleSelection from './pages/onboarding/RoleSelection';
import BasicProfileSetup from './pages/onboarding/BasicProfileSetup';
import AgeDemographics from './pages/onboarding/AgeDemographics';
import SymptomsSelection from './pages/onboarding/SymptomsSelection';
import StressFactors from './pages/onboarding/StressFactors';
import HistoryIntake from './pages/onboarding/HistoryIntake';
import ConsentAgreement from './pages/onboarding/ConsentAgreement';
import Disclaimer from './pages/onboarding/Disclaimer';
import EmergencyContact from './pages/onboarding/EmergencyContact';
import PreferencesSetup from './pages/onboarding/PreferencesSetup';
import Disorders from './pages/tracking/Disorders';
import ApprovedCounsellors from './pages/counsellor/ApprovedCounsellors';
import Assessments from './pages/tracking/Assessments';
import ContactUs from './pages/landing/ContactUs';
import About from './pages/landing/About';
import PrivacyPolicy from './pages/landing/PrivacyPolicy';
import Terms from './pages/landing/Terms';

import NormalUserDashboard from './pages/dashboard/NormalUserDashboard';
import AIChat from './components/normal_users/AIChat';
import Chat from './pages/chat/Chat';
import VideoCallPage from './pages/chat/VideoCallPage';
import CounsellorDashboard from './pages/counsellor/CounsellorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContentModeration from './pages/admin/ContentModeration';
import TherapistSearch from './pages/counsellor/TherapistSearch';
import TherapistProfile from './pages/counsellor/TherapistProfile';
import BookingType from './pages/booking/BookingType';
import BookingSlot from './pages/booking/BookingSlot';
import BookingPayment from './pages/booking/BookingPayment';
import UserProfile from './pages/profile/UserProfile';
import Notifications from './pages/dashboard/Notifications';
import MyRecords from './pages/dashboard/MyRecords';
import MoodTracker from './pages/tracking/MoodTracker';
import MoodCheckIn from './pages/tracking/MoodCheckIn';
import DailyJournal from './pages/tracking/DailyJournal';
import AIChatHome from './pages/chat/AIChatHome';
import AIChatSession from './pages/chat/AIChatSession';
import AIMoodAnalysisResult from './pages/chat/AIMoodAnalysisResult';
import AIRecommendations from './pages/chat/AIRecommendations';
import AvailabilityManagement from './pages/settings/AvailabilityManagement';
import PatientList from './pages/counsellor/PatientList';
import EarningsDashboard from './pages/financial/EarningsDashboard';
import EditProfile from './pages/profile/EditProfile';
import AppointmentsList from './pages/booking/AppointmentsList';
import WaitingRoom from './pages/chat/WaitingRoom';
import SessionRoom from './pages/chat/SessionRoom';
import SessionNotes from './pages/chat/SessionNotes';
import SessionSummary from './pages/chat/SessionSummary';
import CommunityFeed from './pages/community/CommunityFeed';
import PostCreation from './pages/community/PostCreation';
import SupportGroups from './pages/community/SupportGroups';
import GroupChat from './pages/community/GroupChat';
import TherapistReviews from './pages/counsellor/TherapistReviews';
import SettingsLayout from './pages/settings/SettingsLayout';
import PrivacySettings from './pages/settings/PrivacySettings';
import ReminderSettings from './pages/settings/ReminderSettings';
import AccountData from './pages/settings/AccountData';
import Wallet from './pages/financial/Wallet';
import Subscriptions from './pages/financial/Subscriptions';
import EmergencyHelp from './pages/community/EmergencyHelp';

// New Phase 8 Imports
import GoalTracking from './pages/tracking/GoalTracking';
import SleepTracking from './pages/tracking/SleepTracking';
import SleepMoodCorrelation from './pages/tracking/SleepMoodCorrelation';
import MedicationPlan from './pages/tracking/MedicationPlan';
import StressTriggerAnalysis from './pages/tracking/StressTriggerAnalysis';
import TriggerStressFactors from './pages/tracking/TriggerStressFactors';
import ProgressDashboard from './pages/tracking/ProgressDashboard';
import WeeklyReport from './pages/tracking/WeeklyReport';
import TodayMoodSnapshot from './pages/tracking/TodayMoodSnapshot';
import MoodCalendar from './pages/tracking/MoodCalendar';
import VoiceMoodJournal from './pages/tracking/VoiceMoodJournal';
import WearableIntegration from './pages/tracking/WearableIntegration';
import GuidedMeditation from './pages/tracking/GuidedMeditation';
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public routes with Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Splash />} />
          <Route path="/welcome" element={<Home />} />
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
          <Route path="counsellors/:id/book" element={<BookingSlot />} />
          <Route path="counsellors/:counsellorId/reviews" element={<TherapistReviews />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* Dashboard routes without Header/Footer */}
        <Route element={<DashboardLayout />}>
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
            path="/ai-chat"
            element={
              <ProtectedRoute>
                <AIChat />
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
              <ProtectedRoute>
                <CounsellorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard/moderation"
            element={
              <ProtectedRoute>
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
            <Route path="privacy" element={<PrivacySettings />} />
            <Route path="reminders" element={<ReminderSettings />} />
            <Route path="data" element={<AccountData />} />
          </Route>
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/emergency" element={<EmergencyHelp />} />
          
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
