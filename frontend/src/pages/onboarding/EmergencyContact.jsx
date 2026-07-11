import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyContact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    countryCode: '+1',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      emergency_name: formData.name,
      emergency_phone: formData.countryCode + formData.phone,
      emergency_relationship: formData.relationship
    }));
    navigate('/onboarding/preferences');
  };

  const handleSkip = () => {
    navigate('/onboarding/preferences');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="bg-cream-bg min-h-screen font-body-md text-on-surface flex flex-col">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow-active:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(4px, 4px);
        }
        .neo-border {
            border: 1.5px solid #1A1A1A;
        }
        .progress-bar-fill {
            background-image: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(26, 26, 26, 0.1) 10px,
                rgba(26, 26, 26, 0.1) 20px
            );
        }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-cream-bg w-full top-0 sticky border-b-[1.5px] border-ink-black z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-7xl mx-auto">
          <button onClick={handlePrevious} className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-colors neo-shadow-active">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
          </button>
          <div className="font-headline-md text-headline-md text-primary font-bold">
            SarvUday
          </div>
          <div className="w-10"></div> {/* Placeholder for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-margin-desktop">
        <div className="w-full max-w-2xl">
          {/* Progress Indicator */}
          <div className="mb-stack-lg text-center">
            <div className="flex justify-between items-center mb-base">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest">Step 7 of 8</span>
              <span className="font-label-md text-label-md text-on-surface-variant">Almost done!</span>
            </div>
            <div className="w-full h-3 neo-border rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-secondary-container progress-bar-fill" style={{ width: '87.5%' }}></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-surface-container-lowest rounded-3xl neo-border p-container-padding relative">
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent-pink rounded-full neo-border neo-shadow z-[-1] hidden md:block"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-sage rounded-full neo-border z-[-1] hidden md:block" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
            
            <div className="mb-stack-md text-center">
              <h1 className="font-display-lg text-display-lg text-ink-black mb-stack-sm">Emergency Contact</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">We'll only contact them if we can't reach you during a critical situation.</p>
            </div>

            {/* Safety Info Box */}
            <div className="bg-accent-orange bg-opacity-30 rounded-xl neo-border p-stack-sm mb-stack-md flex items-start gap-3">
              <span className="material-symbols-outlined text-tertiary-container mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <div>
                <h3 className="font-label-bold text-label-bold text-ink-black mb-1">Your privacy is paramount</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">We strictly follow HIPAA guidelines. Your emergency contact will never see your private session notes or assessments.</p>
              </div>
            </div>

            <form className="space-y-stack-md" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              {/* Contact Name */}
              <div>
                <label className="block font-label-bold text-label-bold text-ink-black mb-base" htmlFor="contact-name">Contact Full Name</label>
                <input 
                  className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all" 
                  id="contact-name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe" 
                  type="text" 
                  required
                />
              </div>

              {/* Relationship */}
              <div>
                <label className="block font-label-bold text-label-bold text-ink-black mb-base" htmlFor="relationship">Relationship</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-3 pr-10 font-body-md text-on-surface appearance-none focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all" 
                    id="relationship"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">Select relationship</option>
                    <option value="parent">Parent/Guardian</option>
                    <option value="sibling">Sibling</option>
                    <option value="spouse">Spouse/Partner</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink-black">
                    <span className="material-symbols-outlined">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-label-bold text-label-bold text-ink-black mb-base" htmlFor="phone-number">Phone Number</label>
                <div className="flex gap-2">
                  <select 
                    className="w-24 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                  >
                    <option value="+1">US (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+91">IN (+91)</option>
                  </select>
                  <input 
                    className="flex-1 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all" 
                    id="phone-number" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000" 
                    type="tel" 
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-stack-sm pt-stack-sm mt-stack-lg border-t-[1.5px] border-ink-black border-dashed">
                <button onClick={handleSkip} className="flex-1 py-3 px-6 bg-surface-container-highest neo-border rounded-lg font-label-bold text-label-bold text-ink-black neo-shadow hover:bg-surface-dim neo-shadow-active transition-all" type="button">
                  Skip for Now
                </button>
                <button type="submit" className="flex-1 py-3 px-6 bg-primary neo-border rounded-lg font-label-bold text-label-bold text-white neo-shadow hover:bg-primary-fixed-variant neo-shadow-active transition-all flex justify-center items-center gap-2">
                  Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyContact;
