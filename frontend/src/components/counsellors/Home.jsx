// src/components/counsellors/Home.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import BASE_URL from '../../config/apiConfig';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Authentication token missing. Please login again.');
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/counsellor/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setDashboardData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!dashboardData) return <div className={styles.noData}>No dashboard data available.</div>;

  // Safely access patient_stats
  const patientStatsCount = dashboardData.patient_stats ? Object.keys(dashboardData.patient_stats).length : 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Dashboard Overview</h2>
      <div className={styles.grid}>
        <Card label="Upcoming Appointments" value={dashboardData.upcoming_appointments ?? 'N/A'} />
        <Card label="Total Sessions" value={dashboardData.total_sessions ?? 'N/A'} />
        <Card label="Recent Payments" value={`₹${dashboardData.recent_payments ?? 0}`} />
        <Card label="Completion Rate" value={`${dashboardData.completion_rate ?? 0}%`} />
        <Card label="Average Rating" value={dashboardData.average_rating ?? 'N/A'} />
        <Card label="Profile Completion" value={`${dashboardData.profile_completion ?? 0}%`} />
        <Card label="Revenue" value={`₹${dashboardData.revenue ?? 0}`} />
        <Card label="Patient Stats" value={patientStatsCount} />
      </div>
    </div>
  );
};

const Card = ({ label, value }) => (
  <div className={styles.card}>
    <h4 className={styles.cardLabel}>{label}</h4>
    <p className={styles.cardValue}>{value}</p>
  </div>
);

export default Home;


