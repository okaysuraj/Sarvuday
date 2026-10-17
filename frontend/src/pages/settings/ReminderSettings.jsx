import { Link } from 'react-router-dom';
import { PageHeading } from '../../components/common/DataState';

export default function ReminderSettings() {
  return (
    <section className="max-w-2xl">
      <PageHeading title="Reminders" />
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <p>Custom reminder schedules are currently unavailable.</p>
        <p className="text-on-surface-variant">
          Review your appointment times and the notifications saved in your account.
        </p>
        <div className="flex flex-wrap gap-6">
          <Link to="/appointments" className="underline">
            Appointments
          </Link>
          <Link to="/notifications" className="underline">
            Notifications
          </Link>
        </div>
      </div>
    </section>
  );
}
