import { Link, Navigate, useLocation } from 'react-router-dom';
export default function BookingType() {
  const location = useLocation();
  const counsellorId = location.state?.counsellorId;
  return counsellorId ? (
    <Navigate to="/booking/slot" state={{ counsellorId, bookingType: 'video' }} replace />
  ) : (
    <Link to="/therapists">Choose a therapist</Link>
  );
}
