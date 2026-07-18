import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function ProgressReviewScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top Navigation */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm md:font-headline-md text-primary uppercase font-bold tracking-tighter text-lg">MindEase AI</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Text className="hidden md:flex font-label-bold text-on-surface-variant font-bold text-sm">Reviewing Alex Rivera</Text>
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-secondary-fixed items-center justify-center">
            <Ionicons name="person" size={20} color="#231b00" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="mb-8">
          <View className="flex-col md:flex-row md:items-end justify-between gap-6">
            <View>
              <View className="self-start bg-accent-sage border-[1px] border-ink-black px-3 py-1 rounded-full mb-4">
                <Text className="font-label-bold text-ink-black font-bold text-[10px]">MONTHLY SNAPSHOT</Text>
              </View>
              <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl">Growth & Clarity</Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black px-6 py-2 rounded-lg shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2">
                <Ionicons name="share-social" size={18} color="#ffffff" />
                <Text className="text-white font-label-bold font-bold text-sm">Share Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Bento Grid: Main Analytics */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Comparison Graph Container */}
          <View className="flex-[2] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8">
            <View className="flex-row justify-between items-start mb-8">
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Wellbeing Index</Text>
                <Text className="text-on-surface-variant font-body-md text-sm italic">+12% vs. baseline (Sept 1st)</Text>
              </View>
              <View className="flex-row gap-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-outline-variant border-[1px] border-ink-black" />
                  <Text className="font-label-bold text-ink-black font-bold text-xs">Baseline</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-primary border-[1px] border-ink-black" />
                  <Text className="font-label-bold text-ink-black font-bold text-xs">Current</Text>
                </View>
              </View>
            </View>

            {/* Visualization Placeholder */}
            <View className="relative h-[200px] w-full bg-cream-bg rounded-xl border-[1.5px] border-ink-black overflow-hidden p-4 items-center justify-center">
              <Ionicons name="stats-chart" size={60} color="#002da5" />
              <Text className="text-primary font-label-bold font-bold mt-2">Graph visualization goes here</Text>
              <View className="absolute top-[20px] right-[20px] bg-secondary-container border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] px-3 py-1 rounded-lg">
                <Text className="font-label-bold text-[#715b00] font-bold text-[10px]">Highest Clarity</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap mt-8">
              <View className="w-[50%] md:w-[25%] p-2">
                <View className="p-4 bg-accent-pink rounded-2xl border-[1.5px] border-ink-black h-full justify-center">
                  <Text className="font-label-bold text-[#663a43] font-bold uppercase text-[10px] mb-1">Sleep</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">7.2h <Text className="text-[10px] text-primary">↑</Text></Text>
                </View>
              </View>
              <View className="w-[50%] md:w-[25%] p-2">
                <View className="p-4 bg-accent-sage rounded-2xl border-[1.5px] border-ink-black h-full justify-center">
                  <Text className="font-label-bold text-ink-black font-bold uppercase text-[10px] mb-1">Mood</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Stable</Text>
                </View>
              </View>
              <View className="w-[50%] md:w-[25%] p-2">
                <View className="p-4 bg-secondary-fixed rounded-2xl border-[1.5px] border-ink-black h-full justify-center">
                  <Text className="font-label-bold text-[#564500] font-bold uppercase text-[10px] mb-1">Stress</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Low</Text>
                </View>
              </View>
              <View className="w-[50%] md:w-[25%] p-2">
                <View className="p-4 bg-accent-orange rounded-2xl border-[1.5px] border-ink-black h-full justify-center">
                  <Text className="font-label-bold text-[#93000a] font-bold uppercase text-[10px] mb-1">Focus</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">85%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* "Wins" Sticker Stack */}
          <View className="flex-1 flex-col gap-6">
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 h-full shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row items-center gap-3 mb-6">
                <View className="p-2 bg-white rounded-full border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="gift" size={20} color="#715b00" />
                </View>
                <Text className="font-headline-sm text-[#715b00] font-bold text-xl">Wins</Text>
              </View>
              <View className="flex-col gap-4">
                <View className="bg-white/50 border-[1px] border-ink-black p-4 rounded-xl flex-row items-start gap-3">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" />
                  <View className="flex-1">
                    <Text className="font-label-bold text-ink-black font-bold text-sm">Morning Streak</Text>
                    <Text className="text-xs opacity-80 text-ink-black">14 days of mindful breathing completed without gaps.</Text>
                  </View>
                </View>
                <View className="bg-white/50 border-[1px] border-ink-black p-4 rounded-xl flex-row items-start gap-3">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" />
                  <View className="flex-1">
                    <Text className="font-label-bold text-ink-black font-bold text-sm">Resting HR</Text>
                    <Text className="text-xs opacity-80 text-ink-black">Baseline improved by 5bpm since last month.</Text>
                  </View>
                </View>
                <View className="bg-white/50 border-[1px] border-ink-black p-4 rounded-xl flex-row items-start gap-3">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" />
                  <View className="flex-1">
                    <Text className="font-label-bold text-ink-black font-bold text-sm">CBT Master</Text>
                    <Text className="text-xs opacity-80 text-ink-black">Reframed 5 intrusive thoughts successfully this week.</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Areas to Focus On (Asymmetric Layout) */}
        <View className="flex-col md:flex-row gap-6 mt-6">
          <View className="flex-[1] flex-col justify-center">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Growth Areas</Text>
            <Text className="text-on-surface-variant font-body-md text-sm mb-6">Based on AI-driven analysis of your journal entries and physiological data.</Text>
            <View className="w-full h-32 rounded-3xl border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
              <Text className="font-display-lg-mobile text-primary font-bold text-2xl">AI INSIGHT</Text>
            </View>
          </View>
          <View className="flex-[2] flex-col md:flex-row gap-6">
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col justify-between">
              <View>
                <View className="flex-row items-center gap-3 mb-4">
                  <Ionicons name="moon" size={20} color="#663a43" />
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Sleep Consistency</Text>
                </View>
                <Text className="font-body-md text-[#663a43]/80 text-sm mb-6">Your bedtime varies by up to 2 hours on weekends, impacting Monday focus.</Text>
              </View>
              <View className="bg-white border-[1px] border-ink-black p-4 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold text-xs mb-1">Recommendation</Text>
                <Text className="text-xs text-ink-black">Try 'Digital Sunset' 1 hour before sleep.</Text>
              </View>
            </View>
            <View className="flex-1 bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col justify-between mt-4 md:mt-0">
              <View>
                <View className="flex-row items-center gap-3 mb-4">
                  <Ionicons name="walk" size={20} color="#93000a" />
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Physical Activity</Text>
                </View>
                <Text className="font-body-md text-[#93000a]/80 text-sm mb-6">Step count dropped 15% this week. Physical activity is your strongest mood booster.</Text>
              </View>
              <View className="bg-white border-[1px] border-ink-black p-4 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold text-xs mb-1">Recommendation</Text>
                <Text className="text-xs text-ink-black">Quick 15-min afternoon walk scheduled.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Comparative Progress Bar */}
        <View className="mt-8 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[40px] p-6 md:p-8 relative overflow-hidden">
          <View className="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed opacity-10 rounded-full -mr-16 -mt-16" />
          <View className="flex-col md:flex-row items-start md:items-center gap-8">
            <View className="md:w-1/3">
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Overall Resilience</Text>
              <Text className="text-on-surface-variant font-body-md text-sm">Your capacity to recover from stressors has improved significantly this cycle.</Text>
            </View>
            <View className="md:w-2/3 w-full">
              <View className="flex-row justify-between font-label-bold mb-3">
                <Text className="text-ink-black font-bold text-xs">Baseline (4.2/10)</Text>
                <Text className="text-primary font-bold text-xs">Current (7.8/10)</Text>
              </View>
              <View className="w-full h-8 bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden relative flex-row">
                <View className="h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '42%' }} />
                <View className="absolute top-0 left-0 h-full bg-primary opacity-80" style={{ width: '78%' }} />
                {/* Marker */}
                <View className="absolute top-0 h-full w-2 bg-ink-black" style={{ left: '77%' }} />
              </View>
              <Text className="mt-4 text-sm font-label-bold italic text-on-surface-variant font-bold">
                “You're handling daily fluctuations with 30% more emotional stability.” — AI Guide
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation Bar */}
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
