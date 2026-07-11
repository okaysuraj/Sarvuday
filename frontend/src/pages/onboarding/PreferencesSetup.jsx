import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const PreferencesSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    language: 'en',
    therapyType: 'ind',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleLanguageChange = (lang) => {
    setFormData({ ...formData, language: lang });
  };

  const handleTherapyTypeChange = (type) => {
    setFormData({ ...formData, therapyType: type });
  };

  const handleNotificationChange = (type) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [type]: !formData.notifications[type]
      }
    });
  };

  const handleComplete = async (e) => {
    e.preventDefault();
    try {
      const existingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
      
      const formDataToSend = new FormData();
      if (existingData.firstName || existingData.lastName) {
        formDataToSend.append('name', `${existingData.firstName || ''} ${existingData.lastName || ''}`.trim());
      }
      if (existingData.dob) formDataToSend.append('age_range', existingData.dob);
      if (existingData.gender) formDataToSend.append('gender', existingData.gender.toLowerCase());
      if (existingData.location) formDataToSend.append('city', existingData.location);
      if (existingData.symptoms) formDataToSend.append('symptoms', existingData.symptoms);
      if (existingData.stress_factors) formDataToSend.append('stress_factors', existingData.stress_factors);
      if (existingData.mental_health_history) formDataToSend.append('mental_health_history', existingData.mental_health_history);
      if (existingData.emergency_name) formDataToSend.append('emergency_contact_name', existingData.emergency_name);
      if (existingData.emergency_phone) formDataToSend.append('emergency_contact_phone', existingData.emergency_phone);
      if (existingData.emergency_relationship) formDataToSend.append('emergency_contact_relation', existingData.emergency_relationship);

      // Add preferences
      formDataToSend.append('therapy_goals', JSON.stringify(formData));

      const response = await axiosInstance.patch('/dashboard/profile', formDataToSend);
      if (response.status === 200) {
        toast.success("Profile setup complete!");
        localStorage.removeItem('onboardingData');
        const userType = localStorage.getItem('userType');
        if (userType === 'counsellor') {
          navigate('/counsellor/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to save profile information");
    }
  };

  const handleSkip = () => {
    const userType = localStorage.getItem('userType');
    if (userType === 'counsellor') {
      navigate('/counsellor/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <div className="h-full min-h-screen flex flex-col antialiased bg-cream-bg text-ink-black">
      <style>{`
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
        }
        
        .sticker-button {
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.15s ease-in-out;
        }
        
        .sticker-button:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }

        .sticker-button-secondary {
            border: 1.5px solid #1A1A1A;
            transition: all 0.15s ease-in-out;
        }

        .sticker-button-secondary:active {
            transform: translate(2px, 2px);
        }

        .radio-custom-label {
            background-color: transparent;
            color: #1A1A1A;
        }
        .radio-custom-label.selected {
            background-color: #002da5;
            color: white;
            border-color: #1A1A1A;
        }
        
        .checkbox-custom-label {
            background-color: white;
            color: #1A1A1A;
        }
        .checkbox-custom-label.selected {
            background-color: #002da5;
            color: white;
            border-color: #1A1A1A;
        }
      `}</style>

      {/* TopAppBar */}
      <header className="bg-cream-bg dark:bg-ink-black w-full top-0 sticky z-50 border-b-[1.5px] border-ink-black px-margin-mobile md:px-margin-desktop py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevious} aria-label="Go back" className="text-on-surface-variant hover:opacity-80 transition-opacity active:translate-x-[2px] active:translate-y-[2px]">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md text-primary font-bold">SarvUday</h1>
        </div>
        {/* Step Indicator */}
        <div className="hidden md:flex items-center gap-2">
          <span className="font-label-bold text-label-bold text-ink-black uppercase tracking-wider">Step 8 of 8</span>
          <div className="w-32 h-3 border-[1.5px] border-ink-black rounded-full overflow-hidden bg-white">
            <div className="w-full h-full bg-accent-sage"></div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow overflow-y-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col gap-stack-lg">
          {/* Header Section */}
          <section className="text-center">
            <h2 className="font-display-lg text-display-lg text-ink-black mb-4">Let's fine-tune your experience.</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Tell us how you prefer to communicate and interact, so we can make SarvUday work perfectly for you.</p>
          </section>

          {/* Preferences Form Container */}
          <form className="flex flex-col gap-stack-md" onSubmit={handleComplete}>
            {/* Bento Grid Layout for Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              
              {/* Language Selection */}
              <div className="sticker-card bg-white p-container-padding flex flex-col gap-stack-sm md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent-pink border-[1.5px] border-ink-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-ink-black">language</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-ink-black">Preferred Language</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Select the primary language you'd like to use across the platform.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'en', label: 'English' },
                    { id: 'hi', label: 'Hindi' },
                    { id: 'es', label: 'Spanish' },
                    { id: 'fr', label: 'French' }
                  ].map(lang => (
                    <div key={lang.id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(lang.id)}
                        className={`block w-full text-center py-3 px-4 border-[1.5px] border-outline-variant rounded-xl cursor-pointer hover:border-ink-black transition-colors font-label-bold text-label-bold radio-custom-label ${formData.language === lang.id ? 'selected' : ''}`}
                      >
                        {lang.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Therapy Type Preference */}
              <div className="sticker-card bg-accent-sage/30 p-container-padding flex flex-col gap-stack-sm h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white border-[1.5px] border-ink-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-ink-black">groups</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-ink-black">Therapy Type</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">How do you prefer to receive support? You can change this later.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'ind', label: 'Individual Therapy', icon: 'person' },
                    { id: 'grp', label: 'Group Sessions', icon: 'forum' },
                    { id: 'ai', label: 'AI Companion Chat', icon: 'smart_toy' }
                  ].map(type => (
                    <div key={type.id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleTherapyTypeChange(type.id)}
                        className={`flex items-center justify-between w-full py-4 px-5 border-[1.5px] border-outline-variant rounded-xl cursor-pointer hover:border-ink-black transition-colors radio-custom-label ${formData.therapyType === type.id ? 'selected' : 'bg-white'}`}
                      >
                        <span className="font-label-bold text-label-bold">{type.label}</span>
                        <span className="material-symbols-outlined">{type.icon}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Settings */}
              <div className="sticker-card bg-accent-orange/30 p-container-padding flex flex-col gap-stack-sm h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white border-[1.5px] border-ink-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-ink-black">notifications_active</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-ink-black">Notifications</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 flex-grow">Stay updated on your journey without feeling overwhelmed.</p>
                <div className="flex flex-col gap-3">
                  {[
                    { id: 'email', label: 'Email Summaries' },
                    { id: 'push', label: 'Push Reminders (App)' },
                    { id: 'sms', label: 'SMS Alerts' }
                  ].map(notif => (
                    <div key={notif.id} className="relative">
                      <button
                        type="button"
                        onClick={() => handleNotificationChange(notif.id)}
                        className={`flex items-center gap-3 w-full py-4 px-5 border-[1.5px] border-outline-variant rounded-xl cursor-pointer hover:border-ink-black transition-colors checkbox-custom-label ${formData.notifications[notif.id] ? 'selected' : 'bg-white'}`}
                      >
                        <div className={`w-5 h-5 border-[1.5px] border-ink-black rounded flex items-center justify-center ${formData.notifications[notif.id] ? 'bg-primary' : 'bg-white'}`}>
                          <span className={`material-symbols-outlined text-[16px] text-white transition-opacity ${formData.notifications[notif.id] ? 'opacity-100' : 'opacity-0'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </div>
                        <span className="font-label-bold text-label-bold flex-grow text-left">{notif.label}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t-[1.5px] border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
              <button onClick={handleSkip} className="sticker-button-secondary bg-white text-ink-black font-label-bold text-label-bold py-4 px-8 rounded-full w-full md:w-auto" type="button">
                Skip for now
              </button>
              <button className="sticker-button bg-primary text-white font-label-bold text-label-bold py-4 px-12 rounded-full w-full md:w-auto flex items-center justify-center gap-2" type="submit">
                Complete Onboarding
                <span className="material-symbols-outlined">celebration</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-dim w-full py-8 border-t-[1.5px] border-ink-black px-margin-mobile md:px-margin-desktop mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-stack-sm">
          <span className="font-label-bold text-label-bold text-ink-black">© 2024 SarvUday. All rights reserved.</span>
          <div className="flex gap-4">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Help Center</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Privacy Policy</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreferencesSetup;
