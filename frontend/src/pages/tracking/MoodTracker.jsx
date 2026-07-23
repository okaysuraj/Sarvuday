import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MoodTracker = () => {
  const [currentMonth] = useState('October 2023');
  
  // Mock data for mood history (we would fetch this)
  const moodData = [
    'great', 'good', 'neutral', 'good', 'low', 'reflective', 'great',
    'great', 'good', 'good', 'reflective', 'neutral', 'low', 'good',
    'great', 'great', 'great', 'good', 'good', 'great', 'great',
    'neutral', 'reflective', 'good', 'low', 'good', 'great', 'good',
    'neutral', 'great', 'good'
  ];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'great': return 'bg-secondary-container'; // Yellow
      case 'good': return 'bg-primary-fixed'; // Lavender
      case 'neutral': return 'bg-white';
      case 'low': return 'bg-accent-pink';
      case 'reflective': return 'bg-accent-sage'; // Blue-Gray
      default: return 'bg-white';
    }
  };
  
  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'great': return { icon: 'sentiment_very_satisfied', fill: true };
      case 'good': return { icon: 'sentiment_satisfied', fill: false };
      case 'neutral': return { icon: 'sentiment_neutral', fill: false };
      case 'low': return { icon: 'sentiment_dissatisfied', fill: false };
      case 'reflective': return { icon: 'self_improvement', fill: false };
      default: return { icon: 'sentiment_neutral', fill: false };
    }
  };

  return (
    <div className="flex-1 w-full bg-background p-margin-mobile md:p-margin-desktop relative">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px #1A1A1A; }
        .neo-shadow-active { box-shadow: none; transform: translate(2px, 2px); }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); }
        .sticker-container { border: 1.5px solid #1A1A1A; transition: transform 0.1s ease-in-out; }
      `}</style>
      
      {/* Month Selector (if we were putting it in a header, but it's part of content now) */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display-lg text-display-lg text-primary">{currentMonth}</h2>
        <div className="flex gap-2">
          <button className="p-2 border-[1.5px] border-ink-black rounded-full hover:bg-surface-container transition-colors neo-shadow active:neo-shadow-active bg-white">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-2 border-[1.5px] border-ink-black rounded-full hover:bg-surface-container transition-colors neo-shadow active:neo-shadow-active bg-white">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Header Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-8 flex flex-col justify-center">
          <h3 className="font-display-lg text-headline-md text-on-surface mb-2">October Overview</h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Your mood trend for October has been consistently positive, showing significant improvement in the third week after starting mindful meditation sessions.
          </p>
        </div>
        {/* Quick Stats Bento Card */}
        <div className="md:col-span-4 sticker-container bg-accent-pink rounded-[32px] p-8 flex flex-col justify-between neo-shadow relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-label-bold text-label-bold text-on-tertiary-fixed-variant uppercase tracking-widest mb-1">Monthly Streak</p>
            <p className="font-display-lg text-headline-md text-ink-black">12 Days</p>
          </div>
          <div className="flex justify-between items-end relative z-10 mt-4">
            <p className="font-body-md text-body-md text-tertiary">Keep it up, {localStorage.getItem('userName') || 'User'}!</p>
            <span className="material-symbols-outlined text-4xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </div>
          {/* Abstract shape */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-tertiary-fixed-dim rounded-full opacity-30"></div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Calendar Heatmap Grid */}
        <div className="xl:col-span-9 sticker-container bg-white rounded-[40px] p-4 sm:p-10">
          <div className="calendar-grid gap-2 sm:gap-3">
            {/* Days Headers */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center font-label-bold text-xs sm:text-label-bold text-on-surface-variant py-2 sm:py-4">{day}</div>
            ))}
            
            {/* Calendar Days */}
            {moodData.map((mood, idx) => {
              const iconData = getMoodIcon(mood);
              return (
                <div key={idx} className={`aspect-square sticker-container ${getMoodColor(mood)} rounded-2xl sm:rounded-3xl flex flex-col p-2 sm:p-4 cursor-pointer hover:scale-105 transition-transform`}>
                  <span className="font-headline-sm text-sm sm:text-headline-sm">{idx + 1}</span>
                  <span className="mt-auto material-symbols-outlined self-end text-lg sm:text-2xl" style={{ fontVariationSettings: iconData.fill ? "'FILL' 1" : "'FILL' 0" }}>
                    {iconData.icon}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Legend and Details Section */}
        <div className="xl:col-span-3 flex flex-col gap-8">
          {/* Color Key Card */}
          <div className="sticker-container bg-surface-container rounded-[32px] p-8 neo-shadow">
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-6">Mood Legend</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-secondary-container"></div>
                <span className="font-label-bold text-label-bold">Great</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-primary-fixed"></div>
                <span className="font-label-bold text-label-bold">Good</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-white"></div>
                <span className="font-label-bold text-label-bold">Neutral</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-pink"></div>
                <span className="font-label-bold text-label-bold">Low</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black bg-accent-sage"></div>
                <span className="font-label-bold text-label-bold">Reflective</span>
              </div>
            </div>
          </div>
          
          {/* Featured Reflection Card */}
          <div className="sticker-container bg-accent-sage rounded-[32px] p-8 flex-1 neo-shadow flex flex-col">
            <div className="mb-6 flex justify-between items-start">
              <span className="font-label-bold text-label-bold px-3 py-1 bg-white border border-ink-black rounded-full">OCT 11</span>
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-4">Deep Reflection</h4>
            <p className="font-body-md text-body-md text-on-surface-variant flex-1 italic">
                "Felt a strange sense of calm today while walking in the park. The crisp air helped clear my head after a busy morning."
            </p>
            <button className="mt-8 font-label-bold text-primary flex items-center gap-2 group">
                Read full entry
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights Chart Section */}
      <section className="mt-12">
        <div className="sticker-container bg-white rounded-[40px] p-6 sm:p-10 neo-shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h3 className="font-headline-md text-headline-md">Mood Distribution</h3>
            <div className="flex gap-4">
              <button className="px-6 py-2 border-[1.5px] border-ink-black rounded-full font-label-bold bg-secondary-fixed text-ink-black">Weekly</button>
              <button className="px-6 py-2 border-[1.5px] border-ink-black rounded-full font-label-bold hover:bg-surface-container-high transition-colors">Monthly</button>
            </div>
          </div>
          
          {/* Simple CSS Bar Chart */}
          <div className="h-16 w-full flex gap-1 sm:gap-2 items-end mb-4">
            <div className="h-[90%] bg-secondary-container border-[1.5px] border-ink-black rounded-t-lg" style={{ width: '45%' }}></div>
            <div className="h-[75%] bg-primary-fixed border-[1.5px] border-ink-black rounded-t-lg" style={{ width: '25%' }}></div>
            <div className="h-[30%] bg-white border-[1.5px] border-ink-black rounded-t-lg" style={{ width: '15%' }}></div>
            <div className="h-[15%] bg-accent-pink border-[1.5px] border-ink-black rounded-t-lg" style={{ width: '10%' }}></div>
            <div className="h-[10%] bg-accent-sage border-[1.5px] border-ink-black rounded-t-lg" style={{ width: '5%' }}></div>
          </div>
          <div className="flex justify-between text-[10px] sm:text-label-bold text-on-surface-variant px-2">
            <span>45% Great</span>
            <span>25% Good</span>
            <span>15% Neutral</span>
            <span>10% Low</span>
            <span>5% Reflective</span>
          </div>
        </div>
      </section>

      {/* Floating Action Button for Entry */}
      <Link to="/mood-tracker/add" className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-primary text-on-primary rounded-full border-[1.5px] border-ink-black neo-shadow hover:neo-shadow-active active:scale-95 transition-all flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>
    </div>
  );
};

export default MoodTracker;
