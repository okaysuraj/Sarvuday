import React from 'react';
import styles from './CounsellorCard.module.css';
import BookAppointmentButton from '../booking/BookAppointmentButton';
import { Link } from 'react-router-dom';

const CounsellorCard = ({ counsellor }) => {
  return (
    <div className={styles.card}>
      <img
        src={counsellor.profile_pic || undefined}
        alt={counsellor.name || 'Counsellor'}
        className={styles.avatar}
      />

      <div className={styles.details}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{counsellor.name || 'Unknown Counsellor'}</h3>
          <span className={styles.specTitle}>{counsellor.specializations?.[0] || 'Therapist'}</span>
        </div>
        
        <p className={styles.bio}>{counsellor.bio}</p>
        
        <div className={styles.tags}>
          {(counsellor.specializations || []).slice(0, 4).map((s, i) => (
            <span key={i} className={styles.tag}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Link
          to={`/therapists/${counsellor.user_id}`}
          className={styles.viewProfile}
        >
          View Profile
        </Link>
        <BookAppointmentButton counsellorId={counsellor.user_id} />
      </div>
    </div>
  );
};

export default CounsellorCard;


