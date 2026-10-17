import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';
import axiosInstance from '../../utils/axiosInstance';
import { useSession } from '../../utils/session';

function PersonalContact() {
  const state = useApiData('/user/dashboard/profile');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const phone = state.data?.emergency_contact_phone;
  const saveRequest = async () => {
    setSaving(true);
    try {
      await axiosInstance.post('/ai-insights/crisis-alert', {
        risk_level: 'manual',
        source: 'emergency_page',
        notes: 'The user requested support from the emergency page.',
      });
      setMessage(
        'Your request was saved. Emergency services have not been contacted, and a clinician response has not been confirmed.',
      );
    } catch {
      setMessage(
        'Your request could not be saved. Contact local emergency services directly if you need immediate help.',
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="space-y-6">
      <DataState {...state}>
        <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Your emergency contact</h2>
          {phone && /^\+?[\d\s()-]{5,25}$/.test(phone) ? (
            <>
              <p>{state.data.emergency_contact_name}</p>
              <a className="btn-primary inline-flex" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                Call your saved contact
              </a>
            </>
          ) : (
            <p>No emergency contact has been saved.</p>
          )}
          <Link className="inline-block underline" to="/profile/edit">
            Update emergency contact
          </Link>
        </div>
      </DataState>
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Save a support request</h2>
        <p>Saving a request records it in your account. It does not send an emergency dispatch.</p>
        <button className="btn-primary" onClick={saveRequest} disabled={saving}>
          {saving ? 'Saving?' : 'Save support request'}
        </button>
        {message && <p role="status">{message}</p>}
      </div>
    </div>
  );
}
export default function EmergencyHelp() {
  const patient = useSession()?.userType === 'normal_user';
  return (
    <section className="max-w-3xl mx-auto p-6 sm:p-8 space-y-6">
      <PageHeading title="Urgent support" />
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold">If you are in immediate danger</h2>
        <p>
          Contact your local emergency services now, or ask someone you trust to stay with you and
          help you reach urgent care.
        </p>
        <p>This app does not dispatch emergency assistance or automatically share your location.</p>
      </div>
      {patient ? (
        <PersonalContact />
      ) : (
        <p>
          <Link to="/login" className="underline">
            Sign in
          </Link>{' '}
          to view your saved emergency contact.
        </p>
      )}
    </section>
  );
}
