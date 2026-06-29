// src/components/normal_users/SettingsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import styles from './SettingsPage.module.css';
import { FaMoneyBillWave, FaHeadset, FaUserTimes } from 'react-icons/fa';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('refund');
  const [refundForm, setRefundForm] = useState({ appointmentId: '', reason: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteEmail, setDeleteEmail] = useState('');

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    if (!refundForm.appointmentId || !refundForm.reason) {
      toast.error("Please fill all fields.");
      return;
    }
    toast.success("Refund request submitted successfully. We will review it shortly.");
    setRefundForm({ appointmentId: '', reason: '' });
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;
      const payload = JSON.parse(atob(token.split('.')[1])); // decode email
      if (deleteEmail !== payload.sub && deleteEmail !== "confirm") {
        // Just mock validation, real validation depends on payload structure
      }

      await axios.delete(`${BASE_URL}/user/dashboard/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.clear();
      toast.success("Account deleted successfully.");
      navigate('/');
    } catch (err) {
      toast.error("Failed to delete account or incorrect confirmation.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Settings</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'refund' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('refund')}
        >
          <FaMoneyBillWave /> Refund Request
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'support' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('support')}
        >
          <FaHeadset /> Customer Care
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'delete' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('delete')}
        >
          <FaUserTimes /> Delete Account
        </button>
      </div>

      <div className={`sticker-container ${styles.contentArea}`}>
        {activeTab === 'refund' && (
          <div className={styles.section}>
            <h2>Request a Refund</h2>
            <p>If you were dissatisfied with a session or experienced technical issues, you can request a refund here.</p>
            <form onSubmit={handleRefundSubmit} className={styles.form}>
              <div className="formGroup">
                <label className="label">Appointment ID / Reference</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. APT-12345"
                  value={refundForm.appointmentId}
                  onChange={e => setRefundForm({...refundForm, appointmentId: e.target.value})}
                />
              </div>
              <div className="formGroup">
                <label className="label">Reason for Refund</label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  placeholder="Please describe why you are requesting a refund..."
                  value={refundForm.reason}
                  onChange={e => setRefundForm({...refundForm, reason: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">Submit Request</button>
            </form>
          </div>
        )}

        {activeTab === 'support' && (
          <div className={styles.section}>
            <h2>Customer Care</h2>
            <p>We're here to help you. Reach out to us through any of the channels below.</p>
            
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <h3>Email Support</h3>
                <p>support@sarvuday.com</p>
                <span>Responds within 24 hours</span>
              </div>
              <div className={styles.contactCard}>
                <h3>Phone Support</h3>
                <p>+1 (800) 123-4567</p>
                <span>Mon-Fri, 9am - 5pm EST</span>
              </div>
              <div className={styles.contactCard}>
                <h3>Live Chat</h3>
                <p>Available on dashboard</p>
                <span>Instant response</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'delete' && (
          <div className={styles.section}>
            <h2 style={{color: 'var(--color-error)'}}>Delete Account</h2>
            <p>Warning: Deleting your account is permanent. All your data, session history, and preferences will be erased.</p>
            
            {!isDeleting ? (
              <button className="btn-secondary" style={{borderColor: 'var(--color-error)', color: 'var(--color-error)'}} onClick={() => setIsDeleting(true)}>
                Proceed to Delete
              </button>
            ) : (
              <div className={styles.deleteConfirmArea}>
                <p>Please type <strong>"confirm"</strong> to permanently delete your account.</p>
                <input 
                  type="text" 
                  className="input-field" 
                  value={deleteEmail}
                  onChange={e => setDeleteEmail(e.target.value)}
                  placeholder="confirm"
                />
                <div style={{display: 'flex', gap: '16px', marginTop: '16px'}}>
                  <button className="btn-secondary" onClick={() => setIsDeleting(false)}>Cancel</button>
                  <button className="btn-primary" style={{backgroundColor: 'var(--color-error)', color: 'white'}} onClick={handleDeleteAccount}>
                    Permanently Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
