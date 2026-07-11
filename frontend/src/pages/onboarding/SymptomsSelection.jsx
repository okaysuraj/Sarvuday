import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SymptomsSelection = () => {
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const symptoms = [
    { id: 'low_energy', label: 'Low Energy', icon: 'battery_0_bar', bgClass: 'bg-accent-sage' },
    { id: 'sleep_issues', label: 'Sleep Issues', icon: 'bedtime', bgClass: 'bg-accent-orange' },
    { id: 'frequent_crying', label: 'Frequent Crying', icon: 'water_drop', bgClass: 'bg-secondary-container' },
    { id: 'racing_heart', label: 'Racing Heart', icon: 'favorite', bgClass: 'bg-tertiary-fixed' },
    { id: 'brain_fog', label: 'Brain Fog', icon: 'foggy', bgClass: 'bg-accent-sage' },
    { id: 'appetite_loss', label: 'Appetite Loss', icon: 'restaurant_menu', bgClass: 'bg-accent-orange' },
    { id: 'isolating', label: 'Isolating', icon: 'group_off', bgClass: 'bg-secondary-container' },
    { id: 'anxious_thoughts', label: 'Anxious Thoughts', icon: 'psychology_alt', bgClass: 'bg-tertiary-fixed' }
  ];

  const toggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const handleContinue = () => {
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      symptoms: selectedSymptoms.join(',')
    }));
    navigate('/onboarding/stress-factors');
  };

  const handleSkip = () => {
    navigate('/onboarding/stress-factors');
  };

  return (
    <div className="bg-cream-bg text-ink-black min-h-screen flex flex-col font-body-md">
      <style>{`
        .neo-btn:active {
            box-shadow: none !important;
            transform: translate(4px, 4px);
        }
        .neo-card {
            transition: all 0.2s ease-in-out;
        }
        .neo-card.selected {
            background-color: #ffd9df;
            border-color: #002da5;
            box-shadow: 4px 4px 0px 0px rgba(0, 45, 165, 1);
        }
        .neo-card:active {
            box-shadow: none !important;
            transform: translate(4px, 4px);
        }
        .shadow-solid {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-cream-bg text-primary font-headline-sm md:text-headline-sm w-full top-0 sticky border-b-[1.5px] border-ink-black flex justify-between items-center px-margin-desktop py-4 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Go back" className="hover:opacity-80 transition-opacity active:translate-x-[2px] active:translate-y-[2px]">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-md text-primary font-bold">SarvUday</span>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="h-[12px] w-[200px] bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden flex">
            <div className="h-full bg-accent-sage border-r-[1.5px] border-ink-black w-[50%]"></div>
          </div>
          <span className="font-label-bold text-ink-black self-center">Step 4 of 8</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col px-margin-desktop py-stack-lg max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-stack-lg max-w-3xl">
          <h1 className="font-display-lg text-ink-black mb-stack-sm">What are you feeling right now?</h1>
          <p className="font-body-lg text-on-surface-variant">Select all the symptoms you are currently experiencing. This helps us tailor your support journey. It's okay if you're not sure, just pick what feels closest.</p>
        </div>

        {/* Symptoms Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter mb-stack-lg">
          {symptoms.map(symptom => (
            <button 
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`neo-card bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-container-padding flex flex-col items-center justify-center gap-stack-sm text-center shadow-solid aspect-square group ${selectedSymptoms.includes(symptom.id) ? 'selected' : ''}`}
            >
              <div className={`w-16 h-16 rounded-full ${symptom.bgClass} flex items-center justify-center border-[1px] border-ink-black group-hover:-translate-y-1 transition-transform`}>
                <span className="material-symbols-outlined text-[32px]">{symptom.icon}</span>
              </div>
              <span className="font-headline-sm text-ink-black">{symptom.label}</span>
            </button>
          ))}
        </div>

        {/* Action Area */}
        <div className="mt-auto flex justify-between items-center pt-stack-md border-t-[1.5px] border-ink-black">
          <button onClick={handleSkip} className="font-label-bold text-on-surface-variant hover:text-ink-black transition-colors underline decoration-2 underline-offset-4">Skip for now</button>
          <button onClick={handleContinue} className="neo-btn bg-primary text-on-primary border-[1.5px] border-ink-black rounded-lg px-8 py-3 font-label-bold shadow-solid transition-all">Continue</button>
        </div>
      </main>
    </div>
  );
};

export default SymptomsSelection;
