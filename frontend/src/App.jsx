// src/App.jsx

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/Home';
import Splash from './pages/Splash';
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
import Disorders from './pages/Disorders';
import ApprovedCounsellors from './pages/ApprovedCounsellors';
import Assessments from './pages/Assessments';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

import NormalUserDashboard from './pages/NormalUserDashboard';
import AIChat from './components/normal_users/AIChat';
import Chat from './pages/chat/Chat';
import VideoCallPage from './pages/chat/VideoCallPage';
import CounsellorDashboard from './pages/CounsellorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TherapistSearch from './pages/TherapistSearch';
import TherapistProfile from './pages/TherapistProfile';
import BookingType from './pages/BookingType';
import BookingSlot from './pages/BookingSlot';
import BookingPayment from './pages/BookingPayment';

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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
