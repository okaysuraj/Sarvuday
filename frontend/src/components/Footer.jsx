import styles from "./Footer.module.css";
import { FaTwitterSquare, FaInstagram, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={`sticker-container ${styles.footerContainer}`}>
      <footer className={`container ${styles.footer}`}>
        <div className={styles.footerTop}>
          <div className={styles.brandSection}>
            <Link to="/">
              <span className={styles.brandName}>Sarvuday.</span>
            </Link>
            <p className={styles.brandDescription}>
              Experience the sophisticated evolution of mental clarity.
            </p>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linkGroup}>
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact-us">Contact</Link>
            </div>
            <div className={styles.linkGroup}>
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Sarvuday. All rights reserved.</p>
          <ul className={styles.social}>
            <li><a href="#"><FaLinkedin size={24} /></a></li>
            <li><a href="#"><FaTwitterSquare size={24} /></a></li>
            <li><a href="#"><FaInstagram size={24} /></a></li>
            <li><a href="#"><FaFacebookSquare size={24} /></a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
