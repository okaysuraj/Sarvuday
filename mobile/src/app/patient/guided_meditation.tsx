import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Slider } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function GuidedMeditationScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // 0-100

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top Navigation */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-[#fbf8ff] sticky top-0 z-50">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          <Ionicons name="close" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-ink-black font-bold text-xl tracking-tighter">SarvUday</Text>
        <View className="w-10 h-10" />
      </View>

      <View className="flex-1 items-center justify-center px-4 md:px-10 py-8 w-full max-w-4xl mx-auto">
        
        {/* Album Art / Sticker Container */}
        <View className="w-full max-w-[360px] aspect-square rounded-[32px] border-[1.5px] border-ink-black bg-accent-pink p-4 flex-col items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] mb-12 relative overflow-hidden group">
          <View className="absolute -right-8 -top-8 w-40 h-40 bg-white rounded-full border-[1.5px] border-ink-black opacity-50" />
          <View className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary-container rounded-full border-[1.5px] border-ink-black opacity-50" />
          
          <View className="relative z-10 w-48 h-48 rounded-[24px] border-[1.5px] border-ink-black bg-white overflow-hidden items-center justify-center">
            <Ionicons name="flower-outline" size={80} color="#ffdad6" />
          </View>

          <View className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Text className="font-label-bold text-ink-black font-bold uppercase text-[10px]">Meditation</Text>
          </View>
        </View>

        {/* Track Info */}
        <View className="text-center mb-6 items-center">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-2">Self-Compassion</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Guided by Dr. Aria Woods</Text>
        </View>

        {/* Player Controls */}
        <View className="w-full max-w-[400px] bg-white rounded-[24px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] relative">
          <View className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-accent-sage border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" />
          
          {/* Progress Bar */}
          <View className="mb-6">
            <View className="h-3 bg-surface-container border-[1.5px] border-ink-black rounded-full w-full flex-row overflow-hidden">
              <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: `${progress}%` }} />
            </View>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="font-label-md text-on-surface-variant text-sm">04:12</Text>
              <Text className="font-label-md text-on-surface-variant text-sm">12:00</Text>
            </View>
          </View>

          {/* Buttons */}
          <View className="flex-row justify-center items-center gap-6">
            <TouchableOpacity className="w-12 h-12 rounded-full items-center justify-center active:bg-surface-container">
              <Ionicons name="play-back" size={28} color="#1A1A1A" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full border-[1.5px] border-ink-black bg-primary items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform"
            >
              <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#ffffff" className="ml-1" />
            </TouchableOpacity>
            
            <TouchableOpacity className="w-12 h-12 rounded-full items-center justify-center active:bg-surface-container">
              <Ionicons name="play-forward" size={28} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Additional Action */}
        <TouchableOpacity className="mt-12 flex-row items-center justify-center gap-2 px-6 py-3 rounded-full border-[1.5px] border-ink-black bg-white shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform">
          <Ionicons name="heart-outline" size={20} color="#1A1A1A" />
          <Text className="font-label-bold text-ink-black font-bold text-sm">Save to Favorites</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
