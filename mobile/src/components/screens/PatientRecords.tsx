// Patient records are scoped by the API to the signed-in counsellor.
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Card, RequestState, Screen } from '../common/Screen';

export function PatientDirectoryScreen() {
  const state = useApiResource('/counsellor/appointments?upcoming=false&limit=100');
  const patients = new Map<string, any>();
  for (const appointment of state.data?.appointments || [])
    if (appointment.user?.user_id) patients.set(appointment.user.user_id, appointment.user);
  return (
    <Screen title="Patient directory">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {[...patients.values()].map((patient) => (
        <Card key={patient.user_id}>
          <Text className="font-semibold text-on-surface">{patient.name}</Text>
          <Text className="text-on-surface-variant">
            Clinical risk has not been assessed in this view.
          </Text>
        </Card>
      ))}
      {!state.loading && !state.error && !patients.size && (
        <Text>No patients in the returned appointment history.</Text>
      )}
    </Screen>
  );
}

export function PatientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const state = useApiResource('/counsellor/appointments?upcoming=false&limit=100');
  const record = state.data?.appointments?.find(
    (appointment: any) => appointment.user?.user_id === id,
  );
  return (
    <Screen title="Patient record">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {record ? (
        <Card>
          <Text className="text-xl font-semibold text-on-surface">{record.user.name}</Text>
          <Text className="text-on-surface-variant">Appointment: {record.appointment_id}</Text>
          <Text className="text-on-surface-variant">Status: {record.status}</Text>
        </Card>
      ) : (
        !state.loading && !state.error && <Text>No assigned patient record was returned.</Text>
      )}
    </Screen>
  );
}
