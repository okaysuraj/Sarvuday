// Browse the support groups published by the backend.
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export function SupportGroups() {
  const state = useApiResource<any[]>('/community/groups');
  const router = useRouter();
  return (
    <Screen title="Support groups">
      <RequestState
        loading={state.loading}
        error={state.error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !state.data?.length
            ? 'No support groups have been published.'
            : undefined
        }
      />
      {state.data?.map((group) => (
        <Card key={group.id}>
          <Text className="font-semibold text-on-surface">{group.name}</Text>
          <Text className="text-on-surface-variant">{group.description}</Text>
          <Action
            title="Open group"
            onPress={() =>
              router.push({
                pathname: '/chat/group/[id]',
                params: { id: group.id },
              })
            }
          />
        </Card>
      ))}
    </Screen>
  );
}
