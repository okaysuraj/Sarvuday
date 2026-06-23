// src/components/normal_users/Appointments.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Appointments.module.css';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import StripePaymentModal from './StripePaymentModal';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');
  const navigate = useNavigate();
  
  // Payment Modal State
  const [paymentData, setPaymentData] = useState({
    clientSecret: null,
    publishableKey: null,
    amount: null,
    appointmentId: null,
  });

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (activeTab === 'appointments') {
      fetchAppointments();
    } else {
      fetchAvailableSlots();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/appointments`, {
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

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/appointments/slots`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data.slots || []);
    } catch (err) {
      console.error('Error fetching slots:', err);
      toast.error('Failed to fetch available slots');
    } finally {
      setLoading(false);
    }
  };

  const bookAppointment = async (slot) => {
    try {
      setLoading(true);
      // 1. Create Appointment
      const apptRes = await axios.post(`${BASE_URL}/user/appointments`, {
        counsellor_id: slot.counsellor_id,
        availability_slot_id: slot.availability_slot_id,
        reason: 'General Consultation'
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const appointmentId = apptRes.data.appointment_id || apptRes.data.id;

      // 2. Create Payment Intent
      if (appointmentId) {
        const intentRes = await axios.post(`${BASE_URL}/payments/create-intent`, {
          appointment_id: appointmentId,
          amount: 500.00,
          currency: "INR"
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { client_secret, publishable_key, amount } = intentRes.data;

        // 3. Show Stripe Elements Modal
        setPaymentData({
          clientSecret: client_secret,
          publishableKey: publishable_key,
          amount: amount,
          appointmentId: appointmentId
        });
      } else {
        toast.success('Appointment booked successfully!');
        setActiveTab('appointments');
      }

    } catch (err) {
      console.error('Error booking appointment:', err);
      toast.error(err.response?.data?.detail || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    toast.success('Payment Successful! Appointment booked.');
    setPaymentData({ clientSecret: null, publishableKey: null, amount: null, appointmentId: null });
    setActiveTab('appointments');
    fetchAppointments();
  };

  const handlePaymentCancel = () => {
    toast.warning('Payment cancelled.');
    setPaymentData({ clientSecret: null, publishableKey: null, amount: null, appointmentId: null });
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/user/appointments/cancel/${appointmentId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
        params: { reason: "User cancelled" }
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
      <h2 className={styles.heading}>Appointments Management</h2>

      <div className={styles.buttonGroup}>
        <button 
          className={activeTab === 'appointments' ? styles.button : styles.buttonOutline} 
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
        </button>
        <button 
          className={styles.buttonOutline} 
          onClick={() => navigate('/approved-counsellors')}
        >
          Book New Appointment
        </button>
      </div>

      {loading && <p className={styles.placeholderText}>Loading...</p>}

      {!loading && activeTab === 'appointments' && (
        <>
          {appointments.length > 0 ? (
            <div className={styles.cardGrid}>
              {appointments.map((appt) => (
                <div key={appt.appointment_id} className={styles.card}>
                  <h4 style={{marginBottom: 10, color: '#003fdd'}}>With Counsellor</h4>
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
            <p className={styles.placeholderText}>You have no appointments yet.</p>
          )}
        </>
      )}

      {!loading && activeTab === 'slots' && (
        <>
          {slots.length > 0 ? (
            <div className={styles.cardGrid}>
              {slots.map((slot) => (
                <div key={slot.availability_slot_id} className={styles.card}>
                  <h4 style={{marginBottom: 10, color: '#003fdd'}}>Available Slot</h4>
                  <p><strong>Date:</strong> {new Date(slot.start_time).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}</p>
                  
                  <button 
                    onClick={() => bookAppointment(slot)}
                    style={{marginTop: 15, backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}
                  >
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.placeholderText}>No available slots at the moment.</p>
          )}
        </>
      )}

      {/* Stripe Payment Modal */}
      {paymentData.clientSecret && (
        <StripePaymentModal
          clientSecret={paymentData.clientSecret}
          publishableKey={paymentData.publishableKey}
          amount={paymentData.amount}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
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
