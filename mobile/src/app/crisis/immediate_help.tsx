import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ImmediateHelpScreen() {
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
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro */}
        <View className="mb-8 items-center md:items-start">
          <View className="flex-row items-center px-4 py-2 bg-accent-pink border-[1.5px] border-ink-black rounded-full mb-4">
            <Ionicons name="warning" size={20} color="#ba1a1a" className="mr-2" />
            <Text className="font-label-bold text-ink-black font-bold uppercase ml-2">Emergency Support</Text>
          </View>
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4 text-center md:text-left">You are not alone.</Text>
          <Text className="font-body-lg text-on-surface-variant text-center md:text-left max-w-2xl">
            We're here to help you through this moment. Our team of certified clinical therapists is available 24/7 for immediate support. Please choose the way you'd like to connect.
          </Text>
        </View>

        {/* Options Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          <View className="flex-1 bg-white border-[1.5px] border-ink-black p-6 rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-16 h-16 bg-primary-fixed border-[1.5px] border-ink-black rounded-2xl items-center justify-center mb-6">
              <Ionicons name="chatbubbles" size={32} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Urgent Chat</Text>
            <Text className="font-body-md text-on-surface-variant mb-8">Connect instantly with a human therapist via secure text. Wait time is currently under 2 minutes.</Text>
            
            <TouchableOpacity className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto">
              <Text className="font-label-bold text-white font-bold uppercase tracking-widest">Start Urgent Chat</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black p-6 rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-2xl items-center justify-center mb-6">
              <Ionicons name="call" size={32} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Immediate Callback</Text>
            <Text className="font-body-md text-on-surface-variant mb-8">Enter your number and a therapist will call you back immediately. Completely confidential and free.</Text>
            
            <TouchableOpacity className="w-full bg-white border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto">
              <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest">Request Callback</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* Alternative Resources */}
        <View className="bg-surface-container-high p-8 rounded-[48px] border-[2px] border-dashed border-ink-black mb-8 flex-col md:flex-row items-center gap-6">
          <View className="flex-1">
            <Text className="font-label-bold text-on-surface-variant font-bold uppercase mb-2">International Helplines</Text>
            <Text className="font-body-md text-ink-black mb-4">If you are in immediate physical danger, please contact your local emergency services or call these verified hotlines.</Text>
            
            <View className="flex-row flex-wrap gap-4">
              <View className="px-4 py-2 bg-white rounded-full border-[1.5px] border-ink-black flex-row items-center">
                <Text className="font-label-bold font-bold mr-2">US:</Text>
                <Text className="text-primary font-bold">988</Text>
              </View>
              <View className="px-4 py-2 bg-white rounded-full border-[1.5px] border-ink-black flex-row items-center">
                <Text className="font-label-bold font-bold mr-2">UK:</Text>
                <Text className="text-primary font-bold">111</Text>
              </View>
              <View className="px-4 py-2 bg-white rounded-full border-[1.5px] border-ink-black flex-row items-center">
                <Text className="font-label-bold font-bold mr-2">CAN:</Text>
                <Text className="text-primary font-bold">9-8-8</Text>
              </View>
            </View>
          </View>

          <View className="w-32 h-32 relative">
            <View className="absolute inset-0 bg-accent-orange rounded-full border-[1.5px] border-ink-black rotate-3" />
            <View className="absolute inset-0 bg-white rounded-full border-[1.5px] border-ink-black -rotate-3 items-center justify-center p-4">
              <Ionicons name="heart" size={48} color="#ba1a1a" />
            </View>
          </View>
        </View>

        {/* Safety Plan Reminder */}
        <View className="bg-accent-pink p-6 rounded-[32px] border-[1.5px] border-ink-black relative overflow-hidden">
          <View className="relative z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Remember your Safety Plan</Text>
            <Text className="font-body-md text-[#5a3039] mb-4">You created a plan last Tuesday. Looking at it now might help ground you while you wait.</Text>
            
            <TouchableOpacity className="flex-row items-center">
              <Text className="font-label-bold text-ink-black font-bold underline">View My Safety Plan</Text>
              <Ionicons name="arrow-forward" size={16} color="#1A1A1A" className="ml-1" />
            </TouchableOpacity>
          </View>
          
          <View className="absolute -bottom-4 -right-4 opacity-10">
            <Ionicons name="shield" size={120} color="#1A1A1A" />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
