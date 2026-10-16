import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axiosInstance from '../../utils/axiosInstance';
import useApiData from '../../hooks/useApiData';
import { DataState, PageHeading } from '../../components/common/DataState';

const STORAGE_KEY = 'pendingAppointmentCheckout';
function readPending() { try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; } }

function PaymentForm({ paymentId, finish, setError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const submit = async event => {
    event.preventDefault();
    if (!stripe || !elements || processing) return;
    setProcessing(true);
    setError('');
    try {
      const result = await stripe.confirmPayment({ elements, confirmParams: { return_url: `${window.location.origin}/booking/payment?payment_id=${encodeURIComponent(paymentId)}` }, redirect: 'if_required' });
      if (result.error) throw new Error(result.error.message);
      if (result.paymentIntent?.status !== 'succeeded') throw new Error('Your payment is still processing. Wait for confirmation before trying again.');
      await finish(paymentId);
    } catch (error) { setError(error.userMessage || error.message || 'Checkout could not complete.'); }
    finally { setProcessing(false); }
  };
  return <form onSubmit={submit} className="space-y-6"><PaymentElement /><button className="btn-primary" disabled={!stripe || processing}>{processing ? 'Confirming payment?' : 'Pay and book session'}</button></form>;
}

export default function BookingPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking] = useState(() => location.state?.selectedSlot ? location.state : readPending()?.booking);
  const [intent, setIntent] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const state = useApiData(`/content/counsellors/${encodeURIComponent(booking?.counsellorId || '')}`);
  const stripe = useMemo(() => intent?.publishableKey ? loadStripe(intent.publishableKey) : null, [intent?.publishableKey]);
  const returnPaymentId = new URLSearchParams(location.search).get('payment_id');
  const fee = state.data?.session_fee == null ? null : Number(state.data.session_fee);
  const slotId = booking?.selectedSlot?.availability_slot_id || booking?.selectedSlot?.id;

  const finish = async paymentId => {
    if (paymentId) await axiosInstance.post('/user/payments/verify', { payment_id: paymentId });
    await axiosInstance.post('/user/appointments', { counsellor_id: booking.counsellorId, availability_slot_id: slotId, reason: booking.bookingType || undefined, payment_id: paymentId || undefined });
    sessionStorage.removeItem(STORAGE_KEY);
    navigate('/appointments', { replace: true });
  };
  const start = async () => {
    if (processing) return;
    setProcessing(true);
    setError('');
    try {
      if (returnPaymentId) {
        if (returnPaymentId !== readPending()?.payment_id) throw new Error('This checkout does not match your pending booking.');
        await finish(returnPaymentId);
      } else if (fee === 0) await finish(null);
      else {
        const response = await axiosInstance.post('/payments/create-intent', { availability_slot_id: slotId });
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ booking, payment_id: response.data.payment_id }));
        setIntent(response.data);
      }
    } catch (failure) { setError(failure.userMessage || failure.message || 'Checkout could not start.'); }
    finally { setProcessing(false); }
  };

  if (!booking || !slotId) return <section><PageHeading title="Choose a session first" /><Link to="/therapists" className="underline">Browse therapists</Link></section>;
  return <section className="max-w-3xl mx-auto pb-12"><PageHeading title="Confirm your session">Review your appointment and complete checkout.</PageHeading><DataState {...state}>
    <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-6">
      <div><h2 className="text-xl font-semibold">{state.data?.name}</h2><p className="text-on-surface-variant mt-2">{new Date(booking.selectedSlot.start_time).toLocaleString()}</p></div>
      <p className="text-lg font-semibold">Session fee: {Number.isFinite(fee) ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(fee) : 'Unavailable'}</p>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {intent && stripe ? <Elements stripe={stripe} options={{ clientSecret: intent.clientSecret }}><PaymentForm paymentId={intent.payment_id} finish={finish} setError={setError} /></Elements> : <button onClick={start} disabled={processing || !Number.isFinite(fee) || fee < 0} className="btn-primary">{processing ? 'Confirming?' : returnPaymentId ? 'Verify payment and book' : fee === 0 ? 'Book free session' : 'Continue to payment'}</button>}
      <p className="text-sm text-on-surface-variant">A booking is confirmed after the server verifies your payment and secures the selected time slot.</p>
      <Link to="/appointments" className="inline-block underline text-sm">View your appointments</Link>
    </div>
  </DataState></section>;
}
