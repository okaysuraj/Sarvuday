import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

const GoalTracking = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTotal, setNewTotal] = useState(7);

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

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await axiosInstance.post('/user/tracking/goals', {
        title: newTitle,
        progress_total: Number(newTotal),
      });
      if (!res.data.id) throw new Error('The goal was not saved.');
      setGoals((await axiosInstance.get('/user/tracking/goals')).data);
      toast.success('New goal created successfully!');
      setShowAddModal(false);
      setNewTitle('');
    } catch (err) {
      toast.error(err.userMessage || 'Your goal could not be saved.');
    }
  };

  const handleIncrementGoal = async (goalId) => {
    try {
      const response = await axiosInstance.patch(`/user/tracking/goals/${goalId}/increment`);
      setGoals((previous) =>
        previous.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                progress_current: response.data.progress_current,
                streak: response.data.streak,
              }
            : goal,
        ),
      );
      toast.success('Your progress was saved.');
    } catch {
      toast.error('Your progress could not be saved. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">
        Loading goals...
      </div>
    );
  }

  return (
    <div className="flex-1 pb-24">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h3 className="font-display-lg text-4xl md:text-headline-md text-ink-black mb-2">
              Active Goals
            </h3>
            <p className="text-body-lg text-on-surface-variant max-w-lg">
              Small steps lead to big changes. Keep your momentum going through consistent practice.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white border-outline px-6 py-3 rounded-full shadow-subtle font-label-bold flex items-center gap-2 transition-all hover:bg-neutral-800"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            New Goal
          </button>
        </div>

        {/* Bento-style Goal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const progressPct = Math.round((goal.progress_current / goal.progress_total) * 100);

            const themes = [
              {
                bg: 'bg-surface',
                icon: 'edit_note',
                iconColor: 'text-primary',
                bar: 'bg-primary',
              },
              {
                bg: 'bg-surface',
                icon: 'air',
                iconColor: 'text-secondary',
                bar: 'bg-secondary',
              },
              {
                bg: 'bg-surface',
                icon: 'psychology',
                iconColor: 'text-tertiary',
                bar: 'bg-tertiary',
              },
              {
                bg: 'bg-surface',
                icon: 'directions_run',
                iconColor: 'text-error',
                bar: 'bg-error',
              },
            ];
            const theme = themes[index % themes.length];

            return (
              <div
                key={goal.id}
                className="bg-surface border border-outline rounded-2xl p-6 flex flex-col justify-between min-h-[280px]"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-surface-container border border-outline rounded-xl flex items-center justify-center">
                    <span className={`material-symbols-outlined ${theme.iconColor}`}>
                      {theme.icon}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIncrementGoal(goal.id)}
                      className="w-9 h-9 bg-surface-container border border-outline rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-all"
                      title="Record Progress"
                    >
                      <span className="material-symbols-outlined text-secondary text-sm font-bold">
                        check
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-display-lg text-xl mb-1 text-on-surface">{goal.title}</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-bold uppercase tracking-wider text-xs">
                    <span className="material-symbols-outlined text-sm text-secondary">
                      local_fire_department
                    </span>
                    {goal.streak || 1} Day Streak
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2 font-label-bold text-xs text-on-surface-variant">
                    <span>
                      Target ({goal.progress_current || 0}/{goal.progress_total})
                    </span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-surface-container border border-outline rounded-full overflow-hidden">
                    <div
                      className={`h-full ${theme.bar} transition-all duration-500`}
                      style={{ width: `${Math.min(100, progressPct)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Habit Insight Card */}
          <div className="bg-surface-container border border-outline rounded-2xl p-6 flex items-center justify-center text-center relative overflow-hidden min-h-[280px]">
            <div>
              <span className="material-symbols-outlined text-4xl mb-3 text-secondary">
                psychology_alt
              </span>
              <h5 className="font-headline-sm text-xl mb-2 text-on-surface">
                Consistency Over Intensity
              </h5>
              <p className="text-body-md text-on-surface-variant text-sm max-w-xs">
                Building lasting cognitive habits takes steady daily repetitions. Take it one
                session at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-outline rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-on-surface mb-2">Create New Wellness Goal</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Set a clear, measurable habit to build resilience.
            </p>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Goal Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 10 minutes box breathing daily"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-surface-container border border-outline rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Target Repetitions (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={newTotal}
                  onChange={(e) => setNewTotal(e.target.value)}
                  className="w-full bg-surface-container border border-outline rounded-xl p-3 text-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-outline bg-surface-container text-xs font-semibold text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalTracking;
