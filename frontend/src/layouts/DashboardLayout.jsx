import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { auth } from '../config/firebase';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userType, setUserType] = useState('normal_user');

  useEffect(() => {
    const storedType = localStorage.getItem('userType');
    if (storedType) {
      setUserType(storedType);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userType');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const patientNav = [
    { label: 'Home', path: '/normal-user-dashboard', icon: 'home' },
    { label: 'Mood Tracker', path: '/mood-tracker', icon: 'mood' },
    { label: 'My Records', path: '/my-records', icon: 'assignment' },
    { label: 'Therapists', path: '/therapists', icon: 'medical_services' }
  ];

  const therapistNav = [
    { label: 'Patients', path: '/counsellor-dashboard', icon: 'group' },
    { label: 'Schedule', path: '/schedule', icon: 'calendar_today' },
    { label: 'Earnings', path: '/earnings', icon: 'payments' },
    { label: 'Settings', path: '/settings', icon: 'settings' }
  ];

  const adminNav = [
    { label: 'Overview', path: '/admin-dashboard', icon: 'dashboard' },
    { label: 'Users', path: '/admin/users', icon: 'group' },
    { label: 'Moderation', path: '/admin/moderation', icon: 'gavel' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'analytics' }
  ];

  let navItems = patientNav;
  if (userType === 'counsellor') navItems = therapistNav;
  if (userType === 'admin') navItems = adminNav;

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md overflow-x-hidden flex flex-col md:flex-row">
      <style>{`
        .neo-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
        }
        .neo-button-primary {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease-in-out;
        }
        .neo-button-primary:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-interaction:active {
            transform: translate(2px, 2px);
            box-shadow: none !important;
        }
      `}</style>

      {/* Desktop NavigationDrawer (hidden on mobile) */}
      <nav className="hidden md:flex w-[280px] h-screen flex-col p-6 rounded-r-xl border-r-[1.5px] border-ink-black bg-surface dark:bg-surface-container shadow-[4px_0px_0px_0px_rgba(26,26,26,1)] sticky top-0 shrink-0 z-40">
        <div className="flex items-center mb-10 gap-4">
          <div className="w-12 h-12 rounded-full border-[1.5px] border-ink-black overflow-hidden shrink-0 bg-primary/20 flex items-center justify-center text-primary font-bold">
            {userType.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-primary capitalize">{userType.replace('_', ' ')}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Active</p>
          </div>
        </div>

        <ul className="flex flex-col gap-2 flex-grow">
          {navItems.map((item, idx) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={idx}>
                <Link 
                  to={item.path} 
                  className={`flex items-center gap-3 p-3 rounded-lg transition-transform ${isActive ? 'bg-primary text-on-primary border-[1.5px] border-ink-black scale-[0.98]' : 'text-on-surface hover:bg-surface-variant hover:translate-x-1'}`}
                >
                  <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
                  <span className="font-label-md text-label-md">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-col gap-2 mt-auto border-t-[1.5px] border-ink-black pt-4">
          <li>
            <Link to="/settings" className="flex items-center gap-3 p-3 text-on-surface hover:bg-surface-variant rounded-lg hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-on-surface hover:bg-error/20 hover:text-error rounded-lg hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-md text-label-md">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col w-full min-h-screen">
        {/* Mobile TopAppBar (hidden on desktop) */}
        <header className="md:hidden sticky top-0 border-b-[1.5px] border-ink-black bg-surface dark:bg-surface-container-low flex justify-between items-center w-full px-margin-mobile py-4 z-40">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-on-surface-variant hover:bg-surface-variant/20 p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-sm font-bold text-primary dark:text-primary-fixed-dim">SarvUday</h1>
          <button className="text-on-surface-variant hover:bg-surface-variant/20 p-2 rounded-full transition-all">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </header>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
            <nav className="w-[280px] h-full bg-surface p-6 border-r-[1.5px] border-ink-black shadow-[4px_0px_0px_0px_rgba(26,26,26,1)]" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-headline-sm text-primary">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 text-on-surface hover:bg-surface-variant rounded-lg">
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span className="font-label-md">{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="mt-4 border-t-[1.5px] border-ink-black pt-4">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 text-error hover:bg-error/10 rounded-lg">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="font-label-md">Logout</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Dashboard Canvas */}
        <div className="flex-grow p-margin-mobile md:p-margin-desktop overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
