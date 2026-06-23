// src/components/normal_users/Prescriptions.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import styles from './Prescriptions.module.css';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/prescriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrescriptions(res.data.prescriptions || []);
    } catch (err) {
      console.error('Error fetching prescriptions:', err);
      toast.error('Failed to fetch prescriptions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Prescriptions</h2>

      {loading && <p className={styles.loading}>Loading prescriptions...</p>}

      {!loading && prescriptions.length > 0 ? (
        <div className={styles.list}>
          {prescriptions.map((script) => (
            <div key={script.prescription_id} className={styles.card}>
              <h4 className={styles.diagnosis}>Diagnosis: {script.diagnosis}</h4>
              <p className={styles.date}>Date: {new Date(script.created_at).toLocaleDateString()}</p>
              
              <h5 className={styles.sectionTitle}>Medications:</h5>
              <ul className={styles.bulletList}>
                {script.medications.map((med, idx) => (
                  <li key={idx}>
                    {med.name} - {med.dosage} ({med.frequency})
                  </li>
                ))}
              </ul>

              <h5 className={styles.sectionTitle}>Recommendations:</h5>
              <ul className={styles.bulletList}>
                {script.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className={styles.noData}>No prescriptions found.</p>
      )}
    </div>
  );
};

export default Prescriptions;