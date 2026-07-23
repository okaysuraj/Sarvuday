// src/pages/Disorders.jsx

import  { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import styles from './Disorders.module.css';

const Disorders = () => {
  const [disorders, setDisorders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDisorders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/content/disorders`);
        setDisorders(response.data.disorders || []);
      } catch (err) {
        setError('Failed to load disorders.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisorders();
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  if (loading) return <p className={styles.statusMessage}>Loading disorders...</p>;
  if (error) return <p className={styles.statusMessage}>{error}</p>;
  if (!disorders.length) return <p className={styles.statusMessage}>No disorders found.</p>;

  const disorder = disorders[selectedIndex];

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Mental Health Disorders</h2>

      {/* Disorder Buttons */}
      <div className={styles.buttonContainer}>
        {disorders.map((d, index) => (
          <button
            key={d.disorder_id}
            className={`${styles.disorderButton} ${index === selectedIndex ? styles.active : ''}`}
            onClick={() => handleSelect(index)}
          >
            {d.disorder_title}
          </button>
        ))}
      </div>

      {/* Selected Disorder Details */}
      <div className={styles.card}>
        <h3 className={styles.title}>{disorder.disorder_title}</h3>
        <p className={styles.description}>{disorder.disorder_description}</p>

        <div className={styles.section}>
          <strong>Symptoms:</strong>
          <ul>{disorder.symptoms.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>

        <div className={styles.section}>
          <strong>Preventions:</strong>
          <ul>{disorder.preventions.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>

        <div className={styles.section}>
          <strong>Treatments:</strong>
          <ul>{disorder.treatments.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>

        <div className={styles.advice}>
          <strong>Best Advice:</strong> {disorder.best_advice}
        </div>
      </div>
    </div>
  );
};

export default Disorders;

