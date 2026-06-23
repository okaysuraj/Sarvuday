import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Colors, Typography, Spacing, Radii } from '../../constants/theme';
import apiClient from '../../api/client';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function WsChatScreen() {
  const { roomId } = useLocalSearchParams();
  const { userToken } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const flatListRef = useRef<FlatList | null>(null);
  
  const currentUserId = userToken ? jwtDecode<{ sub: string }>(userToken).sub : null;
  const API_BASE_URL = apiClient.defaults.baseURL || 'http://10.0.2.2:8000';
  const WS_BASE = API_BASE_URL.replace('http', 'ws').replace('/api/v1', '');

  useEffect(() => {
    if (!roomId || !userToken) return;

    // Fetch history
    axios.get(`${API_BASE_URL}/chat/rooms/${roomId}/messages?limit=100`, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(res => setMessages(res.data.messages || []))
    .catch(console.error);

    // Connect WS
    const ws = new WebSocket(`${WS_BASE}/ws/chat/${roomId}?token=${userToken}`);
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      } else if (data.type === 'online') {
        setOnlineUsers(data.users || []);
      }
    };

    return () => ws.close();
  }, [roomId, userToken]);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: 'message', content: input.trim() }));
    setInput('');
  };

  const isOtherOnline = onlineUsers.some(u => u.user_id !== currentUserId);

  const renderItem = ({ item }: { item: any }) => {
    const isMe = item.sender_id === currentUserId;
    return (
      <View style={[styles.messageWrapper, isMe ? styles.myWrapper : styles.theirWrapper]}>
        <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.messageText, isMe ? styles.myText : styles.theirText]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen 
        options={{ 
          title: 'Counsellor',
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.statusDot, { backgroundColor: isOtherOnline ? '#28a745' : '#ccc' }]} />
              <Text style={{ fontSize: 12, marginRight: 15, color: '#666' }}>
                {isOtherOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          )
        }} 
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.message_id || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 15 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 5 },
  messageWrapper: { flexDirection: 'row', marginBottom: 15, width: '100%' },
  myWrapper: { justifyContent: 'flex-end' },
  theirWrapper: { justifyContent: 'flex-start' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: Radii.md, borderWidth: 1.5, borderColor: Colors.light.border },
  myBubble: { backgroundColor: Colors.light.primary, borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: Colors.light.surface, borderBottomLeftRadius: 4 },
  messageText: { ...Typography.bodyMd },
  myText: { color: Colors.light.onPrimary },
  theirText: { color: Colors.light.text },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 10, 
    backgroundColor: Colors.light.surface, 
    borderTopWidth: 1.5, 
    borderColor: Colors.light.border,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    backgroundColor: Colors.light.background,
  },
  sendButton: {
    backgroundColor: Colors.light.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  }
});
