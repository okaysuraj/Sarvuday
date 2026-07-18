import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TherapistListScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Anxiety', 'Depression', 'Couples'];

  const therapists = [
    { id: '1', name: 'Dr. Sarah Jenkins', title: 'Clinical Psychologist', rating: '4.9', reviews: '120', tags: ['Anxiety', 'Stress', 'CBT'], nextAvail: 'Today, 3:00 PM', price: '$120', bg: '#ffe082', avatarIcon: 'person' },
    { id: '2', name: "Mark O'Connor", title: 'Couples Therapist', rating: '4.8', reviews: '85', tags: ['Relationships', 'Family'], nextAvail: 'Tomorrow, 10:00 AM', price: '$140', bg: '#d9d9e6', avatarIcon: 'people' },
    { id: '3', name: 'Elena Rostova', title: 'Mindfulness Coach', rating: '5.0', reviews: '210', tags: ['Mindfulness', 'Burnout', 'Life Transitions'], nextAvail: 'Thu, 1:00 PM', price: '$95', bg: '#ffd9df', avatarIcon: 'leaf' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 border-b-[1.5px] border-ink-black bg-[#fbf8ff] z-40 sticky top-0">
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high items-center justify-center">
          <Ionicons name="apps" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tight">MindEase</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high items-center justify-center">
          <Ionicons name="notifications" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      {/* Search & Filter Bar */}
      <View className="px-4 py-4 flex-row gap-3 bg-[#fbf8ff] border-b-[1.5px] border-ink-black z-30">
        <View className="relative flex-1 flex-row items-center">
          <Ionicons name="search" size={20} color="#747687" className="absolute left-3 z-10" />
          <TextInput 
            className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-10 pr-4 font-body-md text-ink-black"
            placeholder="Search therapists..."
            placeholderTextColor="#747687"
          />
        </View>
        <TouchableOpacity className="bg-accent-sage rounded-xl px-4 items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform">
          <Ionicons name="options" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Main Content: Therapist List */}
      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ gap: 24, paddingBottom: 100 }}>
        
        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-x-auto" contentContainerStyle={{ gap: 8 }}>
          {filters.map((filter) => (
            <TouchableOpacity 
              key={filter} 
              onPress={() => setActiveFilter(filter)}
              className={`border-[1.5px] border-ink-black rounded-full px-4 py-1.5 active:translate-y-[2px] active:shadow-none transition-transform ${activeFilter === filter ? 'bg-primary shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white'}`}
            >
              <Text className={`font-label-md text-sm whitespace-nowrap ${activeFilter === filter ? 'text-white' : 'text-on-surface'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Therapist Cards */}
        {therapists.map((therapist) => (
          <View key={therapist.id} className="border-[1.5px] border-ink-black rounded-[24px] p-6 relative overflow-hidden" style={{ backgroundColor: therapist.bg }}>
            
            <View className="flex-row gap-4 items-start mb-4">
              <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-white shrink-0 items-center justify-center">
                <Ionicons name={therapist.avatarIcon as any} size={32} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">{therapist.name}</Text>
                <View className="flex-row items-center gap-1 mb-2">
                  <Ionicons name="medkit" size={16} color="#434655" />
                  <Text className="font-label-md text-on-surface-variant text-sm">{therapist.title}</Text>
                </View>
                <View className="flex-row items-center gap-1 bg-white border-[1.5px] border-ink-black rounded-full px-2 py-0.5 self-start">
                  <Ionicons name="star" size={14} color="#725c00" />
                  <Text className="font-label-bold text-ink-black font-bold text-sm">{therapist.rating}</Text>
                  <Text className="text-outline text-xs">({therapist.reviews} reviews)</Text>
                </View>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-2 mb-4">
              {therapist.tags.map((tag) => (
                <View key={tag} className="border-[1.5px] border-ink-black bg-white rounded-full px-3 py-1">
                  <Text className="font-label-md text-ink-black text-xs">{tag}</Text>
                </View>
              ))}
            </View>

            <View className="flex-row justify-between items-end mt-4 pt-4 border-t border-ink-black">
              <View>
                <Text className="font-label-md text-on-surface-variant text-sm mb-1">Next Available</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="calendar" size={16} color="#1A1A1A" />
                  <Text className="font-body-md text-ink-black">{therapist.nextAvail}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-headline-sm text-primary font-bold text-2xl">{therapist.price}<Text className="font-body-md text-sm text-on-surface-variant font-normal">/session</Text></Text>
              </View>
            </View>

            {/* Absolute decorative element */}
            <View className={`absolute -top-4 -right-4 w-12 h-12 rounded-full border-[1.5px] border-ink-black opacity-50 z-[-1] ${therapist.id === '1' ? 'bg-accent-orange' : therapist.id === '2' ? 'bg-secondary-fixed rotate-12 -bottom-2 -left-2 top-auto right-auto rounded-sm' : 'bg-transparent'}`} />
          </View>
        ))}

      </ScrollView>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 w-full bg-[#fbf8ff] border-t-[1.5px] border-ink-black flex-row justify-around items-center h-20 px-4 z-50">
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform" onPress={() => router.push('/patient/ai_personality')}>
          <Ionicons name="chatbubbles" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-xs">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center text-primary bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:scale-95 transition-transform">
          <Ionicons name="calendar" size={24} color="#002da5" className="mb-1" />
          <Text className="font-label-bold text-primary font-bold text-xs">Meet</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center active:scale-95 transition-transform">
          <Ionicons name="person" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-xs">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
