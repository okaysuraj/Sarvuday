// src/components/normal_users/Trends.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import styles from './Trends.module.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const Trends = () => {
  const [trendsData, setTrendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrendsData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${BASE_URL}/user/dashboard/trends`, { headers });
        const formattedData = (response.data.trends || []).map((item) => ({
          ...item,
          formattedDate: new Date(item.date).toLocaleDateString(),
        }));
        setTrendsData(formattedData);
      } catch (err) {
        setError('Failed to fetch trends data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendsData();
  }, []);

  if (loading) return <p className={styles.loading}>Loading trends...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (trendsData.length === 0) return <p className={styles.noData}>No trends data available</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Your Sentiment Trends</h2>
      
      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Emotion Intensity Over Time</h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedDate" />
              <YAxis domain={[0, 10]} />
              <Tooltip 
                formatter={(value, name, props) => [value, props.payload.dominant_emotion]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="emotion_intensity_score" 
                stroke="#003fdd" 
                activeDot={{ r: 8 }} 
                name="Intensity" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartSection}>
        <h3 className={styles.chartTitle}>Dominant Emotions Breakdown</h3>
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={trendsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="formattedDate" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="emotion_intensity_score" fill="#8884d8" name="Emotion Intensity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Trends;
