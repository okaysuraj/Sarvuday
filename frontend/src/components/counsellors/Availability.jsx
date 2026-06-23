// src/components/consellors/Availability.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import styles from './Availability.module.css';

const Availability = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    status: 'available',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch availability slots on mount
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Authentication required. Please login.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${BASE_URL}/counsellor/availability`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSlots(res.data.slots || []);
      } catch (err) {
        console.error('Error fetching availability:', err);
        setError('Failed to load availability slots.');
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit to create new slot
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.start_time || !formData.end_time) {
      setError('Please select start and end times.');
      return;
    }
    if (formData.end_time <= formData.start_time) {
      setError('End time must be after start time.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Authentication required. Please login.');
        setSubmitting(false);
        return;
      }
      const res = await axios.post(
        `${BASE_URL}/counsellor/availability`,
        {
          start_time: formData.start_time,
          end_time: formData.end_time,
          status: formData.status,
          notes: formData.notes,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add new slot to list
      setSlots(prev => [res.data, ...prev]);

      // Reset form
      setFormData({
        start_time: '',
        end_time: '',
        status: 'available',
        notes: '',
      });
    } catch (err) {
      console.error('Error adding availability:', err);
      setError('Failed to add availability slot.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading availability...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Availability</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="start_time">Start Time</label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="end_time">End Time</label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Add any notes..."
            rows={3}
          />
        </div>

        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Slot'}
        </button>
      </form>

      <h3 className={styles.subheading}>Existing Slots</h3>
      {slots.length === 0 ? (
        <p className={styles.noData}>No availability slots found.</p>
      ) : (
        <ul className={styles.slotList}>
          {slots.map(slot => (
            <li key={slot.availability_slot_id} className={styles.slotCard}>
              <p><strong>Start:</strong> {new Date(slot.start_time).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(slot.end_time).toLocaleString()}</p>
              <p><strong>Status:</strong> <span className={slot.status === 'available' ? styles.available : styles.unavailable}>{slot.status}</span></p>
              {slot.notes && <p><strong>Notes:</strong> {slot.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Availability;
