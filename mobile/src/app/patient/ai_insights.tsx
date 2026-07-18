import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIInsightsScreen() {
  const router = useRouter();
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [trendAlerts, setTrendAlerts] = useState(true);
  const [suggestedExercises, setSuggestedExercises] = useState(false);

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full z-50 bg-[#fbf8ff] border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-container-low transition-colors p-2 rounded-full active:translate-x-[2px] active:translate-y-[2px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary tracking-tight md:text-headline-md font-bold text-2xl">AI Insight Alerts</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-[#d9d9e6] flex items-center justify-center overflow-hidden">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6 md:py-12 max-w-3xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Intro Hero Section */}
        <View className="bg-[#ffd9df] rounded-[32px] p-8 mb-6 relative overflow-hidden border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="relative z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-4">How do AI Insights work?</Text>
            <Text className="font-body-md text-on-surface-variant max-w-lg">
              Our AI analyzes your daily reflections and mood entries to identify subtle patterns that might go unnoticed. It uses encrypted, privacy-first processing to suggest timely exercises and provide emotional clarity—helping you navigate your mental landscape with data-driven confidence.
            </Text>
          </View>
          <View className="absolute -right-8 -bottom-8 w-40 h-40 opacity-20" style={{ transform: [{ rotate: '12deg' }] }}>
            <Ionicons name="bulb" size={120} color="#1A1A1A" />
          </View>
        </View>

        {/* Alert Toggles Section */}
        <View className="flex-col gap-6">
          {/* Weekly Summary */}
          <View className={`bg-white rounded-[24px] p-6 flex-row items-center justify-between border-[1.5px] transition-colors ${weeklySummary ? 'border-primary' : 'border-ink-black'}`}>
            <View className="flex-row items-center gap-4 md:gap-6 flex-1 mr-4">
              <View className="w-14 h-14 rounded-2xl bg-[#fdd33f] border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Ionicons name="calendar-outline" size={28} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1 text-xs">Weekly Summary</Text>
                <Text className="font-body-md text-on-surface-variant text-sm">A comprehensive overview of your emotional journey every Sunday.</Text>
              </View>
            </View>
            <Switch
              value={weeklySummary}
              onValueChange={setWeeklySummary}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e4e1e8"
            />
          </View>

          {/* Emotional Trend Alerts */}
          <View className={`bg-white rounded-[24px] p-6 flex-row items-center justify-between border-[1.5px] transition-colors ${trendAlerts ? 'border-primary' : 'border-ink-black'}`}>
            <View className="flex-row items-center gap-4 md:gap-6 flex-1 mr-4">
              <View className="w-14 h-14 rounded-2xl bg-[#d9d9e6] border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Ionicons name="stats-chart" size={28} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1 text-xs">Emotional Trend Alerts</Text>
                <Text className="font-body-md text-on-surface-variant text-sm">Instant notifications when our AI detects a significant mood shift.</Text>
              </View>
            </View>
            <Switch
              value={trendAlerts}
              onValueChange={setTrendAlerts}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e4e1e8"
            />
          </View>

          {/* Suggested Exercises */}
          <View className={`bg-white rounded-[24px] p-6 flex-row items-center justify-between border-[1.5px] transition-colors ${suggestedExercises ? 'border-primary' : 'border-ink-black'}`}>
            <View className="flex-row items-center gap-4 md:gap-6 flex-1 mr-4">
              <View className="w-14 h-14 rounded-2xl bg-[#ffdad6] border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Ionicons name="barbell" size={28} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1 text-xs">Suggested Exercises</Text>
                <Text className="font-body-md text-on-surface-variant text-sm">Personalized mindfulness activities based on your current state.</Text>
              </View>
            </View>
            <Switch
              value={suggestedExercises}
              onValueChange={setSuggestedExercises}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor="#ffffff"
              ios_backgroundColor="#e4e1e8"
            />
          </View>
        </View>

        {/* Privacy Badge */}
        <View className="mt-12 p-6 bg-[#efedf4] border-dashed border-[1.5px] border-[#c4c5d8] rounded-[24px] flex-row items-start gap-4">
          <Ionicons name="lock-closed" size={24} color="#002da5" />
          <Text className="font-body-md text-on-surface-variant italic flex-1">
            Your data is processed locally whenever possible. We never sell your personal mental health insights to third parties. All AI modeling is strictly for your personal growth.
          </Text>
        </View>

        {/* Footer Actions */}
        <View className="mt-12 flex-col md:flex-row gap-4 mb-20">
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] rounded-xl px-8 py-4 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-1 items-center justify-center">
            <Text className="text-white font-label-bold font-bold">Save Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] rounded-xl px-8 py-4 active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-1 items-center justify-center">
            <Text className="text-ink-black font-label-bold font-bold">Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BottomNavBar */}
      <View className="fixed bottom-0 w-full z-50 flex-row justify-around items-center px-4 py-3 bg-[#fbf8ff] border-t-[1.5px] border-ink-black pb-safe">
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl border-[1.5px] border-ink-black px-4 py-1">
          <Ionicons name="bulb" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] text-xs font-bold mt-1">Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/support_groups')}>
          <Ionicons name="people-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Community</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center">
          <Ionicons name="person-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs mt-1">Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
