import React, { useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();
  
  // Simple fade-in animation values
  const fadeAnim = new Animated.Value(0);
  const translateY = new Animated.Value(20);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      })
    ]).start();

    // Navigate to welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/auth/welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center p-4">
      <Animated.View 
        className="items-center justify-center w-full max-w-md mx-auto text-center"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY }]
        }}
      >
        
        {/* Playful Sticker Illustration */}
        <View className="mb-12 relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-secondary-container border-[1.5px] border-ink-black flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A]" style={{ transform: [{ rotate: '-5deg' }] }}>
          <Ionicons name="sunny" size={80} color="#1A1A1A" />
          
          {/* Decorative floating elements */}
          <View className="absolute -top-4 -right-4 w-8 h-8 bg-accent-pink rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" />
          <View className="absolute -bottom-2 -left-6 w-6 h-6 bg-accent-sage rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" />
        </View>

        {/* Brand Wordmark */}
        <Text 
          className="font-display-lg-mobile text-white font-bold text-5xl mb-6"
          style={{
            textShadowColor: '#1A1A1A',
            textShadowOffset: { width: 4, height: 4 },
            textShadowRadius: 0,
          }}
        >
          SarvUday
        </Text>

        {/* Subtitle/Tagline */}
        <Text className="font-body-lg text-white font-medium opacity-90 max-w-[280px] text-center text-lg">
          Your mind's brightest dawn.
        </Text>

      </Animated.View>

      {/* Loading Indicator */}
      <View className="absolute bottom-12 w-full flex-row justify-center gap-2">
        <View className="w-3 h-3 rounded-full bg-white border-[1.5px] border-ink-black" />
        <View className="w-3 h-3 rounded-full bg-accent-pink border-[1.5px] border-ink-black" />
        <View className="w-3 h-3 rounded-full bg-secondary-container border-[1.5px] border-ink-black" />
      </View>
    </View>
  );
}
