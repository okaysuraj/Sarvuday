import { Link } from 'react-router-dom';
import { PageHeading } from '../../components/common/DataState';

export default function Subscriptions() {
  return (
    <section className="max-w-2xl">
      <PageHeading title="Subscriptions" />
      <div className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <p>Subscription plans are currently unavailable.</p>
        <p className="text-on-surface-variant">
          You can book individual sessions with a therapist and review the fee before paying.
        </p>
        <Link to="/therapists" className="inline-block underline">
          Browse therapists
        </Link>
      </div>
    </section>
  );
}
