import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const BookingType = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const counsellorId = location.state?.counsellorId;
  const [selectedType, setSelectedType] = useState('video');

  const types = [
    {
      id: 'video',
      title: 'Video Call',
      description: 'Face-to-face interaction from the comfort of your home.',
      icon: 'videocam',
      bg: 'bg-accent-pink',
      popular: true,
    },
    {
      id: 'audio',
      title: 'Audio Only',
      description: 'A voice call focused entirely on conversation and listening.',
      icon: 'call',
      bg: 'bg-accent-sage',
      popular: false,
    },
    {
      id: 'in-person',
      title: 'In-person',
      description: 'Meet your therapist at their physical clinic location.',
      icon: 'location_on',
      bg: 'bg-accent-orange',
      popular: false,
    },
    {
      id: 'chat',
      title: 'Text Chat',
      description: 'Asynchronous messaging for those who prefer writing.',
      icon: 'chat_bubble',
      bg: 'bg-secondary-container',
      popular: false,
    }
  ];

  const handleContinue = () => {
    navigate('/booking/slot', { state: { counsellorId, bookingType: selectedType } });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 flex flex-col min-h-[calc(100vh-8rem)] relative">
      <style>{`
        .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        .active-card {
          background-color: #fdd33f !important;
          transform: translate(4px, 4px);
          box-shadow: none !important;
        }
        .neo-button-active:active {
          transform: translate(2px, 2px);
          box-shadow: none;
        }
      `}</style>
      
      {/* Top Header for Booking */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="font-headline-sm text-headline-sm text-ink-black">Appointment Setup</h2>
      </div>

      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="font-label-bold text-label-bold text-primary">STEP 1 OF 3</span>
          <span className="font-label-md text-label-md text-on-surface-variant">Session Preferences</span>
        </div>
        <div className="w-full h-3 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-secondary-container border-r-[1.5px] border-ink-black"></div>
        </div>
      </div>

      {/* Header Section */}
      <section className="mb-12">
        <h3 className="font-display-lg text-display-lg text-ink-black mb-4">How would you like to connect?</h3>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Choose the session format that makes you feel most comfortable. You can change this later for future appointments.</p>
      </section>

      {/* Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {types.map((type) => {
          const isActive = selectedType === type.id;
          return (
            <div 
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`group cursor-pointer bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex flex-col items-center text-center ${isActive ? 'active-card' : 'neo-shadow'}`}
            >
              <div className={`w-20 h-20 ${type.bg} rounded-2xl border-[1.5px] border-ink-black flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>{type.icon}</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-ink-black mb-3">{type.title}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">{type.description}</p>
              
              {type.popular && (
                <div className="mt-6 flex items-center gap-2 text-primary">
                  <span className="font-label-bold text-label-bold">POPULAR</span>
                  <span className="material-symbols-outlined text-sm">stars</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-auto pt-12 border-t-[1.5px] border-ink-black flex justify-between items-center pb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant hover:text-ink-black font-label-bold transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          GO BACK
        </button>
        <button 
          onClick={handleContinue}
          className="bg-primary text-white px-10 py-4 rounded-2xl border-[1.5px] border-ink-black font-bold neo-shadow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center gap-3"
        >
          Continue Setup
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default BookingType;
