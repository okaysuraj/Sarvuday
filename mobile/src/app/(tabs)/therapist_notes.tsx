import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TherapistNotesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Text className="hidden md:flex font-label-bold text-on-surface-variant font-bold">Session History</Text>
          <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro */}
        <View className="mb-8">
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-2">Therapist Notes</Text>
          <Text className="font-body-lg text-on-surface-variant">Review key insights and actionable homework shared by Dr. Rivera after your sessions.</Text>
        </View>

        {/* Search & Filter */}
        <View className="flex-col md:flex-row gap-4 mb-8">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <Ionicons name="search" size={20} color="#747687" />
            </View>
            <TextInput
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl py-3 pl-12 pr-4 focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all font-body-md"
              placeholder="Search insights or homework..."
              placeholderTextColor="#747687"
            />
          </View>
          <TouchableOpacity className="flex-row items-center justify-center gap-2 px-6 py-3 bg-[#ffe082] border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="filter" size={20} color="#1A1A1A" />
            <Text className="font-label-bold text-ink-black font-bold">Latest First</Text>
          </TouchableOpacity>
        </View>

        {/* Session Timeline */}
        <View className="flex-col gap-12">
          
          {/* Note 1 */}
          <View className="relative pl-8 border-l-[1.5px] border-ink-black">
            <View className="absolute -left-[9px] top-0 w-4 h-4 bg-primary border-[1.5px] border-ink-black rounded-full" />
            <View className="mb-4 self-start">
              <View className="px-3 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold uppercase text-xs">October 24, 2023</Text>
              </View>
            </View>

            <View className="flex-col md:flex-row gap-6">
              {/* Takeaways */}
              <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-row items-center gap-3 mb-4">
                  <View className="w-10 h-10 rounded-xl bg-accent-pink border-[1.5px] border-ink-black items-center justify-center">
                    <Ionicons name="bulb" size={24} color="#1A1A1A" />
                  </View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Key Takeaways</Text>
                </View>
                <View className="flex-col gap-3">
                  <View className="flex-row gap-2">
                    <Text className="text-primary font-bold">•</Text>
                    <Text className="font-body-md text-on-surface-variant flex-1">Identified "All-or-Nothing" thinking patterns during work stress.</Text>
                  </View>
                  <View className="flex-row gap-2">
                    <Text className="text-primary font-bold">•</Text>
                    <Text className="font-body-md text-on-surface-variant flex-1">Discussed the importance of micro-breaks for emotional regulation.</Text>
                  </View>
                  <View className="flex-row gap-2">
                    <Text className="text-primary font-bold">•</Text>
                    <Text className="font-body-md text-on-surface-variant flex-1">Recognized physical tension in shoulders as an early warning sign.</Text>
                  </View>
                </View>
              </View>

              {/* Homework */}
              <View className="flex-1 bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-row items-center gap-3 mb-4">
                  <View className="w-10 h-10 rounded-xl bg-white border-[1.5px] border-ink-black items-center justify-center">
                    <Ionicons name="clipboard" size={24} color="#1A1A1A" />
                  </View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Homework</Text>
                </View>
                <View className="flex-col gap-4">
                  <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4">
                    <Text className="font-label-bold text-primary uppercase font-bold mb-1">Daily Practice</Text>
                    <Text className="font-body-md text-ink-black">Complete the 'Body Scan' meditation in the app at least 3 times this week.</Text>
                  </View>
                  <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4">
                    <Text className="font-label-bold text-primary uppercase font-bold mb-1">Thought Log</Text>
                    <Text className="font-body-md text-ink-black">Record one instance where you caught yourself using 'must' or 'should' statements.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Note 2 */}
          <View className="relative pl-8 border-l-[1.5px] border-ink-black">
            <View className="absolute -left-[9px] top-0 w-4 h-4 bg-[#c4c5d8] border-[1.5px] border-ink-black rounded-full" />
            <View className="mb-4 self-start">
              <View className="px-3 py-1 bg-surface-container border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold uppercase text-xs">October 17, 2023</Text>
              </View>
            </View>
            <View className="flex-col md:flex-row gap-6">
              <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-row items-center gap-3 mb-4">
                  <View className="w-10 h-10 rounded-xl bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                    <Ionicons name="pulse" size={24} color="#1A1A1A" />
                  </View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Key Takeaways</Text>
                </View>
                <Text className="font-body-md text-on-surface-variant italic mb-4">"Progress isn't linear; some days staying still is moving forward."</Text>
                <View className="flex-col gap-3">
                  <View className="flex-row gap-2">
                    <Text className="text-primary font-bold">•</Text>
                    <Text className="font-body-md text-on-surface-variant flex-1">Explored the root of anxiety regarding social commitments.</Text>
                  </View>
                  <View className="flex-row gap-2">
                    <Text className="text-primary font-bold">•</Text>
                    <Text className="font-body-md text-on-surface-variant flex-1">Established a 'Wind-Down' routine for better sleep hygiene.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

        </View>

        {/* Recommended */}
        <View className="mt-12 mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-6">Recommended for You</Text>
          <View className="flex-col md:flex-row gap-6">
            <TouchableOpacity className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <View className="z-10">
                <View className="bg-white border-[1px] border-ink-black rounded-full px-3 py-1 mb-4 self-start">
                  <Text className="font-label-bold text-[10px] text-ink-black uppercase font-bold">Recommended Exercise</Text>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Progressive Muscle Relaxation</Text>
                <Text className="font-body-md text-on-surface-variant max-w-[80%]">A 12-minute guided session to release physical tension built up during the day.</Text>
                <View className="mt-4 flex-row items-center gap-2">
                  <Text className="text-primary font-bold">Start Session</Text>
                  <Ionicons name="arrow-forward" size={16} color="#002da5" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View className="w-full bg-white border-t-[1.5px] border-ink-black flex-row justify-around items-center py-4 absolute bottom-0 z-50">
        <TouchableOpacity className="items-center px-4 py-1" onPress={() => router.push('/(tabs)')}>
          <Ionicons name="home" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1" onPress={() => router.push('/(tabs)/community')}>
          <Ionicons name="people" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="document-text" size={20} color="#715b00" />
          <Text className="text-[10px] font-bold text-[#715b00] mt-1">Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1">
          <Ionicons name="person" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
