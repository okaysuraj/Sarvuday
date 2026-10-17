import { dashboardPath, saveSession } from '../../utils/session';
import {
  RecaptchaVerifier,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import sarvudayLogo from '../../assets/sarvuday_logo.png';
import { auth } from '../../config/firebase';
import axiosInstance from '../../utils/axiosInstance';

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        },
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
        id_token: idToken,
      });
      if (response.status === 200) {
        toast.success('Login successful!');
        saveSession(response.data);

        navigate(dashboardPath(response.data.user_type));
      }
    } catch (error) {
      console.error('Backend Login error:', error);
      toast.error(error?.response?.data?.detail || 'Login failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loginMethod === 'email') {
      if (!formData.email || !formData.password) {
        toast.error('Please fill email and password.');
        return;
      }
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        );

        if (!userCredential.user.emailVerified) {
          await auth.signOut();
          toast.error('Please verify your email address to log in.');
          return;
        }

        const idToken = await userCredential.user.getIdToken();
        await handleBackendLogin(idToken);
      } catch {
        toast.error('Invalid email or password.');
      }
    } else if (loginMethod === 'phone' && otpSent) {
      try {
        const result = await confirmationResult.confirm(otpCode);
        const idToken = await result.user.getIdToken();
        await handleBackendLogin(idToken);
      } catch {
        toast.error('Invalid OTP.');
      }
    } else if (loginMethod === 'phone' && !otpSent) {
      await sendPhoneOtp();
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 selection:bg-[#18181B] selection:text-white">
      {/* Main Content Container */}
      <div className="w-full max-w-md my-8">
        {/* Login Card */}
        <div className="bg-white rounded-2xl border-[#EAEAEA] shadow-sm p-7 sm:p-9">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#EAEAEA] p-1 flex items-center justify-center shadow-xs overflow-hidden group-hover:scale-105 transition-all">
                <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-[#121214]">SarvUday</span>
            </Link>
            <h1 className="text-2xl font-semibold text-[#121214] tracking-tight">Welcome Back</h1>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1">
              Access your confidential sanctuary
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 bg-[#F5F4F0] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${loginMethod === 'email' ? 'bg-white text-[#121214] shadow-sm' : 'text-[#71717A] hover:text-[#121214]'}`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('phone');
                setOtpSent(false);
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${loginMethod === 'phone' ? 'bg-white text-[#121214] shadow-sm' : 'text-[#71717A] hover:text-[#121214]'}`}
            >
              Phone Number
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {loginMethod === 'email' ? (
              <>
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#121214]" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-[#121214]" htmlFor="password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      className="text-xs text-[#71717A] hover:text-[#121214] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg pl-3.5 pr-10 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#121214] transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-rounded text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {!otpSent ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#121214]" htmlFor="phone_number">
                      Phone Number
                    </label>
                    <input
                      className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all"
                      id="phone_number"
                      name="phone_number"
                      placeholder="+91 9876543210"
                      required
                      type="tel"
                      value={formData.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-[#121214]" htmlFor="otpCode">
                      Verification Code
                    </label>
                    <input
                      className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all font-mono tracking-widest text-center"
                      id="otpCode"
                      name="otpCode"
                      placeholder="123456"
                      required
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            <div ref={recaptchaContainerRef}></div>

            {/* Submit Button */}
            <button
              className="mt-2 w-full h-11 bg-[#18181B] text-white rounded-lg text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm"
              type="submit"
            >
              {loginMethod === 'phone'
                ? otpSent
                  ? 'Verify Code'
                  : 'Send Verification SMS'
                : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow border-t border-[#EAEAEA]"></div>
            <span className="text-[11px] text-[#A1A1AA] uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-[#EAEAEA]"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              className="h-10 bg-white text-[#121214] border-[#EAEAEA] rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#F5F4F0] active:scale-[0.98] transition-all"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              <span>Google</span>
            </button>
            <button
              className="h-10 bg-white text-[#121214] border-[#EAEAEA] rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-[#F5F4F0] active:scale-[0.98] transition-all"
              type="button"
            >
              <svg
                className="w-4 h-4 text-[#121214]"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.48 3.604-2.923 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.858-.026-3.04 2.48-4.494 2.597-4.56-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.688.792-1.364 2.234-1.182 3.598 1.35.104 2.623-.571 3.468-1.585z"></path>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-xs text-[#71717A]">
            Don&apos;t have an account yet?
            <Link to="/register" className="font-semibold text-[#121214] hover:underline ml-1">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
