import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgeDemographics = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderSelect = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      dob: formData.dob,
      gender: formData.gender,
      location: formData.location
    }));
    navigate('/onboarding/symptoms');
  };

  const handleSkip = () => {
    navigate('/onboarding/symptoms');
  };

  return (
    <div className="bg-cream-bg min-h-screen flex flex-col font-body-md text-on-surface overflow-x-hidden">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease-in-out;
        }
        .neo-shadow:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(4px, 4px);
        }
        .neo-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
        }
        .neo-input {
            border: 1.5px solid #1A1A1A;
            border-radius: 12px;
            background-color: #f9f8f3;
        }
        .neo-input:focus {
            border-color: #002da5;
            box-shadow: 2px 2px 0px 0px #1A1A1A;
            outline: none;
        }
        .neo-btn-primary {
            border: 1.5px solid #1A1A1A;
            background-color: #002da5;
            color: #ffffff;
            border-radius: 9999px;
        }
        .neo-chip {
            border: 1.5px solid #1A1A1A;
            border-radius: 9999px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .neo-chip.selected {
            background-color: #002da5;
            color: white;
            box-shadow: 2px 2px 0px 0px #1A1A1A;
        }
        .neo-progress-bar {
            border: 1.5px solid #1A1A1A;
            border-radius: 9999px;
            height: 12px;
            overflow: hidden;
            background-color: #ffffff;
        }
        .neo-progress-fill {
            background-color: #ffe082; /* secondary-fixed */
            height: 100%;
            border-right: 1.5px solid #1A1A1A;
        }
      `}</style>

      {/* TopAppBar */}
      <header className="w-full top-0 sticky bg-cream-bg border-b-[1.5px] border-ink-black z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} aria-label="Go back" className="flex items-center justify-center p-2 rounded-full hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined text-primary text-2xl">arrow_back</span>
          </button>
          <div className="font-headline-md text-headline-md text-primary font-bold">
            SarvUday
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center py-12 px-margin-desktop w-full max-w-7xl mx-auto relative">
        {/* Decorative Memphis Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-accent-pink rounded-full border-[1.5px] border-ink-black -z-10 opacity-60 mix-blend-multiply pointer-events-none hidden md:block"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-secondary-fixed rotate-12 border-[1.5px] border-ink-black -z-10 opacity-60 mix-blend-multiply pointer-events-none hidden md:block"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent-sage rounded-xl rotate-45 border-[1.5px] border-ink-black -z-10 opacity-60 mix-blend-multiply pointer-events-none hidden md:block"></div>

        {/* Central Form Container */}
        <div className="w-full max-w-2xl bg-surface-container-lowest neo-card neo-shadow p-10 md:p-12 relative">
          
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Step 2 of 8</span>
              <span className="font-label-md text-label-md text-outline">Demographics</span>
            </div>
            <div className="neo-progress-bar w-full">
              <div className="neo-progress-fill w-[25%]"></div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="font-display-lg text-display-lg text-ink-black mb-3">Tell us a bit about you</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">This helps us personalize your SarvUday experience and connect you with the right resources.</p>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="dob">Date of Birth</label>
              <div className="relative">
                <input className="w-full p-4 neo-input font-body-lg text-body-lg text-ink-black focus:ring-0" id="dob" name="dob" value={formData.dob} onChange={handleChange} placeholder="MM/DD/YYYY" type="date" required />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none hidden md:block">calendar_month</span>
              </div>
            </div>

            {/* Gender Identity */}
            <div className="space-y-3 pt-4">
              <label className="block font-label-bold text-label-bold text-ink-black flex justify-between">
                Gender Identity
                <span className="font-label-md text-label-md text-outline font-normal">Optional</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((g) => (
                  <button 
                    key={g}
                    type="button" 
                    onClick={() => handleGenderSelect(g)}
                    className={`neo-chip px-6 py-3 font-label-md text-label-md ${formData.gender === g ? 'selected' : 'bg-surface-bright text-ink-black hover:bg-surface-variant'}`}
                  >
                    {g}
                  </button>
                ))}
                <button type="button" onClick={() => handleGenderSelect('Other')} className={`neo-chip px-6 py-3 font-label-md text-label-md flex items-center gap-2 ${formData.gender === 'Other' ? 'selected' : 'bg-surface-bright text-ink-black hover:bg-surface-variant'}`}>
                  <span className="material-symbols-outlined text-sm">add</span> Other
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2 pt-4">
              <label className="block font-label-bold text-label-bold text-ink-black" htmlFor="location">Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                <input className="w-full py-4 pl-12 pr-4 neo-input font-body-lg text-body-lg text-ink-black focus:ring-0" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="City, State or Zip Code" type="text" />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col md:flex-row-reverse gap-4 justify-between items-center border-t-[1.5px] border-ink-black/10 mt-8">
              <button className="w-full md:w-auto neo-btn-primary px-10 py-4 font-label-bold text-label-bold neo-shadow flex items-center justify-center gap-2 group" type="submit">
                Continue
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
              <button onClick={handleSkip} className="w-full md:w-auto px-6 py-4 font-label-md text-label-md text-on-surface-variant hover:text-ink-black transition-colors underline-offset-4 hover:underline" type="button">
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AgeDemographics;
