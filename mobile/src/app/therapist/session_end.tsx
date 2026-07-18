import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function SessionEndScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg items-center justify-center p-6 relative overflow-hidden">
      {/* Pattern Overlay equivalent: Using a subtle background color since RN doesn't natively support radial-gradient background dots easily without SVGs, 
          but the cream background suffices for the Memphis aesthetic along with the bold shapes. */}
      
      {/* Decorative accent dots (Absolute positioned) */}
      <View className="absolute top-[30%] left-[20%] w-4 h-4 rounded-full bg-secondary-container border-[1.5px] border-ink-black z-0" />
      <View className="absolute top-[45%] right-[20%] w-3 h-3 rounded-full bg-accent-orange border-[1.5px] border-ink-black z-0" />
      
      {/* Large Heart Sticker */}
      <View className="mb-12 relative z-10">
        <View className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-accent-pink border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center -rotate-6">
          <Ionicons name="heart" size={64} color="#5a3039" />
        </View>
      </View>

      {/* Completion Text */}
      <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-6 text-center leading-tight max-w-[90%]">
        Well done on completing your session.
      </Text>
      
      <Text className="font-body-lg text-on-surface-variant text-lg mb-12 text-center max-w-[280px]">
        Take a moment to breathe and reflect on your progress today.
      </Text>

      {/* Action Buttons */}
      <View className="w-full max-w-sm flex-col gap-4 mt-auto mb-6 z-10">
        
        {/* Primary Button: Rate Session */}
        <TouchableOpacity className="w-full bg-primary py-4 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-row items-center justify-center gap-2">
          <Ionicons name="star" size={20} color="#ffffff" />
          <Text className="font-label-bold text-white font-bold uppercase tracking-widest text-sm">Rate Session</Text>
        </TouchableOpacity>
        
        {/* Secondary Button: See Summary */}
        <TouchableOpacity className="w-full bg-secondary-container py-4 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex-row items-center justify-center gap-2">
          <Ionicons name="document-text" size={20} color="#715b00" />
          <Text className="font-label-bold text-[#715b00] font-bold uppercase tracking-widest text-sm">See Summary</Text>
        </TouchableOpacity>
        
      </View>

      {/* Return to Dashboard */}
      <TouchableOpacity onPress={() => router.push('/therapist/dashboard')} className="mt-4 z-10 mb-8 pb-10">
        <Text className="font-label-md text-outline hover:text-ink-black underline text-sm font-bold">
          Return to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}
