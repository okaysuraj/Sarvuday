import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';
import axiosInstance from '../../utils/axiosInstance';

function Reviews({ id }) {
  const state = useApiData(`/content/counsellors/${encodeURIComponent(id)}/reviews`);
  const appointments = useApiData('/user/appointments?upcoming=false&limit=100');
  const [appointmentId, setAppointmentId] = useState('');
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const eligible = (appointments.data?.appointments || []).filter(
    (appointment) => appointment.status === 'completed' && appointment.counsellor?.user_id === id,
  );
  const save = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await axiosInstance.post(`/content/counsellors/${encodeURIComponent(id)}/reviews`, {
        appointment_id: appointmentId,
        rating: Number(rating),
        content,
      });
      setContent('');
      setMessage('Your review was saved.');
      state.retry();
    } catch (error) {
      setMessage(error.userMessage || 'Your review could not be saved.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="space-y-6">
      <DataState {...state}>
        {Array.isArray(state.data) && state.data.length ? (
          <ul className="space-y-4">
            {state.data.map((review) => (
              <li
                key={review.id}
                className="bg-white border border-stone-200 rounded-xl p-6 space-y-3"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <h2 className="font-semibold">{review.author}</h2>
                  <span aria-label={`${review.rating} out of 5 stars`}>{review.rating}/5</span>
                </div>
                <p>{review.content}</p>
                <time className="text-sm text-on-surface-variant" dateTime={review.created_at}>
                  {new Date(review.created_at).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p>No verified reviews yet.</p>
        )}
      </DataState>
      <h2 className="text-xl font-semibold">Review a completed session</h2>
      <DataState {...appointments}>
        {eligible.length ? (
          <form
            onSubmit={save}
            className="bg-white rounded-xl border border-stone-200 p-6 space-y-4"
          >
            <label className="block">
              Completed appointment
              <select
                className="input-field mt-2"
                required
                value={appointmentId}
                onChange={(event) => setAppointmentId(event.target.value)}
              >
                <option value="">Choose an appointment</option>
                {eligible.map((appointment) => (
                  <option key={appointment.appointment_id} value={appointment.appointment_id}>
                    {new Date(appointment.session.session_scheduled_at).toLocaleString()}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              Rating
              <select
                className="input-field mt-2"
                required
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="">Choose a rating</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value} out of 5
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              Your review
              <textarea
                className="input-field mt-2"
                required
                maxLength={10000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </label>
            <button className="btn-primary" disabled={saving}>
              {saving ? 'Saving?' : 'Submit review'}
            </button>
          </form>
        ) : (
          <p>A completed appointment with this therapist is required to leave a review.</p>
        )}
      </DataState>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
export default function TherapistReviews() {
  const { counsellorId } = useParams();
  return (
    <section className="max-w-3xl mx-auto">
      <PageHeading title="Verified therapist reviews" />
      {counsellorId ? (
        <Reviews id={counsellorId} />
      ) : (
        <Link to="/therapists" className="underline">
          Choose a therapist to view reviews
        </Link>
      )}
    </section>
  );
}
