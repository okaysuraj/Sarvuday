import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <View className="absolute top-10 left-10 w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-70" />
      <View className="absolute bottom-20 right-10 w-24 h-24 bg-secondary-container rounded-full border-[1.5px] border-ink-black opacity-70" style={{ transform: [{ rotate: '12deg' }] }} />
      <View className="absolute top-1/4 right-1/4 w-8 h-8 bg-primary rounded-sm border-[1.5px] border-ink-black opacity-40" style={{ transform: [{ rotate: '45deg' }] }} />

      {/* Main Content Container */}
      <View className="w-full max-w-lg mx-auto">
        
        {/* Sticker Container */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 md:p-8 flex-col items-center text-center gap-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative z-10">
          
          {/* Hero Illustration Placeholder */}
          <View className="w-full aspect-video bg-accent-sage rounded-xl border-[1.5px] border-ink-black overflow-hidden mb-4 items-center justify-center">
            <Ionicons name="people" size={64} color="#1A1A1A" />
          </View>

          {/* Typography */}
          <View className="flex-col gap-2 items-center text-center w-full">
            <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl text-center">Your journey to mental clarity starts here.</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg max-w-sm text-center">SarvUday offers a safe, structured space to explore your thoughts and build resilience.</Text>
          </View>

          {/* Actions */}
          <View className="flex-col w-full gap-4 mt-4">
            <TouchableOpacity 
              onPress={() => router.push('/auth/sign_up')}
              className="w-full bg-primary border-[1.5px] border-ink-black rounded-full py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
            >
              <Text className="font-label-bold text-white font-bold text-lg">Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => router.push('/auth/login')}
              className="w-full bg-white border-[1.5px] border-ink-black rounded-full py-4 active:bg-secondary-container active:translate-x-[2px] active:translate-y-[2px] items-center justify-center"
            >
              <Text className="font-label-bold text-ink-black font-bold text-lg">Log In</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </View>
  );
}
