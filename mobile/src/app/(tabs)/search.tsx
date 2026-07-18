import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TherapistSearchScreen() {
  const router = useRouter();

  const specializations = [
    { name: 'Anxiety', bg: 'bg-[#ffdad6]' },
    { name: 'Relationship', bg: 'bg-[#dde1ff]' },
    { name: 'Career', bg: 'bg-[#ffe082]' },
    { name: 'ADHD', bg: 'bg-[#d9d9e6]' },
    { name: 'Depression', bg: 'bg-[#ffd9df]' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <TouchableOpacity className="p-2 rounded-xl active:bg-surface-container">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-xl active:bg-surface-container">
          <Ionicons name="notifications" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Search Section */}
        <View className="mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-4">Find a Therapist</Text>
          <View className="flex-row gap-2">
            <View className="flex-1 relative justify-center">
              <View className="absolute left-4 z-10">
                <Ionicons name="search" size={20} color="#747687" />
              </View>
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-12 pr-4 font-body-md text-ink-black focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all"
                placeholder="Search by name or specialty..."
                placeholderTextColor="#747687"
              />
            </View>
            <TouchableOpacity className="bg-accent-sage border-[1.5px] border-ink-black rounded-xl p-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center min-w-[48px] min-h-[48px]">
              <Ionicons name="options" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Specializations */}
        <View className="mb-8 -mx-4 px-4">
          <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider mb-4">Trending Specializations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {specializations.map((spec, idx) => (
              <TouchableOpacity key={idx} className={`${spec.bg} border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-2 active:translate-x-[2px] active:translate-y-[2px]`}>
                <Text className="font-label-md text-ink-black font-bold">{spec.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Searches */}
        <View className="mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-xl mb-4">Recent Searches</Text>
          <View className="flex-row gap-2">
            <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-col gap-2">
              <View className="bg-primary-fixed w-10 h-10 rounded-full flex items-center justify-center border-[1.5px] border-ink-black">
                <Ionicons name="git-network-outline" size={20} color="#002da5" />
              </View>
              <Text className="font-label-md text-ink-black font-bold">Cognitive Behavioral</Text>
              <Text className="text-xs text-on-surface-variant">2 days ago</Text>
            </View>
            
            <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-col gap-2">
              <View className="bg-accent-orange w-10 h-10 rounded-full flex items-center justify-center border-[1.5px] border-ink-black">
                <Ionicons name="heart-outline" size={20} color="#754650" />
              </View>
              <Text className="font-label-md text-ink-black font-bold">Couples Therapy</Text>
              <Text className="text-xs text-on-surface-variant">Last week</Text>
            </View>
          </View>
        </View>

        {/* Popular Near You */}
        <View className="mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Popular Near You</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold">See All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4">
            {/* Therapist 1 */}
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col gap-4">
              <View className="absolute top-4 right-4 bg-secondary-fixed border-[1.5px] border-ink-black rounded-full px-2 py-1 flex-row items-center gap-1 z-10">
                <Ionicons name="star" size={14} color="#1A1A1A" />
                <Text className="font-label-md text-xs font-bold">4.9</Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-primary-fixed items-center justify-center">
                  <Ionicons name="person" size={32} color="#002da5" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-lg">Dr. Sarah Jenkins</Text>
                  <Text className="font-body-md text-sm text-on-surface-variant">Anxiety, Depression</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1"><Text className="text-xs font-bold text-ink-black">Accepts Insurance</Text></View>
                <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1"><Text className="text-xs font-bold text-ink-black">Virtual</Text></View>
              </View>
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-xl py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center mt-2">
                <Text className="font-label-bold text-white font-bold">View Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Therapist 2 */}
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col gap-4">
              <View className="absolute top-4 right-4 bg-secondary-fixed border-[1.5px] border-ink-black rounded-full px-2 py-1 flex-row items-center gap-1 z-10">
                <Ionicons name="star" size={14} color="#1A1A1A" />
                <Text className="font-label-md text-xs font-bold">4.8</Text>
              </View>
              <View className="flex-row gap-4 items-center">
                <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                  <Ionicons name="person" size={32} color="#1A1A1A" />
                </View>
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-lg">Dr. Marcus Cole</Text>
                  <Text className="font-body-md text-sm text-on-surface-variant">Family, ADHD</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1"><Text className="text-xs font-bold text-ink-black">In-Person</Text></View>
                <View className="bg-surface-container border-[1.5px] border-ink-black rounded-full px-3 py-1"><Text className="text-xs font-bold text-ink-black">Sliding Scale</Text></View>
              </View>
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-xl py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center mt-2">
                <Text className="font-label-bold text-white font-bold">View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
