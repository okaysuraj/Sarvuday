import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { format, parseISO, startOfWeek, addDays, isSameDay } from 'date-fns';

const AvailabilityManagement = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Weekly structure for UI
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Example active state per day for UI toggle
  const [activeDays, setActiveDays] = useState({
    Monday: true, Tuesday: true, Wednesday: false, Thursday: true, Friday: true
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/counsellor/availability');
      setSlots(response.data.slots || []);
    } catch (err) {
      console.error('Error fetching availability', err);
      setError('Failed to load availability slots.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // In a real app, this would iterate over the UI state and make POST /counsellor/availability
    // requests for each block. For now, we simulate saving.
    alert('Schedule saved successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .neo-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(26, 26, 26, 1); }
        .active-neo-press:active { transform: translate(2px, 2px); box-shadow: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 10px; }
      `}</style>

      {/* Header Section */}
      <div className="mb-10">
        <h2 className="font-display-lg text-headline-md mb-2">Availability Management</h2>
        <p className="text-on-surface-variant max-w-2xl">Configure your professional schedule, set buffer zones between sessions, and manage your global time zone to ensure seamless patient booking experience.</p>
        
        {error && (
            <div className="mt-4 p-4 bg-error-container text-on-error-container rounded-xl border border-error">
                {error}
            </div>
        )}
      </div>

      {/* Side-by-Side Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Weekly Working Hours */}
        <div className="lg:col-span-8 bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 neo-shadow">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="font-headline-sm text-headline-sm">Weekly Working Hours</h3>
              <p className="text-on-surface-variant text-sm">Set your active hours for each day of the week.</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold hover:underline">
              <span className="material-symbols-outlined">content_copy</span>
              Copy to All
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {daysOfWeek.map(day => (
              <div key={day} className={`flex flex-wrap items-center gap-4 md:gap-6 p-4 border-[1.5px] border-ink-black rounded-2xl ${activeDays[day] ? 'bg-white' : 'bg-surface-container-lowest'}`}>
                <div className="flex items-center gap-4 w-32">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={activeDays[day]} 
                      onChange={() => setActiveDays({...activeDays, [day]: !activeDays[day]})}
                    />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <span className="font-bold">{day}</span>
                </div>

                {activeDays[day] ? (
                  <div className="flex flex-wrap items-center gap-3 flex-grow">
                    <input type="time" defaultValue="09:00" className="bg-cream-bg border-[1.5px] border-ink-black rounded-lg px-3 py-2 font-medium focus:ring-0 focus:border-primary" />
                    <span className="text-on-surface-variant">to</span>
                    <input type="time" defaultValue="17:00" className="bg-cream-bg border-[1.5px] border-ink-black rounded-lg px-3 py-2 font-medium focus:ring-0 focus:border-primary" />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 flex-grow">
                    <div className="bg-accent-sage/30 px-4 py-2 rounded-xl border-dashed border-[1.5px] border-ink-black/20 text-on-surface-variant italic">
                      Unavailable
                    </div>
                  </div>
                )}

                {activeDays[day] ? (
                  <button className="p-2 text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                ) : (
                  <button className="p-2 text-primary font-bold hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">add_circle</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t-[1.5px] border-ink-black flex justify-end gap-4">
            <button className="px-6 py-2 rounded-xl border-[1.5px] border-ink-black font-bold hover:bg-surface-variant transition-all">Cancel</button>
            <button onClick={handleSave} className="px-8 py-2 bg-primary text-white border-[1.5px] border-ink-black rounded-xl font-bold neo-shadow-sm active-neo-press transition-all">Save Schedule</button>
          </div>
        </div>

        {/* Right Panel: Global Settings & Support */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Buffer Time Settings */}
          <div className="bg-accent-sage/30 border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 neo-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">timer</span>
              <h3 className="font-headline-sm text-lg">Buffer Time</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block font-label-bold text-xs uppercase mb-3 text-on-surface-variant">Before Appointment</label>
                <select className="w-full bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-medium focus:ring-0 focus:border-primary">
                  <option>No buffer</option>
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                  <option>15 minutes</option>
                </select>
              </div>
              <div>
                <label className="block font-label-bold text-xs uppercase mb-3 text-on-surface-variant">After Appointment</label>
                <select className="w-full bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-medium focus:ring-0 focus:border-primary">
                  <option>No buffer</option>
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Time Zone Settings */}
          <div className="bg-accent-pink/30 border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 neo-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">public</span>
              <h3 className="font-headline-sm text-lg">Time Zone</h3>
            </div>
            <p className="text-sm text-on-surface-variant mb-4">Your current time zone is used to sync with patient calendars.</p>
            <select className="w-full bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-medium focus:ring-0 focus:border-primary">
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT-06:00) Central Time</option>
              <option>(GMT-07:00) Mountain Time</option>
              <option>(GMT-08:00) Pacific Time</option>
            </select>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">info</span>
              Automatically detect time zone
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManagement;
