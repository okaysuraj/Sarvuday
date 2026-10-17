import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataState, PageHeading } from '../../components/common/DataState';
import useApiData from '../../hooks/useApiData';
import axiosInstance from '../../utils/axiosInstance';

export default function GroupChat() {
  const { groupId } = useParams();
  const state = useApiData(`/community/groups/${encodeURIComponent(groupId)}/feed`);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const send = async (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      await axiosInstance.post('/community/posts', {
        content,
        group_id: groupId,
        is_anonymous: true,
        has_trigger_warning: false,
      });
      setContent('');
      state.retry();
    } catch (cause) {
      setError(cause.userMessage || 'Your post could not be saved.');
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <PageHeading title="Group conversation" />
      <DataState {...state}>
        {Array.isArray(state.data) && state.data.length ? (
          <ul className="space-y-4">
            {state.data.map((post) => (
              <li key={post.id} className="bg-white border border-stone-200 rounded-xl p-6">
                <p className="text-sm text-on-surface-variant">
                  {post.is_anonymous ? 'Anonymous member' : 'Community member'}
                </p>
                <p className="my-3">{post.content}</p>
                <time dateTime={post.created_at} className="text-xs text-on-surface-variant">
                  {new Date(post.created_at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts in this group yet.</p>
        )}
      </DataState>
      <form onSubmit={send} className="space-y-4">
        <label className="block">
          Share with the group
          <textarea
            className="input-field mt-2"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
            maxLength={10000}
          />
        </label>
        {error && <p role="alert">{error}</p>}
        <button className="btn-primary" disabled={saving || !content.trim()}>
          {saving ? 'Posting?' : 'Post to group'}
        </button>
      </form>
    </section>
  );
}
