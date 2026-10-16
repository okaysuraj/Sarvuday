import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { trackingApi } from '../../api/tracking';

interface Goal {
  id: string;
  title: string;
  description?: string;
  frequency?: string;
  streak?: number;
  progress_current: number;
  progress_total: number;
}

export default function GoalsTrackingScreen() {
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await trackingApi.getGoals();
      if (Array.isArray(data) && data.length > 0) {
        setGoals(data);
      } else {
        setGoals([
          { id: '1', title: 'Guided Breathing', progress_total: 1, progress_current: 1, frequency: 'Daily' },
          { id: '2', title: 'Daily Journaling', progress_total: 7, progress_current: 4, frequency: 'Weekly' },
          { id: '3', title: 'Sleep 8 Hours', progress_total: 7, progress_current: 5, frequency: 'Weekly' },
        ]);
      }
    } catch (err) {
      console.error('Error fetching goals:', err);
      setGoals([
        { id: '1', title: 'Guided Breathing', progress_total: 1, progress_current: 1, frequency: 'Daily' },
        { id: '2', title: 'Daily Journaling', progress_total: 7, progress_current: 4, frequency: 'Weekly' },
        { id: '3', title: 'Sleep 8 Hours', progress_total: 7, progress_current: 5, frequency: 'Weekly' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          My Goals
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-headline-md text-on-surface text-lg font-bold">This Week's Progress</Text>
          <TouchableOpacity onPress={loadGoals} className="bg-primary-fixed px-3 py-1 rounded-full">
            <Text className="text-on-primary-fixed font-label-bold text-xs">Refresh</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="py-12 items-center justify-center">
            <ActivityIndicator size="large" color="#002da5" />
          </View>
        ) : (
          <View className="gap-6 mb-8">
            {goals.map((goal) => {
              const current = goal.progress_current ?? 0;
              const target = goal.progress_total || 1;
              const progress = (current / target) * 100;
              const isComplete = current >= target;
              
              return (
                <View key={goal.id} className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="font-headline-md text-on-surface font-bold text-base">{goal.title}</Text>
                    <Text className="font-body-md text-on-surface-variant text-sm">
                      {current} / {target} {goal.frequency || 'Weekly'}
                    </Text>
                  </View>
                  
                  <View className="w-full bg-surface-variant h-2 rounded-full mb-4">
                    <View 
                      className={`h-2 rounded-full ${isComplete ? 'bg-secondary' : 'bg-primary'}`} 
                      style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} 
                    />
                  </View>

                  {isComplete ? (
                    <View className="flex-row items-center">
                      <Ionicons name="trophy" size={16} color="#006d3a" className="mr-2" />
                      <Text className="font-label-bold text-secondary text-xs uppercase">Goal Reached!</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center justify-between mt-2">
                      <TouchableOpacity className="flex-1 bg-surface py-2 rounded-lg items-center border border-outline-variant mr-2">
                        <Text className="text-on-surface font-label-bold text-xs">{goal.frequency || 'Ongoing'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => {
                          setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, progress_current: Math.min(target, current + 1) } : g));
                        }}
                        className="flex-1 bg-primary py-2 rounded-lg items-center"
                      >
                        <Text className="text-white font-label-bold text-xs">Log Progress</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
