import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const moodLabels = {
  1: "Very Low",
  2: "A Bit Down",
  3: "Okay",
  4: "Feeling Good",
  5: "Excellent!"
};

export default function MoodCheckInScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<1|2|3|4|5>(3);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top App Bar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-10 bg-cream-bg border-b-[1.5px] border-ink-black">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full border-[1.5px] border-ink-black active:bg-surface-variant">
          <Ionicons name="close" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm-mobile md:font-headline-sm text-ink-black font-bold tracking-tighter text-xl">Check-in</Text>
        <View className="w-10 h-10" />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 w-full" contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingBottom: 100 }}>
        
        {/* Background decorative elements (can't easily do absolute positioning outside scrollview in same way, but keeping it simple) */}
        
        <View className="w-full max-w-2xl bg-surface-container-lowest border-[1.5px] border-ink-black rounded-3xl p-8 flex-col items-center text-center gap-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
          
          {/* Graphic/Animation Header */}
          <View className="w-32 h-32 mb-4 relative items-center justify-center bg-secondary-container rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Ionicons name="heart" size={60} color="#1A1A1A" />
          </View>

          {/* Typography */}
          <View className="items-center mb-6">
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2 text-center">How are you feeling?</Text>
            <Text className="font-body-lg text-outline text-lg text-center max-w-md">Take a moment to check in with yourself. Your feelings are valid.</Text>
          </View>

          {/* Mood Selector */}
          <View className="flex-row justify-between w-full max-w-md px-4 gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((moodValue) => {
              const isSelected = selectedMood === moodValue;
              const emojis = { 1: '😞', 2: '😕', 3: '😐', 4: '🙂', 5: '😁' };
              return (
                <TouchableOpacity 
                  key={moodValue}
                  onPress={() => setSelectedMood(moodValue as 1|2|3|4|5)}
                  className={`flex-col items-center justify-center p-3 rounded-2xl border-[1.5px] w-14 h-16 md:w-16 md:h-20 ${isSelected ? 'bg-secondary-container border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] scale-105' : 'border-transparent opacity-70 scale-95'}`}
                >
                  <Text className="text-3xl mb-1">{emojis[moodValue as keyof typeof emojis]}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Mood Label Display */}
          <Text className="h-8 font-label-bold text-ink-black font-bold tracking-widest uppercase text-sm mb-6">{moodLabels[selectedMood]}</Text>

          {/* Action Button */}
          <TouchableOpacity 
            onPress={() => router.replace('/patient/dashboard')} // Or next step
            className="w-full md:w-auto bg-primary border-[1.5px] border-ink-black py-4 px-8 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
          >
            <Text className="text-white font-label-bold font-bold text-base">Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
