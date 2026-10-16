import useApiData from '../../hooks/useApiData';
import { DataState, PageHeading } from '../common/DataState';

export default function Prescriptions() {
  const state = useApiData('/user/prescriptions?limit=100');
  const records = state.data?.prescriptions || [];
  return <div className="max-w-5xl mx-auto p-4 md:p-8"><PageHeading title="Your prescriptions">Records issued by your care provider.</PageHeading><DataState {...state}>{records.length === 0 ? <p>No prescriptions have been recorded.</p> : <div className="space-y-4">{records.map(record => <article key={record.prescription_id} className="rounded-xl border border-stone-200 bg-white p-6"><h2 className="font-semibold">{record.diagnosis || 'Prescription'}</h2><p className="text-sm my-2">{record.created_at ? new Date(record.created_at).toLocaleString() : 'Date not recorded'}</p><h3 className="font-semibold mt-4">Medications</h3><ul>{(record.medications || []).map((medication, index) => <li key={index}>{medication.name} · {medication.dosage} · {medication.frequency}</li>)}</ul><h3 className="font-semibold mt-4">Recommendations</h3><ul>{(record.recommendations || []).map((recommendation, index) => <li key={index}>{recommendation}</li>)}</ul></article>)}</div>}</DataState></div>;
}
