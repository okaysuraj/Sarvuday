import React from 'react';
import styles from './CounsellorCard.module.css';
import BookAppointmentButton from './BookAppointmentButton';
import { toast } from 'react-toastify';

const CounsellorCard = ({ counsellor }) => {
  return (
    <div className={styles.card}>
      <img
        src={counsellor.profile_pic || '/default-avatar.png'}
        alt={counsellor.name || 'Counsellor'}
        className={styles.avatar}
      />

      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{counsellor.name || 'Unknown Counsellor'}</h3>
          <span className={styles.specTitle}>{counsellor.specializations?.[0] || 'Therapist'}</span>
        </div>
        
        <p className={styles.bio}>{counsellor.bio || 'Experienced mental health professional dedicated to helping you find your peace of mind.'}</p>
        
        <div className={styles.tags}>
          {(counsellor.specializations || ['Stress', 'Anxiety', 'Sleep']).slice(0, 4).map((s, i) => (
            <span key={i} className={styles.tag}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <a 
          href="#" 
          className={styles.viewProfile}
          onClick={(e) => { e.preventDefault(); toast.info('Public profiles coming soon!'); }}
        >
          View Profile
        </a>
        <BookAppointmentButton counsellorId={counsellor.user_id} />
      </div>
    </div>
  );
};

export default CounsellorCard;


