import React, { useState } from 'react';

const PrivacySettings = () => {
  const [incognito, setIncognito] = useState(true);
  const [shareTherapist, setShareTherapist] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <style>{`
        .sticker-card { border: 1.5px solid #1A1A1A; border-radius: 32px; background: #ffffff; transition: transform 0.2s ease; }
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1); }
        .active-press:active { transform: translate(2px, 2px); box-shadow: none !important; }
        .toggle-checkbox:checked + .toggle-slot { background-color: #002da5; }
        .toggle-checkbox:checked + .toggle-slot .toggle-dot { transform: translateX(24px); }
      `}</style>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Control Module: Your Data Your Control */}
        <section className="col-span-1 md:col-span-12 lg:col-span-8 sticker-card p-6 md:p-8 neo-shadow bg-accent-sage relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <h3 className="font-headline-md text-2xl text-ink-black">Your Data, Your Control</h3>
            </div>
            <p className="text-body-md text-on-surface mb-6 max-w-lg">
              We encrypt all session notes and mood records. You can download a full archive of your data or manage how third-party services interact with your profile.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary px-6 py-3 border-[1.5px] border-ink-black rounded-xl neo-shadow-sm font-label-bold active-press flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">download</span>
                Export My Data
              </button>
              <button className="bg-surface text-ink-black px-6 py-3 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container-high transition-colors font-label-bold active-press flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">history</span>
                Privacy Audit Log
              </button>
            </div>
          </div>
          {/* Decorative Element */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary opacity-5 rounded-full border-[1.5px] border-ink-black hidden md:block"></div>
        </section>

        {/* Toggle Modules */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 flex flex-col gap-8">
          
          {/* Incognito Mode */}
          <div className="sticker-card p-6 neo-shadow bg-secondary-container">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-ink-black text-white rounded-lg">
                <span className="material-symbols-outlined">visibility_off</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only toggle-checkbox" 
                  checked={incognito}
                  onChange={() => setIncognito(!incognito)}
                />
                <div className="toggle-slot w-12 h-6 bg-outline-variant rounded-full border-[1.5px] border-ink-black transition-colors">
                  <div className="toggle-dot absolute left-[3px] top-[3px] bg-white w-4 h-4 rounded-full border-[1.5px] border-ink-black transition-transform"></div>
                </div>
              </label>
            </div>
            <h4 className="font-headline-sm text-lg text-ink-black mb-1">Incognito Mode</h4>
            <p className="text-label-md text-on-secondary-container">Hide your online status and active sessions from other users in groups.</p>
          </div>

          {/* Share with Therapist */}
          <div className="sticker-card p-6 neo-shadow bg-accent-pink">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-ink-black text-white rounded-lg">
                <span className="material-symbols-outlined">share_reviews</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only toggle-checkbox" 
                  checked={shareTherapist}
                  onChange={() => setShareTherapist(!shareTherapist)}
                />
                <div className="toggle-slot w-12 h-6 bg-outline-variant rounded-full border-[1.5px] border-ink-black transition-colors">
                  <div className="toggle-dot absolute left-[3px] top-[3px] bg-white w-4 h-4 rounded-full border-[1.5px] border-ink-black transition-transform"></div>
                </div>
              </label>
            </div>
            <h4 className="font-headline-sm text-lg text-ink-black mb-1">Share with Therapist</h4>
            <p className="text-label-md text-on-tertiary-container">Automatically share your mood tracker trends with your assigned therapist.</p>
          </div>

        </div>

        {/* Security Preferences */}
        <section className="col-span-1 md:col-span-12 lg:col-span-7 sticker-card p-6 md:p-8 neo-shadow">
          <h3 className="font-headline-md text-2xl text-ink-black mb-6">Security Preferences</h3>
          <div className="space-y-6">
            
            {/* Password Change */}
            <div className="flex items-center justify-between p-4 border-[1.5px] border-ink-black rounded-2xl bg-surface-container-low hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl border-[1.5px] border-ink-black">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <p className="font-label-bold text-on-surface">Change Password</p>
                  <p className="text-label-md text-on-surface-variant">Last changed 3 months ago</p>
                </div>
              </div>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active-press">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            {/* Logged Devices */}
            <div>
              <p className="font-label-bold text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Logged Devices</p>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-[1.5px] border-ink-black rounded-2xl bg-white gap-3">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary">laptop_mac</span>
                    <div>
                      <p className="font-label-bold text-on-surface">MacBook Pro 14"</p>
                      <p className="text-label-md text-on-surface-variant">London, UK • Current Session</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full text-xs font-bold w-max self-start sm:self-auto">This Device</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-[1.5px] border-ink-black rounded-2xl bg-white gap-3">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">smartphone</span>
                    <div>
                      <p className="font-label-bold text-on-surface">iPhone 15 Pro</p>
                      <p className="text-label-md text-on-surface-variant">Manchester, UK • 2 days ago</p>
                    </div>
                  </div>
                  <button className="text-error font-label-bold text-label-md hover:underline active-press w-max self-start sm:self-auto">Log out</button>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default PrivacySettings;
