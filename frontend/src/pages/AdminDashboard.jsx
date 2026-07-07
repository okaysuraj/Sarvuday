// src/pages/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { FaHome, FaUsers, FaChartPie, FaCogs, FaUserCircle, FaUserCheck } from 'react-icons/fa';
import NeoDashboardLayout from '../components/dashboard/NeoDashboardLayout';
import AdminProfile from '../components/admin/Profile';
import CounsellorApproval from '../components/admin/CounsellorApproval';
import axios from 'axios';
import BASE_URL from '../config/apiConfig';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${BASE_URL}/admin/dashboard/profile`, { headers });
        if (response.data && response.data.name) {
          setUsername(response.data.name.split(' ')[0]);
        }
      } catch (err) {
        console.error("Failed to fetch username", err);
      }
    };
    fetchUser();
  }, []);

  const sidebarLinks = [
    { to: "/admin-dashboard/home", icon: <FaHome />, label: "Home" },
    { to: "/admin-dashboard/profile", icon: <FaUserCircle />, label: "Profile" },
    { to: "/admin-dashboard/approvals", icon: <FaUserCheck />, label: "Approvals" },
    { to: "/admin-dashboard/users", icon: <FaUsers />, label: "Users" },
    { to: "/admin-dashboard/crisis", icon: <FaCogs />, label: "Crisis Logs" },
    { to: "/admin-dashboard/ai-metrics", icon: <FaChartPie />, label: "AI Performance" },
    { to: "/admin-dashboard/analytics", icon: <FaChartPie />, label: "Analytics" },
    { to: "/admin-dashboard/settings", icon: <FaCogs />, label: "Settings" }
  ];

  return (
    <NeoDashboardLayout username={username} sidebarLinks={sidebarLinks}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard/home" replace />} />
        <Route path="home" element={<div className="sticker-container" style={{padding: '40px'}}><h2>Welcome Admin!</h2></div>} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="approvals" element={<CounsellorApproval />} />
        <Route path="users" element={<div className="sticker-container" style={{padding: '40px'}}><h2>User Management</h2></div>} />
        <Route path="crisis" element={<div className="sticker-container" style={{padding: '40px', backgroundColor: '#fee2e2'}}><h2>Crisis Escalation Logs</h2><p>Monitoring high-risk flags triggered by AI or Journaling.</p></div>} />
        <Route path="ai-metrics" element={<div className="sticker-container" style={{padding: '40px'}}><h2>AI Performance Monitoring</h2><p>Accuracy, False-Positive Rates, and Sentiment Drift.</p></div>} />
        <Route path="analytics" element={<div className="sticker-container" style={{padding: '40px'}}><h2>Platform Analytics</h2></div>} />
        <Route path="settings" element={<div className="sticker-container" style={{padding: '40px'}}><h2>System Settings</h2></div>} />
      </Routes>
    </NeoDashboardLayout>
  );
};

export default AdminDashboard;
