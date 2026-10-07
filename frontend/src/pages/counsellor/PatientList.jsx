import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { format, parseISO } from 'date-fns';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      // Fetch all appointments for the counsellor to derive the patient list
      const response = await axiosInstance.get('/counsellor/appointments', {
        params: { upcoming: false, limit: 100 } // get all to find unique patients
      });
      
      const appointments = response.data.appointments || [];
      
      // Deduplicate users to create a patient list
      const uniquePatientsMap = new Map();
      appointments.forEach(app => {
        if (app.user && !uniquePatientsMap.has(app.user.user_id)) {
          uniquePatientsMap.set(app.user.user_id, {
            ...app.user,
            lastSession: app.created_at // simplify for now, real app would find the latest completed session
          });
        }
      });
      
      setPatients(Array.from(uniquePatientsMap.values()));
    } catch (err) {
      console.error('Error fetching patients', err);
      setError('Failed to load patient directory.');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLabel = (patient) => {
    // Mock risk assessment logic
    if (patient.name?.length > 15) return { label: 'High Risk', bg: 'bg-error-container', text: 'text-on-error-container' };
    if (patient.name?.length < 8) return { label: 'Moderate Risk', bg: 'bg-secondary-container', text: 'text-on-secondary-container' };
    return { label: 'Low Risk', bg: 'bg-accent-sage', text: 'text-on-surface-variant' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      

      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="font-headline-md text-on-background">Patient Directory</h2>
          <p className="text-on-surface-variant">Managing {patients.length} active patient profiles</p>
          {error && <p className="text-error mt-2">{error}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          {['All', 'Active', 'On-Hold', 'High Risk'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full border-outline font-label-bold transition-colors ${filter === f ? 'bg-primary text-white shadow-sm' : 'bg-white hover:bg-accent-sage text-ink-black'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {patients.length === 0 ? (
          <div className="col-span-full py-12 text-center border-dashed border-outline rounded-xl bg-white">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">person_search</span>
            <p className="font-headline-sm text-ink-black">No patients found</p>
            <p className="text-on-surface-variant">You haven't been assigned any patients yet.</p>
          </div>
        ) : (
          patients.map(patient => {
            const risk = getRiskLabel(patient);
            return (
              <div key={patient.user_id} className="bg-white border-outline rounded-xl p-8 shadow-subtle-hover transition-all flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl border-outline overflow-hidden bg-accent-sage flex items-center justify-center font-display-lg text-primary text-2xl shadow-subtle">
                    {patient.name ? patient.name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <span className={`px-3 py-1 ${risk.bg} ${risk.text} border-outline rounded-lg text-xs font-label-bold`}>
                    {risk.label}
                  </span>
                </div>
                <h3 className="font-headline-sm text-on-background mb-1">{patient.name || 'Unknown Patient'}</h3>
                <p className="text-xs text-on-surface-variant font-label-md mb-4">
                  Added: {patient.lastSession ? format(parseISO(patient.lastSession), 'MMM dd, yyyy') : 'N/A'}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-accent-sage border-outline rounded-full text-[10px] font-bold uppercase tracking-wider">Assigned</span>
                </div>
                <button className="mt-auto w-full py-3 bg-primary text-white border-outline rounded-xl shadow-subtle shadow-subtle-hover neo-click font-label-bold flex items-center justify-center gap-2">
                  View Records <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            );
          })
        )}

        {/* Add New Patient Card placeholder */}
        <button className="group relative flex flex-col items-center justify-center bg-transparent border-dashed border-outline-variant rounded-xl p-8 hover:border-primary hover:bg-primary-container/10 transition-all cursor-pointer h-full min-h-[300px]">
          <div className="w-16 h-16 rounded-full border-outline bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-subtle group-hover:bg-secondary-container">
            <span className="material-symbols-outlined text-3xl">person_add</span>
          </div>
          <h3 className="font-headline-sm text-on-background">Add New Patient</h3>
          <p className="text-sm text-on-surface-variant mt-2 text-center">Create a new profile and start onboarding</p>
        </button>
      </div>
    </div>
  );
};

export default PatientList;
