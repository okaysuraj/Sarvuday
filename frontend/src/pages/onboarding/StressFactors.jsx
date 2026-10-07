import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StressFactors = () => {
  const navigate = useNavigate();
  const [selectedFactors, setSelectedFactors] = useState([]);

  const factors = [
    { id: 'work', label: 'Work', icon: 'work' },
    { id: 'family', label: 'Family', icon: 'family_restroom' },
    { id: 'health', label: 'Health', icon: 'monitor_heart' },
    { id: 'finances', label: 'Finances', icon: 'payments' },
    { id: 'school', label: 'School', icon: 'school' },
    { id: 'social', label: 'Social', icon: 'diversity_3' },
    { id: 'housing', label: 'Housing', icon: 'home' },
    { id: 'other', label: 'Other', icon: 'more_horiz' }
  ];

  const toggleFactor = (id) => {
    if (selectedFactors.includes(id)) {
      setSelectedFactors(selectedFactors.filter(f => f !== id));
    } else {
      setSelectedFactors([...selectedFactors, id]);
    }
  };

  const handleNext = () => {
    const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    localStorage.setItem('onboardingData', JSON.stringify({
      ...existingData,
      stress_factors: selectedFactors.join(',')
    }));
    navigate('/onboarding/history');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface">
      

      {/* TopAppBar */}
      <header className="bg-background w-full top-0 sticky border-b border-outline flex justify-between items-center px-margin-desktop py-4 z-50">
        <button onClick={handlePrevious} className="flex items-center gap-stack-sm cursor-pointer hover:opacity-80 transition-opacity active:translate-x-[2px] active:translate-y-[2px]">
          <span className="material-symbols-outlined text-primary text-2xl">arrow_back</span>
        </button>
        <div className="font-headline-md text-headline-md text-primary font-bold">
          SarvUday
        </div>
        <div className="w-6 h-6"></div> {/* Spacer for center alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-margin-desktop py-stack-lg max-w-[1200px] mx-auto w-full">
        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-stack-lg">
          <div className="flex justify-between items-center mb-stack-sm font-label-bold text-label-bold">
            <span>Step 6 of 8</span>
            <span>Triggers</span>
          </div>
          <div className="h-3 w-full bg-surface-container neo-border rounded-full overflow-hidden">
            <div className="h-full bg-surface border-r-[1.5px] border-outline" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-stack-lg max-w-2xl">
          <h1 className="font-display-lg text-display-lg mb-stack-sm">What's on your mind?</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Select the areas of life that are currently causing you the most stress or anxiety. You can choose more than one.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter w-full max-w-4xl mb-stack-lg">
          {factors.map(factor => (
            <button 
              key={factor.id}
              onClick={() => toggleFactor(factor.id)}
              className={`trigger-card bg-surface-container-lowest neo-border rounded-xl p-container-padding flex flex-col items-center justify-center gap-stack-sm aspect-square transition-all duration-200  hover:shadow-subtle ${selectedFactors.includes(factor.id) ? 'selected' : ''}`}
            >
              <span className="material-symbols-outlined text-[48px] text-primary">{factor.icon}</span>
              <span className="font-headline-sm text-headline-sm">{factor.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-4xl mt-auto pt-stack-md">
          <button onClick={handlePrevious} className="bg-surface-container-lowest text-ink-black neo-border px-8 py-3 rounded-lg font-label-bold text-label-bold shadow-subtle transition-all duration-100 flex items-center gap-2">
            <span className="material-symbols-outlined">arrow_back</span>
            Previous
          </button>
          <button onClick={handleNext} className="bg-primary text-on-primary neo-border px-8 py-3 rounded-lg font-label-bold text-label-bold shadow-subtle transition-all duration-100 flex items-center gap-2">
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default StressFactors;
