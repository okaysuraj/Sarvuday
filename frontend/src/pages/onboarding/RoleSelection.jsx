import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    // In a real flow, you might save this to state or context, then move to next step
    navigate('/onboarding/basic-profile', { state: { role } });
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26,26,26,1); }
        .neo-shadow-hover:hover { box-shadow: 0px 0px 0px 0px rgba(26,26,26,1); transform: translate(4px, 4px); transition: all 0.2s ease-in-out; }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-surface dark:bg-surface-container-low docked full-width top-0 border-b-[1.5px] border-ink-black flex justify-between items-center w-full px-margin-desktop py-4 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-2xl cursor-pointer hover:bg-surface-variant/20 rounded-full p-2 transition-all">
            arrow_back
          </button>
        </div>
        <h1 className="font-headline-sm text-headline-sm font-bold text-primary dark:text-primary-fixed-dim">SarvUday</h1>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-2xl cursor-pointer hover:bg-surface-variant/20 rounded-full p-2 transition-all">account_circle</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-margin-desktop">
        <div className="text-center mb-stack-lg max-w-2xl">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-stack-sm">How would you like to use SarvUday?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Select your role to personalize your experience and access the right tools for your journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-6xl w-full">
          {/* Patient Card */}
          <button onClick={() => handleRoleSelect('patient')} className="bg-surface-container-highest border-[1.5px] border-ink-black rounded-xl p-container-padding text-left neo-shadow neo-shadow-hover flex flex-col gap-stack-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all">
            <div className="w-16 h-16 rounded-full bg-accent-pink border-[1.5px] border-ink-black flex items-center justify-center neo-shadow">
              <span className="material-symbols-outlined text-on-surface text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychiatry</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-base group-hover:text-primary transition-colors">Patient</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">I am looking for mental health support, tools to track my mood, and professional guidance.</p>
            </div>
            <div className="mt-auto pt-stack-sm flex items-center text-primary font-label-bold text-label-bold">
              <span>Get Started</span>
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
          </button>

          {/* Therapist Card */}
          <button onClick={() => handleRoleSelect('therapist')} className="bg-surface-container-highest border-[1.5px] border-ink-black rounded-xl p-container-padding text-left neo-shadow neo-shadow-hover flex flex-col gap-stack-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all">
            <div className="w-16 h-16 rounded-full bg-secondary-container border-[1.5px] border-ink-black flex items-center justify-center neo-shadow">
              <span className="material-symbols-outlined text-on-secondary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-base group-hover:text-secondary transition-colors">Therapist</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">I want to manage my client appointments, track progress, and provide therapeutic support.</p>
            </div>
            <div className="mt-auto pt-stack-sm flex items-center text-secondary font-label-bold text-label-bold">
              <span>Join Network</span>
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
          </button>

          {/* Psychiatrist Card */}
          <button onClick={() => handleRoleSelect('psychiatrist')} className="bg-surface-container-highest border-[1.5px] border-ink-black rounded-xl p-container-padding text-left neo-shadow neo-shadow-hover flex flex-col gap-stack-md group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all">
            <div className="w-16 h-16 rounded-full bg-accent-sage border-[1.5px] border-ink-black flex items-center justify-center neo-shadow">
              <span className="material-symbols-outlined text-on-surface text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_hospital</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-base group-hover:text-primary transition-colors">Psychiatrist</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">I need tools to manage prescriptions, conduct clinical assessments, and oversee patient care plans.</p>
            </div>
            <div className="mt-auto pt-stack-sm flex items-center text-primary font-label-bold text-label-bold">
              <span>Access Portal</span>
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default RoleSelection;
