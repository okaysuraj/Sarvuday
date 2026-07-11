import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryIntake = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diagnoses: [],
    therapyStatus: '',
    additionalNotes: ''
  });

  const diagnosesOptions = [
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'depression', label: 'Depression' },
    { id: 'ptsd', label: 'PTSD' },
    { id: 'adhd', label: 'ADHD' },
    { id: 'bipolar', label: 'Bipolar Disorder' },
    { id: 'ocd', label: 'OCD' },
    { id: 'none', label: 'None of the above', isNone: true }
  ];

  const toggleDiagnosis = (id, isNone) => {
    setFormData(prev => {
      let newDiagnoses = [...prev.diagnoses];
      if (isNone) {
        newDiagnoses = newDiagnoses.includes('none') ? [] : ['none'];
      } else {
        newDiagnoses = newDiagnoses.filter(d => d !== 'none');
        if (newDiagnoses.includes(id)) {
          newDiagnoses = newDiagnoses.filter(d => d !== id);
        } else {
          newDiagnoses.push(id);
        }
      }
      return { ...prev, diagnoses: newDiagnoses };
    });
  };

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      mental_health_history: JSON.stringify(formData)
    }));
    navigate('/onboarding/consent');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="bg-cream-bg text-on-background min-h-screen flex flex-col font-body-md antialiased selection:bg-accent-pink selection:text-ink-black">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px #1A1A1A; }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px #1A1A1A; }
        .neo-border { border: 1.5px solid #1A1A1A; }
        
        .chip-checkbox-label {
            background-color: #efedf4;
            color: #1b1b20;
        }
        .chip-checkbox-label.selected {
            background-color: #002da5; /* primary */
            color: #ffffff;
            box-shadow: 2px 2px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .chip-checkbox-label:hover:not(.selected) {
            background-color: #e4e1e8;
            transform: translate(-2px, -2px);
            box-shadow: 2px 2px 0px 0px #1A1A1A;
        }

        .radio-btn-label {
            background-color: #ffffff;
            color: #1b1b20;
        }
        .radio-btn-label.selected {
            background-color: #002da5;
            color: white;
            box-shadow: inset 0px 0px 0px 2px #1A1A1A;
        }

        .interactive-btn:active {
            box-shadow: none !important;
            transform: translate(4px, 4px) !important;
        }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-cream-bg text-primary font-headline-sm text-headline-sm w-full top-0 sticky border-b-[1.5px] border-ink-black flex justify-between items-center px-margin-desktop py-4 z-50">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevious} className="hover:opacity-80 transition-opacity active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center p-2 rounded-full hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-md text-headline-md text-primary font-bold">SarvUday</span>
        </div>
        {/* Progress Indicator */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-label-bold text-label-bold text-ink-black">Step 7 of 8</span>
          <div className="w-32 h-3 bg-surface-container-highest neo-border rounded-full overflow-hidden flex">
            <div className="h-full bg-accent-sage neo-border border-l-0 border-t-0 border-b-0 border-r-[1.5px]" style={{ width: '87.5%' }}></div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center py-stack-lg px-margin-desktop">
        <div className="w-full max-w-3xl bg-surface-container-lowest neo-border rounded-[32px] p-container-padding neo-shadow relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-pink rounded-full neo-border opacity-50 pointer-events-none hidden md:block"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary-fixed rounded-full neo-border opacity-50 pointer-events-none hidden md:block"></div>
          
          <div className="relative z-10 flex flex-col gap-stack-md">
            <div className="text-center mb-stack-sm">
              <h1 className="font-display-lg text-display-lg text-ink-black mb-2">Mental Health History</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Help us understand your background so we can better tailor your experience.</p>
            </div>

            <form className="flex flex-col gap-stack-lg" onSubmit={(e) => e.preventDefault()}>
              {/* Question 1: Diagnoses */}
              <section className="flex flex-col gap-stack-sm">
                <label className="font-headline-sm text-headline-sm text-ink-black">Have you ever been diagnosed with any of the following?</label>
                <p className="font-label-md text-label-md text-on-surface-variant -mt-2 mb-2">Select all that apply.</p>
                <div className="flex flex-wrap gap-3">
                  {diagnosesOptions.map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleDiagnosis(option.id, option.isNone)}
                      className={`chip-checkbox-label cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-full neo-border font-label-bold text-label-bold transition-all select-none ${formData.diagnoses.includes(option.id) ? 'selected' : (option.isNone ? 'bg-accent-sage text-ink-black' : '')}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Divider */}
              <hr className="border-t-[1.5px] border-ink-black opacity-20" />

              {/* Question 2: Therapy Status */}
              <section className="flex flex-col gap-stack-sm">
                <label className="font-headline-sm text-headline-sm text-ink-black">Are you currently seeing a therapist or counselor?</label>
                <div className="grid grid-cols-2 gap-gutter mt-2">
                  <div className="relative h-16">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, therapyStatus: 'yes' })}
                      className={`radio-btn-label cursor-pointer absolute inset-0 flex items-center justify-center rounded-xl neo-border font-headline-sm text-headline-sm transition-all hover:bg-surface-container select-none ${formData.therapyStatus === 'yes' ? 'selected' : ''}`}
                    >
                      Yes
                    </button>
                  </div>
                  <div className="relative h-16">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, therapyStatus: 'no' })}
                      className={`radio-btn-label cursor-pointer absolute inset-0 flex items-center justify-center rounded-xl neo-border font-headline-sm text-headline-sm transition-all hover:bg-surface-container select-none ${formData.therapyStatus === 'no' ? 'selected' : ''}`}
                    >
                      No
                    </button>
                  </div>
                </div>
              </section>

              {/* Question 3: Additional Notes */}
              <section className="flex flex-col gap-stack-sm">
                <label className="font-headline-sm text-headline-sm text-ink-black" htmlFor="additional-notes">Anything else you'd like us to know? <span className="text-on-surface-variant font-body-md text-body-md font-normal">(Optional)</span></label>
                <textarea 
                  className="w-full bg-[#f9f8f3] rounded-xl neo-border p-4 font-body-md text-body-md text-ink-black placeholder:text-on-surface-variant focus:outline-none focus:border-primary focus:ring-0 focus:neo-shadow-sm transition-shadow resize-none" 
                  id="additional-notes" 
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Feel free to share any other relevant context..." 
                  rows="3"
                ></textarea>
              </section>
            </form>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-3xl mt-stack-md flex justify-between items-center">
          <button onClick={handlePrevious} className="interactive-btn px-6 py-3 bg-surface-container-highest text-ink-black font-label-bold text-label-bold rounded-full neo-border neo-shadow transition-transform hover:-translate-y-1" type="button">
            Previous
          </button>
          <button onClick={handleNext} className="interactive-btn px-8 py-3 bg-primary text-on-primary font-label-bold text-label-bold rounded-full neo-border neo-shadow transition-transform hover:-translate-y-1 flex items-center gap-2" type="button">
            Continue
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default HistoryIntake;
