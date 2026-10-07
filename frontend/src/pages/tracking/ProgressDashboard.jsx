import React from 'react';

const ProgressDashboard = () => {
  return (
    <div className="flex-1 pb-24 h-screen overflow-y-auto custom-scrollbar">
      

      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-on-surface mb-2">Progress Overview</h1>
          <p className="font-body-lg text-on-surface-variant">Here's a look at your wellbeing journey.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
          <span className="chip chip-inactive whitespace-nowrap">This Week</span>
          <span className="chip chip-active whitespace-nowrap">This Month</span>
          <span className="chip chip-inactive whitespace-nowrap">Last 3 Months</span>
        </div>
      </header>

      {/* Summary Grid (4 columns) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Sleep Quality */}
        <div className="bg-white p-6 md:p-8 rounded-xl border-outline shadow-subtle flex flex-col gap-2 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-primary text-3xl">bedtime</span>
            <span className="text-label-bold text-secondary px-2 py-1 bg-secondary-fixed rounded-lg border-outline">+12%</span>
          </div>
          <p className="text-on-surface-variant font-label-bold uppercase tracking-wider text-xs">Sleep Quality</p>
          <h3 className="font-headline-md text-3xl text-ink-black">7.2 hrs</h3>
          <div className="w-full bg-surface-container-high h-2 rounded-full border-outline mt-2 overflow-hidden">
            <div className="bg-primary-container h-full w-[72%] border-r border-outline"></div>
          </div>
        </div>

        {/* Average Mood */}
        <div className="bg-accent-sage p-6 md:p-8 rounded-xl border-outline shadow-subtle flex flex-col gap-2 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-on-surface text-3xl">sentiment_satisfied</span>
            <span className="material-symbols-outlined text-on-surface-variant">more_horiz</span>
          </div>
          <p className="text-on-surface-variant font-label-bold uppercase tracking-wider text-xs">Average Mood</p>
          <h3 className="font-headline-md text-3xl text-ink-black">Good</h3>
          <p className="text-label-md text-on-surface-variant">Consistent for 5 days</p>
        </div>

        {/* Stress Levels */}
        <div className="bg-surface p-6 md:p-8 rounded-xl border-outline shadow-subtle flex flex-col gap-2 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-tertiary text-3xl">psychology_alt</span>
            <div className="w-3 h-3 rounded-full bg-secondary-fixed-dim border-outline"></div>
          </div>
          <p className="text-on-surface-variant font-label-bold uppercase tracking-wider text-xs">Stress Levels</p>
          <h3 className="font-headline-md text-3xl text-ink-black">Moderate</h3>
          <p className="text-label-md text-on-surface-variant">Stable since Monday</p>
        </div>

        {/* Focus Score */}
        <div className="bg-secondary-container p-6 md:p-8 rounded-xl border-outline shadow-subtle flex flex-col gap-2 transition-transform">
          <div className="flex justify-between items-start mb-2">
            <span className="material-symbols-outlined text-on-secondary-container text-3xl">target</span>
            <span className="text-label-bold text-on-secondary-container">Peak</span>
          </div>
          <p className="text-on-surface-variant font-label-bold uppercase tracking-wider text-xs">Focus Score</p>
          <h3 className="font-headline-md text-3xl text-on-secondary-container">82/100</h3>
          <div className="w-full bg-white/40 h-2 rounded-full border-outline mt-2 overflow-hidden">
            <div className="bg-on-secondary-container h-full w-[82%] border-r border-outline"></div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout: 2/3 Content, 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Chart & Insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wellbeing Index Chart */}
          <div className="bg-white rounded-xl border-outline shadow-subtle overflow-hidden flex flex-col">
            <div className="p-6 md:p-8 border-b border-outline flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface-container-low">
              <div>
                <h3 className="font-headline-sm text-2xl text-ink-black">Wellbeing Index</h3>
                <p className="text-label-md text-on-surface-variant">Weekly performance tracking</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-white border-outline rounded-lg text-label-bold text-sm">
                  <span className="w-3 h-3 rounded-full bg-primary border-outline"></span> Overall
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border-outline rounded-lg text-label-bold text-sm">
                  <span className="w-3 h-3 rounded-full bg-secondary-fixed border-outline"></span> Mood
                </div>
              </div>
            </div>
            
            <div className="p-6 md:p-8 h-80 relative flex items-end gap-2 px-6 md:px-10 pt-10 overflow-hidden min-w-[500px]">
              {/* Simple SVG Line Chart Simulation using Neo-Memphis bars */}
              {[
                { label: 'MON', h1: '60%', h2: '45%', focus: true },
                { label: 'TUE', h1: '45%', h2: '55%', focus: false },
                { label: 'WED', h1: '85%', h2: '80%', focus: true, highlight: true },
                { label: 'THU', h1: '55%', h2: '60%', focus: false },
                { label: 'FRI', h1: '70%', h2: '75%', focus: false },
                { label: 'SAT', h1: '90%', h2: '85%', focus: false },
                { label: 'SUN', h1: '65%', h2: '70%', focus: false },
              ].map((day, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full relative group">
                  <div 
                    className={`w-full ${day.highlight ? 'bg-primary-container' : 'bg-primary-fixed-dim'} border-x border-t border-outline rounded-t-lg transition-all duration-300 hover:opacity-80`} 
                    style={{height: day.h1}}
                  >
                    {day.focus && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-ink-black text-white text-[10px] px-2 py-1 rounded hidden group-hover:block z-10 whitespace-nowrap">
                        Score: {parseInt(day.h1)}
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold text-center ${day.highlight ? 'text-primary' : ''}`}>{day.label}</span>
                </div>
              ))}

              {/* Overall Line Decoration */}
              <svg className="absolute inset-x-6 md:inset-x-10 bottom-[72px] h-[calc(100%-100px)] w-[calc(100%-48px)] md:w-[calc(100%-80px)] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 600 200">
                <polyline fill="none" points="20,150 110,180 200,80 290,160 380,120 470,60 560,130" stroke="#18181B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>
                <polyline fill="none" points="20,180 110,160 200,140 290,150 380,110 470,90 560,100" stroke="#ebc22e" strokeDasharray="8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
              </svg>
            </div>
          </div>

          {/* Month's Insight Module (AI Patterns) */}
          <div className="bg-surface p-6 md:p-8 rounded-xl border-outline shadow-subtle relative overflow-hidden">
            <div className="absolute -right-8 -top-8 opacity-20 pointer-events-none z-0">
              <span className="material-symbols-outlined text-[160px] text-tertiary">auto_awesome</span>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-white p-2 rounded-xl border-outline material-symbols-outlined text-tertiary">insights</span>
                <h3 className="font-headline-sm text-2xl text-ink-black">Month's AI Insight</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-body-lg text-on-surface font-medium leading-relaxed">
                    "We've noticed a strong correlation between your 7am morning walks and your focus score increasing by <span className="underline decoration-tertiary decoration-4">24%</span> during the subsequent work blocks."
                  </p>
                  <button className="bg-white px-6 py-3 border-outline rounded-xl text-label-bold shadow-subtle active:scale-[0.98] flex items-center gap-2 hover:bg-surface-container transition-colors">
                    View Data Pattern <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
                
                <div className="bg-white/50 border-outline rounded-2xl p-6 flex flex-col gap-4">
                  <h4 className="text-label-bold uppercase text-on-surface-variant">Recommended Action</h4>
                  <div className="flex items-start gap-4 bg-white p-4 rounded-xl border-outline hover:scale-[1.02] transition-transform">
                    <span className="material-symbols-outlined text-primary mt-1">calendar_today</span>
                    <div>
                      <p className="font-bold text-label-md text-base">Schedule Morning Walk</p>
                      <p className="text-label-md text-on-surface-variant mt-1">Tomorrow at 07:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Wins Sidebar */}
        <div className="h-full">
          <div className="bg-white border-outline rounded-xl shadow-subtle h-full flex flex-col max-h-[800px]">
            <div className="p-6 border-b border-outline flex justify-between items-center bg-surface-container-low shrink-0 rounded-t-xl">
              <h3 className="font-headline-sm text-xl text-ink-black">Recent Wins</h3>
              <span className="material-symbols-outlined text-on-secondary-container" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
            </div>
            
            <div className="p-6 flex-1 space-y-8 overflow-y-auto custom-scrollbar">
              {/* Win 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-fixed border-outline rounded-xl flex items-center justify-center shadow-subtle transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">stars</span>
                </div>
                <div>
                  <p className="font-bold text-label-md text-base">7-Day Streak!</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">You've tracked your mood every day this week.</p>
                  <span className="text-[10px] font-bold text-primary mt-2 block tracking-wider">YESTERDAY</span>
                </div>
              </div>
              
              {/* Win 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-accent-sage border-outline rounded-xl flex items-center justify-center shadow-subtle transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">self_improvement</span>
                </div>
                <div>
                  <p className="font-bold text-label-md text-base">Mindfulness Pro</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Completed 50 minutes of guided meditation.</p>
                  <span className="text-[10px] font-bold text-primary mt-2 block tracking-wider">OCT 24</span>
                </div>
              </div>
              
              {/* Win 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-surface border-outline rounded-xl flex items-center justify-center shadow-subtle transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <div>
                  <p className="font-bold text-label-md text-base">Stress Managed</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Maintained 'Low Stress' during a busy work week.</p>
                  <span className="text-[10px] font-bold text-primary mt-2 block tracking-wider">OCT 22</span>
                </div>
              </div>
              
              {/* Win 4 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-fixed border-outline rounded-xl flex items-center justify-center shadow-subtle transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
                <div>
                  <p className="font-bold text-label-md text-base">Goal Reached</p>
                  <p className="text-label-md text-on-surface-variant mt-1 leading-snug">Journaled consistently for 14 days straight.</p>
                  <span className="text-[10px] font-bold text-primary mt-2 block tracking-wider">OCT 20</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-surface-container-low border-t-[1.5px] border-outline rounded-b-xl shrink-0">
              <button className="w-full py-3 border-outline rounded-xl text-label-bold bg-white hover:bg-surface transition-colors active:scale-[0.98] shadow-subtle">
                View All Achievements
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Session / Quick Action Section */}
      <section className="bg-surface-container rounded-xl border-outline p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl border-outline overflow-hidden shadow-subtle shrink-0">
            <img 
              className="w-full h-full object-cover" 
              alt="Portrait of Dr. Aris" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD90-9a_EUbY2-_YGpU7EYXp9XTEwYcl5MTQcL3HWzL4Ou1WyM9xfV445Oxg0s-C6GSbNgCUl1pYXIUyI2GjMFSZwXMJQ1JYlJJeeMQUgh4gz3cbCQXOniWfj16PHPyckcgqBfLwWXzyQ5EWCAJ0mu6J0Hb65YPbntlKmM2eU0ape7LYfUGqE2ls57UXZ1hPHGMry5tmz5uvSELY3mZvWaPXiKpopTwQ6rnSdIfW3VSeuXfUaE_Y4ZndQ" 
            />
          </div>
          <div>
            <h4 className="font-headline-sm text-2xl text-ink-black mb-1">Session with Dr. Aris</h4>
            <p className="text-label-md text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">event</span> 
              Tomorrow, 02:30 PM - 03:30 PM
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 border-outline rounded-xl text-label-bold active:scale-[0.98] bg-white hover:bg-surface transition-colors shadow-subtle">
            Reschedule
          </button>
          <button className="flex-1 md:flex-none px-8 py-3 bg-primary text-on-primary border-outline rounded-xl text-label-bold shadow-subtle active:scale-[0.98] hover:bg-primary/90 transition-colors">
            Prepare Session
          </button>
        </div>
      </section>
      
    </div>
  );
};

export default ProgressDashboard;
