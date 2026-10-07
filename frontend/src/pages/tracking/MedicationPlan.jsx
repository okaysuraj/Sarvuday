import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const MedicationPlan = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', schedule: 'Morning (08:00 AM)', refill_days: 30 });

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

  const handleToggleTaken = (medId) => {
    setMedications(prev => prev.map(m => {
      if (m.id === medId) {
        const nextState = !m.is_taken;
        toast.success(`${m.name} marked as ${nextState ? 'taken' : 'not taken'}.`);
        return { ...m, is_taken: nextState };
      }
      return m;
    }));
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMed.name.trim()) return;

    const created = {
      id: Date.now().toString(),
      name: newMed.name,
      dosage: newMed.dosage || '1 Tablet',
      schedule: newMed.schedule,
      refill_days: parseInt(newMed.refill_days) || 30,
      is_taken: false,
      type: 'Prescription'
    };

    setMedications(prev => [...prev, created]);
    toast.success(`${newMed.name} added to your daily schedule!`);
    setShowAddModal(false);
    setNewMed({ name: '', dosage: '', schedule: 'Morning (08:00 AM)', refill_days: 30 });
  };

  if (loading) {
    return <div className="flex-1 pb-24 flex items-center justify-center font-label-bold">Loading medication plan...</div>;
  }

  return (
    <div className="flex-1 pb-24 overflow-y-auto">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display-lg text-3xl md:text-4xl text-on-background">Medication & Regimen</h1>
          <p className="font-body-lg text-on-surface-variant text-sm mt-1">Manage daily prescriptions, dosages, and refill schedules.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-white px-5 py-2.5 rounded-xl font-medium text-xs flex items-center gap-1.5 hover:bg-neutral-800 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add Prescription
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Schedule & Active Meds */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Today's Schedule */}
          <section className="bg-surface border border-outline rounded-2xl p-6">
            <h2 className="font-semibold text-base mb-4 text-on-background">Today's Schedule</h2>
            <div className="flex flex-col gap-2.5">
              {medications.map((med) => {
                const isMorning = med.schedule?.toLowerCase().includes('morning');
                const icon = isMorning ? 'light_mode' : 'dark_mode';
                
                return (
                  <div key={med.id} className="bg-surface-container-low rounded-xl border border-outline p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-surface border border-outline flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-sm text-secondary">{icon}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-on-background">{med.schedule}</h3>
                        <p className="text-xs text-on-surface-variant mt-0.5">{med.name} • {med.dosage}</p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={med.is_taken || false}
                        onChange={() => handleToggleTaken(med.id)}
                        className="w-4 h-4 rounded text-primary focus:ring-0 border-outline cursor-pointer"
                      />
                      <span className="text-xs text-on-surface-variant font-medium">Taken</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Dosage & Refill Specs */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medications.map((med) => (
              <div key={med.id} className="bg-surface border border-outline rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base text-on-background">{med.name}</h3>
                    <span className="material-symbols-outlined text-sm text-secondary">medication</span>
                  </div>
                  <div className="space-y-1.5 my-3 text-xs">
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Dosage:</span>
                      <span className="font-semibold text-on-background">{med.dosage}</span>
                    </div>
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Refills Remaining:</span>
                      <span className="font-semibold text-on-background">{med.refill_days} days</span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-outline flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Status:</span>
                  <span className={`font-semibold ${med.refill_days < 10 ? 'text-error' : 'text-secondary'}`}>
                    {med.refill_days < 10 ? 'Refill Needed' : 'Adequate Supply'}
                  </span>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column: Provider & Pharmacy */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <section className="bg-surface border border-outline rounded-2xl p-6">
            <h3 className="font-semibold text-base mb-3 text-on-background">Clinical Provider</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container border border-outline flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">medical_services</span>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-on-background">Dr. Aisha Sharma</h4>
                <p className="text-xs text-on-surface-variant">Psychiatry & Behavioral Health</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Prescriptions are monitored periodically during scheduled consultations. For emergency changes, contact clinic triage.
            </p>
            <button className="w-full py-2.5 rounded-xl border border-outline bg-surface-container text-xs font-semibold text-on-surface">
              Message Clinician
            </button>
          </section>
        </div>
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-outline rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-on-surface mb-1">Add Medication</h3>
            <p className="text-xs text-on-surface-variant mb-4">Record a new medicine to track daily compliance.</p>
            
            <form onSubmit={handleAddMedication} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Medicine Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sertraline or Melatonin"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full bg-surface-container border border-outline rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g., 50mg, 1 Capsule"
                  value={newMed.dosage}
                  onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                  className="w-full bg-surface-container border border-outline rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Schedule Timing</label>
                <select
                  value={newMed.schedule}
                  onChange={(e) => setNewMed({ ...newMed, schedule: e.target.value })}
                  className="w-full bg-surface-container border border-outline rounded-xl p-2.5 text-xs text-on-surface focus:outline-none focus:border-primary"
                >
                  <option>Morning (08:00 AM)</option>
                  <option>Afternoon (01:00 PM)</option>
                  <option>Evening (08:00 PM)</option>
                  <option>Bedtime (10:30 PM)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-outline bg-surface-container text-xs font-semibold text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationPlan;
