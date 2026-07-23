import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming'); // upcoming, past, all

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/user/appointments', {
        params: {
          upcoming: filter === 'upcoming' ? true : (filter === 'past' ? false : undefined)
        }
      });
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error('Failed to load appointments', err);
      toast.error('Could not load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    try {
      await axiosInstance.patch(`/user/appointments/cancel/${appointmentId}`, null, {
        params: { reason: "User requested cancellation" }
      });
      toast.success('Appointment cancelled successfully');
      fetchAppointments();
    } catch (err) {
      console.error('Failed to cancel appointment', err);
      toast.error(err.response?.data?.detail || 'Failed to cancel appointment');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col min-h-screen">
      <style>{`
        .neo-shadow {
            box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
        }
        .active-press:active {
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
            transform: translate(2px, 2px);
        }
      `}</style>
      
      <div className="flex justify-between items-center mb-8 border-b-[1.5px] border-ink-black pb-6">
        <h1 className="font-display-lg text-headline-lg font-bold text-ink-black">My Appointments</h1>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-2 rounded-xl border-[1.5px] border-ink-black font-label-bold transition-all ${filter === 'upcoming' ? 'bg-primary text-white neo-shadow' : 'bg-white text-ink-black hover:bg-surface-container'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilter('past')}
            className={`px-6 py-2 rounded-xl border-[1.5px] border-ink-black font-label-bold transition-all ${filter === 'past' ? 'bg-primary text-white neo-shadow' : 'bg-white text-ink-black hover:bg-surface-container'}`}
          >
            Past
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40"><span className="material-symbols-outlined animate-spin text-4xl text-primary">autorenew</span></div>
      ) : appointments.length === 0 ? (
        <div className="bg-white border-[1.5px] border-ink-black rounded-3xl p-12 text-center neo-shadow">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">calendar_month</span>
          <h2 className="font-headline-md text-ink-black mb-2">No {filter} appointments</h2>
          <p className="font-body-md text-on-surface-variant mb-6">You don't have any {filter} appointments scheduled right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map(app => {
            const isCancelled = app.status === 'cancelled';
            const dateStr = new Date(app.session.session_scheduled_at).toLocaleString();
            
            return (
              <div key={app.appointment_id} className={`bg-white border-[1.5px] border-ink-black rounded-3xl p-6 ${isCancelled ? 'opacity-60' : 'neo-shadow'} flex flex-col`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full border border-ink-black font-label-bold text-xs ${isCancelled ? 'bg-surface-container-low text-ink-black' : 'bg-accent-sage text-ink-black'}`}>
                    {app.status.toUpperCase()}
                  </div>
                  <span className="font-label-bold text-on-surface-variant text-sm">{app.reason || 'Therapy'}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4 pb-4 border-b-[1.5px] border-ink-black border-dashed">
                  <div className="w-12 h-12 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-primary-fixed flex items-center justify-center font-bold text-lg">
                    {app.counsellor?.profile_pic ? (
                      <img src={app.counsellor.profile_pic} alt="Counsellor" className="w-full h-full object-cover" />
                    ) : (
                      app.counsellor?.name?.charAt(0) || 'C'
                    )}
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-ink-black line-clamp-1">{app.counsellor?.name}</h3>
                    <p className="font-body-md text-sm text-on-surface-variant">Psychotherapist</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-ink-black font-label-bold">
                    <span className="material-symbols-outlined text-[18px]">event</span>
                    <span>{dateStr}</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-sm">
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span>Video Consultation</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  {!isCancelled && filter === 'upcoming' && (
                    <button 
                      onClick={() => handleCancel(app.appointment_id)}
                      className="flex-1 bg-white border-[1.5px] border-ink-black text-ink-black py-2 rounded-xl font-label-bold hover:bg-error/10 hover:text-error transition-all active-press text-sm"
                    >
                      Cancel
                    </button>
                  )}
                  {!isCancelled && (
                    <button className="flex-1 bg-primary text-white border-[1.5px] border-ink-black py-2 rounded-xl font-label-bold hover:opacity-90 transition-all active-press text-sm flex justify-center items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">videocam</span> Join
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
