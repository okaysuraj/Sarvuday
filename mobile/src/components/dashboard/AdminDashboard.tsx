// Show platform counts and the moderation entry point.
import { useRouter } from 'expo-router';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Metric, RequestState, Screen } from '../common/Screen';

export function AdminDashboard() {
  const state = useApiResource('/admin/dashboard');
  const router = useRouter();
  return (
    <Screen title="Platform overview">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && (
        <>
          <Metric label="Registered users" value={state.data.total_active_users} />
          <Metric label="Counsellor records" value={state.data.active_therapists} />
          <Metric label="Recorded revenue (INR)" value={state.data.total_revenue} />
          <Action
            title="Review moderation queue"
            onPress={() => router.push('/admin/moderation')}
          />
        </>
      )}
    </Screen>
  );
}
