import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CrisisScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface-container items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Urgency Banner */}
        <View className="bg-error-container border-[1.5px] border-ink-black rounded-[32px] p-6 mb-6 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="bg-[#ba1a1a] w-12 h-12 rounded-full border-[1.5px] border-ink-black items-center justify-center">
            <Ionicons name="warning" size={24} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-sm text-[#93000a] font-bold text-xl mb-1">We're here for you.</Text>
            <Text className="font-body-md text-[#93000a] opacity-90">Please take a deep breath. You are not alone.</Text>
          </View>
        </View>

        {/* Primary Actions Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          <TouchableOpacity 
            onPress={() => router.push('/crisis/emergency_contact')}
            className="flex-1 bg-accent-orange border-[1.5px] border-ink-black rounded-[48px] p-6 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <View className="bg-white w-16 h-16 rounded-full border-[1.5px] border-ink-black items-center justify-center mb-4">
              <Ionicons name="call" size={32} color="#ba1a1a" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl text-center mb-2">Call Emergency Contact</Text>
            <Text className="font-label-md text-ink-black text-center opacity-80">Connect immediately with your designated support person.</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/crisis/immediate_help')}
            className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-[48px] p-6 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <View className="bg-white w-16 h-16 rounded-full border-[1.5px] border-ink-black items-center justify-center mb-4">
              <Ionicons name="headset" size={32} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-white font-bold text-xl text-center mb-2">Get Immediate Help</Text>
            <Text className="font-label-md text-white text-center opacity-80">Chat with a trained crisis counselor right now.</Text>
          </TouchableOpacity>
        </View>

        {/* Supportive Content */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          {/* Safety Plan Card */}
          <View className="flex-[2] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">My Safety Plan</Text>
              <Ionicons name="shield-checkmark" size={24} color="#725c00" />
            </View>
            
            <View className="flex-col gap-4">
              <View className="flex-row items-start gap-3 p-4 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl">
                <Text className="font-label-bold text-primary font-bold text-lg">01</Text>
                <Text className="font-body-md text-ink-black flex-1">Walk to the kitchen and drink a glass of cold water slowly.</Text>
              </View>
              <View className="flex-row items-start gap-3 p-4 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl">
                <Text className="font-label-bold text-primary font-bold text-lg">02</Text>
                <Text className="font-body-md text-ink-black flex-1">Listen to the 'Calm Ocean' playlist in the app.</Text>
              </View>
              <View className="flex-row items-start gap-3 p-4 bg-surface-container-low border-[1.5px] border-ink-black rounded-xl opacity-50">
                <Text className="font-label-bold text-primary font-bold text-lg">03</Text>
                <Text className="font-body-md text-on-surface-variant flex-1">Focus on 5 things you can see right now.</Text>
              </View>
            </View>
          </View>

          {/* Hotlines */}
          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] justify-between">
            <View>
              <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest mb-6">Hotlines</Text>
              <View className="flex-col gap-4">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold">National Crisis Line</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">988</Text>
                </View>
                <View className="pt-4 border-t border-ink-black/20">
                  <Text className="font-label-bold text-ink-black font-bold">Text Support</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl mt-1">HOME to 741741</Text>
                </View>
              </View>
            </View>
            
            <TouchableOpacity className="mt-6 w-full py-3 bg-white border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none items-center">
              <Text className="font-label-bold text-ink-black font-bold">View More Numbers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Breathing Exercise */}
        <View className="bg-surface-container border-[1.5px] border-ink-black rounded-[32px] p-6 h-[200px] items-center justify-center overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="absolute top-4 left-4 w-12 h-12 bg-accent-pink border-[1.5px] border-ink-black rounded-full" />
          <View className="absolute bottom-4 right-8 w-16 h-4 bg-secondary-fixed border-[1.5px] border-ink-black" />
          
          <TouchableOpacity className="w-32 h-32 rounded-full bg-secondary-container border-[1.5px] border-ink-black items-center justify-center z-10 shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Text className="font-label-bold text-ink-black font-bold">Inhale</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View className="w-full bg-white border-t-[1.5px] border-ink-black flex-row justify-around items-center py-4 absolute bottom-0 z-50">
        <TouchableOpacity className="items-center px-4 py-1" onPress={() => router.push('/(tabs)')}>
          <Ionicons name="chatbubbles" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1">
          <Ionicons name="fitness" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1">
          <Ionicons name="book" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="warning" size={20} color="#715b00" />
          <Text className="text-[10px] font-bold text-[#715b00] mt-1">Crisis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
