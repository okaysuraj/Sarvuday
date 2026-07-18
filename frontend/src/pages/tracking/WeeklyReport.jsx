import React from 'react';
import { useNavigate } from 'react-router-dom';

const WeeklyReport = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 pb-24">
      <style>{`
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
            padding: 32px;
            background-color: #ffffff;
            transition: all 0.2s ease;
        }
        .sticker-card-interactive:hover {
            transform: translate(-2px, -2px);
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-button-primary {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }
        .neo-button-primary:active {
            transform: translate(2px, 2px);
            box-shadow: 0px 0px 0px 0px #1A1A1A;
        }
      `}</style>

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <div>
          <h2 className="font-display-lg text-4xl md:text-display-lg text-ink-black mb-2">Weekly Report</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Your mental wellness summary for Oct 12 - Oct 18</p>
        </div>
        <button className="neo-button-primary bg-primary text-on-primary font-label-bold text-label-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 w-full md:w-auto">
          <span className="material-symbols-outlined">forum</span>
          Discuss with AI
        </button>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Overall Mood Average (Large Card) */}
        <div className="sticker-card bg-accent-sage md:col-span-8 flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="font-headline-sm text-2xl text-ink-black flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined">analytics</span>
              Overall Mood Average
            </h3>
            <div className="flex flex-wrap items-baseline gap-4 mb-6">
              <span className="font-display-lg text-6xl text-ink-black">7.2</span>
              <span className="font-body-lg text-xl text-ink-black opacity-80">/ 10</span>
              <span className="font-label-bold text-sm text-primary bg-primary-fixed px-3 py-1 rounded-full border-[1.5px] border-ink-black ml-0 sm:ml-4 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">trending_up</span> +1.5 from last week
              </span>
            </div>
          </div>
          
          {/* Chart Simulation */}
          <div className="h-48 w-full border-[1.5px] border-ink-black rounded-xl bg-surface-container-lowest flex items-end p-4 gap-2 relative overflow-hidden mt-4">
            <div className="flex-1 bg-accent-pink h-[40%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-accent-pink h-[60%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-accent-pink h-[50%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-primary-fixed h-[80%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-primary-fixed h-[75%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-secondary-fixed h-[90%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="flex-1 bg-secondary-fixed h-[85%] rounded-t-md border-[1.5px] border-ink-black hover:opacity-80 transition-opacity"></div>
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
          </div>
        </div>

        {/* Dominant Emotion (Small Card) */}
        <div className="sticker-card bg-accent-orange md:col-span-4 flex flex-col items-center justify-center text-center">
          <h3 className="font-headline-sm text-xl text-ink-black mb-6 w-full text-left">Dominant Emotion</h3>
          <div className="w-32 h-32 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[64px] text-tertiary-container" style={{fontVariationSettings: "'FILL' 1"}}>sentiment_satisfied</span>
          </div>
          <h4 className="font-headline-md text-3xl text-ink-black">Calm</h4>
          <p className="font-body-md text-ink-black mt-2">Felt during 60% of logged sessions</p>
        </div>

        {/* Sleep Correlation (Medium Card) */}
        <div className="sticker-card bg-surface-container-lowest md:col-span-6">
          <h3 className="font-headline-sm text-xl text-ink-black mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">bedtime</span>
            Sleep & Mood Correlation
          </h3>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-label-md text-on-surface-variant">Average Sleep</p>
                <p className="font-headline-sm text-2xl text-ink-black">7h 15m</p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-label-md text-on-surface-variant">Mood Impact</p>
                <p className="font-label-bold text-sm text-secondary-container bg-on-secondary-container px-3 py-1 rounded-full border-[1.5px] border-ink-black mt-1 inline-block">High Positive</p>
              </div>
            </div>
            
            <div className="w-full bg-surface-variant h-4 rounded-full border-[1.5px] border-ink-black overflow-hidden relative">
              <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 border-r-[1.5px] border-ink-black" style={{width: '75%'}}></div>
            </div>
            
            <p className="font-body-md text-on-surface-variant text-sm md:text-base">Days with 7+ hours of sleep strongly correlated with improved mood scores.</p>
          </div>
        </div>

        {/* Highlights / Insights (Medium Card) */}
        <div className="sticker-card bg-accent-pink md:col-span-6">
          <h3 className="font-headline-sm text-xl text-ink-black mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">tips_and_updates</span>
            Weekly Insights
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-4 bg-surface-container-lowest p-4 rounded-xl border-[1.5px] border-ink-black hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
              <div>
                <p className="font-label-bold text-ink-black text-base">Consistency Goal Met!</p>
                <p className="font-body-md text-sm text-on-surface-variant mt-1">You logged your mood for 7 consecutive days.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 bg-surface-container-lowest p-4 rounded-xl border-[1.5px] border-ink-black hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-tertiary-container mt-0.5">warning</span>
              <div>
                <p className="font-label-bold text-ink-black text-base">Stress Spike Detected</p>
                <p className="font-body-md text-sm text-on-surface-variant mt-1">Wednesday afternoon showed higher stress levels. Consider a short walk next time.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
