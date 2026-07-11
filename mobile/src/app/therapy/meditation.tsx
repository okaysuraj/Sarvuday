import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function GuidedMeditationScreen() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-surface-container-highest">
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="chevron-down" size={32} color="#1b1b20" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center justify-center px-8">
        <View className="w-64 h-64 bg-primary-fixed-dim rounded-full items-center justify-center mb-12 shadow-lg">
          <Ionicons name="water" size={100} color="#002da5" />
        </View>

        <Text className="font-headline-md text-on-surface font-bold text-3xl mb-2 text-center">Body Scan for Sleep</Text>
        <Text className="font-body-md text-on-surface-variant text-base mb-12 text-center">By Dr. Sarah Jenkins</Text>

        {/* Progress Bar */}
        <View className="w-full mb-8">
          <View className="h-1 bg-surface-variant w-full rounded-full">
            <View className="h-1 bg-primary w-1/3 rounded-full" />
          </View>
          <View className="flex-row justify-between mt-2">
            <Text className="font-label-md text-on-surface-variant">03:42</Text>
            <Text className="font-label-md text-on-surface-variant">10:00</Text>
          </View>
        </View>

        {/* Controls */}
        <View className="flex-row items-center justify-center gap-8">
          <TouchableOpacity>
            <Ionicons name="play-back" size={32} color="#1b1b20" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-primary rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={40} color="#ffffff" style={{ marginLeft: isPlaying ? 0 : 4 }} />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Ionicons name="play-forward" size={32} color="#1b1b20" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
