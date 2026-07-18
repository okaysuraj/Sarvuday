import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const GoalTracking = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/goals');
        setGoals(response.data);
      } catch (error) {
        console.error('Error fetching goals', error);
        toast.error('Failed to load active goals.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading goals...</div>;
  }

  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px #1A1A1A;
        }
        
        .neo-button-active:active {
            transform: translate(2px, 2px);
            box-shadow: 0px 0px 0px 0px #1A1A1A;
        }

        .sticker-card {
            border: 1.5px solid #1A1A1A;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .sticker-card:hover {
            transform: translateY(-4px);
            box-shadow: 6px 6px 0px 0px #1A1A1A;
        }
      `}</style>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h3 className="font-display-lg text-4xl md:text-headline-md text-ink-black mb-2">Active Goals</h3>
            <p className="text-body-lg text-on-surface-variant max-w-lg">Small steps lead to big changes. Keep your momentum going through consistent practice.</p>
          </div>
          <button className="bg-secondary-container border-[1.5px] border-ink-black px-6 py-3 rounded-full neo-shadow font-label-bold neo-button-active flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined">add</span>
            New Goal
          </button>
        </div>

        {/* Bento-style Goal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const progressPct = Math.round((goal.progress_current / goal.progress_total) * 100);
            
            // Just assigning some colors based on index for the UI look
            const themes = [
              { bg: 'bg-primary-fixed', icon: 'edit_note', iconColor: 'text-primary', bar: 'bg-primary-container' },
              { bg: 'bg-accent-pink', icon: 'air', iconColor: 'text-tertiary', bar: 'bg-tertiary-container' },
              { bg: 'bg-white', icon: 'psychology', iconColor: 'text-ink-black', bar: 'bg-secondary-fixed-dim' },
              { bg: 'bg-accent-orange', icon: 'directions_run', iconColor: 'text-error', bar: 'bg-error-container' }
            ];
            const theme = themes[index % themes.length];
            
            return (
              <div key={goal.id} className={`sticker-card ${theme.bg} p-8 rounded-[40px] flex flex-col justify-between min-h-[320px] ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center neo-shadow">
                    <span className={`material-symbols-outlined ${theme.iconColor} scale-150`}>{theme.icon}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-lg flex items-center justify-center hover:bg-surface-container hover:scale-105 transition-all">
                      <span className="material-symbols-outlined text-on-surface-variant">edit</span>
                    </button>
                    <button className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-lg flex items-center justify-center hover:bg-surface-container hover:scale-105 transition-all">
                      <span className={`material-symbols-outlined ${theme.iconColor} font-bold`}>check</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-display-lg text-2xl md:text-headline-sm mb-1">{goal.title}</h4>
                  <div className="flex items-center gap-2 text-ink-black font-label-bold uppercase tracking-wider text-xs">
                    <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>local_fire_department</span>
                    {goal.streak} Day Streak
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-2 font-label-bold text-on-surface">
                    <span>Progress</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-4 w-full bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <div className={`h-full ${theme.bar} transition-all duration-1000`} style={{width: `${progressPct}%`}}></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Decorative Card for Visual Balance */}
          <div className="sticker-card bg-secondary-fixed p-8 rounded-[40px] flex items-center justify-center text-center relative overflow-hidden min-h-[320px]">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-5xl mb-4">psychology_alt</span>
              <h5 className="font-headline-sm text-2xl mb-2">Consistency is Key</h5>
              <p className="text-body-md font-medium text-on-secondary-container">Research shows it takes 66 days to form a new habit. You're doing great!</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[160px]">compost</span>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <section className="mt-12 border-t-[1.5px] border-ink-black pt-8">
        <h3 className="font-display-lg text-3xl md:text-headline-md text-ink-black mb-8">Milestones Reached</h3>
        
        <div className="flex flex-wrap gap-8">
          {/* Trophy Item 1 */}
          <div className="flex flex-col items-center gap-3 w-32">
            <div className="w-24 h-24 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center neo-shadow relative group hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-secondary-fixed-dim text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>emoji_events</span>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
              </div>
            </div>
            <span className="text-label-bold text-center">First 7-Day Streak</span>
          </div>

          {/* Trophy Item 2 (Incomplete) */}
          <div className="flex flex-col items-center gap-3 w-32 opacity-50 grayscale">
            <div className="w-24 h-24 rounded-full border-[1.5px] border-ink-black bg-surface-container-low flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-4xl" style={{fontVariationSettings: "'FILL' 0"}}>star</span>
            </div>
            <span className="text-label-bold text-center">30 Sessions Done</span>
          </div>

          {/* Trophy Item 3 */}
          <div className="flex flex-col items-center gap-3 w-32">
            <div className="w-24 h-24 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center neo-shadow relative group hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-accent-orange text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>social_leaderboard</span>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
              </div>
            </div>
            <span className="text-label-bold text-center">Mindfulness Master</span>
          </div>

          {/* Trophy Item 4 */}
          <div className="flex flex-col items-center gap-3 w-32">
            <div className="w-24 h-24 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center neo-shadow relative group hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>workspace_premium</span>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full border-[1.5px] border-ink-black flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
              </div>
            </div>
            <span className="text-label-bold text-center">Early Bird</span>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full border-[1.5px] border-ink-black neo-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all flex items-center justify-center z-50">
        <span className="material-symbols-outlined scale-125">insights</span>
      </button>

    </div>
  );
};

export default GoalTracking;
