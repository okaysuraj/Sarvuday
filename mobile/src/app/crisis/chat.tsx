import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CrisisDetectionChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-accent-pink"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Top App Bar */}
      <View className="bg-cream-bg flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 border-b-[1.5px] border-ink-black">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="arrow-back" size={28} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold uppercase tracking-tighter text-xl">MindEase AI</Text>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-white items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Critical Support Card */}
        <View className="bg-error-container border-[1.5px] border-ink-black rounded-[24px] p-6 md:p-8 flex-col items-center text-center gap-3 relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="absolute top-0 right-0 w-32 h-32 bg-error opacity-10 rounded-bl-full border-b-[1.5px] border-l-[1.5px] border-ink-black" />
          
          <Ionicons name="warning" size={48} color="#ba1a1a" />
          <Text className="font-headline-md text-on-error-container font-bold text-2xl mb-2 text-center">We're here to help you right now.</Text>
          <Text className="font-body-lg text-on-surface-variant text-base mb-4 text-center">It sounds like you're going through a really difficult time. Your safety is the most important thing right now.</Text>
          
          <View className="flex-col sm:flex-row w-full gap-3 mt-2">
            <TouchableOpacity className="flex-1 bg-error border-[1.5px] border-ink-black rounded-xl py-3 px-6 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-3 sm:mb-0">
              <Ionicons name="call" size={20} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold text-base">Call Emergency</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl py-3 px-6 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="chatbubble" size={20} color="#ba1a1a" />
              <Text className="font-label-bold text-error font-bold text-base">Text Crisis Line</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Container */}
        <View className="flex-col gap-6">
          
          {/* User Message */}
          <View className="self-end bg-white border-[1.5px] border-ink-black rounded-2xl rounded-tr-sm p-4 max-w-[85%]">
            <Text className="font-body-md text-ink-black text-base">I just can't do this anymore. Everything is too overwhelming.</Text>
          </View>

          {/* AI Message */}
          <View className="self-start bg-cream-bg border-[1.5px] border-ink-black rounded-2xl rounded-tl-sm p-6 max-w-[90%] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-8 h-8 rounded-full bg-primary-container border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="medical" size={16} color="#bbc5ff" />
              </View>
              <Text className="font-label-bold text-ink-black font-bold text-base">MindEase AI</Text>
            </View>
            
            <Text className="font-body-md text-ink-black text-base mb-4">I hear how much pain you're in right now, and I want you to know you are not alone. Feeling overwhelmed is incredibly hard, but there are people who want to support you through this exact moment.</Text>
            <Text className="font-body-md text-ink-black text-base mb-4">Would you be willing to try a small grounding exercise with me? Just focusing on your breath for 30 seconds. Or, if that feels like too much, we can just sit here together.</Text>
            
            <View className="flex-row flex-wrap gap-2 mt-4">
              <TouchableOpacity className="bg-accent-sage border-[1.5px] border-ink-black rounded-full px-4 py-2 active:bg-surface-container-high active:translate-x-[1px] active:translate-y-[1px]">
                <Text className="font-label-md text-ink-black">Try a breathing exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 active:bg-surface-container-high active:translate-x-[1px] active:translate-y-[1px] mt-2 sm:mt-0">
                <Text className="font-label-md text-ink-black">Just listen</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </ScrollView>

      {/* Chat Input Area */}
      <View className="w-full bg-cream-bg border-t-[1.5px] border-ink-black p-4 z-40 flex-row items-end gap-3 pb-8">
        <View className="flex-1 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl focus:border-primary">
          <TextInput 
            className="w-full py-3 px-4 font-body-md text-ink-black max-h-32"
            placeholder="Type a message..."
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity className="w-12 h-12 bg-primary border-[1.5px] border-ink-black rounded-xl items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
