import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BreathingExerciseScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [instruction, setInstruction] = useState('Ready');
  const [scale] = useState(new Animated.Value(1));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      const phases = [
        { text: 'Inhale', duration: 4000, scaleTo: 1.5 },
        { text: 'Hold', duration: 4000, scaleTo: 1.5 },
        { text: 'Exhale', duration: 4000, scaleTo: 1 },
        { text: 'Hold', duration: 4000, scaleTo: 1 }
      ];

      let phaseIndex = 0;

      const runPhase = () => {
        setInstruction(phases[phaseIndex].text);
        
        Animated.timing(scale, {
          toValue: phases[phaseIndex].scaleTo,
          duration: phases[phaseIndex].duration,
          useNativeDriver: true,
        }).start();

        phaseIndex = (phaseIndex + 1) % phases.length;
      };

      runPhase(); // Start immediately
      interval = setInterval(runPhase, 4000);
    } else {
      setInstruction('Ready');
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, scale]);

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50 md:border-b-0">
        <TouchableOpacity className="p-2 rounded-full border-[1.5px] border-ink-black active:bg-surface-container md:hidden" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        
        <View className="flex-1 justify-center items-center">
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>

        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Main Canvas */}
      <View className="flex-1 items-center justify-center px-4 py-8 relative">
        
        {/* Background Elements */}
        <View className="absolute top-20 left-10 w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-50 hidden md:flex" />
        <View className="absolute bottom-32 right-20 w-24 h-24 bg-secondary-container border-[1.5px] border-ink-black opacity-50 hidden md:flex" style={{ transform: [{ rotate: '12deg' }] }} />

        {/* Central Breathing Container */}
        <View className="w-full max-w-md bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col items-center shadow-[4px_4px_0px_0px_#1A1A1A] z-10">
          <View className="text-center w-full mb-6 items-center">
            <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-3">Box Breathing</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg">Focus on the circle. Follow the rhythm.</Text>
          </View>

          {/* Breathing Visualizer */}
          <View className="relative w-64 h-64 items-center justify-center my-8">
            <View className="absolute inset-0 rounded-full border-[1.5px] border-ink-black border-dashed opacity-30" />
            
            <Animated.View 
              className="w-32 h-32 bg-accent-sage rounded-full border-[1.5px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] z-20 relative"
              style={{ transform: [{ scale }] }}
            >
              <View className="absolute inset-2 border-[1.5px] border-ink-black rounded-full opacity-20" />
            </Animated.View>

            <View className="absolute inset-0 items-center justify-center z-30 pointer-events-none">
              <View className="bg-white px-4 py-2 rounded-xl border-[1.5px] border-ink-black shadow-sm">
                <Text className="font-headline-md text-ink-black font-bold text-xl">{instruction}</Text>
              </View>
            </View>
          </View>

          {/* Controls */}
          <View className="flex-col w-full gap-4 mt-6">
            <TouchableOpacity 
              className={`w-full py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2 ${isPlaying ? 'bg-accent-orange' : 'bg-primary'}`}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              <Ionicons name={isPlaying ? "stop" : "play"} size={24} color={isPlaying ? "#1A1A1A" : "#ffffff"} />
              <Text className={`font-label-bold font-bold text-lg ${isPlaying ? 'text-ink-black' : 'text-white'}`}>
                {isPlaying ? 'Stop Exercise' : 'Start Exercise'}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-4 w-full">
              <TouchableOpacity className="flex-1 bg-surface-container py-3 rounded-xl border-[1.5px] border-ink-black active:bg-surface-variant items-center justify-center">
                <Ionicons name="settings" size={24} color="#1A1A1A" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface-container py-3 rounded-xl border-[1.5px] border-ink-black active:bg-surface-variant items-center justify-center">
                <Ionicons name="volume-high" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    </View>
  );
}
