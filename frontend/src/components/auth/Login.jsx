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
    <div className="bg-surface dot-pattern min-h-screen flex items-center justify-center p-8 overflow-hidden relative selection:bg-primary selection:text-on-primary">
      {/* Decorative Neo-Memphis Background Elements */}
      <div className="absolute top-20 left-20 w-48 h-48 bg-accent-sage rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] z-0 hidden lg:block animate-[bounce_4s_infinite_alternate]"></div>
      <div className="absolute bottom-10 right-24 w-32 h-64 bg-accent-pink rounded-t-full rounded-b-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] z-0 hidden lg:block rotate-12"></div>
      <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-secondary-container rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] z-0 hidden xl:block rotate-45"></div>
      
      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-[480px]">
        {/* Top App Bar / Brand Header Context */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="font-display-lg text-display-lg text-primary tracking-tight">SarvUday</h1>
          </Link>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Find your balance today.</p>
        </div>

        {/* Login Card */}
        <div className="bg-on-primary rounded-[32px] border-[1.5px] border-ink-black shadow-[8px_8px_0px_0px_#1A1A1A] p-container-padding relative overflow-visible">
          {/* Decorative corner sticker */}
          <div className="absolute -top-4 -right-4 bg-secondary-container w-12 h-12 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center rotate-12 z-20">
            <span className="material-symbols-outlined text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Welcome Back</h2>

          {/* Login Method Toggle */}
          <div className="flex gap-4 mb-6">
            <button 
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black transition-all ${loginMethod === 'email' ? 'bg-primary-fixed text-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-surface text-on-surface-variant bg-opacity-50 hover:bg-surface-variant'}`}
            >
              Email
            </button>
            <button 
              type="button"
              onClick={() => { setLoginMethod('phone'); setOtpSent(false); }}
              className={`flex-1 py-2 font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black transition-all ${loginMethod === 'phone' ? 'bg-primary-fixed text-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-surface text-on-surface-variant bg-opacity-50 hover:bg-surface-variant'}`}
            >
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            {loginMethod === 'email' ? (
              <>
                {/* Email Field */}
                <div className="flex flex-col gap-base">
                  <label className="font-label-bold text-label-bold text-on-surface" htmlFor="email">Email Address</label>
                  <input className="w-full h-12 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-0 input-focus-shadow transition-all" id="email" name="email" placeholder="hello@example.com" required type="email" value={formData.email} onChange={handleChange} />
                </div>
                {/* Password Field */}
                <div className="flex flex-col gap-base">
                  <div className="flex justify-between items-center">
                    <label className="font-label-bold text-label-bold text-on-surface" htmlFor="password">Password</label>
                    <button type="button" onClick={handleResetPassword} className="font-label-md text-label-md text-primary hover:underline underline-offset-2">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <input className="w-full h-12 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl pl-4 pr-12 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-0 input-focus-shadow transition-all" id="password" name="password" placeholder="••••••••" required type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                    <button onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors" type="button">
                      <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {!otpSent ? (
                  <div className="flex flex-col gap-base">
                    <label className="font-label-bold text-label-bold text-on-surface" htmlFor="phone_number">Phone Number</label>
                    <input className="w-full h-12 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-0 input-focus-shadow transition-all" id="phone_number" name="phone_number" placeholder="+1234567890" required type="tel" value={formData.phone_number} onChange={handleChange} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-base">
                    <label className="font-label-bold text-label-bold text-on-surface" htmlFor="otpCode">OTP Code</label>
                    <input className="w-full h-12 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl px-4 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-0 input-focus-shadow transition-all" id="otpCode" name="otpCode" placeholder="123456" required type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                  </div>
                )}
              </>
            )}

            <div ref={recaptchaContainerRef}></div>

            {/* Submit Button */}
            <button className="mt-4 w-full h-[56px] bg-primary text-on-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] font-label-bold text-label-bold tracking-wide flex items-center justify-center btn-interactive" type="submit">
              {loginMethod === 'phone' ? (otpSent ? 'Verify OTP' : 'Send OTP') : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-grow border-t-[1.5px] border-ink-black"></div>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t-[1.5px] border-ink-black"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-stack-sm">
            <button className="w-full h-12 bg-on-primary text-on-surface border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] font-label-bold text-label-bold flex items-center justify-center gap-3 btn-interactive hover:bg-surface-variant/50" type="button">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="w-full h-12 bg-on-primary text-on-surface border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] font-label-bold text-label-bold flex items-center justify-center gap-3 btn-interactive hover:bg-surface-variant/50" type="button">
              <svg className="w-5 h-5 text-ink-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.48 3.604-2.923 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.858-.026-3.04 2.48-4.494 2.597-4.56-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.688.792-1.364 2.234-1.182 3.598 1.35.104 2.623-.571 3.468-1.585z"></path>
              </svg>
              Apple
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center font-body-md text-body-md text-on-surface">
            Don't have an account? 
            <Link to="/register" className="font-label-bold text-label-bold text-primary hover:underline underline-offset-2 ml-1">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
