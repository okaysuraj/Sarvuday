import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SessionMonitoringScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-high text-primary md:hidden">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md text-primary font-bold text-xl md:text-2xl">MindGuard Monitoring</Text>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] bg-surface active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="notifications" size={20} color="#002da5" />
          </TouchableOpacity>
          <View className="hidden md:flex flex-col items-end">
            <Text className="font-label-bold text-ink-black font-bold text-xs">Real-time Feed</Text>
            <View className="flex-row items-center gap-1 mt-1">
              <View className="w-2 h-2 rounded-full bg-green-500" />
              <Text className="text-[10px] text-green-600 font-bold">SYSTEM LIVE</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Filter Bar & Summary */}
        <View className="flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="px-4 py-2 rounded-full bg-secondary-container border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Text className="font-label-bold text-on-secondary-container font-bold text-xs">All Sessions (24)</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-full bg-accent-pink border-[1.5px] border-ink-black active:bg-surface-container-high flex-row items-center gap-2">
              <Text className="font-label-bold text-ink-black font-bold text-xs">High Risk</Text>
              <View className="bg-error rounded-full px-2 py-0.5">
                <Text className="text-white text-[10px] font-bold">3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-full bg-white border-[1.5px] border-ink-black active:bg-surface-container-high">
              <Text className="font-label-bold text-ink-black font-bold text-xs">Video Only</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-accent-sage p-4 rounded-[24px] border-[1.5px] border-ink-black flex-row gap-6">
            <View className="flex-col">
              <Text className="text-[10px] uppercase font-bold text-on-surface-variant">Avg Risk Level</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-lg mt-1">Low (12%)</Text>
            </View>
            <View className="w-[1.5px] h-10 bg-ink-black opacity-20" />
            <View className="flex-col">
              <Text className="text-[10px] uppercase font-bold text-on-surface-variant">Active Mods</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-lg mt-1">08/10</Text>
            </View>
          </View>
        </View>

        {/* Bento Grid of Monitoring Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-6">
          
          {/* Session Card 1: High Risk */}
          <View className="w-full md:w-[48%] xl:w-[32%] bg-white rounded-[32px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6 relative overflow-hidden">
            <View className="absolute top-0 right-0 bg-error px-4 py-1 border-b-[1.5px] border-l-[1.5px] border-ink-black rounded-bl-[16px]">
              <Text className="text-white font-label-bold text-[10px] font-bold">HIGH RISK DETECTED</Text>
            </View>
            <View className="flex-row items-center gap-4 mt-2">
              <View className="w-14 h-14 rounded-[16px] bg-accent-pink border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="videocam" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-lg leading-none">Video Session #482</Text>
                <Text className="text-on-surface-variant font-label-md text-xs mt-1">Started 14m ago • Dr. Aris Thorne</Text>
              </View>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black font-bold text-xs">Safety AI Indicator</Text>
                <Text className="text-error font-bold text-xs">88% Flag</Text>
              </View>
              <View className="h-3 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                <View className="h-full bg-error" style={{ width: '88%' }} />
              </View>
              <View className="flex-row gap-2 flex-wrap">
                <View className="px-3 py-1 rounded-full bg-error-container border border-ink-black">
                  <Text className="text-on-error-container text-[10px] font-bold">Elevated Heart Rate</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-error-container border border-ink-black">
                  <Text className="text-on-error-container text-[10px] font-bold">Sentiment Alert</Text>
                </View>
              </View>
            </View>
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="text-white font-label-bold font-bold text-sm">Silent Join</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-accent-orange py-3 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="text-ink-black font-label-bold font-bold text-sm">Escalate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Session Card 2: Neutral */}
          <View className="w-full md:w-[48%] xl:w-[32%] bg-white rounded-[32px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-[16px] bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="chatbubbles" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-lg leading-none">Chat Session #489</Text>
                <Text className="text-on-surface-variant font-label-md text-xs mt-1">Started 42m ago • Dr. Sarah Jenkins</Text>
              </View>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black font-bold text-xs">Safety AI Indicator</Text>
                <Text className="text-[#725c00] font-bold text-xs">5% Flag</Text>
              </View>
              <View className="h-3 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                <View className="h-full bg-[#725c00]" style={{ width: '5%' }} />
              </View>
              <View className="flex-row gap-2 flex-wrap">
                <View className="px-3 py-1 rounded-full bg-surface-container-high border border-ink-black">
                  <Text className="text-on-surface-variant text-[10px] font-bold">Calm Tone</Text>
                </View>
                <View className="px-3 py-1 rounded-full bg-surface-container-high border border-ink-black">
                  <Text className="text-on-surface-variant text-[10px] font-bold">Routine Check</Text>
                </View>
              </View>
            </View>
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity className="flex-1 bg-white py-3 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="text-ink-black font-label-bold font-bold text-sm">View Logs</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Session Card 3: Moderate Risk */}
          <View className="w-full md:w-[48%] xl:w-[32%] bg-white rounded-[32px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
            <View className="flex-row items-center gap-4">
              <View className="w-14 h-14 rounded-[16px] bg-secondary-container border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="mic" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold text-lg leading-none">Audio Session #491</Text>
                <Text className="text-on-surface-variant font-label-md text-xs mt-1">Started 5m ago • Counselor Mark V.</Text>
              </View>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black font-bold text-xs">Safety AI Indicator</Text>
                <Text className="text-[#725c00] font-bold text-xs">24% Flag</Text>
              </View>
              <View className="h-3 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                <View className="h-full bg-secondary-container" style={{ width: '24%' }} />
              </View>
              <View className="flex-row gap-2 flex-wrap">
                <View className="px-3 py-1 rounded-full bg-secondary-fixed border border-ink-black">
                  <Text className="text-on-secondary-container text-[10px] font-bold">Anxiety Spike</Text>
                </View>
              </View>
            </View>
            <View className="flex-row gap-3 mt-2">
              <TouchableOpacity className="flex-1 bg-primary py-3 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="text-white font-label-bold font-bold text-sm">Monitor</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white py-3 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="text-ink-black font-label-bold font-bold text-sm">Note Flag</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-[90px] right-6 w-16 h-16 bg-error rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex items-center justify-center z-50 active:translate-y-[2px] active:shadow-none">
        <Ionicons name="warning" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-2" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="shield-checkmark" size={24} color="#002da5" />
          <Text className="font-label-md text-primary font-bold text-[10px] mt-1">Monitor</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="analytics" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">Risk AI</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="alert-circle" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">Crisis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
