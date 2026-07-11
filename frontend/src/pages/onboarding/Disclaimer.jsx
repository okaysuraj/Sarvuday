import React from 'react';
import { useNavigate } from 'react-router-dom';

const Disclaimer = () => {
  const navigate = useNavigate();

  const handleUnderstand = (e) => {
    e.preventDefault();
    navigate('/onboarding/emergency-contact');
  };

  const handleCrisisResources = (e) => {
    e.preventDefault();
    // In a real app, this might open a modal or navigate to a crisis resources page
    alert('Crisis resources would be displayed here.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-margin-desktop font-body-lg text-on-surface" style={{
      backgroundColor: '#fbf8ff',
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(217, 217, 230, 0.4) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(255, 218, 214, 0.4) 0%, transparent 40%)
      `,
      backgroundAttachment: 'fixed'
    }}>
      <style>{`
        .btn-primary {
            transition: all 0.2s ease;
            box-shadow: 4px 4px 0px 0px rgba(26,26,26,1);
        }
        .btn-primary:hover, .btn-primary:active {
            box-shadow: 0px 0px 0px 0px rgba(26,26,26,1);
            transform: translate(2px, 2px);
        }
        
        .btn-secondary {
            transition: all 0.2s ease;
            box-shadow: 4px 4px 0px 0px rgba(26,26,26,1);
        }
        .btn-secondary:hover, .btn-secondary:active {
            box-shadow: 0px 0px 0px 0px rgba(26,26,26,1);
            transform: translate(2px, 2px);
        }

        .card-shadow {
            box-shadow: 8px 8px 0px 0px rgba(26,26,26,1);
        }
      `}</style>

      <main className="w-full max-w-4xl relative z-10">
        {/* Decorative Memphis Elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent-pink rounded-full border-[1.5px] border-ink-black z-0 opacity-80 mix-blend-multiply hidden md:block"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-sage rounded-[24px] border-[1.5px] border-ink-black z-0 rotate-12 opacity-80 mix-blend-multiply hidden md:block"></div>
        
        {/* Main Card */}
        <div className="bg-surface-container-lowest rounded-[32px] border-[1.5px] border-ink-black p-12 md:p-16 card-shadow relative z-10 flex flex-col items-center text-center">
          
          {/* Icon */}
          <div className="w-20 h-20 bg-accent-orange rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
            <span className="material-symbols-outlined text-error text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              priority_high
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Important Disclaimer</h1>
          
          {/* Warning Box */}
          <div className="w-full bg-error-container border-[1.5px] border-error rounded-xl p-6 mb-8 shadow-[4px_4px_0px_0px_rgba(186,26,26,0.2)]">
            <p className="font-body-lg text-on-error-container font-bold">
              SarvUday is an AI-powered supportive tool, NOT a replacement for professional mental health care or medical advice.
            </p>
          </div>

          {/* Explanation Text */}
          <div className="max-w-2xl space-y-4 mb-12 text-on-surface-variant font-body-lg">
            <p>
              The insights, mood tracking, and conversations provided by this platform are designed to promote general well-being and self-awareness. 
            </p>
            <p>
              If you are experiencing a mental health crisis, severe distress, or having thoughts of self-harm, please seek immediate professional assistance or contact emergency services in your area.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg justify-center items-center">
            <button onClick={handleUnderstand} className="w-full md:w-auto px-8 py-4 bg-primary text-on-primary font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black btn-primary flex items-center justify-center gap-2">
              I Understand
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </button>
            <button onClick={handleCrisisResources} className="w-full md:w-auto px-8 py-4 bg-secondary-container text-on-secondary-container font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black btn-secondary flex items-center justify-center gap-2">
              View Crisis Resources
              <span className="material-symbols-outlined text-[20px]">local_hospital</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Disclaimer;
