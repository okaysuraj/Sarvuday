import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TriggerStressFactors = () => {
  const navigate = useNavigate();
  const [selectedTriggers, setSelectedTriggers] = useState([]);

  const triggers = [
    { id: 'work', icon: 'work', label: 'Work' },
    { id: 'family', icon: 'family_restroom', label: 'Family' },
    { id: 'health', icon: 'monitor_heart', label: 'Health' },
    { id: 'finances', icon: 'payments', label: 'Finances' },
    { id: 'school', icon: 'school', label: 'School' },
    { id: 'social', icon: 'diversity_3', label: 'Social' },
    { id: 'housing', icon: 'home', label: 'Housing' },
    { id: 'other', icon: 'more_horiz', label: 'Other' }
  ];

  const toggleTrigger = (id) => {
    setSelectedTriggers(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-cream-bg min-h-screen flex flex-col font-body-md text-on-surface">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .neo-border {
            border: 1.5px solid #1A1A1A;
        }
        
        .trigger-card.selected {
            background-color: #ffe082; /* secondary-fixed */
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transform: translate(-2px, -2px);
        }
        .trigger-card.selected .material-symbols-outlined {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-cream-bg w-full top-0 sticky border-b-[1.5px] border-ink-black flex justify-between items-center px-6 md:px-10 py-4 z-50">
        <div 
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity active:translate-x-[2px] active:translate-y-[2px]"
        >
          <span className="material-symbols-outlined text-primary text-2xl">arrow_back</span>
        </div>
        <div className="font-headline-md text-2xl md:text-headline-md text-primary font-bold">
          SarvUday
        </div>
        <div className="w-6 h-6"></div> {/* Spacer for center alignment */}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-6 md:px-10 py-12 max-w-[1200px] mx-auto w-full">
        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-12">
          <div className="flex justify-between items-center mb-3 font-label-bold text-label-bold">
            <span>Step 6 of 8</span>
            <span>Triggers</span>
          </div>
          <div className="h-3 w-full bg-surface-container neo-border rounded-full overflow-hidden">
            <div className="h-full bg-accent-orange border-r-[1.5px] border-ink-black transition-all duration-500" style={{width: '75%'}}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="font-display-lg text-4xl md:text-display-lg mb-3">What's on your mind?</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Select the areas of life that are currently causing you the most stress or anxiety. You can choose more than one.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mb-12">
          {triggers.map((trigger) => (
            <button 
              key={trigger.id}
              onClick={() => toggleTrigger(trigger.id)}
              className={`trigger-card bg-surface-container-lowest neo-border rounded-[24px] p-6 md:p-8 flex flex-col items-center justify-center gap-3 aspect-square transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1A1A1A] ${selectedTriggers.includes(trigger.id) ? 'selected' : ''}`}
            >
              <span className="material-symbols-outlined text-[40px] md:text-[48px] text-primary">{trigger.icon}</span>
              <span className="font-headline-sm text-lg md:text-xl">{trigger.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-4xl mt-auto pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="bg-surface-container-lowest text-ink-black neo-border px-6 md:px-8 py-3 rounded-lg font-label-bold text-label-bold neo-shadow transition-all duration-100 flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Previous
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-on-primary neo-border px-6 md:px-8 py-3 rounded-lg font-label-bold text-label-bold neo-shadow transition-all duration-100 flex items-center gap-2"
          >
            Next
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default TriggerStressFactors;
