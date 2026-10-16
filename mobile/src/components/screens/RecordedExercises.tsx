import React from 'react';
import { FlatList, Linking, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export function RecordedExerciseLibrary() {
  const state = useApiResource<any[]>('/exercises/');
  const router = useRouter();
  return <Screen title="Exercise library" subtitle="Published exercises from the care library" scroll={false}><RequestState loading={state.loading} error={state.error} retry={state.reload} /><FlatList data={state.data || []} keyExtractor={(exercise: any) => exercise.id} initialNumToRender={6} maxToRenderPerBatch={6} windowSize={5} contentContainerStyle={{ padding: 20, gap: 16 }} ListEmptyComponent={!state.loading && !state.error ? <Text className="text-on-surface-variant">No exercises have been published yet.</Text> : null} renderItem={({ item }: any) => <Card><Text className="font-semibold text-on-surface text-lg">{item.title}</Text><Text className="text-on-surface-variant">{item.description}</Text><Action title="Open exercise" onPress={() => router.push({ pathname: '/exercises/[id]', params: { id: item.id } })} /></Card>} /></Screen>;
}

export function RecordedExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const state = useApiResource(id ? `/exercises/${encodeURIComponent(id)}` : null);
  const exercise = state.data;
  return <Screen title={exercise?.title || 'Exercise'}><RequestState loading={state.loading} error={state.error} retry={state.reload} />{exercise && <Card><Text className="text-on-surface leading-6">{exercise.description}</Text>{Array.isArray(exercise.instructions) ? exercise.instructions.map((instruction: string, index: number) => <Text key={index} className="text-on-surface leading-6">{index + 1}. {instruction}</Text>) : typeof exercise.instructions === 'string' && <Text className="text-on-surface leading-6">{exercise.instructions}</Text>}{/^https:\/\//.test(exercise.audio_url || '') && <Action title="Open session audio" onPress={() => { void Linking.openURL(exercise.audio_url); }} />}</Card>}</Screen>;
}

export function RecordedGroups() {
  const state = useApiResource<any[]>('/community/groups');
  const router = useRouter();
  return <Screen title="Support groups"><RequestState loading={state.loading} error={state.error} retry={state.reload} empty={!state.loading && !state.error && !state.data?.length ? 'No support groups have been published.' : undefined} />{state.data?.map(group => <Card key={group.id}><Text className="font-semibold text-on-surface">{group.name}</Text><Text className="text-on-surface-variant">{group.description}</Text><Action title="Open group" onPress={() => router.push({ pathname: '/chat/group/[id]', params: { id: group.id } })} /></Card>)}</Screen>;
}

export function RecordedStressTriggers() {
  const state = useApiResource<any[]>('/user/tracking/journal');
  const counts = new Map<string, number>();
  for (const entry of state.data || []) for (const trigger of entry.triggers || []) counts.set(trigger, (counts.get(trigger) || 0) + 1);
  return <Screen title="Recorded stress triggers"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{[...counts].map(([trigger, count]) => <Card key={trigger}><Text className="font-semibold text-on-surface">{trigger}</Text><Text className="text-on-surface-variant">{count} saved entries</Text></Card>)}{!state.loading && !state.error && !counts.size && <Text className="text-on-surface-variant">No trigger labels have been saved with your journal entries.</Text>}</Screen>;
}
