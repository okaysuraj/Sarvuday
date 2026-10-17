import { clearSession, useSession } from '../utils/session';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import sarvudayLogo from '../assets/sarvuday_logo.png';
import { auth } from '../config/firebase';

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userType = useSession()?.userType || 'normal_user';

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      clearSession();
      navigate('/login');
    }
  };

  const patientNav = [
    { label: 'Dashboard', path: '/normal-user-dashboard', icon: 'dashboard' },
    { label: 'AI Companion', path: '/ai-chat', icon: 'smart_toy' },
    { label: 'Therapists', path: '/therapists', icon: 'calendar_month' },
    { label: 'Mood Tracker', path: '/mood-tracker', icon: 'mood' },
    { label: 'Daily Journal', path: '/journal', icon: 'edit_note' },
    { label: 'My Records', path: '/my-records', icon: 'assignment' },
    { label: 'Insights', path: '/insights', icon: 'insights' },
    { label: 'Community', path: '/community', icon: 'forum' },
  ];

  const therapistNav = [
    { label: 'Patients', path: '/counsellor-dashboard', icon: 'group' },
    { label: 'Schedule', path: '/schedule', icon: 'calendar_today' },
    { label: 'Earnings', path: '/earnings', icon: 'payments' },
    { label: 'Settings', path: '/settings', icon: 'settings' },
  ];

  const adminNav = [
    { label: 'Overview', path: '/admin-dashboard', icon: 'dashboard' },
    { label: 'Users', path: '/admin/users', icon: 'group' },
    { label: 'Moderation', path: '/admin/moderation', icon: 'gavel' },
    { label: 'Analytics', path: '/admin/analytics', icon: 'analytics' },
  ];

  let navItems = patientNav;
  if (userType === 'counsellor') navItems = therapistNav;
  if (userType === 'admin') navItems = adminNav;

  return (
    <div className="bg-[#FAF9F6] text-[#121214] min-h-screen flex flex-col md:flex-row antialiased selection:bg-[#18181B] selection:text-white">
      {/* Desktop Minimalist Sidebar */}
      <aside className="hidden md:flex w-[260px] h-screen flex-col p-5 border-r border-[#EAEAEA] bg-white sticky top-0 shrink-0 z-40">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#EAEAEA]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#EAEAEA] p-0.5 flex items-center justify-center overflow-hidden">
              <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[15px] tracking-tight text-[#121214] leading-tight">
                SarvUday
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] font-medium leading-none">
                {userType.replace('_', ' ')}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 flex-grow overflow-y-auto pr-1">
          {navItems.map((item, idx) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/normal-user-dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#18181B] text-white shadow-sm'
                    : 'text-[#6E6D7A] hover:text-[#121214] hover:bg-[#F5F4F0]'
                }`}
              >
                <span
                  className="material-symbols-rounded text-[19px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions & Crisis Help */}
        <div className="mt-auto pt-4 border-t border-[#EAEAEA] space-y-2">
          <Link
            to="/emergency"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium bg-[#FDEBEC] text-[#8F2B26] hover:bg-[#FADBDC] transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8F2B26] animate-pulse"></span>
              Urgent support
            </span>
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#6E6D7A] hover:text-[#121214] hover:bg-[#F5F4F0] transition-colors"
          >
            <span className="material-symbols-rounded text-[18px]">settings</span>
            <span>Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#6E6D7A] hover:text-[#8F2B26] hover:bg-[#FDEBEC]/60 transition-colors text-left"
          >
            <span className="material-symbols-rounded text-[18px]">logout</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-grow flex flex-col w-full min-h-screen">
        {/* Top App Header */}
        <header className="sticky top-0 z-30 h-16 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAEAEA] flex items-center justify-between px-4 md:px-8">
          {/* Mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#121214] hover:bg-black/[0.04] transition-colors"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-rounded text-2xl">menu</span>
            </button>
            <span className="text-xs sm:text-sm font-medium text-[#71717A] hidden sm:inline-block">
              SarvUday Digital Care
            </span>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="flex items-center gap-3">
            <Link
              to="/emergency"
              className="sm:hidden px-2.5 py-1 rounded-full text-xs font-medium bg-[#FDEBEC] text-[#8F2B26]"
            >
              SOS
            </Link>

            <Link
              to="/notifications"
              className="p-2 rounded-lg text-[#6E6D7A] hover:text-[#121214] hover:bg-black/[0.04] transition-colors relative"
              aria-label="Notifications"
            >
              <span className="material-symbols-rounded text-[20px]">notifications</span>
            </Link>

            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-[#EAE8E2] border-[#EAEAEA] flex items-center justify-center text-xs font-semibold text-[#121214] hover:border-outline/20 transition-all"
            >
              {userType.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="w-[280px] h-full bg-white p-5 flex flex-col justify-between shadow-2xl border-r border-[#EAEAEA]"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#FAF9F6] border border-[#EAEAEA] p-0.5 flex items-center justify-center overflow-hidden">
                      <img
                        src={sarvudayLogo}
                        alt="SarvUday"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="font-semibold text-base">SarvUday</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-[#71717A] hover:bg-black/[0.04]"
                  >
                    <span className="material-symbols-rounded text-xl">close</span>
                  </button>
                </div>

                <nav className="flex flex-col gap-1">
                  {navItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#121214] hover:bg-[#F5F4F0]"
                    >
                      <span className="material-symbols-rounded text-lg text-[#71717A]">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#EAEAEA] space-y-2">
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#71717A] hover:bg-[#F5F4F0]"
                >
                  <span className="material-symbols-rounded text-lg">settings</span>
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#8F2B26] hover:bg-[#FDEBEC]"
                >
                  <span className="material-symbols-rounded text-lg">logout</span>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet Canvas */}
        <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto mb-16 md:mb-0">
          <div className="max-w-6xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-[#EAEAEA] flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 4).map((item, idx) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
                isActive ? 'text-[#121214] font-medium' : 'text-[#71717A] hover:text-[#121214]'
              }`}
            >
              <span
                className="material-symbols-rounded text-[20px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardLayout;
