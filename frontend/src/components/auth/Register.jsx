import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../../config/apiConfig';
import { toast } from 'react-toastify';
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
      } catch (error) {
        toast.error('Invalid OTP.');
      }
    } else if (registerMethod === 'phone' && !otpSent) {
      await sendPhoneOtp();
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-margin-desktop font-body-md text-on-surface">
      <main className="w-full max-w-5xl flex flex-col lg:flex-row rounded-3xl overflow-hidden border border-gray-100 shadow-2xl bg-white lg:min-h-[800px]">
        {/* Left Side: Graphic/Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-50 relative overflow-hidden flex-col justify-center p-12">
          <div className="z-10 mb-8 text-center">
            <h2 className="font-display-lg text-4xl text-gray-900 mb-4 tracking-tight">Your Journey Begins</h2>
            <p className="font-body-lg text-body-lg text-gray-600 max-w-md mx-auto">A safe, supportive space for your wellbeing and personal growth.</p>
          </div>
          <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCCID2y-MG7YOupw0yueH1MvHLbbOk8aIrjdBzSZ3jIfH1A4RxFOK3iEP-DlE_wBZ03C0-qFaeEiUMZdIV4DfWMLCBCWQokD4fj0n5T9CjgvIm6MDQ82lT2MJghQOlmCYEx6T9HCTvVAcNX4ThUALg7mSjlgwL5AO9Vcp8QkD09HvrP_kpRr1LnZP1j5gPrxhSTfvkNfIDdJJvnA0KKXiM9OjBlhcNx0gWHAM0BifQW3nYhSVNT94D7PA')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="z-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-gray-100 mt-auto mx-auto w-full max-w-sm shadow-lg transform -translate-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              ))}
            </div>
            <p className="font-body-md text-body-md font-medium text-center text-gray-800">"A breath of fresh air for my daily routine."</p>
          </div>
        </div>

        {/* Right Side: Sign Up Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-surface overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            <div className="mb-8 lg:mb-10 text-center lg:text-left">
              <h2 className="font-headline-md text-headline-md text-ink-black mb-3">Create Account</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Join our community and start prioritizing your mental health today.</p>
            </div>

            {/* Registration Method Toggle */}
            <div className="flex gap-4 mb-6 bg-gray-50 p-1 rounded-xl">
              <button 
                type="button"
                onClick={() => setRegisterMethod('email')}
                className={`flex-1 py-2 font-label-bold text-label-bold rounded-lg transition-all duration-200 ${registerMethod === 'email' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Email
              </button>
              <button 
                type="button"
                onClick={() => { setRegisterMethod('phone'); setOtpSent(false); }}
                className={`flex-1 py-2 font-label-bold text-label-bold rounded-lg transition-all duration-200 ${registerMethod === 'phone' ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="name">Full Name</label>
                <input className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black placeholder:text-outline-variant" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" type="text" required />
              </div>

              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="gender">Gender</label>
                  <select className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black" id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="user_type">Role</label>
                  <select className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black" id="user_type" name="user_type" value={formData.user_type} onChange={handleChange} required>
                    <option value="normal_user">User</option>
                    <option value="counsellor">Counsellor</option>
                  </select>
                </div>
              </div>

              {registerMethod === 'email' ? (
                <>
                  <div className="space-y-2">
                    <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="email">Email Address</label>
                    <input className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black placeholder:text-outline-variant" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@example.com" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="password">Password</label>
                    <div className="relative">
                      <input className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black placeholder:text-outline-variant pr-12" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" type={showPassword ? "text" : "password"} required />
                      <button aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-ink-black transition-colors" type="button">
                        <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                      </button>
                    </div>
                    <p className="font-label-md text-label-md text-outline-variant mt-1">Must be at least 8 characters long.</p>
                  </div>
                </>
              ) : (
                <>
                  {!otpSent ? (
                    <div className="space-y-2">
                      <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="phone_number">Phone Number</label>
                      <input className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black placeholder:text-outline-variant" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="+1234567890" type="tel" required />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="otpCode">OTP Code</label>
                      <input className="w-full px-4 py-3 neo-memphis-input font-body-md text-body-md text-ink-black placeholder:text-outline-variant" id="otpCode" name="otpCode" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="123456" type="text" required />
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <input type="checkbox" className="peer sr-only" name="terms_accepted" checked={formData.terms_accepted} onChange={(e) => { const checked = e.target.checked; handleChange(e); setFormData(p => ({...p, privacy_policy_accepted: checked})); }} required />
                    <div className="w-5 h-5 border border-gray-300 rounded bg-white peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] text-white opacity-0 peer-checked:opacity-100 font-bold">check</span>
                    </div>
                  </div>
                  <span className="font-body-md text-[14px] text-on-surface-variant group-hover:text-ink-black transition-colors">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <div ref={recaptchaContainerRef}></div>

              <div className="pt-2">
                <button className="w-full py-4 neo-memphis-btn-primary font-label-bold text-label-bold flex items-center justify-center gap-2" type="submit">
                  {registerMethod === 'phone' ? (otpSent ? 'Verify & Register' : 'Send OTP') : 'Create Account'}
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Already have an account? 
                <Link to="/login" className="font-label-bold text-label-bold text-primary hover:text-primary-container underline decoration-2 underline-offset-4 decoration-primary-fixed-dim transition-colors ml-1">Log In</Link>
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="h-[1.5px] w-12 bg-surface-variant"></div>
              <span className="font-label-md text-label-md text-outline-variant px-2">or sign up with</span>
              <div className="h-[1.5px] w-12 bg-surface-variant"></div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
              <button type="button" className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWhBMLEOgNC_L1Nty9cd7UergeHKe6THVpi3XOlbOjVyGpvV5y6SDqxMvki0nLnaQtbhtOiXWRT-dhFIsCOm19PG_HpfTVh5nM1kdJqL16SE--DMKz-t2V1BxsjJ86GkZ3aBhUVW4RlzwyG2ct442DV5a-dnXR5-vnvtww1nTeWJRzRRCU1h3hVlKFDHLkIanqNhiOk6UIpwbX-MoLplT3zH9URhOn7YYHfETeCo2QSKNkvia7d0afgA"/>
              </button>
              <button type="button" className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all">
                <img alt="Apple" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeBMpRq9n3C43cZmxJTIyvAkUuGi4NZhsQO8gDlsXsXEPqpHg4iTORl96TiKJYUYfJYFW-t8r-O6T8VBOFXwwg5v87NZ_GcJLMe8FtW1cXk_oPNppnv3nnD7YFzyPRKHsKvTibBu0MMldd9AZdH0_dbnQG_xZm6h0SzrGGx2A4_kkHr56oqxSYtBIq8QnOos91dKmdzG-DAR6_1ggg3jX2RGlz5h-_2YSTMCOa7qLdFoeGqox06ZsIyg"/>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
