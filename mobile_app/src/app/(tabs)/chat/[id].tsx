import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../../../api/client';
import { useAuth } from '../../../context/AuthContext';
import { Colors } from '../../../constants/theme';

export default function ChatWindowScreen() {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await apiClient.get(`/user/chatbot/history/${id}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        
        const history = response.data.conversation_history || [];
        const formatted = history.flatMap(entry => [
          { id: `${entry.timestamp}-user`, text: entry.user, sender: 'user', timestamp: entry.timestamp },
          { id: `${entry.timestamp}-bot`, text: entry.assistant, sender: 'bot', timestamp: entry.timestamp }
        ]);
        
        setMessages(formatted);
      } catch (error) {
        console.error('Fetch history error:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id && userToken) fetchHistory();
  }, [id, userToken]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    
    const userMessage = input.trim();
    setInput('');
    const tempId = Date.now().toString();
    
    setMessages(prev => [...prev, { id: tempId, text: userMessage, sender: 'user', timestamp: new Date().toISOString() }]);
    setSending(true);

    try {
      const response = await apiClient.post(`/user/chatbot/inference/${id}`, 
        { user_input: userMessage },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: response.data.response, 
        sender: 'bot', 
        timestamp: new Date().toISOString() 
      }]);
    } catch (error) {
      console.error('Send message error:', error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: "I'm sorry, I'm having trouble connecting to the server.", 
        sender: 'bot', 
        timestamp: new Date().toISOString() 
      }]);
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userText : styles.botText]}>
          {item.text}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Message SurvUday..."
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <TouchableOpacity 
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={!input.trim() || sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color={Colors.light.onPrimary} />
          ) : (
            <Ionicons name="send" size={20} color={Colors.light.onPrimary} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  messageList: { padding: 15, paddingBottom: 20 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 18, marginBottom: 10 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: Colors.light.primary, borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: Colors.light.surface, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: Colors.light.border },
  messageText: { fontSize: 16, lineHeight: 22 },
  userText: { color: Colors.light.onPrimary },
  botText: { color: Colors.light.text },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: Colors.light.surface, borderTopWidth: 1, borderTopColor: Colors.light.border, alignItems: 'flex-end' },
  textInput: { flex: 1, backgroundColor: Colors.light.backgroundElement, color: Colors.light.text, borderRadius: 20, paddingHorizontal: 15, paddingTop: 10, paddingBottom: 10, fontSize: 16, maxHeight: 100, minHeight: 40, marginRight: 10, borderWidth: 1, borderColor: Colors.light.border },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.light.primary, justifyContent: 'center', alignItems: 'center' },
  sendButtonDisabled: { backgroundColor: Colors.light.backgroundSelected }
});
