import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdminRiskLogsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl tracking-tighter">Safety Logs & Risk Audit</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="hidden md:flex bg-accent-sage px-4 py-2 rounded-full border-[1.5px] border-ink-black">
            <Text className="font-label-bold text-ink-black font-bold text-sm">System Health: 98%</Text>
          </View>
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="notifications" size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Statistics Bento Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          <View className="flex-[2] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between">
            <View>
              <View className="flex-row justify-between items-start mb-4">
                <Text className="font-headline-sm text-ink-black font-bold text-2xl">Risk Severity Trends</Text>
                <Ionicons name="trending-up" size={28} color="#002da5" />
              </View>
              <Text className="font-body-md text-on-surface-variant mb-6">AI-detected anomalies are up 12% this week, primarily in "Crisis Escalation" categories.</Text>
            </View>
            <View className="h-32 flex-row items-end gap-2">
              <View className="flex-1 bg-primary h-[40%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-accent-pink h-[60%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-primary h-[35%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-secondary-container h-[85%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-primary h-[55%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-accent-orange h-[95%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
              <View className="flex-1 bg-primary h-[70%] rounded-t-xl border-[1.5px] border-b-0 border-ink-black" />
            </View>
          </View>

          <View className="flex-1 bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between">
            <Ionicons name="warning" size={36} color="#ba1a1a" className="mb-4" />
            <View>
              <Text className="font-display-lg-mobile text-ink-black font-bold text-5xl">24</Text>
              <Text className="font-label-bold text-ink-black font-bold">Critical Triggers</Text>
            </View>
            <View className="mt-4 bg-white/40 p-2 rounded-xl border-[1.5px] border-ink-black/20">
              <Text className="text-xs font-label-bold font-bold text-center">Immediate Action Required</Text>
            </View>
          </View>

          <View className="flex-1 bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-between">
            <Ionicons name="hardware-chip" size={36} color="#1A1A1A" className="mb-4" />
            <View>
              <Text className="font-display-lg-mobile text-ink-black font-bold text-5xl">8.2</Text>
              <Text className="font-label-bold text-ink-black font-bold">Avg Risk Score</Text>
            </View>
            <View className="mt-4 bg-white/40 p-2 rounded-xl border-[1.5px] border-ink-black/20">
              <Text className="text-xs font-label-bold font-bold text-center">Moderate Stability</Text>
            </View>
          </View>

        </View>

        <View className="flex-col lg:flex-row gap-6">
          
          {/* Logs List */}
          <View className="flex-[2] flex-col gap-6">
            <View className="flex-row items-center justify-between">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Live Audit Trail</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="filter" size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Ionicons name="download" size={16} color="#1A1A1A" />
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Log Entries */}
            <View className="flex-col gap-4">
              
              {/* Critical Log */}
              <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <View className="flex-col md:flex-row justify-between gap-4">
                  <View className="flex-row items-start gap-4">
                    <View className="w-12 h-12 rounded-full bg-[#ffdad6] border-[1.5px] border-ink-black items-center justify-center shrink-0">
                      <Ionicons name="warning" size={24} color="#ba1a1a" />
                    </View>
                    <View>
                      <View className="flex-row items-center gap-2 mb-1">
                        <Text className="font-label-bold text-ink-black font-bold">Session #88219</Text>
                        <View className="bg-error px-2 py-0.5 rounded-full border-[1px] border-ink-black">
                          <Text className="text-white text-[10px] font-bold">CRITICAL</Text>
                        </View>
                      </View>
                      <Text className="font-body-md text-ink-black">Self-harm keyword detected: "ending it all"</Text>
                      <Text className="text-on-surface-variant text-sm mt-1">Patient: J. Doe • AI Lead: Agent-X1</Text>
                    </View>
                  </View>
                  <View className="flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
                    <Text className="font-display-lg-mobile text-error font-bold text-4xl">9.8</Text>
                    <Text className="text-[10px] font-label-bold font-bold text-outline uppercase">Risk Score</Text>
                  </View>
                </View>
                <View className="mt-6 flex-row flex-wrap gap-2">
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Keyword: "ending"</Text>
                  </View>
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Sentiment: Extreme Negative</Text>
                  </View>
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Time: 14:22:10</Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Moderate Log */}
              <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <View className="flex-col md:flex-row justify-between gap-4">
                  <View className="flex-row items-start gap-4">
                    <View className="w-12 h-12 rounded-full bg-secondary-container border-[1.5px] border-ink-black items-center justify-center shrink-0">
                      <Ionicons name="alert" size={24} color="#715b00" />
                    </View>
                    <View>
                      <View className="flex-row items-center gap-2 mb-1">
                        <Text className="font-label-bold text-ink-black font-bold">Session #88215</Text>
                        <View className="bg-secondary-container px-2 py-0.5 rounded-full border-[1px] border-ink-black">
                          <Text className="text-ink-black text-[10px] font-bold">MODERATE</Text>
                        </View>
                      </View>
                      <Text className="font-body-md text-ink-black">Rapid sentiment shift: -0.8 in 3 minutes</Text>
                      <Text className="text-on-surface-variant text-sm mt-1">Patient: S. Smith • AI Lead: Agent-Y2</Text>
                    </View>
                  </View>
                  <View className="flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
                    <Text className="font-display-lg-mobile text-[#725c00] font-bold text-4xl">6.4</Text>
                    <Text className="text-[10px] font-label-bold font-bold text-outline uppercase">Risk Score</Text>
                  </View>
                </View>
                <View className="mt-6 flex-row flex-wrap gap-2">
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Keyword: "hopeless"</Text>
                  </View>
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Sentiment: Neutral to Negative</Text>
                  </View>
                  <View className="px-3 py-1 bg-surface-container rounded-full border-[1px] border-ink-black/20">
                    <Text className="text-xs font-bold text-ink-black">Time: 13:58:44</Text>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          </View>

          {/* Right Column: Visualization & Status */}
          <View className="flex-1 flex-col gap-6">
            
            {/* Live Monitor */}
            <View className="bg-ink-black text-white p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-headline-sm text-white font-bold text-2xl mb-2">Live Monitor</Text>
              <View className="flex-row items-center gap-2 mb-6">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-xs font-label-bold font-bold uppercase tracking-widest text-[#eae7ee]">AI Engines Online</Text>
              </View>
              <View className="flex-col gap-4">
                <View className="p-4 rounded-2xl bg-white/10 border-[1px] border-white/20">
                  <Text className="text-xs font-label-bold font-bold text-accent-pink mb-1">CURRENTLY ACTIVE</Text>
                  <Text className="text-xl font-headline-sm text-white font-bold">1,248 Sessions</Text>
                </View>
                <View className="p-4 rounded-2xl bg-white/10 border-[1px] border-white/20">
                  <Text className="text-xs font-label-bold font-bold text-secondary-container mb-1">THREATS INTERCEPTED</Text>
                  <Text className="text-xl font-headline-sm text-white font-bold">412 Today</Text>
                </View>
              </View>
            </View>

            {/* Trigger Density */}
            <View className="bg-white p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-label-bold text-ink-black font-bold mb-6">Trigger Density</Text>
              
              <View className="flex-col gap-6">
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-bold text-ink-black">Severe Depression</Text>
                    <Text className="text-sm font-bold text-ink-black">42%</Text>
                  </View>
                  <View className="h-4 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden relative">
                    <View className="absolute top-0 left-0 h-full bg-error border-r-[1.5px] border-ink-black" style={{ width: '42%' }} />
                  </View>
                </View>
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-bold text-ink-black">Anxiety Triggers</Text>
                    <Text className="text-sm font-bold text-ink-black">28%</Text>
                  </View>
                  <View className="h-4 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden relative">
                    <View className="absolute top-0 left-0 h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '28%' }} />
                  </View>
                </View>
                <View>
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm font-bold text-ink-black">Medical Bypass</Text>
                    <Text className="text-sm font-bold text-ink-black">18%</Text>
                  </View>
                  <View className="h-4 bg-surface-container rounded-full border-[1.5px] border-ink-black overflow-hidden relative">
                    <View className="absolute top-0 left-0 h-full bg-accent-sage border-r-[1.5px] border-ink-black" style={{ width: '18%' }} />
                  </View>
                </View>
              </View>

              <TouchableOpacity className="w-full mt-8 py-3 bg-white border-[1.5px] border-ink-black rounded-full items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Text className="font-label-bold text-ink-black font-bold">View Full Report</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </ScrollView>
    </View>
  );
}
