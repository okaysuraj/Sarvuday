import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AssignedExercisesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant md:hidden" onPress={() => router.back()}>
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed items-center justify-center overflow-hidden">
          <Ionicons name="person" size={24} color="#1A1A1A" style={{ alignSelf: 'center', marginTop: 8 }} />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Welcome Section & Summary Bento */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          <View className="flex-[2] bg-white border-[1.5px] border-ink-black rounded-[40px] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Your Mental Toolkit</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg max-w-xl">You have 4 exercises assigned for today. Consistency is key to cognitive flexibility.</Text>
            <View className="mt-6 flex-row flex-wrap gap-3">
              <View className="px-4 py-2 bg-accent-sage border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold">Daily Streak: 12 Days</Text>
              </View>
              <View className="px-4 py-2 bg-accent-pink border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold">30m Completed</Text>
              </View>
            </View>
          </View>

          <View className="flex-1 bg-secondary-fixed border-[1.5px] border-ink-black rounded-[40px] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center text-center">
            <Ionicons name="trophy" size={48} color="#1A1A1A" className="mb-2" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-1">Next Milestone</Text>
            <Text className="font-label-md text-on-secondary-fixed-variant font-bold text-center">3 sessions to reach 'Calm Master'</Text>
          </View>
        </View>

        {/* Category Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 overflow-visible">
          <View className="flex-row gap-4 px-2">
            {['All', 'CBT', 'Breathing', 'Meditation'].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity 
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full border-[1.5px] border-ink-black active:translate-x-[1px] active:translate-y-[1px] ${isActive ? 'bg-primary shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white'}`}
                >
                  <Text className={`font-label-bold font-bold ${isActive ? 'text-white' : 'text-ink-black'}`}>{tab}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>

        {/* Exercise Cards Grid */}
        <View className="flex-row flex-wrap gap-6 mb-10">
          
          {/* Card 1: CBT */}
          <TouchableOpacity className="w-full md:w-[48%] lg:w-[31%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[250px]">
            <View>
              <View className="flex-row justify-between items-start mb-6">
                <View className="px-4 py-1 bg-accent-pink border-[1.5px] border-ink-black rounded-full">
                  <Text className="font-label-bold text-ink-black font-bold text-xs">CBT</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="text-on-surface-variant font-label-md font-bold text-sm">15 min</Text>
                </View>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Thought Reframing</Text>
              <Text className="text-on-surface-variant mb-6 text-base" numberOfLines={2}>Challenge your cognitive distortions and replace them with balanced perspectives.</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Text className="font-label-bold text-xs uppercase tracking-wider text-outline font-bold">Difficulty:</Text>
                <View className="flex-row gap-1">
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-surface-variant rounded-full border-[1px] border-ink-black" />
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time" size={20} color="#002da5" />
                  <Text className="text-primary font-label-bold font-bold">Pending</Text>
                </View>
                <View className="bg-primary border-[1.5px] border-ink-black px-6 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="text-white font-label-bold font-bold">Start</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Card 2: Breathing */}
          <TouchableOpacity className="w-full md:w-[48%] lg:w-[31%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[250px]">
            <View>
              <View className="flex-row justify-between items-start mb-6">
                <View className="px-4 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-full">
                  <Text className="font-label-bold text-ink-black font-bold text-xs">Breathing</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="text-on-surface-variant font-label-md font-bold text-sm">5 min</Text>
                </View>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Box Breathing</Text>
              <Text className="text-on-surface-variant mb-6 text-base" numberOfLines={2}>A simple yet powerful technique to reset your nervous system in stressful moments.</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Text className="font-label-bold text-xs uppercase tracking-wider text-outline font-bold">Difficulty:</Text>
                <View className="flex-row gap-1">
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-surface-variant rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-surface-variant rounded-full border-[1px] border-ink-black" />
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
                  <Text className="text-[#725c00] font-label-bold font-bold">Completed</Text>
                </View>
                <View className="bg-surface-container border-[1.5px] border-ink-black px-6 py-2 rounded-xl opacity-70">
                  <Text className="text-on-surface-variant font-label-bold font-bold">Review</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Card 3: Meditation */}
          <TouchableOpacity className="w-full md:w-[48%] lg:w-[31%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[250px]">
            <View>
              <View className="flex-row justify-between items-start mb-6">
                <View className="px-4 py-1 bg-secondary-container border-[1.5px] border-ink-black rounded-full">
                  <Text className="font-label-bold text-ink-black font-bold text-xs">Meditation</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="text-on-surface-variant font-label-md font-bold text-sm">10 min</Text>
                </View>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Body Scan</Text>
              <Text className="text-on-surface-variant mb-6 text-base" numberOfLines={2}>Release physical tension by bringing mindful awareness to each part of your body.</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Text className="font-label-bold text-xs uppercase tracking-wider text-outline font-bold">Difficulty:</Text>
                <View className="flex-row gap-1">
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time" size={20} color="#002da5" />
                  <Text className="text-primary font-label-bold font-bold">Pending</Text>
                </View>
                <View className="bg-primary border-[1.5px] border-ink-black px-6 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="text-white font-label-bold font-bold">Start</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Card 4: Breathing (Active/Focused) */}
          <TouchableOpacity className="w-full md:w-[48%] lg:w-[31%] bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[250px] relative">
            <View className="absolute -top-4 -right-2 bg-secondary-container border-[1.5px] border-ink-black px-3 py-1 rounded-lg shadow-sm" style={{ transform: [{ rotate: '6deg' }] }}>
              <Text className="font-label-bold text-ink-black font-bold text-xs">MOST CALMING</Text>
            </View>
            <View>
              <View className="flex-row justify-between items-start mb-6">
                <View className="px-4 py-1 bg-white border-[1.5px] border-ink-black rounded-full">
                  <Text className="font-label-bold text-ink-black font-bold text-xs">Breathing</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="text-on-surface-variant font-label-md font-bold text-sm">8 min</Text>
                </View>
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">4-7-8 Technique</Text>
              <Text className="text-on-surface-variant mb-6 text-base" numberOfLines={2}>The natural tranquilizer for the nervous system. Best for evening winding down.</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row items-center gap-2">
                <Text className="font-label-bold text-xs uppercase tracking-wider text-outline font-bold">Difficulty:</Text>
                <View className="flex-row gap-1">
                  <View className="w-4 h-2 bg-[#725c00] rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-surface-variant rounded-full border-[1px] border-ink-black" />
                  <View className="w-4 h-2 bg-surface-variant rounded-full border-[1px] border-ink-black" />
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time" size={20} color="#002da5" />
                  <Text className="text-primary font-label-bold font-bold">Pending</Text>
                </View>
                <View className="bg-primary border-[1.5px] border-ink-black px-6 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="text-white font-label-bold font-bold">Start</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

        </View>

        {/* Weekly Progress Section */}
        <View className="bg-surface-container-highest border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Your Progress This Week</Text>
            <TouchableOpacity className="flex-row items-center gap-1 active:opacity-80 hidden md:flex">
              <Text className="font-label-bold text-primary font-bold">View Detailed Analytics</Text>
              <Ionicons name="arrow-forward" size={16} color="#002da5" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-end h-40 gap-2 md:gap-4 w-full">
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-accent-sage border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '60%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Mon</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-accent-sage border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '85%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Tue</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-secondary-container border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '100%' }} />
              <Text className="font-label-bold text-xs font-bold text-primary">Wed</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '20%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Thu</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '10%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Fri</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '0%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Sat</Text>
            </View>
            <View className="flex-col items-center flex-1 h-full justify-end">
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-lg mb-2" style={{ height: '0%' }} />
              <Text className="font-label-bold text-xs font-bold text-ink-black">Sun</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
