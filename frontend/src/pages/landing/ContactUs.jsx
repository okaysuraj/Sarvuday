// src/pages/ContactUs.jsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactUs.module.css';
import BASE_URL from '../../config/apiConfig';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus({
        submitted: true,
        success: false,
        message: 'Sending your message...'
      });
      
      // You can uncomment this when the backend endpoint is ready
      // const response = await axios.post(`${BASE_URL}/contact`, formData);
      
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus({
        submitted: true,
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({
        submitted: true,
        success: false,
        message: 'There was a problem sending your message. Please try again.'
      });
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Get in Touch</h1>
        <p>
          Have questions or need assistance? We're here to help. Fill out the form below
          or use our contact information to reach out to us.
        </p>
      </div>

      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          <h2>Send us a Message</h2>
          
          {status.submitted && (
            <div className={status.success ? styles.successMessage : styles.errorMessage}>
              {status.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Counselling Services">Counselling Services</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Type your message here..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={status.submitted && status.success}
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className={styles.infoContent}>
              <h3>Our Location</h3>
              <p>123 Mental Health Avenue</p>
              <p>Udayaditya Technologies Ltd.</p>
              <p>Guwahati, Assam, India</p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className={styles.infoContent}>
              <h3>Phone Number</h3>
              <p><a href="tel:+1234567890">+91 9876543210</a></p>
              <p><a href="tel:+1987654321">+91 9965402768</a></p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <i className="fas fa-envelope"></i>
            </div>
            <div className={styles.infoContent}>
              <h3>Email Address</h3>
              <p><a href="mailto:info@survuday.com">info@survuday.com</a></p>
              <p><a href="mailto:support@survuday.com">support@survuday.com</a></p>
            </div>
          </div>
          
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <i className="fas fa-clock"></i>
            </div>
            <div className={styles.infoContent}>
              <h3>Working Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.mapContainer}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229224.99023755087!2d91.53807047590158!3d26.14326307226987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a287f9133ff%3A0x2bbd1332436bde32!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1748984071204!5m2!1sen!2sin"
          allowFullScreen="" 
          loading="lazy"
          title="Office Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;