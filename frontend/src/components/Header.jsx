import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    
    // Get user type from localStorage
    if (token) {
      const storedUserType = localStorage.getItem('userType');
      if (storedUserType) {
        setUserType(storedUserType);
      } else {
        // Fallback to normal_user if userType is not stored
        setUserType('normal_user');
      }
    }
  }, []);

  // Utility function to apply active link styling
  const getNavClass = ({ isActive }) =>
    `${styles.linkElement} ${isActive ? styles.activeLink : ""}`;

  // Function to get dashboard URL based on user type
  const getDashboardUrl = () => {
    switch(userType) {
      case 'normal_user':
        return '/normal-user-dashboard';
      case 'counsellor':
        return '/counsellor-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/normal-user-dashboard';
    }
  };

  return (
    <div className={styles.headerContainer}>
      <header className={`container ${styles.header}`}>
        
        {/* Logo */}
        <div className={styles.logoContainer}>
          <NavLink
            to="/"
            className={styles.brandLink}
          >
            <span className={styles.brandName}>Sarvuday</span>
          </NavLink>
        </div>



        {/* Buttons */}
        <div className={styles.actionButtons}>
          {isLoggedIn ? (
            <NavLink to={getDashboardUrl()}>
              <button type="button" className="btn-primary">
                Dashboard
              </button>
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={styles.loginLink}>Login</NavLink>
              <NavLink to="/register">
                <button className="btn-primary">Sign Up</button>
              </NavLink>
            </>
          )}
        </div>

      </header>
    </div>
  );
};

export default Header;
