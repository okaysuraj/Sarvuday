import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function UpcomingSessionWaitingScreen() {
  const router = useRouter();
  const [checklist, setChecklist] = useState([
    { id: 'mic', label: 'Camera & Mic check', sublabel: 'Ensure permissions are granted.', checked: true },
    { id: 'quiet', label: 'Quiet space found', sublabel: 'Find a comfortable, private area.', checked: false },
    { id: 'water', label: 'Water ready', sublabel: 'Stay hydrated during the session.', checked: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      <ScrollView className="flex-1 px-4 md:px-10 py-8 md:py-12 max-w-4xl mx-auto w-full mb-10" contentContainerStyle={{ paddingBottom: 60 }}>
        
        <View className="flex-col md:flex-row gap-6">
          {/* Left Column: Therapist Profile & Countdown */}
          <View className="w-full md:w-[58%] flex-col gap-6">
            
            {/* Therapist Card */}
            <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden flex-col sm:flex-row items-center sm:items-start gap-6">
              <View className="absolute top-0 right-0 w-32 h-32 bg-accent-pink rounded-bl-full border-b-[1.5px] border-l-[1.5px] border-ink-black z-0" />
              <View className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-surface-variant z-10 items-center justify-center">
                <Ionicons name="person" size={64} color="#1A1A1A" />
              </View>
              <View className="flex-1 items-center sm:items-start z-10">
                <View className="bg-primary px-3 py-1 rounded-full border border-ink-black mb-2">
                  <Text className="text-white font-label-bold text-xs uppercase">UPCOMING SESSION</Text>
                </View>
                <Text className="font-headline-md text-ink-black font-bold text-2xl md:text-3xl mb-1 text-center sm:text-left">Dr. Sarah Jenkins</Text>
                <View className="flex-row items-center justify-center sm:justify-start gap-1">
                  <Ionicons name="medical" size={16} color="#434655" />
                  <Text className="font-body-md text-on-surface-variant text-base">Clinical Psychologist</Text>
                </View>
              </View>
            </View>

            {/* Countdown Timer */}
            <View className="bg-primary-container border-[1.5px] border-ink-black rounded-[32px] p-8 items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
              <Text className="font-headline-sm text-[#bbc5ff] font-bold text-xl mb-4 z-10">Starting in</Text>
              <Text className="font-display-lg text-white font-bold text-5xl md:text-6xl tracking-widest tabular-nums z-10">02:45</Text>
              <Text className="font-body-md text-[#bbc5ff] text-base mt-4 max-w-sm text-center z-10">Please stay on this screen. Your therapist will join shortly.</Text>
            </View>

            <TouchableOpacity className="w-full bg-white border-[1.5px] border-ink-black rounded-xl py-4 px-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2 mt-2">
              <Ionicons name="log-out-outline" size={20} color="#1A1A1A" />
              <Text className="font-label-bold text-ink-black font-bold text-sm">Leave Waiting Room</Text>
            </TouchableOpacity>

          </View>

          {/* Right Column: Preparation Checklist */}
          <View className="w-full md:w-[38%] flex-col gap-6">
            <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-1">
              <View className="flex-row items-center gap-2 mb-6 pb-4 border-b-[1.5px] border-ink-black">
                <Ionicons name="checkbox" size={24} color="#002da5" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Prep Checklist</Text>
              </View>

              <View className="flex-col gap-4">
                {checklist.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    onPress={() => toggleCheck(item.id)}
                    className="flex-row items-start gap-4 p-4 rounded-xl border-[1.5px] border-ink-black bg-[#fbf8ff] active:bg-surface-container-high"
                  >
                    <View className={`w-6 h-6 mt-1 border-[1.5px] border-ink-black rounded items-center justify-center ${item.checked ? 'bg-primary' : 'bg-white'}`}>
                      {item.checked && <Ionicons name="checkmark" size={16} color="#ffffff" />}
                    </View>
                    <View className="flex-1">
                      <Text className={`font-body-lg font-bold text-base ${item.checked ? 'text-primary' : 'text-ink-black'}`}>{item.label}</Text>
                      <Text className="font-body-md text-on-surface-variant text-sm mt-1">{item.sublabel}</Text>
                      {item.id === 'mic' && (
                        <TouchableOpacity>
                          <Text className="text-primary font-label-bold text-xs mt-2 underline">Test device settings</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

        </View>

      </ScrollView>
    </View>
  );
}
