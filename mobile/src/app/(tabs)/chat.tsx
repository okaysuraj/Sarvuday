import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { chatApi } from '../../api/chat';
import { useAuthStore } from '../../store/useAuthStore';
import { format, parseISO } from 'date-fns';

export default function ChatHubScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = useCallback(async () => {
    if (!user?.user_id) return;
    try {
      const response = await chatApi.getChatRooms(user.user_id);
      setRooms(response.rooms || []);
    } catch (error) {
      console.error('Error fetching chat rooms', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRooms();
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return '';
    try {
      return format(parseISO(isoString), 'h:mm a');
    } catch (e) {
      return '';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 pt-4 pb-2">
        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-6">Messages</Text>
        
        {/* AI Companion Card */}
        <TouchableOpacity 
          onPress={() => router.push('/chat/ai')}
          className="bg-primary-fixed p-4 rounded-xl flex-row items-center mb-8 border border-primary-fixed-dim"
        >
          <View className="w-14 h-14 rounded-full bg-primary items-center justify-center mr-4">
            <Ionicons name="sparkles" size={24} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-md text-on-primary-fixed font-bold text-lg">AI Companion</Text>
            <Text className="font-body-md text-on-primary-fixed-variant text-sm mt-1">Available 24/7 for support</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#002da5" />
        </TouchableOpacity>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-headline-md text-on-surface text-lg font-bold">Recent Conversations</Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#002da5" />}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#002da5" className="mt-8" />
        ) : rooms.length > 0 ? (
          rooms.map(chat => (
            <TouchableOpacity 
              key={chat.room_id}
              onPress={() => router.push(`/chat/${chat.room_id}`)}
              className="flex-row items-center py-4 border-b border-surface-variant"
            >
              <View className="w-14 h-14 rounded-full bg-surface-container-highest items-center justify-center mr-4">
                <Ionicons name={chat.other_user_type === 'counsellor' ? "medical" : "person"} size={24} color="#1b1b20" />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-headline-md text-on-surface font-bold text-base">{chat.other_user_name}</Text>
                  <Text className="font-label-md text-on-surface-variant text-xs">{formatTime(chat.last_message_time)}</Text>
                </View>
                <Text className="font-body-md text-on-surface-variant text-sm" numberOfLines={1}>
                  {chat.last_message || 'No messages yet.'}
                </Text>
              </View>
              {chat.unread_count > 0 && (
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center ml-2">
                  <Text className="text-on-primary font-label-bold text-xs">{chat.unread_count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center py-12">
            <Text className="text-on-surface-variant text-center">No active conversations yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
