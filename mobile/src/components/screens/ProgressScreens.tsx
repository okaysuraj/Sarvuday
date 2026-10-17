// Present saved mood, sleep and wearable measurements.
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Card, Metric, RequestState, Screen } from '../common/Screen';
const labels = ['Very low', 'Low', 'Neutral', 'Good', 'Great'];

export function ProgressScreen() {
  const state = useApiResource<any[]>('/user/tracking/mood/history');
  const records = Array.isArray(state.data) ? state.data : [];
  const values = records
    .map((record) => (record.mood == null ? NaN : Number(record.mood)))
    .filter((value) => Number.isInteger(value) && value >= 0 && value <= 4);
  return (
    <Screen title="Your recorded progress" subtitle="Up to your latest 100 saved check-ins">
      <RequestState
        loading={state.loading}
        error={state.error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !records.length
            ? 'No mood records yet. Add a check-in to begin.'
            : undefined
        }
      />
      {!state.loading && !state.error && (
        <>
          <Metric label="Recorded check-ins" value={records.length} />
          <Metric
            label="Average recorded mood (0–4)"
            value={
              values.length
                ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)
                : null
            }
          />
          {records.slice(0, 30).map((record) => (
            <Card key={record.id}>
              <Text className="text-on-surface font-medium">
                {labels[Number(record.mood)] || 'Not recorded'}
              </Text>
              <Text className="text-on-surface-variant">
                {new Date(record.created_at).toLocaleString()}
              </Text>
              {!!record.notes && <Text className="text-on-surface">{record.notes}</Text>}
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}

export function SleepMoodScreen() {
  const state = useApiResource('/user/tracking/correlation');
  const points = Array.isArray(state.data?.data_points) ? state.data.data_points : [];
  return (
    <Screen title="Sleep and mood" subtitle="Paired measurements from saved records">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && <Text className="text-on-surface-variant">{state.data.insight}</Text>}
      {points.map((point: any) => (
        <Card key={point.date}>
          <Text className="font-semibold text-on-surface">{point.date}</Text>
          <Text className="text-on-surface">
            Sleep: {point.sleep == null ? 'Not recorded' : `${point.sleep} hours`}
          </Text>
          <Text className="text-on-surface">Mood (0–4): {point.mood ?? 'Not recorded'}</Text>
        </Card>
      ))}
    </Screen>
  );
}

export function BiofeedbackScreen() {
  const state = useApiResource('/user/tracking/biofeedback');
  return (
    <Screen title="Wearable measurements">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && (
        <>
          <Metric label="Heart rate (bpm)" value={state.data.heart_rate} />
          <Metric label="Heart rate variability (ms)" value={state.data.hrv} />
          <Metric label="Daily steps" value={state.data.daily_steps} />
          <Text className="text-on-surface-variant">
            {state.data.measured_at
              ? `Measured: ${new Date(state.data.measured_at).toLocaleString()}`
              : 'No connected device measurements have been saved.'}
          </Text>
        </>
      )}
    </Screen>
  );
}
