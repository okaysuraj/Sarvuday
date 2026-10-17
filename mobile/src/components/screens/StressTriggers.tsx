// Summarize labels saved with this user's journal entries.
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Card, RequestState, Screen } from '../common/Screen';

export function StressTriggers() {
  const state = useApiResource<any[]>('/user/tracking/journal');
  const counts = new Map<string, number>();
  for (const entry of state.data || [])
    for (const trigger of entry.triggers || []) counts.set(trigger, (counts.get(trigger) || 0) + 1);
  return (
    <Screen title="Recorded stress triggers">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {[...counts].map(([trigger, count]) => (
        <Card key={trigger}>
          <Text className="font-semibold text-on-surface">{trigger}</Text>
          <Text className="text-on-surface-variant">{count} saved entries</Text>
        </Card>
      ))}
      {!state.loading && !state.error && !counts.size && (
        <Text className="text-on-surface-variant">
          No trigger labels have been saved with your journal entries.
        </Text>
      )}
    </Screen>
  );
}
