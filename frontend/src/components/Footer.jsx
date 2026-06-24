import styles from "./Footer.module.css";
import {  FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={`container ${styles.footer}`}>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Sarvuday. All rights reserved.</p>
          
          <div className={styles.horizontalLinks}>
            <Link to="/about">About Us</Link>
            <Link to="/contact-us">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>

          <ul className={styles.social}>
            <li><a href="#"><FaLinkedin size={24} /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
