import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AIInsightsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2">
          AI Insights
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6 pb-12">
        <Text className="font-body-md text-on-surface-variant text-base mb-8">
          Based on your recent conversations with the AI Companion, here are some insights and patterns we've noticed.
        </Text>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Mood Trends</Text>
        <View className="bg-surface-container-highest p-6 rounded-2xl mb-8 border border-outline-variant">
          {/* Placeholder for chart */}
          <View className="h-40 justify-end flex-row items-end gap-2 mb-4">
            <View className="w-8 h-12 bg-primary-fixed rounded-t-sm" />
            <View className="w-8 h-20 bg-primary-fixed rounded-t-sm" />
            <View className="w-8 h-16 bg-primary-fixed rounded-t-sm" />
            <View className="w-8 h-28 bg-primary-fixed rounded-t-sm" />
            <View className="w-8 h-24 bg-primary rounded-t-sm" />
          </View>
          <Text className="font-body-md text-on-surface text-sm text-center">
            Your mood has generally improved over the last 5 days.
          </Text>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Detected Triggers</Text>
        <View className="flex-row flex-wrap gap-3 mb-8">
          <View className="bg-error-container px-4 py-2 rounded-full">
            <Text className="text-on-error-container font-label-bold">Work Stress</Text>
          </View>
          <View className="bg-secondary-container px-4 py-2 rounded-full">
            <Text className="text-on-secondary-container font-label-bold">Lack of Sleep</Text>
          </View>
          <View className="bg-surface-variant px-4 py-2 rounded-full">
            <Text className="text-on-surface-variant font-label-bold">Social Anxiety</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Recommendations</Text>
        <View className="gap-4">
          <TouchableOpacity className="bg-primary-fixed p-4 rounded-xl flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-primary-fixed-dim items-center justify-center mr-4">
               <Ionicons name="moon" size={24} color="#001356" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-on-primary-fixed font-bold">Sleep Hygiene</Text>
              <Text className="font-body-md text-on-primary-fixed-variant text-sm mt-1">Try to get 8 hours of sleep tonight.</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-tertiary-fixed p-4 rounded-xl flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-tertiary-fixed-dim items-center justify-center mr-4">
               <Ionicons name="body" size={24} color="#331019" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-on-tertiary-fixed font-bold">Stretching Exercises</Text>
              <Text className="font-body-md text-on-tertiary-fixed-variant text-sm mt-1">Relieve physical tension.</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
