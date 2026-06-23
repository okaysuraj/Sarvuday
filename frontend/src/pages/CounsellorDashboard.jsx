// src/pages/CounsellorDasboard.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { FaHome, FaUserFriends, FaCalendarPlus, FaCalendarCheck } from 'react-icons/fa';
import NeoDashboardLayout from '../components/dashboard/NeoDashboardLayout';
import axios from 'axios';
import BASE_URL from '../config/apiConfig';

import Home from '../components/counsellors/Home';
import Profile from '../components/counsellors/Profile';
import Availability from '../components/counsellors/Availability';
import Appointments from '../components/counsellors/Appointments';
import Chat from './chat/Chat';

const CounsellorDashboard = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("Counsellor");

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        // Use the counsellor profile endpoint
        const response = await axios.get(`${BASE_URL}/counsellor/dashboard/profile`, { headers });
        if (response.data) {
          const profileData = response.data.profile || response.data;
          setUsername(profileData.name || profileData.username || 'Counsellor');
        }
      } catch (err) {
        console.error("Failed to fetch counsellor name", err);
      }
    };
    fetchCounsellor();
  }, []);

  const sidebarLinks = [
    { to: "/counsellor-dashboard/home", icon: <FaHome />, label: "Overview" },
    { to: "/counsellor-dashboard/profile", icon: <FaUserFriends />, label: "Profile" },
    { to: "/counsellor-dashboard/availability", icon: <FaCalendarPlus />, label: "Add Availability" },
    { to: "/counsellor-dashboard/appointments", icon: <FaCalendarCheck />, label: "Appointments" },
    { to: "/counsellor-dashboard/messages", icon: <FaUserFriends />, label: "Messages" }
  ];

  return (
    <NeoDashboardLayout username={username} sidebarLinks={sidebarLinks}>
      <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="availability" element={<Availability />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="messages" element={<Chat />} />
      </Routes>
    </NeoDashboardLayout>
  );
};

export default CounsellorDashboard;
