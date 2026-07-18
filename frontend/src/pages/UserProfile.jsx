import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userType = localStorage.getItem('userType') || 'normal_user';
        const endpoint = userType === 'counsellor' ? '/counsellor/dashboard/profile' : '/user/dashboard/profile';
        const response = await axiosInstance.get(endpoint);
        setProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userType');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>;
  }

  const userName = profileData?.name || 'User';
  const location = profileData?.city ? `${profileData.city}, India` : 'Not specified';

  return (
    <div className="flex-grow p-stack-lg max-w-6xl mx-auto w-full space-y-gutter">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(26, 26, 26, 1);
        }
        .active-press:active {
            transform: translate(2px, 2px);
            box-shadow: 0px 0px 0px 0px rgba(26, 26, 26, 1);
        }
      `}</style>
      
      {/* User Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-stack-md bg-white p-10 rounded-[48px] border-[1.5px] border-ink-black neo-shadow">
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-pink flex items-center justify-center text-4xl text-ink-black font-bold">
            {profileData?.profile_image_url ? (
              <img alt="Profile" className="w-full h-full object-cover" src={profileData.profile_image_url} />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full border-[1.5px] border-ink-black neo-shadow active-press">
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
          </button>
        </div>
        
        <div className="text-center md:text-left flex-grow">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-1">{userName}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
            <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container font-label-bold text-label-bold rounded-full border-[1.5px] border-ink-black">Standard Member</span>
            <span className="text-on-surface-variant font-body-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span> {location}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <Link to="/profile/edit" className="w-full md:w-auto px-8 py-4 bg-primary text-white font-label-bold text-label-bold rounded-full border-[1.5px] border-ink-black neo-shadow active-press flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">edit</span> Edit Profile
          </Link>
        </div>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Profile Options Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Option: Settings */}
          <Link to="/settings" className="flex flex-col items-start p-stack-md bg-accent-sage rounded-[32px] border-[1.5px] border-ink-black neo-shadow active-press group text-left h-full">
            <div className="p-3 bg-white rounded-2xl border-[1.5px] border-ink-black mb-stack-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[32px]">settings</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-1">Settings</h3>
            <p className="font-body-md text-on-surface-variant">Manage your account preferences and app configurations.</p>
          </Link>

          {/* Option: Privacy */}
          <Link to="/privacy" className="flex flex-col items-start p-stack-md bg-accent-pink rounded-[32px] border-[1.5px] border-ink-black neo-shadow active-press group text-left h-full">
            <div className="p-3 bg-white rounded-2xl border-[1.5px] border-ink-black mb-stack-sm group-hover:-rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[32px]">security</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-1">Privacy</h3>
            <p className="font-body-md text-on-surface-variant">Control your data, visibility, and security settings.</p>
          </Link>

          {/* Option: Help */}
          <Link to="/contact-us" className="flex flex-col items-start p-stack-md bg-accent-orange rounded-[32px] border-[1.5px] border-ink-black neo-shadow active-press group text-left h-full">
            <div className="p-3 bg-white rounded-2xl border-[1.5px] border-ink-black mb-stack-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">help_center</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-1">Help</h3>
            <p className="font-body-md text-on-surface-variant">FAQs, support chat, and user guides for SarvUday.</p>
          </Link>

          {/* Option: Logout */}
          <button onClick={handleLogout} className="flex flex-col items-start p-stack-md bg-surface-container rounded-[32px] border-[1.5px] border-ink-black neo-shadow active-press group text-left h-full w-full">
            <div className="p-3 bg-white rounded-2xl border-[1.5px] border-ink-black mb-stack-sm group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-[32px] text-error">logout</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-1">Logout</h3>
            <p className="font-body-md text-on-surface-variant">Safely sign out from your current session.</p>
          </button>
        </div>

        {/* Sidebar Promo/Status Area */}
        <div className="space-y-gutter">
          {/* Promotional Card: Need a Break? */}
          <div className="p-stack-md bg-primary-container text-white rounded-[32px] border-[1.5px] border-ink-black neo-shadow relative overflow-hidden h-fit">
            <div className="relative z-10">
              <h3 className="font-headline-sm text-headline-sm mb-2">Need a break?</h3>
              <p className="font-body-md text-primary-fixed-dim mb-stack-md">Take 2 minutes to center yourself with a guided breathing session.</p>
              <button className="px-6 py-3 bg-secondary-container text-on-secondary-container font-label-bold text-label-bold rounded-full border-[1.5px] border-ink-black neo-shadow active-press flex items-center gap-2">
                <span className="material-symbols-outlined">air</span> Start Session
              </button>
            </div>
            {/* Abstract Memphis shapes in bg */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-container rounded-full opacity-20 border-[1.5px] border-ink-black"></div>
            <div className="absolute top-2 -right-4 w-16 h-16 bg-accent-pink rounded-lg rotate-12 opacity-20 border-[1.5px] border-ink-black"></div>
          </div>

          {/* Membership Status Detail */}
          <div className="p-stack-md bg-white rounded-[32px] border-[1.5px] border-ink-black neo-shadow">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant">Plan Status</h4>
              <span className="px-2 py-0.5 bg-accent-sage rounded border-[1px] border-ink-black text-[12px] font-bold">FREE</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body-md">SarvUday Basic</span>
                <span className="font-label-bold text-primary">₹0/mo</span>
              </div>
              <button className="w-full py-2 font-label-bold text-primary hover:underline transition-all">Upgrade Subscription</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
