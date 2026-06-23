// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <>
      {/* no header/footer, can add dashboard-specific wrapper later */}
      <Outlet />
    </>
  );
};

export default DashboardLayout;
