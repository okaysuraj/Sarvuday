import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { apiClient } from '../../api/client';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export function UserDirectoryScreen() {
  const state = useApiResource('/admin/users?limit=100');
  const users = state.data?.users || [];
  return (
    <Screen title="Registered users" scroll={false}>
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      <FlatList
        data={users}
        keyExtractor={(user: any) => user.user_id}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerStyle={{ padding: 20, gap: 16 }}
        ListEmptyComponent={
          !state.loading && !state.error ? <Text>No users in the returned results.</Text> : null
        }
        renderItem={({ item }: any) => (
          <Card>
            <Text className="font-semibold text-on-surface">{item.name}</Text>
            <Text className="text-on-surface-variant">{item.user_id}</Text>
          </Card>
        )}
      />
    </Screen>
  );
}

export function ModerationScreen() {
  const state = useApiResource<any[]>('/admin/moderation/queue');
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const decide = async (id: string, action: string) => {
    if (saving) return;
    setSaving(id);
    setError('');
    try {
      await apiClient.post(`/admin/moderation/${id}/action`, { action });
      state.reload();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(null);
    }
  };
  return (
    <Screen title="Moderation queue">
      <RequestState
        loading={state.loading}
        error={state.error || error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !state.data?.length
            ? 'No open moderation incidents.'
            : undefined
        }
      />
      {state.data?.map((item) => (
        <Card key={item.id}>
          <Text className="font-semibold text-on-surface">{item.user?.name}</Text>
          <Text className="text-on-surface">{item.content}</Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Action
                title="Approve"
                disabled={!!saving}
                onPress={() => void decide(item.id, 'approve')}
              />
            </View>
            <View className="flex-1">
              <Action
                title="Escalate"
                disabled={!!saving}
                onPress={() => void decide(item.id, 'escalate')}
              />
            </View>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

export function CounsellorRecordsScreen() {
  const state = useApiResource('/admin/counsellors?limit=100');
  const records = state.data?.counsellors || [];
  return (
    <Screen title="Counsellor records">
      <RequestState
        loading={state.loading}
        error={state.error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !records.length
            ? 'No counsellor records returned.'
            : undefined
        }
      />
      {records.map((record: any) => (
        <Card key={record.user_id}>
          <Text className="font-semibold text-on-surface">{record.name}</Text>
          <Text className="text-on-surface-variant">
            {record.is_approved ? 'Approved' : 'Awaiting approval'}
          </Text>
        </Card>
      ))}
    </Screen>
  );
}

export function CounsellorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const state = useApiResource('/admin/counsellors?limit=100');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const record = state.data?.counsellors?.find((counsellor: any) => counsellor.user_id === id);
  const approve = async (action: 'approve' | 'disapprove') => {
    setSaving(true);
    setError('');
    try {
      await apiClient.post(`/admin/counsellors/${action}/${encodeURIComponent(id)}`);
      state.reload();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  };
  return (
    <Screen title="Counsellor record">
      <RequestState loading={state.loading} error={state.error || error} retry={state.reload} />
      {record ? (
        <Card>
          <Text className="text-xl font-semibold text-on-surface">{record.name}</Text>
          <Text className="text-on-surface-variant">
            {record.is_approved ? 'Approved' : 'Awaiting approval'}
          </Text>
          <Text className="text-on-surface">
            License number: {record.license_number || 'Not recorded'}
          </Text>
          <Action
            title="Approve counsellor"
            disabled={saving}
            onPress={() => void approve('approve')}
          />
          <Action
            title="Remove approval"
            disabled={saving}
            onPress={() => void approve('disapprove')}
          />
        </Card>
      ) : (
        !state.loading && !state.error && <Text>No counsellor record was returned.</Text>
      )}
    </Screen>
  );
}

export function CrisisLogScreen() {
  const state = useApiResource<any[]>('/admin/moderation/crisis-logs');
  return (
    <Screen
      title="Support request logs"
      subtitle="Saved requests do not confirm emergency dispatch"
    >
      <RequestState
        loading={state.loading}
        error={state.error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !state.data?.length
            ? 'No support requests have been saved.'
            : undefined
        }
      />
      {state.data?.map((record) => (
        <Card key={record.id}>
          <Text className="font-semibold text-on-surface">{record.user_id}</Text>
          <Text className="text-on-surface-variant">
            Reported classification: {record.risk_level}
          </Text>
          <Text className="text-on-surface-variant">
            {record.is_resolved ? 'Resolved' : 'Open'} ·{' '}
            {new Date(record.created_at).toLocaleString()}
          </Text>
        </Card>
      ))}
    </Screen>
  );
}
