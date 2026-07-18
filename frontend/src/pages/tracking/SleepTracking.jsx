import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const SleepTracking = () => {
  const [sleepData, setSleepData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/sleep');
        setSleepData(response.data);
      } catch (error) {
        console.error('Error fetching sleep data', error);
        toast.error('Failed to load sleep data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSleepData();
  }, []);

  const latestSleep = sleepData.length > 0 ? sleepData[0] : null;
  const duration = latestSleep?.duration_hours || 0;
  const score = Math.min(Math.round((duration / 8) * 100), 100);
  const quality = latestSleep?.quality || 'No Data';

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading sleep insights...</div>;
  }
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
        }

        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 1);
        }

        .interactive-press:active {
            transform: translate(2px, 2px);
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        }
      `}</style>

      {/* Page Header */}
      <div className="flex flex-col mb-12">
        <h2 className="font-headline-md text-3xl md:text-headline-md text-ink-black mb-2">Sleep Intelligence</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Visualizing your recovery patterns to optimize cognitive performance and emotional resilience.</p>
      </div>

      {/* Upper Bento Grid */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Sleep Score Gauge */}
        <div className="col-span-12 lg:col-span-5 bg-white border-[1.5px] border-ink-black rounded-[48px] p-8 flex flex-col items-center justify-center text-center">
          <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest mb-6">Daily Recovery Score</h3>
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="absolute w-full h-full -rotate-90">
              <circle className="text-surface-container" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="24"></circle>
              <circle className="text-primary transition-all duration-1000 ease-out" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeDasharray="691" strokeDashoffset="103" strokeLinecap="round" strokeWidth="24"></circle>
            </svg>
            <div className="flex flex-col items-center">
              <span className="font-display-lg text-6xl md:text-display-lg text-ink-black">{score}</span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">{score >= 80 ? 'Optimal' : score >= 60 ? 'Fair' : 'Poor'}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <span className="bg-accent-sage text-ink-black px-4 py-2 rounded-full border-[1.5px] border-ink-black font-label-bold text-label-md">Quality: {quality}</span>
          </div>
        </div>

        {/* Mood Impact Card */}
        <div className="col-span-12 lg:col-span-7 bg-accent-pink border-[1.5px] border-ink-black rounded-[48px] p-8 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">psychology</span>
              </div>
              <h3 className="font-headline-sm text-2xl md:text-headline-sm">Mood Impact</h3>
            </div>
            <p className="font-body-lg text-body-lg text-ink-black/80 max-w-lg mb-8">
              Your deep sleep increased by <strong className="text-ink-black">45 minutes</strong> last night. Data shows a strong correlation between this recovery and your <strong className="text-ink-black">lower reported anxiety levels</strong> today. Continue this trend to maintain emotional stability.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/50 border-[1.5px] border-ink-black p-6 rounded-3xl z-10">
            <span className="material-symbols-outlined text-tertiary">info</span>
            <p className="font-label-md text-label-md">Deep sleep helps the amygdala process emotions more effectively.</p>
          </div>
          {/* Decorative Graphic */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 border-[1.5px] border-ink-black rounded-full bg-accent-orange/30 z-0 opacity-50 pointer-events-none"></div>
        </div>
      </div>

      {/* Sleep Stages Wide Chart */}
      <div className="bg-white border-[1.5px] border-ink-black rounded-[48px] p-6 md:p-8 mb-6 overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 min-w-[600px]">
          <div>
            <h3 className="font-headline-sm text-2xl md:text-headline-sm mb-2">Sleep Architecture</h3>
            <p className="font-label-md text-on-surface-variant">Phases of sleep from 11:00 PM to 07:00 AM</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary border-[1px] border-ink-black rounded-sm"></div>
              <span className="font-label-md text-label-md">Deep</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary-container border-[1px] border-ink-black rounded-sm"></div>
              <span className="font-label-md text-label-md">REM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent-sage border-[1px] border-ink-black rounded-sm"></div>
              <span className="font-label-md text-label-md">Light</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-surface-container border-[1px] border-ink-black rounded-sm"></div>
              <span className="font-label-md text-label-md">Awake</span>
            </div>
          </div>
        </div>

        {/* Custom Bar Chart UI */}
        <div className="h-64 flex items-end gap-1 w-full relative pt-8 min-w-[600px]">
          {/* Mapping sleep cycles */}
          {[
            {h: 'h-8', bg: 'bg-surface-container'},
            {h: 'h-24', bg: 'bg-accent-sage'},
            {h: 'h-48', bg: 'bg-primary'},
            {h: 'h-48', bg: 'bg-primary'},
            {h: 'h-32', bg: 'bg-secondary-container'},
            {h: 'h-24', bg: 'bg-accent-sage'},
            {h: 'h-12', bg: 'bg-surface-container'},
            {h: 'h-32', bg: 'bg-accent-sage'},
            {h: 'h-56', bg: 'bg-primary'},
            {h: 'h-52', bg: 'bg-primary'},
            {h: 'h-40', bg: 'bg-secondary-container'},
            {h: 'h-28', bg: 'bg-accent-sage'},
            {h: 'h-24', bg: 'bg-accent-sage'},
            {h: 'h-44', bg: 'bg-primary'},
            {h: 'h-48', bg: 'bg-secondary-container'},
            {h: 'h-52', bg: 'bg-secondary-container'},
            {h: 'h-32', bg: 'bg-accent-sage'},
            {h: 'h-16', bg: 'bg-surface-container'},
          ].map((bar, idx) => (
            <div key={idx} className={`flex-1 ${bar.bg} ${bar.h} rounded-t-sm border-x-[0.5px] border-ink-black/10 transition-transform duration-200 hover:scale-y-105 origin-bottom`}></div>
          ))}
        </div>
        <div className="flex justify-between mt-4 font-label-bold text-label-md text-on-surface-variant min-w-[600px]">
          <span>11:00 PM</span>
          <span>01:00 AM</span>
          <span>03:00 AM</span>
          <span>05:00 AM</span>
          <span>07:00 AM</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sleep Goal Progress */}
        <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-64 neo-shadow">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">timer</span>
            </div>
            <span className="font-label-bold text-label-md px-3 py-1 bg-white rounded-full border-[1.5px] border-ink-black">Daily</span>
          </div>
          <div>
            <div className="flex justify-between items-end mb-2">
              <h4 className="font-headline-sm text-2xl md:text-headline-sm">{duration} / 8h</h4>
              <span className="font-label-bold text-label-md text-on-surface-variant">{score}%</span>
            </div>
            <div className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
              <div className="h-full bg-primary border-r-[1.5px] border-ink-black transition-all duration-1000" style={{width: `${score}%`}}></div>
            </div>
            <p className="font-label-md text-label-md mt-4 text-on-surface-variant">Almost there! Just 30 more minutes of rest needed.</p>
          </div>
        </div>

        {/* Bedtime Consistency */}
        <div className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-64 neo-shadow">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">event_repeat</span>
            </div>
            <span className="font-label-bold text-label-md px-3 py-1 bg-white rounded-full border-[1.5px] border-ink-black">Weekly</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-2xl md:text-headline-sm">Consistency</h4>
            <div className="flex gap-2 mt-4">
              {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full h-12 bg-white border-[1.5px] border-ink-black rounded-md flex items-center justify-center">
                    {idx === 3 ? (
                      <div className="w-4 h-4 bg-on-secondary-container/20 border-dashed border-[1.5px] border-ink-black/20 rounded-md"></div>
                    ) : (
                      <div className="w-4 h-4 bg-on-secondary-container rounded-full"></div>
                    )}
                  </div>
                  <span className="text-[10px] font-label-bold uppercase">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Respiratory Rate */}
        <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-64 neo-shadow overflow-hidden relative group">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 bg-accent-orange border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-ink-black">air</span>
            </div>
          </div>
          <div className="z-10">
            <h4 className="font-headline-sm text-2xl md:text-headline-sm">14 Brpm</h4>
            <p className="font-label-md text-label-md text-on-surface-variant mt-2">Steady respiratory rhythm</p>
          </div>
          {/* Decorative background wave */}
          <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path d="M0 50 Q 50 10 100 50 T 200 50 T 300 50 T 400 50" fill="none" stroke="black" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepTracking;
