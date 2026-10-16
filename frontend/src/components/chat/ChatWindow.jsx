import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import BASE_URL from '../../config/apiConfig';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import styles from './ChatWindow.module.css';

export default function ChatWindow({ room, currentUserId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const socket = useRef(null);
  const bottom = useRef(null);
  const roomId = room?.room_id;
  useEffect(() => {
    if (!roomId) return;
    const controller = new AbortController();
    setLoading(true); setError(''); setMessages([]);
    axiosInstance.get(`/chat/rooms/${encodeURIComponent(roomId)}/messages?limit=100`, { signal: controller.signal }).then(response => { if (!controller.signal.aborted) setMessages(response.data.messages || []); }).catch(cause => { if (!controller.signal.aborted) setError(cause.userMessage || 'Your conversation could not load.'); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    const token = localStorage.getItem('accessToken');
    const connection = new WebSocket(`${BASE_URL.replace(/^http/, 'ws')}/chat/${encodeURIComponent(roomId)}?token=${encodeURIComponent(token)}`);
    socket.current = connection;
    connection.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.message_id) setMessages(previous => previous.some(message => message.message_id === data.message_id) ? previous : [...previous, data].slice(-200));
        if (data.type === 'read_receipt') setMessages(previous => previous.map(message => message.message_id === data.message_id ? { ...message, is_read: true } : message));
      } catch { setError('A live update could not be read. Refresh the conversation.'); }
    };
    connection.onerror = () => { if (!controller.signal.aborted) setError('Live updates disconnected. Refresh to reconnect.'); };
    return () => { controller.abort(); connection.close(); socket.current = null; };
  }, [roomId, attempt]);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'instant' }); }, [messages]);
  const send = async content => {
    try {
      await axiosInstance.post(`/chat/rooms/${encodeURIComponent(roomId)}/messages`, { content });
      const response = await axiosInstance.get(`/chat/rooms/${encodeURIComponent(roomId)}/messages?limit=100`);
      setMessages(response.data.messages || []);
      return true;
    } catch (cause) { setError(cause.userMessage || 'Your message could not be saved.'); return false; }
  };
  return <div className={styles.chatWindowContainer}><header className={styles.chatHeader}><h2>{room?.other_user_name || 'Conversation'}</h2></header>{loading && <p role="status" className="p-4">Loading messages?</p>}{error && <div role="alert" className="p-4"><p>{error}</p><button className="underline mt-2" onClick={() => setAttempt(value => value + 1)}>Refresh conversation</button></div>}<div className={styles.chatMessages}>{messages.map(message => <ChatMessage key={message.message_id} message={{ sender: message.sender_id === currentUserId ? 'user' : 'other', text: message.content, timestamp: message.created_at, is_read: message.is_read }} />)}<div ref={bottom} /></div><ChatInput onSend={send} /></div>;
}
