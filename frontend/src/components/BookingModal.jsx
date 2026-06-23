import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../config/apiConfig';
import styles from './BookingModal.module.css';

const BookingModal = ({ counsellorId, onClose }) => {
  const [step, setStep] = useState(1);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, [counsellorId]);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}/user/appointments/slots?counsellor_id=${counsellorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSlots(response.data.slots || []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch slots", err);
      setError("Failed to load available slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep(2); // Move to payment
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const token = localStorage.getItem('accessToken');
      
      // Since there's no actual Stripe connected, we just call the book endpoint directly.
      await axios.post(`${BASE_URL}/user/appointments`, {
        counsellor_id: counsellorId,
        availability_slot_id: selectedSlot.availability_slot_id,
        reason: 'General Consultation'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Payment successful! Appointment booked.');
      onClose();
    } catch (err) {
      console.error("Booking failed", err);
      toast.error(err.response?.data?.detail || "Failed to complete booking.");
      setPaymentLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {step === 1 && (
          <>
            <h3 className={styles.title}>Select an Appointment Time</h3>
            <p className={styles.subtitle}>Choose an available slot for this professional.</p>

            {loading ? (
              <p>Loading slots...</p>
            ) : error ? (
              <div className={styles.errorMessage}>{error}</div>
            ) : slots.length === 0 ? (
              <p>This counsellor currently has no open slots available.</p>
            ) : (
              <div className={styles.slotsGrid}>
                {slots.map((slot) => {
                  const dateObj = new Date(slot.start_time);
                  const dateStr = dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                  const timeStr = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                  return (
                    <button 
                      key={slot.availability_slot_id} 
                      className={styles.slotButton}
                      onClick={() => handleSelectSlot(slot)}
                    >
                      <span className={styles.slotDate}>{dateStr}</span>
                      <span className={styles.slotTime}>{timeStr}</span>
                    </button>
                  );
                })}
              </div>
            )}

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={onClose}>Close</button>
            </div>
          </>
        )}

        {step === 2 && selectedSlot && (
          <>
            <h3 className={styles.title}>Confirm & Pay</h3>
            <p className={styles.subtitle}>Review your appointment details.</p>

            <div className={styles.paymentDetails}>
              <div className={styles.paymentRow}>
                <span>Date:</span>
                <strong>{new Date(selectedSlot.start_time).toLocaleDateString()}</strong>
              </div>
              <div className={styles.paymentRow}>
                <span>Time:</span>
                <strong>{new Date(selectedSlot.start_time).toLocaleTimeString()}</strong>
              </div>
              <div className={styles.paymentTotal}>
                <span>Total Due:</span>
                <span>₹500.00</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button 
                className={styles.cancelBtn} 
                onClick={() => setStep(1)}
                disabled={paymentLoading}
              >
                Back
              </button>
              <button 
                className={styles.payBtn} 
                onClick={handlePayment}
                disabled={paymentLoading}
              >
                {paymentLoading ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
