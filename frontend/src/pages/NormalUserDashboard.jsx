import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const NormalUserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get('/user/dashboard');
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

  const userName = dashboardData?.user?.name?.split(' ')[0] || 'User';
  return (
    <div className="space-y-stack-lg">
      {/* Hero Section */}
      <section className="neo-card bg-accent-sage p-container-padding flex flex-col md:flex-row items-center justify-between gap-gutter overflow-hidden relative">
        <div className="z-10 max-w-lg space-y-stack-sm">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-ink-black">Good Morning, {userName}!</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">"Every day is a fresh start. Take a deep breath and step forward with purpose."</p>
          <button className="mt-4 neo-button-primary bg-primary text-on-primary px-6 py-3 rounded-xl font-label-bold text-label-bold flex items-center gap-2">
            <span>Log Today's Mood</span>
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 neo-card overflow-hidden bg-background">
          <img alt="Hero" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLtyVAa1ECaNGVdj2YLQx-5XVQpfLPTyYDAmrY4KEoVORawz7XD9HRyHJuxBVMTMeeR6LOm0QoOP2FUPR6uenL3YpeTS7bBj4HQ9SMl7hTaCHBoZWGlkCdi0_wQS-m_VHpxpLGFqLkq6D098b1S0rX2LLBPXYGnW7Og_7f8B-rZm8nxNzb30TpP75sD2NyZBiXv6KWOdRslgXkaky8Lb0Ei6OU0Ee2d6eS4WCRSV-FoQwMGDn6KuulWmv5qK" />
        </div>
      </section>

      {/* Bento Grid for Quick Actions & Insights */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* AI Chat Card */}
        <div className="col-span-1 md:col-span-5 neo-card bg-secondary-container p-container-padding flex flex-col justify-between neo-shadow relative group hover:-translate-y-1 transition-transform duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center border-[1.5px] border-ink-black">
              <span className="material-symbols-outlined text-primary text-3xl">smart_toy</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-ink-black">AI Chat Companion</h3>
            <p className="font-body-md text-body-md text-on-secondary-container">Need someone to talk to right now? Our AI companion is here 24/7 to listen and guide you through moments of stress.</p>
          </div>
          <Link to="/ai-chat" className="mt-8 neo-button-primary bg-surface text-ink-black px-6 py-3 rounded-xl font-label-bold text-label-bold w-full text-center hover:bg-surface-variant block">
            Start Chat
          </Link>
        </div>

        {/* Weekly Mood Snapshot */}
        <div className="col-span-1 md:col-span-7 neo-card bg-surface p-container-padding flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-sm text-headline-sm text-ink-black">Weekly Mood Snapshot</h3>
            <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              <span className="font-label-md text-label-md">View History</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div className="flex-grow flex items-end gap-4 h-48 mt-4 pt-4 border-b-[1.5px] border-ink-black relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-outline w-8">
              <span>Great</span>
              <span>Okay</span>
              <span>Low</span>
            </div>
            <div className="ml-8 flex-grow flex items-end justify-between h-full px-2">
              {/* Day Bars */}
              {[
                { day: 'Mon', h: '60%', color: 'bg-accent-sage', label: 'Good' },
                { day: 'Tue', h: '80%', color: 'bg-accent-orange', label: 'Great' },
                { day: 'Wed', h: '40%', color: 'bg-accent-sage', label: 'Okay' },
                { day: 'Thu', h: '70%', color: 'bg-accent-sage', label: 'Good' },
                { day: 'Fri', h: '50%', color: 'bg-accent-pink', label: 'Mixed' },
                { day: 'Sat', h: '30%', color: 'bg-surface-dim', label: 'Low', active: true },
                { day: 'Sun', h: '0%', color: '', label: '', empty: true }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer w-full">
                  {item.empty ? (
                    <div className="w-full max-w-[32px] h-[0%] border-[1.5px] border-dashed border-outline-variant rounded-t-lg"></div>
                  ) : (
                    <div className={`w-full max-w-[32px] h-[${item.h}] ${item.color} border-[1.5px] border-ink-black rounded-t-lg group-hover:bg-primary transition-colors relative`} style={{ height: item.h }}>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-ink-black text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</div>
                    </div>
                  )}
                  <span className={`font-label-md text-label-md ${item.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book & Activities */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter pb-stack-lg">
        {/* Book Therapist */}
        <Link to="/therapists" className="neo-card bg-accent-pink p-container-padding flex flex-row items-center gap-6 cursor-pointer hover:bg-tertiary-fixed transition-colors">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center border-[1.5px] border-ink-black shrink-0">
            <span className="material-symbols-outlined text-tertiary text-4xl">calendar_month</span>
          </div>
          <div className="flex-grow">
            <h3 className="font-headline-sm text-headline-sm text-ink-black">Book a Therapist</h3>
            <p className="font-body-md text-body-md text-tertiary-container mt-1">Schedule your next session easily.</p>
          </div>
          <div className="shrink-0">
            <span className="material-symbols-outlined text-ink-black bg-surface p-2 rounded-full border-[1.5px] border-ink-black">arrow_forward</span>
          </div>
        </Link>
        
        {/* AI Insights */}
        <div className="neo-card bg-surface p-container-padding flex flex-col justify-center">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-secondary text-3xl mt-1">lightbulb</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-ink-black">Weekly Insight</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 italic">"You've been logging higher stress levels on Wednesdays. Consider scheduling a short mindfulness break mid-week."</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NormalUserDashboard;
