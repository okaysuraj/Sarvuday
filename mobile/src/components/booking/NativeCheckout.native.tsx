import { initPaymentSheet, initStripe, presentPaymentSheet } from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import { apiClient } from '../../api/client';
import { errorMessage, useApiResource } from '../../hooks/use-api-resource';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export default function NativeCheckout() {
  const params = useLocalSearchParams<{
    counsellorId?: string;
    slotId?: string;
  }>();
  const router = useRouter();
  const state = useApiResource(
    params.counsellorId ? `/content/counsellors/${encodeURIComponent(params.counsellorId)}` : null,
  );
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState<{
    payment_id: string;
    clientSecret: string;
    publishableKey: string;
  } | null>(null);
  const [providerConfirmed, setProviderConfirmed] = useState(false);
  const fee = state.data?.session_fee == null ? null : Number(state.data.session_fee);
  const pay = async () => {
    if (processing || !params.slotId || !params.counsellorId) return;
    setProcessing(true);
    setError('');
    try {
      let checkout = payment;
      if (fee !== 0) {
        if (!checkout) {
          checkout = (
            await apiClient.post('/payments/create-intent', {
              availability_slot_id: params.slotId,
            })
          ).data;
          setPayment(checkout);
        }
        if (!checkout) throw new Error('Checkout could not start.');
        if (!providerConfirmed) {
          await initStripe({
            publishableKey: checkout.publishableKey,
            urlScheme: Linking.createURL(''),
          });
          const initialized = await initPaymentSheet({
            merchantDisplayName: 'Sarvuday',
            paymentIntentClientSecret: checkout.clientSecret,
            returnURL: Linking.createURL('stripe-redirect'),
            allowsDelayedPaymentMethods: false,
          });
          if (initialized.error) throw new Error(initialized.error.message);
          const presented = await presentPaymentSheet();
          if (presented.error)
            throw new Error(
              presented.error.code === 'Canceled'
                ? 'Payment was canceled.'
                : presented.error.message,
            );
          setProviderConfirmed(true);
        }
        await apiClient.post('/user/payments/verify', {
          payment_id: checkout.payment_id,
        });
      }
      await apiClient.post('/user/appointments', {
        counsellor_id: params.counsellorId,
        availability_slot_id: params.slotId,
        payment_id: checkout?.payment_id,
      });
      router.replace('/(tabs)/appointments');
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setProcessing(false);
    }
  };
  return (
    <Screen title="Confirm your session">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {!params.slotId && (
        <Card>
          <Text className="text-on-surface">Choose an available appointment time first.</Text>
          <Action
            title="Find a therapist"
            onPress={() => router.replace('/(tabs)/therapists')}
          />
        </Card>
      )}
      {state.data && params.slotId && (
        <Card>
          <Text className="text-xl font-semibold text-on-surface">{state.data.name}</Text>
          <Text className="text-on-surface">
            Session fee: {Number.isFinite(fee) ? `INR ${fee}` : 'Unavailable'}
          </Text>
          {!!error && (
            <Text accessibilityRole="alert" className="text-error">
              {error}
            </Text>
          )}
          <Action
            title={
              processing
                ? 'Confirming…'
                : providerConfirmed
                  ? 'Verify payment and book'
                  : fee === 0
                    ? 'Book free session'
                    : 'Pay and book session'
            }
            disabled={processing || !Number.isFinite(fee) || Number(fee) < 0}
            onPress={pay}
          />
          <Text className="text-sm text-on-surface-variant">
            The server confirms your booking after verifying payment and securing the selected time
            slot.
          </Text>
        </Card>
      )}
    </Screen>
  );
}
