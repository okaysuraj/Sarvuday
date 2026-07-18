import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { communityApi } from '../../api/community';
import useAuthStore from '../../store/authStore';
import { format } from 'date-fns';

export default function GroupChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchFeed();
  }, [id]);

  const fetchFeed = async () => {
    try {
      const data = await communityApi.getGroupFeed(id as string);
      setMessages(data.reverse() || []); // reverse to show oldest at top for chat UI
    } catch (error) {
      console.error('Error fetching group feed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user) return;
    
    const msgContent = newMessage.trim();
    setNewMessage('');

    // Optimistic UI update
    const tempMsg = {
      id: `temp-${Date.now()}`,
      content: msgContent,
      user_id: user.user_id,
      is_anonymous: true,
      created_at: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      await communityApi.createPost({
        content: msgContent,
        is_anonymous: true,
        has_trigger_warning: false,
        group_id: id as string
      });
      // fetchFeed(); // uncomment to refresh from server
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

  const suggestionChips = ['Great job! 👏', 'Sending support ❤️', 'I relate to this 🤝'];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-cream-bg"
    >
      {/* Header */}
      <View className="bg-surface flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-xl hover:bg-surface-variant/20">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <View>
            <Text className="font-headline-sm text-primary font-bold text-lg">Mindful Circle</Text>
            <View className="flex-row items-center gap-1">
              <View className="w-2 h-2 rounded-full bg-[#4CAF50]" />
              <Text className="font-label-md text-on-surface-variant text-xs">24 active members</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black flex items-center justify-center bg-accent-sage shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
            <Ionicons name="information-circle-outline" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity className="w-10 h-10 rounded-xl border-[1.5px] border-ink-black flex items-center justify-center bg-primary shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
            <Ionicons name="person" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        className="flex-1 px-4 pt-6" 
        contentContainerStyle={{ paddingBottom: 24, gap: 16 }}
      >
        <View className="flex-row justify-center my-2">
          <Text className="px-4 py-1 rounded-full border-[1.5px] border-ink-black bg-surface-container-low font-label-bold text-ink-black font-bold text-xs uppercase">
            Today
          </Text>
        </View>

        {messages.map((msg, idx) => {
          const isMe = msg.user_id === user?.user_id;
          
          if (isMe) {
            return (
              <View key={msg.id || idx} className="flex-col items-end gap-1 w-full max-w-[85%] self-end mb-2">
                <View className="flex-row items-center gap-2 px-2">
                  <Text className="text-[10px] text-on-surface-variant">
                    {format(new Date(msg.created_at), 'hh:mm a')}
                  </Text>
                  <Text className="font-label-bold text-ink-black font-bold">You</Text>
                </View>
                <View className="p-4 rounded-[24px] rounded-tr-sm bg-secondary-container border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="font-body-md text-ink-black">{msg.content}</Text>
                </View>
              </View>
            );
          } else {
            return (
              <View key={msg.id || idx} className="flex-col items-start gap-1 w-full max-w-[85%] mb-2">
                <View className="flex-row items-center gap-2 px-2">
                  <View className="w-6 h-6 rounded-lg bg-accent-pink border-[1.5px] border-ink-black flex items-center justify-center">
                    <Ionicons name="happy" size={14} color="#1A1A1A" />
                  </View>
                  <Text className="font-label-bold text-ink-black font-bold">Anonymous Member</Text>
                  <Text className="text-[10px] text-on-surface-variant">
                    {format(new Date(msg.created_at), 'hh:mm a')}
                  </Text>
                </View>
                <View className="p-4 rounded-[24px] rounded-tl-sm bg-surface border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="font-body-md text-ink-black">{msg.content}</Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>

      {/* Input Area */}
      <View className="bg-surface-bright px-4 py-4 border-t-[1.5px] border-ink-black flex-col gap-4 pb-safe">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 -mx-4 px-4 pb-2">
          {suggestionChips.map((chip, idx) => (
            <TouchableOpacity 
              key={idx}
              onPress={() => setNewMessage(chip)}
              className="mr-3 px-4 py-2 rounded-full border-[1.5px] border-ink-black bg-white shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Text className="font-label-bold text-ink-black font-bold">{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row items-center gap-3">
          <View className="flex-1 relative">
            <TextInput 
              className="w-full h-14 pl-4 pr-12 rounded-2xl border-[1.5px] border-ink-black bg-[#f9f8f3] font-body-md text-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] focus:shadow-[4px_4px_0px_0px_#002da5]"
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity className="absolute right-3 top-4">
              <Ionicons name="happy-outline" size={24} color="#747687" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={handleSend}
            disabled={!newMessage.trim()}
            className={`w-14 h-14 rounded-2xl border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${newMessage.trim() ? 'bg-primary' : 'bg-surface-variant'}`}
          >
            <Ionicons name="send" size={20} color={newMessage.trim() ? '#ffffff' : '#1A1A1A'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
