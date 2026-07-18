import React, { useState } from 'react';

const ReminderSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  
  const [schedule, setSchedule] = useState({
    h24: true,
    h1: true,
    start: false
  });

  return (
    <div className="flex flex-col gap-8">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .active-press:active { transform: translate(2px, 2px); box-shadow: none; }
      `}</style>
      
      {/* Page Header */}
      <section className="flex flex-col gap-2">
        <p className="text-body-lg text-on-surface-variant">Customize how and when you receive reminders for your upcoming therapy sessions.</p>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Delivery Channels Section */}
        <div className="col-span-1 md:col-span-5 bg-white border-[1.5px] border-ink-black rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col gap-6 neo-shadow">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-accent-pink rounded-2xl border-[1.5px] border-ink-black">
              <span className="material-symbols-outlined text-ink-black">notifications_active</span>
            </div>
            <h3 className="font-headline-sm text-2xl">Delivery</h3>
          </div>
          
          <div className="space-y-4 mt-2">
            {/* Push Toggle */}
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border-[1.5px] border-ink-black">
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold">Push Notifications</span>
                <span className="text-label-md text-on-surface-variant">Instant alerts on your device</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={pushEnabled}
                  onChange={() => setPushEnabled(!pushEnabled)}
                />
                <div className="w-14 h-8 bg-surface-container-high rounded-full border-[1.5px] border-ink-black peer-checked:bg-primary transition-colors"></div>
                <div className={`absolute left-[4px] top-[4px] w-6 h-6 bg-white border-[1.5px] border-ink-black rounded-full transition-transform ${pushEnabled ? 'translate-x-6' : ''}`}></div>
              </label>
            </div>
            
            {/* Email Toggle */}
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border-[1.5px] border-ink-black">
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold">Email Reminders</span>
                <span className="text-label-md text-on-surface-variant">Calendar invites and emails</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailEnabled}
                  onChange={() => setEmailEnabled(!emailEnabled)}
                />
                <div className="w-14 h-8 bg-surface-container-high rounded-full border-[1.5px] border-ink-black peer-checked:bg-primary transition-colors"></div>
                <div className={`absolute left-[4px] top-[4px] w-6 h-6 bg-white border-[1.5px] border-ink-black rounded-full transition-transform ${emailEnabled ? 'translate-x-6' : ''}`}></div>
              </label>
            </div>
          </div>
        </div>

        {/* Reminder Schedule Section */}
        <div className="col-span-1 md:col-span-7 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] md:rounded-[48px] p-6 md:p-8 flex flex-col gap-6 neo-shadow">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-secondary-container rounded-2xl border-[1.5px] border-ink-black">
              <span className="material-symbols-outlined text-ink-black">schedule</span>
            </div>
            <h3 className="font-headline-sm text-2xl">Reminder Schedule</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {/* 24h Before */}
            <div 
              className={`flex items-center gap-2 p-4 rounded-3xl border-[1.5px] border-ink-black hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer ${schedule.h24 ? 'bg-primary-fixed' : 'bg-white'}`}
              onClick={() => setSchedule(prev => ({...prev, h24: !prev.h24}))}
            >
              <input 
                type="checkbox" 
                checked={schedule.h24}
                onChange={() => {}}
                className="w-6 h-6 rounded-md border-[1.5px] border-ink-black text-primary focus:ring-0 cursor-pointer" 
              />
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold">24h before</span>
                <span className="text-label-md text-on-surface-variant">Early heads-up</span>
              </div>
            </div>
            
            {/* 1h Before */}
            <div 
              className={`flex items-center gap-2 p-4 rounded-3xl border-[1.5px] border-ink-black hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer ${schedule.h1 ? 'bg-primary-fixed' : 'bg-white'}`}
              onClick={() => setSchedule(prev => ({...prev, h1: !prev.h1}))}
            >
              <input 
                type="checkbox" 
                checked={schedule.h1}
                onChange={() => {}}
                className="w-6 h-6 rounded-md border-[1.5px] border-ink-black text-primary focus:ring-0 cursor-pointer" 
              />
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold">1h before</span>
                <span className="text-label-md text-on-surface-variant">Final preparation</span>
              </div>
            </div>
            
            {/* Session Start */}
            <div 
              className={`flex items-center gap-2 p-4 rounded-3xl border-[1.5px] border-ink-black hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform cursor-pointer sm:col-span-2 ${schedule.start ? 'bg-primary-fixed' : 'bg-white'}`}
              onClick={() => setSchedule(prev => ({...prev, start: !prev.start}))}
            >
              <input 
                type="checkbox" 
                checked={schedule.start}
                onChange={() => {}}
                className="w-6 h-6 rounded-md border-[1.5px] border-ink-black text-primary focus:ring-0 cursor-pointer" 
              />
              <div className="flex flex-col">
                <span className="font-label-bold text-label-bold">Session start</span>
                <span className="text-label-md text-on-surface-variant">Immediate link when the therapist arrives</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Policy Section */}
        <div className="col-span-1 md:col-span-12">
          <div className="bg-surface-container border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6">
              <span className="material-symbols-outlined text-4xl text-primary">policy</span>
              <div>
                <h4 className="font-headline-sm text-xl mb-1">Privacy & Cancellation Policy</h4>
                <p className="text-body-md text-on-surface-variant">Review our standard terms for rescheduling and data privacy.</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-primary text-white font-label-bold rounded-xl border-[1.5px] border-ink-black neo-shadow active-press whitespace-nowrap">
              View Policy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReminderSettings;
