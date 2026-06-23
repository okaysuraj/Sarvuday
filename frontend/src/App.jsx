// src/App.jsx

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
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

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public routes with Header/Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
