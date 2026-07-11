import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const CounsellorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get('/counsellor/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>;
  }

  const counsellorName = dashboardData?.counsellor?.name || 'Counsellor';
  const todaySessions = dashboardData?.today_sessions || [];
  const totalEarnings = dashboardData?.total_earnings || 0;
  const completedSessions = dashboardData?.completed_sessions_count || 0;
  return (
    <div className="space-y-stack-lg">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #fbf8ff;
            border: 1.5px solid #1A1A1A;
            border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #002da5;
            border: 1.5px solid #1A1A1A;
            border-radius: 9999px;
        }
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 32px;
            padding: 32px;
            background: #ffffff;
            transition: all 0.2s ease;
        }
      `}</style>

      {/* Welcome Header */}
      <div className="mb-10">
        <h2 className="font-display-lg text-headline-md text-ink-black">Good Morning, Dr. {counsellorName}.</h2>
        <p className="text-on-surface-variant font-body-lg">You have {todaySessions.length} sessions scheduled for today.</p>
      </div>

      {/* Today's Sessions Horizontal Scroll */}
      <section className="mb-12">
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
          {/* Session Card 1 */}
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

          {/* Session Card 2 */}
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

          {/* Session Card 3 */}
          <div className="snap-start flex-shrink-0 w-80 sticker-card neo-shadow hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent-pink px-3 py-1 rounded-full border-[1.5px] border-ink-black text-[12px] font-bold">01:00 PM</span>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            <h4 className="font-headline-sm mb-1">Leo Rodriguez</h4>
            <p className="text-on-surface-variant text-sm mb-4">Intake • 60 mins</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary-container border border-ink-black"></span>
              <span className="text-xs font-label-bold">New Patient Enrollment</span>
            </div>
            <button className="w-full py-2 bg-white text-ink-black border-[1.5px] border-ink-black rounded-xl neo-shadow-sm neo-interaction font-label-bold">Review Intake</button>
          </div>
          
          {/* Session Card 4 */}
          <div className="snap-start flex-shrink-0 w-80 sticker-card neo-shadow hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-accent-sage px-3 py-1 rounded-full border-[1.5px] border-ink-black text-[12px] font-bold">02:30 PM</span>
              <span className="material-symbols-outlined text-outline">more_vert</span>
            </div>
            <h4 className="font-headline-sm mb-1">Emily Chen</h4>
            <p className="text-on-surface-variant text-sm mb-4">DBS Therapy • 50 mins</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 border border-ink-black"></span>
              <span className="text-xs font-label-bold">Progress: Significant Stable</span>
            </div>
            <button className="w-full py-2 bg-white text-ink-black border-[1.5px] border-ink-black rounded-xl neo-shadow-sm neo-interaction font-label-bold">View Prep Notes</button>
          </div>
        </div>
      </section>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Patient Highlights */}
        <section className="col-span-1 md:col-span-7">
          <div className="sticker-card h-full bg-white relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary text-on-primary p-2 rounded-xl border border-ink-black">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="font-headline-sm">Patient Highlights (AI-Powered)</h3>
            </div>
            
            <div className="space-y-6">
              {/* Alert Item 1 */}
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

              {/* Alert Item 2 */}
              <div className="p-4 bg-secondary-container/20 border-[1.5px] border-ink-black rounded-2xl flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-ink-black bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>pill</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-bold">Marcus Thorne</span>
                    <span className="text-[10px] bg-secondary-container text-ink-black px-2 py-0.5 rounded-full border border-ink-black uppercase">Medication</span>
                  </div>
                  <p className="text-body-md">System detected a missed morning dose of Sertraline. Automated nudge sent via app.</p>
                </div>
              </div>
              
              {/* Alert Item 3 */}
              <div className="p-4 bg-accent-sage/30 border-[1.5px] border-ink-black rounded-2xl flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-ink-black bg-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-bold">Emily Chen</span>
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full border border-ink-black uppercase">Task Complete</span>
                  </div>
                  <p className="text-body-md">Completed all 3 mindfulness exercises assigned this week. Engagement levels at 100%.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Pending Tasks */}
        <section className="col-span-1 md:col-span-5">
          <div className="sticker-card h-full bg-white">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-sm">Pending Tasks</h3>
              <span className="text-on-surface-variant font-label-md">8 items</span>
            </div>
            
            <div className="space-y-4">
              {/* Task 1 */}
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input type="checkbox" className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" />
                <div className="flex-grow">
                  <p className="font-label-bold peer-checked:line-through">Finalize Marcus Thorne Session Notes</p>
                  <p className="text-xs text-outline italic">Due by 12:00 PM</p>
                </div>
              </label>

              {/* Task 2 */}
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input type="checkbox" className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" />
                <div className="flex-grow">
                  <p className="font-label-bold">Update Sarah Jenkins Treatment Plan</p>
                  <p className="text-xs text-outline italic">Session follow-up required</p>
                </div>
              </label>

              {/* Task 3 */}
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input type="checkbox" defaultChecked className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" />
                <div className="flex-grow">
                  <p className="font-label-bold line-through text-outline">Submit insurance claim #8892</p>
                  <p className="text-xs text-outline italic">Completed at 08:15 AM</p>
                </div>
              </label>
              
              {/* Task 4 */}
              <label className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-surface-container transition-all group">
                <input type="checkbox" className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-primary" />
                <div className="flex-grow">
                  <p className="font-label-bold">Review Intake: Leo Rodriguez</p>
                  <p className="text-xs text-outline italic">New patient</p>
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
          <div className="col-span-1 md:col-span-4">
            <h3 className="font-headline-sm mb-2 opacity-80">Total Earnings</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-display-lg">${totalEarnings.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Sessions</span>
                <span>{completedSessions}</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-8">
            <div className="flex items-end justify-between h-48 px-4 gap-4">
              {/* Bar Chart */}
              {[
                { day: 'Mon', h: '45%', hoverH: '60%', bg: 'bg-secondary-container', opacity: '' },
                { day: 'Tue', h: '65%', hoverH: '75%', bg: 'bg-secondary-container', opacity: '' },
                { day: 'Wed', h: '85%', hoverH: '90%', bg: 'bg-secondary-container', opacity: '' },
                { day: 'Thu', h: '70%', hoverH: '80%', bg: 'bg-secondary-container', opacity: '' },
                { day: 'Fri', h: '30%', hoverH: '30%', bg: 'bg-accent-sage', opacity: 'opacity-50' },
                { day: 'Sat', h: '15%', hoverH: '15%', bg: 'bg-accent-sage', opacity: 'opacity-50' },
                { day: 'Sun', h: '10%', hoverH: '10%', bg: 'bg-accent-sage', opacity: 'opacity-50' }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                  <div className={`w-full ${item.bg} border-[1.5px] border-ink-black rounded-t-xl transition-all duration-500 shadow-[2px_0px_0px_0px_rgba(26,26,26,1)] ${item.opacity}`} style={{ height: item.h }}></div>
                  <span className="text-xs font-bold">{item.day}</span>
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
