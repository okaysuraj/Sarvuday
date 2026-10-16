// src/components/auth/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  let claims;
  try {
    claims = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  } catch { claims = null; }
  // This is a navigation guard. The API verifies signatures and authorizes all data.
  const isAuthenticated = claims?.sub && Number.isFinite(claims.exp) && claims.exp * 1000 > Date.now();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  if (allowedRoles && !allowedRoles.includes(claims.user_type)) {
    return <div role="alert" className="p-8"><h1 className="text-2xl font-semibold">Access restricted</h1><p className="mt-3">Your account does not have access to this area.</p></div>;
  }
  return children || <Outlet />;
};

export default ProtectedRoute;

