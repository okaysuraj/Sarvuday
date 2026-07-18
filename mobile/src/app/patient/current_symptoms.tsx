import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CurrentSymptomsSelectionScreen() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const symptoms = [
    { id: 'low_energy', label: 'Low Energy', icon: 'battery-dead' as const },
    { id: 'sleep_issues', label: 'Sleep Issues', icon: 'moon' as const },
    { id: 'anxious_thoughts', label: 'Anxious Thoughts', icon: 'help-circle' as const },
    { id: 'mood_swings', label: 'Mood Swings', icon: 'sad' as const },
    { id: 'appetite_changes', label: 'Appetite Changes', icon: 'restaurant' as const },
    { id: 'social_withdrawal', label: 'Social Withdrawal', icon: 'people' as const },
    { id: 'lack_of_focus', label: 'Lack of Focus', icon: 'scan' as const },
    { id: 'feeling_overwhelmed', label: 'Feeling Overwhelmed', icon: 'water' as const },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Progress Indicator */}
      <View className="w-full px-4 md:px-10 py-6 flex-col gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="font-label-bold text-on-surface-variant font-bold">Step 4 of 8</Text>
          <TouchableOpacity onPress={() => router.back()} className="hover:opacity-70">
            <Ionicons name="close" size={24} color="#434655" />
          </TouchableOpacity>
        </View>
        <View className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex-row border-[1.5px] border-ink-black">
          <View className="h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }} />
          <View className="h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }} />
          <View className="h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }} />
          <View className="h-full bg-secondary-fixed" style={{ width: '12.5%' }} />
        </View>
      </View>

      {/* Main Content Canvas */}
      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mb-10 text-center md:text-left items-center md:items-start">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-4 text-center md:text-left">
            What are you feeling{"\n"}right now?
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-2xl text-center md:text-left">
            Select any symptoms you've been experiencing recently. This helps us personalize your journey.
          </Text>
        </View>

        {/* Sticker Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {symptoms.map((symptom) => {
            const isActive = selectedSymptoms.includes(symptom.id);
            return (
              <TouchableOpacity
                key={symptom.id}
                onPress={() => toggleSymptom(symptom.id)}
                className={`w-[48%] md:w-[31%] lg:w-[23%] rounded-xl border-[1.5px] border-ink-black p-6 flex-col items-center justify-center gap-4 transition-all ${
                  isActive
                    ? 'bg-primary shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-white shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
              >
                <Ionicons 
                  name={symptom.icon} 
                  size={36} 
                  color={isActive ? '#ffffff' : '#002da5'} 
                />
                <Text className={`font-label-bold text-center font-bold text-base ${isActive ? 'text-white' : 'text-ink-black'}`}>
                  {symptom.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="w-full px-4 md:px-10 py-6 mt-auto bg-surface border-t-[1.5px] border-ink-black flex-row justify-between items-center sticky bottom-0 z-10">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="px-6 py-3 rounded-lg border-[1.5px] border-transparent active:bg-surface-variant">
          <Text className="font-label-bold text-ink-black font-bold text-base">Skip for now</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => router.push('/patient/dashboard')} 
          className="bg-primary px-8 py-3 rounded-lg border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Text className="text-white font-label-bold font-bold text-base">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
