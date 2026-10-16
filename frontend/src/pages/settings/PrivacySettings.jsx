import { Link } from 'react-router-dom';
import { PageHeading } from '../../components/common/DataState';

export default function PrivacySettings() {
  return <section className="max-w-2xl space-y-6"><PageHeading title="Privacy and security" /><div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4"><p>Manage the personal information saved in your account.</p><Link to="/profile/edit" className="inline-block underline">Edit your profile and emergency contact</Link><p className="text-on-surface-variant">Incognito mode and automatic sharing controls are currently unavailable.</p><Link to="/settings/data" className="inline-block underline">Account data options</Link></div></section>;
}
