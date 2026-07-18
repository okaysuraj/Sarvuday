import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { trackingApi } from '../../api/tracking';

export default function GoalsScreen() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const data = await trackingApi.getGoals();
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
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
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">Mindful Insights</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-surface-variant flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-8 flex-row justify-between items-end">
          <View>
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-1">Your Path</Text>
            <Text className="font-body-lg text-on-surface-variant">Track your daily mindful intentions.</Text>
          </View>
          <TouchableOpacity className="bg-primary text-on-primary px-4 py-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2">
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text className="font-label-bold text-white font-bold">New</Text>
          </TouchableOpacity>
        </View>

        {/* Active Goals Grid */}
        <View className="flex-col gap-6">
          {goals.map((goal, idx) => (
            <View key={goal.id} className="bg-surface-container-lowest rounded-3xl border-[1.5px] border-ink-black p-6 flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <View className="flex-row items-center gap-2 mb-2">
                    <View className="bg-primary px-3 py-1 rounded-full border border-ink-black">
                      <Text className="font-label-md text-white">{goal.frequency}</Text>
                    </View>
                    <View className="bg-surface-variant px-3 py-1 rounded-full border border-ink-black flex-row items-center gap-1">
                      <Ionicons name="flame" size={16} color="#725c00" />
                      <Text className="font-label-md text-ink-black">{goal.streak} Day Streak</Text>
                    </View>
                  </View>
                  <Text className="font-headline-md text-ink-black font-bold text-xl mt-2">{goal.title}</Text>
                  <Text className="font-body-md text-on-surface-variant mt-1">{goal.description}</Text>
                </View>
                <TouchableOpacity className="bg-surface p-2 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                  <Ionicons name="pencil" size={20} color="#1A1A1A" />
                </TouchableOpacity>
              </View>

              <View>
                <View className="flex-row justify-between mb-2">
                  <Text className="font-label-bold text-ink-black font-bold">Progress ({goal.progress_current}/{goal.progress_total})</Text>
                  <Text className="font-label-bold text-ink-black font-bold">{Math.round((goal.progress_current / goal.progress_total) * 100)}%</Text>
                </View>
                <View className="h-4 w-full bg-surface-variant rounded-full border-[1.5px] border-ink-black overflow-hidden">
                  <View className="h-full bg-secondary-container" style={{ width: `${(goal.progress_current / goal.progress_total) * 100}%` }} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Milestones */}
        <View className="mt-12 pt-8 border-t-2 border-dashed border-ink-black">
          <View className="flex-row items-center gap-2 mb-6">
            <Ionicons name="trophy" size={28} color="#003fdd" />
            <Text className="font-headline-md text-ink-black font-bold text-2xl">Milestones Reached</Text>
          </View>
          <View className="flex-col gap-4">
            <View className="bg-surface-container-lowest rounded-2xl border-[1.5px] border-ink-black p-4 flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center border-2 border-ink-black">
                <Ionicons name="medal" size={24} color="#1A1A1A" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold line-through">Drink 2L Water</Text>
                <Text className="font-label-md text-on-surface-variant mt-1">30 Day Streak Achieved</Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
