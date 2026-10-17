import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Linking, Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export function ExerciseLibrary() {
  const state = useApiResource<any[]>('/exercises/');
  const router = useRouter();
  return (
    <Screen
      title="Exercise library"
      subtitle="Published exercises from the care library"
      scroll={false}
    >
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      <FlatList
        data={state.data || []}
        keyExtractor={(exercise: any) => exercise.id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        contentContainerStyle={{ padding: 20, gap: 16 }}
        ListEmptyComponent={
          !state.loading && !state.error ? (
            <Text className="text-on-surface-variant">No exercises have been published yet.</Text>
          ) : null
        }
        renderItem={({ item }: any) => (
          <Card>
            <Text className="font-semibold text-on-surface text-lg">{item.title}</Text>
            <Text className="text-on-surface-variant">{item.description}</Text>
            <Action
              title="Open exercise"
              onPress={() =>
                router.push({
                  pathname: '/exercises/[id]',
                  params: { id: item.id },
                })
              }
            />
          </Card>
        )}
      />
    </Screen>
  );
}

export function ExerciseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const state = useApiResource(id ? `/exercises/${encodeURIComponent(id)}` : null);
  const exercise = state.data;
  return (
    <Screen title={exercise?.title || 'Exercise'}>
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {exercise && (
        <Card>
          <Text className="text-on-surface leading-6">{exercise.description}</Text>
          {Array.isArray(exercise.instructions)
            ? exercise.instructions.map((instruction: string, index: number) => (
                <Text key={index} className="text-on-surface leading-6">
                  {index + 1}. {instruction}
                </Text>
              ))
            : typeof exercise.instructions === 'string' && (
                <Text className="text-on-surface leading-6">{exercise.instructions}</Text>
              )}
          {/^https:\/\//.test(exercise.audio_url || '') && (
            <Action
              title="Open session audio"
              onPress={() => {
                void Linking.openURL(exercise.audio_url);
              }}
            />
          )}
        </Card>
      )}
    </Screen>
  );
}
