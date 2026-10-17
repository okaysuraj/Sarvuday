import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import axiosInstance from '../../utils/axiosInstance';
import {
  localDateKey,
  mean,
  MOOD_LABELS,
  moodValue,
  recentRecords,
} from '../../utils/healthMetrics';
import { DataState, Metric, PageHeading } from '../common/DataState';

function useTracking(days) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ loading: true, error: '', data: null });
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true, error: '', data: null });
    Promise.all(
      ['/mood/history', '/sleep', '/journal'].map((path) =>
        axiosInstance.get(`/user/tracking${path}`, {
          signal: controller.signal,
          silent: true,
        }),
      ),
    )
      .then((responses) => {
        if (controller.signal.aborted) return;
        if (responses.some((response) => !Array.isArray(response.data)))
          throw new Error('Invalid records response.');
        const [moods, sleep, journals] = responses.map((response) =>
          recentRecords(response.data, days),
        );
        setState({
          loading: false,
          error: '',
          data: { moods, sleep, journals },
        });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({
            loading: false,
            error: error.userMessage || 'Your records could not load.',
            data: null,
          });
      });
    return () => controller.abort();
  }, [days, attempt]);
  return { ...state, retry: () => setAttempt((value) => value + 1) };
}

export function ProgressView({ weekly = false }) {
  const [days, setDays] = useState(weekly ? 7 : 30);
  const state = useTracking(days);
  const { moods = [], sleep = [], journals = [] } = state.data || {};
  const averageMood = mean(moods.map((record) => moodValue(record.mood)));
  const averageSleep = mean(sleep.map((record) => record.duration_hours));
  const anxiety = mean(moods.map((record) => record.anxiety_level));
  return (
    <section className="space-y-6 pb-12">
      <PageHeading title={weekly ? 'Weekly report' : 'Your progress'}>
        A summary of your saved check-ins, sleep logs, and journal entries. Missing measurements are
        left blank.
      </PageHeading>
      <label className="flex items-center gap-3 text-sm">
        Period
        <select
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="input-field w-auto"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </label>
      <DataState
        {...state}
        empty={state.data && !moods.length && !sleep.length && !journals.length}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Metric label="Average mood (0–4)" value={averageMood?.toFixed(1)} />
          <Metric
            label="Average sleep"
            value={averageSleep == null ? null : `${averageSleep.toFixed(1)} hours`}
          />
          <Metric label="Average self-reported anxiety (0–10)" value={anxiety?.toFixed(1)} />
          <Metric label="Journal entries" value={journals.length} />
        </div>
        <div className="rounded-xl bg-white border border-stone-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Recorded check-ins</h2>
          {moods.length ? (
            <ul className="divide-y divide-stone-100">
              {moods.slice(0, 30).map((record) => (
                <li key={record.id} className="py-3 flex justify-between gap-4">
                  <time dateTime={record.created_at}>
                    {new Date(record.created_at).toLocaleString()}
                  </time>
                  <span>{MOOD_LABELS[moodValue(record.mood)] || 'Not recorded'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No mood check-ins in this period.</p>
          )}
        </div>
        <p className="text-sm text-on-surface-variant">
          This view uses up to the latest 100 check-ins and journals and 30 sleep records returned
          by your account. It is a record summary, not a clinical assessment.
        </p>
      </DataState>
    </section>
  );
}

export function StressView() {
  const state = useApiData('/user/tracking/journal');
  const counts = new Map();
  for (const record of Array.isArray(state.data) ? state.data : []) {
    for (const trigger of Array.isArray(record.triggers) ? record.triggers : [])
      counts.set(trigger, (counts.get(trigger) || 0) + 1);
  }
  return (
    <section>
      <PageHeading title="Recorded stress triggers">
        Triggers you chose when writing your journal. Counts reflect saved entries.
      </PageHeading>
      <DataState {...state}>
        {counts.size ? (
          <ul className="space-y-3">
            {[...counts]
              .sort((a, b) => b[1] - a[1])
              .map(([label, count]) => (
                <li
                  key={label}
                  className="bg-white rounded-xl border border-stone-200 p-5 flex justify-between gap-4"
                >
                  <span>{label}</span>
                  <span>
                    {count} {count === 1 ? 'entry' : 'entries'}
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          <p className="bg-white rounded-xl border border-stone-200 p-6">
            No saved trigger labels yet. Add them to a journal entry to track patterns.
          </p>
        )}
        <Link className="inline-block underline mt-6" to="/stress/factors">
          Record a stress trigger
        </Link>
      </DataState>
    </section>
  );
}

export function InsightsView() {
  const state = useApiData('/ai-insights/summary');
  const data = state.data;
  return (
    <section>
      <PageHeading title="Your recorded insights">
        Summary of the information available in your account.
      </PageHeading>
      <DataState {...state}>
        <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-6">
          <p>{data?.overall_mood || 'No summary is available yet.'}</p>
          {data?.key_themes?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Recorded themes</h2>
              <ul className="space-y-2">
                {data.key_themes.map((theme) => (
                  <li key={theme}>{theme}</li>
                ))}
              </ul>
            </div>
          )}
          {data?.recommendations?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-3">Suggestions</h2>
              <ul className="space-y-2">
                {data.recommendations.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          <Link to="/journal" className="inline-block underline">
            Open your journal
          </Link>
        </div>
      </DataState>
    </section>
  );
}

export function CorrelationView() {
  const state = useApiData('/user/tracking/correlation');
  const points = Array.isArray(state.data?.data_points) ? state.data.data_points : [];
  return (
    <section>
      <PageHeading title="Sleep and mood">Paired measurements from your saved records.</PageHeading>
      <DataState {...state}>
        <p className="mb-6">
          {state.data?.insight || 'Record sleep and mood on the same dates to compare them.'}
        </p>
        {points.length > 0 && (
          <div className="overflow-x-auto bg-white border border-stone-200 rounded-xl">
            <table className="w-full text-left">
              <caption className="sr-only">Saved sleep and mood measurements</caption>
              <thead>
                <tr>
                  <th className="p-4" scope="col">
                    Date
                  </th>
                  <th className="p-4" scope="col">
                    Sleep (hours)
                  </th>
                  <th className="p-4" scope="col">
                    Mood (0–4)
                  </th>
                </tr>
              </thead>
              <tbody>
                {points.map((point) => (
                  <tr key={point.date} className="border-t border-stone-100">
                    <td className="p-4">{point.date}</td>
                    <td className="p-4">{point.sleep ?? 'Not recorded'}</td>
                    <td className="p-4">{point.mood ?? 'Not recorded'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DataState>
    </section>
  );
}

export function WearablesView() {
  const state = useApiData('/user/tracking/biofeedback');
  const data = state.data;
  return (
    <section>
      <PageHeading title="Wearable measurements">
        Measurements appear after a supported device has synced to your account.
      </PageHeading>
      <DataState {...state}>
        <p className="mb-6">
          {data?.connected ? 'Device data available' : 'No connected device data is available.'}
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <Metric
            label="Heart rate"
            value={data?.heart_rate == null ? null : `${data.heart_rate} bpm`}
          />
          <Metric
            label="Heart rate variability"
            value={data?.hrv == null ? null : `${data.hrv} ms`}
          />
          <Metric label="Daily steps" value={data?.daily_steps} />
        </div>
        {data?.last_synced_at && (
          <p className="mt-5 text-sm">
            Last synced: {new Date(data.last_synced_at).toLocaleString()}
          </p>
        )}
      </DataState>
    </section>
  );
}

export function MeditationView() {
  const state = useApiData('/exercises/');
  const exercises = Array.isArray(state.data) ? state.data : state.data?.exercises || [];
  const meditations = exercises.filter((exercise) =>
    /meditat/i.test(`${exercise.category || ''} ${exercise.title || ''} ${exercise.type || ''}`),
  );
  return (
    <section>
      <PageHeading title="Guided meditation">
        Available sessions from the exercise library.
      </PageHeading>
      <DataState {...state}>
        {!meditations.length && (
          <p className="rounded-xl border border-stone-200 bg-white p-6">
            No guided sessions have been published yet.
          </p>
        )}
        <div className="grid md:grid-cols-2 gap-5">
          {meditations.map((exercise) => (
            <article
              key={exercise.id || exercise._id}
              className="rounded-xl border border-stone-200 bg-white p-6 space-y-3"
            >
              <h2 className="text-xl font-semibold">{exercise.title}</h2>
              <p>{exercise.description}</p>
              {/^https:\/\//.test(exercise.audio_url || '') ? (
                <audio className="w-full" controls preload="none" src={exercise.audio_url}>
                  Audio playback is not supported by your browser.
                </audio>
              ) : (
                <p className="text-sm text-on-surface-variant">
                  Audio is unavailable for this session.
                </p>
              )}
            </article>
          ))}
        </div>
      </DataState>
    </section>
  );
}

export function SnapshotView() {
  const state = useApiData('/user/tracking/mood/history');
  const today = localDateKey(new Date());
  const record = Array.isArray(state.data)
    ? state.data.find((item) => localDateKey(item.created_at) === today)
    : null;
  return (
    <section>
      <PageHeading title="Today's check-in">Your latest saved check-in today.</PageHeading>
      <DataState {...state}>
        {record ? (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-3 gap-4">
              <Metric label="Mood" value={MOOD_LABELS[moodValue(record.mood)]} />
              <Metric label="Self-reported energy (0–10)" value={record.energy_level} />
              <Metric label="Self-reported anxiety (0–10)" value={record.anxiety_level} />
            </div>
            <p>{record.notes}</p>
            <time dateTime={record.created_at}>{new Date(record.created_at).toLocaleString()}</time>
          </div>
        ) : (
          <p>No check-in has been saved today.</p>
        )}
        <Link to="/mood-tracker/add" className="inline-block underline mt-6">
          Add a check-in
        </Link>
      </DataState>
    </section>
  );
}

export function SleepView() {
  const state = useApiData('/user/tracking/sleep');
  const [date, setDate] = useState(localDateKey(new Date()));
  const [hours, setHours] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const records = Array.isArray(state.data) ? state.data : [];
  const save = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage('');
    try {
      await axiosInstance.post('/user/tracking/sleep', {
        date,
        duration_hours: Number(hours),
      });
      setHours('');
      setMessage('Sleep log saved.');
      state.retry();
    } catch (error) {
      setMessage(error.userMessage || 'Your sleep log could not be saved.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="space-y-6">
      <PageHeading title="Sleep tracking">Record the sleep duration you observed.</PageHeading>
      <form
        onSubmit={save}
        className="bg-white border border-stone-200 rounded-xl p-6 flex flex-wrap items-end gap-4"
      >
        <label className="space-y-2">
          <span className="block text-sm">Date</span>
          <input
            type="date"
            required
            value={date}
            max={localDateKey(new Date())}
            onChange={(event) => setDate(event.target.value)}
            className="input-field"
          />
        </label>
        <label className="space-y-2">
          <span className="block text-sm">Sleep duration (hours)</span>
          <input
            type="number"
            required
            min="0"
            max="24"
            step="0.1"
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            className="input-field"
          />
        </label>
        <button className="btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save sleep log'}
        </button>
      </form>
      {message && <p role="status">{message}</p>}
      <DataState {...state}>
        {records.length ? (
          <ul className="space-y-3">
            {records.map((record) => (
              <li
                key={record.id}
                className="rounded-xl border border-stone-200 p-5 bg-white flex justify-between gap-4"
              >
                <span>{record.date}</span>
                <span>
                  {record.duration_hours == null
                    ? 'Not recorded'
                    : `${record.duration_hours} hours`}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sleep logs yet.</p>
        )}
      </DataState>
    </section>
  );
}
