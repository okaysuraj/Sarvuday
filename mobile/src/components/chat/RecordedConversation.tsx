import React, { useCallback, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Action, RequestState, Screen } from '../common/Screen';
import { MessageBubble, MessageProps } from './MessageBubble';
import { useAuthStore } from '../../store/authStore';
import { apiClient, BASE_URL } from '../../api/client';
import { errorMessage } from '../../hooks/use-api-resource';

export default function RecordedConversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isAi = id === 'ai' || id === 'ai-session';
  const userId = useAuthStore(state => state.user?.user_id || state.user?.id);
  const token = useAuthStore(state => state.token);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [revision, setRevision] = useState(0);
  const focused = useRef(false);
  const list = useRef<FlatList<MessageProps>>(null);
  const refreshHuman = useRef<() => Promise<void>>(async () => {});
  useFocusEffect(useCallback(() => {
    const controller = new AbortController();
    focused.current = true;
    setLoading(true);
    setError('');
    setMessages([]);
    let socket: WebSocket | null = null;
    let refreshing = false;
    const refresh = async () => {
      if (refreshing || controller.signal.aborted) return;
      refreshing = true;
      try {
        const response = await apiClient.get(`/chat/rooms/${encodeURIComponent(id)}/messages?limit=100`, { signal: controller.signal });
        if (!controller.signal.aborted) setMessages((response.data.messages || []).map((message: any) => ({ id: message.message_id, text: message.content, sender: message.sender_id === userId ? 'user' : 'therapist', timestamp: message.created_at ? new Date(message.created_at).toLocaleTimeString() : '' })));
      } finally { refreshing = false; }
    };
    refreshHuman.current = refresh;
    const start = async () => {
      try {
        if (isAi) {
          const sessions = (await apiClient.get('/ai/sessions?limit=1', { signal: controller.signal })).data;
          const selected = Array.isArray(sessions) ? sessions[0]?.session_id : null;
          if (!controller.signal.aborted) setSessionId(selected || null);
          if (selected) {
            const response = await apiClient.get(`/ai/chat/${encodeURIComponent(selected)}`, { signal: controller.signal });
            if (!controller.signal.aborted) setMessages(response.data.map((message: any, index: number) => ({ id: String(index), text: message.content, sender: message.role === 'user' ? 'user' : 'ai', timestamp: '' })));
          }
        } else {
          await refresh();
          if (controller.signal.aborted || !token) return;
          socket = new WebSocket(`${BASE_URL.replace(/^http/, 'ws')}/chat/${encodeURIComponent(id)}?token=${encodeURIComponent(token)}`);
          socket.onmessage = event => {
            try { const data = JSON.parse(event.data); if (data.type === 'message') void refresh().catch(cause => { if (!controller.signal.aborted) setError(errorMessage(cause)); }); }
            catch { if (!controller.signal.aborted) setError('A chat update could not be read. Refresh the conversation.'); }
          };
          socket.onerror = () => { if (!controller.signal.aborted) setError('Live updates disconnected. Refresh to see new messages.'); };
        }
      } catch (cause) { if (!controller.signal.aborted) setError(errorMessage(cause)); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    };
    void start();
    return () => { focused.current = false; controller.abort(); socket?.close(); };
  }, [id, isAi, token, userId, revision]));
  const send = async () => {
    if (sending || !input.trim()) return;
    setSending(true);
    setError('');
    const content = input.trim();
    try {
      if (isAi) {
        const response = await apiClient.post('/ai/chat', { message: content, session_id: sessionId });
        if (!focused.current) return;
        setSessionId(response.data.session_id);
        const history = await apiClient.get(`/ai/chat/${encodeURIComponent(response.data.session_id)}`);
        if (focused.current) setMessages(history.data.map((message: any, index: number) => ({ id: String(index), text: message.content, sender: message.role === 'user' ? 'user' : 'ai', timestamp: '' })));
      } else {
        await apiClient.post(`/chat/rooms/${encodeURIComponent(id)}/messages`, { content });
        if (focused.current) await refreshHuman.current();
      }
      if (focused.current) setInput('');
    } catch (cause) { if (focused.current) setError(errorMessage(cause)); }
    finally { if (focused.current) setSending(false); }
  };
  return <Screen title={isAi ? 'AI companion' : 'Conversation'} scroll={false}><KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <RequestState loading={loading} error={error} retry={() => setRevision(value => value + 1)} />
    <FlatList ref={list} data={messages} keyExtractor={message => message.id} renderItem={({ item }) => <MessageBubble message={item} />} initialNumToRender={12} maxToRenderPerBatch={8} windowSize={5} contentContainerStyle={{ padding: 16 }} ListEmptyComponent={!loading ? <Text className="text-on-surface-variant">No saved messages yet.</Text> : null} onContentSizeChange={() => list.current?.scrollToEnd({ animated: false })} />
    <View className="p-4 border-t border-outline gap-3"><TextInput accessibilityLabel="Message" multiline maxLength={10000} value={input} onChangeText={setInput} placeholder="Write a message" className="bg-surface border border-outline rounded-xl px-4 py-3 text-on-surface max-h-32" /><Action title={sending ? 'Sending…' : 'Send'} disabled={sending || loading || !input.trim()} onPress={() => void send()} /></View>
  </KeyboardAvoidingView></Screen>;
}
