import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import VideoCall from '../../components/counselling/VideoCall';
import styles from './VideoCallPage.module.css';

const VideoCallPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [callData, setCallData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionTokens = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${BASE_URL}/user/sessions/join/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCallData({
          url: res.data.video_url,
          token: res.data.token
        });
      } catch (err) {
        console.error('Failed to join session:', err);
        const errMsg = err.response?.data?.detail || 'Failed to join session. It may be expired or not started yet.';
        setError(errMsg);
        toast.error(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionTokens();
  }, [sessionId]);

  const handleLeave = () => {
    navigate(-1); // go back to previous page
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Loading session...</div>
      </div>
    );
  }

  if (error || !callData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h2>Cannot Join Session</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/normal-user-dashboard')} className={styles.backBtn}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Counselling Session</h2>
        <p>Your session is active and secure.</p>
      </header>
      <div className={styles.callWrapper}>
        <VideoCall url={callData.url} token={callData.token} onLeave={handleLeave} />
      </div>
    </div>
  );
};

export default VideoCallPage;
