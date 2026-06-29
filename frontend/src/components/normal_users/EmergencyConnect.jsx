// src/components/normal_users/EmergencyConnect.jsx
import React from 'react';
import styles from './EmergencyConnect.module.css';
import { FaPhoneAlt, FaAmbulance, FaHandsHelping, FaHeartbeat } from 'react-icons/fa';

const EmergencyConnect = () => {
  const helplines = [
    {
      title: "National Suicide Prevention Lifeline",
      number: "988",
      description: "Available 24/7. Free and confidential support for people in distress.",
      icon: <FaHeartbeat color="var(--color-error)" size={24} />
    },
    {
      title: "Emergency Medical Services",
      number: "911",
      description: "For immediate medical or psychological emergencies.",
      icon: <FaAmbulance color="var(--color-primary)" size={24} />
    },
    {
      title: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Connect with a volunteer Crisis Counselor 24/7, free, confidential.",
      icon: <FaHandsHelping color="var(--color-secondary)" size={24} />
    },
    {
      title: "Substance Abuse Helpline",
      number: "1-800-662-HELP (4357)",
      description: "Treatment referral and information service.",
      icon: <FaPhoneAlt color="var(--color-outline)" size={24} />
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Emergency Connect</h1>
        <p>If you or someone you know is in immediate danger, please reach out to these resources immediately.</p>
      </div>
      
      <div className={styles.grid}>
        {helplines.map((helpline, index) => (
          <div key={index} className={`sticker-container ${styles.helplineCard}`}>
            <div className={styles.iconWrapper}>
              {helpline.icon}
            </div>
            <div className={styles.cardContent}>
              <h3>{helpline.title}</h3>
              <p className={styles.number}>{helpline.number}</p>
              <p className={styles.description}>{helpline.description}</p>
            </div>
            <a href={`tel:${helpline.number.replace(/[^0-9]/g, '')}`} className={`btn-primary ${styles.callBtn}`}>
              <FaPhoneAlt /> Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyConnect;
