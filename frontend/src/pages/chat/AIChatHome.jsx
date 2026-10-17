import { Link } from 'react-router-dom';
import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';

export default function AIChatHome() {
  const state = useApiData('/ai/sessions');
  const sessions = Array.isArray(state.data) ? state.data : [];
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 w-full space-y-6">
      <PageHeading title="Your AI conversations">
        A space to reflect. AI responses can be inaccurate and are not clinical care or emergency
        monitoring.
      </PageHeading>
      <div className="flex flex-wrap gap-4">
        <Link to="/ai-chat/session" className="btn-primary">
          Start a conversation
        </Link>
        <Link to="/emergency-help" className="underline self-center">
          Urgent support
        </Link>
        <Link to="/journal" className="underline self-center">
          Write in your journal
        </Link>
      </div>
      <section className="rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-xl font-semibold mb-4">Saved conversations</h2>
        <DataState {...state}>
          {sessions.length ? (
            <ul className="divide-y divide-stone-200">
              {sessions.map((session) => (
                <li key={session.session_id} className="py-4">
                  <Link
                    className="underline"
                    to={`/ai-chat/session?session_id=${encodeURIComponent(session.session_id)}`}
                  >
                    {session.title || 'Conversation'}
                    {session.created_at
                      ? ` · ${new Date(session.created_at).toLocaleString()}`
                      : ''}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No saved conversations yet.</p>
          )}
        </DataState>
      </section>
    </div>
  );
}
