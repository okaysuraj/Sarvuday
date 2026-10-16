import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { PageHeading } from '../../components/common/DataState';

export default function AccountData() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const exportTracking = async () => {
    setSaving(true);
    setError('');
    try {
      const paths = { moods: '/user/tracking/mood/history', sleep: '/user/tracking/sleep', journal: '/user/tracking/journal', medications: '/user/tracking/medications', goals: '/user/tracking/goals' };
      const entries = await Promise.all(Object.entries(paths).map(async ([name, path]) => [name, (await axiosInstance.get(path)).data]));
      const blob = new Blob([JSON.stringify({ exported_at: new Date().toISOString(), scope: 'Personal tracking records returned by the account API. Does not include chat, clinical notes, or records beyond API history limits.', ...Object.fromEntries(entries) }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'sarvuday-tracking-records.json';
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setError('Your export could not be downloaded. Please try again.'); }
    finally { setSaving(false); }
  };
  return <section className="max-w-2xl space-y-6"><PageHeading title="Account and data" /><div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4"><h2 className="text-xl font-semibold">Download tracking records</h2><p>Export the mood, sleep, journal, medication, and goal records currently available through your account history. Chat and clinical records are not included.</p>{error && <p role="alert">{error}</p>}<button className="btn-primary" onClick={exportTracking} disabled={saving}>{saving ? 'Preparing download?' : 'Download tracking records'}</button></div><div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4"><h2 className="text-xl font-semibold">Account deletion and full archive</h2><p>Automatic account erasure and full account archives are currently unavailable. Contact support about a data request.</p><Link to="/contact" className="underline">Contact support</Link></div></section>;
}
