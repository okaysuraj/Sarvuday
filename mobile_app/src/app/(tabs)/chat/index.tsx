import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import apiClient from '../../../api/client';
import { useAuth } from '../../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/theme';

type ChatSession = {
  session_id: string;
  title?: string;
  created_at?: string;
};

export default function ChatListScreen() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useAuth();
  const router = useRouter();

  const fetchSessions = async () => {
    if (!userToken) return;
    try {
      const response = await apiClient.get('/user/chatbot', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      setSessions(response.data.chat_sessions || []);
    } catch (error) {
      console.error('Fetch sessions error:', error);
      Alert.alert('Error', 'Could not load chat sessions.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSessions();
    }, [userToken])
  );

  const createNewChat = async () => {
    if (!userToken) return;
    try {
      setLoading(true);
      const response = await apiClient.post('/user/chatbot', {}, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      const newChat = response.data;
      setSessions([newChat, ...sessions]);
      router.push(`/(tabs)/chat/${newChat.session_id}`);
    } catch (error) {
      console.error('Create chat error:', error);
      Alert.alert('Error', 'Could not create new chat.');
      setLoading(false);
    }
  };

  if (!userToken) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Chat Companion</Text>
        <Text style={{marginBottom: 20}}>Please log in to chat with SurvUday AI.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading && sessions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.session_id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem} 
            onPress={() => router.push(`/(tabs)/chat/${item.session_id}`)}
          >
            <View style={styles.chatIconContainer}>
              <Ionicons name="chatbubble-outline" size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.chatTitle}>{item.title || 'New Conversation'}</Text>
              <Text style={styles.chatDate}>{new Date(item.created_at || Date.now()).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chat history found.</Text>
            <Text style={styles.emptySubText}>Start a new conversation with SurvUday AI.</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={createNewChat}>
        <Ionicons name="add" size={30} color={Colors.light.onPrimary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: Colors.light.text },
  primaryButton: { backgroundColor: Colors.light.primary, padding: 15, borderRadius: 8 },
  buttonText: { color: Colors.light.onPrimary, fontWeight: 'bold' },
  chatItem: { flexDirection: 'row', padding: 15, backgroundColor: Colors.light.surface, borderBottomWidth: 1, borderBottomColor: Colors.light.border, alignItems: 'center' },
  chatIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: Colors.light.backgroundElement, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  chatInfo: { flex: 1 },
  chatTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.light.text, marginBottom: 5 },
  chatDate: { fontSize: 13, color: Colors.light.textSecondary },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: Colors.light.textSecondary, marginBottom: 10 },
  emptySubText: { fontSize: 14, color: Colors.light.textSecondary, textAlign: 'center' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: Colors.light.primary, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: Colors.light.text, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 }
});
