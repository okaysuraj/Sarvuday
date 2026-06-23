// src/components/auth/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  if (!isAuthenticated) {
    toast.error('Please log in to continue', { toastId: 'login-required' });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

