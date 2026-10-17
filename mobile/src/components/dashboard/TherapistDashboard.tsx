// Show counsellor appointments, sessions and earnings links.
import { useRouter } from 'expo-router';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Metric, RequestState, Screen } from '../common/Screen';

export function TherapistDashboard() {
  const state = useApiResource('/counsellor/dashboard');
  const router = useRouter();
  return (
    <Screen title="Your practice">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && (
        <>
          <Metric label="Upcoming appointments" value={state.data.upcoming_appointments} />
          <Metric label="Recorded sessions" value={state.data.total_sessions} />
          <Metric label="Average review rating" value={state.data.average_rating} />
          <Action
            title="Patient appointments"
            onPress={() => router.push('/counsellor/patients')}
          />
          <Action title="View earnings" onPress={() => router.push('/finance/revenue-dashboard')} />
        </>
      )}
    </Screen>
  );
}
