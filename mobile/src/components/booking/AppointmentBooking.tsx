import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export default function AppointmentBooking() {
  const params = useLocalSearchParams<{
    counsellorId?: string;
    counsellor_id?: string;
    id?: string;
    therapist_id?: string;
  }>();
  const counsellorId =
    params.counsellorId || params.counsellor_id || params.id || params.therapist_id;
  const [date, setDate] = useState(localDate());
  const [requestedDate, setRequestedDate] = useState(localDate());
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const state = useApiResource(
    counsellorId
      ? `/user/appointments/slots?counsellor_id=${encodeURIComponent(counsellorId)}&date=${encodeURIComponent(`${requestedDate}T00:00:00`)}`
      : null,
  );
  const slots = state.data?.slots || [];
  return (
    <Screen title="Book a session" subtitle="Availability comes from your therapist's schedule">
      {!counsellorId ? (
        <Action
          title="Choose a therapist"
          onPress={() => router.replace('/patient/therapist_list')}
        />
      ) : (
        <>
          <Text className="text-on-surface">Date (YYYY-MM-DD)</Text>
          <TextInput
            accessibilityLabel="Appointment date in YYYY-MM-DD format"
            value={date}
            onChangeText={setDate}
            maxLength={10}
            autoCapitalize="none"
            className="bg-surface border border-outline rounded-xl px-4 min-h-12 text-on-surface"
          />
          <Action
            title="Check availability"
            disabled={!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))}
            onPress={() => {
              setSelected(null);
              setRequestedDate(date);
              state.reload();
            }}
          />
          <RequestState
            loading={state.loading}
            error={state.error}
            retry={state.reload}
            empty={
              !state.loading && !state.error && !slots.length
                ? 'No available times on this date.'
                : undefined
            }
          />
          {slots.map((slot: any) => (
            <Card key={slot.availability_slot_id}>
              <Text className="text-on-surface">
                {new Date(slot.start_time).toLocaleString()} –{' '}
                {new Date(slot.end_time).toLocaleTimeString()}
              </Text>
              <Action
                title={selected === slot.availability_slot_id ? 'Selected' : 'Select time'}
                onPress={() => setSelected(slot.availability_slot_id)}
              />
            </Card>
          ))}
          <View className="mt-4">
            <Action
              title="Review and pay"
              disabled={!selected || state.loading}
              onPress={() =>
                router.push({
                  pathname: '/patient/payment',
                  params: { counsellorId, slotId: selected! },
                })
              }
            />
          </View>
        </>
      )}
    </Screen>
  );
}
