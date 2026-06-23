import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import styles from './Auth.module.css';
import { toast } from 'react-toastify';
import { FaGoogle, FaApple, FaEnvelope, FaPhone } from 'react-icons/fa';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, sendEmailVerification } from 'firebase/auth';

const Register = () => {
  const navigate = useNavigate();

  const [registerMethod, setRegisterMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    user_type: 'normal_user',
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    gender: 'other',
    terms_accepted: false,
    privacy_policy_accepted: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const recaptchaVerifierRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const getRecaptchaVerifier = () => {
    if (!recaptchaVerifierRef.current && recaptchaContainerRef.current) {
      recaptchaContainerRef.current.innerHTML = ''; // Force empty container
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        size: 'invisible',
        'expired-callback': () => {
          if (recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current.clear();
            recaptchaVerifierRef.current = null;
          }
        }
      });
    }
    return recaptchaVerifierRef.current;
  };

  const sendPhoneOtp = async () => {
    if (!formData.phone_number) {
      toast.error('Please enter your phone number with country code (e.g. +1234567890)');
      return;
    }
    let formattedPhone = formData.phone_number.trim();
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+91' + formattedPhone;
    }

    try {
      const verifier = getRecaptchaVerifier();
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, verifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      toast.success('OTP sent successfully!');
    } catch (error) {
      console.error(error);
      toast.error(`Failed to send OTP: ${error.message}`);
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
      if (recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = '';
      }
    }
  };

  const handleBackendRegister = async (idToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/firebase-register`, {
        user_type: formData.user_type,
        id_token: idToken,
        name: formData.name,
        gender: formData.gender,
        terms_accepted: formData.terms_accepted,
        privacy_policy_accepted: formData.privacy_policy_accepted
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Registration successful! Please login.");
        navigate('/login');
      }
    } catch (error) {
      console.error('Backend Register error:', error);
      toast.error(error?.response?.data?.detail || 'Registration failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms_accepted || !formData.privacy_policy_accepted) {
        toast.error("Please accept Terms and Privacy Policy.");
        return;
    }

    if (registerMethod === 'email') {
      if(formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match.");
          return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Send verification email
        await sendEmailVerification(userCredential.user);
        toast.info("A verification link has been sent to your email.");

        const idToken = await userCredential.user.getIdToken();
        await handleBackendRegister(idToken);

        // Log out immediately so they must verify before accessing
        await auth.signOut();
      } catch (error) {
        toast.error(error.message);
      }
    } else if (registerMethod === 'phone' && otpSent) {
      try {
        const result = await confirmationResult.confirm(otpCode);
        const idToken = await result.user.getIdToken();
        await handleBackendRegister(idToken);
      } catch (error) {
        toast.error('Invalid OTP.');
      }
    } else if (registerMethod === 'phone' && !otpSent) {
      await sendPhoneOtp();
    }
  };

  return (
    <div className={styles.authPageContainer}>
      <div className={`sticker-container ${styles.formCard}`}>
        <div className={styles.formHeader} style={{ textAlign: 'left' }}>
          <h2 className={styles.formTitle}>Create Account</h2>
          <p className={styles.formSubtitle}>Begin your journey to mental clarity today.</p>
        </div>

            <div className={styles.socialButtons}>
              <button type="button" className={styles.btnSocialOutline} onClick={() => setRegisterMethod('email')} style={{ borderColor: registerMethod === 'email' ? 'var(--primary-purple)' : '', color: registerMethod === 'email' ? 'var(--primary-purple)' : ''}}>
                <FaEnvelope /> Email Sign Up
              </button>
              <button type="button" className={styles.btnSocialOutline} onClick={() => setRegisterMethod('phone')} style={{ borderColor: registerMethod === 'phone' ? 'var(--primary-purple)' : '', color: registerMethod === 'phone' ? 'var(--primary-purple)' : ''}}>
                <FaPhone /> Phone Sign Up
              </button>
            </div>

            <div className={styles.divider} style={{ margin: '16px 0' }}>
              <span>or create via</span>
            </div>

            <form onSubmit={handleSubmit} className={styles.authForm}>
                {/* Full Name */}
                <div className={styles.formGroup}>
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    className="input-field"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                        <label className="label">Gender</label>
                        <select className="input-field" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div>
                    <div className={styles.formGroup} style={{ flex: 1 }}>
                        <label className="label">Type</label>
                        <select className="input-field" name="user_type" value={formData.user_type} onChange={handleChange} required>
                        <option value="normal_user">User</option>
                        <option value="counsellor">Counsellor</option>
                        </select>
                    </div>
                </div>

                {registerMethod === 'email' && (
                  <>
                    <div className={styles.formGroup}>
                      <label className="label">Email Address</label>
                      <input type="email" className="input-field" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div className={styles.formGroup} style={{ flex: 1 }}>
                        <label className="label">Password</label>
                        <input type="password" className="input-field" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                      </div>
                      <div className={styles.formGroup} style={{ flex: 1 }}>
                        <label className="label">Confirm</label>
                        <input type="password" className="input-field" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
                      </div>
                    </div>
                  </>
                )}

                {registerMethod === 'phone' && !otpSent && (
                  <div className={styles.formGroup}>
                    <label className="label">Phone Number</label>
                    <input type="tel" className="input-field" name="phone_number" placeholder="+1234567890" value={formData.phone_number} onChange={handleChange} required />
                  </div>
                )}

                {registerMethod === 'phone' && otpSent && (
                  <div className={styles.formGroup}>
                    <label className="label">OTP Code</label>
                    <input type="text" className="input-field" name="otpCode" placeholder="123456" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
                  </div>
                )}

                {/* Terms Checkboxes */}
                <div className={styles.termsContainer}>
                  <input
                    type="checkbox"
                    name="terms_accepted"
                    checked={formData.terms_accepted}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      handleChange(e);
                      setFormData(prev => ({...prev, privacy_policy_accepted: isChecked}));
                    }}
                    required
                  />
                  <span className={styles.termsText}>
                    I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                  </span>
                </div>

                <div ref={recaptchaContainerRef}></div>

                <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '16px', display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
                  {registerMethod === 'phone' ? (otpSent ? 'Verify OTP & Register' : 'Send OTP') : 'Create Account'} <span style={{fontSize: '20px'}}>→</span>
                </button>

              <p className={styles.authSwitchText}>
                Already have an account? <Link to="/login" className={styles.authSwitchLink}>Login</Link>
              </p>
            </form>
      </div>
    </div>
  );
};

export default Register;
