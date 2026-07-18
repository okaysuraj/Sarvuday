import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { insightsApi } from '../../api/insights';

export default function InsightsScreen() {
  const router = useRouter();
  
  const [insights, setInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const data = await insightsApi.getSummary();
      setInsights(data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">AI Insights</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Overall Mood Card */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="analytics-outline" size={24} color="#002da5" />
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Overall Mood</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="font-display-lg-mobile text-ink-black font-bold text-3xl text-primary">{insights?.overall_mood || 'N/A'}</Text>
            <View className="bg-accent-sage px-4 py-1 rounded-full border-[1.5px] border-ink-black">
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">This Week</Text>
            </View>
          </View>

          {/* Emotion Breakdown Additions */}
          <View className="mt-6 flex-col gap-4">
            <Text className="font-headline-sm text-ink-black font-bold text-lg mb-2">Emotion Breakdown</Text>
            
            <View className="flex-col gap-1">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest text-xs font-bold">Calm</Text>
                <Text className="font-headline-sm text-ink-black font-bold">70%</Text>
              </View>
              <View className="w-full h-3 bg-surface-variant rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-primary-fixed border-r-[1.5px] border-ink-black" style={{ width: '70%' }} />
              </View>
            </View>

            <View className="flex-col gap-1">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest text-xs font-bold">Reflective</Text>
                <Text className="font-headline-sm text-ink-black font-bold">20%</Text>
              </View>
              <View className="w-full h-3 bg-surface-variant rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-secondary-fixed border-r-[1.5px] border-ink-black" style={{ width: '20%' }} />
              </View>
            </View>

            <View className="flex-col gap-1">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest text-xs font-bold">Tense</Text>
                <Text className="font-headline-sm text-ink-black font-bold">10%</Text>
              </View>
              <View className="w-full h-3 bg-surface-variant rounded-full border-[1.5px] border-ink-black overflow-hidden">
                <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '10%' }} />
              </View>
            </View>
          </View>
        </View>

        {/* Key Themes Card */}
        <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="pricetags-outline" size={24} color="#002da5" />
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Key Themes</Text>
          </View>
          <View className="flex-row flex-wrap gap-3">
            {insights?.key_themes?.map((theme: string, idx: number) => (
              <View key={idx} className="bg-accent-pink px-4 py-2 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold">{theme}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations Card */}
        <View className="bg-[#fdd33f] border-[1.5px] border-ink-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="bulb-outline" size={24} color="#1A1A1A" />
            <Text className="font-headline-sm text-ink-black font-bold text-xl">AI Recommendations</Text>
          </View>
          <View className="flex-col gap-3">
            {insights?.recommendations?.map((rec: string, idx: number) => (
              <View key={idx} className="bg-white border-[1.5px] border-ink-black rounded-xl p-4 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-body-md text-ink-black font-bold">{rec}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
