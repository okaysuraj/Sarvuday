import { Navigate } from 'react-router-dom';
export default function BookingModal({ counsellorId }) { return <Navigate to="/booking/slot" state={{ counsellorId, bookingType: 'video' }} replace />; }
