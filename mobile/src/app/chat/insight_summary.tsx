import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIInsightSummaryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl tracking-tighter uppercase">MindEase</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Title */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="bg-[#dde1ff] p-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="stats-chart" size={28} color="#002da5" />
            </View>
            <Text className="font-headline-md text-ink-black font-bold text-3xl">Weekly Insights</Text>
          </View>
          <View className="bg-surface-container-high px-4 py-2 rounded-full border-[1.5px] border-ink-black ml-2 shrink-0">
            <Text className="font-label-bold text-on-surface-variant font-bold text-xs">Oct 16 - Oct 22</Text>
          </View>
        </View>

        {/* Insight 1: Pattern Recognition */}
        <View className="bg-secondary-container p-6 rounded-[24px] border-[1.5px] border-ink-black flex-col md:flex-row items-start md:items-center gap-6 mb-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          
          <View className="absolute -right-8 -top-8 w-32 h-32 bg-[#ffe082] rounded-full border-[1.5px] border-ink-black opacity-50" />
          
          <View className="bg-white p-4 rounded-2xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] z-10">
            <Ionicons name="trending-up" size={32} color="#725c00" />
          </View>
          
          <View className="flex-1 z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Pattern Identified</Text>
            <Text className="font-body-lg text-ink-black">You tend to report higher levels of anxiety on <Text className="font-bold">Monday mornings</Text> compared to the rest of the week.</Text>
          </View>
          
        </View>

        {/* Suggestion Card */}
        <View className="bg-accent-pink p-6 rounded-[24px] border-[1.5px] border-ink-black mb-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          
          <View className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f4b6c1] rounded-full border-[1.5px] border-ink-black opacity-30" />
          
          <View className="z-10 mb-8">
            <View className="flex-row items-center gap-2 mb-4">
              <Ionicons name="bulb" size={24} color="#754650" />
              <Text className="font-label-bold text-[#754650] uppercase tracking-wider font-bold">Suggested Coping Strategy</Text>
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-3">Sunday Evening Wind-Down</Text>
            <Text className="font-body-md text-ink-black/80">To mitigate Monday morning stress, try implementing a 30-minute digital detox before bed on Sundays. We've prepared a specific guided breathing exercise for you.</Text>
          </View>
          
          <View className="z-10 flex-col sm:flex-row gap-4">
            <TouchableOpacity className="bg-primary px-6 py-4 rounded-xl border-[1.5px] border-ink-black flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="play-circle" size={24} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold">Start Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white px-6 py-4 rounded-xl border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Text className="font-label-bold text-ink-black font-bold">Maybe Later</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        {/* Feedback Loop Card */}
        <View className="bg-accent-sage p-6 rounded-[24px] border-[1.5px] border-ink-black mb-6 shadow-[4px_4px_0px_0px_#1A1A1A] items-center text-center">
          <View className="bg-white p-3 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] mb-4">
            <Ionicons name="chatbubbles" size={32} color="#434655" />
          </View>
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2 text-center">Was this insight helpful?</Text>
          <Text className="font-body-md text-on-surface-variant mb-6 text-center">Your feedback helps tailor future insights.</Text>
          
          <View className="flex-row gap-4 w-full">
            <TouchableOpacity className="flex-1 bg-white px-6 py-4 rounded-xl border-[1.5px] border-ink-black flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="thumbs-up" size={24} color="#002da5" />
              <Text className="font-label-bold text-ink-black font-bold">Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white px-6 py-4 rounded-xl border-[1.5px] border-ink-black flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Ionicons name="thumbs-down" size={24} color="#ba1a1a" />
              <Text className="font-label-bold text-ink-black font-bold">No</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
