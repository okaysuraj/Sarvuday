import useApiData from '../../hooks/useApiData';
import { DataState, Metric, PageHeading } from '../../components/common/DataState';

export default function Wallet() {
  const wallet = useApiData('/payments/wallet');
  const history = useApiData('/payments/history');
  return <section className="space-y-6"><PageHeading title="Wallet and payments" /><DataState {...wallet}><Metric label="Recorded wallet balance (INR)" value={wallet.data?.balance} /><p className="text-on-surface-variant mt-4">Wallet funding and withdrawals are currently unavailable. Session payments are handled at checkout.</p></DataState><h2 className="text-xl font-semibold">Payment history</h2><DataState {...history}>{Array.isArray(history.data) && history.data.length ? <ul className="space-y-3">{history.data.map(payment => <li key={payment.payment_id} className="rounded-xl border border-stone-200 bg-white p-5 flex flex-wrap justify-between gap-4"><span>{payment.currency} {payment.amount}</span><span>{payment.status}</span><time dateTime={payment.transaction_date}>{new Date(payment.transaction_date).toLocaleDateString()}</time></li>)}</ul> : <p>No payments recorded yet.</p>}</DataState></section>;
}
