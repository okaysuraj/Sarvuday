import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

export default function AiChatHomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleStartChat = (mode: string) => {
    // In a real app, this would set the context for the AI
    router.push('/chat'); // Using the existing chat interface for AI chat for now, or could create /ai_chat/conversation
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <TouchableOpacity className="p-2 rounded-xl active:bg-surface-container">
          <Ionicons name="menu" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">MindEase AI</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Welcome Section */}
        <View className="flex-col md:flex-row items-center gap-6 mb-8">
          <View className="flex-1">
            <Text className="font-display-lg-mobile text-ink-black font-bold text-3xl mb-4">
              Hi {user?.name?.split(' ')[0] || 'there'},{'\n'}I'm SarvUday.
            </Text>
            <Text className="font-body-lg text-on-surface-variant">
              I'm here to listen, support, and help you navigate your thoughts today. How are you feeling right now?
            </Text>
          </View>
          <View className="w-48 h-48 bg-accent-pink rounded-[48px] border-[1.5px] border-ink-black flex items-center justify-center p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Ionicons name="hardware-chip" size={80} color="#5a3039" />
          </View>
        </View>

        {/* Quick Start Modes */}
        <View className="mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-4">How can I help today?</Text>
          <View className="flex-col gap-4">
            
            <TouchableOpacity 
              onPress={() => handleStartChat('mood')}
              className="bg-primary border-[1.5px] border-ink-black rounded-3xl p-6 flex-col items-start shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Ionicons name="heart" size={32} color="#ffffff" className="mb-2" />
              <Text className="font-label-bold text-white font-bold text-xl mt-2">Mood Support</Text>
              <Text className="font-body-md text-white opacity-90 mt-1">I need someone to talk to about my feelings.</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleStartChat('cbt')}
              className="bg-secondary-container border-[1.5px] border-ink-black rounded-3xl p-6 flex-col items-start shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Ionicons name="construct" size={32} color="#715b00" className="mb-2" />
              <Text className="font-label-bold text-ink-black font-bold text-xl mt-2">CBT Tools</Text>
              <Text className="font-body-md text-ink-black opacity-90 mt-1">Help me reframe my negative thoughts.</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleStartChat('casual')}
              className="bg-accent-sage border-[1.5px] border-ink-black rounded-3xl p-6 flex-col items-start shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Ionicons name="chatbubbles" size={32} color="#1A1A1A" className="mb-2" />
              <Text className="font-label-bold text-ink-black font-bold text-xl mt-2">Just Talk</Text>
              <Text className="font-body-md text-ink-black opacity-90 mt-1">Open conversation, no specific goal.</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Recent Chats */}
        <View className="mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Recent Chats</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4">
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl p-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <View className="flex-row justify-between items-center mb-4">
                <View className="bg-accent-orange px-3 py-1 rounded-full border border-ink-black">
                  <Text className="font-label-md text-ink-black font-bold text-xs">Anxiety Relief</Text>
                </View>
                <Text className="font-label-md text-on-surface-variant text-xs">Yesterday</Text>
              </View>
              <Text className="font-body-md text-ink-black mb-4">"I'm feeling really overwhelmed with work lately..."</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-label-bold text-primary font-bold">Resume Chat</Text>
                <Ionicons name="arrow-forward" size={16} color="#002da5" />
              </TouchableOpacity>
            </View>

            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-2xl p-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <View className="flex-row justify-between items-center mb-4">
                <View className="bg-accent-sage px-3 py-1 rounded-full border border-ink-black">
                  <Text className="font-label-md text-ink-black font-bold text-xs">Gratitude</Text>
                </View>
                <Text className="font-label-md text-on-surface-variant text-xs">Oct 12</Text>
              </View>
              <Text className="font-body-md text-ink-black mb-4">"Let's focus on three good things that happened today."</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-label-bold text-primary font-bold">Resume Chat</Text>
                <Ionicons name="arrow-forward" size={16} color="#002da5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
