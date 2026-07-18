import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SafeModeChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [aiStatus, setAiStatus] = useState("MindEase is listening...");
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const statuses = [
      "MindEase is here with you...",
      "Breathe in... Breathe out...",
      "Take your time...",
      "I'm listening..."
    ];

    const intervalId = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setAiStatus(statuses[Math.floor(Math.random() * statuses.length)]);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-cream-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 bg-cream-bg border-b-[1.5px] border-ink-black">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container transition-colors p-2 rounded-full">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold uppercase tracking-tighter text-xl">Safe Mode</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center overflow-hidden">
            <Ionicons name="leaf" size={20} color="#1A1A1A" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Grounding Header Card */}
        <View className="bg-accent-sage p-6 md:p-8 rounded-[32px] border-[1.5px] border-ink-black mb-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="flex-row items-start gap-4">
            <View className="bg-white p-3 rounded-2xl border-[1.5px] border-ink-black">
              <Ionicons name="shield-checkmark" size={32} color="#1A1A1A" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-1">You are safe here.</Text>
              <Text className="text-on-surface-variant font-body-lg text-lg">Take a deep breath. Focus on the feeling of your feet on the floor. I'm here to listen and help you ground yourself.</Text>
            </View>
          </View>
        </View>

        {/* Chat Canvas */}
        <View className="flex-col gap-6 flex-grow pr-2">
          
          {/* Bot Message */}
          <View className="flex-col gap-2 max-w-[85%] self-start">
            <View className="bg-surface-container-lowest p-6 rounded-[28px] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" style={{ borderBottomLeftRadius: 4 }}>
              <Text className="text-body-lg md:text-2xl leading-relaxed text-ink-black text-lg">How are you feeling in your body right now? Is there any tightness in your chest or shoulders?</Text>
            </View>
            <Text className="text-label-md text-outline px-2">MindEase AI • Just now</Text>
          </View>
          
          {/* User Message */}
          <View className="flex-col gap-2 max-w-[85%] self-end items-end">
            <View className="bg-secondary-container p-6 rounded-[28px] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" style={{ borderBottomRightRadius: 4 }}>
              <Text className="text-body-lg md:text-2xl leading-relaxed font-bold text-ink-black text-lg">I'm feeling very overwhelmed. My heart is racing and I can't think straight.</Text>
            </View>
            <Text className="text-label-md text-outline px-2">You • Just now</Text>
          </View>

          {/* Bot Message: Grounding Exercise */}
          <View className="flex-col gap-2 max-w-[85%] self-start">
            <View className="bg-surface-container-lowest p-6 rounded-[28px] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" style={{ borderBottomLeftRadius: 4 }}>
              <Text className="text-body-lg md:text-2xl leading-relaxed mb-4 text-ink-black text-lg">I hear you. Let's try the 3-3-3 rule together. It can help bring your focus back to the present.</Text>
              
              <View className="flex-col gap-3">
                <View className="flex-row items-center gap-3 p-3 bg-accent-sage/30 rounded-xl border border-ink-black/10">
                  <Text className="font-bold text-primary">1.</Text>
                  <Text className="text-body-md text-ink-black">Name 3 things you can see right now.</Text>
                </View>
                <View className="flex-row items-center gap-3 p-3 bg-accent-sage/30 rounded-xl border border-ink-black/10">
                  <Text className="font-bold text-primary">2.</Text>
                  <Text className="text-body-md text-ink-black">Name 3 sounds you can hear.</Text>
                </View>
                <View className="flex-row items-center gap-3 p-3 bg-accent-sage/30 rounded-xl border border-ink-black/10">
                  <Text className="font-bold text-primary">3.</Text>
                  <Text className="text-body-md text-ink-black">Move 3 parts of your body (fingers, toes, neck).</Text>
                </View>
              </View>
            </View>
            <Text className="text-label-md text-outline px-2">MindEase AI • 1 min ago</Text>
          </View>

          {/* AI Thinking Placeholder */}
          <View className="flex-row items-center gap-2 px-2 text-on-surface-variant italic mb-6">
            <View className="flex-row gap-1">
              <View className="w-1.5 h-1.5 bg-primary rounded-full" />
              <View className="w-1.5 h-1.5 bg-primary rounded-full opacity-75" />
              <View className="w-1.5 h-1.5 bg-primary rounded-full opacity-50" />
            </View>
            <Animated.Text className="text-label-md text-on-surface-variant" style={{ opacity: fadeAnim }}>{aiStatus}</Animated.Text>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Simplified Input Shell */}
      <View className="w-full bg-white border-t-[1.5px] border-ink-black p-4 md:p-6 z-50">
        <View className="max-w-4xl mx-auto flex-col gap-4">
          
          {/* Simplified Choice Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 pb-2">
            <TouchableOpacity className="px-6 py-3 rounded-full border-[1.5px] border-ink-black bg-accent-pink shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mr-2">
              <Text className="font-label-bold text-ink-black font-bold">I need to talk</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-3 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mr-2">
              <Text className="font-label-bold text-ink-black font-bold">Guide my breathing</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-3 rounded-full border-[1.5px] border-ink-black bg-accent-orange shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mr-2">
              <Text className="font-label-bold text-ink-black font-bold">Emergency Contacts</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-6 py-3 rounded-full border-[1.5px] border-ink-black bg-white shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mr-2">
              <Text className="font-label-bold text-ink-black font-bold">Just listening</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Large Simplified Input */}
          <View className="flex-row items-center gap-3">
            <View className="flex-1 relative justify-center">
              <TextInput 
                className="w-full h-16 px-6 pr-12 bg-[#f9f8f3] rounded-[20px] border-[1.5px] border-ink-black text-xl text-ink-black focus:border-primary focus:shadow-[4px_4px_0px_0px_#1A1A1A]"
                placeholder="Type or say how you feel..."
                placeholderTextColor="#c4c5d8"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity className="absolute right-4 h-full justify-center">
                <Ionicons name="mic" size={28} color="#434655" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="w-16 h-16 bg-primary items-center justify-center rounded-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="send" size={28} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
