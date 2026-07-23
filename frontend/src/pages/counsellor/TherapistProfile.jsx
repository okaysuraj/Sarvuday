import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const TherapistProfile = () => {
  const { id } = useParams();
  const [counsellor, setCounsellor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const response = await axiosInstance.get(`/content/counsellors/${id}`);
        setCounsellor(response.data);
      } catch (error) {
        console.error('Failed to fetch therapist details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellor();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>;
  }

  if (!counsellor) {
    return <div className="text-center p-8 font-label-bold text-on-surface-variant">Therapist not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .neo-shadow-sm {
            box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
        .active-click:active {
            box-shadow: none;
            transform: translate(2px, 2px);
        }
      `}</style>
      
      {/* Header/Profile Section */}
      <header className="flex flex-col lg:flex-row gap-stack-lg items-start lg:items-center mb-stack-lg">
        <div className="relative group shrink-0">
          <div className="w-48 h-48 rounded-full border-[1.5px] border-on-surface overflow-hidden neo-shadow">
            <img alt="Therapist Profile" className="w-full h-full object-cover" src={counsellor.profile_pic || "https://lh3.googleusercontent.com/aida-public/AB6AXuD8quV2YqIa4iQBbJPQfu8H0pV40IhCvWYzVtbi61yUcVgC9CPUOR2PxizIWsEnbkmo7OeGHTbERdtEbLVGPIWHuTI8Oe_0F9PLrgcpkEie2Ce-kpgdue51OgsWVgxMryni1xDehw07S_itwVPGHrCCr3dve7PX4kIxJ6sygH4jZHqY8W6Wrt-jZJdWKI1pIqYAl6CJp4R1arCKltF4A0hr5dNKUpnSiq8S9eNSsBG3OQ6hFB9TwgQbNQ"}/>
          </div>
          <div className="absolute bottom-2 right-2 bg-secondary-container border-[1.5px] border-on-surface rounded-full p-2 neo-shadow-sm flex items-center justify-center">
            <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <h2 className="font-display-lg text-display-lg text-on-surface">{counsellor.name}</h2>
            <span className="px-4 py-1 rounded-full border-[1.5px] border-on-surface bg-accent-sage font-label-bold text-label-bold">
              {(counsellor.specializations && counsellor.specializations[0]) || 'Therapist'}
            </span>
          </div>
          <p className="font-body-lg text-on-surface-variant max-w-2xl">{counsellor.bio || 'Professional and compassionate therapist.'}</p>
          
          <div className="flex flex-wrap gap-gutter mt-stack-md">
            <div className="bg-surface border-[1.5px] border-on-surface rounded-2xl p-4 neo-shadow-sm flex flex-col items-center justify-center min-w-[140px]">
              <span className="font-display-lg text-headline-sm text-primary">{counsellor.experience_years || 0}+</span>
              <span className="font-label-bold text-on-surface-variant">Years Exp</span>
            </div>
            <div className="bg-secondary-container border-[1.5px] border-on-surface rounded-2xl p-4 neo-shadow-sm flex flex-col items-center justify-center min-w-[140px]">
              <span className="font-display-lg text-headline-sm text-on-secondary-container">{counsellor.average_rating || '5.0'}</span>
              <span className="font-label-bold text-on-surface-variant">Star Rating</span>
            </div>
            <div className="bg-accent-pink border-[1.5px] border-on-surface rounded-2xl p-4 neo-shadow-sm flex flex-col items-center justify-center min-w-[140px]">
              <span className="font-display-lg text-headline-sm text-ink-black">...</span>
              <span className="font-label-bold text-on-surface-variant">Patients</span>
            </div>
          </div>
        </div>
        
        <div className="lg:sticky lg:top-10 w-full lg:w-80 shrink-0">
          <div className="bg-white border-[1.5px] border-on-surface rounded-[32px] p-8 neo-shadow">
            <div className="mb-6">
              <span className="text-on-surface-variant font-label-bold block mb-1">Session Fee</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-headline-md text-on-surface">₹{counsellor.session_fee || '1500'}</span>
                <span className="text-on-surface-variant">/ hour</span>
              </div>
            </div>
            <Link to="/booking/type" state={{ counsellorId: id }} className="w-full bg-primary text-white border-[1.5px] border-on-surface neo-shadow rounded-2xl py-4 font-headline-sm active-click mb-4 flex items-center justify-center gap-3 transition-colors hover:bg-primary/90">
              <span className="material-symbols-outlined">event_available</span>
              Book Appointment
            </Link>
            <button className="w-full bg-white text-on-surface border-[1.5px] border-on-surface rounded-2xl py-4 font-label-bold hover:bg-surface-variant transition-colors">
              Send Message
            </button>
            <p className="mt-4 text-center text-label-md text-on-surface-variant">Next available: Soon</p>
          </div>
        </div>
      </header>

      {/* Bento Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* About Me (Spans 2 columns) */}
        <section className="lg:col-span-2 bg-white border-[1.5px] border-on-surface rounded-[40px] p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">About Me</h3>
          </div>
          <div className="space-y-4 font-body-md text-on-surface-variant leading-relaxed">
            <p>{counsellor.bio || 'Bio not provided.'}</p>
          </div>
          <div className="mt-8">
            <h4 className="font-label-bold text-on-surface mb-4">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {counsellor.specializations && counsellor.specializations.length > 0 ? (
                counsellor.specializations.map((spec, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border-[1.5px] border-on-surface bg-secondary-container text-on-secondary-container font-label-bold">{spec}</span>
                ))
              ) : (
                <span className="px-4 py-2 rounded-full border-[1.5px] border-on-surface bg-surface-container text-on-surface font-label-bold">General</span>
              )}
            </div>
          </div>
        </section>

        {/* Location/Map */}
        <section className="bg-white border-[1.5px] border-on-surface rounded-[40px] p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Location</h3>
          </div>
          <div className="flex-1 rounded-2xl border-[1.5px] border-on-surface overflow-hidden mb-4 h-48 bg-surface-container shrink-0">
            <div className="w-full h-full relative">
              <img alt="Map Location" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgpGxZLL_5bQkF-Lre-XGiIXcylM0bbMw7wweoK_Rr08uabF7vz0xQBa2tVggEIALAxtSKeZmtmChsngPdETVguyrWr170xj4N1uV9W18r8Q3jWB4_cR_qHWwALNrOi69e9vuE9o1n8vSjZ8--oj8lMlk-M9j_AMxuhdFp4uEUkbETExOkS8ICWsbOTCeI-_9Pdbaj-TqxKbA84Frc8euVMuCeudg6FUIyMp31B5o21WBhtfpQEX6uAg"/>
            </div>
          </div>
          <div className="font-body-md mt-auto">
            <p className="font-bold text-on-surface mb-1">Clinic Address</p>
            <p className="text-on-surface-variant text-label-md">{counsellor.address || 'Address not provided'}</p>
            <button className="text-primary font-label-bold mt-2 inline-block hover:underline">Get Directions</button>
          </div>
        </section>

        {/* User Reviews Summary */}
        <section className="lg:col-span-3 bg-white border-[1.5px] border-on-surface rounded-[40px] p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Patient Reviews</h3>
            </div>
            <button className="text-primary font-label-bold flex items-center gap-1 hover:underline">
              See all 84 reviews <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review Card 1 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border-[1.5px] border-on-surface">
              <div className="flex gap-1 mb-4 text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-on-surface mb-4">"Dr. Ananya helped me through a very difficult transition period in my career. Her sessions are the highlight of my week."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full border border-on-surface bg-accent-sage flex items-center justify-center font-bold">R</div>
                <div>
                  <p className="font-label-bold text-on-surface">Rohan M.</p>
                  <p className="text-[12px] text-on-surface-variant">2 weeks ago</p>
                </div>
              </div>
            </div>

            {/* Review Card 2 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border-[1.5px] border-on-surface">
              <div className="flex gap-1 mb-4 text-secondary-container">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="font-body-md text-on-surface mb-4">"Very professional and empathetic. She has a way of making you feel heard and understood from the very first minute."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full border border-on-surface bg-accent-pink flex items-center justify-center font-bold">S</div>
                <div>
                  <p className="font-label-bold text-on-surface">Sara K.</p>
                  <p className="text-[12px] text-on-surface-variant">1 month ago</p>
                </div>
              </div>
            </div>

            {/* Review Card 3 */}
            <div className="p-6 rounded-3xl bg-surface-container-low border-[1.5px] border-on-surface">
              <div className="flex gap-1 mb-4 text-secondary-container">
                {[1, 2, 3, 4].map((s) => (
                  <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
              </div>
              <p className="font-body-md text-on-surface mb-4">"Great insights into anxiety management. I've seen a noticeable difference in my daily stress levels."</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full border border-on-surface bg-primary/20 text-primary flex items-center justify-center font-bold">A</div>
                <div>
                  <p className="font-label-bold text-on-surface">Arjun V.</p>
                  <p className="text-[12px] text-on-surface-variant">3 months ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TherapistProfile;
