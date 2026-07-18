import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIInsightAlertsScreen() {
  const router = useRouter();
  
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [trendAlerts, setTrendAlerts] = useState(true);
  const [suggestedExercises, setSuggestedExercises] = useState(false);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-low">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl tracking-tight">AI Insight Alerts</Text>
        </View>
        <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center overflow-hidden">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsyDqfz1mFsUSvvlqQSyST7fF4LIj8ARb7s1mZD2xJJu5u4IVi4qdBzlzhVrU5I4MvMeWLGD9VULiTZdGwxQq1MCEwr9_siX1U6V4oAA4mJfMlWyQWqAt1H30hTG8Kjd4eLaAR3BMzLBAXbEzFeej2WyAxQfBN6Gdxp_GSSnaxmOIkAvqEtRAMsZZlohRc2tt6K6znkCmZFaMD0pcIsuobYEbee_pSgdHe-wgpLTsu36VRCuitGl9vQA' }}
            className="w-full h-full"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-6 md:py-8 max-w-3xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Intro Hero Section */}
        <View className="bg-accent-pink rounded-[32px] p-8 mb-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          <View className="relative z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-4">How do AI Insights work?</Text>
            <Text className="font-body-md text-on-surface-variant max-w-lg">
              Our AI analyzes your daily reflections and mood entries to identify subtle patterns that might go unnoticed. It uses encrypted, privacy-first processing to suggest timely exercises and provide emotional clarity—helping you navigate your mental landscape with data-driven confidence.
            </Text>
          </View>
          <View className="absolute -right-4 -bottom-4 opacity-20">
            <Ionicons name="hardware-chip" size={120} color="#1A1A1A" />
          </View>
        </View>

        {/* Alert Toggles Section */}
        <View className="flex-col gap-4">
          
          {/* Weekly Summary */}
          <View className="bg-white rounded-[24px] p-6 border-[1.5px] border-ink-black flex-row items-center justify-between">
            <View className="flex-row items-center gap-4 flex-1 pr-4">
              <View className="w-14 h-14 rounded-2xl bg-secondary-container border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="calendar" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1">Weekly Summary</Text>
                <Text className="font-body-md text-on-surface-variant">A comprehensive overview of your emotional journey every Sunday.</Text>
              </View>
            </View>
            <Switch 
              value={weeklySummary} 
              onValueChange={setWeeklySummary}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor={weeklySummary ? '#ffffff' : '#1A1A1A'}
              ios_backgroundColor="#e4e1e8"
            />
          </View>

          {/* Emotional Trend Alerts */}
          <View className="bg-white rounded-[24px] p-6 border-[1.5px] border-ink-black flex-row items-center justify-between">
            <View className="flex-row items-center gap-4 flex-1 pr-4">
              <View className="w-14 h-14 rounded-2xl bg-accent-sage border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="stats-chart" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1">Emotional Trend Alerts</Text>
                <Text className="font-body-md text-on-surface-variant">Instant notifications when our AI detects a significant mood shift.</Text>
              </View>
            </View>
            <Switch 
              value={trendAlerts} 
              onValueChange={setTrendAlerts}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor={trendAlerts ? '#ffffff' : '#1A1A1A'}
              ios_backgroundColor="#e4e1e8"
            />
          </View>

          {/* Suggested Exercises */}
          <View className="bg-white rounded-[24px] p-6 border-[1.5px] border-ink-black flex-row items-center justify-between">
            <View className="flex-row items-center gap-4 flex-1 pr-4">
              <View className="w-14 h-14 rounded-2xl bg-accent-orange border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="barbell" size={24} color="#1A1A1A" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider mb-1">Suggested Exercises</Text>
                <Text className="font-body-md text-on-surface-variant">Personalized mindfulness activities based on your current state.</Text>
              </View>
            </View>
            <Switch 
              value={suggestedExercises} 
              onValueChange={setSuggestedExercises}
              trackColor={{ false: '#e4e1e8', true: '#002da5' }}
              thumbColor={suggestedExercises ? '#ffffff' : '#1A1A1A'}
              ios_backgroundColor="#e4e1e8"
            />
          </View>

        </View>

        {/* Privacy Badge */}
        <View className="mt-8 p-6 bg-surface-container border-dashed border-[1.5px] border-outline-variant rounded-[24px] flex-row items-start gap-4">
          <Ionicons name="lock-closed" size={24} color="#002da5" />
          <Text className="font-body-md text-on-surface-variant italic flex-1">
            Your data is processed locally whenever possible. We never sell your personal mental health insights to third parties. All AI modeling is strictly for your personal growth.
          </Text>
        </View>

        {/* Footer Actions */}
        <View className="mt-8 flex-col md:flex-row gap-4 mb-8">
          <TouchableOpacity className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="font-label-bold text-white font-bold">Save Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="font-label-bold text-ink-black font-bold">Reset to Default</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
