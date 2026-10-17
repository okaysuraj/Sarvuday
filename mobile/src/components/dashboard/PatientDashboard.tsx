// Provide patient check-in, journal, booking and progress shortcuts.
import { useRouter } from 'expo-router';
import { useApiResource } from '../../hooks/use-api-resource';
import { useAuthStore } from '../../store/authStore';
import { Action, RequestState, Screen } from '../common/Screen';

export function PatientDashboard() {
  const state = useApiResource('/user/dashboard');
  const user = useAuthStore((value) => value.user);
  const router = useRouter();
  return (
    <Screen title="Your wellbeing dashboard" subtitle={user?.name}>
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      <Action title="Check in" onPress={() => router.push('/tracking/mood-check-in')} />
      <Action title="Your journal" onPress={() => router.push('/tracking/journal')} />
      <Action title="Find a therapist" onPress={() => router.push('/(tabs)/therapists')} />
      <Action title="Your appointments" onPress={() => router.push('/(tabs)/appointments')} />
      <Action
        title="Review your progress"
        onPress={() => router.push('/tracking/history')}
      />
    </Screen>
  );
}
