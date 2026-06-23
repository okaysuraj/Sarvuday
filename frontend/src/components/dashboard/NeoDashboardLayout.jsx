import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaUserCircle, 
  FaMoon, 
  FaSun, 
  FaSignOutAlt,
  FaHome,
  FaRobot,
  FaComments,
  FaFileMedical,
  FaBell,
  FaUserCog
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from './NeoDashboardLayout.module.css';

const NeoDashboardLayout = ({ children, username = "User", profilePic = null, sidebarLinks = [] }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toast.info("Dark mode toggle clicked (Implementation pending global state)");
    // TODO: Connect to global dark mode state
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Top Navbar */}
      <header className={styles.navbar}>
        <div className={styles.navLeft}>
          <button onClick={toggleSidebar} className={styles.menuToggleBtn} aria-label="Toggle Menu">
            <FaBars />
          </button>
          <NavLink to="/" className={styles.logo}>
            Sarvuday.
          </NavLink>
        </div>

        <div className={styles.navRight} ref={dropdownRef}>
          <span className={styles.greeting}>Hey, {username}</span>
          
          <div 
            className={styles.profileCircle} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            title="Profile Menu"
          >
            {profilePic ? (
              <img src={profilePic} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%'}} />
            ) : (
              <FaUserCircle size={24} />
            )}
          </div>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button className={styles.dropdownItem} onClick={toggleDarkMode}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button className={styles.dropdownItem} onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Body Area */}
      <div className={styles.bodyContainer}>
        
        {/* Retractable Sidebar */}
        <aside className={`${styles.sidebar} ${isSidebarCollapsed ? styles.collapsed : ''}`}>
          <ul className={styles.navList}>
            {sidebarLinks.map((link, index) => (
              <li key={index} className={styles.navItem}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  title={isSidebarCollapsed ? link.label : ""}
                >
                  <span className={styles.navIcon}>{link.icon}</span>
                  <span className={styles.navText}>{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default NeoDashboardLayout;
