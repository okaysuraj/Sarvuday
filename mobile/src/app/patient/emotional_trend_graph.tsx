import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function EmotionalTrendGraphScreen() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-40 bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant/20">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold tracking-tighter text-xl">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant/20">
          <Ionicons name="settings-outline" size={24} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-6">
          <View>
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl mb-1">Mood Trends</Text>
            <Text className="font-body-md text-on-surface-variant text-base">Your emotional landscape over time.</Text>
          </View>
          
          {/* Time Toggle */}
          <View className="flex-row bg-surface-container-highest rounded-full p-1 border-[1.5px] border-ink-black">
            <TouchableOpacity 
              onPress={() => setTimeRange('week')}
              className={`px-4 py-2 rounded-full ${timeRange === 'week' ? 'bg-primary shadow-[2px_2px_0px_0px_#1A1A1A] border-[1.5px] border-ink-black' : ''}`}
            >
              <Text className={`font-label-bold font-bold ${timeRange === 'week' ? 'text-white' : 'text-on-surface-variant'}`}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setTimeRange('month')}
              className={`px-4 py-2 rounded-full ${timeRange === 'month' ? 'bg-primary shadow-[2px_2px_0px_0px_#1A1A1A] border-[1.5px] border-ink-black' : ''}`}
            >
              <Text className={`font-label-bold font-bold ${timeRange === 'month' ? 'text-white' : 'text-on-surface-variant'}`}>Month</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Graph Card */}
        <View className="bg-surface-container-lowest rounded-[24px] border-[1.5px] border-ink-black p-4 md:p-8 mb-6 overflow-hidden">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">This Week</Text>
            <View className="bg-secondary-container border-[1.5px] border-ink-black px-3 py-1 rounded-full">
              <Text className="font-label-bold text-ink-black font-bold text-[12px]">Mostly Positive</Text>
            </View>
          </View>

          {/* Faux Graph Area */}
          <View className="h-64 w-full relative mb-4 flex-row items-end justify-between px-2">
            {/* SVG Line Graph */}
            <View className="absolute inset-0 h-full w-full opacity-30 pt-10" pointerEvents="none">
              <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <Path 
                  d="M0,80 Q10,70 20,40 T40,60 T60,20 T80,50 T100,30" 
                  fill="none" 
                  stroke="#002da5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                />
              </Svg>
            </View>

            {/* Data Points */}
            <View className="flex-col items-center justify-end h-full" style={{ height: '20%' }}>
              <View className="w-4 h-4 bg-primary rounded-full border-[1.5px] border-ink-black mb-2" />
              <Text className="font-label-md text-outline">M</Text>
            </View>
            <View className="flex-col items-center justify-end h-full" style={{ height: '60%' }}>
              <View className="w-4 h-4 bg-primary rounded-full border-[1.5px] border-ink-black mb-2" />
              <Text className="font-label-md text-outline">T</Text>
            </View>
            <View className="flex-col items-center justify-end h-full" style={{ height: '40%' }}>
              <View className="w-4 h-4 bg-primary rounded-full border-[1.5px] border-ink-black mb-2" />
              <Text className="font-label-md text-outline">W</Text>
            </View>

            {/* Peak Highlight */}
            <View className="flex-col items-center justify-end h-full relative" style={{ height: '80%' }}>
              <View className="absolute -top-8 bg-secondary-container rounded-full p-1 border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="bulb" size={16} color="#1A1A1A" />
              </View>
              <View className="w-5 h-5 bg-secondary-container rounded-full border-[1.5px] border-ink-black mb-2 z-20" />
              <Text className="font-label-md text-outline">T</Text>
            </View>

            <View className="flex-col items-center justify-end h-full" style={{ height: '50%' }}>
              <View className="w-4 h-4 bg-primary rounded-full border-[1.5px] border-ink-black mb-2" />
              <Text className="font-label-md text-outline">F</Text>
            </View>
            <View className="flex-col items-center justify-end h-full" style={{ height: '30%' }}>
              <View className="w-4 h-4 bg-primary rounded-full border-[1.5px] border-ink-black mb-2" />
              <Text className="font-label-md text-outline">S</Text>
            </View>

            {/* Valley Highlight */}
            <View className="flex-col items-center justify-end h-full relative" style={{ height: '10%' }}>
              <View className="absolute -top-8 bg-accent-orange rounded-full p-1 border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="cloud" size={16} color="#1A1A1A" />
              </View>
              <View className="w-5 h-5 bg-accent-orange rounded-full border-[1.5px] border-ink-black mb-2 z-20" />
              <Text className="font-label-md text-outline">S</Text>
            </View>
          </View>

          <View className="flex-row justify-between mt-4 border-t-[1.5px] border-ink-black pt-4">
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 bg-secondary-container rounded-full border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-on-surface-variant font-bold text-xs">Peak Mood</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 bg-accent-orange rounded-full border-[1.5px] border-ink-black" />
              <Text className="font-label-md text-on-surface-variant font-bold text-xs">Low Mood</Text>
            </View>
          </View>
        </View>

        {/* Key Insight Card */}
        <View className="bg-accent-sage rounded-[24px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] p-6 md:p-8 flex-col md:flex-row items-start md:items-center gap-4">
          <View className="bg-surface-container-lowest rounded-full p-4 border-[1.5px] border-ink-black items-center justify-center shrink-0">
            <Ionicons name="sparkles" size={32} color="#002da5" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Key Insight</Text>
            <Text className="font-body-lg text-ink-black text-lg">
              Your mood tends to improve significantly after morning journaling. Consistency here seems to be a strong positive trigger.
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface-container-lowest border-t-[1.5px] border-ink-black h-[80px] px-4 pb-4 flex-row justify-around items-center z-50 rounded-t-xl shadow-[4px_4px_0px_0px_#1A1A1A]">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#747687" />
          <Text className="font-label-bold text-[#747687] mt-1 font-bold text-[10px]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="hardware-chip" size={24} color="#747687" />
          <Text className="font-label-bold text-[#747687] mt-1 font-bold text-[10px]">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-lg px-3 py-1">
          <Ionicons name="stats-chart" size={24} color="#715b00" />
          <Text className="font-label-bold text-on-secondary-container font-bold mt-1 text-[10px]">Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="person" size={24} color="#747687" />
          <Text className="font-label-bold text-[#747687] mt-1 font-bold text-[10px]">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
