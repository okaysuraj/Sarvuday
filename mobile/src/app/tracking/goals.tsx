import { useState } from 'react';
import { Text } from 'react-native';
import type { components } from '../../../../shared/api-types';
import { api } from '../../api/client';
import { Action, Card, RequestState, Screen } from '../../components/common/Screen';
import { CustomInput } from '../../components/forms/CustomInput';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';

type Goal = components['schemas']['GoalRecord'];

export default function GoalsTrackingScreen() {
  const state = useApiResource<Goal[]>('/user/tracking/goals');
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('7');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function save(goal?: Goal) {
    if (saving) return;
    setError('');
    const target = Number(total);
    if (!goal && (!title.trim() || !Number.isInteger(target) || target < 1 || target > 100000)) {
      setError('Enter a goal and a whole-number target between 1 and 100000.');
      return;
    }
    setSaving(true);
    try {
      if (goal) {
        await api.patch('/user/tracking/goals/{goal_id}/increment', { path: { goal_id: goal.id } });
      } else {
        await api.post('/user/tracking/goals', {
          body: { title: title.trim(), progress_total: target },
        });
        setTitle('');
      }
      state.reload();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen title="My goals" subtitle="Track the habits you choose to work on.">
      <Card>
        <CustomInput label="Goal" value={title} onChangeText={setTitle} maxLength={200} />
        <CustomInput
          label="Target repetitions"
          value={total}
          onChangeText={setTotal}
          keyboardType="number-pad"
        />
        {error ? (
          <Text accessibilityRole="alert" className="text-error">
            {error}
          </Text>
        ) : null}
        <Action
          title={saving ? 'Saving…' : 'Create goal'}
          onPress={() => void save()}
          disabled={saving}
        />
      </Card>
      <RequestState
        loading={state.loading}
        error={state.error}
        retry={state.reload}
        empty={
          !state.loading && !state.error && !state.data?.length
            ? 'No goals yet. Create your first goal above.'
            : undefined
        }
      />
      {!state.loading &&
        !state.error &&
        state.data?.map((goal) => (
          <Card key={goal.id}>
            <Text className="text-on-surface text-lg font-semibold">{goal.title}</Text>
            {goal.description ? (
              <Text className="text-on-surface-variant">{goal.description}</Text>
            ) : null}
            <Text className="text-on-surface-variant">
              {goal.progress_current} / {goal.progress_total} · {goal.frequency}
            </Text>
            <Action
              title={goal.progress_current >= goal.progress_total ? 'Completed' : 'Record progress'}
              disabled={saving || goal.progress_current >= goal.progress_total}
              onPress={() => void save(goal)}
            />
          </Card>
        ))}
    </Screen>
  );
}
