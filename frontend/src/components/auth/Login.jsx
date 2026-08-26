import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    email: '',
    phone_number: '',
    password: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const recaptchaVerifierRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
      recaptchaContainerRef.current.innerHTML = '';
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
      const response = await axiosInstance.post(`/auth/firebase-login`, {
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
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-8 overflow-hidden relative selection:bg-primary/20 selection:text-primary">
      {/* Decorative Soft Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-pink/20 rounded-full blur-[100px] z-0 hidden lg:block animate-pulse duration-10000 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] z-0 hidden lg:block pointer-events-none"></div>
      
      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-10 relative overflow-hidden">
          
          <div className="text-center mb-8">
            <h2 className="font-display-lg text-3xl text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="font-body-md text-gray-500">Log in to continue your journey.</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-4 mb-6 bg-gray-50 p-1 rounded-xl">
            <button 
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 font-label-bold text-label-bold rounded-lg transition-all duration-200 ${loginMethod === 'email' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Email
            </button>
            <button 
              type="button"
              onClick={() => { setLoginMethod('phone'); setOtpSent(false); }}
              className={`flex-1 py-2 font-label-bold text-label-bold rounded-lg transition-all duration-200 ${loginMethod === 'phone' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {loginMethod === 'email' ? (
              <>
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-bold text-sm text-gray-700" htmlFor="email">Email Address</label>
                  <input className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-body-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" id="email" name="email" placeholder="hello@example.com" required type="email" value={formData.email} onChange={handleChange} />
                </div>
                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-bold text-sm text-gray-700" htmlFor="password">Password</label>
                    <button type="button" onClick={handleResetPassword} className="font-label-md text-xs text-primary hover:underline underline-offset-2">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <input className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-4 pr-12 font-body-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" id="password" name="password" placeholder="••••••••" required type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                    <button onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors" type="button">
                      <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {!otpSent ? (
                  <div className="flex flex-col gap-2">
                    <label className="font-label-bold text-sm text-gray-700" htmlFor="phone_number">Phone Number</label>
                    <input className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-body-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" id="phone_number" name="phone_number" placeholder="+1234567890" required type="tel" value={formData.phone_number} onChange={handleChange} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label className="font-label-bold text-sm text-gray-700" htmlFor="otpCode">OTP Code</label>
                    <input className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 font-body-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm" id="otpCode" name="otpCode" placeholder="123456" required type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                  </div>
                )}
              </>
            )}

            <div ref={recaptchaContainerRef}></div>

            {/* Submit Button */}
            <button className="mt-2 w-full h-[52px] bg-primary text-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 font-label-bold tracking-wide flex items-center justify-center transition-all duration-200" type="submit">
              {loginMethod === 'phone' ? (otpSent ? 'Verify OTP' : 'Send OTP') : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="font-label-md text-xs text-gray-400 uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3">
            <button className="w-full h-12 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm font-label-bold flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md transition-all duration-200" type="button">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="w-full h-12 bg-white text-gray-700 border border-gray-200 rounded-xl shadow-sm font-label-bold flex items-center justify-center gap-3 hover:bg-gray-50 hover:shadow-md transition-all duration-200" type="button">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.48 3.604-2.923 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.858-.026-3.04 2.48-4.494 2.597-4.56-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.688.792-1.364 2.234-1.182 3.598 1.35.104 2.623-.571 3.468-1.585z"></path>
              </svg>
              Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center font-body-md text-sm text-gray-500">
            Don't have an account? 
            <Link to="/register" className="font-label-bold text-primary hover:underline underline-offset-2 ml-1">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
