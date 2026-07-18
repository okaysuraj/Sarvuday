import React from 'react';

const EmergencyHelp = () => {
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26,26,26,1); }
        .neo-shadow-hover:hover { box-shadow: 0px 0px 0px 0px rgba(26,26,26,1); transform: translate(2px, 2px); transition: all 0.2s ease-in-out; }
        .neo-border { border: 1.5px solid #1A1A1A; }
      `}</style>

      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display-lg text-4xl md:text-display-lg text-primary mb-2">Emergency Help</h1>
        <p className="font-body-lg text-on-surface-variant">Immediate assistance and resources for crisis situations.</p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* SOS Centric Action (Span 12 on mobile, 8 on desktop) */}
        <div className="md:col-span-8 bg-error-container rounded-[32px] p-6 md:p-8 neo-border flex flex-col items-center justify-center text-center relative overflow-hidden h-[400px]">
          <div className="absolute inset-0 opacity-50" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNiYTFhMWEiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')">}}></div>
          <h2 className="font-headline-md text-3xl md:text-headline-md text-on-error-container mb-2 relative z-10">Need Immediate Help?</h2>
          <p className="font-body-md text-on-error-container mb-8 relative z-10 max-w-md">Pressing this button will alert your primary safe contacts and share your current location.</p>
          <button className="w-48 h-48 rounded-full bg-error text-on-error flex flex-col items-center justify-center neo-border shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all relative z-10 group">
            <span className="material-symbols-outlined text-[64px] mb-2 group-active:scale-95 transition-transform" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
            <span className="font-display-lg text-2xl tracking-widest group-active:scale-95 transition-transform">SOS</span>
          </button>
        </div>

        {/* National Services (Span 12 on mobile, 4 on desktop) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* 911 Card */}
          <div className="bg-surface-container rounded-[24px] p-6 neo-border flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-error" style={{fontVariationSettings: "'FILL' 1"}}>local_police</span>
                <h3 className="font-headline-sm text-xl text-ink-black">Local Emergency</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-6">For immediate life-threatening medical or safety emergencies.</p>
            </div>
            <a href="tel:911" className="w-full bg-error text-on-error py-4 rounded-xl font-label-bold text-center neo-border neo-shadow neo-shadow-hover block">
              CALL 911
            </a>
          </div>

          {/* Crisis Text Line Card */}
          <div className="bg-secondary-container rounded-[24px] p-6 neo-border flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: "'FILL' 1"}}>sms</span>
                <h3 className="font-headline-sm text-xl text-ink-black">Crisis Text Line</h3>
              </div>
              <p className="font-body-md text-on-secondary-container mb-6">Text HOME to connect with a volunteer Crisis Counselor 24/7.</p>
            </div>
            <a href="sms:741741" className="w-full bg-surface text-ink-black py-4 rounded-xl font-label-bold text-center neo-border neo-shadow neo-shadow-hover block">
              TEXT 741741
            </a>
          </div>
        </div>

        {/* Primary Safe Contacts (Span 12 on mobile, 5 on desktop) */}
        <div className="md:col-span-5 bg-accent-sage rounded-[32px] p-6 md:p-8 neo-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline-sm text-2xl text-ink-black">Primary Safe Contacts</h3>
            <button className="w-10 h-10 rounded-full bg-surface neo-border flex items-center justify-center neo-shadow neo-shadow-hover">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            {/* Contact 1 */}
            <li className="bg-surface rounded-xl p-4 neo-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-xl neo-border">
                  M
                </div>
                <div>
                  <p className="font-label-bold text-ink-black">Mom</p>
                  <p className="font-body-md text-on-surface-variant text-sm">Family</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href="sms:5551234" className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors neo-border">
                  <span className="material-symbols-outlined text-sm">chat</span>
                </a>
                <a href="tel:5551234" className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors neo-border">
                  <span className="material-symbols-outlined text-sm">call</span>
                </a>
              </div>
            </li>
            {/* Contact 2 */}
            <li className="bg-surface rounded-xl p-4 neo-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-sm text-xl neo-border">
                  D
                </div>
                <div>
                  <p className="font-label-bold text-ink-black">Dr. Smith</p>
                  <p className="font-body-md text-on-surface-variant text-sm">Therapist</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href="tel:5559876" className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors neo-border">
                  <span className="material-symbols-outlined text-sm">call</span>
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Nearest Help Centers Map (Span 12 on mobile, 7 on desktop) */}
        <div className="md:col-span-7 bg-surface rounded-[32px] p-6 md:p-8 neo-border flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>location_on</span>
            <h3 className="font-headline-sm text-2xl text-ink-black">Nearest Help Centers</h3>
          </div>
          <div className="flex-1 rounded-[24px] neo-border overflow-hidden relative min-h-[250px] bg-surface-variant">
            {/* Map Placeholder Area - replace with actual map component later */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-50">map</span>
            </div>
            
            {/* Overlay Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-surface rounded-full neo-border neo-shadow flex items-center justify-center hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
              <button className="w-10 h-10 bg-surface rounded-full neo-border neo-shadow flex items-center justify-center hover:bg-surface-variant transition-colors">
                <span className="material-symbols-outlined">remove</span>
              </button>
              <button className="w-10 h-10 bg-primary text-on-primary rounded-full neo-border neo-shadow flex items-center justify-center hover:bg-primary-fixed-variant transition-colors mt-2">
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyHelp;
