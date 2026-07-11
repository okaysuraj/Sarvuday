import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../components/CustomButton';

export default function BreathingExerciseScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [isActive, setIsActive] = useState(false);
  
  // A simple animation scale to represent breathing
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    if (!isActive) {
      scaleAnim.stopAnimation();
      return;
    }

    const runBreathingCycle = () => {
      // Inhale (4s)
      setPhase('Inhale');
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        // Hold (7s)
        if (!isActive) return;
        setPhase('Hold');
        setTimeout(() => {
          if (!isActive) return;
          // Exhale (8s)
          setPhase('Exhale');
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 8000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }).start(() => {
            if (isActive) runBreathingCycle();
          });
        }, 7000);
      });
    };

    runBreathingCycle();
    
    return () => {
      scaleAnim.stopAnimation();
    };
  }, [isActive]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 bg-surface z-10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="close" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          4-7-8 Breathing
        </Text>
      </View>

      <View className="flex-1 items-center justify-center bg-surface">
        <Animated.View 
          className="w-48 h-48 bg-primary-fixed-dim rounded-full items-center justify-center absolute"
          style={{ transform: [{ scale: scaleAnim }], opacity: 0.3 }}
        />
        <View className="w-48 h-48 bg-primary rounded-full items-center justify-center z-10 shadow-lg border-4 border-surface">
          <Text className="font-headline-md text-white font-bold text-3xl">
            {isActive ? phase : 'Ready?'}
          </Text>
        </View>
      </View>

      <View className="p-8 bg-surface">
        <Text className="font-body-md text-on-surface-variant text-center mb-8">
          Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. This pattern reduces anxiety and helps you sleep.
        </Text>
        <CustomButton 
          title={isActive ? "Stop" : "Start Exercise"}
          onPress={() => setIsActive(!isActive)}
          className={isActive ? "bg-error" : "bg-primary"}
        />
      </View>
    </SafeAreaView>
  );
}
