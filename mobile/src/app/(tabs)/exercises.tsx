import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const filters = ['All', 'CBT', 'Breathing', 'Meditation'];

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="small" color="#18181B" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-background border-b border-outline">
        <View>
          <Text className="text-on-surface font-semibold text-base tracking-tight">Therapeutic Exercises</Text>
          <Text className="text-on-surface-variant text-xs">Evidence-based behavioral tools</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/profile')}
          className="w-8 h-8 rounded-full border border-outline bg-surface items-center justify-center"
        >
          <Ionicons name="person-outline" size={16} color="#18181B" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Overview Banner */}
        <View className="bg-surface border border-outline rounded-2xl p-5 mb-5">
          <Text className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider mb-1">Consistency Metric</Text>
          <Text className="text-on-surface text-lg font-bold tracking-tight mb-1">Daily Cognitive Toolkit</Text>
          <Text className="text-on-surface-variant text-xs leading-relaxed mb-4">
            Practice reframing thoughts and calming autonomic response patterns.
          </Text>

          <View className="flex-row gap-2">
            <View className="px-3 py-1 bg-secondary-container rounded-full flex-row items-center gap-1.5">
              <Ionicons name="flame-outline" size={14} color="#2E4B3E" />
              <Text className="text-on-secondary-container text-xs font-semibold">12-Day Streak</Text>
            </View>
            <View className="px-3 py-1 bg-surface-container rounded-full border border-outline">
              <Text className="text-on-surface-variant text-xs font-medium">8 Completed</Text>
            </View>
          </View>
        </View>

        {/* Category Filter Pills */}
        <View className="flex-row gap-2 mb-6">
          {filters.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full border ${
                filter === cat 
                  ? 'bg-primary border-primary' 
                  : 'bg-surface border-outline'
              }`}
            >
              <Text className={`text-xs font-medium ${filter === cat ? 'text-white' : 'text-on-surface'}`}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Exercises List */}
        <View className="flex-col gap-3">
          {filteredExercises.length === 0 ? (
            <View className="bg-surface border border-outline rounded-2xl p-8 items-center justify-center">
              <Text className="text-on-surface-variant text-xs">No exercises found for this category.</Text>
            </View>
          ) : (
            filteredExercises.map((exercise) => (
              <View 
                key={exercise.id} 
                className="bg-surface border border-outline rounded-2xl p-5 flex-col justify-between"
              >
                <View className="flex-row justify-between items-start mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="w-2 h-2 rounded-full bg-secondary" />
                    <Text className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider">
                      {exercise.category}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="time-outline" size={13} color="#6E6D7A" />
                    <Text className="text-on-surface-variant text-xs font-medium">
                      {exercise.duration_min} min
                    </Text>
                  </View>
                </View>

                <Text className="text-on-surface font-semibold text-base mb-1">{exercise.title}</Text>
                <Text className="text-on-surface-variant text-xs leading-relaxed mb-4">{exercise.description}</Text>

                <View className="flex-row items-center justify-between pt-3 border-t border-outline">
                  <Text className="text-[11px] text-on-surface-variant font-medium">
                    Difficulty: {exercise.difficulty === 1 ? 'Gentle' : 'Moderate'}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => {
                      if (exercise.category === 'Breathing') {
                        router.push('/patient/guided_meditation' as any);
                      } else {
                        router.push(`/patient/exercise_detail` as any);
                      }
                    }}
                    className="px-3.5 py-1.5 bg-primary rounded-lg"
                  >
                    <Text className="text-white text-xs font-medium">Start Practice →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

      </ScrollView>
    </View>
  );
}
