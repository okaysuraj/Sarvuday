import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const BookingSlot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const counsellorId = location.state?.counsellorId;
  const bookingType = location.state?.bookingType;

  const [counsellor, setCounsellor] = useState(null);
  
  // Date and slot selection
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Generate next 14 days
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (!counsellorId) {
      navigate(-1);
      return;
    }

    // Generate dates
    const generatedDates = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      generatedDates.push(d);
    }
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]);

    // Fetch counsellor
    const fetchCounsellor = async () => {
      try {
        const res = await axiosInstance.get(`/content/counsellors/${counsellorId}`);
        setCounsellor(res.data);
      } catch (err) {
        console.error('Failed to load counsellor', err);
        toast.error('Could not load counsellor profile');
      }
    };
    fetchCounsellor();
  }, [counsellorId, navigate]);

  useEffect(() => {
    if (counsellorId && selectedDate) {
      fetchSlots();
    }
  }, [counsellorId, selectedDate]);

  const fetchSlots = async () => {
    try {
      setLoadingSlots(true);
      const res = await axiosInstance.get('/user/appointments/slots', {
        params: {
          counsellor_id: counsellorId,
          date: selectedDate.toISOString()
        }
      });
      setAvailableSlots(res.data.slots || []);
      setSelectedSlot(null);
    } catch (err) {
      console.error('Failed to load slots', err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      toast.error('Please select a time slot.');
      return;
    }
    
    navigate('/booking/payment', {
      state: {
        counsellorId,
        bookingType,
        selectedDate: selectedDate.toISOString(),
        selectedSlot
      }
    });
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group slots
  const morningSlots = availableSlots.filter(s => {
    const hour = parseInt(s.start_time.split(':')[0], 10);
    return hour < 12;
  });
  
  const afternoonSlots = availableSlots.filter(s => {
    const hour = parseInt(s.start_time.split(':')[0], 10);
    return hour >= 12 && hour < 17;
  });
  
  const eveningSlots = availableSlots.filter(s => {
    const hour = parseInt(s.start_time.split(':')[0], 10);
    return hour >= 17;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col min-h-[calc(100vh-8rem)] relative pb-32">
      <style>{`
        .neo-shadow { box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1); }
        .slot-selected {
          background-color: #fdd33f !important;
          color: #1A1A1A;
          font-weight: 700;
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
          transform: translate(-2px, -2px);
        }
        .date-selected {
          background-color: #002da5 !important;
          color: #ffffff;
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
          transform: translate(-2px, -2px);
          font-weight: 700;
        }
        .active-press:active { transform: translate(2px, 2px); box-shadow: none !important; }
      `}</style>

      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline-sm text-headline-sm text-ink-black">Book a Session</h2>
      </div>

      {counsellor && (
        <div className="mb-8 bg-white border-[1.5px] border-ink-black rounded-[48px] p-8 flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-40 h-40 shrink-0">
            <div className="absolute inset-0 bg-accent-pink rounded-[32px] border-[1.5px] border-ink-black -rotate-6"></div>
            <div className="relative w-full h-full rounded-[32px] border-[1.5px] border-ink-black overflow-hidden bg-white flex items-center justify-center font-bold text-4xl text-ink-black">
              {counsellor.profile_pic ? (
                <img alt="Therapist" className="w-full h-full object-cover" src={counsellor.profile_pic} />
              ) : (
                counsellor.name.charAt(0)
              )}
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="font-headline-md text-headline-md">{counsellor.name}</h2>
              {counsellor.is_featured && <span className="bg-accent-sage px-3 py-1 rounded-full border-[1px] border-ink-black font-label-md text-label-md">Top Rated</span>}
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">{counsellor.bio || 'Clinical Psychologist'}</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-bold text-label-bold">{counsellor.average_rating} ({counsellor.total_reviews} Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span className="font-label-bold text-label-bold">{counsellor.session_duration || 50} min Session</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container rounded-3xl p-6 border-[1.5px] border-ink-black flex flex-col items-center justify-center text-center shrink-0">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fee</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">₹{counsellor.session_fee}</span>
            <span className="font-label-md text-label-md text-on-surface-variant">per session</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm">Select Date</h3>
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {days.map(d => (
                <div key={d} className="text-center font-label-bold text-label-bold text-on-surface-variant">{d}</div>
              ))}
              
              {/* Padding for first day of week */}
              {dates.length > 0 && Array.from({ length: dates[0].getDay() }).map((_, i) => (
                 <div key={'pad'+i} />
              ))}

              {dates.map((d, i) => {
                const isSelected = selectedDate && selectedDate.toDateString() === d.toDateString();
                const isToday = new Date().toDateString() === d.toDateString();
                
                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedDate(d)}
                    className={`aspect-square flex flex-col items-center justify-center border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-accent-sage transition-all ${isSelected ? 'date-selected' : ''}`}
                  >
                    <span className={isSelected ? 'font-label-bold text-label-bold' : 'font-label-md text-label-md'}>{d.getDate()}</span>
                    {isToday && <span className="text-[10px] uppercase font-bold mt-1">Today</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 flex flex-col h-full">
            <h3 className="font-headline-sm text-headline-sm mb-6">Select Time</h3>
            
            {loadingSlots ? (
              <div className="flex justify-center items-center h-40"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center text-on-surface-variant my-auto">No slots available for this date.</div>
            ) : (
              <div className="flex-grow overflow-y-auto pr-2 space-y-8">
                {morningSlots.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">wb_sunny</span>
                      <span className="font-label-bold text-label-bold uppercase tracking-wider">Morning</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {morningSlots.map((s, i) => (
                        <button 
                          key={i} 
                          onClick={() => !s.is_booked && setSelectedSlot(s)}
                          className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.is_booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot?.id === s.id ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                        >
                          {s.start_time.substring(0, 5)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {afternoonSlots.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">light_mode</span>
                      <span className="font-label-bold text-label-bold uppercase tracking-wider">Afternoon</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {afternoonSlots.map((s, i) => (
                        <button 
                          key={i} 
                          onClick={() => !s.is_booked && setSelectedSlot(s)}
                          className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.is_booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot?.id === s.id ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                        >
                          {s.start_time.substring(0, 5)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {eveningSlots.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                      <span className="material-symbols-outlined">dark_mode</span>
                      <span className="font-label-bold text-label-bold uppercase tracking-wider">Evening</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {eveningSlots.map((s, i) => (
                        <button 
                          key={i} 
                          onClick={() => !s.is_booked && setSelectedSlot(s)}
                          className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.is_booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot?.id === s.id ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                        >
                          {s.start_time.substring(0, 5)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-8 bg-white/80 backdrop-blur-md border-t-[1.5px] border-ink-black flex justify-between items-center z-20">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface-variant">Selected Appointment</span>
          <span className="font-label-bold text-label-bold text-ink-black">
            {selectedDate.toDateString()} {selectedSlot ? `at ${selectedSlot.start_time.substring(0, 5)}` : '--:--'}
          </span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate(-1)} className="px-8 py-4 bg-white text-ink-black font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black hover:bg-surface-container transition-all active-press">
            Cancel
          </button>
          <button 
            onClick={handleConfirm}
            className="px-12 py-4 bg-primary text-white font-label-bold text-label-bold rounded-xl border-[1.5px] border-ink-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none active-press transition-all flex items-center gap-2"
          >
            Confirm Appointment
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSlot;
