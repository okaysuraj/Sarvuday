import React, { useState } from 'react';

const StressTriggerAnalysis = () => {
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .neo-button:active {
            transform: translate(2px, 2px);
            box-shadow: none;
        }
      `}</style>

      {/* Header Section */}
      <div className="mb-12">
        <h3 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-2">Stress Trigger Analysis</h3>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">Understanding what pushes your buttons is the first step toward lasting mental clarity. Here's what we've noticed lately.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: Frequent Triggers */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline-sm text-2xl text-ink-black">Frequent Triggers</h4>
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            
            <div className="space-y-8">
              {/* Trigger Item: Work */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-bold text-ink-black">Work</span>
                  <span className="text-xs md:text-label-md bg-accent-pink px-3 py-1 rounded-full border-[1.5px] border-ink-black">12 occurrences</span>
                </div>
                <div className="h-6 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000 border-r-[1.5px] border-ink-black" style={{width: '85%'}}></div>
                </div>
              </div>
              
              {/* Trigger Item: Deadlines */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-bold text-ink-black">Deadlines</span>
                  <span className="text-xs md:text-label-md bg-secondary-fixed px-3 py-1 rounded-full border-[1.5px] border-ink-black">9 occurrences</span>
                </div>
                <div className="h-6 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-container transition-all duration-1000 border-r-[1.5px] border-ink-black" style={{width: '65%'}}></div>
                </div>
              </div>
              
              {/* Trigger Item: Social Events */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-bold text-ink-black">Social Events</span>
                  <span className="text-xs md:text-label-md bg-accent-sage px-3 py-1 rounded-full border-[1.5px] border-ink-black">4 occurrences</span>
                </div>
                <div className="h-6 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-fixed-dim transition-all duration-1000 border-r-[1.5px] border-ink-black" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black border-dashed">
              <p className="text-label-md italic text-on-surface-variant">"Work-related triggers have increased by 15% since last week. Consider scheduling more breaks."</p>
            </div>
          </div>
        </div>

        {/* Right Column: Insight & Pattern */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Triggers & Mood Insight Card */}
          <div className="bg-accent-pink border-[1.5px] border-ink-black rounded-[48px] p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row gap-8">
            {/* Background Decoration */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white opacity-20 rounded-full z-0"></div>
            
            <div className="flex-1 z-10">
              <div className="inline-block bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-xl mb-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <span className="font-label-bold text-primary">DEEP DIVE INSIGHT</span>
              </div>
              <h4 className="font-display-lg text-3xl md:text-headline-md text-ink-black mb-4">Deadlines vs. Mood Dips</h4>
              <p className="font-body-lg text-on-surface mb-6 leading-relaxed">
                We've identified a strong correlation between <strong className="font-bold">approaching deadlines</strong> and a sharp drop in your <strong className="font-bold">serenity scores</strong>. Your data shows that 48 hours before a project is due, your cortisol levels spike by an average of 22%.
              </p>
              
              <div className="bg-white border-[1.5px] border-ink-black rounded-2xl p-6 mb-4 hover:scale-[1.02] transition-transform">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary shrink-0">lightbulb</span>
                  <p className="text-body-md font-medium">Try the "3-3-3" rule on Tuesdays and Wednesdays to mitigate the pre-deadline anxiety peak.</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-72 h-64 md:h-auto border-[1.5px] border-ink-black rounded-[32px] overflow-hidden bg-white z-10 shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Conceptual illustration showing a person calmly balancing abstract geometric shapes representing stress and peace." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXs4EpXyje56ghJWJrAM3oz7Y0n59EBPUDZS9LggT-w2j98XI2WqeHGbK4B7fm_4rWmQ6UBirJQxAzDmFu9SJW7xar5xUr-y_ohlM1qvAFcLpB-0i8tXuCAJF8QsoQJbfudlEzGdHt8b_LY77mE0ORjN7EDuvL-ifAcvCbyd9eNrl9cZFCZ8SP4zqBAVdpXuilCbZJ7T98enRE0x9t3CLAajCzbPITl0Yw8GP-SILgkGHpsd0b6lMzmg" 
              />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pattern Noticed Module */}
            <div className="bg-secondary-fixed border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 neo-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-ink-black p-2 bg-white rounded-lg border-[1.5px] border-ink-black">visibility</span>
                  <h5 className="font-headline-sm text-xl text-ink-black">Pattern Noticed</h5>
                </div>
                <p className="font-body-md text-on-secondary-fixed mb-6">
                  You often log "High Stress" after 8:00 PM on Sundays. This "Sunday Scaries" pattern can be managed with a grounding exercise.
                </p>
              </div>
              <button className="w-full bg-ink-black text-white py-4 rounded-2xl font-label-bold hover:scale-[0.98] transition-transform shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-1 active:translate-y-1">
                View Weekend Strategy
              </button>
            </div>
            
            {/* Log Entry Now */}
            <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-accent-orange border-[1.5px] border-ink-black rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-ink-black text-4xl">edit_note</span>
              </div>
              <h5 className="font-headline-sm text-xl text-ink-black mb-2">Feeling stressed?</h5>
              <p className="text-on-surface-variant mb-8 text-sm">Logging triggers in real-time helps our AI provide better coping mechanisms.</p>
              <button className="px-8 w-full md:w-auto bg-primary text-on-primary py-4 rounded-full font-label-bold neo-shadow border-[1.5px] border-ink-black transition-all hover:bg-primary/90">
                Log an Entry Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTriggerAnalysis;
