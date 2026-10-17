import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { apiClient } from '../../api/client';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';
import { useAuthStore } from '../../store/authStore';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export default function AppointmentsScreen() {
  const role = useAuthStore((value) => value.user?.role);
  const prefix = role === 'therapist' ? '/counsellor' : '/user';
  const state = useApiResource(`${prefix}/appointments?upcoming=false&limit=100`);
  const router = useRouter();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const cancel = (id: string) =>
    Alert.alert(
      'Cancel appointment?',
      'Your appointment will be canceled. Refunds require a separate support review.',
      [
        { text: 'Keep appointment', style: 'cancel' },
        {
          text: 'Cancel appointment',
          style: 'destructive',
          onPress: async () => {
            setSaving(true);
            setError('');
            try {
              await apiClient.patch(`${prefix}/appointments/cancel/${encodeURIComponent(id)}`);
              state.reload();
            } catch (cause) {
              setError(errorMessage(cause));
            } finally {
              setSaving(false);
            }
          },
        },
      ],
    );
  return (
    <Screen title="Your appointments" scroll={false}>
      <RequestState loading={state.loading} error={state.error || error} retry={state.reload} />
      <FlatList
        data={state.data?.appointments || []}
        keyExtractor={(record: any) => record.appointment_id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}
        ListEmptyComponent={
          !state.loading && !state.error ? (
            <Text className="text-on-surface-variant">
              No appointments in the returned history.
            </Text>
          ) : null
        }
        renderItem={({ item }: any) => (
          <Card>
            <Text className="text-lg font-semibold text-on-surface">
              {role === 'therapist' ? item.user?.name : item.counsellor?.name}
            </Text>
            <Text className="text-on-surface-variant">
              {new Date(item.session.session_scheduled_at).toLocaleString()}
            </Text>
            <Text className="text-on-surface">{item.status}</Text>
            {item.status === 'confirmed' && (
              <View className="gap-3">
                <Action
                  title="Open session"
                  onPress={() =>
                    router.push({
                      pathname: '/call/[id]',
                      params: { id: item.session.session_id },
                    })
                  }
                />
                <Action
                  title="Cancel appointment"
                  disabled={saving}
                  onPress={() => cancel(item.appointment_id)}
                />
              </View>
            )}
          </Card>
        )}
      />
    </Screen>
  );
}
