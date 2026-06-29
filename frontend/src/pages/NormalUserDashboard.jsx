// src/pages/NormalUserDashboard.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { FaHome, FaRobot, FaComments, FaFileMedical, FaBell, FaUserCog } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import NeoDashboardLayout from '../components/dashboard/NeoDashboardLayout';

import Home from '../components/normal_users/Home';
import Profile from '../components/normal_users/Profile';
import AIChat from '../components/normal_users/AIChat';
import Chat from './chat/Chat';
import ExploreCounsellors from '../components/normal_users/ExploreCounsellors';
import EmergencyConnect from '../components/normal_users/EmergencyConnect';
import SettingsPage from '../components/normal_users/SettingsPage';
import Appointments from '../components/normal_users/Appointments';
import Prescriptions from '../components/normal_users/Prescriptions';
import Notifications from '../components/normal_users/Notifications';

const NormalUserDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${BASE_URL}/user/dashboard/profile`, { headers });
        if (response.data && response.data.name) {
          setUsername(response.data.name.split(' ')[0]); // Display first name
        }
      } catch (err) {
        console.error("Failed to fetch username", err);
      }
    };
    fetchUser();
  }, []);

  const sidebarLinks = [
    { to: "/normal-user-dashboard/overall-score", icon: <FaHome />, label: "Overall Score" },
    { to: "/ai-chat", icon: <FaRobot />, label: "AI Assistant" },
    { to: "/normal-user-dashboard/explore-counsellors", icon: <FaUserCog />, label: "Explore Counsellors" },
    { to: "/chat", icon: <FaComments />, label: "Chat Messages" },
    { to: "/normal-user-dashboard/emergency", icon: <FaFileMedical />, label: "Emergency Connect" },
    { to: "/normal-user-dashboard/profile", icon: <FaUserCog />, label: "Profile" },
    { to: "/normal-user-dashboard/settings", icon: <FaUserCog />, label: "Settings" }
  ];

  return (
    <NeoDashboardLayout username={username} sidebarLinks={sidebarLinks}>
      <Routes>
        <Route index element={<Navigate to="overall-score" replace />} />
        <Route path="overall-score" element={<Home />} />
        <Route path="explore-counsellors" element={<ExploreCounsellors />} />
        <Route path="emergency" element={<EmergencyConnect />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </NeoDashboardLayout>
  );
};

export default NormalUserDashboard;
