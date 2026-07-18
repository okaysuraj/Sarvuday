import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function IntakeScreen() {
  const router = useRouter();
  
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [inTherapy, setInTherapy] = useState<'yes' | 'no'>('no');

  const conditions = [
    'Anxiety',
    'Depression',
    'ADHD',
    'Bipolar Disorder',
    'PTSD',
    'None of the above'
  ];

  const toggleCondition = (condition: string) => {
    if (condition === 'None of the above') {
      setSelectedConditions(['None of the above']);
      return;
    }
    
    setSelectedConditions(prev => {
      const filtered = prev.filter(c => c !== 'None of the above');
      if (filtered.includes(condition)) {
        return filtered.filter(c => c !== condition);
      }
      return [...filtered, condition];
    });
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 rounded-xl active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl tracking-tighter">SarvUday</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Progress Bar */}
        <View className="w-full mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-label-bold text-on-surface-variant font-bold">Step 3 of 8</Text>
            <Text className="font-label-bold text-primary font-bold">History Intake</Text>
          </View>
          <View className="w-full h-3 bg-surface-container-highest rounded-full border-[1.5px] border-ink-black overflow-hidden">
            <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '37.5%' }} />
          </View>
        </View>

        {/* Intake Form Container */}
        <View className="w-full bg-surface-container-lowest rounded-[24px] border-[1.5px] border-ink-black p-6">
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4 text-center leading-tight">
            Mental Health History
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-center mb-8">
            Understanding your past helps us tailor the best support for your future. Select any that apply to you.
          </Text>

          {/* Conditions */}
          <View className="mb-8">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-4">
              Have you ever been diagnosed with any of the following?
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {conditions.map(condition => {
                const isActive = selectedConditions.includes(condition);
                return (
                  <TouchableOpacity
                    key={condition}
                    onPress={() => toggleCondition(condition)}
                    className={`px-6 py-3 rounded-full border-[1.5px] border-ink-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
                      isActive 
                        ? 'bg-primary shadow-none translate-x-[2px] translate-y-[2px]' 
                        : condition === 'None of the above' 
                          ? 'bg-surface-variant shadow-[2px_2px_0px_0px_#1A1A1A]' 
                          : 'bg-accent-sage shadow-[2px_2px_0px_0px_#1A1A1A]'
                    }`}
                  >
                    <Text className={`font-label-bold font-bold ${isActive ? 'text-white' : 'text-ink-black'}`}>
                      {condition}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Therapy Toggle */}
          <View className="bg-secondary-fixed rounded-xl p-6 border-[1.5px] border-ink-black flex-col gap-4">
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">
                Are you currently in therapy?
              </Text>
              <Text className="font-body-md text-on-secondary-fixed-variant">
                This helps us align our resources.
              </Text>
            </View>
            
            <View className="flex-row gap-2 p-1 bg-surface-container-lowest rounded-lg border-[1.5px] border-ink-black">
              <TouchableOpacity
                onPress={() => setInTherapy('yes')}
                className={`flex-1 px-6 py-3 rounded-md border-[1.5px] border-ink-black items-center transition-all ${
                  inTherapy === 'yes'
                    ? 'bg-primary shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-[#fbf8ff] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <Text className={`font-label-bold font-bold ${inTherapy === 'yes' ? 'text-white' : 'text-ink-black'}`}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setInTherapy('no')}
                className={`flex-1 px-6 py-3 rounded-md border-[1.5px] border-ink-black items-center transition-all ${
                  inTherapy === 'no'
                    ? 'bg-primary shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-[#fbf8ff] shadow-[2px_2px_0px_0px_#1A1A1A]'
                }`}
              >
                <Text className={`font-label-bold font-bold ${inTherapy === 'no' ? 'text-white' : 'text-ink-black'}`}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 w-full flex-row justify-between items-center px-6 py-4 bg-cream-bg border-t-[1.5px] border-ink-black pb-8">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-col items-center justify-center px-6 py-2 rounded-xl"
        >
          <Ionicons name="chevron-back" size={24} color="#747687" />
          <Text className="font-label-bold text-on-surface-variant font-bold">Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.back()}
          className="flex-col items-center justify-center bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] px-6 py-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
          <Text className="font-label-bold text-white font-bold">Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
