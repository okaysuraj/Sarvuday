import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BaselineMoodAssessmentScreen() {
  const router = useRouter();
  const [mood, setMood] = useState<number>(3); // 1-5 scale, default 3 (Neutral)

  const moodOptions = [
    { value: 1, icon: 'sad-outline', label: 'Low', color: '#d9d9e6', activeColor: '#d9d9e6' },
    { value: 2, icon: 'sad', label: '', color: '#fbf8ff', activeColor: '#d9d9e6' },
    { value: 3, icon: 'happy-outline', label: 'Neutral', color: '#ffe082', activeColor: '#ffe082' },
    { value: 4, icon: 'happy', label: '', color: '#fbf8ff', activeColor: '#fdd33f' },
    { value: 5, icon: 'happy-outline', label: 'Great', color: '#fbf8ff', activeColor: '#fdd33f' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter">SarvUday</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 flex-col max-w-3xl mx-auto w-full px-4 pt-6 pb-32 items-center justify-center">
        
        {/* Progress Indicator */}
        <View className="w-full mb-12">
          <View className="flex-row justify-between items-end mb-2">
            <Text className="font-label-bold text-on-surface-variant font-bold uppercase tracking-wider text-xs">Baseline Check-in</Text>
            <Text className="font-label-bold text-ink-black font-bold text-sm">Step 5 of 8</Text>
          </View>
          <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-xl overflow-hidden">
            <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '62.5%' }} />
          </View>
        </View>

        {/* Canvas Area */}
        <View className="flex-col items-center justify-center flex-1 w-full text-center">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-6 text-center">
            How have you been feeling over the last two weeks?
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-lg mb-12 max-w-xl text-center">
            We use this to establish your baseline. Try to consider your overall mood, rather than just today.
          </Text>

          {/* Interactive Mood Assessment Container */}
          <View className="bg-white w-full p-8 border-[1.5px] border-ink-black rounded-[24px] flex-col items-center relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
            
            <View className="absolute -top-6 -left-6 w-16 h-16 bg-accent-sage rounded-full border-[1.5px] border-ink-black opacity-50 z-0" />
            <View className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent-pink transform rotate-45 border-[1.5px] border-ink-black opacity-50 z-0" />

            <View className="flex-row justify-between w-full max-w-lg mb-8 z-10">
              {moodOptions.map((option) => {
                const isSelected = mood === option.value;
                return (
                  <TouchableOpacity 
                    key={option.value}
                    onPress={() => setMood(option.value)}
                    className={`flex-col items-center gap-2 ${isSelected ? 'scale-110' : ''}`}
                  >
                    <View 
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center ${isSelected ? 'shadow-[4px_4px_0px_0px_#1A1A1A]' : ''}`}
                      style={{ backgroundColor: isSelected ? option.activeColor : option.color }}
                    >
                      <Ionicons name={option.icon as any} size={32} color="#1A1A1A" />
                    </View>
                    {option.label ? (
                      <Text className={`font-label-md ${isSelected ? 'font-bold text-ink-black' : 'text-on-surface-variant'}`}>
                        {option.label}
                      </Text>
                    ) : (
                      <Text className="font-label-md text-transparent">.</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

          </View>
        </View>

      </View>

      {/* Bottom Nav */}
      <View className="absolute bottom-0 left-0 w-full z-50 flex-row justify-between items-center px-4 md:px-10 py-6 bg-cream-bg">
        <TouchableOpacity 
          className="bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-6 py-4 flex-row items-center gap-2 active:translate-x-[2px] active:translate-y-[2px]"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
          <Text className="font-label-bold text-ink-black font-bold text-lg">Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-primary border-[1.5px] border-ink-black rounded-xl px-8 py-4 flex-row items-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Text className="font-label-bold text-white font-bold text-lg">Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
