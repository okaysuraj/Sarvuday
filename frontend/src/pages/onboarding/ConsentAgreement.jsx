import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsentAgreement = () => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const isFormValid = termsAccepted && privacyAccepted;

  const handleNext = () => {
    if (isFormValid) {
      navigate('/onboarding/disclaimer');
    }
  };

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center p-margin-desktop relative overflow-hidden font-body-md text-on-surface">
      <style>{`
        .memphis-scrollbar::-webkit-scrollbar {
            width: 12px;
        }
        .memphis-scrollbar::-webkit-scrollbar-track {
            background: #f5f2f9; 
            border-left: 1.5px solid #1A1A1A;
            border-radius: 0 0.75rem 0.75rem 0;
        }
        .memphis-scrollbar::-webkit-scrollbar-thumb {
            background-color: #fdd33f; /* secondary-container */
            border: 1.5px solid #1A1A1A;
            border-radius: 6px;
        }
      `}</style>

      {/* Decorative Background Stickers (Neo-Memphis) */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-accent-pink border-[1.5px] border-ink-black -z-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-container border-[1.5px] border-ink-black rotate-12 -z-10 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"></div>
      <div className="absolute top-1/4 right-32 text-ink-black opacity-20 -z-10">
        <svg fill="none" height="60" viewBox="0 0 100 100" width="60" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50 Q 25 10 50 50 T 90 50" fill="none" stroke="currentColor" strokeWidth="6"></path>
        </svg>
      </div>

      {/* Main Content Container (Bento Layout) */}
      <main className="w-full max-w-[1120px] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Column: Context & Illustration */}
        <section className="w-full md:w-[40%] bg-accent-sage p-container-padding border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-ink-black flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-stack-lg">
              <div className="w-10 h-10 bg-primary rounded-xl border-[1.5px] border-ink-black flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-ink-black">SarvUday</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-stack-md leading-tight">Your Trust,<br/>Our Priority.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
              We believe in radical transparency. Before we begin your journey, we want you to feel completely secure about how your data is handled.
            </p>
          </div>
          
          {/* Contextual Illustration Placeholder */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] bg-surface-bright mt-auto">
            <div className="w-full h-full bg-accent-orange/20 flex items-center justify-center p-8 text-center text-on-surface-variant font-label-md">
              (Illustration: Calming, Abstracted Room)
            </div>
          </div>
        </section>

        {/* Right Column: Agreement Content */}
        <section className="w-full md:w-[60%] p-container-padding flex flex-col bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-ink-black mb-stack-md">Consent &amp; Privacy Agreement</h2>
          
          {/* Scrollable Terms Area */}
          <div className="flex-grow flex flex-col mb-stack-md">
            <div className="relative w-full h-[380px] bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl overflow-hidden focus-within:border-primary focus-within:shadow-[4px_4px_0px_0px_rgba(0,45,165,1)] transition-all">
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#f9f8f3] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#f9f8f3] to-transparent z-10 pointer-events-none"></div>
              
              <div className="h-full w-full overflow-y-auto p-6 memphis-scrollbar relative z-0">
                <div className="prose prose-sm max-w-none text-on-surface font-body-md text-body-md space-y-4 pr-2">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2">1. Introduction</h3>
                  <p>Welcome to SarvUday. By accessing or using our mental health platform, you agree to be bound by these Terms of Service and our Privacy Policy. Please read them carefully.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">2. Data Collection &amp; Privacy</h3>
                  <p>Your privacy is paramount. We collect personal and sensitive health information solely for the purpose of providing tailored therapeutic support. We employ state-of-the-art encryption to ensure your data remains secure.</p>
                  <p>We do <strong>not</strong> sell your personal information to third parties. Anonymized, aggregated data may be used strictly for improving our clinical algorithms.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">3. User Responsibilities</h3>
                  <p>You agree to provide accurate information and maintain the confidentiality of your account credentials. The platform is not a substitute for emergency psychiatric services. In case of a crisis, please contact local emergency services immediately.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">4. Consent to Treatment</h3>
                  <p>By using the assessment tools and interacting with our digital or human therapists, you provide informed consent to receive supportive mental health care through this digital modality.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">5. Termination</h3>
                  <p>You may delete your account and request data erasure at any time via your account settings. We reserve the right to terminate access for violation of these terms.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Checkboxes */}
          <div className="flex flex-col gap-4 mb-stack-lg">
            {/* Checkbox 1 */}
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative w-6 h-6 mt-0.5 flex-shrink-0">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                />
                <div className="w-6 h-6 border-[1.5px] border-ink-black rounded bg-surface-container-lowest peer-checked:bg-secondary-container transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] peer-active:shadow-none peer-active:translate-y-[2px] peer-active:translate-x-[2px]"></div>
                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-ink-black text-sm pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1", fontWeight: 700 }}>check</span>
              </div>
              <div className="font-body-md text-body-md text-on-surface">
                I have read and agree to the <a className="text-primary font-bold underline decoration-2 underline-offset-4 hover:text-primary-container transition-colors" href="#">Terms of Service</a>.
              </div>
            </label>

            {/* Checkbox 2 */}
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative w-6 h-6 mt-0.5 flex-shrink-0">
                <input 
                  type="checkbox" 
                  className="peer sr-only" 
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                />
                <div className="w-6 h-6 border-[1.5px] border-ink-black rounded bg-surface-container-lowest peer-checked:bg-secondary-container transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] group-hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] peer-active:shadow-none peer-active:translate-y-[2px] peer-active:translate-x-[2px]"></div>
                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100 text-ink-black text-sm pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1", fontWeight: 700 }}>check</span>
              </div>
              <div className="font-body-md text-body-md text-on-surface">
                I acknowledge and consent to the <a className="text-primary font-bold underline decoration-2 underline-offset-4 hover:text-primary-container transition-colors" href="#">Privacy Policy</a> and data handling practices.
              </div>
            </label>
          </div>

          {/* Action Area */}
          <div className="flex justify-end border-t-[1.5px] border-surface-variant pt-6 mt-auto">
            <button 
              onClick={handleNext}
              disabled={!isFormValid}
              className={`bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all flex items-center gap-2 group ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Accept &amp; Continue
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ConsentAgreement;
