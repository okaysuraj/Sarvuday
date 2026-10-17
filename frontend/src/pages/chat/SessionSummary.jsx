import { Link, useLocation } from 'react-router-dom';
import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';

function SavedSummary({ id }) {
  const state = useApiData(`/user/appointments/${encodeURIComponent(id)}`);
  return (
    <DataState {...state}>
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-3">
        <p>Therapist: {state.data?.counsellor?.name}</p>
        <p>Status: {state.data?.status}</p>
        {state.data?.session?.session_scheduled_at && (
          <p>Scheduled: {new Date(state.data.session.session_scheduled_at).toLocaleString()}</p>
        )}
        <Link className="inline-block underline" to="/session/notes">
          Write a personal reflection
        </Link>
      </div>
    </DataState>
  );
}
export default function SessionSummary() {
  const location = useLocation();
  const id =
    location.state?.appointment?.appointment_id ||
    new URLSearchParams(location.search).get('appointment_id');
  return (
    <section>
      <PageHeading title="Session record" />
      {id ? <SavedSummary id={id} /> : <p>Select an appointment to view its saved record.</p>}
      <Link to="/appointments" className="inline-block underline mt-6">
        View appointments
      </Link>
    </section>
  );
}
