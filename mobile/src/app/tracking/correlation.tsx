import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CorrelationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Insights & Correlation
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-primary-fixed p-6 rounded-3xl mb-8 border border-primary-fixed-dim shadow-md">
          <Text className="font-label-md text-on-primary-fixed-variant mb-2 uppercase tracking-wider">AI Insight</Text>
          <Text className="font-headline-md text-on-primary-fixed text-xl font-bold mb-4 leading-8">
            You are 60% more likely to report severe anxiety on days where you sleep less than 6 hours.
          </Text>
          <TouchableOpacity className="bg-primary py-2 px-4 rounded-lg self-start">
            <Text className="font-label-bold text-white">View Sleep Exercises</Text>
          </TouchableOpacity>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Mood vs. Sleep (Past 7 Days)</Text>
        
        <View className="bg-surface-container-highest p-4 rounded-2xl mb-8 border border-outline-variant h-64 relative justify-end pb-8">
          {/* Mock Overlay Chart */}
          <View className="absolute top-4 left-4 right-4 flex-row justify-between">
            <View className="flex-row items-center"><View className="w-3 h-3 bg-primary rounded-full mr-2"/><Text className="text-xs">Mood</Text></View>
            <View className="flex-row items-center"><View className="w-3 h-3 bg-secondary rounded-full mr-2"/><Text className="text-xs">Sleep</Text></View>
          </View>
          
          <View className="flex-row justify-between items-end h-32 px-4">
            {/* Sleep Bars */}
            {[5, 6, 4, 8, 7, 5, 4].map((h, i) => (
              <View key={`sleep-${i}`} className="w-6 bg-secondary rounded-t-sm opacity-50" style={{ height: `${(h/10)*100}%` }} />
            ))}
          </View>
          
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-between items-end h-32 px-4 pointer-events-none">
            {/* Mood Points (Mock Line) */}
            {[2, 4, 1, 8, 9, 3, 2].map((h, i) => (
              <View key={`mood-${i}`} className="w-6 items-center justify-end" style={{ height: `${(h/10)*100}%` }}>
                <View className="w-3 h-3 bg-primary rounded-full" />
              </View>
            ))}
          </View>

          <View className="flex-row justify-between mt-4 border-t border-surface-variant pt-2 px-4">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Text key={i} className="font-label-md text-on-surface-variant w-6 text-center">{d}</Text>
            ))}
          </View>
        </View>

        <View className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant mb-8">
          <Ionicons name="document-text" size={24} color="#1b1b20" className="mr-4" />
          <View className="flex-1">
            <Text className="font-headline-md text-on-surface font-bold text-base">Weekly Report</Text>
            <Text className="font-body-md text-on-surface-variant text-sm mt-1">Download your clinical summary</Text>
          </View>
          <Ionicons name="download-outline" size={20} color="#747687" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
