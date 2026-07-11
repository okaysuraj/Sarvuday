import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [telemetry, setTelemetry] = useState([60, 65, 55, 80, 75, 90, 85, 70, 50, 95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => prev.map(currentHeight => {
        const variance = Math.floor(Math.random() * 20) - 10;
        let newHeight = currentHeight + variance;
        if (newHeight < 30) newHeight = 35;
        if (newHeight > 95) newHeight = 90;
        return newHeight;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-gutter">
      <style>{`
        .neo-shadow-large {
            box-shadow: 8px 8px 0px 0px rgba(26, 26, 26, 1);
        }
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            transition: all 0.2s ease;
        }
        .neo-button-active:active {
            transform: translate(2px, 2px);
            box-shadow: none;
        }
      `}</style>

      {/* Hero Stats Row (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* User Growth */}
        <div className="sticker-card neo-shadow-large p-6 rounded-[32px] bg-accent-pink flex flex-col justify-between">
          <div>
            <p className="font-label-bold text-on-surface-variant uppercase text-xs mb-1">Total Community</p>
            <h3 className="font-display-lg text-display-lg text-ink-black">42,892</h3>
          </div>
          <div className="flex items-center gap-1 text-primary font-label-bold mt-4">
            <span className="material-symbols-outlined">trending_up</span>
            <span>+12.4%</span>
          </div>
        </div>

        {/* Active Therapists */}
        <div className="sticker-card neo-shadow-large p-6 rounded-[32px] bg-secondary-fixed flex flex-col justify-between">
          <div>
            <p className="font-label-bold text-on-surface-variant uppercase text-xs mb-1">Licensed Staff</p>
            <h3 className="font-display-lg text-display-lg text-ink-black">1,248</h3>
          </div>
          <div className="flex items-center gap-1 text-ink-black font-label-bold mt-4">
            <span className="material-symbols-outlined">groups</span>
            <span>Active Now</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="sticker-card neo-shadow-large p-6 rounded-[32px] bg-accent-sage flex flex-col justify-between col-span-1 md:col-span-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-label-bold text-on-surface-variant uppercase text-xs mb-1">Monthly Revenue</p>
              <h3 className="font-display-lg text-display-lg text-ink-black">$244,900</h3>
            </div>
            <div className="h-16 w-32 relative">
              {/* Mini Sparkline visualization placeholder */}
              <div className="absolute inset-0 flex items-end gap-1">
                <div className="w-2 bg-primary h-[40%] border border-black"></div>
                <div className="w-2 bg-primary h-[60%] border border-black"></div>
                <div className="w-2 bg-primary h-[50%] border border-black"></div>
                <div className="w-2 bg-primary h-[80%] border border-black"></div>
                <div className="w-2 bg-primary h-[90%] border border-black"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-md mt-4">
            <span className="material-symbols-outlined">info</span>
            <span>Forecasted: +5% from previous month</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Safety Snapshot Column */}
        <div className="lg:col-span-2 space-y-gutter">
          <div className="sticker-card bg-white p-8 rounded-[48px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h4 className="font-headline-md text-headline-md text-ink-black">Safety Snapshot</h4>
                <p className="text-on-surface-variant font-body-md">Live monitoring of high-priority intervention triggers.</p>
              </div>
              <button className="sticker-card neo-shadow px-6 py-2 bg-primary text-white font-label-bold rounded-full hover:bg-primary/90 hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
                View Full Logs
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              {/* Critical Incident A */}
              <div className="sticker-card bg-accent-orange p-6 rounded-[24px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white border-[1.5px] border-ink-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-error">warning</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-ink-black">Suicidal Ideation</p>
                    <p className="text-xs text-on-error-container">Critical Priority</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-display-lg text-4xl text-ink-black">04</span>
                  <span className="font-label-md bg-white px-3 py-1 rounded-full border border-ink-black">Active Alerts</span>
                </div>
              </div>

              {/* Critical Incident B */}
              <div className="sticker-card bg-primary-fixed p-6 rounded-[24px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white border-[1.5px] border-ink-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">block</span>
                  </div>
                  <div>
                    <p className="font-label-bold text-ink-black">Harassment</p>
                    <p className="text-xs text-on-surface-variant">Moderate Risk</p>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-display-lg text-4xl text-ink-black">12</span>
                  <span className="font-label-md bg-white px-3 py-1 rounded-full border border-ink-black">In Moderation</span>
                </div>
              </div>
            </div>

            {/* Real-time Health Telemetry Visualizer */}
            <div className="mt-gutter p-6 bg-surface-container rounded-[24px] border-[1.5px] border-ink-black">
              <h5 className="font-label-bold text-on-surface-variant mb-4 uppercase text-xs tracking-widest">Platform Health Telemetry</h5>
              <div className="h-32 w-full flex items-end gap-2 overflow-hidden">
                {/* Dynamic bar placeholder */}
                {telemetry.map((h, i) => (
                  <div key={i} className={`flex-grow border-[1.5px] border-ink-black rounded-t-lg transition-all duration-500 ${i === 8 ? 'bg-secondary' : 'bg-primary'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-label-md text-on-surface-variant">
                <span>00:00</span>
                <span>Session Throughput (Peak: 14.2k/s)</span>
                <span>23:59</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Risk Level Sidebar */}
        <div className="space-y-gutter">
          <div className="sticker-card bg-white p-8 rounded-[48px] h-full flex flex-col">
            <div className="mb-8">
              <h4 className="font-headline-sm text-headline-sm text-ink-black">AI Risk Distribution</h4>
              <p className="text-on-surface-variant text-sm mt-1">Real-time classification by GuardBot AI</p>
            </div>
            
            <div className="space-y-6 flex-grow">
              {/* High Risk Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-bold text-error">High Risk</span>
                  <span className="font-label-md">1.2%</span>
                </div>
                <div className="h-4 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-error transition-all duration-1000" style={{ width: '12%' }}></div>
                </div>
              </div>

              {/* Monitoring Needed */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-bold text-secondary">Monitoring Needed</span>
                  <span className="font-label-md">18.5%</span>
                </div>
                <div className="h-4 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-secondary transition-all duration-1000" style={{ width: '45%' }}></div>
                </div>
              </div>

              {/* Stable */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-bold text-primary">Stable</span>
                  <span className="font-label-md">80.3%</span>
                </div>
                <div className="h-4 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-surface-container-low rounded-[24px] border-[1.5px] border-ink-black">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">psychology</span>
                <p className="text-xs italic leading-relaxed">AI prediction accuracy for suicide risk has increased to 94.2% following last night's model update.</p>
              </div>
            </div>

            {/* System Audit Log Fragment */}
            <div className="mt-8 space-y-4">
              <h5 className="font-label-bold text-xs uppercase text-on-surface-variant tracking-widest border-b-[1.5px] border-ink-black pb-2">Recent Activities</h5>
              
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-error"></div>
                <span className="text-sm font-label-md truncate">New Critical Incident #8921</span>
                <span className="text-[10px] ml-auto text-on-surface-variant">2m ago</span>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-label-md truncate">Therapist #203 Verified</span>
                <span className="text-[10px] ml-auto text-on-surface-variant">14m ago</span>
              </div>
              
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-sm font-label-md truncate">Payouts Processed (Manual)</span>
                <span className="text-[10px] ml-auto text-on-surface-variant">1h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Center Real-time Feed */}
      <div className="sticker-card bg-ink-black text-white p-8 rounded-[48px] flex flex-col md:flex-row items-center justify-between overflow-hidden relative gap-6">
        <div className="absolute right-0 top-0 opacity-20 pointer-events-none hidden md:block">
          <span className="material-symbols-outlined text-[200px]">emergency_share</span>
        </div>
        
        <div className="z-10">
          <h3 className="font-headline-md text-headline-md text-accent-pink">Crisis Response Center</h3>
          <p className="font-body-lg text-surface-variant mt-2 max-w-xl">
            3 rapid-response teams are currently active. Average connection time is <span className="font-label-bold text-secondary-fixed">24 seconds</span>.
          </p>
        </div>
        
        <div className="z-10 flex gap-4 w-full md:w-auto">
          <button className="w-full md:w-auto bg-error px-8 py-4 border-[1.5px] border-white rounded-full font-label-bold text-lg hover:-translate-y-1 transition-transform">
            Manage Escalations
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
