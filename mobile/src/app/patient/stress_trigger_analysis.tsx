import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function StressTriggerAnalysisScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 text-primary active:bg-surface-container rounded-full items-center justify-center">
          <Ionicons name="menu" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm-mobile md:font-headline-md text-primary font-bold text-xl tracking-tight">Mindful Insights</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-dim border-[1.5px] border-ink-black overflow-hidden flex-shrink-0 items-center justify-center">
          <Ionicons name="person" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-6xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        <View className="mb-8">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Stress Triggers</Text>
          <Text className="font-body-md text-on-surface-variant max-w-2xl text-base">A breakdown of the patterns and events that most frequently impact your mental clarity.</Text>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Trigger Cloud Card */}
          <View className="flex-[2] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col">
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-row items-center gap-2">
                <Ionicons name="flash" size={24} color="#754650" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Frequent Triggers</Text>
              </View>
              <View className="px-3 py-1 bg-surface-container rounded-full border-[1.5px] border-ink-black">
                <Text className="font-label-bold text-ink-black font-bold text-xs">Last 30 Days</Text>
              </View>
            </View>

            {/* Sticker Cloud / Bar Chart Hybrid */}
            <View className="flex-1 flex-col justify-center gap-6 py-4">
              {/* Item 1 */}
              <View className="flex-row items-center gap-4">
                <Text className="w-24 font-label-bold text-ink-black font-bold text-right">Work</Text>
                <View className="flex-1 flex-row items-center gap-3">
                  <View className="h-12 bg-accent-orange border-[1.5px] border-ink-black rounded-xl" style={{ width: '85%' }} />
                  <Text className="font-body-md text-on-surface-variant text-sm">14 occurrences</Text>
                </View>
              </View>
              
              {/* Item 2 */}
              <View className="flex-row items-center gap-4">
                <Text className="w-24 font-label-bold text-ink-black font-bold text-right">Deadlines</Text>
                <View className="flex-1 flex-row items-center gap-3">
                  <View className="h-12 bg-accent-sage border-[1.5px] border-ink-black rounded-xl" style={{ width: '65%' }} />
                  <Text className="font-body-md text-on-surface-variant text-sm">9 occurrences</Text>
                </View>
              </View>

              {/* Item 3 */}
              <View className="flex-row items-center gap-4">
                <Text className="w-24 font-label-bold text-ink-black font-bold text-right">Social Events</Text>
                <View className="flex-1 flex-row items-center gap-3">
                  <View className="h-12 bg-secondary-fixed border-[1.5px] border-ink-black rounded-xl" style={{ width: '45%' }} />
                  <Text className="font-body-md text-on-surface-variant text-sm">5 occurrences</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Context Card */}
          <View className="flex-[1] bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col justify-between">
            <View>
              <View className="w-12 h-12 rounded-full bg-surface-container-lowest border-[1.5px] border-ink-black flex items-center justify-center mb-4">
                <Ionicons name="brain" size={24} color="#754650" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-3">Pattern Noticed</Text>
              <Text className="font-body-md text-ink-black text-base mb-6">You consistently report higher stress levels on Tuesday afternoons, typically coinciding with "Work" and "Deadlines".</Text>
            </View>
            <TouchableOpacity className="w-full py-3 px-4 bg-surface-container-lowest text-on-surface border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
              <Text className="font-label-bold text-ink-black font-bold">Log an Entry Now</Text>
              <Ionicons name="document-text" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

        </View>

        {/* AI Deep Dive Card */}
        <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 mt-6">
          <View className="flex-col md:flex-row gap-8 items-start">
            <View className="w-full md:w-1/3 flex-col gap-4">
              <View className="flex-row items-center gap-2 px-4 py-2 bg-primary rounded-full border-[1.5px] border-ink-black self-start">
                <Ionicons name="sparkles" size={16} color="#ffffff" />
                <Text className="font-label-bold text-white font-bold text-xs">AI Deep Dive</Text>
              </View>
              <Text className="font-headline-md text-ink-black font-bold text-2xl">Triggers & Mood</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Understanding the relationship between your environment and your emotional baseline.</Text>
            </View>
            
            <View className="w-full md:w-2/3 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 relative mt-4 md:mt-0">
              <View className="absolute -top-3 -right-3 w-8 h-8 bg-secondary-container border-[1.5px] border-ink-black rounded-full shadow-[4px_4px_0px_0px_#1A1A1A]" />
              <View className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent-orange border-[1.5px] border-ink-black rounded-lg shadow-[4px_4px_0px_0px_#1A1A1A]" style={{ transform: [{ rotate: '12deg' }] }} />
              
              <Text className="font-body-lg text-ink-black text-base mb-4 leading-relaxed">
                Based on your recent logs, <Text className="font-bold">Work-related stress</Text> acts as a primary catalyst, often leading to a secondary feeling of being overwhelmed by <Text className="font-bold">Social Events</Text> later in the week.
              </Text>
              <Text className="font-body-md text-on-surface-variant text-sm mb-6">
                When "Deadlines" are present, your reported mood dips by an average of 2 points on the 10-point scale. Proactive scheduling on Mondays might help mitigate the Tuesday spikes.
              </Text>
              
              <View className="flex-row flex-wrap gap-2">
                <View className="px-3 py-1.5 bg-surface-container rounded-full border-[1.5px] border-ink-black flex-row items-center gap-1">
                  <Ionicons name="arrow-down" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black text-xs font-bold">Mood Dip: -2.1</Text>
                </View>
                <View className="px-3 py-1.5 bg-surface-container rounded-full border-[1.5px] border-ink-black flex-row items-center gap-1">
                  <Ionicons name="time" size={16} color="#1b1b20" />
                  <Text className="font-label-md text-ink-black text-xs font-bold">Peak Time: Tuesday PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center px-2">
          <Ionicons name="home" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubble" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 -translate-y-2">
          <Ionicons name="stats-chart" size={24} color="#715b00" className="mb-1" />
          <Text className="font-label-md text-[#715b00] font-bold text-[10px]">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" className="mb-1" />
          <Text className="font-label-md text-on-surface-variant text-[10px]">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
