// src/components/normal_users/Home.jsx
import React, { useEffect, useState } from 'react';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import styles from './Home.module.css';
import { FaBell, FaCalendarCheck, FaChartLine, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
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

  if (loading) return <p className={styles.loading}>Loading your peaceful space...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  const upcoming_sessions = dashboardData?.upcoming_sessions || [];
  
  return (
    <div className={styles.dashboardContainer}>
      
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.greetingTitle}>Your Mental Wealth</h1>
        <p className={styles.greetingSubtitle}>Track your progress and stay balanced.</p>
      </div>

      {/* Top Grid: Overall Score & Notifications */}
      <div className={styles.topGrid}>
        
        {/* Overall Score */}
        <div className={`sticker-container ${styles.scoreCard}`}>
          <div className={styles.scoreIconWrapper}>
            <FaChartLine size={32} color="var(--color-primary)" />
          </div>
          <div className={styles.scoreContent}>
            <h3>Overall Score</h3>
            <div className={styles.scoreNumber}>84<span className={styles.scoreTotal}>/100</span></div>
            <p>You're doing great this week! Keep up the mindfulness.</p>
          </div>
        </div>

        {/* Notifications */}
        <div className={`sticker-container ${styles.notificationCard}`}>
          <div className={styles.cardHeader}>
            <h3><FaBell /> Notifications</h3>
          </div>
          <ul className={styles.notificationList}>
            <li>
              <div className={styles.notifDot}></div>
              <p>Your AI companion missed you. Chat now?</p>
            </li>
            <li>
              <div className={styles.notifDot}></div>
              <p>Dr. Smith accepted your appointment request.</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Middle Grid: Mood Tracker & Quiz CTA */}
      <div className={styles.middleGrid}>
        
        {/* Mood Tracker */}
        <div className={`sticker-container ${styles.moodCard}`}>
          <h3>How are you feeling right now?</h3>
          <div className={styles.moodChips}>
            <button 
              className={`${styles.moodChip} ${selectedMood === 'great' ? styles.chipActive : ''}`}
              onClick={() => setSelectedMood('great')}
            >
              <FaSmile /> Great
            </button>
            <button 
              className={`${styles.moodChip} ${selectedMood === 'okay' ? styles.chipActive : ''}`}
              onClick={() => setSelectedMood('okay')}
            >
              <FaMeh /> Okay
            </button>
            <button 
              className={`${styles.moodChip} ${selectedMood === 'down' ? styles.chipActive : ''}`}
              onClick={() => setSelectedMood('down')}
            >
              <FaFrown /> Down
            </button>
          </div>
        </div>

        {/* Quiz CTA */}
        <div className={`sticker-container ${styles.quizCard}`}>
          <h3>Emotional State Check-in</h3>
          <p>Take our quick 2-minute quiz to update your overall score and get personalized recommendations.</p>
          <button className="btn-primary">Take Quiz</button>
        </div>
      </div>

      {/* Bottom Section: Appointments */}
      <div className={`sticker-container ${styles.appointmentsCard}`}>
        <div className={styles.cardHeader}>
          <h3><FaCalendarCheck /> Upcoming Appointments</h3>
        </div>
        
        {upcoming_sessions.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No upcoming sessions.</p>
            <button className="btn-secondary">Explore Counsellors</button>
          </div>
        ) : (
          <div className={styles.appointmentList}>
             {upcoming_sessions.map((session, idx) => (
                <div key={idx} className={styles.appointmentItem}>
                  <div className={styles.aptDate}>Tomorrow, 10:00 AM</div>
                  <div className={styles.aptDetails}>
                    <strong>Dr. Counsellor</strong>
                    <span>Video Session</span>
                  </div>
                </div>
             ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
