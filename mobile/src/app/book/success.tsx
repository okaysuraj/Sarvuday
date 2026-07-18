import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BookingSuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background justify-center p-6 relative overflow-hidden">
      {/* Background Decor (Neo-Memphis style shapes) */}
      <View className="absolute top-10 left-10 w-12 h-12 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-50" />
      <View className="absolute top-20 right-20 w-16 h-16 bg-accent-sage border-[1.5px] border-ink-black rotate-45 opacity-50" />
      <View className="absolute bottom-40 left-10 w-10 h-10 bg-secondary-container border-[1.5px] border-ink-black rotate-12 opacity-50" />
      <View className="absolute bottom-20 right-10 w-14 h-14 bg-accent-orange rounded-full border-[1.5px] border-ink-black opacity-50" />

      {/* Main Card */}
      <View className="bg-surface rounded-[32px] border-[1.5px] border-ink-black p-8 items-center text-center shadow-[0px_0px_0px_0px_#1A1A1A] z-10">
        <View className="w-24 h-24 bg-accent-sage rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Ionicons name="checkmark" size={48} color="#1b1b20" />
        </View>

        <Text className="font-headline-md text-ink-black font-bold text-3xl mb-4 text-center">You're all set!</Text>
        <Text className="font-body-lg text-on-surface-variant mb-8 text-center">
          Your session has been successfully booked. We've sent a confirmation to your email.
        </Text>

        {/* Action Buttons */}
        <View className="w-full flex-col gap-4">
          <TouchableOpacity 
            className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A]"
          >
            <Ionicons name="calendar-outline" size={20} color="#ffffff" />
            <Text className="text-white font-headline-sm font-bold text-lg">Add to Calendar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)')}
            className="w-full bg-accent-sage border-[1.5px] border-ink-black rounded-xl py-4 items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]"
          >
            <Text className="text-ink-black font-headline-sm font-bold text-lg">Return Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
