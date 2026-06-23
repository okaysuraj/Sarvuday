import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/apiConfig';
import CounsellorCard from '../components/CounsellorCard';
import styles from './ApprovedCounsellors.module.css';
import { FaSearch, FaVideo, FaPhone, FaCommentDots, FaUser, FaClock, FaCalendarAlt, FaHeadset } from 'react-icons/fa';

const ApprovedCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [appointmentType, setAppointmentType] = useState('Video Call');

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/content/counsellors`);
        setCounsellors(response.data.counsellors || []);
      } catch (err) {
        setError('No approved counsellors found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellors();
  }, []);

  const types = [
    { label: 'Video Call', icon: <FaVideo /> },
    { label: 'Audio Call', icon: <FaPhone /> },
    { label: 'Direct Chat', icon: <FaCommentDots /> },
    { label: 'In-Person', icon: <FaUser /> },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardLayout}>
        
        {/* Main Content Area */}
        <div className={styles.mainContent}>
          <div className={styles.headerArea}>
            <h1 className={styles.pageTitle}>Find your Specialist</h1>
            
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search by name, specialty, or condition" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Select Appointment Type</h3>
            <div className={styles.typeButtons}>
              {types.map((type) => (
                <button
                  key={type.label}
                  className={`${styles.typeBtn} ${appointmentType === type.label ? styles.activeTypeBtn : ''}`}
                  onClick={() => setAppointmentType(type.label)}
                >
                  {type.icon} {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Available Professionals</h3>
            
            {loading ? (
               <p className={styles.status}>Loading professionals...</p>
            ) : error ? (
               <p className={styles.status}>{error}</p>
            ) : counsellors.length === 0 ? (
               <p className={styles.status}>No professionals found.</p>
            ) : (
              <div className={styles.counsellorList}>
                {counsellors
                  .filter((c) => {
                    if (!searchTerm) return true;
                    const searchLower = searchTerm.toLowerCase();
                    return (
                      (c.name && c.name.toLowerCase().includes(searchLower)) ||
                      (c.specializations && c.specializations.toLowerCase().includes(searchLower)) ||
                      (c.certifications && c.certifications.toLowerCase().includes(searchLower)) ||
                      (c.city && c.city.toLowerCase().includes(searchLower)) ||
                      (c.state && c.state.toLowerCase().includes(searchLower))
                    );
                  })
                  .map((c) => (
                    <CounsellorCard key={c.user_id} counsellor={c} />
                  ))}
              </div>
            )}
          </div>



        </div>

        {/* Right Sidebar */}
        <div className={styles.sidebar}>
          
          <div className={styles.widgetYellow}>
            <h3 className={styles.widgetTitle}>Next Session</h3>
            <div className={styles.sessionDetails}>
              <div className={styles.sessionDoc}>
                <img src="/default-avatar.png" alt="Doc" className={styles.docAvatar} />
                <div>
                  <div className={styles.docName}>Dr. Marcus Thorne</div>
                  <div className={styles.docSpec}>Anxiety & Burnout</div>
                </div>
              </div>
              <div className={styles.sessionTime}>
                <FaCalendarAlt /> Tomorrow, Oct 2, 10:00 AM
              </div>
            </div>
            
            <div className={styles.widgetButtons}>
              <button className={styles.btnSolid}>Join Meeting</button>
              <button className={styles.btnOutline}>Reschedule</button>
            </div>

            <div className={styles.tipBox}>
              <strong>Preparation Tip:</strong> Take 5 deep breaths before joining the call to center yourself.
            </div>
          </div>

          <div className={styles.widgetBlue}>
            <div className={styles.helpIcon}><FaHeadset /></div>
            <h3 className={styles.widgetTitle}>Need Help?</h3>
            <p>Having trouble finding the right specialist?</p>
            <a href="#" className={styles.helpLink}>Talk to Support →</a>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default ApprovedCounsellors;

