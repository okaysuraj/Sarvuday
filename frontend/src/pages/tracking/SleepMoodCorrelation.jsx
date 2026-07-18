import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const SleepMoodCorrelation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCorrelation = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/correlation');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching correlation data', error);
        toast.error('Failed to load correlation data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCorrelation();
  }, []);

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading insights...</div>;
  }

  const dataPoints = data?.data_points || [];
  const insight = data?.insight || "Your sleep and mood data is being analyzed.";
  const sleepTrend = data?.sleep_quality_trend || "No recent sleep trends.";
  const moodTrend = data?.mood_consistency || "Keep logging to see consistency trends.";
  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        .neo-shadow-active:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .neo-button:active {
            transform: translate(2px, 2px);
            box-shadow: none;
        }
        .sticker-container {
            border: 1.5px solid #1A1A1A;
        }
        @keyframes drawLine {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
        }
        .chart-line {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawLine 2s ease-out forwards;
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h3 className="font-display-lg text-4xl md:text-display-lg text-ink-black">Sleep vs Mood</h3>
          <p className="font-body-lg text-on-surface-variant">Analyzing your recovery metrics for Feb 12 - Feb 16</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="sticker-container bg-white px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="font-label-bold text-label-bold">Sleep (Hrs)</span>
          </div>
          <div className="sticker-container bg-white px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="w-3 h-1 bg-accent-orange border border-ink-black"></div>
            <span className="font-label-bold text-label-bold">Mood Score (1-10)</span>
          </div>
        </div>
      </div>

      {/* PRIMARY DATA VISUALIZATION GRID */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* DUAL AXIS CHART CONTAINER */}
        <div className="col-span-12 lg:col-span-8 sticker-container bg-white rounded-[32px] p-6 md:p-8 neo-shadow overflow-hidden relative">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-headline-sm text-2xl">Weekly Correlation</h4>
            <div className="flex gap-2">
              <button className="sticker-container px-3 py-1 rounded-lg text-label-md font-bold bg-surface-container-low">Week</button>
              <button className="sticker-container px-3 py-1 rounded-lg text-label-md font-bold hover:bg-surface-container-high transition-colors">Month</button>
            </div>
          </div>
          
          {/* SVG CHART */}
          <div className="w-full h-80 relative overflow-x-auto">
            <div className="min-w-[600px] h-full relative">
              {/* Y-Axis Labels (Left - Hours) */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-label-bold text-outline text-[10px]">
                <span>10h</span><span>8h</span><span>6h</span><span>4h</span><span>2h</span><span>0h</span>
              </div>
              
              {/* Y-Axis Labels (Right - Mood) */}
              <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-label-bold text-accent-orange text-[10px]">
                <span>10</span><span>8</span><span>6</span><span>4</span><span>2</span><span>0</span>
              </div>
              
              {/* Chart Canvas */}
              <svg className="w-full h-full pl-10 pr-10" viewBox="0 0 800 300" preserveAspectRatio="none">
                {/* Horizontal Grid Lines */}
                <line stroke="#E4E1E8" strokeWidth="1" x1="0" x2="800" y1="0" y2="0"></line>
                <line stroke="#E4E1E8" strokeWidth="1" x1="0" x2="800" y1="60" y2="60"></line>
                <line stroke="#E4E1E8" strokeWidth="1" x1="0" x2="800" y1="120" y2="120"></line>
                <line stroke="#E4E1E8" strokeWidth="1" x1="0" x2="800" y1="180" y2="180"></line>
                <line stroke="#E4E1E8" strokeWidth="1" x1="0" x2="800" y1="240" y2="240"></line>
                
                {/* Bar Chart (Sleep) */}
                <rect className="sticker-container transition-all duration-300 hover:opacity-80 cursor-pointer" fill="#002da5" height="225" rx="4" width="40" x="50" y="75"></rect>
                <rect className="sticker-container transition-all duration-300 hover:opacity-80 cursor-pointer" fill="#002da5" height="186" rx="4" width="40" x="200" y="114"></rect>
                <rect className="sticker-container transition-all duration-300 hover:opacity-80 cursor-pointer" fill="#002da5" height="255" rx="4" width="40" x="350" y="45"></rect>
                <rect className="sticker-container transition-all duration-300 hover:opacity-80 cursor-pointer" fill="#002da5" height="165" rx="4" width="40" x="500" y="135"></rect>
                <rect className="sticker-container transition-all duration-300 hover:opacity-80 cursor-pointer" fill="#002da5" height="270" rx="4" width="40" x="650" y="30"></rect>
                
                {/* Line Chart (Mood) */}
                <polyline className="chart-line" fill="none" points="70,120 220,180 370,60 520,240 670,40" stroke="#ba1a1a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></polyline>
                
                {/* Mood Points */}
                <circle cx="70" cy="120" fill="#ffdad6" r="6" stroke="#1A1A1A" strokeWidth="2" className="transition-all duration-300 hover:stroke-[4px] hover:opacity-80 cursor-pointer"></circle>
                <circle cx="220" cy="180" fill="#ffdad6" r="6" stroke="#1A1A1A" strokeWidth="2" className="transition-all duration-300 hover:stroke-[4px] hover:opacity-80 cursor-pointer"></circle>
                <circle cx="370" cy="60" fill="#ffdad6" r="6" stroke="#1A1A1A" strokeWidth="2" className="transition-all duration-300 hover:stroke-[4px] hover:opacity-80 cursor-pointer"></circle>
                <circle cx="520" cy="240" fill="#ffdad6" r="6" stroke="#1A1A1A" strokeWidth="2" className="transition-all duration-300 hover:stroke-[4px] hover:opacity-80 cursor-pointer"></circle>
                <circle cx="670" cy="40" fill="#ffdad6" r="6" stroke="#1A1A1A" strokeWidth="2" className="transition-all duration-300 hover:stroke-[4px] hover:opacity-80 cursor-pointer"></circle>
              </svg>
              
                {/* X-Axis Labels */}
              <div className="flex justify-between pl-12 pr-12 md:pl-16 md:pr-16 mt-4 font-label-bold text-on-surface-variant">
                {dataPoints.map(dp => <span key={dp.day}>{dp.day}</span>)}
              </div>
            </div>
          </div>
        </div>

        {/* BENTO RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* AI FINDING CARD */}
          <div className="sticker-container bg-secondary-fixed rounded-[32px] p-6 md:p-8 neo-shadow relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-container/50 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary font-bold">auto_awesome</span>
              <span className="font-label-bold uppercase tracking-wider text-secondary">AI Observation</span>
            </div>
            <h4 className="font-headline-sm text-2xl text-ink-black mb-2">Sleep = Happiness</h4>
            <p className="font-body-lg font-bold text-ink-black leading-tight">{insight}</p>
            <div className="mt-6 flex justify-end">
              <span className="material-symbols-outlined text-4xl opacity-20">trending_up</span>
            </div>
          </div>
          
          {/* SUPPORTING MODULE: MOOD CONSISTENCY */}
          <div className="sticker-container bg-accent-sage rounded-[32px] p-6 md:p-8 flex flex-col justify-between h-[200px]">
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-label-bold text-lg">Mood Consistency</h4>
                <span className="material-symbols-outlined">sync_alt</span>
              </div>
              <p className="font-display-lg text-4xl font-bold mt-2 text-ink-black">72%</p>
            </div>
            <div>
              <div className="w-full bg-white/50 h-3 border-[1.5px] border-ink-black rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[72%]"></div>
              </div>
              <p className="text-xs mt-2 font-label-md">Higher than 60% of your typical weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* SECONDARY INSIGHTS ROW */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* SLEEP QUALITY TRENDS */}
        <div className="col-span-12 md:col-span-6 sticker-container bg-white rounded-[32px] p-6 md:p-8 neo-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-accent-pink border-[1.5px] border-ink-black rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bedtime</span>
            </div>
            <h4 className="font-headline-sm text-2xl">Sleep Quality Trends</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black/5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">dark_mode</span>
                <span className="font-label-bold">Deep Sleep Avg</span>
              </div>
              <div className="text-right">
                <span className="font-bold">2h 15m</span>
                <span className="text-xs text-primary block">+12% vs last week</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black/5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary">flare</span>
                <span className="font-label-bold">REM Duration</span>
              </div>
              <div className="text-right">
                <span className="font-bold">1h 45m</span>
                <span className="text-xs text-on-surface-variant block">Stable</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black/5 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error">warning</span>
                <span className="font-label-bold">Interruptions</span>
              </div>
              <div className="text-right">
                <span className="font-bold">2/night</span>
                <span className="text-xs text-error block">-15% improvement</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CORRELATION SUMMARY */}
        <div className="col-span-12 md:col-span-6 sticker-container bg-accent-orange rounded-[32px] p-6 md:p-8 neo-shadow flex flex-col">
          <h4 className="font-headline-sm text-2xl mb-4">The Verdict</h4>
          <p className="font-body-lg mb-8 leading-relaxed">Your data suggests a <span className="font-bold underline decoration-ink-black">Strong Positive Correlation</span> between sleep duration and emotional stability. {moodTrend}</p>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <div className="bg-white border-[1.5px] border-ink-black p-4 rounded-2xl hover:scale-105 transition-transform">
              <p className="text-xs font-label-bold text-on-surface-variant uppercase">Best Day</p>
              <p className="font-display-lg text-2xl text-primary mt-1 mb-1">Friday</p>
              <p className="text-[10px] md:text-xs font-label-md">9.0h Sleep • 9/10 Mood</p>
            </div>
            <div className="bg-white border-[1.5px] border-ink-black p-4 rounded-2xl hover:scale-105 transition-transform">
              <p className="text-xs font-label-bold text-on-surface-variant uppercase">Worst Day</p>
              <p className="font-display-lg text-2xl text-error mt-1 mb-1">Thursday</p>
              <p className="text-[10px] md:text-xs font-label-md">5.5h Sleep • 3/10 Mood</p>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-ink-black text-white rounded-xl font-label-bold neo-button transition-all hover:bg-ink-black/90 active:translate-y-1 active:translate-x-1">
            View Suggested Bedtime Routine
          </button>
        </div>
      </div>

      {/* BOTTOM CALL TO ACTION */}
      <div className="sticker-container bg-primary-container p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
        <div className="flex gap-4 md:gap-6 items-center">
          <div className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-full flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">lightbulb</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-xl md:text-2xl text-white">Want to stabilize your mood further?</h4>
            <p className="text-primary-fixed text-body-md opacity-90 mt-1">Our AI recommends adjusting your caffeine cutoff to 2:00 PM.</p>
          </div>
        </div>
        <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl border-[1.5px] border-ink-black neo-shadow font-label-bold neo-button whitespace-nowrap transition-all w-full md:w-auto hover:bg-secondary-fixed">
          Update My Goals
        </button>
      </div>
      
    </div>
  );
};

export default SleepMoodCorrelation;
