// Display the current account insight summary.
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Card, RequestState, Screen } from '../common/Screen';

export function InsightsScreen() {
  const state = useApiResource('/ai-insights/summary');
  return (
    <Screen title="Your recorded insights">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && (
        <Card>
          <Text className="text-on-surface">
            {state.data.overall_mood || 'No summary is available yet.'}
          </Text>
          {state.data.recommendations?.map((recommendation: string) => (
            <Text key={recommendation} className="text-on-surface-variant">
              {recommendation}
            </Text>
          ))}
        </Card>
      )}
    </Screen>
  );
}
