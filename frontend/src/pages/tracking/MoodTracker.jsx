import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { moodValue, recordedStreak } from '../../utils/healthMetrics';

const MoodTracker = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonthStr = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get('/user/tracking/mood/history');
        if (Array.isArray(res.data)) {
          setMoodLogs(res.data);
        }
      } catch (err) {
        console.error('Error fetching mood history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodHistory();
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Map mood logs by day of month
  const moodByDay = {};
  moodLogs.forEach((log) => {
    if (log.created_at) {
      const d = new Date(log.created_at);
      if (d.getFullYear() === currentDate.getFullYear() && d.getMonth() === currentDate.getMonth()) {
        const day = d.getDate();
        if (!moodByDay[day]) moodByDay[day] = log;
      }
    }
  });

  const getMoodVisual = (val) => {
    const num = moodValue(val);
    switch (num) {
      case 4:
        return { color: 'bg-emerald-100 border-emerald-300 text-emerald-800', icon: 'sentiment_very_satisfied', label: 'Elevated' };
      case 3:
        return { color: 'bg-teal-50 border-teal-200 text-teal-800', icon: 'sentiment_satisfied', label: 'Good' };
      case 2:
        return { color: 'bg-stone-50 border-stone-200 text-stone-700', icon: 'sentiment_neutral', label: 'Neutral' };
      case 1:
        return { color: 'bg-amber-50 border-amber-200 text-amber-800', icon: 'sentiment_dissatisfied', label: 'Low' };
      case 0:
        return { color: 'bg-rose-50 border-rose-200 text-rose-800', icon: 'sentiment_very_dissatisfied', label: 'Very Low' };
      default:
        return { color: 'bg-white border-stone-200 text-stone-400', icon: 'add', label: 'Unlogged' };
    }
  };

  const streakDays = recordedStreak(moodLogs);

  return (
    <div className="flex-1 w-full bg-background p-margin-mobile md:p-margin-desktop relative">
      {/* Month Selector */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display-lg text-3xl md:text-4xl text-primary font-bold">{currentMonthStr}</h2>
          <p className="text-sm text-on-surface-variant mt-1">Holistic emotional baseline and check-in timeline.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-2 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors bg-white"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-2 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors bg-white"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Header Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-center">
          <h3 className="font-bold text-xl text-on-surface mb-2">{monthNames[currentDate.getMonth()]} Reflection</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {moodLogs.length > 0
              ? `You have logged ${Object.keys(moodByDay).length} emotional check-ins this month. Tracking trends helps identify triggers and celebrate progress.`
              : 'Start logging daily mood check-ins to build your personal emotional baseline and receive AI wellness insights.'}
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate('/tracking/mood-check-in')}
              className="bg-primary text-on-primary text-xs font-bold px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Log Today's Mood
            </button>
          </div>
        </div>

        {/* Quick Stats Bento Card */}
        <div className="md:col-span-4 bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between shadow-subtle relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Check-in Consistency</p>
            <p className="text-3xl font-bold text-ink-black">{streakDays} Days</p>
          </div>
          <div className="flex justify-between items-end relative z-10 mt-4">
            <p className="text-xs text-stone-600 font-medium">Verified platform logs</p>
            <span className="material-symbols-outlined text-3xl text-rose-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
          </div>
        </div>
      </section>

      {/* Calendar Heatmap Grid */}
      <section className="bg-white border border-stone-200 rounded-xl p-4 sm:p-8">
        {loading ? (
          <div className="py-16 text-center text-sm text-on-surface-variant">Loading calendar check-ins...</div>
        ) : (
          <div>
            {/* Days Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-stone-400">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="py-2">{day}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {/* Empty leading offset */}
              {[...Array(firstDayOfWeek)].map((_, i) => (
                <div key={`offset-${i}`} className="aspect-square bg-stone-50/50 rounded-xl opacity-30" />
              ))}

              {/* Month Days */}
              {[...Array(daysInMonth)].map((_, idx) => {
                const dayNum = idx + 1;
                const log = moodByDay[dayNum];
                const visual = getMoodVisual(log?.mood);

                return (
                  <div
                    key={`day-${dayNum}`}
                    onClick={() => {
                      if (!log) navigate('/tracking/mood-check-in');
                    }}
                    title={log ? `Day ${dayNum}: ${visual.label} (Energy: ${log.energy_level}/10)` : `Day ${dayNum}: Click to check in`}
                    className={`aspect-square border rounded-xl flex flex-col p-2 cursor-pointer transition-all hover:scale-102 ${visual.color}`}
                  >
                    <span className="text-xs font-bold">{dayNum}</span>
                    <span className="mt-auto self-end material-symbols-outlined text-base sm:text-xl">
                      {visual.icon}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MoodTracker;
