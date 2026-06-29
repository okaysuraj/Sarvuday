// src/components/normal_users/ExploreCounsellors.jsx
import React, { useState, useEffect } from 'react';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import styles from './ExploreCounsellors.module.css';
import { FaSearch, FaMapMarkerAlt, FaStar, FaBriefcaseMedical, FaCalendarPlus } from 'react-icons/fa';

const ExploreCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  
  // Mock Booking State
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/content/counsellors`);
      setCounsellors(response.data.counsellors || []);
    } catch (err) {
      console.error("Failed to fetch counsellors:", err);
      setCounsellors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setShowBookingModal(true);
  };

  const handleMockPayment = () => {
    if (!bookingDate || !bookingTime) {
      alert('Please select date and time.');
      return;
    }
    alert(`Payment successful! Appointment booked with ${selectedCounsellor.name} on ${bookingDate} at ${bookingTime}.`);
    setShowBookingModal(false);
    setSelectedCounsellor(null);
    setBookingDate('');
    setBookingTime('');
  };

  const filtered = counsellors.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = c.name?.toLowerCase().includes(searchLower);
    const locationMatch = c.city?.toLowerCase().includes(searchLower);
    const matchesSearch = nameMatch || locationMatch;
    
    const matchesSpec = specializationFilter 
      ? (c.specializations && c.specializations.some(s => s.toLowerCase().includes(specializationFilter.toLowerCase())))
      : true;
      
    return matchesSearch && matchesSpec;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore Counsellors</h1>
      <p className={styles.subtitle}>Find the right professional for your mental health journey.</p>

      {/* Search & Filters */}
      <div className={`sticker-container ${styles.searchBar}`}>
        <div className={styles.inputGroup}>
          <FaSearch className={styles.icon} />
          <input 
            type="text" 
            placeholder="Search by name or location..." 
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <FaBriefcaseMedical className={styles.icon} />
          <select 
            className="input-field"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
            <option value="Anxiety">Anxiety</option>
            <option value="Depression">Depression</option>
            <option value="CBT">CBT</option>
            <option value="Trauma">Trauma</option>
          </select>
        </div>
      </div>

      {/* Counsellors Grid */}
      {loading ? (
        <p>Loading professionals...</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(c => (
            <div key={c.user_id} className={`sticker-container ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>{c.name?.charAt(0) || 'D'}</div>
                <div>
                  <h3 className={styles.counsellorName}>{c.name || 'Doctor'}</h3>
                  <p className={styles.specialization}>
                    {c.specializations && c.specializations.length > 0 ? c.specializations.join(', ') : 'General Therapist'}
                  </p>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}><FaMapMarkerAlt /> {c.city || 'Remote'}</div>
                <div className={styles.infoRow}><FaStar color="#d4af37" /> {c.average_rating || '0.0'} ({c.experience_years || 0} yrs exp)</div>
              </div>
              <button className="btn-primary" style={{width: '100%'}} onClick={() => handleBookClick(c)}>
                <FaCalendarPlus /> Book Session
              </button>
            </div>
          ))}
          {filtered.length === 0 && <p>No counsellors found matching your criteria.</p>}
        </div>
      )}

      {/* Mock Booking Modal */}
      {showBookingModal && (
        <div className={styles.modalOverlay}>
          <div className={`sticker-container ${styles.modalContent}`}>
            <h2>Book Appointment</h2>
            <p>You are booking a session with <strong>{selectedCounsellor?.name}</strong>.</p>
            
            <div className={styles.formGroup}>
              <label className="label">Date</label>
              <input type="date" className="input-field" value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
            </div>
            
            <div className={styles.formGroup}>
              <label className="label">Time</label>
              <input type="time" className="input-field" value={bookingTime} onChange={e => setBookingTime(e.target.value)} />
            </div>

            <div className={styles.priceTag}>
              Total Amount: <strong>${selectedCounsellor?.session_fee || '50.00'}</strong> (Mock Payment)
            </div>

            <div className={styles.modalActions}>
              <button className="btn-secondary" onClick={() => setShowBookingModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleMockPayment}>Confirm & Pay</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExploreCounsellors;
