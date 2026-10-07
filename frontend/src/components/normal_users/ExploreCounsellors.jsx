// src/components/normal_users/ExploreCounsellors.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import axios from 'axios';
import styles from './ExploreCounsellors.module.css';
import { FaSearch, FaMapMarkerAlt, FaStar, FaBriefcaseMedical, FaCalendarPlus, FaComments } from 'react-icons/fa';

const ExploreCounsellors = () => {
  const navigate = useNavigate();
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

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
    navigate(`/counsellors/${counsellor.user_id}/book`);
  };

  const handleReviewsClick = (counsellor) => {
    navigate(`/therapist/reviews/${counsellor.user_id}`);
  };

  const filtered = counsellors.filter(c => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = c.name?.toLowerCase().includes(searchLower);
    const locationMatch = c.city?.toLowerCase().includes(searchLower);
    const matchesSearch = nameMatch || locationMatch;
    
    const matchesSpec = specializationFilter 
      ? (c.specializations && (Array.isArray(c.specializations) ? c.specializations.some(s => s.toLowerCase().includes(specializationFilter.toLowerCase())) : c.specializations.toLowerCase().includes(specializationFilter.toLowerCase())))
      : true;
      
    return matchesSearch && matchesSpec;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore Licensed Counsellors</h1>
      <p className={styles.subtitle}>Connect with verified therapists specialized in CBT, mindfulness, anxiety, and holistic care.</p>

      {/* Search & Filters */}
      <div className={`bg-surface border-outline rounded-xl ${styles.searchBar}`}>
        <div className={styles.inputGroup}>
          <FaSearch className={styles.icon} />
          <input 
            type="text" 
            placeholder="Search by name, state, or city..." 
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
            <option value="Anxiety">Anxiety &amp; Panic</option>
            <option value="Depression">Depression</option>
            <option value="CBT">CBT &amp; Mindfulness</option>
            <option value="Trauma">Trauma &amp; PTSD</option>
            <option value="Relationships">Relationships</option>
          </select>
        </div>
      </div>

      {/* Counsellors Grid */}
      {loading ? (
        <p className="text-center py-12 text-sm text-stone-500">Loading licensed professionals...</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map(c => (
            <div key={c.user_id} className={`bg-surface border-outline rounded-xl ${styles.card}`}>
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {c.profile_pic ? (
                    <img src={c.profile_pic} alt={c.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    c.name?.charAt(0) || 'D'
                  )}
                </div>
                <div>
                  <h3 className={styles.counsellorName}>{c.name || 'Practitioner'}</h3>
                  <p className={styles.specialization}>
                    {Array.isArray(c.specializations) ? c.specializations.join(', ') : (c.specializations || 'Clinical Psychologist')}
                  </p>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}><FaMapMarkerAlt /> {c.city ? `${c.city}, ${c.state || ''}` : 'Online Tele-Consult'}</div>
                <div className={styles.infoRow}><FaStar color="#d4af37" /> {c.average_rating || '5.0'} ({c.experience_years || 5} yrs exp)</div>
                {c.session_fee && (
                  <div className="text-xs font-semibold text-stone-600 mt-1">₹{c.session_fee} / session</div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="btn-secondary"
                  style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                  onClick={() => handleReviewsClick(c)}
                >
                  <FaComments style={{ display: 'inline', marginRight: '4px' }} /> Reviews
                </button>
                <button
                  className="btn-primary"
                  style={{ flex: 2, padding: '8px 12px', fontSize: '13px' }}
                  onClick={() => handleBookClick(c)}
                >
                  <FaCalendarPlus style={{ display: 'inline', marginRight: '4px' }} /> Book Slot
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-stone-500">
              No counsellors found matching your search. Try clearing filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreCounsellors;
