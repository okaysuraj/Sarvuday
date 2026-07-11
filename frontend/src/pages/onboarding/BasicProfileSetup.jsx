import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContinue = () => {
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      firstName: formData.firstName,
      lastName: formData.lastName,
      bio: formData.bio
    }));
    navigate('/onboarding/age-demographics');
  };

  const handleSkip = () => {
    navigate('/onboarding/age-demographics');
  };

  return (
    <div className="bg-cream-bg min-h-screen flex flex-col font-body-md text-body-md text-on-surface">
      <style>{`
        /* Neo-Memphis custom utilities */
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        
        .neo-shadow-interactive:hover {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
            transform: translate(0px, 0px);
        }
        
        .neo-shadow-interactive:active {
            box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1);
            transform: translate(4px, 4px);
        }
        
        .neo-input:focus {
            outline: none;
            border-color: #002da5; /* primary */
            box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1);
        }
      `}</style>

      {/* Header */}
      <header className="w-full top-0 sticky bg-cream-bg border-b-[1.5px] border-ink-black flex justify-between items-center px-margin-desktop py-4 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-primary cursor-pointer hover:opacity-80 transition-opacity">arrow_back</button>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">SarvUday</h1>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">Step 1 of 8</span>
          <div className="w-48 h-3 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
            <div className="h-full bg-accent-orange w-1/8 border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }}></div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-accent-pink rounded-full border-[1.5px] border-ink-black -z-10 hidden md:block"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-container border-[1.5px] border-ink-black transform rotate-12 -z-10 hidden md:block"></div>

        {/* Mobile Progress */}
        <div className="md:hidden w-full max-w-lg mb-8 flex flex-col gap-2">
          <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider text-center">Step 1 of 8</span>
          <div className="w-full h-3 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
            <div className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }}></div>
          </div>
        </div>

        {/* Centered Card Layout */}
        <div className="w-full max-w-2xl bg-white border-[1.5px] border-ink-black rounded-[32px] p-container-padding flex flex-col gap-stack-lg relative">
          <div className="text-center">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-ink-black mb-2">Let's build your profile</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Add a photo and some basic info to get started. This helps personalize your experience.</p>
          </div>

          <form className="flex flex-col gap-stack-md" onSubmit={(e) => e.preventDefault()}>
            {/* Avatar Picker */}
            <div className="flex flex-col items-center gap-4 group">
              <div className="relative w-32 h-32 rounded-full border-[1.5px] border-ink-black bg-surface-container flex items-center justify-center overflow-hidden cursor-pointer hover:bg-surface-variant transition-colors group">
                <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>add_a_photo</span>
              </div>
              <button className="font-label-bold text-label-bold text-primary underline hover:opacity-80 transition-opacity" type="button">Upload Photo</button>
            </div>

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="flex flex-col gap-2">
                <label className="font-label-bold text-label-bold text-ink-black" htmlFor="firstName">First Name</label>
                <input className="neo-input w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-body-md text-ink-black placeholder-outline transition-all duration-200" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. Jane" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-bold text-label-bold text-ink-black" htmlFor="lastName">Last Name</label>
                <input className="neo-input w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-body-md text-ink-black placeholder-outline transition-all duration-200" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" type="text" />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-2">
              <label className="font-label-bold text-label-bold text-ink-black" htmlFor="bio">Bio (Optional)</label>
              <textarea className="neo-input w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-body-md text-ink-black placeholder-outline transition-all duration-200 resize-none" id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us a little about yourself..." rows="4"></textarea>
              <span className="font-label-md text-label-md text-on-surface-variant self-end">{formData.bio.length}/150</span>
            </div>
          </form>

          {/* Actions */}
          <div className="mt-4 flex flex-col md:flex-row justify-end items-center gap-4">
            <button onClick={handleSkip} className="w-full md:w-auto font-label-bold text-label-bold text-ink-black py-4 px-8 rounded-full hover:bg-surface-container transition-colors" type="button">Skip for now</button>
            <button onClick={handleContinue} className="w-full md:w-auto bg-primary text-white font-label-bold text-label-bold py-4 px-10 rounded-full border-[1.5px] border-ink-black neo-shadow neo-shadow-interactive transition-all duration-200 flex items-center justify-center gap-2" type="button">
              Continue
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BasicProfileSetup;
