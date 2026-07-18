import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function TodayMoodSnapshotScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-40 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0 h-[72px]">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-high transition-colors items-center justify-center">
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-ink-black font-bold tracking-tight text-xl absolute left-1/2 -translate-x-[60px]">
          Today's Snapshot
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="text-center items-center mt-4 mb-8">
          <Text className="font-label-bold text-on-surface-variant font-bold uppercase text-xs mb-2">Tuesday, Oct 24</Text>
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl">You're feeling <Text className="text-primary-container">Optimistic</Text></Text>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Mood Ring Card */}
          <View className="flex-[7] bg-primary-fixed border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col items-center justify-center min-h-[400px]">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6 self-start">Energy Distribution</Text>
            
            <View className="relative w-[240px] h-[240px] items-center justify-center">
              <Svg className="w-full h-full absolute -rotate-90" viewBox="0 0 160 160">
                <Circle cx="80" cy="80" r="70" stroke="#dbd9e0" strokeWidth="24" fill="transparent" />
                <Circle cx="80" cy="80" r="70" stroke="#fdd33f" strokeWidth="24" fill="transparent" strokeDasharray="440" strokeDashoffset="120" strokeLinecap="round" />
                <Circle cx="80" cy="80" r="70" stroke="#ffd9df" strokeWidth="24" fill="transparent" strokeDasharray="440" strokeDashoffset="280" strokeLinecap="round" />
                <Circle cx="80" cy="80" r="70" stroke="#d9d9e6" strokeWidth="24" fill="transparent" strokeDasharray="440" strokeDashoffset="380" strokeLinecap="round" />
              </Svg>
              <View className="absolute items-center justify-center">
                <Ionicons name="sunny" size={48} color="#003fdd" className="mb-2" />
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">High</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap justify-center gap-4 mt-8">
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-secondary-container border border-ink-black" />
                <Text className="font-label-md text-on-surface-variant font-bold text-xs">Calm (60%)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-accent-pink border border-ink-black" />
                <Text className="font-label-md text-on-surface-variant font-bold text-xs">Focus (25%)</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-3 h-3 rounded-full bg-accent-sage border border-ink-black" />
                <Text className="font-label-md text-on-surface-variant font-bold text-xs">Stress (15%)</Text>
              </View>
            </View>
          </View>

          {/* Right Column */}
          <View className="flex-[5] flex-col gap-6">
            
            {/* Contributing Factors */}
            <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col">
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Main Influences</Text>
              <View className="flex-col gap-3">
                <View className="flex-row items-center justify-between p-3 bg-surface rounded-xl border-[1.5px] border-ink-black">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center border border-ink-black">
                      <Ionicons name="briefcase" size={20} color="#1A1A1A" />
                    </View>
                    <Text className="font-body-md text-ink-black font-semibold text-base">Deep Work</Text>
                  </View>
                  <Ionicons name="arrow-up" size={20} color="#003fdd" />
                </View>

                <View className="flex-row items-center justify-between p-3 bg-surface rounded-xl border-[1.5px] border-ink-black">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-accent-pink flex items-center justify-center border border-ink-black">
                      <Ionicons name="moon" size={20} color="#1A1A1A" />
                    </View>
                    <Text className="font-body-md text-ink-black font-semibold text-base">Restless Sleep</Text>
                  </View>
                  <Ionicons name="arrow-down" size={20} color="#ba1a1a" />
                </View>

                <View className="flex-row items-center justify-between p-3 bg-surface rounded-xl border-[1.5px] border-ink-black">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center border border-ink-black">
                      <Ionicons name="people" size={20} color="#1A1A1A" />
                    </View>
                    <Text className="font-body-md text-ink-black font-semibold text-base">Lunch with Team</Text>
                  </View>
                  <Ionicons name="arrow-up" size={20} color="#003fdd" />
                </View>
              </View>
            </View>

            {/* Daily Note */}
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col">
              <View className="flex-row justify-between items-start mb-4">
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Note to Self</Text>
                <TouchableOpacity>
                  <Ionicons name="pencil" size={20} color="#434655" />
                </TouchableOpacity>
              </View>
              <Text className="font-body-lg text-ink-black italic text-base leading-relaxed">
                "Felt a bit groggy this morning, but getting outside for a 15-minute walk before the big presentation really helped center my thoughts. Need to remember to prioritize that tomorrow."
              </Text>
              <View className="flex-row flex-wrap gap-2 mt-4">
                <View className="border border-ink-black rounded-full px-3 py-1 bg-surface">
                  <Text className="font-label-md text-ink-black font-bold text-xs">#morningwalk</Text>
                </View>
                <View className="border border-ink-black rounded-full px-3 py-1 bg-surface">
                  <Text className="font-label-md text-ink-black font-bold text-xs">#presentation</Text>
                </View>
              </View>
            </View>

          </View>
        </View>

        {/* Action Button */}
        <View className="mt-8 items-center">
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black py-4 px-8 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2 w-full md:w-auto">
            <Ionicons name="add-circle" size={24} color="#ffffff" />
            <Text className="font-headline-sm text-white font-bold text-lg">Log Another Entry</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
