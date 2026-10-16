import { Link } from 'react-router-dom';
import styles from './BookAppointmentButton.module.css';
export default function BookAppointmentButton({ counsellorId }) {
  return <Link to="/booking/slot" state={{ counsellorId, bookingType: 'video' }} className={styles.bookBtn}>Book appointment</Link>;
}
