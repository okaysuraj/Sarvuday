// Search published counsellor profiles and open their booking flow.
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export function TherapistDirectory() {
  const router = useRouter();
  const state = useApiResource('/content/counsellors');
  const [search, setSearch] = useState('');
  const records = Array.isArray(state.data?.counsellors) ? state.data.counsellors : [];
  const filtered = records.filter((record: any) =>
    `${record.name} ${JSON.stringify(record.specializations || [])}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <Screen title="Find a therapist" scroll={false}>
      <View className="p-5">
        <TextInput
          accessibilityLabel="Search therapists"
          placeholder="Search by name or specialization"
          value={search}
          onChangeText={setSearch}
          className="min-h-12 bg-surface rounded-xl border border-outline px-4 text-on-surface"
        />
      </View>
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {!state.loading && !state.error && (
        <FlatList
          data={filtered}
          keyExtractor={(record: any) => record.user_id}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={5}
          contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}
          ListEmptyComponent={
            <Text className="text-on-surface-variant">No matching therapists are available.</Text>
          }
          renderItem={({ item }: any) => (
            <Card>
              <Text className="text-lg font-semibold text-on-surface">{item.name}</Text>
              <Text className="text-on-surface-variant">
                {Array.isArray(item.specializations)
                  ? item.specializations.join(', ')
                  : item.specializations}
              </Text>
              <Text className="text-on-surface">
                {item.session_fee == null
                  ? 'Fee unavailable'
                  : `INR ${item.session_fee} per session`}
              </Text>
              <Action
                title="View available times"
                onPress={() =>
                  router.push({
                    pathname: '/patient/book_appointment',
                    params: { counsellorId: item.user_id },
                  })
                }
              />
            </Card>
          )}
        />
      )}
    </Screen>
  );
}
