import { useState } from 'react';
import useApiData from '../../hooks/useApiData';
import axiosInstance from '../../utils/axiosInstance';
import { DataState, PageHeading } from '../../components/common/DataState';

export default function AvailabilityManagement() {
  const state = useApiData('/counsellor/availability');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const save = async event => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setMessage('');
    try {
      if (new Date(end) <= new Date(start)) throw new Error('End time must follow start time.');
      await axiosInstance.post('/counsellor/availability', { start_time: new Date(start).toISOString(), end_time: new Date(end).toISOString() });
      setStart(''); setEnd(''); state.retry(); setMessage('Availability saved.');
    } catch (error) { setMessage(error.userMessage || error.message || 'Your availability could not be saved.'); }
    finally { setSaving(false); }
  };
  const remove = async id => {
    try { await axiosInstance.delete(`/counsellor/availability/${id}`); state.retry(); }
    catch (error) { setMessage(error.userMessage || 'The slot could not be removed.'); }
  };
  return <section className="space-y-6"><PageHeading title="Availability" >Times are displayed in your device's time zone.</PageHeading><form onSubmit={save} className="bg-white border border-stone-200 rounded-xl p-6 flex flex-wrap gap-4 items-end"><label className="space-y-2"><span className="block text-sm">Start</span><input type="datetime-local" required value={start} onChange={event => setStart(event.target.value)} className="input-field" /></label><label className="space-y-2"><span className="block text-sm">End</span><input type="datetime-local" required value={end} onChange={event => setEnd(event.target.value)} className="input-field" /></label><button className="btn-primary" disabled={saving}>{saving ? 'Saving?' : 'Add time slot'}</button></form>{message && <p role="status">{message}</p>}<DataState {...state}>{state.data?.slots?.length ? <ul className="space-y-3">{state.data.slots.map(slot => <li key={slot.availability_slot_id} className="bg-white border border-stone-200 rounded-xl p-5 flex flex-wrap justify-between gap-4"><div><p>{new Date(slot.start_time).toLocaleString()} ? {new Date(slot.end_time).toLocaleString()}</p><p className="text-sm text-on-surface-variant mt-1">{slot.status}</p></div>{slot.status === 'available' && <button onClick={() => remove(slot.availability_slot_id)} className="underline">Remove slot</button>}</li>)}</ul> : <p>No availability saved yet.</p>}</DataState></section>;
}
