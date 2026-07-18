import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const MoodCheckIn = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);

  const handleClose = () => {
    navigate(-1);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    try {
      const payload = {
        moodIndex: selectedMood,
        energy_level: 5, // default
        anxiety_level: 5, // default
        sleep_quality: "Good", // default
        notes: "Morning check-in"
      };
      await axiosInstance.post('/user/tracking/mood', payload);
      toast.success('Mood logged successfully!');
      navigate('/mood-tracker');
    } catch (error) {
      console.error(error);
      toast.error('Failed to log mood. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const moods = [
    { id: 'low', label: 'Low', icon: 'sentiment_very_dissatisfied', hoverBg: 'group-hover:bg-accent-pink', selectedBg: 'bg-accent-pink' },
    { id: 'down', label: 'Down', icon: 'sentiment_dissatisfied', hoverBg: 'group-hover:bg-accent-orange', selectedBg: 'bg-accent-orange' },
    { id: 'neutral', label: 'Neutral', icon: 'sentiment_neutral', hoverBg: 'group-hover:bg-surface-dim', selectedBg: 'bg-surface-dim' },
    { id: 'good', label: 'Good', icon: 'sentiment_satisfied', hoverBg: 'group-hover:bg-accent-sage', selectedBg: 'bg-accent-sage' },
    { id: 'great', label: 'Great', icon: 'sentiment_very_satisfied', hoverBg: 'group-hover:bg-secondary-fixed', selectedBg: 'bg-secondary-fixed' }
  ];

  return (
    <div className="min-h-screen bg-cream-bg font-body-md text-on-surface overflow-x-hidden relative flex flex-col p-margin-mobile md:p-margin-desktop z-50">
      <style>{`
        .dot-pattern {
            background-image: radial-gradient(#c4c5d8 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .mood-selected .mood-icon-container {
            border-color: #002da5;
            box-shadow: none;
            transform: translate(4px, 4px);
        }
        .mood-selected .mood-label {
            color: #002da5;
        }
      `}</style>
      
      {/* Pattern Background */}
      <div className="absolute inset-0 dot-pattern -z-20"></div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-20 w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] -z-10 animate-pulse hidden lg:block"></div>
      <div className="fixed bottom-32 right-24 w-24 h-8 bg-accent-sage rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rotate-12 -z-10 hidden lg:block"></div>
      <div className="fixed top-1/3 right-12 w-12 h-12 bg-secondary-container border-[1.5px] border-ink-black transform rotate-45 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] -z-10 hidden lg:block"></div>

      {/* Header */}
      <header className="w-full max-w-[1000px] mx-auto flex items-center justify-between gap-stack-md mb-stack-lg z-10 relative">
        <button onClick={handleClose} aria-label="Close check-in" className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all group">
          <span className="material-symbols-outlined text-ink-black group-hover:text-error transition-colors">close</span>
        </button>
        
        <div className="flex-grow max-w-lg flex flex-col gap-2 hidden md:flex">
          <div className="flex justify-between items-center">
            <span className="font-label-bold text-label-bold text-ink-black uppercase tracking-wider">Morning Check-in</span>
            <span className="font-label-bold text-label-bold text-outline">Step 1 of 4</span>
          </div>
          <div className="h-3 w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full overflow-hidden shadow-[inset_1px_1px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="h-full bg-secondary-container border-r-[1.5px] border-ink-black w-1/4 transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <button onClick={handleClose} className="px-4 py-2 font-label-bold text-label-bold text-ink-black hover:text-primary transition-colors underline underline-offset-4 decoration-[1.5px]">
          Skip
        </button>
      </header>

      {/* Content */}
      <div className="flex-grow flex items-center justify-center w-full z-10">
        <section className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] md:rounded-[48px] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] p-6 md:p-stack-lg w-full max-w-[1000px] flex flex-col items-center text-center">
          
          <div className="max-w-2xl mb-stack-lg">
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-ink-black mb-stack-sm">How are you feeling right now?</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Take a moment to check in with yourself. There are no wrong answers.</p>
          </div>

          <div className="flex justify-center items-center gap-4 md:gap-stack-md w-full mb-stack-lg flex-wrap md:flex-nowrap">
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button 
                  key={mood.id}
                  className={`flex flex-col items-center gap-stack-sm group focus:outline-none ${isSelected ? 'mood-selected' : ''}`}
                  onClick={() => setSelectedMood(mood.id)}
                >
                  <div className={`mood-icon-container w-20 h-20 md:w-32 md:h-32 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center transition-all duration-200 ${!isSelected ? `bg-surface-variant group-hover:-translate-y-2 ${mood.hoverBg}` : mood.selectedBg}`}>
                    <span className="material-symbols-outlined text-ink-black text-4xl md:text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {mood.icon}
                    </span>
                  </div>
                  <span className="mood-label font-headline-sm text-lg md:text-headline-sm text-ink-black transition-colors">{mood.label}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full flex justify-center mt-stack-md pt-stack-md border-t-[1.5px] border-outline-variant/30">
            <button 
              onClick={handleContinue}
              disabled={!selectedMood || isLoading}
              className="bg-primary text-on-primary font-headline-sm text-headline-sm px-16 py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoodCheckIn;
