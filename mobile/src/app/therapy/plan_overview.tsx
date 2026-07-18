import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TherapyPlanOverviewScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container md:hidden">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={20} color="#1A1A1A" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="mb-8">
          <Text className="font-display-lg text-ink-black font-bold text-4xl mb-2">Therapy Plan</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg">Tracking your journey towards mental clarity and balance.</Text>
        </View>

        {/* Main Bento Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Primary Sticker Card: Anxiety Management Plan */}
          <View className="flex-[2] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[8px_8px_0px_0px_#1A1A1A] relative overflow-hidden">
            
            <View className="absolute top-6 right-6 z-10">
              <View className="bg-secondary-container px-4 py-1 rounded-full border-[1.5px] border-ink-black">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest text-xs font-bold">Active</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 mb-6">
              <View className="w-16 h-16 bg-accent-pink border-[1.5px] border-ink-black rounded-2xl items-center justify-center">
                <Ionicons name="hardware-chip" size={32} color="#1A1A1A" />
              </View>
              <View>
                <Text className="font-headline-md text-ink-black font-bold text-2xl">Anxiety Management Plan</Text>
                <Text className="text-on-surface-variant font-label-md">Current Strategy: Resilience Building</Text>
              </View>
            </View>

            <View className="flex-col sm:flex-row gap-6 mt-6">
              <View className="flex-1 flex-col gap-4">
                <View className="p-4 bg-surface-container rounded-xl border-[1.5px] border-ink-black">
                  <Text className="text-xs font-label-bold font-bold uppercase text-on-surface-variant mb-1">Frequency</Text>
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar" size={20} color="#002da5" />
                    <Text className="font-headline-sm text-ink-black font-bold text-xl">Weekly</Text>
                  </View>
                </View>
                <View className="p-4 bg-accent-sage rounded-xl border-[1.5px] border-ink-black">
                  <Text className="text-xs font-label-bold font-bold uppercase text-on-surface-variant mb-1">Primary Goal</Text>
                  <Text className="font-body-lg text-ink-black font-bold text-lg leading-tight">Reduce panic frequency by 40%</Text>
                </View>
              </View>

              <View className="flex-1 flex-col justify-between">
                <View>
                  <Text className="text-xs font-label-bold font-bold uppercase text-on-surface-variant mb-3">Goal Progress</Text>
                  <View className="w-full h-3 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden mb-2">
                    <View className="h-full bg-secondary-container border-r-[1.5px] border-ink-black" style={{ width: '65%' }} />
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="font-label-bold text-ink-black font-bold text-xs">65% Achieved</Text>
                    <Text className="font-label-bold text-ink-black font-bold text-xs">12 Weeks Remaining</Text>
                  </View>
                </View>
                
                <TouchableOpacity className="mt-4 w-full bg-primary py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
                  <Text className="font-label-bold text-white font-bold text-lg">View Detailed Roadmap</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* Side Cards */}
          <View className="flex-1 flex-col gap-6">
            
            {/* Focus Areas */}
            <View className="bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-4">Focus Areas</Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="checkmark-circle" size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black font-bold">CBT</Text>
                </View>
                <View className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="checkmark-circle" size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black font-bold">Mindfulness</Text>
                </View>
                <View className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="checkmark-circle" size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black font-bold">Somatic Healing</Text>
                </View>
              </View>
              <View className="mt-6 pt-6 border-t-[1.5px] border-ink-black/10">
                <Text className="font-body-md italic text-on-surface-variant">"Focusing on breath-work this week to manage physiological triggers."</Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="bg-primary-container border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-label-bold text-on-primary-container font-bold uppercase text-xs opacity-80">Next Session</Text>
                <Ionicons name="alarm" size={24} color="#bbc5ff" />
              </View>
              <Text className="font-headline-sm text-white font-bold text-2xl">In 2 Days</Text>
              <Text className="text-sm text-on-primary-container opacity-80 mt-1">Thursday, Oct 12 • 4:00 PM</Text>
            </View>

          </View>

        </View>

        {/* Session History */}
        <View className="mt-6 w-full">
          <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Session Highlights</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="font-label-bold text-primary font-bold text-sm">All History</Text>
                <Ionicons name="arrow-forward" size={16} color="#002da5" />
              </TouchableOpacity>
            </View>
            
            <View className="flex-col sm:flex-row gap-6">
              
              <View className="flex-1 p-6 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black">
                <Ionicons name="heart" size={24} color="#ffd9df" className="mb-2" />
                <Text className="font-label-bold text-ink-black font-bold mb-1">Emotional Regulation</Text>
                <Text className="text-sm text-on-surface-variant">Mastered 4-7-8 breathing technique during peak stress levels.</Text>
              </View>
              
              <View className="flex-1 p-6 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black">
                <Ionicons name="flash" size={24} color="#725c00" className="mb-2" />
                <Text className="font-label-bold text-ink-black font-bold mb-1">Cognitive Reframing</Text>
                <Text className="text-sm text-on-surface-variant">Successfully challenged 3 intrusive thoughts yesterday.</Text>
              </View>
              
              <View className="flex-1 p-6 bg-surface-container-low rounded-2xl border-[1.5px] border-ink-black">
                <Ionicons name="document-text" size={24} color="#002da5" className="mb-2" />
                <Text className="font-label-bold text-ink-black font-bold mb-1">Weekly Journaling</Text>
                <Text className="text-sm text-on-surface-variant">Completed 5/5 daily mood check-ins this week.</Text>
              </View>
              
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
