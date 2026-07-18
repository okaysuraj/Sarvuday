import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { chatApi } from '../../api/chat';
import useAuthStore from '../../store/authStore';
import { format } from 'date-fns';

export default function ChatRoomsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [rooms, setRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!user) return;
      try {
        const data = await chatApi.getRooms(user.user_id);
        setRooms(data.rooms || []);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRooms();
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <View className="w-full top-0 border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-40 bg-background">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">Messages</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
          <Ionicons name="search" size={24} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {rooms.length === 0 ? (
          <View className="items-center justify-center py-10 opacity-70">
            <Ionicons name="chatbubbles-outline" size={48} color="#1b1b20" />
            <Text className="mt-4 font-body-md text-ink-black">No messages yet.</Text>
          </View>
        ) : (
          rooms.map((room, idx) => (
            <TouchableOpacity 
              key={idx} 
              onPress={() => router.push(`/chat/${room.room_id}`)}
              className="flex-row items-center bg-surface border-[1.5px] border-ink-black rounded-2xl p-4 mb-4 shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center overflow-hidden">
                 {room.other_user_type === 'counsellor' ? (
                   <Ionicons name="medkit" size={20} color="#1b1b20" />
                 ) : (
                   <Ionicons name="person" size={20} color="#1b1b20" />
                 )}
              </View>
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-label-bold text-ink-black font-bold text-base">{room.other_user_name}</Text>
                  {room.last_message_time && (
                    <Text className="text-xs text-on-surface-variant font-label-md">
                      {format(new Date(room.last_message_time), 'MMM dd')}
                    </Text>
                  )}
                </View>
                <Text className="font-body-md text-on-surface-variant text-sm line-clamp-1" numberOfLines={1}>
                  {room.last_message || 'Start chatting...'}
                </Text>
              </View>
              {room.unread_count > 0 && (
                <View className="bg-primary border-[1.5px] border-ink-black rounded-full min-w-[24px] h-[24px] items-center justify-center px-1 ml-2">
                  <Text className="text-white text-xs font-bold">{room.unread_count}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
