// src/components/auth/ProtectedRoute.jsx

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSession } from '../../utils/session';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const session = useSession();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  if (allowedRoles && !allowedRoles.includes(session.userType)) {
    return (
      <div role="alert" className="p-8">
        <h1 className="text-2xl font-semibold">Access restricted</h1>
        <p className="mt-3">Your account does not have access to this area.</p>
      </div>
    );
  }
  return children || <Outlet />;
};

export default ProtectedRoute;
