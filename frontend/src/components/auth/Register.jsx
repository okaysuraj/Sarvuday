import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, sendEmailVerification } from 'firebase/auth';
import sarvudayLogo from '../../assets/sarvuday_logo.png';

const Register = () => {
  const navigate = useNavigate();

  const [registerMethod, setRegisterMethod] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    user_type: 'normal_user',
    name: '',
    email: '',
    phone_number: '',
    password: '',
    gender: 'other',
    terms_accepted: false,
    privacy_policy_accepted: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const recaptchaVerifierRef = useRef(null);
  const recaptchaContainerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

  const handleBackendRegister = async (idToken) => {
    try {
      const response = await axiosInstance.post(`/auth/firebase-register`, {
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
      if(!formData.password || formData.password.length < 8) {
          toast.error("Password must be at least 8 characters long.");
          return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        await sendEmailVerification(userCredential.user);
        toast.info("A verification link has been sent to your email.");

        const idToken = await userCredential.user.getIdToken();
        await handleBackendRegister(idToken);

        await auth.signOut();
      } catch (error) {
        toast.error(error.message);
      }
    } else if (registerMethod === 'phone' && otpSent) {
      try {
        const result = await confirmationResult.confirm(otpCode);
        const idToken = await result.user.getIdToken();
        await handleBackendRegister(idToken);
      } catch {
        toast.error('Invalid OTP.');
      }
    } else if (registerMethod === 'phone' && !otpSent) {
      await sendPhoneOtp();
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 md:p-10 font-body-md text-[#121214] selection:bg-[#18181B] selection:text-white">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-2xl overflow-hidden border-[#EAEAEA] shadow-sm bg-white my-8">
        {/* Left Side: Clinical Mission & Peace */}
        <div className="hidden lg:flex lg:w-5/12 bg-[#F5F4F0] border-r border-[#EAEAEA] flex-col justify-between p-10">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#EAEAEA] p-1 flex items-center justify-center shadow-xs overflow-hidden group-hover:scale-105 transition-all">
                <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#244B36] text-xs font-medium border border-[#EAEAEA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346538]"></span>
                SarvUday Sanctuary
              </div>
            </Link>
            
            <h2 className="text-2xl font-semibold text-[#121214] tracking-tight">
              Begin your path to calm &amp; psychological clarity.
            </h2>
            
            <ul className="space-y-3 text-xs text-[#6E6D7A] leading-relaxed">
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded text-emerald-600 text-base">check_circle</span>
                <span>Licensed, vetted clinical therapists</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded text-emerald-600 text-base">check_circle</span>
                <span>24/7 compassionate AI companion</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-rounded text-emerald-600 text-base">check_circle</span>
                <span>HIPAA-aligned encrypted tele-health</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-white border-[#EAEAEA] shadow-sm mt-8">
            <p className="text-xs italic text-[#121214] leading-relaxed">
              &ldquo;Healing begins the moment you have a safe, quiet space to be heard without judgment.&rdquo;
            </p>
            <span className="block text-[11px] text-[#71717A] mt-2 font-medium">
              SarvUday Clinical Guidance
            </span>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-6 text-center lg:text-left">
              <Link to="/" className="lg:hidden inline-flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#EAEAEA] p-0.5 flex items-center justify-center shadow-xs overflow-hidden">
                  <img src={sarvudayLogo} alt="SarvUday" className="w-full h-full object-contain" />
                </div>
                <span className="font-semibold text-lg text-[#121214]">SarvUday</span>
              </Link>
              <h1 className="text-2xl font-semibold text-[#121214] tracking-tight mb-1">Create Account</h1>
              <p className="text-xs sm:text-sm text-[#71717A]">Join SarvUday to access confidential care.</p>
            </div>

            {/* Registration Method Toggle */}
            <div className="flex gap-2 mb-6 bg-[#F5F4F0] p-1 rounded-lg">
              <button 
                type="button"
                onClick={() => setRegisterMethod('email')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${registerMethod === 'email' ? 'bg-white text-[#121214] shadow-sm' : 'text-[#71717A] hover:text-[#121214]'}`}
              >
                Email
              </button>
              <button 
                type="button"
                onClick={() => { setRegisterMethod('phone'); setOtpSent(false); }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${registerMethod === 'phone' ? 'bg-white text-[#121214] shadow-sm' : 'text-[#71717A] hover:text-[#121214]'}`}
              >
                Phone Number
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#121214]" htmlFor="name">Full Name</label>
                <input className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" type="text" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#121214]" htmlFor="gender">Gender</label>
                  <select className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3 text-sm text-[#121214] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05]" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#121214]" htmlFor="user_type">Role</label>
                  <select className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3 text-sm text-[#121214] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05]" id="user_type" name="user_type" value={formData.user_type} onChange={handleChange} required>
                    <option value="normal_user">User / Patient</option>
                    <option value="counsellor">Licensed Counsellor</option>
                  </select>
                </div>
              </div>

              {registerMethod === 'email' ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#121214]" htmlFor="email">Email Address</label>
                    <input className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" type="email" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#121214]" htmlFor="password">Password</label>
                    <div className="relative">
                      <input className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg pl-3.5 pr-10 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" type={showPassword ? "text" : "password"} required />
                      <button aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#121214] transition-colors" type="button">
                        <span className="material-symbols-rounded text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-[#71717A]">At least 8 characters</p>
                  </div>
                </>
              ) : (
                <>
                  {!otpSent ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#121214]" htmlFor="phone_number">Phone Number</label>
                      <input className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+91 9876543210" type="tel" required />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#121214]" htmlFor="otpCode">Verification Code</label>
                      <input className="w-full h-11 bg-white border-[#EAEAEA] rounded-lg px-3.5 text-sm text-[#121214] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#18181B] focus:ring-2 focus:ring-black/[0.05] transition-all font-mono tracking-widest text-center" id="otpCode" name="otpCode" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="123456" type="text" required />
                    </div>
                  )}
                </>
              )}

              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-[#EAEAEA] text-[#18181B] focus:ring-[#18181B]" name="terms_accepted" checked={formData.terms_accepted} onChange={(e) => { const checked = e.target.checked; handleChange(e); setFormData(p => ({...p, privacy_policy_accepted: checked})); }} required />
                  <span className="text-xs text-[#71717A] leading-relaxed">
                    I agree to the <Link to="/terms" className="text-[#121214] underline font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-[#121214] underline font-medium">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <div ref={recaptchaContainerRef}></div>

              <div className="pt-2">
                <button className="w-full h-11 bg-[#18181B] text-white rounded-lg text-sm font-medium hover:bg-[#27272A] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2" type="submit">
                  <span>{registerMethod === 'phone' ? (otpSent ? 'Verify & Register' : 'Send Verification Code') : 'Create Free Account'}</span>
                  <span className="material-symbols-rounded text-base">arrow_forward</span>
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-xs text-[#71717A]">
              Already have an account? 
              <Link to="/login" className="font-semibold text-[#121214] hover:underline ml-1">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
