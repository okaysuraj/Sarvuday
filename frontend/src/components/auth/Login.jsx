import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import styles from './Auth.module.css';
import { toast } from 'react-toastify';
import { FaGoogle, FaApple, FaEnvelope, FaPhone } from 'react-icons/fa';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    user_type: 'normal_user',
    email: '',
    phone_number: '',
    password: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleResetPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email to reset password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBackendLogin = async (idToken) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/firebase-login`, {
        user_type: formData.user_type,
        id_token: idToken
      });
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('userType', response.data.user_type);
  
        switch (response.data.user_type) {
          case 'normal_user': navigate('/normal-user-dashboard'); break;
          case 'counsellor': navigate('/counsellor-dashboard'); break;
          case 'admin': navigate('/admin-dashboard'); break;
          default: navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Backend Login error:', error);
      toast.error(error?.response?.data?.detail || 'Login failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (loginMethod === 'email') {
      if(!formData.email || !formData.password) {
          toast.error("Please fill email and password.");
          return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Enforce Email Verification
        if (!userCredential.user.emailVerified) {
          await auth.signOut();
          toast.error("Please verify your email address to log in.");
          return;
        }

        const idToken = await userCredential.user.getIdToken();
        await handleBackendLogin(idToken);
      } catch (error) {
        toast.error('Invalid email or password.');
      }
    } else if (loginMethod === 'phone' && otpSent) {
      try {
        const result = await confirmationResult.confirm(otpCode);
        const idToken = await result.user.getIdToken();
        await handleBackendLogin(idToken);
      } catch (error) {
        toast.error('Invalid OTP.');
      }
    } else if (loginMethod === 'phone' && !otpSent) {
      await sendPhoneOtp();
    }
  };
  
  return (
    <div className={styles.authPageContainer}>
      <div className={`sticker-container ${styles.formCard}`}>
        <div className={styles.formHeader} style={{ textAlign: 'left' }}>
          <h2 className={styles.formTitle}>Welcome Back</h2>
          <p className={styles.formSubtitle}>Find your peace of mind again.</p>
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.btnSocialOutline} onClick={() => setLoginMethod('email')} style={{ borderColor: loginMethod === 'email' ? 'var(--primary-purple)' : '', color: loginMethod === 'email' ? 'var(--primary-purple)' : ''}}>
            <FaEnvelope /> Email Login
          </button>
          <button className={styles.btnSocialOutline} onClick={() => setLoginMethod('phone')} style={{ borderColor: loginMethod === 'phone' ? 'var(--primary-purple)' : '', color: loginMethod === 'phone' ? 'var(--primary-purple)' : ''}}>
            <FaPhone /> Phone Login
          </button>
        </div>

        <div className={styles.divider}>
          <span>or log in using</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          
          {/* User Type dropdown removed - backend auto-detects */}

          {loginMethod === 'email' && (
            <>
              <div className={styles.formGroup}>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  name="email"
                  placeholder="hello@mindful.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordHeader}>
                  <label className="label">Password</label>
                  <button type="button" onClick={handleResetPassword} className={styles.forgotLink} style={{background:'none',border:'none',cursor:'pointer',fontSize:'0.875rem'}}>Forgot?</button>
                </div>
                <input
                  type="password"
                  className="input-field"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {loginMethod === 'phone' && !otpSent && (
              <div className={styles.formGroup}>
                <label className="label">Phone Number</label>
                <input
                  type="tel"
                  className="input-field"
                  name="phone_number"
                  placeholder="+1234567890"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
          )}

          {loginMethod === 'phone' && otpSent && (
              <div className={styles.formGroup}>
                <label className="label">OTP Code</label>
                <input
                  type="text"
                  className="input-field"
                  name="otpCode"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                />
              </div>
          )}

          <div ref={recaptchaContainerRef}></div>

          <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
            {loginMethod === 'phone' ? (otpSent ? 'Verify OTP' : 'Send OTP') : 'Login'}
          </button>

          <p className={styles.authSwitchText}>
            Don't have an account? <Link to="/register" className={styles.authSwitchLink}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
