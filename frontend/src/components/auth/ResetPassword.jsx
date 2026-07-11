import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { confirmPasswordReset } from 'firebase/auth';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Extract oobCode from URL
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    if (!oobCode) {
      toast.error('Invalid or missing password reset code.');
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, password);
      toast.success('Password successfully reset! You can now log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center relative z-0">
        <style>{`
            .bg-pattern {
                background-image: radial-gradient(#d9d9e6 1px, transparent 1px);
                background-size: 20px 20px;
            }
        `}</style>
      <div className="absolute inset-0 z-[-1] bg-pattern opacity-50"></div>

      <header className="fixed top-0 left-0 w-full p-margin-desktop flex items-center justify-center z-50">
        <div className="font-headline-md text-headline-md text-primary font-bold tracking-tight bg-surface px-4 py-2 border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A]">
          SarvUday
        </div>
      </header>

      <main className="w-full max-w-xl mx-auto px-margin-mobile relative z-10">
        <div className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl p-container-padding pb-stack-lg shadow-[8px_8px_0px_0px_#1A1A1A] flex flex-col gap-stack-lg mt-16">
          <div className="flex flex-col gap-stack-sm items-center text-center">
            <h1 className="font-display-lg text-display-lg text-on-surface">New Password</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Almost there! Create a strong new password for your account to get back in.
            </p>
          </div>

          <form className="flex flex-col gap-stack-md" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-stack-sm">
              <div className="flex flex-col gap-2">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="new-password">New Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                  <input 
                    className="w-full h-14 pl-12 pr-12 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl font-body-md text-on-surface focus:border-primary focus:ring-0 focus:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] transition-all outline-none" 
                    id="new-password" 
                    placeholder="Enter new password" 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="font-label-bold text-label-bold text-on-surface" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock_reset</span>
                  <input 
                    className="w-full h-14 pl-12 pr-12 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl font-body-md text-on-surface focus:border-primary focus:ring-0 focus:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] transition-all outline-none" 
                    id="confirm-password" 
                    placeholder="Confirm new password" 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" type="button">
                    <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full h-14 bg-primary text-on-primary font-headline-sm text-headline-sm border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all mt-6 flex justify-center items-center gap-2" type="submit">
              Reset Password
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
            </button>
            
            <div className="text-center mt-4">
              <Link className="font-body-md text-body-md text-primary font-bold hover:underline underline-offset-4 decoration-2" to="/login">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <div className="fixed bottom-margin-desktop left-margin-desktop w-24 h-24 bg-secondary-container border-[1.5px] border-ink-black rounded-full shadow-[4px_4px_0px_0px_#1A1A1A] opacity-50 -z-10 hidden lg:block"></div>
      <div className="fixed top-[20%] right-[10%] w-16 h-16 bg-accent-pink border-[1.5px] border-ink-black rotate-12 shadow-[4px_4px_0px_0px_#1A1A1A] opacity-50 -z-10 hidden lg:block"></div>
    </div>
  );
};

export default ResetPassword;
