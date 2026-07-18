import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const MoodCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/mood/history');
        setMoodHistory(response.data);
      } catch (error) {
        console.error('Error fetching mood history:', error);
        toast.error('Failed to load mood history.');
      } finally {
        setLoading(false);
      }
    };
    
    // Set current month string
    const date = new Date();
    setCurrentMonth(date.toLocaleString('default', { month: 'long', year: 'numeric' }));
    
    fetchMoodHistory();
  }, []);

  // Helper function to process mood history into calendar days
  const getDaysInMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const moodMap = {
      'low': { mood: 'low', icon: 'sentiment_dissatisfied' },
      'down': { mood: 'low', icon: 'sentiment_dissatisfied' }, // mapping down to low visually
      'neutral': { mood: 'neutral', icon: 'sentiment_neutral' },
      'good': { mood: 'good', icon: 'sentiment_satisfied' },
      'great': { mood: 'great', icon: 'sentiment_very_satisfied' }
    };

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      // Find if we have a mood for this day
      // Note: this is a simple implementation that just checks the day component
      // In a robust app, we'd compare full date strings matching the current month/year
      const dayMood = moodHistory.find(m => {
        if (!m.created_at) return false;
        const mDate = new Date(m.created_at);
        return mDate.getDate() === i && mDate.getMonth() === month && mDate.getFullYear() === year;
      });

      if (dayMood) {
        const mapped = moodMap[dayMood.mood] || moodMap['neutral'];
        days.push({ num: i, mood: mapped.mood, icon: mapped.icon, raw: dayMood });
      } else {
        days.push({ num: i, mood: 'neutral', icon: 'sentiment_neutral', raw: null });
      }
    }
    return days;
  };

  const days = getDaysInMonth();
  
  // Calculate streaks and percentages
  const activeDays = days.filter(d => d.raw).length;
  const greatDays = days.filter(d => d.mood === 'great').length;
  const goodDays = days.filter(d => d.mood === 'good').length;
  const neutralDays = days.filter(d => d.mood === 'neutral' && d.raw).length;
  const lowDays = days.filter(d => d.mood === 'low').length;
  
  const totalLogged = activeDays || 1; // avoid division by zero
  const pctGreat = Math.round((greatDays / totalLogged) * 100);
  const pctGood = Math.round((goodDays / totalLogged) * 100);
  const pctNeutral = Math.round((neutralDays / totalLogged) * 100);
  const pctLow = Math.round((lowDays / totalLogged) * 100);

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading calendar...</div>;
  }


  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow-active {
            box-shadow: none;
            transform: translate(2px, 2px);
        }
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }
        .sticker-container {
            border: 1.5px solid #1A1A1A;
            transition: transform 0.1s ease-in-out;
        }
        .mood-great { background-color: #fdd33f; } /* Yellow */
        .mood-good { background-color: #dde1ff; } /* Lavender */
        .mood-neutral { background-color: #ffffff; } /* White */
        .mood-low { background-color: #ffd9df; } /* Pink */
        .mood-reflective { background-color: #d9d9e6; } /* Blue-Gray */
        
        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors border-[1.5px] border-ink-black bg-white">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h2 className="font-headline-sm text-2xl text-primary">{currentMonth}</h2>
          <button className="p-2 hover:bg-surface-container rounded-full transition-colors border-[1.5px] border-ink-black bg-white">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </header>

      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8 flex flex-col justify-center">
          <h3 className="font-display-lg text-4xl text-on-surface mb-2">{currentMonth.split(' ')[0]} Overview</h3>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">
            You've logged {activeDays} days this month. Keep up the good work!
          </p>
        </div>
        {/* Quick Stats Bento Card */}
        <div className="md:col-span-4 sticker-container bg-accent-pink rounded-[32px] p-6 md:p-8 flex flex-col justify-between neo-shadow relative overflow-hidden h-48 md:h-auto hover:scale-[1.02]">
          <div className="relative z-10">
            <p className="font-label-bold text-on-tertiary-fixed-variant uppercase tracking-widest mb-1 text-xs">Monthly Streak</p>
            <p className="font-display-lg text-4xl text-ink-black">{activeDays} Days</p>
          </div>
          <div className="flex justify-between items-end relative z-10 mt-auto">
            <p className="font-body-md text-tertiary">Keep it up, Saurabh!</p>
            <span className="material-symbols-outlined text-4xl text-tertiary icon-fill">favorite</span>
          </div>
          {/* Abstract shape */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-tertiary-fixed-dim rounded-full opacity-30 pointer-events-none"></div>
        </div>
      </section>

      {/* Calendar and Legend Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calendar Heatmap Grid */}
        <div className="md:col-span-9 sticker-container bg-white rounded-[40px] p-6 md:p-10 neo-shadow">
          <div className="calendar-grid gap-2 md:gap-3">
            {/* Days Headers */}
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
              <div key={day} className="text-center font-label-bold text-xs md:text-sm text-on-surface-variant py-2 md:py-4">{day}</div>
            ))}
            
            {/* Days */}
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`aspect-square sticker-container mood-${day.mood} rounded-xl md:rounded-3xl flex flex-col p-2 md:p-4 cursor-pointer hover:scale-105 transition-transform group`}
              >
                <span className="font-headline-sm text-lg md:text-xl">{day.num}</span>
                <span className={`mt-auto material-symbols-outlined self-end text-lg md:text-2xl ${day.mood === 'great' ? 'icon-fill' : ''}`}>
                  {day.icon}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend and Details Section */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Color Key Card */}
          <div className="sticker-container bg-surface-container rounded-[32px] p-6 md:p-8 neo-shadow">
            <h4 className="font-headline-sm text-xl text-on-surface mb-6">Mood Legend</h4>
            <div className="space-y-4">
              {[
                { label: 'Great', class: 'mood-great' },
                { label: 'Good', class: 'mood-good' },
                { label: 'Neutral', class: 'mood-neutral' },
                { label: 'Low', class: 'mood-low' },
                { label: 'Reflective', class: 'mood-reflective' },
              ].map(mood => (
                <div key={mood.label} className="flex items-center gap-4">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl border-[1.5px] border-ink-black ${mood.class}`}></div>
                  <span className="font-label-bold">{mood.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Reflection Card */}
          <div className="sticker-container bg-accent-sage rounded-[32px] p-6 md:p-8 flex-1 neo-shadow flex flex-col">
            <div className="mb-4 flex justify-between items-start">
              <span className="font-label-bold px-3 py-1 bg-white border-[1.5px] border-ink-black rounded-full text-xs">OCT 11</span>
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
            <h4 className="font-headline-sm text-xl mb-2">Deep Reflection</h4>
            <p className="font-body-md text-on-surface-variant flex-1 italic text-sm md:text-base">
              "{moodHistory[0]?.notes || "No recent notes found. Try adding notes to your next check-in!"}"
            </p>
            <button className="mt-4 font-label-bold text-primary flex items-center gap-2 group hover:underline text-sm md:text-base">
              Read full entry
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights Chart Section */}
      <section className="mt-6">
        <div className="sticker-container bg-surface-container-lowest rounded-[40px] p-6 md:p-10 neo-shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h3 className="font-headline-md text-2xl md:text-3xl">Mood Distribution</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-[1.5px] border-ink-black rounded-full font-label-bold bg-secondary-fixed text-ink-black text-sm md:text-base hover:scale-105 transition-transform">Weekly</button>
              <button className="px-4 py-2 border-[1.5px] border-ink-black rounded-full font-label-bold hover:bg-surface-container-high transition-colors text-sm md:text-base">Monthly</button>
            </div>
          </div>
          
          <div className="h-16 w-full flex gap-2 items-end mb-4 overflow-hidden rounded-t-lg">
            <div className="h-full bg-secondary-container border-[1.5px] border-ink-black rounded-t-lg transition-all duration-1000" style={{height: `${pctGreat}%`, width: '100%'}}></div>
            <div className="h-[75%] bg-primary-fixed border-[1.5px] border-ink-black rounded-t-lg transition-all duration-1000" style={{height: `${pctGood}%`, width: '100%'}}></div>
            <div className="h-[30%] bg-surface-variant border-[1.5px] border-ink-black rounded-t-lg transition-all duration-1000" style={{height: `${pctNeutral}%`, width: '100%'}}></div>
            <div className="h-[15%] bg-accent-pink border-[1.5px] border-ink-black rounded-t-lg transition-all duration-1000" style={{height: `${pctLow}%`, width: '100%'}}></div>
          </div>
          
          <div className="flex justify-between text-label-bold text-on-surface-variant px-2 text-[10px] md:text-sm overflow-x-auto gap-4 hide-scrollbar">
            <span className="whitespace-nowrap">{pctGreat}% Great</span>
            <span className="whitespace-nowrap">{pctGood}% Good</span>
            <span className="whitespace-nowrap">{pctNeutral}% Neutral</span>
            <span className="whitespace-nowrap">{pctLow}% Low</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MoodCalendar;
