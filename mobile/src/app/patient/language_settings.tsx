import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LanguageSettingsScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { id: 'english', name: 'English', native: 'Default System Language', code: 'EN', color: 'bg-accent-pink' },
    { id: 'hindi', name: 'Hindi', native: 'हिन्दी', code: 'HI', color: 'bg-accent-orange' },
    { id: 'spanish', name: 'Spanish', native: 'Español', code: 'ES', color: 'bg-accent-sage' },
    { id: 'french', name: 'French', native: 'Français', code: 'FR', color: 'bg-tertiary-fixed' },
    { id: 'german', name: 'German', native: 'Deutsch', code: 'DE', color: 'bg-secondary-fixed' },
    { id: 'japanese', name: 'Japanese', native: '日本語', code: 'JA', color: 'bg-outline-variant' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low p-2 rounded-full items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">Language</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1b1b20" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-3xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Hero Text */}
        <View className="mb-10">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Choose your preference</Text>
          <Text className="text-on-surface-variant font-body-md text-base">Select the language that makes you feel most comfortable. SarvUday adapts to your voice.</Text>
        </View>

        {/* Language Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLanguage(lang.id)}
                className={`w-[48%] bg-white rounded-[32px] border-[1.5px] border-ink-black p-6 flex-row items-center justify-between transition-all active:bg-surface-container-low ${
                  isSelected 
                    ? 'bg-secondary-container shadow-none translate-x-[2px] translate-y-[2px]' 
                    : 'shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                }`}
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-12 h-12 rounded-full border-[1.5px] border-ink-black ${lang.color} items-center justify-center`}>
                    <Text className="text-ink-black font-label-bold font-bold">{lang.code}</Text>
                  </View>
                  <View>
                    <Text className="font-headline-sm text-[18px] text-ink-black font-bold">{lang.name}</Text>
                    <Text className="font-label-md text-on-surface-variant">{lang.native}</Text>
                  </View>
                </View>
                {isSelected && (
                  <View className="bg-ink-black rounded-full w-8 h-8 items-center justify-center">
                    <Ionicons name="checkmark" size={20} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Interaction Note */}
        <View className="mt-10 p-6 border-[1.5px] border-ink-black rounded-[24px] bg-primary-fixed flex-row items-start gap-4">
          <Ionicons name="information-circle" size={24} color="#002da5" />
          <Text className="font-body-md text-primary flex-1 leading-relaxed">
            Your session will be refreshed after saving to apply the new language settings globally across all services.
          </Text>
        </View>

        {/* Action Button */}
        <View className="mt-10 flex-row justify-center">
          <TouchableOpacity 
            onPress={() => router.push('/patient/dashboard')}
            className="bg-primary px-12 py-4 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Text className="text-white font-label-bold font-bold text-lg">Save Selection</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full z-50 flex-row justify-around items-center px-4 py-2 bg-cream-bg border-t-[1.5px] border-ink-black pb-8">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="stats-chart" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl border-[1.5px] border-ink-black px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
