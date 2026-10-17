// Display saved wallet, payment and counsellor payout records.
import { Text } from 'react-native';
import { useApiResource } from '../../hooks/use-api-resource';
import { Card, Metric, RequestState, Screen } from '../common/Screen';

export function WalletScreen() {
  const wallet = useApiResource('/payments/wallet');
  const history = useApiResource<any[]>('/payments/history');
  return (
    <Screen title="Wallet and payments">
      <RequestState loading={wallet.loading} error={wallet.error} retry={wallet.reload} />
      {wallet.data && <Metric label="Recorded wallet balance (INR)" value={wallet.data.balance} />}
      <Text className="text-on-surface-variant">
        Wallet funding and withdrawals are currently unavailable. Session payments are handled at
        checkout.
      </Text>
      <Text className="text-lg font-semibold text-on-surface">Payment history</Text>
      <RequestState
        loading={history.loading}
        error={history.error}
        retry={history.reload}
        empty={
          Array.isArray(history.data) && !history.data.length
            ? 'No payments recorded yet.'
            : undefined
        }
      />
      {Array.isArray(history.data) &&
        history.data.map((record) => (
          <Card key={record.payment_id}>
            <Text className="font-semibold text-on-surface">
              {record.currency} {record.amount}
            </Text>
            <Text className="text-on-surface-variant">{record.status}</Text>
            <Text className="text-on-surface-variant">
              {new Date(record.transaction_date).toLocaleString()}
            </Text>
          </Card>
        ))}
    </Screen>
  );
}

export function EarningsScreen() {
  const state = useApiResource('/counsellor/payments?limit=20');
  return (
    <Screen title="Your payouts">
      <RequestState loading={state.loading} error={state.error} retry={state.reload} />
      {state.data && (
        <>
          <Metric label="Total recorded payout amount (INR)" value={state.data.total_amount} />
          {state.data.payments?.map((record: any) => (
            <Card key={record.payment_id}>
              <Text className="font-semibold text-on-surface">
                {record.currency} {record.net_payout_amount}
              </Text>
              <Text className="text-on-surface-variant">{record.status}</Text>
            </Card>
          ))}
          {!state.data.payments?.length && (
            <Text className="text-on-surface-variant">No payout records yet.</Text>
          )}
        </>
      )}
    </Screen>
  );
}
