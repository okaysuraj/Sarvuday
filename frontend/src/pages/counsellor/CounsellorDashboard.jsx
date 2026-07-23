import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const CounsellorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get('/counsellor/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        console.error('Error fetching dashboard', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-error-container text-on-error-container rounded-xl border border-error">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-stack-lg">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1); }
        .neo-interaction:active { transform: translate(2px, 2px); box-shadow: none !important; }
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fbf8ff; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #002da5; border-radius: 9999px; }
        .sticker-card { border: 1.5px solid #1A1A1A; border-radius: 32px; padding: 24px; background: #ffffff; transition: all 0.2s ease; }
      `}</style>

      {/* Welcome Header */}
      <div className="mb-6">
        <h2 className="font-display-lg text-headline-md text-ink-black">Good Morning, Counsellor.</h2>
        <p className="text-on-surface-variant font-body-lg">You have {dashboardData?.upcoming_appointments || 0} upcoming sessions.</p>
      </div>

      {/* Today's Sessions Horizontal Scroll (Mock Data for UI completeness) */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">schedule</span>
            Today's Sessions
          </h3>
          <button className="text-primary font-label-bold flex items-center gap-1 hover:underline">
            View Full Calendar <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
          {/* Mock Session Card */}
          <div className="snap-start flex-shrink-0 w-80 sticker-card neo-shadow hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent-sage px-3 py-1 rounded-full border-[1.5px] border-ink-black text-[12px] font-bold">09:00 AM</span>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            <h4 className="font-headline-sm mb-1">Marcus Thorne</h4>
            <p className="text-on-surface-variant text-sm mb-4">CBT • 50 mins</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary-container border border-ink-black"></span>
              <span className="text-xs font-label-bold">Follow-up: Trauma focus</span>
            </div>
            <button className="w-full py-2 bg-primary text-on-primary border-[1.5px] border-ink-black rounded-xl neo-shadow-sm neo-interaction font-label-bold">Start Session</button>
          </div>
          
          <div className="snap-start flex-shrink-0 w-80 sticker-card neo-shadow hover:-translate-y-1 transition-all border-accent-orange">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent-orange px-3 py-1 rounded-full border-[1.5px] border-ink-black text-[12px] font-bold">10:30 AM</span>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            <h4 className="font-headline-sm mb-1">Sarah Jenkins</h4>
            <p className="text-on-surface-variant text-sm mb-4">Anxiety Mgmt • 45 mins</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-error border border-ink-black"></span>
              <span className="text-xs font-label-bold text-error">Mood Alert: High Anxiety</span>
            </div>
            <button className="w-full py-2 bg-white text-ink-black border-[1.5px] border-ink-black rounded-xl neo-shadow-sm neo-interaction font-label-bold">View Prep Notes</button>
          </div>
        </div>
      </section>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Left Column: Stats & Highlights */}
        <section className="col-span-1 lg:col-span-7 flex flex-col gap-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="sticker-card neo-shadow bg-surface-container-lowest p-6">
              <span className="material-symbols-outlined text-primary mb-2 text-3xl">done_all</span>
              <h4 className="text-on-surface-variant font-label-md">Total Sessions</h4>
              <p className="text-3xl font-display-lg mt-1">{dashboardData?.total_sessions || 0}</p>
            </div>
            <div className="sticker-card neo-shadow bg-surface-container-lowest p-6">
              <span className="material-symbols-outlined text-secondary mb-2 text-3xl">star</span>
              <h4 className="text-on-surface-variant font-label-md">Average Rating</h4>
              <p className="text-3xl font-display-lg mt-1">{dashboardData?.average_rating || 'N/A'}</p>
            </div>
          </div>

          <div className="sticker-card h-full bg-white relative overflow-hidden neo-shadow">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary text-on-primary p-2 rounded-xl border border-ink-black">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="font-headline-sm">Patient Highlights (AI-Powered)</h3>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-accent-orange/30 border-[1.5px] border-ink-black rounded-2xl flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-ink-black bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>trending_down</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-bold">Sarah Jenkins</span>
                    <span className="text-[10px] bg-error text-white px-2 py-0.5 rounded-full border border-ink-black uppercase">Critical Dip</span>
                  </div>
                  <p className="text-body-md">Journal sentiment indicates a severe drop in mood scores over the last 48 hours. Recommend prioritizing during today's session.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Pending Tasks */}
        <section className="col-span-1 lg:col-span-5">
          <div className="sticker-card h-full bg-white neo-shadow">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-sm">Pending Tasks</h3>
              <span className="text-on-surface-variant font-label-md">2 items</span>
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" type="checkbox" />
                <div className="flex-grow">
                  <p className="font-label-bold group-checked:line-through">Finalize Marcus Thorne Session Notes</p>
                  <p className="text-xs text-outline italic">Due by 12:00 PM</p>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" type="checkbox" />
                <div className="flex-grow">
                  <p className="font-label-bold">Update Sarah Jenkins Treatment Plan</p>
                  <p className="text-xs text-outline italic">Session follow-up required</p>
                </div>
              </label>
            </div>
            <button className="w-full mt-6 py-3 border-[1.5px] border-dashed border-ink-black rounded-2xl text-on-surface-variant font-label-md hover:bg-surface-container transition-all">
                + Add Custom Task
            </button>
          </div>
        </section>
      </div>

      {/* Earnings This Week */}
      <section className="sticker-card bg-primary text-on-primary neo-shadow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4">
            <h3 className="font-headline-sm mb-2 opacity-80">Total Revenue</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl md:text-5xl font-display-lg">${dashboardData?.revenue || '0.00'}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Completion</span>
                <span>{dashboardData?.profile_completion || 0}%</span>
              </div>
              <div className="w-full h-3 bg-ink-black/20 rounded-full border border-ink-black overflow-hidden">
                <div className="h-full bg-secondary-container border-r border-ink-black" style={{ width: `${dashboardData?.profile_completion || 0}%`}}></div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-8">
            <div className="flex items-end justify-between h-48 px-4 gap-4 w-full">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="flex flex-col items-center gap-2 flex-1 group">
                  <div 
                    className={`w-full ${idx < 4 ? 'bg-secondary-container' : 'bg-accent-sage opacity-50'} border-[1.5px] border-ink-black rounded-t-xl group-hover:h-[60%] transition-all duration-500 shadow-[2px_0px_0px_0px_rgba(26,26,26,1)]`} 
                    style={{ height: `${Math.max(10, Math.random() * 80)}%` }}
                  ></div>
                  <span className="text-xs font-bold">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CounsellorDashboard;
