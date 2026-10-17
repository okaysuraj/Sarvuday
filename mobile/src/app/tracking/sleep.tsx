import { useState } from 'react';
import { Text } from 'react-native';
import type { components } from '../../../../shared/api-types';
import { api } from '../../api/client';
import { Action, Card, RequestState, Screen } from '../../components/common/Screen';
import { CustomInput } from '../../components/forms/CustomInput';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';

type Sleep = components['schemas']['SleepRecord'];

export default function SleepTrackingScreen() {
  const state = useApiResource<Sleep[]>('/user/tracking/sleep');
  const [hours, setHours] = useState('');
  const [quality, setQuality] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    const duration = Number(hours);
    if (!hours.trim() || !Number.isFinite(duration) || duration < 0 || duration > 24) {
      setError('Enter the hours you slept, between 0 and 24.');
      return;
    }
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      await api.post('/user/tracking/sleep', {
        body: { duration_hours: duration, quality: quality.trim() || null },
      });
      setHours('');
      state.reload();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen title="Sleep tracking" subtitle="Record your sleep and review earlier entries.">
      <Card>
        <CustomInput
          label="Hours slept"
          value={hours}
          onChangeText={setHours}
          keyboardType="decimal-pad"
          placeholder="e.g. 7.5"
        />
        <CustomInput
          label="Sleep quality (optional)"
          value={quality}
          onChangeText={setQuality}
          maxLength={50}
        />
        {error ? (
          <Text accessibilityRole="alert" className="text-error">
            {error}
          </Text>
        ) : null}
        <Action
          title={saving ? 'Saving…' : 'Save sleep record'}
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
            ? 'No sleep records yet.'
            : undefined
        }
      />
      {!state.loading &&
        !state.error &&
        state.data?.map((record) => (
          <Card key={record.id}>
            <Text className="text-on-surface font-semibold">{record.date}</Text>
            <Text className="text-on-surface-variant">
              {record.duration_hours} hours{record.quality ? ` · ${record.quality}` : ''}
            </Text>
          </Card>
        ))}
    </Screen>
  );
}
