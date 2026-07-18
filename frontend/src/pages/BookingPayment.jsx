import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const BookingPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const { counsellorId, bookingType, selectedDate, selectedSlot } = state;

  const [paymentMethod, setPaymentMethod] = useState('card_4242');
  const [loading, setLoading] = useState(false);
  const [counsellor, setCounsellor] = useState(null);

  useEffect(() => {
    if (!counsellorId || !selectedSlot) {
      navigate(-1);
      return;
    }

    const fetchCounsellor = async () => {
      try {
        const res = await axiosInstance.get(`/content/counsellors/${counsellorId}`);
        setCounsellor(res.data);
      } catch (err) {
        console.error('Failed to load counsellor', err);
      }
    };
    fetchCounsellor();
  }, [counsellorId, selectedSlot, navigate]);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Create the appointment (backend handles dummy payment for now)
      const payload = { 
        counsellor_id: counsellorId, 
        availability_slot_id: selectedSlot.id,
        reason: bookingType
      };
      await axiosInstance.post('/user/appointments', payload);
      
      toast.success("Payment successful! Appointment booked.");
      // Redirect to appointments list or dashboard
      navigate('/my-records'); // Assuming appointments are shown in my-records or we will create /appointments
    } catch (error) {
      console.error("Payment failed", error);
      toast.error(error.response?.data?.detail || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedSlot) return null;

  const fee = counsellor?.session_fee || 1500;
  const tax = fee * 0.18;
  const total = fee + tax;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .active-press:active {
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
            transform: translate(2px, 2px);
        }
        .custom-radio {
            appearance: none;
            width: 20px;
            height: 20px;
            border: 1.5px solid #1A1A1A;
            border-radius: 50%;
            background-color: #fff;
            position: relative;
            cursor: pointer;
        }
        .custom-radio:checked::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            background-color: #002da5;
            border-radius: 50%;
        }
      `}</style>

      {/* Top Header */}
      <div className="flex justify-between items-center mb-12 border-b-[1.5px] border-ink-black pb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="font-headline-md text-headline-md font-bold text-primary">Secure Checkout</div>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          <span className="font-label-md">Secure</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Payment Methods */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="mb-2">
            <h1 className="font-display-lg text-display-lg text-ink-black mb-2">Payment</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Choose how you'd like to fund your session.</p>
          </div>

          {/* Saved Cards Accordion */}
          <div className="bg-white border-[1.5px] border-ink-black rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              <h2 className="font-headline-sm text-ink-black">Saved Cards</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Card Option 1 */}
              <label className="flex items-center justify-between p-4 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <input 
                    checked={paymentMethod === 'card_4242'} 
                    onChange={() => setPaymentMethod('card_4242')}
                    className="custom-radio" 
                    name="payment_method" 
                    type="radio"
                  />
                  <div className="w-12 h-8 bg-surface-container-high rounded flex items-center justify-center border border-ink-black/20">
                    <span className="font-label-bold text-[10px]">VISA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-bold">Visa ending in 4242</span>
                    <span className="font-body-md text-[12px] text-on-surface-variant">Expires 12/25</span>
                  </div>
                </div>
              </label>
            </div>
            
            <button className="mt-6 flex items-center gap-2 text-primary font-label-bold hover:text-primary/80 transition-colors">
              <span className="material-symbols-outlined">add_circle</span>
              Add a new credit or debit card
            </button>
          </div>

          {/* UPI Option */}
          <div className="bg-white border-[1.5px] border-ink-black rounded-3xl p-6 hover:bg-surface-container transition-colors cursor-pointer">
            <label className="flex items-center justify-between cursor-pointer w-full">
              <div className="flex items-center gap-4">
                <input 
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="custom-radio" 
                  name="payment_method" 
                  type="radio"
                />
                <div className="w-10 h-10 rounded-full bg-accent-sage flex items-center justify-center border-[1.5px] border-ink-black">
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                </div>
                <span className="font-headline-sm text-ink-black text-xl">UPI / QR</span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <aside className="w-full lg:w-[400px] flex-shrink-0 flex flex-col gap-6">
          <div className="bg-accent-sage border-[1.5px] border-ink-black rounded-3xl p-8 sticky top-28 neo-shadow">
            <h3 className="font-headline-md text-ink-black border-b-[1.5px] border-ink-black pb-4 mb-4">Order Summary</h3>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-label-bold">Therapy Session ({bookingType})</span>
                  <span className="font-body-md text-sm text-ink-black/70">{counsellor?.name || 'Therapist'} ({counsellor?.session_duration || 50} min)</span>
                  <span className="font-body-md text-xs text-ink-black/60 mt-1">{new Date(selectedDate).toDateString()} at {selectedSlot.start_time.substring(0,5)}</span>
                </div>
                <span className="font-label-md">₹{fee.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t-[1.5px] border-ink-black pt-4 flex flex-col gap-2 mb-6">
              <div className="flex justify-between">
                <span className="font-body-md text-ink-black/70">Subtotal</span>
                <span className="font-body-md">₹{fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body-md text-ink-black/70">Tax (Estimated)</span>
                <span className="font-body-md">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t-[1.5px] border-ink-black border-dashed">
                <span className="font-headline-sm text-ink-black">Total</span>
                <span className="font-headline-sm text-ink-black">₹{total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleConfirm}
              disabled={loading}
              className="w-full h-14 bg-primary text-white border-[1.5px] border-ink-black rounded-xl font-label-bold text-lg flex items-center justify-center gap-2 neo-shadow active-press transition-all disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm & Pay'}
              {!loading && <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>}
            </button>
            
            <p className="text-center font-body-md text-sm text-ink-black/70 mt-4 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Payments are secure and encrypted.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingPayment;
