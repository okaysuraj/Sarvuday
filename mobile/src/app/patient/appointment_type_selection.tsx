import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AppointmentTypeSelectionScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('video');

  const sessionTypes = [
    { id: 'video', title: 'Video Session', desc: 'Connect face-to-face with your therapist from the comfort of your home.', icon: 'videocam', bg: '#d9d9e6' },
    { id: 'audio', title: 'Audio Session', desc: 'A focused voice-only conversation, ideal for privacy or lower bandwidth.', icon: 'call', bg: '#ffdad6' },
    { id: 'inperson', title: 'In-person Session', desc: 'Visit our clinic for a traditional, face-to-face therapeutic environment.', icon: 'location', bg: '#ffd9df' },
    { id: 'chat', title: 'Chat Session', desc: 'Secure, asynchronous text messaging for ongoing support throughout the week.', icon: 'chatbubbles', bg: '#ffe082' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 border-b-[1.5px] border-ink-black bg-[#fbf8ff] sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant transition-colors">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold text-2xl">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant transition-colors">
          <Ionicons name="person-circle" size={28} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 md:py-12 max-w-7xl mx-auto w-full" contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
        
        <View className="w-full max-w-3xl items-center text-center mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-2 text-center">Choose Session Type</Text>
          <Text className="font-body-md text-on-surface-variant text-center">Select the format that best suits your needs today.</Text>
        </View>

        <View className="w-full max-w-5xl flex-row flex-wrap justify-between gap-y-6">
          {sessionTypes.map((type) => (
            <TouchableOpacity 
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className={`w-full md:w-[48%] rounded-[24px] md:rounded-[48px] border-[1.5px] border-ink-black p-8 transition-colors ${selectedType === type.id ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-white'}`}
            >
              <View className="flex-col h-full justify-between items-start">
                <View className="flex-col">
                  <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-6" style={{ backgroundColor: selectedType === type.id ? '#ffffff' : type.bg }}>
                    <Ionicons name={type.icon as any} size={28} color={selectedType === type.id ? "#002da5" : "#1A1A1A"} />
                  </View>
                  <Text className={`font-headline-sm font-bold text-2xl mb-2 ${selectedType === type.id ? 'text-white' : 'text-ink-black'}`}>{type.title}</Text>
                  <Text className={`font-body-md mb-6 ${selectedType === type.id ? 'text-[#bbc5ff]' : 'text-on-surface-variant'}`}>{type.desc}</Text>
                </View>
                
                <View className={`w-6 h-6 rounded-full border-[1.5px] border-ink-black flex items-center justify-center self-end mt-auto ${selectedType === type.id ? 'bg-white border-white' : 'border-ink-black'}`}>
                  {selectedType === type.id && <Ionicons name="checkmark" size={16} color="#002da5" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-12 w-full max-w-5xl flex-row justify-end">
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] rounded-full px-8 py-3 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
            <Text className="text-white font-label-bold font-bold">Continue Setup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
