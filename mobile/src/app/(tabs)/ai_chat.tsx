import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

export default function AiChatHomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleStartChat = (topic: string) => {
    router.push({
      pathname: '/chat/[id]',
      params: { id: 'ai-session', name: 'AI Companion', type: 'ai', initialTopic: topic }
    });
  };

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-background border-b border-outline">
        <View>
          <Text className="text-on-surface font-semibold text-base tracking-tight">AI Wellness Companion</Text>
          <Text className="text-on-surface-variant text-xs">Private, confidential support</Text>
        </View>
        <View className="w-8 h-8 rounded-full bg-secondary-container items-center justify-center">
          <Ionicons name="sparkles-outline" size={16} color="#2E4B3E" />
        </View>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro Card */}
        <View className="bg-surface border border-outline rounded-2xl p-6 mb-6">
          <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-2">Check-in</Text>
          <Text className="text-on-surface text-xl font-bold tracking-tight mb-2">
            Hello, {user?.name?.split(' ')[0] || 'friend'}.
          </Text>
          <Text className="text-on-surface-variant text-sm leading-relaxed">
            I'm here to listen without judgment, guide you through cognitive reframing, or provide space to unburden your mind.
          </Text>
        </View>

        {/* Conversation Starters Bento */}
        <View className="mb-6">
          <Text className="text-on-surface font-semibold text-sm mb-3">Explore Focus Areas</Text>
          
          <View className="flex-col gap-3">
            <TouchableOpacity 
              onPress={() => handleStartChat('Thought Reframing & CBT')}
              className="bg-surface border border-outline rounded-xl p-4 flex-row items-center justify-between active:bg-surface-container"
            >
              <View className="flex-row items-center gap-3.5 flex-1">
                <View className="w-10 h-10 rounded-lg bg-secondary-container items-center justify-center">
                  <Ionicons name="git-branch-outline" size={18} color="#2E4B3E" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-semibold text-sm">Thought Reframing</Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">Challenge cognitive distortions and worry cycles</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6E6D7A" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleStartChat('Grounding & Calming')}
              className="bg-surface border border-outline rounded-xl p-4 flex-row items-center justify-between active:bg-surface-container"
            >
              <View className="flex-row items-center gap-3.5 flex-1">
                <View className="w-10 h-10 rounded-lg bg-tertiary-container items-center justify-center">
                  <Ionicons name="leaf-outline" size={18} color="#204165" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-semibold text-sm">Nervous System Reset</Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">Guided 4-7-8 breathing and sensory grounding</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6E6D7A" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleStartChat('Daily Vent & Reflection')}
              className="bg-surface border border-outline rounded-xl p-4 flex-row items-center justify-between active:bg-surface-container"
            >
              <View className="flex-row items-center gap-3.5 flex-1">
                <View className="w-10 h-10 rounded-lg bg-accent-orange items-center justify-center">
                  <Ionicons name="chatbubble-ellipses-outline" size={18} color="#8F2B26" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface font-semibold text-sm">Open Journaling Space</Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">Free-form dialogue on whatever is present for you</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6E6D7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Primary Start Button */}
        <TouchableOpacity 
          onPress={() => handleStartChat('General')}
          className="w-full py-3.5 bg-primary rounded-xl items-center justify-center mb-6"
        >
          <Text className="text-white font-medium text-sm">Begin Free Session</Text>
        </TouchableOpacity>

        {/* Crisis Support Notice */}
        <View className="bg-surface-container rounded-xl p-4 border border-outline">
          <View className="flex-row items-center gap-2 mb-1">
            <Ionicons name="information-circle-outline" size={16} color="#6E6D7A" />
            <Text className="text-xs font-semibold text-on-surface">Support Notice</Text>
          </View>
          <Text className="text-[11px] text-on-surface-variant leading-relaxed">
            Sarvuday AI is designed for wellness and cognitive reflection. If you are experiencing acute distress or thoughts of harm, please dial 988 or consult emergency medical personnel immediately.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
