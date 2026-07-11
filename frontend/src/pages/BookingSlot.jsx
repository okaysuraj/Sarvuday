import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingSlot = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(27);
  const [selectedSlot, setSelectedSlot] = useState('02:00 PM');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock dates for current view (24th to 7th next month)
  const dates = [
    { day: 24, disabled: true },
    { day: 25, disabled: true },
    { day: 26, dot: true },
    { day: 27, today: true },
    { day: 28, dot: true },
    { day: 29 },
    { day: 30 },
    { day: 1 },
    { day: 2, dot: true },
    { day: 3 },
    { day: 4 },
    { day: 5, dot: true },
    { day: 6 },
    { day: 7 }
  ];

  const morningSlots = [
    { time: '09:00 AM' },
    { time: '10:00 AM' },
    { time: '11:00 AM' },
    { time: '11:30 AM', booked: true }
  ];
  
  const afternoonSlots = [
    { time: '02:00 PM' },
    { time: '03:30 PM' },
    { time: '04:00 PM' },
    { time: '05:00 PM' }
  ];
  
  const eveningSlots = [
    { time: '07:00 PM' },
    { time: '08:00 PM' }
  ];

  const handleConfirm = () => {
    navigate('/booking/payment');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col min-h-[calc(100vh-8rem)] relative pb-32">
      <style>{`
        .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
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
        .active-press:active {
          transform: translate(2px, 2px);
          box-shadow: none !important;
        }
      `}</style>

      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline-sm text-headline-sm text-ink-black">Book a Session</h2>
      </div>

      {/* PROFILER HEADER CARD */}
      <div className="mb-8 bg-white border-[1.5px] border-ink-black rounded-[48px] p-8 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-40 h-40 shrink-0">
          <div className="absolute inset-0 bg-accent-pink rounded-[32px] border-[1.5px] border-ink-black -rotate-6"></div>
          <div className="relative w-full h-full rounded-[32px] border-[1.5px] border-ink-black overflow-hidden bg-white">
            <img alt="Therapist" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIaIprFQ4qntUp1qHRyAPR9q4bq9_447AEKH2RhUln2BuKSTQtAvCuWoQXirhibd2dMnabkoKzxl6J5lZT5twWUON9duDRgi6FDtnpezS3_9fQ5nw9jmD2rPtf5_lX8yXUbktbAjjkmK8qot453mrRrXBh1jODDeSMKUHf11g92sOWNXzUYGOCOPa7ngBvs_d7tIfunme2z04aVA2HfqoV4Zj9vb2koBrG740dGpcwOWcFZWi4bRkSRg"/>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="font-headline-md text-headline-md">Dr. Aisha Sharma</h2>
            <span className="bg-accent-sage px-3 py-1 rounded-full border-[1px] border-ink-black font-label-md text-label-md">Top Rated</span>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-4">Clinical Psychologist • PhD in Cognitive Behavioral Therapy</p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label-bold text-label-bold">4.9 (120+ Reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">schedule</span>
              <span className="font-label-bold text-label-bold">50 min Session</span>
            </div>
            <div class="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-surface-variant">language</span>
              <span className="font-label-bold text-label-bold">English, Hindi, Bengali</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-container rounded-3xl p-6 border-[1.5px] border-ink-black flex flex-col items-center justify-center text-center shrink-0">
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fee</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">₹1,500</span>
          <span className="font-label-md text-label-md text-on-surface-variant">per session</span>
        </div>
      </div>

      {/* CALENDAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DATE SELECTION */}
        <div className="lg:col-span-2">
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm">Select Date</h3>
              <div className="flex gap-2">
                <button className="p-2 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 border-[1.5px] border-ink-black rounded-xl hover:bg-surface-container transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {/* Day Headers */}
              {days.map(d => (
                <div key={d} className="text-center font-label-bold text-label-bold text-on-surface-variant">{d}</div>
              ))}
              
              {/* Dates Example */}
              {dates.map((item, i) => {
                const isSelected = selectedDate === item.day;
                
                if (item.disabled) {
                  return (
                    <div key={i} className="aspect-square flex flex-col items-center justify-center border-[1.5px] border-ink-black rounded-2xl bg-surface-container-low opacity-40">
                      <span className="font-label-md text-label-md">{item.day}</span>
                    </div>
                  );
                }
                
                return (
                  <div 
                    key={i} 
                    onClick={() => setSelectedDate(item.day)}
                    className={`aspect-square flex flex-col items-center justify-center border-[1.5px] border-ink-black rounded-2xl cursor-pointer hover:bg-accent-sage transition-all ${isSelected ? 'date-selected' : ''}`}
                  >
                    <span className={isSelected ? 'font-label-bold text-label-bold' : 'font-label-md text-label-md'}>{item.day}</span>
                    {item.today && <span className="text-[10px] uppercase font-bold mt-1">Today</span>}
                    {item.dot && !isSelected && !item.today && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></div>}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex gap-6 items-center border-t-[1.5px] border-ink-black pt-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md border-[1px] border-ink-black bg-primary"></div>
                <span className="font-label-md text-label-md">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md border-[1px] border-ink-black bg-white"></div>
                <span className="font-label-md text-label-md">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md border-[1px] border-ink-black bg-surface-container-low opacity-40"></div>
                <span className="font-label-md text-label-md">Booked</span>
              </div>
            </div>
          </div>
        </div>

        {/* SLOT SELECTION */}
        <div className="lg:col-span-1">
          <div className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 flex flex-col h-full">
            <h3 className="font-headline-sm text-headline-sm mb-6">Select Time</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-8">
              
              {/* Morning Slots */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined">wb_sunny</span>
                  <span className="font-label-bold text-label-bold uppercase tracking-wider">Morning</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {morningSlots.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => !s.booked && setSelectedSlot(s.time)}
                      className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot === s.time ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Afternoon Slots */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined">light_mode</span>
                  <span className="font-label-bold text-label-bold uppercase tracking-wider">Afternoon</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {afternoonSlots.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => !s.booked && setSelectedSlot(s.time)}
                      className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot === s.time ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Evening Slots */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
                  <span className="material-symbols-outlined">dark_mode</span>
                  <span className="font-label-bold text-label-bold uppercase tracking-wider">Evening</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {eveningSlots.map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => !s.booked && setSelectedSlot(s.time)}
                      className={`py-3 px-4 rounded-xl border-[1.5px] border-ink-black text-center transition-all ${s.booked ? 'bg-surface-container-low opacity-40 cursor-not-allowed line-through' : selectedSlot === s.time ? 'slot-selected' : 'hover:bg-secondary-container'}`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* FOOTER / CONFIRM BUTTON (Fixed) */}
      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-8 bg-white/80 backdrop-blur-md border-t-[1.5px] border-ink-black flex justify-between items-center z-20">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface-variant">Selected Appointment</span>
          <span className="font-label-bold text-label-bold text-ink-black">Thursday, 27 Oct at {selectedSlot || '--:--'}</span>
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
