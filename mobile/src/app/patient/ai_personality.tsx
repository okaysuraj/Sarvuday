import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

export default function AIPersonalityCustomizationScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState('Solar');
  const [insightFrequency, setInsightFrequency] = useState(3);
  const [selectedTone, setSelectedTone] = useState('Direct');

  const avatars = [
    { id: 'Nimbus', name: 'Nimbus', icon: 'cloud-outline' },
    { id: 'Solar', name: 'Solar', icon: 'sunny-outline' },
    { id: 'Bloom', name: 'Bloom', icon: 'leaf-outline' },
    { id: 'ZenCat', name: 'ZenCat', icon: 'paw-outline' },
  ];

  const tones = [
    { id: 'Empathetic', name: 'Empathetic', desc: 'Soft, understanding, and deeply supportive.', icon: 'heart' },
    { id: 'Direct', name: 'Direct', desc: 'Clear, actionable, and solution-oriented.', icon: 'flash' },
    { id: 'Clinical', name: 'Clinical', desc: 'Objective, precise, and evidence-based.', icon: 'medkit' },
    { id: 'Encouraging', name: 'Encouraging', desc: 'Upbeat, positive, and motivating.', icon: 'happy' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top App Bar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant/20 transition-all">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl md:text-2xl">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant/20 transition-all">
            <Ionicons name="person-circle" size={28} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 pt-8 pb-32 max-w-5xl mx-auto w-full">
        {/* Header Section */}
        <View className="mb-12">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2">Personalize Your AI Coach</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg">Shape your mental health companion to fit your journey's rhythm.</Text>
        </View>

        {/* Bento Grid Customization */}
        <View className="flex-col gap-6">
          
          <View className="flex-col md:flex-row gap-6">
            {/* Avatar Selection (Bento Large) */}
            <View className="w-full md:w-[65%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8">
              <View className="flex-row justify-between items-end mb-6">
                <View>
                  <View className="bg-accent-pink px-3 py-1 rounded-full border-[1.5px] border-ink-black mb-2 self-start">
                    <Text className="text-[#331019] font-label-bold font-bold uppercase text-[10px] tracking-wider">Visuals</Text>
                  </View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl md:text-2xl">Choose Your Avatar</Text>
                </View>
                <Text className="font-label-md text-on-surface-variant text-sm hidden sm:flex">4 options available</Text>
              </View>
              
              <View className="flex-row flex-wrap justify-between gap-y-4">
                {avatars.map((avatar) => (
                  <TouchableOpacity 
                    key={avatar.id}
                    onPress={() => setSelectedAvatar(avatar.id)}
                    className={`w-[48%] sm:w-[23%] rounded-[24px] border-[1.5px] border-ink-black p-4 flex-col items-center gap-3 relative ${selectedAvatar === avatar.id ? 'bg-secondary-container' : 'bg-[#f5f2f9] shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform'}`}
                  >
                    {selectedAvatar === avatar.id && (
                      <View className="absolute -top-2 -right-2 bg-primary p-1 rounded-full border-[1.5px] border-ink-black z-10">
                        <Ionicons name="checkmark" size={16} color="#ffffff" />
                      </View>
                    )}
                    <View className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-full items-center justify-center">
                      <Ionicons name={avatar.icon as any} size={32} color="#1A1A1A" />
                    </View>
                    <Text className="font-label-bold text-ink-black font-bold text-sm">{avatar.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Insight Frequency (Bento Small) */}
            <View className="w-full md:w-[32%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 flex-col justify-between">
              <View>
                <View className="bg-secondary-container px-3 py-1 rounded-full border-[1.5px] border-ink-black mb-2 self-start">
                  <Text className="text-[#715b00] font-label-bold font-bold uppercase text-[10px] tracking-wider">Behavior</Text>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl md:text-2xl mb-4">Insight Frequency</Text>
                <Text className="text-on-surface-variant text-body-md text-base mb-6">How often should your coach provide proactive mental health reflections?</Text>
              </View>
              <View className="flex-col gap-4">
                {/* Note: In React Native we'd use Slider component. For this layout, substituting visually */}
                <View className="w-full h-3 bg-surface-container border-[1.5px] border-ink-black rounded-full relative">
                  <View className="absolute h-6 w-6 rounded-full bg-[#fdd33f] border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] -top-1.5" style={{ left: '50%', transform: [{ translateX: -12 }] }} />
                </View>
                <View className="flex-row justify-between font-label-bold text-[10px] uppercase font-bold text-ink-black">
                  <Text>Focused</Text>
                  <Text>Balanced</Text>
                  <Text>Daily</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Voice Tone Selection (Bento Full Width) */}
          <View className="w-full bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 overflow-hidden relative">
            <View className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full -mr-20 -mt-20" />
            
            <View className="relative z-10 mb-6">
              <View className="bg-accent-sage px-3 py-1 rounded-full border-[1.5px] border-ink-black mb-2 self-start">
                <Text className="text-ink-black font-label-bold font-bold uppercase text-[10px] tracking-wider">Audio</Text>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl md:text-2xl">Select Coach Voice Tone</Text>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-6 relative z-10">
              {tones.map((tone) => (
                <TouchableOpacity 
                  key={tone.id}
                  onPress={() => setSelectedTone(tone.id)}
                  className={`w-full sm:w-[48%] lg:w-[23%] p-6 border-[1.5px] border-ink-black rounded-[24px] flex-col gap-4 ${selectedTone === tone.id ? 'bg-secondary-container' : 'bg-white shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform'}`}
                >
                  <View className="flex-row justify-between items-start">
                    <Ionicons name={tone.icon as any} size={32} color={selectedTone === tone.id ? "#715b00" : "#002da5"} />
                    <View className="w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-white items-center justify-center">
                      {selectedTone === tone.id && <View className="w-3 h-3 rounded-full bg-primary" />}
                    </View>
                  </View>
                  <View>
                    <Text className="font-headline-sm text-ink-black font-bold text-lg mb-1">{tone.name}</Text>
                    <Text className={`font-label-md text-sm ${selectedTone === tone.id ? 'text-[#715b00]' : 'text-on-surface-variant'}`}>{tone.desc}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>

        {/* Action Bar */}
        <View className="mt-12 flex-col sm:flex-row gap-6 items-center justify-between pb-20">
          <TouchableOpacity className="w-full sm:w-auto px-10 py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all items-center">
            <Text className="text-white font-headline-sm font-bold text-lg">Save Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full sm:w-auto px-8 py-4 bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-variant/20 transition-colors items-center">
            <Text className="text-on-surface font-label-bold font-bold text-sm">Reset to Default</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View className="absolute bottom-0 w-full bg-white border-t-[1.5px] border-ink-black flex-row justify-around items-center h-20 px-4">
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1 active:scale-95 transition-transform">
          <Ionicons name="chatbubbles" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] font-bold text-xs">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform" onPress={() => router.push('/patient/book_appointment')}>
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
