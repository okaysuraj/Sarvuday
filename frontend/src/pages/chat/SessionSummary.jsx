import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SessionSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
        .neo-shadow-active:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0px 0px rgba(0,0,0,1); }
        .sticker-border { border: 1.5px solid #1A1A1A; }
      `}</style>
      
      {/* Header Actions */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="bg-accent-pink px-3 py-1 rounded-full border-[1.5px] border-ink-black font-label-bold text-label-bold uppercase tracking-wider mb-2 inline-block">Review Stage</span>
          <h3 className="font-headline-md text-headline-md">Session Summary</h3>
        </div>
        <button 
          onClick={handleSave}
          className="bg-primary text-on-primary rounded-xl px-8 py-4 border-[1.5px] border-ink-black neo-shadow neo-shadow-active font-label-bold text-label-bold flex items-center gap-2 transition-all"
        >
          {saving ? (
            <><span className="material-symbols-outlined animate-spin">sync</span> Saving...</>
          ) : (
            <><span className="material-symbols-outlined">download</span> Save Report</>
          )}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Summary Card */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 bg-white sticker-border rounded-[32px] p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-orange flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">calendar_today</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Date</p>
                <p className="font-headline-sm text-headline-sm">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-sage flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">schedule</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Duration</p>
                <p className="font-headline-sm text-headline-sm">52 Minutes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-pink flex items-center justify-center overflow-hidden font-bold text-xl">
                {appointment?.counsellor?.profile_pic ? (
                  <img src={appointment.counsellor.profile_pic} alt="Therapist" className="w-full h-full object-cover" />
                ) : (
                  appointment?.counsellor?.name?.charAt(0) || 'C'
                )}
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant">Therapist</p>
                <p className="font-headline-sm text-headline-sm line-clamp-1">{appointment?.counsellor?.name || 'Dr. Therapist'}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 p-4 bg-surface-container rounded-xl border-[1.5px] border-dashed border-ink-black">
            <p className="font-body-md italic text-on-surface-variant">"Patient showed significant progress in emotional regulation techniques during the closing phase."</p>
          </div>
        </div>
        
        {/* Mood Shift Visualization */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 bg-white sticker-border rounded-[32px] p-8">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-headline-sm text-headline-sm">Mood Shift Analysis</h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant">
                <span className="w-3 h-3 bg-error rounded-full"></span> Before
              </span>
              <span className="flex items-center gap-1 font-label-md text-label-md text-on-surface-variant">
                <span className="w-3 h-3 bg-secondary-container rounded-full border-[1px] border-ink-black"></span> After
              </span>
            </div>
          </div>
          
          {/* Visual Visualization Area */}
          <div className="relative h-64 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black overflow-hidden flex items-center justify-center mb-6">
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-around w-full px-4 sm:px-12 gap-4">
              {/* Anxious State */}
              <div className="flex flex-col items-center gap-2 sm:gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[1.5px] border-ink-black bg-error flex items-center justify-center neo-shadow">
                  <span className="material-symbols-outlined text-white text-5xl">sentiment_dissatisfied</span>
                </div>
                <span className="font-label-bold text-label-bold text-ink-black text-center">Anxious (8/10)</span>
              </div>
              
              {/* Arrow */}
              <div className="flex flex-col items-center rotate-90 sm:rotate-0">
                <span className="material-symbols-outlined text-4xl sm:text-6xl text-primary">trending_flat</span>
                <span className="font-label-md text-label-md text-primary font-bold hidden sm:block">Shift: +65% Calm</span>
              </div>
              
              {/* Calm State */}
              <div className="flex flex-col items-center gap-2 sm:gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[1.5px] border-ink-black bg-secondary-container flex items-center justify-center neo-shadow">
                  <span className="material-symbols-outlined text-on-secondary-container text-5xl">sentiment_satisfied</span>
                </div>
                <span className="font-label-bold text-label-bold text-ink-black text-center">Calm (3/10)</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-accent-sage/30 rounded-xl border-[1.5px] border-ink-black text-center sm:text-left">
              <p className="font-label-bold text-label-bold mb-1">Heart Rate</p>
              <p className="text-2xl font-bold">-12 BPM</p>
            </div>
            <div className="p-4 bg-accent-pink/30 rounded-xl border-[1.5px] border-ink-black text-center sm:text-left">
              <p className="font-label-bold text-label-bold mb-1">Breathing</p>
              <p className="text-2xl font-bold">Stabilized</p>
            </div>
            <div className="p-4 bg-secondary-container/30 rounded-xl border-[1.5px] border-ink-black text-center sm:text-left">
              <p className="font-label-bold text-label-bold mb-1">Coherence</p>
              <p className="text-2xl font-bold">High</p>
            </div>
          </div>
        </div>
        
        {/* Session Topics & Engagement */}
        <div className="col-span-1 md:col-span-12 lg:col-span-7 bg-white sticker-border rounded-[32px] p-8">
          <h4 className="font-headline-sm text-headline-sm mb-6">Key Discussion Topics</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl hover:bg-surface-container transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-lg border-[1.5px] border-ink-black bg-primary-fixed flex items-center justify-center font-bold">01</div>
              <div className="flex-grow">
                <p className="font-label-bold text-label-bold">Workplace Stress Management</p>
                <div className="w-full h-2 bg-surface-container-high rounded-full mt-2 border-[1px] border-ink-black overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">22 mins</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl hover:bg-surface-container transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-lg border-[1.5px] border-ink-black bg-accent-pink flex items-center justify-center font-bold">02</div>
              <div className="flex-grow">
                <p className="font-label-bold text-label-bold">Mindfulness & Grounding</p>
                <div className="w-full h-2 bg-surface-container-high rounded-full mt-2 border-[1px] border-ink-black overflow-hidden">
                  <div className="h-full bg-tertiary" style={{ width: '45%' }}></div>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">15 mins</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl hover:bg-surface-container transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-lg border-[1.5px] border-ink-black bg-secondary-fixed flex items-center justify-center font-bold">03</div>
              <div className="flex-grow">
                <p className="font-label-bold text-label-bold">Cognitive Reframing Exercises</p>
                <div className="w-full h-2 bg-surface-container-high rounded-full mt-2 border-[1px] border-ink-black overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '30%' }}></div>
                </div>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">10 mins</span>
            </div>
          </div>
        </div>
        
        {/* Next Steps/Homework */}
        <div className="col-span-1 md:col-span-12 lg:col-span-5 bg-accent-orange sticker-border rounded-[32px] p-8 flex flex-col justify-between">
          <div>
            <h4 className="font-headline-sm text-headline-sm mb-4">Post-Session Actions</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="mt-1 w-6 h-6 border-[1.5px] border-ink-black rounded bg-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xs">check</span>
                </div>
                <span className="font-body-md font-medium text-ink-black">Daily 10-minute box breathing practice.</span>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 w-6 h-6 border-[1.5px] border-ink-black rounded bg-white shrink-0"></div>
                <span className="font-body-md font-medium text-ink-black">Journal three cognitive distortions when they arise.</span>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 w-6 h-6 border-[1.5px] border-ink-black rounded bg-white shrink-0"></div>
                <span className="font-body-md font-medium text-ink-black">Schedule follow-up for Tuesday next week.</span>
              </li>
            </ul>
          </div>
          <button 
            onClick={() => navigate('/appointments')}
            className="mt-8 bg-ink-black text-white rounded-xl px-6 py-3 font-label-bold text-label-bold hover:bg-primary transition-colors"
          >
            Done
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default SessionSummary;
