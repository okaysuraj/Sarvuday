import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const TherapistSearch = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const response = await axiosInstance.get('/content/counsellors');
        setCounsellors(response.data.counsellors || []);
      } catch (error) {
        console.error('Failed to fetch counsellors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellors();
  }, []);
  return (
    <div className="space-y-stack-lg max-w-7xl mx-auto py-8">
      <style>{`
        .hard-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .active-press:active {
            transform: translate(2px, 2px);
            box-shadow: none;
        }
      `}</style>
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline-sm text-headline-sm text-primary">Find a Therapist</h2>
        <div className="flex items-center gap-4">
           <button className="p-2 hover:bg-surface-variant rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
           </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-stack-md">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input 
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-[1.5px] border-on-surface rounded-2xl font-body-md focus:outline-none focus:ring-0 focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" 
              placeholder="Search by name, specialization, or location..." 
              type="text"
            />
          </div>
          <button className="bg-secondary-container px-6 py-4 md:py-0 flex items-center justify-center gap-2 border-[1.5px] border-on-surface rounded-2xl hard-shadow active-press transition-all">
            <span className="material-symbols-outlined">filter_list</span>
            <span className="font-label-bold">Filters</span>
          </button>
        </div>
        
        {/* Specialization Chips */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="font-label-bold py-2 px-4 bg-accent-pink border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">Anxiety</span>
          <span className="font-label-bold py-2 px-4 bg-accent-sage border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">Depression</span>
          <span className="font-label-bold py-2 px-4 bg-secondary-container border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">ADHD</span>
          <span className="font-label-bold py-2 px-4 bg-accent-orange border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">Stress</span>
          <span className="font-label-bold py-2 px-4 bg-primary text-white border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">PTSD</span>
          <span className="font-label-bold py-2 px-4 bg-white border-[1.5px] border-on-surface rounded-full hard-shadow cursor-pointer hover:-translate-y-1 transition-transform">Relationship</span>
        </div>
      </div>

      {/* Recent Searches Bento Grid */}
      <div className="space-y-stack-sm pt-8">
        <h3 className="font-headline-sm">Recent Searches</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] border-[1.5px] border-on-surface flex items-center gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="bg-accent-pink/30 p-3 rounded-2xl border-[1.5px] border-on-surface">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <div>
              <p className="font-label-bold">CBT Therapy</p>
              <p className="text-label-md text-on-surface-variant">Last searched yesterday</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border-[1.5px] border-on-surface flex items-center gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="bg-accent-sage/30 p-3 rounded-2xl border-[1.5px] border-on-surface">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <div>
              <p className="font-label-bold">Virtual Sessions</p>
              <p className="text-label-md text-on-surface-variant">Last searched 3 days ago</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[32px] border-[1.5px] border-on-surface flex items-center gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
            <div className="bg-secondary-container/20 p-3 rounded-2xl border-[1.5px] border-on-surface">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <div>
              <p className="font-label-bold">Dr. Emily Watson</p>
              <p className="text-label-md text-on-surface-variant">Viewed profile recently</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="space-y-stack-sm pt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-sm">Recommended for You</h3>
          <button className="text-primary font-label-bold underline decoration-2 underline-offset-4 hover:text-primary/80 transition-colors">View All Specialists</button>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-stack-md mt-4">
          {loading ? (
             <div className="flex items-center justify-center min-h-[20vh] xl:col-span-2"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>
          ) : counsellors.length > 0 ? (
            counsellors.map(counsellor => (
              <div key={counsellor.user_id} className="bg-white border-[1.5px] border-on-surface rounded-[40px] p-8 flex flex-col md:flex-row gap-8 hard-shadow group">
                <div className="relative w-full md:w-48 h-56 shrink-0 border-[1.5px] border-on-surface rounded-[24px] overflow-hidden hard-shadow">
                  <img alt={counsellor.name} className="w-full h-full object-cover" src={counsellor.profile_pic || "https://lh3.googleusercontent.com/aida-public/AB6AXuA6X1AN6WAgvymbXKThvc8lwQiKsR2zILlMTYRixbykUJuFj3rbl9szVw-2wSUwzKIL7jBUx5r6-RzfKXfXxkqiZgVWxtFGKBxDM7JWhVsFM7VYUB961sxgiEd4WaKYcvBteoH0j4WOanLpVgblwt4-h1g0zToLfZ4GENf5HeRg3DngJeiGUrmqHRhmX_a0SBtOi-gE9T7HL7AnScZQPetFJUPEpr_EHvNAzicm4h52INknImbjeXeAyA"}/>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-sm">{counsellor.name}</h4>
                      <p className="text-on-surface-variant font-label-bold">{(counsellor.specializations && counsellor.specializations[0]) || 'Therapist'} • {counsellor.experience_years} yrs exp.</p>
                    </div>
                    <div className="bg-secondary-container px-3 py-1 border-[1.5px] border-on-surface rounded-xl flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-bold">{counsellor.average_rating || '5.0'}</span>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-body-md line-clamp-2">{counsellor.bio || 'Compassionate and evidence-based approach.'}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-surface-container px-3 py-1 rounded-full text-label-md border border-outline-variant">Virtual</span>
                    <span className="bg-surface-container px-3 py-1 rounded-full text-label-md border border-outline-variant">Accepts Insurance</span>
                    {(counsellor.specializations && counsellor.specializations.length > 0) && (
                      <span className="bg-accent-pink/20 px-3 py-1 rounded-full text-label-md border border-accent-pink font-medium">{counsellor.specializations[0]} Specialist</span>
                    )}
                  </div>
                  <Link to={`/therapists/profile/${counsellor.user_id}`} className="block w-full mt-4 bg-primary text-white text-center border-[1.5px] border-on-surface hard-shadow py-3 rounded-2xl font-label-bold active-press group-hover:bg-primary-container group-hover:text-ink-black transition-colors">
                    View Full Profile
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="xl:col-span-2 text-center text-on-surface-variant p-8">No therapists found.</div>
          )}
        </div>
      </div>

      {/* Bento Featured Component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md pt-8">
        <div className="md:col-span-2 bg-secondary-container border-[1.5px] border-on-surface rounded-[40px] p-10 flex items-center relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-md">
            <h4 className="font-display-lg text-headline-md leading-tight text-ink-black">Need immediate help?</h4>
            <p className="text-ink-black/80 text-body-lg">Talk to a crisis counselor right now. We're available 24/7 for support.</p>
            <button className="bg-white text-on-surface border-[1.5px] border-on-surface hard-shadow px-8 py-4 rounded-2xl font-label-bold active-press">
              Connect Now
            </button>
          </div>
          {/* Decorative Memphis Elements */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary rounded-full border-[1.5px] border-on-surface opacity-10"></div>
          <div className="absolute bottom-5 right-10 w-24 h-24 bg-accent-pink rounded-lg border-[1.5px] border-on-surface rotate-12"></div>
          <span className="absolute top-1/2 right-20 material-symbols-outlined text-primary scale-[5] opacity-20 select-none">support_agent</span>
        </div>
        <div className="bg-accent-sage border-[1.5px] border-on-surface rounded-[40px] p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform">
          <span className="material-symbols-outlined text-headline-md bg-white w-14 h-14 flex items-center justify-center rounded-2xl border-[1.5px] border-on-surface">psychology</span>
          <div className="space-y-2">
            <h5 className="font-headline-sm text-ink-black">Take a Quiz</h5>
            <p className="text-ink-black/70 font-label-md">Match with the perfect therapist for your needs in 2 minutes.</p>
            <button className="inline-block mt-2 font-label-bold text-primary group">
              Start Quiz <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TherapistSearch;
