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
      {/* Main Content Container (Bento Layout) */}
      <div className="w-full max-w-[1120px] bg-surface-container-lowest border-outline rounded-xl shadow-subtle flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Column: Context & Graphic */}
        <section className="w-full md:w-[40%] bg-accent-sage p-container-padding border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-outline flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-stack-lg">
              <div className="w-10 h-10 bg-primary rounded-xl border-outline flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-ink-black font-bold">SarvUday</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-primary mb-stack-md leading-tight">Your Trust,<br/>Our Sanctuary.</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg leading-relaxed">
              We uphold clinical confidentiality and radical transparency. Before beginning your healing journey, know that your health insights remain strictly protected.
            </p>
          </div>
          
          {/* Clinical Privacy Badge Graphic */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-stone-300 shadow-subtle bg-white p-6 mt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <span className="material-symbols-outlined text-sm">lock</span>
              </div>
              <div>
                <p className="font-bold text-xs text-stone-900">End-to-End Encrypted</p>
                <p className="text-[11px] text-stone-500">256-bit AES Clinical Privacy</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-stone-600">
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span> No third-party data broker sharing
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span> Verified and licensed practitioners
              </p>
              <p className="flex items-center gap-1.5">
                <span className="text-emerald-700">✓</span> On-demand data erasure at any time
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Agreement Content */}
        <section className="w-full md:w-[60%] p-container-padding flex flex-col bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-ink-black mb-stack-md">Consent &amp; Privacy Agreement</h2>
          
          {/* Scrollable Terms Area */}
          <div className="flex-grow flex flex-col mb-stack-md">
            <div className="relative w-full h-[380px] bg-[#f9f8f3] border-outline rounded-xl overflow-hidden focus-within:border-primary focus-within:shadow-subtle transition-all">
              <div className="h-full w-full overflow-y-auto p-6 memphis-scrollbar relative z-0">
                <div className="prose prose-sm max-w-none text-on-surface font-body-md text-body-md space-y-4 pr-2">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2">1. Introduction</h3>
                  <p>Welcome to SarvUday. By accessing or using our mental health platform, you agree to be bound by these Terms of Service and our Privacy Policy. Please read them carefully.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">2. Data Collection &amp; Privacy</h3>
                  <p>Your privacy is paramount. We collect personal and sensitive health information solely for the purpose of providing tailored therapeutic support. We employ state-of-the-art encryption to ensure your data remains secure.</p>
                  <p>We do <strong>not</strong> sell your personal information to third parties. Anonymized, aggregated data may be used strictly for improving our clinical algorithms.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">3. User Responsibilities</h3>
                  <p>You agree to provide accurate information and maintain the confidentiality of your account credentials. The platform is not a substitute for emergency psychiatric services. In case of an acute crisis, please contact emergency helplines immediately.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">4. Consent to Treatment</h3>
                  <p>By using the assessment tools and interacting with our digital companions or licensed therapists, you provide informed consent to receive supportive mental health care through this digital modality.</p>
                  
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2 mt-6">5. Termination</h3>
                  <p>You may delete your account and request complete data erasure at any time via your account settings.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Checkboxes */}
          <div className="flex flex-col gap-4 mb-stack-lg">
            <label className="flex items-start gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
              />
              <div className="font-body-md text-body-md text-on-surface">
                I have read and agree to the <span className="text-primary font-bold underline decoration-2 underline-offset-4">Terms of Service</span>.
              </div>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
              />
              <div className="font-body-md text-body-md text-on-surface">
                I acknowledge and consent to the <span className="text-primary font-bold underline decoration-2 underline-offset-4">Privacy Policy</span> and clinical data handling practices.
              </div>
            </label>
          </div>

          {/* Action Area */}
          <div className="flex justify-end border-t-[1.5px] border-surface-variant pt-6 mt-auto">
            <button 
              onClick={handleNext}
              disabled={!isFormValid}
              className={`bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded-xl border-outline shadow-subtle flex items-center gap-2 group ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              Accept &amp; Continue
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ConsentAgreement;
