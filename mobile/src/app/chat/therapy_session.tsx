import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatTherapySessionScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TopAppBar */}
      <View className="bg-surface w-full top-0 border-b-[1.5px] border-ink-black flex-row justify-between items-center px-4 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-variant/20 rounded-full p-2 active:translate-x-[1px] active:translate-y-[1px]">
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <View className="flex-col items-center">
          <Text className="font-headline-md-mobile text-primary font-bold text-lg">Dr. Sarah Jenkins</Text>
          <View className="flex-row items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-secondary-fixed-dim" />
            <Text className="font-label-md text-secondary-fixed-dim">Live Session</Text>
          </View>
        </View>
        <TouchableOpacity className="hover:bg-surface-variant/20 rounded-full p-2 active:translate-x-[1px] active:translate-y-[1px]">
          <Ionicons name="person-circle" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <ScrollView className="flex-1 p-4 md:p-10 flex-col" contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* System Message */}
        <View className="flex-row justify-center my-4">
          <View className="bg-surface-variant px-4 py-1 rounded-full border border-outline-variant">
            <Text className="font-label-md text-outline">Session started at 10:00 AM</Text>
          </View>
        </View>

        {/* Message from Therapist */}
        <View className="flex-col items-start gap-1 max-w-[85%] md:max-w-[70%] mb-4">
          <Text className="font-label-bold text-on-surface-variant ml-2 font-bold">Dr. Sarah</Text>
          <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl rounded-tl-sm p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-body-md text-on-surface text-base">Hi there. It's good to connect with you today. How are you feeling this morning?</Text>
          </View>
          <Text className="font-label-md text-outline text-[12px] ml-2 mt-1">10:01 AM</Text>
        </View>

        {/* Message from User */}
        <View className="flex-col items-end gap-1 max-w-[85%] md:max-w-[70%] self-end mb-4">
          <Text className="font-label-bold text-primary ml-2 mr-2 font-bold">You</Text>
          <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-2xl rounded-tr-sm p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-body-md text-ink-black text-base">Honestly, a bit overwhelmed. Work has been piling up and I'm finding it hard to focus.</Text>
          </View>
          <Text className="font-label-md text-outline text-[12px] mr-2 mt-1">10:04 AM</Text>
        </View>

        {/* Message from Therapist */}
        <View className="flex-col items-start gap-1 max-w-[85%] md:max-w-[70%] mb-4">
          <Text className="font-label-bold text-on-surface-variant ml-2 font-bold">Dr. Sarah</Text>
          <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl rounded-tl-sm p-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-body-md text-on-surface text-base">I hear you. That feeling of being overwhelmed can definitely scatter our focus. Let's break that down a bit. What's the main task causing the most friction right now?</Text>
          </View>
          <Text className="font-label-md text-outline text-[12px] ml-2 mt-1">10:06 AM</Text>
        </View>

        {/* Typing Indicator */}
        <View className="flex-col items-start gap-1 max-w-[85%] md:max-w-[70%] mb-4">
          <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl rounded-tl-sm p-4 w-20 flex-row justify-center items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-outline" />
            <View className="w-2 h-2 rounded-full bg-outline" />
            <View className="w-2 h-2 rounded-full bg-outline" />
          </View>
        </View>

      </ScrollView>

      {/* Bottom Input Area */}
      <View className="w-full bg-surface border-t-[1.5px] border-ink-black px-4 py-4 z-50 flex-col gap-2">
        
        {/* Sticker/Quick Actions */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 pb-2">
          <TouchableOpacity className="flex-row items-center gap-1 bg-accent-pink border-[1.5px] border-ink-black rounded-full px-3 py-1 mr-2 active:bg-surface-variant">
            <Ionicons name="heart" size={18} color="#1A1A1A" />
            <Text className="font-label-md text-ink-black">Send a heart</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full px-3 py-1 mr-2 active:bg-surface-variant">
            <Ionicons name="thumbs-up" size={18} color="#1A1A1A" />
            <Text className="font-label-md text-ink-black">Got it</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-1 bg-secondary-fixed border-[1.5px] border-ink-black rounded-full px-3 py-1 mr-2 active:bg-surface-variant">
            <Ionicons name="pause" size={18} color="#1A1A1A" />
            <Text className="font-label-md text-ink-black">Need a break</Text>
          </TouchableOpacity>
        </ScrollView>

        <View className="flex-row items-end gap-2">
          <TouchableOpacity className="p-3 text-on-surface-variant active:opacity-70">
            <Ionicons name="add-circle" size={24} color="#747687" />
          </TouchableOpacity>
          <View className="flex-1 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl focus:border-primary">
            <TextInput 
              className="w-full py-3 px-4 font-body-md text-ink-black max-h-32"
              placeholder="Type a message..."
              multiline
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-xl p-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
            <Ionicons name="send" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
