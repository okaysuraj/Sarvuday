import { Link } from 'react-router-dom';
import useApiData from '../../hooks/useApiData';
import { DataState, Metric, PageHeading } from '../common/DataState';
import { mean, moodValue, recentRecords, recordedStreak } from '../../utils/healthMetrics';

export function UserDashboard() {
  const dashboard = useApiData('/user/dashboard');
  const moods = useApiData('/user/tracking/mood/history');
  const records = Array.isArray(moods.data) ? moods.data : [];
  const week = recentRecords(records, 7);
  return <section className="space-y-8"><PageHeading title="Your wellbeing dashboard">Check in, review your records, or connect with a therapist.</PageHeading>
    <DataState {...dashboard}>{dashboard.data?.user?.name && <p>Welcome, {dashboard.data.user.name}.</p>}</DataState>
    <DataState {...moods}><div className="grid sm:grid-cols-3 gap-4"><Metric label="Check-ins in the last 7 days" value={week.length} /><Metric label="Average recorded mood (0–4)" value={mean(week.map(record => moodValue(record.mood)))?.toFixed(1)} /><Metric label="Consecutive days checked in" value={recordedStreak(records)} /></div></DataState>
    <nav aria-label="Care tools" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{[['/mood-tracker/add', 'Check in'], ['/journal', 'Write in your journal'], ['/appointments', 'Your appointments'], ['/therapists', 'Find a therapist'], ['/ai-chat', 'AI companion'], ['/progress', 'Review your progress']].map(([path, label]) => <Link key={path} to={path} className="bg-white border border-stone-200 rounded-xl p-6 font-medium hover:bg-stone-50 focus-visible:outline-offset-4">{label}<span aria-hidden="true" className="float-right">→</span></Link>)}</nav>
  </section>;
}

export function CounsellorDashboard() {
  const state = useApiData('/counsellor/dashboard');
  const appointments = useApiData('/counsellor/appointments?upcoming=true&limit=20');
  return <section className="space-y-6"><PageHeading title="Your practice" /><DataState {...state}><div className="grid sm:grid-cols-3 gap-4"><Metric label="Upcoming appointments" value={state.data?.upcoming_appointments} /><Metric label="Recorded sessions" value={state.data?.total_sessions} /><Metric label="Average review rating" value={state.data?.average_rating} /></div></DataState>
    <div className="flex flex-wrap gap-6"><Link to="/schedule" className="underline">Manage availability</Link><Link to="/counsellor-dashboard/patients" className="underline">Patient appointments</Link><Link to="/earnings" className="underline">View earnings</Link></div>
    <h2 className="text-xl font-semibold">Upcoming sessions</h2><DataState {...appointments}>{appointments.data?.appointments?.length ? <ul className="space-y-3">{appointments.data.appointments.map(appointment => <li key={appointment.appointment_id} className="border border-stone-200 rounded-xl bg-white p-5 flex flex-wrap justify-between gap-4"><div><p className="font-medium">{appointment.user?.name}</p><p className="text-sm mt-1">{new Date(appointment.session.session_scheduled_at).toLocaleString()}</p></div><Link to={`/counselling-session/${appointment.session.session_id}`} className="underline">Open session</Link></li>)}</ul> : <p>No upcoming sessions.</p>}</DataState>
  </section>;
}

export function AdminDashboard() {
  const state = useApiData('/admin/dashboard');
  return <section className="space-y-6"><PageHeading title="Platform overview">Current records from the platform database.</PageHeading><DataState {...state}><div className="grid sm:grid-cols-3 gap-4"><Metric label="Registered users" value={state.data?.total_active_users} /><Metric label="Counsellor records" value={state.data?.active_therapists} /><Metric label="Recorded revenue (INR)" value={state.data?.total_revenue} /></div></DataState><Link to="/admin-dashboard/moderation" className="inline-block underline">Review moderation queue</Link></section>;
}

export function EarningsDashboard() {
  const state = useApiData('/counsellor/payments?limit=20');
  const payments = state.data?.payments || [];
  return <section><PageHeading title="Your payouts">Payout records and their recorded settlement status.</PageHeading><DataState {...state}><div className="mb-6"><Metric label="Total recorded payout amount (INR)" value={state.data?.total_amount} /></div>{payments.length ? <ul className="space-y-3">{payments.map(payment => <li key={payment.payment_id} className="rounded-xl border border-stone-200 bg-white p-5 flex flex-wrap justify-between gap-4"><span>{payment.payment_id}</span><span>{payment.currency} {payment.net_payout_amount}</span><span>{payment.status}</span></li>)}</ul> : <p>No payout records yet.</p>}</DataState></section>;
}
