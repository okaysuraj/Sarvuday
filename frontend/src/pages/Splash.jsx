import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(false);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setScale(true);
      setTimeout(() => setScale(false), 200);
    }, 3000);

    const redirectTimer = setTimeout(() => {
      navigate('/welcome');
    }, 4000);

    return () => {
      clearInterval(pulseInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="bg-primary min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="absolute top-10 left-20 w-32 h-32 animate-[bounce_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" fill="none" r="40" stroke="#ffffff" strokeDasharray="10 5" strokeWidth="2"></circle>
        </svg>
        <svg className="absolute bottom-20 right-32 w-48 h-48 animate-[bounce_6s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }} viewBox="0 0 100 100">
          <rect fill="none" height="60" stroke="#ffffff" strokeWidth="3" transform="rotate(15 50 50)" width="60" x="20" y="20"></rect>
        </svg>
        <svg className="absolute top-1/4 right-1/4 w-24 h-24 animate-[bounce_6s_ease-in-out_infinite]" style={{ animationDelay: '3s' }} viewBox="0 0 100 100">
          <polygon fill="none" points="50,10 90,90 10,90" stroke="#ffffff" strokeWidth="2"></polygon>
        </svg>
      </div>

      {/* Main Splash Canvas */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-margin-desktop py-stack-lg">
        {/* Sticker Graphic Centerpiece */}
        <div className={`relative group cursor-pointer transition-transform duration-200 ${scale ? 'scale-[1.02]' : ''}`}>
          {/* Background Accent Sticker */}
          <div className="absolute inset-0 bg-secondary-container rounded-full transform translate-x-4 translate-y-4 border-[1.5px] border-ink-black transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          {/* Main Content Sticker */}
          <div className="relative bg-surface rounded-full w-[400px] h-[400px] flex flex-col items-center justify-center border-[2px] border-ink-black shadow-[8px_8px_0px_0px_#1A1A1A] transition-all duration-300 group-hover:shadow-[4px_4px_0px_0px_#1A1A1A] group-hover:translate-x-[4px] group-hover:translate-y-[4px]">
            {/* Logo Icon */}
            <div className="mb-stack-md relative">
              <div className="absolute -inset-4 bg-accent-pink rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="w-32 h-32 bg-primary-container rounded-3xl flex items-center justify-center border-[1.5px] border-ink-black transform rotate-12 transition-transform duration-500 group-hover:rotate-0">
                <span className="material-symbols-outlined text-7xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  psychology_alt
                </span>
              </div>
            </div>
            
            {/* Brand Name */}
            <h1 className="font-display-lg text-display-lg text-ink-black text-center mb-base">
              SarvUday
            </h1>
            
            {/* Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-[280px]">
              Clarity. Balance. Growth.
            </p>
            
            {/* Subtle Loading Indicator */}
            <div className="absolute bottom-12 flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Optional Footer Attribution */}
      <footer className="absolute bottom-margin-desktop w-full text-center z-10 opacity-60">
        <p className="font-label-md text-label-md text-on-primary font-medium tracking-wide">
          Empowering Mental Wellness
        </p>
      </footer>
    </div>
  );
};

export default Splash;
