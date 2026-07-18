import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AIMoodAnalysisScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full top-0 bg-background border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="settings" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Page Header */}
        <View className="flex-col gap-3 items-start mb-8">
          <View className="inline-flex items-center justify-center bg-[#f4b6c1] rounded-full px-3 py-1 border-[1.5px] border-ink-black">
            <Text className="font-label-bold text-ink-black font-bold">Analysis Complete</Text>
          </View>
          <Text className="font-headline-md text-ink-black font-bold text-3xl">Your Mood Profile</Text>
        </View>

        {/* AI Summary Card */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 mb-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          <View className="absolute top-0 right-0 w-32 h-32 bg-[#dde1ff] rounded-bl-[100px] opacity-50 z-0" />
          
          <View className="relative z-10 flex-col gap-6">
            <View className="flex-row items-center gap-3">
              <View className="w-12 h-12 rounded-full bg-primary flex items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="hardware-chip" size={24} color="#ffffff" />
              </View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">AI Summary</Text>
            </View>
            <View className="bg-surface-container rounded-xl p-4 border-[1px] border-outline-variant">
              <Text className="font-body-lg text-on-surface-variant text-lg">
                "It sounds like you're feeling balanced today, though a bit nostalgic. Your entry showed a strong foundation of calm, with moments reflecting thoughtfully on past experiences."
              </Text>
            </View>
          </View>
        </View>

        {/* Emotion Breakdown */}
        <View className="flex-col gap-6 mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl">Detected Emotions</Text>
          <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            
            {/* Calm */}
            <View className="flex-col gap-2 mb-6">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest font-bold">Calm</Text>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">70%</Text>
              </View>
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-full h-3 relative overflow-hidden">
                <View className="absolute top-0 left-0 h-full bg-[#dde1ff] border-r-[1.5px] border-ink-black" style={{ width: '70%' }} />
              </View>
            </View>

            {/* Reflective */}
            <View className="flex-col gap-2 mb-6">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest font-bold">Reflective</Text>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">20%</Text>
              </View>
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-full h-3 relative overflow-hidden">
                <View className="absolute top-0 left-0 h-full bg-[#ffe082] border-r-[1.5px] border-ink-black" style={{ width: '20%' }} />
              </View>
            </View>

            {/* Tense */}
            <View className="flex-col gap-2">
              <View className="flex-row justify-between items-end">
                <Text className="font-label-bold text-ink-black uppercase tracking-widest font-bold">Tense</Text>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">10%</Text>
              </View>
              <View className="w-full bg-surface-variant border-[1.5px] border-ink-black rounded-full h-3 relative overflow-hidden">
                <View className="absolute top-0 left-0 h-full bg-[#ffdad6] border-r-[1.5px] border-ink-black" style={{ width: '10%' }} />
              </View>
            </View>

          </View>
        </View>

        {/* Action Area */}
        <View className="w-full items-center mb-8">
          <TouchableOpacity className="w-full md:w-auto px-8 py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
            <Ionicons name="save" size={24} color="#ffffff" />
            <Text className="font-label-bold text-white font-bold text-lg">Save to Journal</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
