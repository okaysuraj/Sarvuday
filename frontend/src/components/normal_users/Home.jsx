// src/components/normal_users/Home.jsx

import React, { useEffect, useState } from 'react';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import styles from './Home.module.css';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const headers = token ? {
          Authorization: `Bearer ${token}`
        } : {};

        const response = await axios.get(`${BASE_URL}/user/dashboard`, { headers });
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!dashboardData) return <p className={styles.noData}>No data available</p>;

  const { user, chat_sessions_count, total_sessions, total_messages, last_active, upcoming_sessions } = dashboardData;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Welcome, {user.name}</h2>

      <h3 className={styles.subheading}>Profile Information</h3>
      <ul className={styles.list}>
        <li>Email: {user.email}</li>
        <li>Gender: {user.gender}</li>
        <li>Phone: {user.phone_number}</li>
        <li>Location: {user.city}, {user.state}, {user.country} - {user.pincode}</li>
        <li>Preferred Languages: {(user.preferred_languages || []).join(', ')}</li>
        <li>Primary Concerns: {(user.primary_concerns || []).join(', ')}</li>
        <li>Email Verified: {user.is_email_verified ? 'Yes' : 'No'}</li>
        <li>Phone Verified: {user.is_phone_verified ? 'Yes' : 'No'}</li>
        <li>Last Login: {new Date(user.last_login_at).toLocaleString()}</li>
        <li>Joined On: {new Date(user.created_at).toLocaleDateString()}</li>
        <li>Total Sessions Attended: {user.total_sessions_attended}</li>
      </ul>

      <h3 className={styles.subheading}>Dashboard Stats</h3>
      <ul className={styles.list}>
        <li>Total Chat Sessions: {chat_sessions_count}</li>
        <li>Total Video/Audio Sessions: {total_sessions}</li>
        <li>Total Messages Sent: {total_messages}</li>
        <li>Last Active: {new Date(last_active).toLocaleString()}</li>
      </ul>

      <h3 className={styles.subheading}>Upcoming Sessions</h3>
      {upcoming_sessions.length === 0 ? (
        <p className={styles.noData}>No upcoming sessions</p>
      ) : (
        <ul className={styles.list}>
          {upcoming_sessions.map((session, index) => (
            <li key={index}>{JSON.stringify(session)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
