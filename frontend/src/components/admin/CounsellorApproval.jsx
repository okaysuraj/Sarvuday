import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import BASE_URL from '../../config/apiConfig';
import styles from './CounsellorApproval.module.css';

const CounsellorApproval = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchPendingCounsellors();
  }, []);

  const fetchPendingCounsellors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${BASE_URL}/admin/counsellors?is_approved=false&limit=50`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // The endpoint returns { total: X, limit: Y, offset: Z, counsellors: [...] }
      if (response.data && response.data.counsellors) {
        setCounsellors(response.data.counsellors);
      } else {
        setCounsellors([]);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch pending counsellors", err);
      setError("Failed to load pending counsellors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (counsellorId, action) => {
    try {
      setActionLoading((prev) => ({ ...prev, [counsellorId]: true }));
      const token = localStorage.getItem('accessToken');
      const url = `${BASE_URL}/admin/counsellors/${action}/${counsellorId}`;
      
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success(`Counsellor successfully ${action === 'approve' ? 'approved' : 'denied'}!`);
      // Remove the counsellor from the list
      setCounsellors((prev) => prev.filter(c => c.user_id !== counsellorId));
      
    } catch (err) {
      console.error(`Failed to ${action} counsellor`, err);
      toast.error(`Failed to ${action} counsellor. Please try again.`);
    } finally {
      setActionLoading((prev) => ({ ...prev, [counsellorId]: false }));
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading Pending Approvals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Pending Counsellor Approvals</h2>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {!error && counsellors.length === 0 ? (
        <div className={styles.noData}>
          <h3>All caught up!</h3>
          <p>There are no pending counsellor registrations waiting for approval.</p>
        </div>
      ) : (
        <div className={styles.counsellorGrid}>
          {counsellors.map((counsellor) => (
            <div key={counsellor.user_id} className={styles.counsellorCard}>
              <div className={styles.cardHeader}>
                {counsellor.profile_pic ? (
                  <img src={counsellor.profile_pic} alt={counsellor.name} className={styles.profilePic} />
                ) : (
                  <div className={styles.profileInitial}>
                    {counsellor.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className={styles.counsellorName}>{counsellor.name}</h3>
                  <p className={styles.counsellorEmail}>{counsellor.email}</p>
                </div>
              </div>

              <div className={styles.counsellorDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Experience:</span>
                  <span className={styles.detailValue}>{counsellor.experience_years || 0} Years</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Session Fee:</span>
                  <span className={styles.detailValue}>₹{counsellor.session_fee || 0}</span>
                </div>
                {counsellor.specializations && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Specialization:</span>
                    <span className={styles.detailValue} title={counsellor.specializations}>
                      {counsellor.specializations}
                    </span>
                  </div>
                )}
                {counsellor.license_number && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>License:</span>
                    <span className={styles.detailValue} title={counsellor.license_number}>
                      {counsellor.license_number}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.actionButtons}>
                <button 
                  className={styles.allowBtn}
                  disabled={actionLoading[counsellor.user_id]}
                  onClick={() => handleAction(counsellor.user_id, 'approve')}
                >
                  <FaCheckCircle />
                  {actionLoading[counsellor.user_id] ? 'Processing...' : 'Allow'}
                </button>
                <button 
                  className={styles.denyBtn}
                  disabled={actionLoading[counsellor.user_id]}
                  onClick={() => handleAction(counsellor.user_id, 'disapprove')}
                >
                  <FaTimesCircle />
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CounsellorApproval;
