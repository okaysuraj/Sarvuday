import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function StatusScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full top-0 bg-background border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="settings" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100, alignItems: 'center' }}>
        
        {/* Status Indicator Card */}
        <View className="w-full max-w-2xl bg-surface-container-lowest rounded-[24px] border-[1.5px] border-ink-black p-8 flex-col items-center text-center relative overflow-hidden mb-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
          {/* Decorative Elements */}
          <View className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-accent-sage opacity-50 z-0" />
          <View className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-secondary-container opacity-50 z-0" />

          <View className="z-10 flex-col items-center w-full">
            <View className="flex-row items-center gap-2 bg-accent-sage px-4 py-2 rounded-full border-[1.5px] border-ink-black mb-4">
              <Ionicons name="checkmark-circle" size={20} color="#002da5" />
              <Text className="font-label-bold text-ink-black font-bold uppercase">Safe & Stable</Text>
            </View>
            
            <Text className="font-headline-md text-ink-black font-bold text-2xl mb-4 text-center">You're doing okay right now.</Text>
            
            <Text className="font-body-lg text-on-surface-variant text-center max-w-md mb-8">
              Based on our recent check-ins, your overall emotional well-being appears stable. Remember, taking things one step at a time is perfectly fine.
            </Text>

            <View className="flex-col w-full gap-4">
              <TouchableOpacity className="bg-primary px-6 py-4 rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                <Ionicons name="heart" size={24} color="#ffffff" />
                <Text className="font-label-bold text-white font-bold uppercase">Log a Mood</Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="bg-[#eae7ee] px-6 py-4 rounded-[24px] border-[1.5px] border-ink-black flex-row items-center justify-center gap-2 active:bg-surface-variant">
                <Ionicons name="book" size={24} color="#1A1A1A" />
                <Text className="font-label-bold text-ink-black font-bold uppercase">View Journal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Supportive Resources Section */}
        <View className="w-full max-w-2xl mt-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Always Here to Help</Text>
          <Text className="font-body-md text-on-surface-variant mb-6">If things start to feel overwhelming, these resources are just a tap away.</Text>
          
          <View className="flex-col gap-6">
            <TouchableOpacity className="bg-accent-pink rounded-[24px] border-[1.5px] border-ink-black p-6 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_#1A1A1A] active:shadow-none">
              <View className="w-12 h-12 rounded-full bg-background border-[1.5px] border-ink-black flex items-center justify-center mb-4">
                <Ionicons name="call" size={24} color="#ba1a1a" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Crisis Support</Text>
              <Text className="font-body-md text-on-surface-variant">Immediate, confidential help is available 24/7 if you need someone to talk to right now.</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-secondary-container rounded-[24px] border-[1.5px] border-ink-black p-6 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_#1A1A1A] active:shadow-none">
              <View className="w-12 h-12 rounded-full bg-background border-[1.5px] border-ink-black flex items-center justify-center mb-4">
                <Ionicons name="people" size={24} color="#725c00" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Reach Out</Text>
              <Text className="font-body-md text-on-surface-variant">Send a quick, pre-written message to a trusted friend or family member.</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
