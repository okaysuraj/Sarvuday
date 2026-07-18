import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { exercisesApi } from '../../api/exercises';
import useAuthStore from '../../store/authStore';

export default function ExercisesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  
  const [exercises, setExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await exercisesApi.getExercises();
        setExercises(data || []);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const filteredExercises = filter === 'All' ? exercises : exercises.filter(ex => ex.category === filter);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const filters = ['All', 'CBT', 'Breathing', 'Meditation'];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="bg-cream-bg flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black z-50">
        <Text className="font-headline-md text-primary font-bold text-2xl uppercase tracking-tighter">MindEase AI</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-secondary-fixed flex items-center justify-center overflow-hidden">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Welcome Section & Summary Bento */}
        <View className="mb-8">
          <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[40px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-6">
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Your Mental Toolkit</Text>
            <Text className="font-body-lg text-on-surface-variant mb-6">You have {exercises.length} exercises assigned for today. Consistency is key to cognitive flexibility.</Text>
            <View className="flex-row flex-wrap gap-3">
              <View className="px-4 py-2 bg-accent-sage border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold">Daily Streak: 12 Days</Text>
              </View>
              <View className="px-4 py-2 bg-accent-pink border-[1.5px] border-ink-black rounded-full">
                <Text className="font-label-bold text-ink-black font-bold">30m Completed</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Category Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-4 px-4">
          <View className="flex-row gap-4 pb-2">
            {filters.map(f => (
              <TouchableOpacity 
                key={f}
                onPress={() => setFilter(f)}
                className={`px-6 py-2 border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${filter === f ? 'bg-primary' : 'bg-white'}`}
              >
                <Text className={`font-label-bold font-bold ${filter === f ? 'text-white' : 'text-ink-black'}`}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Exercise Cards Grid */}
        <View className="flex-col gap-6">
          {filteredExercises.map(ex => {
            const isCompleted = ex.status === 'Completed';
            const categoryColors: Record<string, string> = {
              'CBT': 'bg-accent-pink',
              'Breathing': 'bg-accent-sage',
              'Meditation': 'bg-secondary-container'
            };
            const catColor = categoryColors[ex.category] || 'bg-surface-variant';
            
            return (
              <TouchableOpacity 
                key={ex.id}
                onPress={() => router.push(`/exercises/${ex.id}`)}
                className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1A1A1A]"
              >
                <View className="flex-row justify-between items-start mb-6">
                  <View className={`px-4 py-1 border-[1.5px] border-ink-black rounded-full ${catColor}`}>
                    <Text className="font-label-bold text-ink-black font-bold text-xs">{ex.category}</Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={14} color="#434655" />
                    <Text className="font-label-md text-on-surface-variant">{ex.duration_min} min</Text>
                  </View>
                </View>
                
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">{ex.title}</Text>
                <Text className="font-body-md text-on-surface-variant mb-6" numberOfLines={2}>{ex.description}</Text>
                
                <View className="flex-col gap-4">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-label-bold text-xs uppercase tracking-wider text-outline">Difficulty:</Text>
                    <View className="flex-row gap-1">
                      {[1,2,3].map(level => (
                        <View key={level} className={`w-4 h-2 rounded-full border-[1px] border-ink-black ${level <= ex.difficulty ? 'bg-secondary' : 'bg-surface-variant'}`} />
                      ))}
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center gap-2">
                      <Ionicons name={isCompleted ? "checkmark-circle" : "time"} size={20} color={isCompleted ? "#10b981" : "#002da5"} />
                      <Text className={`font-label-bold font-bold ${isCompleted ? 'text-green-600' : 'text-primary'}`}>{ex.status}</Text>
                    </View>
                    <View className={`border-[1.5px] border-ink-black px-6 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A] ${isCompleted ? 'bg-surface-container opacity-70' : 'bg-primary'}`}>
                      <Text className={`font-label-bold font-bold ${isCompleted ? 'text-ink-black' : 'text-white'}`}>
                        {isCompleted ? 'Review' : 'Start'}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
