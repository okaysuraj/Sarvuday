import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import useApiData from '../../hooks/useApiData';
import { DataState, PageHeading } from '../../components/common/DataState';

export default function AIChatSession() {
  const [params, setParams] = useSearchParams();
  const sessionId = params.get('session_id');
  const history = useApiData(sessionId ? `/ai/chat/${encodeURIComponent(sessionId)}` : null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [crisis, setCrisis] = useState(params.get('topic') === 'crisis');
  const end = useRef(null);
  useEffect(() => { setMessages(Array.isArray(history.data) ? history.data : []); }, [history.data]);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'instant' }); }, [messages]);
  const send = async event => {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setSending(true); setError('');
    try {
      const { data } = await axiosInstance.post('/ai/chat', { message: text, session_id: sessionId });
      setInput('');
      setCrisis(Boolean(data.is_crisis));
      if (!sessionId && data.session_id) setParams({ session_id: data.session_id }, { replace: true });
      else setMessages(previous => [...previous, { role: 'user', content: text }, { role: 'assistant', content: data.reply }].slice(-200));
    } catch (cause) { setError(cause.userMessage || 'Your message could not be sent. Your text is still here.'); }
    finally { setSending(false); }
  };
  return <div className="max-w-4xl mx-auto p-4 md:p-8 w-full">
    <PageHeading title="AI conversation">AI responses can be inaccurate. This conversation does not provide diagnosis, emergency monitoring, or a confirmed clinician response.</PageHeading>
    <Link to="/emergency-help" className="underline">Get urgent support</Link>
    {crisis && <div role="alert" className="my-4 p-4 border border-red-300 rounded-xl">If you may be in immediate danger, contact your local emergency services or someone you trust. <Link to="/emergency-help" className="underline">Open support options</Link>.</div>}
    <DataState loading={sessionId ? history.loading : false} error={sessionId ? history.error : ''} retry={history.retry}>
      <div role="log" aria-label="Conversation" aria-live="polite" className="my-6 space-y-4 max-h-[55vh] overflow-y-auto rounded-xl border border-stone-200 bg-white p-4">
        {messages.length === 0 && <p className="text-on-surface-variant">Send a message to begin.</p>}
        {messages.map((message, index) => <article key={message.message_id || index} className={`rounded-xl p-4 ${message.role === 'user' ? 'bg-surface-container ml-4' : 'bg-accent-sage mr-4'}`}><p className="text-xs font-semibold mb-2">{message.role === 'user' ? 'You' : 'AI assistant'}</p><p className="whitespace-pre-wrap break-words">{message.content}</p></article>)}
        <div ref={end} />
      </div>
      {error && <p role="alert" className="my-4 text-red-700">{error}</p>}
      <form onSubmit={send} className="flex flex-col gap-3"><label htmlFor="ai-message" className="font-semibold">Message</label><textarea id="ai-message" value={input} onChange={event => setInput(event.target.value)} maxLength={8000} rows={3} disabled={sending} className="rounded-xl border border-stone-300 bg-white p-4" /><button className="btn-primary self-end" disabled={sending || !input.trim()}>{sending ? 'Waiting for a response…' : 'Send message'}</button></form>
    </DataState>
  </div>;
}
