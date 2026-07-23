import React from 'react';
import { Link } from 'react-router-dom';

const AIMoodAnalysisResult = () => {
  return (
    <div className="flex-1 p-margin-mobile md:p-margin-desktop bg-cream-bg flex flex-col gap-stack-lg min-h-full">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
      `}</style>

      {/* Page Header */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="font-display-lg text-display-lg text-ink-black">Analysis Complete</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
            Your latest entry has been analyzed. Here is a breakdown of your current emotional landscape.
          </p>
        </div>
        {/* Decorative element */}
        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] rotate-12 shrink-0">
          <span className="material-symbols-outlined text-ink-black text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* AI Summary Card (Left Column) */}
        <div className="md:col-span-5 flex flex-col gap-stack-md">
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-container-padding shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 h-full">
            {/* Illustration Placeholder */}
            <div className="w-full h-48 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
              <div className="text-6xl">🧠</div>
            </div>
            
            {/* Content */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full w-10 h-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-ink-black">AI Summary</h3>
            </div>
            <p className="font-body-lg text-body-lg text-ink-black mb-6 flex-1">
                Based on your latest journal entry, you seem to be experiencing a strong sense of calm and clarity today. There's a notable reflective tone, suggesting you are processing recent events positively. It's a great day to lean into this grounded feeling. Consider taking a short walk or practicing light meditation to maintain this balance.
            </p>
            
            {/* Action Button */}
            <Link to="/journal" className="w-full bg-surface-container-lowest text-ink-black font-label-bold text-label-bold py-3 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:bg-primary-fixed transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 mt-auto">
              <span className="material-symbols-outlined">edit_note</span>
              Add Note
            </Link>
          </div>
        </div>

        {/* Mood Profile Visualization (Right Column) */}
        <div className="md:col-span-7 flex flex-col gap-stack-md mt-6 md:mt-0">
          <div className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-container-padding shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-6 border-b-[1.5px] border-ink-black border-dashed">
              <h3 className="font-headline-md text-headline-md text-ink-black">Mood Profile</h3>
              <div className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-4 py-2 font-label-bold text-label-bold text-ink-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]">
                  Confidence: 92%
              </div>
            </div>
            
            {/* Data Bars */}
            <div className="flex flex-col gap-6 flex-1 justify-center">
              {/* Emotion 1 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent-sage border-[1px] border-ink-black"></span>
                    <span className="font-headline-sm text-headline-sm text-ink-black">Calm</span>
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">70%</span>
                </div>
                <div className="w-full h-[16px] bg-surface-container-high rounded-full border-[1.5px] border-ink-black overflow-hidden flex shadow-inner">
                  <div className="h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              {/* Emotion 2 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-fixed border-[1px] border-ink-black"></span>
                    <span className="font-headline-sm text-headline-sm text-ink-black">Reflective</span>
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">20%</span>
                </div>
                <div className="w-full h-[16px] bg-surface-container-high rounded-full border-[1.5px] border-ink-black overflow-hidden flex shadow-inner">
                  <div className="h-full bg-primary-fixed border-r-[1.5px] border-ink-black" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              {/* Emotion 3 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-accent-orange border-[1px] border-ink-black"></span>
                    <span className="font-headline-sm text-headline-sm text-ink-black">Anxious</span>
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">5%</span>
                </div>
                <div className="w-full h-[16px] bg-surface-container-high rounded-full border-[1.5px] border-ink-black overflow-hidden flex shadow-inner">
                  <div className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '5%' }}></div>
                </div>
              </div>
              
              {/* Emotion 4 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-surface-container-high border-[1px] border-ink-black"></span>
                    <span className="font-headline-sm text-headline-sm text-ink-black">Other</span>
                  </div>
                  <span className="font-label-bold text-label-bold text-on-surface-variant">5%</span>
                </div>
                <div className="w-full h-[16px] bg-surface-container-high rounded-full border-[1.5px] border-ink-black overflow-hidden flex shadow-inner">
                  <div className="h-full bg-surface-variant border-r-[1.5px] border-ink-black" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMoodAnalysisResult;
