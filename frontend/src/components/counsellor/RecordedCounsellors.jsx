import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { DataState, PageHeading } from '../common/DataState';

function list(value) { return Array.isArray(value) ? value.join(', ') : value; }
export function RecordedTherapistSearch() {
  const state = useApiData('/content/counsellors');
  const [query, setQuery] = useState('');
  const records = (state.data?.counsellors || []).filter(record => `${record.name} ${list(record.specializations) || ''}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="space-y-6"><PageHeading title="Find a therapist">Browse approved counsellors and their available appointment times.</PageHeading><label className="block max-w-xl">Search by name or specialization<input className="input-field mt-2" value={query} onChange={event => setQuery(event.target.value)} type="search" /></label><DataState {...state}>{records.length ? <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{records.map(record => <li key={record.user_id} className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col gap-4"><h2 className="text-xl font-semibold">{record.name}</h2><p className="text-on-surface-variant">{list(record.specializations)}</p><p>{record.session_fee == null ? 'Fee unavailable' : `INR ${record.session_fee} per session`}</p><Link to={`/therapists/${record.user_id}`} className="underline mt-auto">View profile and available times</Link></li>)}</ul> : <p>No matching counsellors are available.</p>}</DataState></section>;
}

export function RecordedTherapistProfile() {
  const { id } = useParams();
  const state = useApiData(`/content/counsellors/${encodeURIComponent(id)}`);
  const record = state.data;
  return <section className="max-w-3xl mx-auto"><DataState {...state}>{record && <><PageHeading title={record.name}>{list(record.specializations)}</PageHeading><div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 space-y-6">{record.profile_pic && <img src={record.profile_pic} alt={record.name} className="w-24 h-24 rounded-xl object-cover" />}<p>{record.bio || 'No biography has been provided.'}</p><dl className="grid sm:grid-cols-2 gap-4"><div><dt className="text-sm text-on-surface-variant">Languages</dt><dd>{list(record.languages) || 'Not recorded'}</dd></div><div><dt className="text-sm text-on-surface-variant">Experience</dt><dd>{record.experience_years == null ? 'Not recorded' : `${record.experience_years} years`}</dd></div><div><dt className="text-sm text-on-surface-variant">Session fee</dt><dd>{record.session_fee == null ? 'Unavailable' : `INR ${record.session_fee}`}</dd></div><div><dt className="text-sm text-on-surface-variant">Session duration</dt><dd>{record.session_duration == null ? 'Not recorded' : `${record.session_duration} minutes`}</dd></div></dl><div className="flex flex-wrap gap-5"><Link to="/booking/slot" state={{ counsellorId: record.user_id, bookingType: 'video' }} className="btn-primary">View available times</Link><Link to={`/counsellors/${record.user_id}/reviews`} className="underline self-center">Verified reviews</Link></div></div></>}</DataState></section>;
}
