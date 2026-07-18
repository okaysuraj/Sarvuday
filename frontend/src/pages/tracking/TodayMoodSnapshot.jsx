import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const TodayMoodSnapshot = () => {
  const [moodData, setMoodData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/mood/history');
        if (response.data && response.data.length > 0) {
          setMoodData(response.data[0]); // most recent
        }
      } catch (error) {
        console.error('Error fetching mood snapshot:', error);
        toast.error('Failed to load today\'s mood.');
      } finally {
        setLoading(false);
      }
    };
    fetchMood();
  }, []);

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading snapshot...</div>;
  }

  // Derived values or defaults
  const moodMap = {
    'low': { label: 'Low', icon: 'sentiment_very_dissatisfied', color: 'text-error' },
    'down': { label: 'Down', icon: 'sentiment_dissatisfied', color: 'text-error' },
    'neutral': { label: 'Neutral', icon: 'sentiment_neutral', color: 'text-ink-black' },
    'good': { label: 'Good', icon: 'sentiment_satisfied', color: 'text-primary' },
    'great': { label: 'Great', icon: 'sentiment_very_satisfied', color: 'text-primary' }
  };

  const moodKey = moodData?.mood || 'neutral';
  const moodInfo = moodMap[moodKey] || moodMap['neutral'];
  const energy = (moodData?.energy_level || 5) * 10;
  const mental = 100 - ((moodData?.anxiety_level || 5) * 10);
  const dateStr = moodData?.created_at ? new Date(moodData.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Today';

  return (
    <div className="flex-1 pb-24">
      <style>{`
        .memphis-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
        }
        .memphis-card-lg {
            border: 1.5px solid #1A1A1A;
            border-radius: 48px;
        }
        .memphis-button-primary {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }
        .memphis-button-primary:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .memphis-chip {
            border: 1px solid #1A1A1A;
            border-radius: 9999px;
        }
        .memphis-progress {
            border: 1.5px solid #1A1A1A;
        }
        .text-shadow-light {
            text-shadow: 1px 1px 0px #fff;
        }
        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
        <div>
          <p className="font-label-bold text-label-bold text-on-surface-variant mb-2 tracking-widest uppercase">Today's Snapshot</p>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-ink-black flex items-center gap-3">
            {moodData ? `Feeling ${moodInfo.label}` : 'No Mood Logged Yet'}
            {moodData && (
              <span className="inline-flex w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary-container memphis-card items-center justify-center">
                <span className={`material-symbols-outlined ${moodInfo.color} icon-fill text-[24px]`}>{moodInfo.icon}</span>
              </span>
            )}
          </h1>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-sm text-shadow-light">
          {dateStr}. {moodData ? 'Here is a breakdown of your day.' : 'Log a mood to see your snapshot here.'}
        </p>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Energy Distribution (Spans 8 cols on desktop) */}
        <div className="col-span-1 md:col-span-8 bg-surface-container-lowest memphis-card-lg p-6 md:p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
          {/* Abstract BG pattern */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary-fixed opacity-50 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-tertiary-fixed opacity-50 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline-sm text-2xl text-ink-black">Energy Distribution</h3>
            <span className="material-symbols-outlined text-outline">battery_charging_full</span>
          </div>
          
          <div className="space-y-6 z-10 flex-grow flex flex-col justify-center">
            {/* Physical / Energy */}
            <div>
              <div className="flex justify-between font-label-md text-label-md mb-2">
                <span>Energy / Physical</span>
                <span className="font-bold">{energy}%</span>
              </div>
              <div className="h-4 w-full bg-surface-variant rounded-full memphis-progress overflow-hidden">
                <div className="h-full bg-accent-sage border-r-[1.5px] border-ink-black transition-all duration-1000" style={{ width: `${energy}%` }}></div>
              </div>
            </div>
            {/* Mental / Anxiety */}
            <div>
              <div className="flex justify-between font-label-md text-label-md mb-2">
                <span>Mental Calm (Inverse Anxiety)</span>
                <span className="font-bold">{mental}%</span>
              </div>
              <div className="h-4 w-full bg-surface-variant rounded-full memphis-progress overflow-hidden">
                <div className="h-full bg-primary-fixed border-r-[1.5px] border-ink-black transition-all duration-1000" style={{ width: `${mental}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mood Ring / Overall (Spans 4 cols on desktop) */}
        <div className="col-span-1 md:col-span-4 bg-accent-orange memphis-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-4 relative">
          <h3 className="font-headline-sm text-xl text-on-error-container absolute top-6 left-6">Vibe</h3>
          <div className="w-32 h-32 rounded-full border-[1.5px] border-ink-black bg-surface-container-lowest flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] mb-4 hover:scale-105 transition-transform">
            <span className={`material-symbols-outlined text-6xl ${moodInfo.color} icon-fill`}>{moodInfo.icon}</span>
          </div>
          <p className="font-body-lg text-2xl text-on-tertiary-fixed font-medium">{moodInfo.label}</p>
        </div>

        {/* Main Influences (Spans 12 cols, grid inside) */}
        <div className="col-span-1 md:col-span-12 mt-4">
          <h3 className="font-headline-md text-3xl text-ink-black mb-6">Main Influences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Influence 1 */}
            <div className="bg-surface-container-highest memphis-card p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center border-[1.5px] border-ink-black shrink-0">
                <span className="material-symbols-outlined text-primary">laptop_mac</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-xl text-ink-black">Deep Work</h4>
                <p className="font-body-md text-on-surface-variant mt-1">2 hours of uninterrupted coding flow state.</p>
              </div>
              <div className="mt-auto pt-4 flex gap-2">
                <span className="memphis-chip px-3 py-1 bg-surface-container-lowest font-label-md text-sm text-primary">+ Focus</span>
              </div>
            </div>
            
            {/* Influence 2 */}
            <div className="bg-surface-container-highest memphis-card p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center border-[1.5px] border-ink-black shrink-0">
                <span className="material-symbols-outlined text-tertiary">bedtime</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-xl text-ink-black">Restless Sleep</h4>
                <p className="font-body-md text-on-surface-variant mt-1">Woke up frequently, feeling a bit sluggish morning.</p>
              </div>
              <div className="mt-auto pt-4 flex gap-2">
                <span className="memphis-chip px-3 py-1 bg-surface-container-lowest font-label-md text-sm text-error">- Energy</span>
              </div>
            </div>
            
            {/* Influence 3 */}
            <div className="bg-surface-container-highest memphis-card p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center border-[1.5px] border-ink-black shrink-0">
                <span className="material-symbols-outlined text-secondary">groups</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-xl text-ink-black">Lunch with Team</h4>
                <p className="font-body-md text-on-surface-variant mt-1">Good laughs and connection over tacos.</p>
              </div>
              <div className="mt-auto pt-4 flex gap-2">
                <span className="memphis-chip px-3 py-1 bg-surface-container-lowest font-label-md text-sm text-secondary">+ Mood</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note to Self (Spans 12 cols) */}
        <div className="col-span-1 md:col-span-12 bg-accent-sage memphis-card p-6 md:p-8 mt-4 relative">
          {/* Decorative element */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-20 pointer-events-none">
            <svg fill="none" stroke="black" strokeWidth="2" viewBox="0 0 100 100">
              <path d="M10,10 L90,90 M90,10 L10,90"></path>
            </svg>
          </div>
          <h3 className="font-headline-sm text-2xl text-ink-black mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">edit_note</span> Note to Self
          </h3>
          <p className="font-body-lg text-lg text-on-surface italic max-w-4xl leading-relaxed">
            "{moodData?.notes || "No notes were provided for this check-in."}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayMoodSnapshot;
