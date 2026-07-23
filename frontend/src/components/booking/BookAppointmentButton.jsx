// src/components/BookAppointmentButton.jsx

import React, { useState } from 'react';
import styles from './BookAppointmentButton.module.css';
import BookingModal from './BookingModal';

const BookAppointmentButton = ({ counsellorId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBook = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleBook} className={styles.bookBtn}>
        Book Appointment
      </button>

      {isModalOpen && (
        <BookingModal 
          counsellorId={counsellorId} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default BookAppointmentButton;
