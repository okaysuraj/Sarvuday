import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const handleUnderstand = (e) => {
    e.preventDefault();
    navigate('/onboarding/emergency-contact');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-desktop font-body-lg text-on-surface bg-[#FAF9F6]">
      <div className="w-full max-w-3xl relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-14 shadow-subtle flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-rose-50 rounded-full border border-rose-200 flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-rose-600 text-3xl">
              health_and_safety
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display-lg text-3xl md:text-4xl text-on-surface font-bold mb-4">Clinical Safety Notice</h1>
          
          {/* Warning Box */}
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-xs md:text-sm text-amber-900 font-semibold leading-relaxed">
              SarvUday is a supportive tele-counselling &amp; mental well-being platform, NOT a replacement for emergency psychiatric interventions or acute crisis stabilization.
            </p>
          </div>

          {/* Explanation Text */}
          <div className="max-w-xl space-y-3 mb-10 text-on-surface-variant text-sm leading-relaxed">
            <p>
              The personalized reflections, mood analytics, and companion dialogues are created to foster emotional insight and self-care.
            </p>
            <p>
              If you or someone you know is experiencing acute emotional crisis, severe panic, or thoughts of self-harm, please reach out directly to emergency responders or 24/7 crisis helplines.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
            <button
              onClick={handleUnderstand}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <span>I Understand &amp; Agree</span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </button>
            <button
              onClick={() => setShowCrisisModal(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 text-stone-800 border border-stone-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-stone-200 transition-all"
            >
              <span className="material-symbols-outlined text-base text-rose-600">call</span>
              <span>Crisis Helplines</span>
            </button>
          </div>
        </div>
      </div>

      {/* Crisis Helplines Modal */}
      {showCrisisModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-stone-300 shadow-dialog">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink-black">24/7 Emergency Helplines</h3>
                <p className="text-xs text-on-surface-variant">Confidential, toll-free, immediate human support.</p>
              </div>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-stone-900 text-sm">Tele-MANAS (Govt of India)</p>
                  <p className="text-stone-500">National Tele Mental Health Programme</p>
                </div>
                <a href="tel:14416" className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs">
                  Call 14416
                </a>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-stone-900 text-sm">Vandrevala Foundation</p>
                  <p className="text-stone-500">24/7 Multilingual Crisis Helpline</p>
                </div>
                <a href="tel:+919999666555" className="px-3 py-1.5 bg-primary text-white font-bold rounded-lg text-xs">
                  +91 9999 666 555
                </a>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-stone-900 text-sm">International Crisis Lifeline</p>
                  <p className="text-stone-500">USA &amp; Global Routing</p>
                </div>
                <a href="tel:988" className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg text-xs">
                  Call 988
                </a>
              </div>
            </div>

            <button
              onClick={() => setShowCrisisModal(false)}
              className="w-full mt-2 py-2.5 rounded-xl border border-stone-300 font-bold text-xs hover:bg-stone-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disclaimer;
