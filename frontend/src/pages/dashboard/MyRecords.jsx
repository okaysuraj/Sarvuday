import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const MyRecords = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [moods, setMoods] = useState([]);
  const [journals, setJournals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const [moodRes, journalRes, apptRes, goalsRes] = await Promise.allSettled([
          axiosInstance.get('/user/tracking/mood/history'),
          axiosInstance.get('/user/tracking/journal'),
          axiosInstance.get('/user/appointments'),
          axiosInstance.get('/user/tracking/goals'),
        ]);

        if (moodRes.status === 'fulfilled' && Array.isArray(moodRes.value.data)) {
          setMoods(moodRes.value.data);
        }
        if (journalRes.status === 'fulfilled' && Array.isArray(journalRes.value.data)) {
          setJournals(journalRes.value.data);
        }
        if (apptRes.status === 'fulfilled' && Array.isArray(apptRes.value.data)) {
          setAppointments(apptRes.value.data);
        }
        if (goalsRes.status === 'fulfilled' && Array.isArray(goalsRes.value.data)) {
          setGoals(goalsRes.value.data);
        }
      } catch (err) {
        console.error('Error fetching records:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Merge items into unified timeline
  const timelineItems = [
    ...moods.map((m) => ({
      id: `mood-${m.id || m._id}`,
      type: 'mood',
      title: `Logged Mood: ${['Very Low', 'Low', 'Neutral', 'Good', 'Elevated'][parseInt(m.mood) - 1] || 'Neutral'}`,
      description: m.notes || `Energy level: ${m.energy_level}/10 • Anxiety: ${m.anxiety_level}/10 • Sleep: ${m.sleep_quality}`,
      timestamp: new Date(m.created_at || Date.now()),
      rawDate: m.created_at,
      icon: 'mood',
      badgeColor: 'bg-accent-sage text-on-background',
    })),
    ...journals.map((j) => ({
      id: `journal-${j.id || j._id}`,
      type: 'journal',
      title: 'Personal Journal Entry',
      description: j.content,
      timestamp: new Date(j.created_at || Date.now()),
      rawDate: j.created_at,
      icon: 'auto_stories',
      badgeColor: 'bg-primary-fixed text-on-background',
    })),
    ...appointments.map((a) => ({
      id: `appt-${a.appointment_id || a.id}`,
      type: 'session',
      title: `Appointment with ${a.counsellor?.name || 'Therapist'}`,
      description: `Status: ${a.status || 'Confirmed'} • Slot: ${a.slot?.slot_start_time || 'Scheduled'}`,
      timestamp: new Date(a.created_at || Date.now()),
      rawDate: a.created_at,
      icon: 'calendar_month',
      badgeColor: 'bg-surface-variant text-on-background',
      sessionId: a.session?.session_id,
    })),
  ].sort((a, b) => b.timestamp - a.timestamp);

  const filteredItems = timelineItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'moods') return item.type === 'mood';
    if (filter === 'sessions') return item.type === 'session';
    if (filter === 'journals') return item.type === 'journal';
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-margin-desktop bg-background flex flex-col lg:flex-row gap-gutter h-full">
      {/* Timeline Column */}
      <div className="flex-1 max-w-3xl">
        <header className="mb-stack-lg">
          <h1 className="font-display-lg text-display-lg text-on-background mb-4">Your Journey</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Track your progress, review past sessions, and celebrate your mental health milestones.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-stack-md">
          <button
            onClick={() => setFilter('all')}
            className={`font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all ${
              filter === 'all' ? 'bg-primary text-on-primary shadow-subtle' : 'bg-surface text-on-background hover:bg-surface-variant'
            }`}
          >
            All Activity
          </button>
          <button
            onClick={() => setFilter('moods')}
            className={`font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all ${
              filter === 'moods' ? 'bg-primary text-on-primary shadow-subtle' : 'bg-surface text-on-background hover:bg-surface-variant'
            }`}
          >
            Moods
          </button>
          <button
            onClick={() => setFilter('sessions')}
            className={`font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all ${
              filter === 'sessions' ? 'bg-primary text-on-primary shadow-subtle' : 'bg-surface text-on-background hover:bg-surface-variant'
            }`}
          >
            Sessions
          </button>
          <button
            onClick={() => setFilter('journals')}
            className={`font-label-bold text-label-bold px-6 py-3 rounded-full memphis-border transition-all ${
              filter === 'journals' ? 'bg-primary text-on-primary shadow-subtle' : 'bg-surface text-on-background hover:bg-surface-variant'
            }`}
          >
            Journals
          </button>
        </div>

        {/* Timeline Container */}
        {loading ? (
          <div className="py-12 text-center text-on-surface-variant">Loading your personal records...</div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-surface-container-lowest p-8 rounded-xl memphis-border text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">history</span>
            <p className="font-headline-sm text-headline-sm mb-2">No records found yet</p>
            <p className="text-on-surface-variant text-sm mb-4">Start logging daily mood check-ins or book your first counselling session.</p>
            <button
              onClick={() => navigate('/tracking/mood-check-in')}
              className="bg-primary text-on-primary font-label-bold px-6 py-2 rounded-full memphis-border"
            >
              Log First Mood
            </button>
          </div>
        ) : (
          <div className="relative timeline-line pl-12">
            {filteredItems.map((item) => (
              <div key={item.id} className="relative mb-stack-md">
                <div className="absolute -left-12 top-6 w-10 h-10 bg-secondary-container memphis-border rounded-full flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-on-background">{item.icon}</span>
                </div>
                <div className="bg-surface-container-lowest p-container-padding rounded-xl memphis-border transition-transform duration-200">
                  <div className="flex flex-wrap justify-between items-start mb-4 gap-2">
                    <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider">
                      {item.timestamp ? item.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </span>
                    <span className={`${item.badgeColor} px-3 py-1 rounded-full memphis-border font-label-md text-label-md`}>
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-2">{item.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">{item.description}</p>
                  {item.sessionId && (
                    <button
                      onClick={() => navigate(`/counselling-session/${item.sessionId}`)}
                      className="bg-primary text-on-primary font-label-bold text-label-bold px-6 py-2 rounded-full memphis-border shadow-subtle transition-all mt-2"
                    >
                      Enter Session Room
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Sidebar */}
      <aside className="w-full lg:w-[320px] flex flex-col gap-stack-md">
        {/* Streak Card */}
        <div className="bg-secondary-container p-6 rounded-xl memphis-border shadow-subtle">
          <h3 className="font-headline-sm text-headline-sm mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">local_fire_department</span>
            Activity Streak
          </h3>
          <div className="text-display-lg font-display-lg mb-1">{Math.max(1, moods.length + journals.length)} Days</div>
          <p className="font-body-md text-body-md text-on-secondary-container">
            Consistent reflections foster lasting mental resilience.
          </p>
        </div>

        {/* Mood Trends Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl memphis-border">
          <h3 className="font-headline-sm text-headline-sm mb-4">Mood Activity</h3>
          <div className="h-44 bg-surface-variant rounded-lg border-outline-variant relative overflow-hidden flex items-end p-3 gap-2">
            {moods.slice(0, 7).reverse().map((m, idx) => {
              const heightPercent = Math.max(20, (parseInt(m.mood) || 3) * 20);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-primary rounded-t-sm memphis-border transition-all duration-300"
                    title={`Mood: ${m.mood}/5`}
                  />
                </div>
              );
            })}
            {moods.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">
                Log moods to see trend
              </div>
            )}
          </div>
        </div>

        {/* Weekly Goals Card */}
        <div className="bg-surface-container-lowest p-6 rounded-xl memphis-border">
          <h3 className="font-headline-sm text-headline-sm mb-4">Active Goals</h3>
          <div className="flex flex-col gap-4">
            {goals.length === 0 ? (
              <p className="text-xs text-on-surface-variant">No goals currently active.</p>
            ) : (
              goals.slice(0, 3).map((g) => {
                const pct = Math.min(100, Math.round(((g.progress_current || 0) / (g.progress_total || 1)) * 100));
                return (
                  <div key={g.id}>
                    <div className="flex justify-between font-label-md text-label-md mb-2">
                      <span>{g.title}</span>
                      <span>{g.progress_current}/{g.progress_total}</span>
                    </div>
                    <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden memphis-border">
                      <div style={{ width: `${pct}%` }} className="h-full bg-primary transition-all duration-300"></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MyRecords;
