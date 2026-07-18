import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container md:hidden">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl tracking-tighter">MindGuard Admin</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="p-2 relative rounded-full active:bg-surface-container">
            <Ionicons name="notifications" size={24} color="#1A1A1A" />
            <View className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full border border-white" />
          </TouchableOpacity>
          <View className="hidden sm:flex flex-row items-center gap-2 px-3 py-1 bg-surface-container border-[1.5px] border-ink-black rounded-full">
            <View className="w-2 h-2 bg-[#725c00] rounded-full" />
            <Text className="text-xs font-label-bold font-bold">Live Status</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <View>
            <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl">System Overview</Text>
            <Text className="text-on-surface-variant mt-2 font-body-lg text-lg">Real-time health telemetry for the SarvUday network.</Text>
          </View>
          <TouchableOpacity className="px-6 py-3 bg-secondary-container text-ink-black border-[1.5px] border-ink-black rounded-lg shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none self-start">
            <Text className="font-label-bold font-bold text-ink-black">Download Report</Text>
          </TouchableOpacity>
        </View>

        {/* Key Metrics Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          {/* Total Active Users */}
          <View className="flex-1 bg-[#dde1ff] border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
            <View className="flex-row justify-between items-start">
              <View className="p-3 bg-white border-[1.5px] border-ink-black rounded-2xl">
                <Ionicons name="people" size={24} color="#002da5" />
              </View>
              <View className="bg-white/50 px-2 py-1 rounded border border-ink-black">
                <Text className="text-xs font-label-bold font-bold">+12% vs LW</Text>
              </View>
            </View>
            <View>
              <Text className="text-on-surface-variant font-label-md font-bold mb-1">Total Active Users</Text>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">42,892</Text>
            </View>
          </View>

          {/* Active Therapists */}
          <View className="flex-1 bg-[#ffe082] border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
            <View className="flex-row justify-between items-start">
              <View className="p-3 bg-white border-[1.5px] border-ink-black rounded-2xl">
                <Ionicons name="medkit" size={24} color="#725c00" />
              </View>
              <View className="bg-white/50 px-2 py-1 rounded border border-ink-black">
                <Text className="text-xs font-label-bold font-bold">3 Pending</Text>
              </View>
            </View>
            <View>
              <Text className="text-on-surface-variant font-label-md font-bold mb-1">Active Therapists</Text>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">1,248</Text>
            </View>
          </View>

          {/* Total Revenue */}
          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
            <View className="flex-row justify-between items-start">
              <View className="p-3 bg-white border-[1.5px] border-ink-black rounded-2xl">
                <Ionicons name="cash" size={24} color="#1A1A1A" />
              </View>
              <View className="bg-white/50 px-2 py-1 rounded border border-ink-black">
                <Text className="text-xs font-label-bold font-bold">Daily Avg: $8k</Text>
              </View>
            </View>
            <View>
              <Text className="text-on-surface-variant font-label-md font-bold mb-1">Total Monthly Revenue</Text>
              <Text className="font-headline-md text-ink-black font-bold text-3xl">$244,900</Text>
            </View>
          </View>

        </View>

        {/* Safety Snapshot & AI Risks */}
        <View className="flex-col lg:flex-row gap-6 mb-8">
          
          {/* Safety Snapshot Left Panel */}
          <View className="flex-[3] bg-white border-[1.5px] border-ink-black rounded-[40px] p-6">
            <View className="flex-row justify-between items-center mb-8">
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">Safety Snapshot</Text>
                <Text className="text-on-surface-variant font-label-md">Current Critical Incidents</Text>
              </View>
              <View className="px-3 py-1 bg-[#ffdad6] border border-ink-black rounded-full">
                <Text className="text-[#93000a] text-xs font-label-bold font-bold">3 HIGH RISK</Text>
              </View>
            </View>
            
            <View className="flex-col gap-4">
              {/* Incident 1 */}
              <TouchableOpacity className="flex-row items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl active:bg-surface-container-low">
                <View className="w-12 h-12 bg-accent-orange border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="home" size={24} color="#ba1a1a" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold">Suicidal Ideation Detection</Text>
                  <Text className="text-xs text-on-surface-variant">User ID: #88219 • Session 12-A • Detected 4m ago</Text>
                </View>
                <View className="px-4 py-2 bg-primary border-[1.5px] border-ink-black rounded-lg">
                  <Text className="text-white text-xs font-label-bold font-bold">Intervene</Text>
                </View>
              </TouchableOpacity>

              {/* Incident 2 */}
              <TouchableOpacity className="flex-row items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl active:bg-surface-container-low">
                <View className="w-12 h-12 bg-[#ffe082] border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="warning" size={24} color="#725c00" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold">Harassment Trigger</Text>
                  <Text className="text-xs text-on-surface-variant">User ID: #77210 • Community Forum • Detected 12m ago</Text>
                </View>
                <View className="px-4 py-2 bg-primary border-[1.5px] border-ink-black rounded-lg">
                  <Text className="text-white text-xs font-label-bold font-bold">Moderate</Text>
                </View>
              </TouchableOpacity>

              {/* Incident 3 */}
              <TouchableOpacity className="flex-row items-center gap-4 p-4 border-[1.5px] border-ink-black rounded-2xl active:bg-surface-container-low">
                <View className="w-12 h-12 bg-[#dde1ff] border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="alert" size={24} color="#002da5" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold">Therapist Flag</Text>
                  <Text className="text-xs text-on-surface-variant">Therapist ID: #DR-442 • Feedback Inconsistency • 2h ago</Text>
                </View>
                <View className="px-4 py-2 bg-primary border-[1.5px] border-ink-black rounded-lg">
                  <Text className="text-white text-xs font-label-bold font-bold">Review</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* AI Risk Distribution (Right Panel) */}
          <View className="flex-[2] flex-col gap-6">
            
            <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[40px] p-6 flex-col justify-between">
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">AI Risk Levels</Text>
                <Text className="text-on-surface-variant text-sm mt-1">Sentiment variance across 2.4k live chats</Text>
              </View>
              <View className="py-8 flex-col gap-4">
                
                <View className="flex-col gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-xs font-label-bold font-bold text-ink-black">High Risk (Escalated)</Text>
                    <Text className="text-xs font-label-bold font-bold text-ink-black">14%</Text>
                  </View>
                  <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <View className="h-full bg-error" style={{ width: '14%' }} />
                  </View>
                </View>

                <View className="flex-col gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-xs font-label-bold font-bold text-ink-black">Monitoring Needed</Text>
                    <Text className="text-xs font-label-bold font-bold text-ink-black">38%</Text>
                  </View>
                  <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <View className="h-full bg-secondary-container" style={{ width: '38%' }} />
                  </View>
                </View>

                <View className="flex-col gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-xs font-label-bold font-bold text-ink-black">Stable Sentiment</Text>
                    <Text className="text-xs font-label-bold font-bold text-ink-black">48%</Text>
                  </View>
                  <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
                    <View className="h-full bg-primary" style={{ width: '48%' }} />
                  </View>
                </View>

              </View>
              <View className="pt-4 border-t border-ink-black/10">
                <Text className="text-xs italic text-on-surface-variant font-label-md">Last AI Training Update: 32 minutes ago</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="bg-ink-black text-white rounded-[32px] p-6 border-[1.5px] border-ink-black">
              <View className="flex-row items-center gap-3 mb-4">
                <Ionicons name="flash" size={24} color="#fdd33f" />
                <Text className="font-label-bold text-white font-bold text-lg">System Status</Text>
              </View>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm text-white">Server Latency</Text>
                <Text className="text-sm font-label-bold font-bold text-white">42ms</Text>
              </View>
              <View className="w-full h-2 bg-white/20 rounded-full">
                <View className="w-[85%] h-full bg-secondary-container rounded-full" />
              </View>
            </View>

          </View>

        </View>

      </ScrollView>
    </View>
  );
}
