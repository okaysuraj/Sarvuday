import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { chatApi } from '../../api/chat';
import useAuthStore from '../../store/authStore';
import { format } from 'date-fns';

export default function ChatConversationScreen() {
  const { room_id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  const ws = useRef<WebSocket | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await chatApi.getMessages(room_id as string);
        setMessages(data.messages || []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [room_id]);

  useEffect(() => {
    if (!user) return;
    
    // Connect WebSocket
    // Use the appropriate backend URL (assuming localhost or specific IP for dev)
    const wsUrl = `ws://10.0.2.2:8000/chat/${room_id}?token=${user.token || ''}`; 
    // Note: React Native needs absolute IP for local testing, e.g. 10.0.2.2 for Android emulator
    
    // We'll use a mocked ws approach for UI completeness if actual connection fails
    // In production, this would be the actual WS logic
    ws.current = new WebSocket(wsUrl);

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'message') {
          setMessages(prev => [...prev, data]);
        }
      } catch (err) {}
    };

    return () => {
      ws.current?.close();
    };
  }, [room_id, user]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;
    
    const msgContent = newMessage.trim();
    setNewMessage('');

    // Optimistic UI update
    const tempMsg = {
      message_id: `temp-${Date.now()}`,
      content: msgContent,
      sender_id: user.user_id,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      await chatApi.sendMessage(room_id as string, {
        content: msgContent,
        sender_type: user.role === 'therapist' ? 'counsellor' : 'normal_user',
        message_type: 'text'
      }, user.user_id);
      // Wait for WS to broadcast, or just rely on REST success
    } catch (error) {
      console.error('Failed to send:', error);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-cream-bg"
    >
      {/* Header */}
      <View className="bg-cream-bg flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container transition-colors">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-lg uppercase tracking-tighter">
          MindEase Chat
        </Text>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage flex items-center justify-center">
          <Ionicons name="person" size={20} color="#1b1b20" />
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        className="flex-1 px-4 pt-6" 
        contentContainerStyle={{ paddingBottom: 24, gap: 16 }}
      >
        <Text className="text-center font-label-md text-outline-variant text-sm mb-4">
          Today
        </Text>

        {messages.map((msg, idx) => {
          const isMe = msg.sender_id === user?.user_id;
          
          if (isMe) {
            return (
              <View key={msg.message_id || idx} className="flex-row justify-end w-full mb-2">
                <View className="bg-primary border-[1.5px] border-ink-black p-4 rounded-2xl rounded-br-sm max-w-[80%] shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="font-body-md text-white">{msg.content}</Text>
                  <Text className="text-[10px] text-white/70 text-right mt-1">
                    {format(new Date(msg.created_at), 'hh:mm a')}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View key={msg.message_id || idx} className="flex-row items-end gap-3 w-full mb-2">
                <View className="w-10 h-10 shrink-0 rounded-full bg-secondary-fixed border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="person" size={20} color="#1A1A1A" />
                </View>
                <View className="bg-white border-[1.5px] border-ink-black p-4 rounded-2xl rounded-bl-sm max-w-[75%]">
                  <Text className="font-body-md text-ink-black">{msg.content}</Text>
                  <Text className="text-[10px] text-on-surface-variant text-right mt-1">
                    {format(new Date(msg.created_at), 'hh:mm a')}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>

      {/* Input Area */}
      <View className="bg-cream-bg p-4 border-t-[1.5px] border-ink-black/20 flex-row items-end gap-3 pb-safe">
        <View className="flex-1 bg-surface-container border-[1.5px] border-ink-black rounded-xl px-4 py-3 min-h-[50px] justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
          <TextInput 
            className="font-body-md text-ink-black max-h-32"
            placeholder="Type a message..."
            multiline
            value={newMessage}
            onChangeText={setNewMessage}
          />
        </View>
        <TouchableOpacity 
          onPress={handleSend}
          disabled={!newMessage.trim()}
          className={`w-[50px] h-[50px] rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center ${newMessage.trim() ? 'bg-primary' : 'bg-surface-variant'}`}
        >
          <Ionicons name="send" size={20} color={newMessage.trim() ? '#ffffff' : '#747687'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
