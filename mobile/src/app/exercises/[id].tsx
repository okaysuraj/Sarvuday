import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { exercisesApi } from '../../api/exercises';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [exercise, setExercise] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [phaseText, setPhaseText] = useState('Ready');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const data = await exercisesApi.getExerciseById(id as string);
        setExercise(data);
      } catch (error) {
        console.error('Error fetching exercise:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  // Breathing animation sequence
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        // Inhale
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 4000,
          useNativeDriver: true,
        }),
        // Hold
        Animated.delay(4000),
        // Exhale
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        // Hold
        Animated.delay(4000),
      ])
    ).start();
  };

  const stopAnimation = () => {
    scaleAnim.stopAnimation();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Phase text interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
      let idx = 0;
      setPhaseText(phases[idx]);
      interval = setInterval(() => {
        idx = (idx + 1) % phases.length;
        setPhaseText(phases[idx]);
      }, 4000);
    } else {
      setPhaseText('Ready');
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleExercise = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAnimation();
    } else {
      setIsPlaying(true);
      startAnimation();
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
    <View className="flex-1 bg-cream-bg pb-safe">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="flex-row items-center w-1/3">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full border-[1.5px] border-ink-black hover:bg-surface-container">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="font-headline-sm text-primary font-bold text-lg uppercase tracking-tighter">MindEase AI</Text>
        </View>
        <View className="flex-row justify-end w-1/3">
          <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink flex items-center justify-center">
             <Ionicons name="person" size={20} color="#1b1b20" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-6 py-10 items-center justify-center relative">
        <View className="w-full max-w-md bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col items-center gap-8 shadow-[4px_4px_0px_0px_#1A1A1A] z-10">
          
          <View className="items-center w-full">
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2 text-center">{exercise?.title || 'Box Breathing'}</Text>
            <Text className="font-body-lg text-on-surface-variant text-center">{exercise?.description || 'Focus on the circle. Follow the rhythm.'}</Text>
          </View>

          {/* Breathing Visualizer */}
          <View className="relative w-64 h-64 items-center justify-center my-8">
            <View className="absolute inset-0 rounded-full border-[2px] border-dashed border-ink-black opacity-30" />
            
            <Animated.View 
              style={{ transform: [{ scale: scaleAnim }] }}
              className="w-32 h-32 bg-accent-sage rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]"
            >
              <View className="absolute inset-2 border-[1.5px] border-ink-black rounded-full opacity-20" />
            </Animated.View>

            <View className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <View className="bg-white px-4 py-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-headline-sm text-ink-black font-bold text-xl">{phaseText}</Text>
              </View>
            </View>
          </View>

          {/* Controls */}
          <View className="w-full flex-col gap-4">
            <TouchableOpacity 
              onPress={toggleExercise}
              className={`w-full font-label-bold py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex-row items-center justify-center gap-2 active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${isPlaying ? 'bg-accent-orange' : 'bg-primary'}`}
            >
              <Ionicons name={isPlaying ? "stop" : "play"} size={24} color={isPlaying ? "#1A1A1A" : "#ffffff"} />
              <Text className={`font-headline-sm font-bold text-lg ${isPlaying ? 'text-ink-black' : 'text-white'}`}>
                {isPlaying ? 'Stop Exercise' : 'Start Exercise'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-4 w-full">
              <TouchableOpacity className="flex-1 bg-surface-container text-ink-black py-3 rounded-xl border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface-container text-ink-black py-3 rounded-xl border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                <Ionicons name="volume-medium-outline" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
