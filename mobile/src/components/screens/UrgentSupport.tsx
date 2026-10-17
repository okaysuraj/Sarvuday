import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, Text } from 'react-native';
import { apiClient } from '../../api/client';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';
import { useAuthStore } from '../../store/authStore';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export default function UrgentSupport() {
  const authenticated = useAuthStore((value) => value.isAuthenticated);
  const role = useAuthStore((value) => value.user?.role);
  const state = useApiResource(
    authenticated && role === 'patient' ? '/user/dashboard/profile' : null,
  );
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const phone = state.data?.emergency_contact_phone;
  const save = async () => {
    setSaving(true);
    try {
      await apiClient.post('/ai-insights/crisis-alert', {
        risk_level: 'manual',
        source: 'mobile_urgent_support',
        notes: 'The user requested support from the urgent support screen.',
      });
      setMessage(
        'Your request was saved. Emergency services have not been contacted, and a clinician response has not been confirmed.',
      );
    } catch (cause) {
      setMessage(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  };
  return (
    <Screen title="Urgent support">
      <Card>
        <Text className="text-lg font-semibold text-on-surface">
          If you are in immediate danger
        </Text>
        <Text className="text-on-surface leading-6">
          Contact your local emergency services now, or ask someone you trust to stay with you and
          help you reach urgent care.
        </Text>
        <Text className="text-on-surface-variant leading-6">
          This app does not dispatch emergency assistance or automatically share your location.
        </Text>
      </Card>
      {!authenticated ? (
        <Action
          title="Sign in to view your saved emergency contact"
          onPress={() => router.push('/(auth)/login')}
        />
      ) : (
        <>
          <RequestState loading={state.loading} error={state.error} retry={state.reload} />
          {state.data && (
            <>
              <Card>
                <Text className="font-semibold text-on-surface">Your emergency contact</Text>
                <Text className="text-on-surface">
                  {state.data.emergency_contact_name || 'No contact saved'}
                </Text>
                {phone && /^\+?[\d\s()-]{5,25}$/.test(phone) && (
                  <Action
                    title="Call your saved contact"
                    onPress={() => {
                      void Linking.openURL(`tel:${phone.replace(/[^+\d]/g, '')}`).catch((cause) =>
                        setMessage(errorMessage(cause)),
                      );
                    }}
                  />
                )}
                <Action
                  title="Update emergency contact"
                  onPress={() => router.push('/profile/edit')}
                />
              </Card>
              <Card>
                <Text className="text-on-surface">
                  Saving a support request records it in your account. It does not send an emergency
                  dispatch.
                </Text>
                <Action
                  title={saving ? 'Saving…' : 'Save support request'}
                  onPress={() => void save()}
                  disabled={saving}
                />
              </Card>
            </>
          )}
        </>
      )}
      {!!message && (
        <Text accessibilityRole="alert" className="text-on-surface">
          {message}
        </Text>
      )}
    </Screen>
  );
}
