// src/components/counsellors/Appointments.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../normal_users/Appointments.module.css';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/counsellor/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/counsellor/appointments/cancel/${appointmentId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: { reason: "Counsellor cancelled" }
      });
      toast.success('Appointment cancelled successfully!');
      fetchAppointments();
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      toast.error('Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Appointments</h2>

      {loading && <p className={styles.placeholderText}>Loading...</p>}

      {!loading && (
        <>
          {appointments.length > 0 ? (
            <div className={styles.cardGrid}>
              {appointments.map((appt) => (
                <div key={appt.appointment_id} className={styles.card}>
                  <h4 style={{marginBottom: 10, color: '#003fdd'}}>With Patient: {appt.user?.name || 'Unknown'}</h4>
                  <p><strong>Status:</strong> <span style={{color: appptStatusColor(appt.status)}}>{appt.status}</span></p>
                  <p><strong>Scheduled:</strong> {new Date(appt.session?.session_scheduled_at).toLocaleString()}</p>
                  
                  {(appt.status === 'scheduled' || appt.status === 'confirmed') && (
                    <div style={{ marginTop: 15, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button 
                        onClick={() => navigate(`/counselling-session/${appt.session?.session_id}`)}
                        style={{ backgroundColor: '#003fdd', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        Join Call
                      </button>
                      <button 
                        onClick={() => {
                          const roomId = `chat_${appt.counsellor?.user_id}_${appt.user?.user_id}`;
                          navigate('/chat', { state: { selectedRoomId: roomId } });
                        }}
                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
                      >
                        Message
                      </button>
                    </div>
                  )}

                  {appt.status !== 'cancelled' && appt.status !== 'completed' && (
                    <button 
                      onClick={() => cancelAppointment(appt.appointment_id)}
                      style={{marginTop: 15, backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.placeholderText}>You have no scheduled appointments yet.</p>
          )}
        </>
      )}
    </div>
  );
};

const appptStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'scheduled': return '#007bff';
    case 'completed': return '#28a745';
    case 'cancelled': return '#dc3545';
    default: return '#333';
  }
}

export default Appointments;