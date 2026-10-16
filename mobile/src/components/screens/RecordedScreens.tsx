import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Action, Card, RequestState, Screen } from '../common/Screen';
import { useApiResource } from '../../hooks/use-api-resource';
import { useAuthStore } from '../../store/authStore';

const labels = ['Very low', 'Low', 'Neutral', 'Good', 'Great'];
function Metric({ label, value }: { label: string; value: unknown }) {
  return <Card><Text className="text-on-surface-variant text-sm">{label}</Text><Text className="text-on-surface text-2xl font-semibold">{value == null ? 'Not recorded' : String(value)}</Text></Card>;
}

export function RecordedTherapists() {
  const router = useRouter();
  const state = useApiResource('/content/counsellors');
  const [search, setSearch] = useState('');
  const records = Array.isArray(state.data?.counsellors) ? state.data.counsellors : [];
  const filtered = records.filter((record: any) => `${record.name} ${JSON.stringify(record.specializations || [])}`.toLowerCase().includes(search.toLowerCase()));
  return <Screen title="Find a therapist" scroll={false}>
    <View className="p-5"><TextInput accessibilityLabel="Search therapists" placeholder="Search by name or specialization" value={search} onChangeText={setSearch} className="min-h-12 bg-surface rounded-xl border border-outline px-4 text-on-surface" /></View>
    <RequestState loading={state.loading} error={state.error} retry={state.reload} />
    {!state.loading && !state.error && <FlatList data={filtered} keyExtractor={(record: any) => record.user_id} initialNumToRender={6} maxToRenderPerBatch={6} windowSize={5} contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }} ListEmptyComponent={<Text className="text-on-surface-variant">No matching therapists are available.</Text>} renderItem={({ item }: any) => <Card><Text className="text-lg font-semibold text-on-surface">{item.name}</Text><Text className="text-on-surface-variant">{Array.isArray(item.specializations) ? item.specializations.join(', ') : item.specializations}</Text><Text className="text-on-surface">{item.session_fee == null ? 'Fee unavailable' : `INR ${item.session_fee} per session`}</Text><Action title="View available times" onPress={() => router.push({ pathname: '/patient/book_appointment', params: { counsellorId: item.user_id } })} /></Card>} />}
  </Screen>;
}

export function RecordedWallet() {
  const wallet = useApiResource('/payments/wallet');
  const history = useApiResource<any[]>('/payments/history');
  return <Screen title="Wallet and payments"><RequestState loading={wallet.loading} error={wallet.error} retry={wallet.reload} />{wallet.data && <Metric label="Recorded wallet balance (INR)" value={wallet.data.balance} />}<Text className="text-on-surface-variant">Wallet funding and withdrawals are currently unavailable. Session payments are handled at checkout.</Text><Text className="text-lg font-semibold text-on-surface">Payment history</Text><RequestState loading={history.loading} error={history.error} retry={history.reload} empty={Array.isArray(history.data) && !history.data.length ? 'No payments recorded yet.' : undefined} />{Array.isArray(history.data) && history.data.map(record => <Card key={record.payment_id}><Text className="font-semibold text-on-surface">{record.currency} {record.amount}</Text><Text className="text-on-surface-variant">{record.status}</Text><Text className="text-on-surface-variant">{new Date(record.transaction_date).toLocaleString()}</Text></Card>)}</Screen>;
}

export function RecordedProgress() {
  const state = useApiResource<any[]>('/user/tracking/mood/history');
  const records = Array.isArray(state.data) ? state.data : [];
  const values = records.map(record => record.mood == null ? NaN : Number(record.mood)).filter(value => Number.isInteger(value) && value >= 0 && value <= 4);
  return <Screen title="Your recorded progress" subtitle="Up to your latest 100 saved check-ins"><RequestState loading={state.loading} error={state.error} retry={state.reload} empty={!state.loading && !state.error && !records.length ? 'No mood records yet. Add a check-in to begin.' : undefined} />{!state.loading && !state.error && <><Metric label="Recorded check-ins" value={records.length} /><Metric label="Average recorded mood (0–4)" value={values.length ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1) : null} />{records.slice(0, 30).map(record => <Card key={record.id}><Text className="text-on-surface font-medium">{labels[Number(record.mood)] || 'Not recorded'}</Text><Text className="text-on-surface-variant">{new Date(record.created_at).toLocaleString()}</Text>{!!record.notes && <Text className="text-on-surface">{record.notes}</Text>}</Card>)}</>}</Screen>;
}

export function RecordedCorrelation() {
  const state = useApiResource('/user/tracking/correlation');
  const points = Array.isArray(state.data?.data_points) ? state.data.data_points : [];
  return <Screen title="Sleep and mood" subtitle="Paired measurements from saved records"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <Text className="text-on-surface-variant">{state.data.insight}</Text>}{points.map((point: any) => <Card key={point.date}><Text className="font-semibold text-on-surface">{point.date}</Text><Text className="text-on-surface">Sleep: {point.sleep == null ? 'Not recorded' : `${point.sleep} hours`}</Text><Text className="text-on-surface">Mood (0–4): {point.mood ?? 'Not recorded'}</Text></Card>)}</Screen>;
}

export function RecordedBiofeedback() {
  const state = useApiResource('/user/tracking/biofeedback');
  return <Screen title="Wearable measurements"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <><Metric label="Heart rate (bpm)" value={state.data.heart_rate} /><Metric label="Heart rate variability (ms)" value={state.data.hrv} /><Metric label="Daily steps" value={state.data.daily_steps} /><Text className="text-on-surface-variant">{state.data.measured_at ? `Measured: ${new Date(state.data.measured_at).toLocaleString()}` : 'No connected device measurements have been saved.'}</Text></>}</Screen>;
}

export function RecordedInsights() {
  const state = useApiResource('/ai-insights/summary');
  return <Screen title="Your recorded insights"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <Card><Text className="text-on-surface">{state.data.overall_mood || 'No summary is available yet.'}</Text>{state.data.recommendations?.map((recommendation: string) => <Text key={recommendation} className="text-on-surface-variant">{recommendation}</Text>)}</Card>}</Screen>;
}

export function RecordedAdminDashboard() {
  const state = useApiResource('/admin/dashboard');
  const router = useRouter();
  return <Screen title="Platform overview"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <><Metric label="Registered users" value={state.data.total_active_users} /><Metric label="Counsellor records" value={state.data.active_therapists} /><Metric label="Recorded revenue (INR)" value={state.data.total_revenue} /><Action title="Review moderation queue" onPress={() => router.push('/admin/moderation')} /></>}</Screen>;
}

export function RecordedTherapistDashboard() {
  const state = useApiResource('/counsellor/dashboard');
  const router = useRouter();
  return <Screen title="Your practice"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <><Metric label="Upcoming appointments" value={state.data.upcoming_appointments} /><Metric label="Recorded sessions" value={state.data.total_sessions} /><Metric label="Average review rating" value={state.data.average_rating} /><Action title="Patient appointments" onPress={() => router.push('/counsellor/patients')} /><Action title="View earnings" onPress={() => router.push('/finance/revenue-dashboard')} /></>}</Screen>;
}

export function RecordedPatientDashboard() {
  const state = useApiResource('/user/dashboard');
  const user = useAuthStore(value => value.user);
  const router = useRouter();
  return <Screen title="Your wellbeing dashboard" subtitle={user?.name}><RequestState loading={state.loading} error={state.error} retry={state.reload} /><Action title="Check in" onPress={() => router.push('/tracking/mood-check-in')} /><Action title="Your journal" onPress={() => router.push('/tracking/journal')} /><Action title="Find a therapist" onPress={() => router.push('/patient/therapist_list')} /><Action title="Your appointments" onPress={() => router.push('/(tabs)/appointments')} /><Action title="Review your progress" onPress={() => router.push('/patient/progress_review')} /></Screen>;
}

export function RecordedEarnings() {
  const state = useApiResource('/counsellor/payments?limit=20');
  return <Screen title="Your payouts"><RequestState loading={state.loading} error={state.error} retry={state.reload} />{state.data && <><Metric label="Total recorded payout amount (INR)" value={state.data.total_amount} />{state.data.payments?.map((record: any) => <Card key={record.payment_id}><Text className="font-semibold text-on-surface">{record.currency} {record.net_payout_amount}</Text><Text className="text-on-surface-variant">{record.status}</Text></Card>)}{!state.data.payments?.length && <Text className="text-on-surface-variant">No payout records yet.</Text>}</>}</Screen>;
}
