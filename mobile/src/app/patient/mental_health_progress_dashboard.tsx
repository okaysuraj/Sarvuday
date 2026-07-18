import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

export default function MentalHealthProgressDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 bg-cream-bg border-b-[1.5px] border-ink-black">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
          <Ionicons name="menu" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">Mindful Insights</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Welcome & Overview */}
        <View className="flex-col gap-3 mt-4 mb-8">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl">Your Progress</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Here's a look at how you're doing this week.</Text>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          {/* Overall Wellness Score (Bento Main) */}
          <View className="flex-[2] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[48px] p-8 flex-col md:flex-row items-center gap-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="relative w-48 h-48 flex-shrink-0 items-center justify-center">
              <Svg className="w-full h-full absolute -rotate-90" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="#f5f2f9" strokeWidth="10" fill="transparent" />
                <Circle cx="50" cy="50" r="45" stroke="#003fdd" strokeWidth="10" fill="transparent" strokeDasharray="283" strokeDashoffset="42" strokeLinecap="round" />
              </Svg>
              <View className="absolute items-center justify-center">
                <Text className="font-display-lg-mobile text-primary font-bold text-4xl">85%</Text>
                <Text className="font-label-md text-on-surface-variant font-bold text-sm">Wellness</Text>
              </View>
            </View>
            <View className="flex-1 items-center md:items-start text-center md:text-left gap-3">
              <Text className="font-headline-md text-ink-black font-bold text-2xl">Excellent Momentum</Text>
              <Text className="font-body-md text-on-surface-variant text-base">Your consistent tracking and engagement have pushed your wellness score up by 5% since last week. Keep up the great work!</Text>
              <View className="mt-4 flex-row flex-wrap gap-2 justify-center md:justify-start">
                <View className="px-4 py-1.5 rounded-full border border-ink-black bg-primary-fixed">
                  <Text className="font-label-md text-on-primary-fixed font-bold text-xs">Mood: Stable</Text>
                </View>
                <View className="px-4 py-1.5 rounded-full border border-ink-black bg-secondary-fixed">
                  <Text className="font-label-md text-on-secondary-fixed font-bold text-xs">Sleep: Good</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Main Insight (Bento Side) */}
          <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[48px] p-8 flex-col justify-between">
            <View>
              <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center mb-4">
                <Ionicons name="bulb" size={24} color="#5a3039" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Month's Insight</Text>
              <Text className="font-body-md text-[#331019] text-base">You tend to report higher anxiety on Thursday evenings. Consider scheduling a short mindfulness session then.</Text>
            </View>
            <TouchableOpacity className="mt-6 w-full py-3 px-6 bg-surface border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Text className="text-ink-black font-label-bold font-bold">View Patterns</Text>
              <Ionicons name="arrow-forward" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

        </View>

        {/* Recent Milestones */}
        <View className="flex-col gap-6 mt-4">
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Recent Milestones</Text>
          <View className="flex-col md:flex-row gap-6">
            
            {/* Milestone 1 */}
            <View className="flex-1 bg-secondary-fixed border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col items-start gap-4">
              <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                <Ionicons name="flame" size={20} color="#725c00" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-base">7 Day Streak</Text>
                <Text className="font-body-md text-[#564500] text-sm mt-1">Logged daily check-ins for a full week.</Text>
              </View>
            </View>

            {/* Milestone 2 */}
            <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col items-start gap-4">
              <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color="#002da5" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold text-base">Completed Module</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">Finished the "Managing Work Stress" CBT exercise.</Text>
              </View>
            </View>

            {/* Milestone 3 */}
            <View className="flex-1 bg-surface border-[1.5px] border-dashed border-ink-black rounded-[24px] p-6 flex-col items-start gap-4">
              <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface-container-low items-center justify-center">
                <Ionicons name="lock-closed" size={20} color="#747687" />
              </View>
              <View>
                <Text className="font-label-bold text-outline font-bold text-base">Next: 14 Day Streak</Text>
                <Text className="font-body-md text-outline-variant text-sm mt-1">Keep checking in to unlock this milestone.</Text>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center w-16">
          <Ionicons name="home" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center w-16">
          <Ionicons name="chatbubble" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 -translate-y-2">
          <Ionicons name="stats-chart" size={24} color="#715b00" className="mb-1" />
          <Text className="font-label-md text-on-secondary-container text-[10px] font-bold">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center w-16">
          <Ionicons name="person" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
