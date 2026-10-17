import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';

export default function PatientList() {
  const state = useApiData('/counsellor/appointments?upcoming=false&limit=100');
  const patients = new Map();
  for (const appointment of state.data?.appointments || [])
    if (appointment.user?.user_id && !patients.has(appointment.user.user_id))
      patients.set(appointment.user.user_id, appointment.user);
  return (
    <section>
      <PageHeading title="Patient directory">
        Patients with appointments assigned to your account.
      </PageHeading>
      <DataState {...state}>
        {patients.size ? (
          <ul className="grid sm:grid-cols-2 gap-4">
            {[...patients.values()].map((patient) => (
              <li key={patient.user_id} className="bg-white border border-stone-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-on-surface-variant mt-2">
                  Clinical risk has not been assessed in this view.
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No patients in the returned appointment history.</p>
        )}
      </DataState>
    </section>
  );
}
