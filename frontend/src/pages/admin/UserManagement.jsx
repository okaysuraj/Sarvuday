import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';

export default function UserManagement() {
  const state = useApiData('/admin/users?limit=100');
  return (
    <section>
      <PageHeading title="Registered users">
        Account records from the platform database.
      </PageHeading>
      <DataState {...state}>
        {state.data?.users?.length ? (
          <ul className="grid sm:grid-cols-2 gap-4">
            {state.data.users.map((user) => (
              <li key={user.user_id} className="bg-white border border-stone-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-on-surface-variant mt-2">{user.user_id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users returned.</p>
        )}
      </DataState>
    </section>
  );
}
