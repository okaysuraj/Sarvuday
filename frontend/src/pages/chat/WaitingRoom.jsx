import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointment_id');
  
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Checklist state
  const [checks, setChecks] = useState({
    camera: true,
    quiet: false,
    water: false,
    internet: true
  });

  const [timeLeft, setTimeLeft] = useState(300); // 5 mins dummy for now

  useEffect(() => {
    if (!appointmentId) {
      navigate(-1);
      return;
    }

    const fetchAppointment = async () => {
      try {
        const res = await axiosInstance.get(`/user/appointments/${appointmentId}`);
        setAppointment(res.data);
        
        // Calculate time diff
        if (res.data?.session?.session_scheduled_at) {
          const scheduledAt = new Date(res.data.session.session_scheduled_at).getTime();
          const now = new Date().getTime();
          const diff = Math.floor((scheduledAt - now) / 1000);
          if (diff > 0) {
            setTimeLeft(diff);
          } else {
            setTimeLeft(0);
          }
        }
      } catch (err) {
        console.error('Failed to load appointment', err);
        toast.error('Failed to load session details');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleJoin = () => {
    navigate(`/session/${appointment?.session?.session_id || appointmentId}`);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isReady = timeLeft <= 0;

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-6xl">autorenew</span>
      </div>
    );
  }

  if (!appointment) return null;

  return (
    <div className="max-w-7xl mx-auto py-8">
      <style>{`
        .neo-shadow {
          box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .neo-shadow-active:active {
          box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
          transform: translate(2px, 2px);
        }
        .neo-border {
          border: 1.5px solid #1A1A1A;
        }
      `}</style>
      
      <div className="flex justify-between items-center w-full mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center mr-4 hover:bg-surface-container rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="font-headline-sm text-headline-sm font-bold text-ink-black">Waiting Room</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Countdown & Video Preview */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">
          
          {/* Countdown Module */}
          <div className={`p-10 rounded-[48px] neo-border relative overflow-hidden transition-colors ${isReady ? 'bg-secondary-container' : 'bg-accent-orange'}`}>
            <div className="relative z-10">
              <span className="font-label-bold text-label-bold uppercase tracking-widest text-ink-black opacity-60">
                {isReady ? 'Session is ready' : 'Session starts in'}
              </span>
              <div className="flex items-baseline gap-4 mt-2">
                <h3 className="font-display-lg text-display-lg text-ink-black tracking-tight">
                  {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </h3>
                {!isReady && <span className="font-headline-sm text-headline-sm text-ink-black">minutes</span>}
              </div>
              <p className="mt-4 font-body-md text-body-md max-w-md">
                Your therapist, {appointment.counsellor?.name}, will be with you shortly. Please stay on this page to ensure a stable connection.
              </p>
            </div>
            
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 mr-12 mb-12">
              <span className={`material-symbols-outlined text-ink-black text-6xl opacity-20 ${isReady ? '' : 'rotate-12 animate-pulse'}`}>
                {isReady ? 'check_circle' : 'hourglass_top'}
              </span>
            </div>
          </div>
          
          {/* Video Preview Sticker */}
          <div className="bg-ink-black aspect-video rounded-[32px] neo-border relative overflow-hidden group">
            <div className="w-full h-full bg-surface-variant flex items-center justify-center flex-col">
              <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-2">videocam_off</span>
              <span className="text-on-surface-variant font-label-bold">Camera preview will appear here</span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ink-black/20">
              <div className="bg-white/90 neo-border p-4 rounded-2xl flex gap-4">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">mic</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">videocam</span>
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-primary-container hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <div className="px-4 py-2 bg-white/90 backdrop-blur neo-border rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-error animate-pulse"></div>
                <span className="font-label-bold text-label-bold">Camera Status: Off</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clinician & Checklist */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-8">
          
          {/* Clinician Profile */}
          <div className="bg-accent-sage p-8 rounded-[32px] neo-border neo-shadow flex items-start gap-6">
            <div className="w-24 h-24 shrink-0 neo-border rounded-[24px] overflow-hidden bg-white flex items-center justify-center text-2xl font-bold">
              {appointment.counsellor?.profile_pic ? (
                <img src={appointment.counsellor.profile_pic} alt="Clinician" className="w-full h-full object-cover" />
              ) : (
                appointment.counsellor?.name?.charAt(0) || 'C'
              )}
            </div>
            <div className="flex-grow">
              <div className="inline-flex px-3 py-1 bg-white rounded-full neo-border mb-2">
                <span className="font-label-bold text-label-bold text-primary">Your Clinician</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-ink-black line-clamp-1">{appointment.counsellor?.name}</h4>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">Clinical Psychologist</p>
            </div>
          </div>
          
          {/* Prep Checklist */}
          <div className="bg-white p-8 rounded-[32px] neo-border flex flex-col h-full">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm text-ink-black">Prep Checklist</h4>
              <span className="bg-accent-pink px-3 py-1 rounded-full neo-border font-label-bold">Required</span>
            </div>
            
            <ul className="space-y-4 flex-grow">
              <li onClick={() => setChecks({...checks, camera: !checks.camera})} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer group border-transparent border-[1.5px] hover:border-ink-black">
                <input checked={checks.camera} onChange={()=>{}} className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-0 cursor-pointer" type="checkbox"/>
                <div className="flex-grow">
                  <p className="font-label-bold text-label-bold">Camera & Mic check</p>
                  <p className="text-xs text-on-surface-variant">System access granted</p>
                </div>
                {checks.camera && <span className="material-symbols-outlined text-secondary">check_circle</span>}
              </li>
              
              <li onClick={() => setChecks({...checks, quiet: !checks.quiet})} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer group border-transparent border-[1.5px] hover:border-ink-black">
                <input checked={checks.quiet} onChange={()=>{}} className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-0 cursor-pointer" type="checkbox"/>
                <div className="flex-grow">
                  <p className="font-label-bold text-label-bold">Quiet space</p>
                  <p className="text-xs text-on-surface-variant">Minimal background noise</p>
                </div>
                {checks.quiet && <span className="material-symbols-outlined text-secondary">check_circle</span>}
              </li>
              
              <li onClick={() => setChecks({...checks, water: !checks.water})} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-surface-container-low transition-all cursor-pointer group border-transparent border-[1.5px] hover:border-ink-black">
                <input checked={checks.water} onChange={()=>{}} className="w-6 h-6 rounded-md border-2 border-ink-black text-primary focus:ring-0 cursor-pointer" type="checkbox"/>
                <div className="flex-grow">
                  <p className="font-label-bold text-label-bold">Water ready</p>
                  <p className="text-xs text-on-surface-variant">Keep yourself hydrated</p>
                </div>
                {checks.water && <span className="material-symbols-outlined text-secondary">check_circle</span>}
              </li>
            </ul>
            
            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={handleJoin}
                disabled={!isReady}
                className={`w-full py-4 rounded-2xl neo-border neo-shadow font-headline-sm flex items-center justify-center gap-3 transition-all ${isReady ? 'bg-primary text-on-primary hover:neo-shadow-active' : 'bg-surface-variant text-on-surface-variant opacity-70 cursor-not-allowed'}`}
              >
                {isReady && <span className="material-symbols-outlined">videocam</span>}
                {isReady ? 'Start Meeting Now' : 'Join Session'}
              </button>
              
              <button onClick={() => navigate(-1)} className="w-full bg-surface-container text-on-surface py-3 rounded-2xl neo-border font-label-bold flex items-center justify-center gap-2 hover:bg-error-container hover:text-on-error-container transition-colors">
                <span className="material-symbols-outlined">exit_to_app</span>
                Leave Waiting Room
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
