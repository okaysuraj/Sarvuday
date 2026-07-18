import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CustomizeAiScreen() {
  const router = useRouter();
  
  const [selectedAvatar, setSelectedAvatar] = useState('Solar');
  const [selectedTone, setSelectedTone] = useState('Direct');

  const avatars = [
    { id: 'Nimbus', icon: 'cloud', bg: 'bg-[#b8c3ff]' },
    { id: 'Solar', icon: 'sunny', bg: 'bg-[#fdd33f]' },
    { id: 'Bloom', icon: 'leaf', bg: 'bg-[#d9d9e6]' },
    { id: 'ZenCat', icon: 'paw', bg: 'bg-[#ffdad6]' },
  ];

  const tones = [
    { id: 'Empathetic', icon: 'heart', desc: 'Soft, understanding, and deeply supportive.' },
    { id: 'Direct', icon: 'flash', desc: 'Clear, actionable, and solution-oriented.' },
    { id: 'Clinical', icon: 'medkit', desc: 'Objective, precise, and evidence-based.' },
    { id: 'Encouraging', icon: 'happy', desc: 'Upbeat, positive, and motivating.' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 rounded-xl active:bg-surface-container"
        >
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black flex items-center justify-center bg-surface-variant">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Title */}
        <View className="mb-8">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-3xl mb-2">Personalize Your AI Coach</Text>
          <Text className="font-body-lg text-on-surface-variant">Shape your mental health companion to fit your journey's rhythm.</Text>
        </View>

        {/* Avatars */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 mb-6">
          <View className="flex-row justify-between items-end mb-6">
            <View>
              <View className="bg-accent-pink px-3 py-1 rounded-full border border-ink-black mb-2 self-start">
                <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">Visuals</Text>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Choose Your Avatar</Text>
            </View>
            <Text className="font-label-md text-on-surface-variant text-xs">4 options</Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {avatars.map(avatar => {
              const isActive = selectedAvatar === avatar.id;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  onPress={() => setSelectedAvatar(avatar.id)}
                  className={`w-[48%] mb-4 border-[1.5px] border-ink-black rounded-[24px] p-4 flex-col items-center gap-3 active:scale-95 transition-all ${
                    isActive ? 'bg-secondary-container' : 'bg-[#f5f2f9] shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  {isActive && (
                    <View className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full border border-ink-black z-10">
                      <Ionicons name="checkmark" size={16} color="#ffffff" />
                    </View>
                  )}
                  <View className={`w-16 h-16 border-[1.5px] border-ink-black rounded-full flex items-center justify-center ${avatar.bg}`}>
                    <Ionicons name={avatar.icon as any} size={32} color="#1A1A1A" />
                  </View>
                  <Text className="font-label-bold text-ink-black font-bold">{avatar.id}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Voice Tones */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 mb-6">
          <View className="mb-6">
            <View className="bg-accent-sage px-3 py-1 rounded-full border border-ink-black mb-2 self-start">
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">Audio</Text>
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Select Coach Voice Tone</Text>
          </View>

          <View className="flex-col gap-4">
            {tones.map(tone => {
              const isActive = selectedTone === tone.id;
              return (
                <TouchableOpacity
                  key={tone.id}
                  onPress={() => setSelectedTone(tone.id)}
                  className={`p-4 border-[1.5px] border-ink-black rounded-[24px] flex-col gap-2 ${
                    isActive ? 'bg-secondary-container' : 'bg-white shadow-[2px_2px_0px_0px_#1A1A1A]'
                  }`}
                >
                  <View className="flex-row justify-between items-start">
                    <Ionicons name={tone.icon as any} size={28} color={isActive ? "#1A1A1A" : "#002da5"} />
                    <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center">
                      {isActive && <View className="w-3 h-3 rounded-full bg-primary" />}
                    </View>
                  </View>
                  <View>
                    <Text className="font-headline-sm text-ink-black font-bold text-lg">{tone.id}</Text>
                    <Text className={`font-label-md text-xs mt-1 ${isActive ? 'text-on-secondary-container' : 'text-on-surface-variant'}`}>{tone.desc}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Actions */}
        <View className="flex-col gap-4 mb-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-full py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center"
          >
            <Text className="text-white font-headline-sm font-bold text-lg">Save Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => { setSelectedAvatar('Solar'); setSelectedTone('Direct'); }}
            className="w-full py-4 bg-white border-[1.5px] border-ink-black rounded-xl items-center"
          >
            <Text className="text-ink-black font-label-bold font-bold text-lg">Reset to Default</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
