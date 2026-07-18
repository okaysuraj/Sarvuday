import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

export default function GoalTrackingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top Navigation Shell */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 bg-cream-bg border-b-[1.5px] border-ink-black">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary uppercase font-bold text-xl tracking-tighter">MindEase AI</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="hidden md:flex flex-row gap-6 items-center mr-4">
            <Text className="font-label-bold text-primary font-bold">Habits</Text>
            <Text className="font-label-bold text-on-surface-variant font-bold">History</Text>
            <Text className="font-label-bold text-on-surface-variant font-bold">Insights</Text>
          </View>
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={20} color="#1b1b20" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-12 max-w-7xl mx-auto w-full mb-20" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Good morning, Alex.</Text>
          <Text className="text-on-surface-variant font-body-lg text-lg">
            You're on a <Text className="font-bold text-primary">12-day streak</Text>. Keep the momentum!
          </Text>
        </View>

        {/* Main Bento Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Daily Habit List - Left Side */}
          <View className="flex-[2] flex-col gap-6">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Today's Focus</Text>
            
            {/* Habit Card 1 */}
            <View className="bg-surface-container-lowest rounded-[32px] border-[1.5px] border-ink-black p-6 md:p-8 flex-col md:flex-row items-center gap-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="relative w-24 h-24 shrink-0 items-center justify-center">
                <Svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
                  <Circle cx="50" cy="50" r="40" stroke="#efedf4" strokeWidth="10" fill="transparent" />
                  <Circle cx="50" cy="50" r="40" stroke="#002da5" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                </Svg>
                <Ionicons name="moon" size={32} color="#002da5" />
              </View>
              <View className="flex-1 items-center md:items-start">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Sleep 8 hours</Text>
                <Text className="text-on-surface-variant font-body-md text-sm mb-4">6.5h tracked so far. Almost there!</Text>
                <View className="flex-row flex-wrap gap-2 justify-center md:justify-start">
                  <View className="px-3 py-1 bg-accent-sage rounded-full border-[1.5px] border-ink-black">
                    <Text className="font-label-bold text-ink-black font-bold text-xs">Morning Rested</Text>
                  </View>
                  <View className="px-3 py-1 bg-accent-pink rounded-full border-[1.5px] border-ink-black">
                    <Text className="font-label-bold text-ink-black font-bold text-xs">Recovery</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 mt-4 md:mt-0">
                <Text className="text-[#715b00] font-label-bold font-bold">Log Rest</Text>
              </TouchableOpacity>
            </View>

            {/* Habit Card 2 */}
            <View className="bg-surface-container-lowest rounded-[32px] border-[1.5px] border-ink-black p-6 md:p-8 flex-col md:flex-row items-center gap-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="relative w-24 h-24 shrink-0 items-center justify-center">
                <Svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
                  <Circle cx="50" cy="50" r="40" stroke="#efedf4" strokeWidth="10" fill="transparent" />
                  <Circle cx="50" cy="50" r="40" stroke="#725c00" strokeWidth="10" fill="transparent" strokeDasharray="251.2" strokeDashoffset="251.2" strokeLinecap="round" />
                </Svg>
                <Ionicons name="book" size={32} color="#725c00" />
              </View>
              <View className="flex-1 items-center md:items-start">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Daily Journaling</Text>
                <Text className="text-on-surface-variant font-body-md text-sm mb-4">Take a moment to reflect on your day.</Text>
                <View className="flex-row flex-wrap gap-2 justify-center md:justify-start">
                  <View className="px-3 py-1 bg-accent-orange rounded-full border-[1.5px] border-ink-black">
                    <Text className="font-label-bold text-ink-black font-bold text-xs">Reflection</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shrink-0 mt-4 md:mt-0">
                <Text className="text-white font-label-bold font-bold">Start Entry</Text>
              </TouchableOpacity>
            </View>

            {/* Habit Card 3 (Add New) */}
            <TouchableOpacity className="bg-accent-sage/30 border-dashed border-2 border-ink-black rounded-[32px] p-8 flex-row items-center justify-center gap-4">
              <Ionicons name="add-circle" size={32} color="#434655" />
              <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider font-bold">Add New Habit</Text>
            </TouchableOpacity>

          </View>

          {/* Side Cards - Right Side */}
          <View className="flex-1 flex-col gap-6">
            
            {/* Streak Card */}
            <View className="bg-accent-orange rounded-[40px] border-[1.5px] border-ink-black p-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
              <View className="relative z-10">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Power Streak</Text>
                <View className="flex-row items-end gap-2 mb-4">
                  <Text className="text-6xl font-extrabold tracking-tighter text-ink-black">12</Text>
                  <Text className="text-xl font-bold mb-2 text-ink-black">DAYS</Text>
                </View>
                <View className="h-3 w-full bg-white/50 rounded-full border-[1.5px] border-ink-black overflow-hidden">
                  <View className="h-full bg-secondary-container w-[70%] border-r-[1.5px] border-ink-black" />
                </View>
                <Text className="mt-4 text-sm font-label-bold font-bold text-ink-black">3 days until next badge!</Text>
              </View>
              <Ionicons name="flame" size={120} color="rgba(255,255,255,0.4)" className="absolute -right-4 -bottom-4 rotate-12 z-0" style={{ position: 'absolute', right: -20, bottom: -20, transform: [{ rotate: '12deg' }] }} />
            </View>

            {/* Stickers/Badges Section */}
            <View className="bg-white rounded-[40px] border-[1.5px] border-ink-black p-8">
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Recent Stickers</Text>
              <View className="flex-row flex-wrap gap-4 justify-between">
                <View className="flex-col items-center gap-2 w-[45%]">
                  <View className="w-16 h-16 bg-secondary-container rounded-full border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                    <Ionicons name="trophy" size={28} color="#715b00" />
                  </View>
                  <Text className="text-xs font-bold text-center text-ink-black mt-2">Consistent Learner</Text>
                </View>
                <View className="flex-col items-center gap-2 w-[45%]">
                  <View className="w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                    <Ionicons name="heart" size={28} color="#5a3039" />
                  </View>
                  <Text className="text-xs font-bold text-center text-ink-black mt-2">Self-Love Pro</Text>
                </View>
                <View className="flex-col items-center gap-2 w-[45%] mt-4">
                  <View className="w-16 h-16 bg-accent-sage rounded-full border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                    <Ionicons name="leaf" size={28} color="#002da5" />
                  </View>
                  <Text className="text-xs font-bold text-center text-ink-black mt-2">Calm Master</Text>
                </View>
                <View className="flex-col items-center gap-2 w-[45%] mt-4 opacity-40">
                  <View className="w-16 h-16 bg-surface-container rounded-full border-[1.5px] border-ink-black items-center justify-center">
                    <Ionicons name="lock-closed" size={28} color="#747687" />
                  </View>
                  <Text className="text-xs font-bold text-center text-ink-black mt-2">30-Day Hero</Text>
                </View>
              </View>
            </View>

            {/* Daily Tip Card */}
            <View className="bg-primary rounded-[40px] border-[1.5px] border-ink-black p-8">
              <Ionicons name="bulb" size={24} color="#ffffff" className="mb-4" />
              <Text className="font-label-bold uppercase font-bold text-white text-xs mb-2 mt-4">Daily Insight</Text>
              <Text className="font-body-md text-white/90 leading-relaxed text-sm">
                Small, consistent habits are more effective than occasional intense efforts. You're doing great!
              </Text>
            </View>

          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation Shell (Mobile) */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface-container-lowest border-t-[1.5px] border-ink-black h-20 px-2 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="chatbubble" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] px-4 py-2 -translate-y-2">
          <Ionicons name="barbell" size={24} color="#715b00" />
          <Text className="font-label-bold text-[#715b00] font-bold text-[10px] mt-1">Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="book" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Journal</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1">
          <Ionicons name="warning" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Crisis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
