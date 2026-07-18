import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatSummaryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Mobile Top App Bar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full sticky top-0 z-50 bg-cream-bg border-b-[1.5px] border-ink-black h-16">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="items-center justify-center w-10 h-10 rounded-full active:bg-surface-container"
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold uppercase tracking-tighter text-lg">Summary</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section */}
        <View className="flex-col items-center text-center mt-4 mb-8">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2 text-center">Session Complete</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg text-center">Here's a summary of what we discussed today.</Text>
        </View>

        {/* Receipt Card Container */}
        <View className="w-full relative pb-4 max-w-lg mx-auto">
          <View className="bg-white border-t-[1.5px] border-l-[1.5px] border-r-[1.5px] border-ink-black rounded-t-3xl p-6 md:p-8 flex-col gap-6 relative">
            
            {/* Date & Duration */}
            <View className="flex-row justify-between items-center">
              <Text className="font-label-bold text-outline font-bold">Oct 24, 2023 • 2:30 PM</Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name="timer-outline" size={18} color="#747687" />
                <Text className="font-label-bold text-outline font-bold">45 min</Text>
              </View>
            </View>

            {/* Dotted Line */}
            <View className="border-b-[2px] border-dotted border-ink-black w-full h-[1px] my-1" />

            {/* Primary Mood */}
            <View className="flex-col gap-3">
              <Text className="font-label-bold text-outline font-bold uppercase">Detected Mood</Text>
              <View className="flex-row items-center gap-4">
                <View className="w-16 h-16 rounded-full bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                  <Ionicons name="happy" size={32} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <Text className="font-headline-sm text-ink-black font-bold text-xl">Reflective & Calm</Text>
                  <Text className="font-body-md text-on-surface-variant text-base">Shifted from anxious at start</Text>
                </View>
              </View>
            </View>

            {/* Dotted Line */}
            <View className="border-b-[2px] border-dotted border-ink-black w-full h-[1px] my-1" />

            {/* Key Themes (Chips) */}
            <View className="flex-col gap-3">
              <Text className="font-label-bold text-outline font-bold uppercase">Key Themes</Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="border-[1.5px] border-ink-black rounded-full px-3 py-1 flex-row items-center gap-1 bg-primary">
                  <Text className="font-label-md text-white font-bold">Work Stress</Text>
                </View>
                <View className="border-[1.5px] border-ink-black rounded-full px-3 py-1 flex-row items-center gap-1 bg-accent-sage">
                  <Text className="font-label-md text-ink-black font-bold">Boundary Setting</Text>
                </View>
                <View className="border-[1.5px] border-ink-black rounded-full px-3 py-1 flex-row items-center gap-1 bg-accent-pink">
                  <Text className="font-label-md text-ink-black font-bold">Sleep Quality</Text>
                </View>
              </View>
            </View>

            {/* Dotted Line */}
            <View className="border-b-[2px] border-dotted border-ink-black w-full h-[1px] my-1" />

            {/* Completed Exercises */}
            <View className="flex-col gap-3">
              <Text className="font-label-bold text-outline font-bold uppercase">Exercises Completed</Text>
              <View className="flex-col gap-4">
                <View className="flex-row items-start gap-3">
                  <Ionicons name="checkmark-circle" size={24} color="#002da5" className="mt-1" />
                  <View className="flex-1">
                    <Text className="font-label-bold text-ink-black font-bold text-base">4-7-8 Breathing</Text>
                    <Text className="font-body-md text-on-surface-variant text-sm">5 minutes • Reduced heart rate</Text>
                  </View>
                </View>
                <View className="flex-row items-start gap-3">
                  <Ionicons name="checkmark-circle" size={24} color="#002da5" className="mt-1" />
                  <View className="flex-1">
                    <Text className="font-label-bold text-ink-black font-bold text-base">Cognitive Reframing</Text>
                    <Text className="font-body-md text-on-surface-variant text-sm">Identified 2 automatic thoughts</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Dotted Line */}
            <View className="border-b-[2px] border-dotted border-ink-black w-full h-[1px] my-1" />

            {/* AI Insight */}
            <View className="bg-surface-container-low p-4 rounded-xl border-[1.5px] border-ink-black relative mt-3 ml-2">
              <View className="absolute -top-4 -left-4 bg-secondary-container w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="bulb" size={16} color="#1A1A1A" />
              </View>
              <Text className="font-body-md text-ink-black italic pl-2 text-base">"You seem to be making progress in recognizing when work stress spills over into your evening routine. Keep practicing that transition boundary."</Text>
            </View>

          </View>
          
          {/* Receipt Zigzag */}
          <View className="w-full h-4 border-b-[1.5px] border-l-[1.5px] border-r-[1.5px] border-ink-black bg-white" style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
        </View>

        {/* Action Buttons */}
        <View className="flex-col sm:flex-row gap-4 mt-8 w-full max-w-lg mx-auto pb-6">
          <TouchableOpacity 
            className="flex-1 bg-primary border-[1.5px] border-ink-black py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
          >
            <Ionicons name="share-social" size={20} color="#ffffff" />
            <Text className="font-label-bold text-white font-bold text-base">Share with Therapist</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-white border-[1.5px] border-ink-black py-4 rounded-xl active:bg-surface-container items-center justify-center mt-4 md:mt-0"
          >
            <Text className="font-label-bold text-ink-black font-bold text-base">Save to Journal</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
