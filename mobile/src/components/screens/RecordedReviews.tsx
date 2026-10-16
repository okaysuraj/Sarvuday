import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApiResource, errorMessage } from '../../hooks/use-api-resource';
import { apiClient } from '../../api/client';
import { Action, Card, RequestState, Screen } from '../common/Screen';

export default function RecordedReviews() {
  const params = useLocalSearchParams<{ id?: string; counsellorId?: string; therapist_id?: string }>();
  const id = params.id || params.counsellorId || params.therapist_id;
  const router = useRouter();
  const state = useApiResource<any[]>(id ? `/content/counsellors/${encodeURIComponent(id)}/reviews` : null);
  const appointments = useApiResource('/user/appointments?upcoming=false&limit=100');
  const eligible = (appointments.data?.appointments || []).filter((appointment: any) => appointment.status === 'completed' && appointment.counsellor?.user_id === id);
  const [selected, setSelected] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const save = async () => {
    if (!id || !selected || !rating || !content.trim() || saving) return;
    setSaving(true);
    try { await apiClient.post(`/content/counsellors/${encodeURIComponent(id)}/reviews`, { appointment_id: selected, rating, content }); setMessage('Your review was saved.'); setContent(''); state.reload(); }
    catch (cause) { setMessage(errorMessage(cause)); }
    finally { setSaving(false); }
  };
  return <Screen title="Verified therapist reviews">{!id ? <Action title="Choose a therapist" onPress={() => router.push('/patient/therapist_list')} /> : <><RequestState loading={state.loading} error={state.error} retry={state.reload} empty={!state.loading && !state.error && !state.data?.length ? 'No verified reviews yet.' : undefined} />{state.data?.map(review => <Card key={review.id}><Text className="font-semibold text-on-surface">{review.author} · {review.rating}/5</Text><Text className="text-on-surface">{review.content}</Text><Text className="text-sm text-on-surface-variant">{new Date(review.created_at).toLocaleDateString()}</Text></Card>)}<RequestState loading={appointments.loading} error={appointments.error} retry={appointments.reload} />{eligible.length > 0 && <Card><Text className="text-lg font-semibold text-on-surface">Review a completed session</Text>{eligible.map((appointment: any) => <Action key={appointment.appointment_id} title={`${selected === appointment.appointment_id ? 'Selected: ' : ''}${new Date(appointment.session.session_scheduled_at).toLocaleString()}`} onPress={() => setSelected(appointment.appointment_id)} />)}<Text className="text-on-surface">Rating (1–5)</Text><View className="flex-row flex-wrap gap-2">{[1, 2, 3, 4, 5].map(value => <Action key={value} title={`${value}${rating === value ? ' ✓' : ''}`} onPress={() => setRating(value)} />)}</View><TextInput accessibilityLabel="Your review" placeholder="Describe your experience" multiline value={content} onChangeText={setContent} maxLength={10000} className="border border-outline rounded-xl p-4 text-on-surface min-h-24" /><Action title={saving ? 'Saving…' : 'Submit review'} disabled={saving || !selected || !rating || !content.trim()} onPress={() => void save()} /></Card>}{!appointments.loading && !appointments.error && !eligible.length && <Text className="text-on-surface-variant">A completed appointment with this therapist is required to leave a review.</Text>}</>}{!!message && <Text accessibilityRole="alert" className="text-on-surface">{message}</Text>}</Screen>;
}
