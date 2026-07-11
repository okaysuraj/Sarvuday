import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent! Please check your inbox.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-cream-bg text-on-surface min-h-screen flex items-center justify-center p-margin-desktop font-body-md relative z-0">
        <style>{`
            .custom-bg {
                background-image: radial-gradient(var(--color-surface-dim) 2px, transparent 2px);
                background-size: 32px 32px;
                background-position: 0 0, 16px 16px;
            }
        `}</style>
      <div className="absolute inset-0 z-[-1] custom-bg opacity-30"></div>
      
      <main className="w-full max-w-lg relative z-10">
        <div className="bg-surface border-[1.5px] border-ink-black rounded-[32px] p-container-padding flex flex-col items-center text-center shadow-[4px_4px_0px_0px_#1a1a1a]">
          <div className="w-16 h-16 rounded-full bg-accent-pink border-[1.5px] border-ink-black flex items-center justify-center mb-stack-md shadow-[2px_2px_0px_0px_#1a1a1a]">
            <span className="material-symbols-outlined text-[32px] text-ink-black" style={{ fontVariationSettings: "'FILL' 1" }}>refresh</span>
          </div>
          
          <h1 className="font-headline-md text-headline-md text-ink-black mb-base">Forgot Password?</h1>
          
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-[85%]">
            No worries, it happens to the best of us. Enter your email address below and we'll send you a link to reset it securely.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-stack-md">
            <div className="w-full text-left">
              <label className="font-label-bold text-label-bold text-ink-black block mb-base uppercase" htmlFor="email">Email Address</label>
              <input 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-body-md text-body-md text-ink-black placeholder-outline-variant focus:outline-none focus:border-primary focus:ring-0 focus:shadow-[2px_2px_0px_0px_#1a1a1a] transition-all duration-200" 
                id="email" 
                name="email" 
                placeholder="you@example.com" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 uppercase tracking-widest mt-base" type="submit">
              Send Link
            </button>
          </form>
          
          <div className="mt-stack-lg border-t-[1.5px] border-ink-black w-full pt-stack-md">
            <Link to="/login" className="inline-flex items-center gap-2 font-label-bold text-label-bold text-ink-black hover:text-primary transition-colors duration-200 group">
              <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform duration-200">arrow_back</span>
              BACK TO LOGIN
            </Link>
          </div>
        </div>

        {/* Decorative Memphis Element (Behind Card) */}
        <div className="absolute -z-10 w-24 h-24 rounded-full bg-secondary-container border-[1.5px] border-ink-black top-[-20px] right-[-30px]"></div>
        <div className="absolute -z-10 w-16 h-16 rotate-12 bg-accent-orange border-[1.5px] border-ink-black bottom-[-10px] left-[-20px]"></div>
      </main>
    </div>
  );
};

export default ForgotPassword;
