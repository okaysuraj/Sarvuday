import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import styles from './Notifications.module.css';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchNotifications();
    // Setup polling every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/notifications/${id}/read`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Notifications</h2>
      {loading && <p>Loading...</p>}
      
      <div className={styles.list}>
        {notifications.length === 0 && !loading && <p>No notifications.</p>}
        {notifications.map(n => (
          <div key={n.notification_id} className={`${styles.card} ${n.is_read ? styles.read : styles.unread} ${styles[n.type]}`}>
            <div className={styles.content}>
              <h4>{n.title}</h4>
              <p>{n.message}</p>
              <small>{new Date(n.created_at).toLocaleString()}</small>
            </div>
            {!n.is_read && (
              <button onClick={() => markAsRead(n.notification_id)} className={styles.markBtn}>
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
