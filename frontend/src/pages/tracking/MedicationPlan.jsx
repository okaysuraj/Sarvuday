import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const MedicationPlan = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axiosInstance.get('/user/tracking/medications');
        setMedications(response.data);
      } catch (error) {
        console.error('Error fetching medications', error);
        toast.error('Failed to load medication plan.');
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading medication plan...</div>;
  }

  return (
    <div className="flex-1 pb-24 overflow-y-auto">
      <style>{`
        .sticker-card {
            border: 1.5px solid #1A1A1A;
            border-radius: 24px;
            padding: 32px;
            background-color: #ffffff;
        }
        .sticker-btn-primary {
            background-color: #002da5;
            color: #ffffff;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }
        .sticker-btn-primary:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .sticker-btn-secondary {
            background-color: #fdd33f;
            color: #1b1b20;
            border: 1.5px solid #1A1A1A;
            box-shadow: 4px 4px 0px 0px #1A1A1A;
            transition: all 0.2s ease;
        }
        .sticker-btn-secondary:active {
            box-shadow: 0px 0px 0px 0px #1A1A1A;
            transform: translate(2px, 2px);
        }
        .sticker-checkbox {
            appearance: none;
            width: 24px;
            height: 24px;
            border: 1.5px solid #1A1A1A;
            border-radius: 6px;
            background-color: #fbf8ff;
            cursor: pointer;
            position: relative;
        }
        .sticker-checkbox:checked {
            background-color: #002da5;
        }
        .sticker-checkbox:checked::after {
            content: '';
            position: absolute;
            left: 7px;
            top: 3px;
            width: 6px;
            height: 12px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
      `}</style>

      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-lg text-4xl md:text-display-lg text-on-background">Medication Plan</h1>
          <p className="font-body-lg text-on-surface-variant mt-2">Manage your daily prescriptions and schedules.</p>
        </div>
        <button className="sticker-btn-secondary px-6 py-3 rounded-xl font-label-bold flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Add Medication
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Schedule & Active Meds */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Today's Schedule */}
          <section className="sticker-card bg-accent-sage">
            <h2 className="font-headline-md text-2xl mb-6 text-on-background">Today's Schedule</h2>
            <div className="flex flex-col gap-3">
              {medications.map((med, index) => {
                const isMorning = med.schedule.toLowerCase().includes('morning');
                const bgColor = isMorning ? 'bg-secondary-container' : 'bg-accent-orange';
                const iconColor = isMorning ? 'text-secondary' : 'text-on-error-container';
                const icon = isMorning ? 'light_mode' : 'dark_mode';
                
                return (
                  <div key={med.id} className="bg-surface rounded-xl border-[1.5px] border-ink-black p-4 flex items-center justify-between hover:scale-[1.01] transition-transform">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${bgColor} border-[1.5px] border-ink-black flex items-center justify-center shrink-0`}>
                        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                      </div>
                      <div>
                        <h3 className="font-label-bold text-on-background">{med.schedule}</h3>
                        <p className="font-body-md text-on-surface-variant">{med.name} ({med.dosage})</p>
                      </div>
                    </div>
                    <input defaultChecked={med.is_taken} className="sticker-checkbox" type="checkbox" />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Detailed Dosage Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {medications.map((med, index) => {
              const bgShapes = ['bg-accent-sage', 'bg-accent-orange', 'bg-primary-fixed', 'bg-tertiary-fixed'];
              const bgShapeColor = bgShapes[index % bgShapes.length];
              
              return (
                <div key={med.id} className="sticker-card bg-surface flex flex-col h-full relative overflow-hidden group hover:scale-[1.02] transition-transform">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${bgShapeColor} rounded-bl-[100px] z-0`}></div>
                  <div className="flex justify-between items-start mb-4 z-10">
                    <div>
                      <h3 className="font-headline-sm text-xl text-on-background">{med.name}</h3>
                      <span className="inline-block px-3 py-1 bg-surface-container-high border border-ink-black rounded-full font-label-md text-on-surface mt-2">{med.type}</span>
                    </div>
                    <span className="material-symbols-outlined text-outline bg-white p-1 rounded-full">medication</span>
                  </div>
                  <div className="space-y-2 mb-6 flex-grow z-10">
                    <div className="flex justify-between">
                      <span className="font-body-md text-on-surface-variant">Dosage:</span>
                      <span className="font-label-bold text-on-background">{med.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body-md text-on-surface-variant">Refills left:</span>
                      <span className="font-label-bold text-on-background">{med.refill_days} days</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t-[1.5px] border-ink-black border-dashed z-10">
                    <p className="font-label-md text-on-surface-variant mb-2">Supply status:</p>
                    <p className={`font-label-bold ${med.refill_days < 10 ? 'text-error' : 'text-primary'}`}>{med.refill_days < 10 ? 'Refill soon' : 'Good'}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        {/* Right Column: Providers & Pharmacy */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Prescribing Psychiatrist */}
          <section className="sticker-card bg-accent-pink">
            <h3 className="font-headline-sm text-xl mb-4 text-on-background">Prescribing Doctor</h3>
            <div className="flex items-center gap-4 mb-6">
              <img 
                alt="Dr. Sarah Jenkins" 
                className="w-16 h-16 rounded-full border-[1.5px] border-ink-black object-cover shrink-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdt2fnIqo-6P9Kr57Nx5yuwPE0_5f8JAoP4kE6y2COAJBdytgjcxyB-KizmkbqZQxcPUEKgHtTv5neVZquojmG6rJKEDVs4JrmxTdVN8dXIJtuhZkaqiTIQXCx4u3m-MlbqH73JJ8LQKbdAvI5TSHvDNer5A3l5bh0ryBCREr5NN43PaN90S6PA9IYy8QihULV2vBnwg6iaOkWWhBQVeTtK8rzqjGaVfpxJrfJ8U73KUmVDBXBwhHnYQ" 
              />
              <div>
                <h4 className="font-label-bold text-on-background">Dr. Sarah Jenkins</h4>
                <p className="font-body-md text-on-surface-variant">Psychiatrist, MD</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="sticker-btn-primary w-full py-3 rounded-xl font-label-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">chat</span>
                Message Doctor
              </button>
              <button className="bg-surface text-on-background border-[1.5px] border-ink-black w-full py-3 rounded-xl font-label-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors active:translate-y-0.5 active:translate-x-0.5">
                <span className="material-symbols-outlined">calendar_month</span>
                Request Appointment
              </button>
            </div>
          </section>

          {/* Preferred Pharmacy */}
          <section className="sticker-card bg-surface">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-sm text-xl text-on-background">Pharmacy</h3>
              <span className="material-symbols-outlined text-primary">local_pharmacy</span>
            </div>
            <div className="bg-surface-variant/30 rounded-xl p-4 border border-outline-variant mb-4">
              <h4 className="font-label-bold text-on-background mb-1">Walgreens #1234</h4>
              <p className="font-body-md text-on-surface-variant">123 Main St, Springfield</p>
              <p className="font-body-md text-on-surface-variant mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">call</span> (555) 123-4567
              </p>
            </div>
            <button className="text-primary font-label-bold hover:underline flex items-center gap-1 w-full justify-center">
              <span className="material-symbols-outlined text-[18px]">edit</span>
              Change Pharmacy
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MedicationPlan;
