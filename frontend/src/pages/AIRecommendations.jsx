import React from 'react';
import { Link } from 'react-router-dom';

const AIRecommendations = () => {
  return (
    <div className="flex-1 w-full bg-cream-bg p-margin-mobile md:p-margin-desktop relative">
      <style>{`
        .hard-shadow { box-shadow: 4px 4px 0px 0px #1A1A1A; }
        .hard-shadow-hover:hover {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            transition: all 0.15s ease-out;
        }
        .active-click:active {
            transform: translate(4px, 4px);
            box-shadow: 0px 0px 0px 0px #1A1A1A;
        }
        .rounded-sticker {
            border-radius: 32px;
        }
      `}</style>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h3 className="font-display-lg text-display-lg text-ink-black mb-4">Good morning, Alex.</h3>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            Based on your sleep patterns and heart rate variability from last night, our AI has curated a personalized wellness protocol for your day.
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Energizing Morning Flow */}
          <div className="sticker-card bg-secondary-fixed rounded-sticker p-8 flex flex-col hard-shadow group">
            <div className="w-14 h-14 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-3 transition-transform">
              <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
            </div>
            <h4 className="font-headline-md text-ink-black mb-4">Energizing Morning Flow</h4>
            <div className="flex-grow">
              <p className="font-label-bold text-on-secondary-fixed-variant mb-2 uppercase tracking-wider">Why this?</p>
              <p className="font-body-md text-on-secondary-fixed-variant mb-8">
                Your cortisol levels are peaking later than usual. A 10-minute dynamic stretch will reset your circadian rhythm and boost focus for your 10 AM meeting.
              </p>
            </div>
            <button className="mt-auto w-full py-4 bg-ink-black text-white rounded-xl font-label-bold hard-shadow-hover hover:bg-primary transition-all flex items-center justify-center gap-2">
              Start Session <span className="material-symbols-outlined">play_arrow</span>
            </button>
          </div>

          {/* Card 2: Cognitive Reframing */}
          <div className="sticker-card bg-accent-pink rounded-sticker p-8 flex flex-col hard-shadow group">
            <div className="w-14 h-14 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform">
              <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
            </div>
            <h4 className="font-headline-md text-ink-black mb-4">Cognitive Reframing</h4>
            <div className="flex-grow">
              <p className="font-label-bold text-tertiary-container mb-2 uppercase tracking-wider">Why this?</p>
              <p className="font-body-md text-tertiary-container mb-8">
                We noticed a slight increase in stress-related keywords in your morning journal. This exercise helps detach from intrusive thoughts and build resilience.
              </p>
            </div>
            <button className="mt-auto w-full py-4 bg-white text-ink-black border-[1.5px] border-ink-black rounded-xl font-label-bold hard-shadow hover:bg-tertiary hover:text-white transition-all flex items-center justify-center gap-2">
              Open Exercise <span className="material-symbols-outlined">edit_note</span>
            </button>
          </div>

          {/* Card 3: Wind Down Protocol */}
          <div className="sticker-card bg-primary-fixed rounded-sticker p-8 flex flex-col hard-shadow group">
            <div className="w-14 h-14 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>bedtime</span>
            </div>
            <h4 className="font-headline-md text-ink-black mb-4">Wind Down Protocol</h4>
            <div className="flex-grow">
              <p className="font-label-bold text-on-primary-fixed-variant mb-2 uppercase tracking-wider">Why this?</p>
              <p className="font-body-md text-on-primary-fixed-variant mb-8">
                Consistent rest is key to your recovery goals. Today's protocol includes 4-7-8 breathing and a blue-light fast starting at 9:00 PM.
              </p>
            </div>
            <button className="mt-auto w-full py-4 bg-primary text-white border-[1.5px] border-ink-black rounded-xl font-label-bold hard-shadow-hover transition-all flex items-center justify-center gap-2">
              View Schedule <span className="material-symbols-outlined">event_repeat</span>
            </button>
          </div>
        </div>

        {/* Personalized Progress Section (Bento Style) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 sticker-card bg-white rounded-sticker p-6 md:p-10 hard-shadow">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="font-headline-md text-ink-black">Weekly Wellbeing Score</h4>
                <p className="font-body-md text-on-surface-variant">Your overall trend is up by 12% from last week.</p>
              </div>
              <div className="text-right">
                <span className="text-4xl md:text-5xl font-display-lg text-primary">84</span>
                <span className="text-on-surface-variant font-label-bold">/100</span>
              </div>
            </div>
            <div className="h-48 w-full bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black relative overflow-hidden flex items-end px-2 md:px-4 pb-0 gap-2 md:gap-4">
              <div className="bg-accent-pink border-[1.5px] border-ink-black border-b-0 w-full h-[40%] rounded-t-lg"></div>
              <div className="bg-accent-sage border-[1.5px] border-ink-black border-b-0 w-full h-[55%] rounded-t-lg"></div>
              <div className="bg-secondary-container border-[1.5px] border-ink-black border-b-0 w-full h-[45%] rounded-t-lg"></div>
              <div className="bg-primary-container border-[1.5px] border-ink-black border-b-0 w-full h-[70%] rounded-t-lg"></div>
              <div className="bg-accent-pink border-[1.5px] border-ink-black border-b-0 w-full h-[65%] rounded-t-lg"></div>
              <div className="bg-accent-orange border-[1.5px] border-ink-black border-b-0 w-full h-[85%] rounded-t-lg"></div>
              <div className="bg-secondary-fixed-dim border-[1.5px] border-ink-black border-b-0 w-full h-[75%] rounded-t-lg"></div>
            </div>
          </div>
          
          <div className="lg:col-span-4 sticker-card bg-accent-sage rounded-sticker p-8 hard-shadow flex flex-col justify-center">
            <span className="material-symbols-outlined text-5xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <h4 className="font-headline-sm text-ink-black mb-4">MindCare Pro Tip</h4>
            <p className="font-body-md text-on-surface-variant mb-6 italic">"Taking a 5-minute 'nature break'—even just looking at a plant—can reduce cognitive fatigue by 20%."</p>
            <a className="text-primary font-label-bold flex items-center gap-1 hover:underline cursor-pointer">
              Learn about Attention Restoration <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
