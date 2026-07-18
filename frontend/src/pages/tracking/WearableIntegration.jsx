import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const WearableIntegration = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({
    heartRate: true,
    sleepTracking: true,
    dailyActivity: true,
    stressLevels: false
  });

  useEffect(() => {
    const fetchBiofeedback = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/biofeedback');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching biofeedback', error);
        toast.error('Failed to load wearable data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBiofeedback();
  }, []);

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Connecting to wearable...</div>;
  }


  return (
    <div className="flex-1 pb-24">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        
        .neo-shadow-large {
            box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
        }

        .neo-click:active {
            transform: translate(2px, 2px);
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
        }
        .icon-fill {
            font-variation-settings: 'FILL' 1;
        }
      `}</style>

      {/* Hero / Title Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="font-display-lg text-4xl md:text-5xl text-ink-black">Wearable Ecosystem</h2>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mt-2">
            Sync your physical biometric data with MindSpace to unlock deeper correlations between your activity, sleep, and mental well-being.
          </p>
        </div>
        <div className="hidden md:block w-32 h-32">
          <img 
            alt="MindSpace Illustration" 
            className="w-full h-full object-contain" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLsx_b4nozB0OU8xsKs7u_NZLAzvZ4b8n2Hc_ZNbDrIjXpWrwrr1SiN4JegAE2Ga3_5IXcn7OCLbulXXpRq6FF_biHwnWOD4sqzpy9gsHeowmqHE7DiX96KBweAgwf_L0MftEsXNi1EStaidBz52x-GwT-dPcz8xgT5mgb7sJRrNRH7q-dHvcOLb9tLXnFn_w3nPd2dppqr1QN67DFBve89e_-hPkz8kt4JIsEfLFXbIlbTd7aYELdPsAQwJ" 
          />
        </div>
      </section>

      {/* Primary Connected Device Sticker */}
      <section className="w-full bg-white border-[1.5px] border-ink-black rounded-[48px] p-6 md:p-8 neo-shadow-large relative overflow-hidden mb-8">
        {/* Background decorative element */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-accent-pink rounded-full border-[1.5px] border-ink-black -z-10 opacity-20"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Device Info */}
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-accent-sage p-4 rounded-3xl border-[1.5px] border-ink-black neo-shadow">
                <span className="material-symbols-outlined text-4xl">watch</span>
              </div>
              <div>
                <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-label-bold border-[1.5px] border-ink-black">CONNECTED</span>
                <h3 className="font-headline-md text-2xl text-ink-black mt-1">Apple Watch Series 9</h3>
                <p className="text-on-surface-variant text-sm italic">Last synced: 2 minutes ago</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface-container rounded-2xl border-[1.5px] border-ink-black flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-sm icon-fill">favorite</span>
                  <span className="font-label-bold">Heart Rate</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl md:text-3xl font-bold">{data?.heart_rate || 72}</span>
                  <span className="text-xs text-on-surface-variant pb-1">BPM</span>
                </div>
              </div>
              
              <div className="p-4 bg-surface-container rounded-2xl border-[1.5px] border-ink-black flex flex-col gap-2">
                <div className="flex items-center gap-2 text-secondary">
                  <span className="material-symbols-outlined text-sm icon-fill">bedtime</span>
                  <span className="font-label-bold">Sleep Quality</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl md:text-3xl font-bold">{data?.sleep_score || 84}</span>
                  <span className="text-xs text-on-surface-variant pb-1">/ 100</span>
                </div>
              </div>
              
              <div className="p-4 bg-surface-container rounded-2xl border-[1.5px] border-ink-black flex flex-col gap-2">
                <div className="flex items-center gap-2 text-tertiary">
                  <span className="material-symbols-outlined text-sm icon-fill">bolt</span>
                  <span className="font-label-bold">Daily Steps</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-2xl md:text-3xl font-bold">{data?.daily_steps?.toLocaleString() || '8,432'}</span>
                  <span className="text-xs text-on-surface-variant pb-1">STEPS</span>
                </div>
              </div>
            </div>
            
            {/* Chunky Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-label-bold text-ink-black">Daily Sync Progress</span>
                <span className="font-label-bold text-primary">82% Complete</span>
              </div>
              <div className="h-6 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
                <div className="h-full bg-accent-orange border-r-[1.5px] border-ink-black transition-all duration-1000 ease-out" style={{width: '82%'}}></div>
              </div>
            </div>
          </div>
          
          {/* Permissions Toggle */}
          <div className="w-full lg:w-80 bg-accent-sage/30 border-[1.5px] border-ink-black rounded-3xl p-6 space-y-4">
            <h4 className="font-label-bold text-ink-black uppercase tracking-widest border-b-[1.5px] border-ink-black pb-2">Sync Permissions</h4>
            
            {[
              { key: 'heartRate', label: 'Heart Rate' },
              { key: 'sleepTracking', label: 'Sleep Tracking' },
              { key: 'dailyActivity', label: 'Daily Activity' },
              { key: 'stressLevels', label: 'Stress Levels (HRV)' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="font-body-md">{label}</span>
                <button 
                  onClick={() => togglePermission(key)}
                  className={`w-12 h-6 rounded-full border-[1.5px] border-ink-black relative transition-colors ${permissions[key] ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-[1.5px] border-ink-black transition-all ${permissions[key] ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            ))}
            
            <button className="w-full mt-4 py-2 text-sm font-label-bold text-error hover:underline transition-all">Disconnect Device</button>
          </div>
        </div>
      </section>

      {/* Grid: Add New & Popular */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Add New Device Bento */}
        <div className="md:col-span-4 bg-accent-pink rounded-[32px] p-6 md:p-8 border-[1.5px] border-ink-black neo-shadow flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="h-14 w-14 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center mb-6 neo-shadow">
              <span className="material-symbols-outlined text-3xl">add_circle</span>
            </div>
            <h3 className="font-headline-sm text-2xl text-ink-black">Link New Wearable</h3>
            <p className="mt-2 text-on-surface-variant font-body-md">Connect your specialized health trackers to build a more accurate profile.</p>
          </div>
          <button className="mt-8 bg-white py-3 px-6 rounded-xl border-[1.5px] border-ink-black font-label-bold text-ink-black neo-shadow neo-click self-start hover:-translate-y-1 transition-transform">
            Find Devices
          </button>
        </div>
        
        {/* Popular Integrations */}
        <div className="md:col-span-8 bg-white rounded-[32px] p-6 md:p-8 border-[1.5px] border-ink-black flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-2xl text-ink-black">Popular Integrations</h3>
            <a className="text-primary font-label-bold hover:underline" href="#">View All</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Fitbit */}
            <div className="p-4 md:p-6 rounded-2xl border-[1.5px] border-ink-black bg-surface-container-low hover:bg-surface-container transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 group-hover:neo-shadow transition-all">
                <span className="material-symbols-outlined text-[#00B0B9]">fitness_center</span>
              </div>
              <h4 className="font-label-bold text-lg mb-1">Fitbit</h4>
              <p className="text-xs text-on-surface-variant mb-4">Steps, Sleep & HR</p>
              <button className="w-full py-2 bg-ink-black text-white rounded-lg text-sm font-label-bold border-[1.5px] border-ink-black hover:bg-opacity-90">Link</button>
            </div>
            {/* Oura */}
            <div className="p-4 md:p-6 rounded-2xl border-[1.5px] border-ink-black bg-surface-container-low hover:bg-surface-container transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 group-hover:neo-shadow transition-all">
                <span className="material-symbols-outlined text-ink-black">trip_origin</span>
              </div>
              <h4 className="font-label-bold text-lg mb-1">Oura Ring</h4>
              <p className="text-xs text-on-surface-variant mb-4">Advanced Sleep & Readiness</p>
              <button className="w-full py-2 border-[1.5px] border-ink-black rounded-lg text-sm font-label-bold bg-white text-ink-black hover:bg-surface-variant">Link</button>
            </div>
            {/* Garmin */}
            <div className="p-4 md:p-6 rounded-2xl border-[1.5px] border-ink-black bg-surface-container-low hover:bg-surface-container transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 group-hover:neo-shadow transition-all">
                <span className="material-symbols-outlined text-[#007cc3]">navigation</span>
              </div>
              <h4 className="font-label-bold text-lg mb-1">Garmin</h4>
              <p className="text-xs text-on-surface-variant mb-4">Vitals & Body Battery</p>
              <button className="w-full py-2 border-[1.5px] border-ink-black rounded-lg text-sm font-label-bold bg-white text-ink-black hover:bg-surface-variant">Link</button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Vault Section */}
      <section className="bg-ink-black text-white rounded-[48px] p-6 md:p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
        <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none -translate-x-[20%] translate-y-[20%]">
          <span className="material-symbols-outlined text-[200px] md:text-[300px]">lock_person</span>
        </div>
        <div className="flex-1 z-10 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-label-bold border-[1.5px] border-white/20">ENTERPRISE GRADE</span>
            <div className="flex gap-1">
              <span className="material-symbols-outlined text-secondary-container text-lg icon-fill">verified</span>
              <span className="material-symbols-outlined text-secondary-container text-lg icon-fill">security</span>
            </div>
          </div>
          <h2 className="font-display-lg text-3xl md:text-4xl mb-4">Your Privacy Vault</h2>
          <p className="text-accent-sage text-base md:text-lg max-w-xl">
            MindSpace uses AES-256 end-to-end encryption for all wearable data. Your biometrics are processed locally and never sold to third parties. Only you decide who sees your wellness trends.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-sm">shield_lock</span>
              <span className="text-sm font-label-md">HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-sm">encrypted</span>
              <span className="text-sm font-label-md">E2E Encrypted</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
              <span className="material-symbols-outlined text-sm">gpp_good</span>
              <span className="text-sm font-label-md">GDPR Ready</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 z-10 flex flex-col gap-4">
          <div className="bg-white/5 p-6 rounded-3xl border-[1.5px] border-white/20 hover:bg-white/10 transition-all cursor-pointer group hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-label-bold text-lg">Encryption Status</h4>
              <span className="text-secondary-container material-symbols-outlined icon-fill">check_circle</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full">
              <div className="h-full w-full bg-secondary-container rounded-full"></div>
            </div>
            <p className="mt-4 text-xs text-accent-sage opacity-60">Last security audit performed today at 04:00 AM.</p>
          </div>
          <button className="w-full py-4 bg-secondary-container text-on-secondary-container font-label-bold rounded-2xl border-[1.5px] border-ink-black neo-shadow neo-click hover:-translate-y-1 transition-transform">
            Security Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default WearableIntegration;
