import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CBTExerciseModeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary tracking-tighter uppercase text-xl">Thought Record</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full border-[1.5px] border-ink-black bg-white active:bg-surface-variant">
          <Ionicons name="help" size={24} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Progress Bar */}
        <View className="mb-6 w-full">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-label-bold text-on-surface-variant font-bold">Step 2 of 5: The Evidence</Text>
            <Text className="font-label-bold text-primary font-bold">40%</Text>
          </View>
          <View className="w-full h-3 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
            <View className="h-full bg-secondary-container border-r-[1.5px] border-ink-black" style={{ width: '40%' }} />
          </View>
        </View>

        <View className="flex-col gap-6 pr-2">
          
          {/* Context Card */}
          <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-[24px] p-6 self-start max-w-[85%] relative">
            <View className="absolute -top-3 -left-3 bg-accent-sage border-[1.5px] border-ink-black rounded-full px-3 py-1">
              <Text className="font-label-bold text-ink-black font-bold text-xs">Step 1</Text>
            </View>
            <Text className="font-label-bold text-on-surface-variant font-bold mb-2 mt-2 uppercase tracking-wide">The Situation & Emotion</Text>
            <Text className="font-body-md text-ink-black text-base">"My manager asked for a meeting later today without context. I feel anxious (8/10)."</Text>
            
            <Text className="font-label-bold text-on-surface-variant font-bold mb-2 mt-4 uppercase tracking-wide">The Automatic Thought</Text>
            <Text className="font-body-md text-ink-black text-base">"I'm going to get fired."</Text>
          </View>

          {/* AI Message */}
          <View className="flex-row gap-4 self-start max-w-[85%]">
            <View className="w-10 h-10 rounded-full bg-primary-fixed border-[1.5px] border-ink-black items-center justify-center shrink-0">
              <Ionicons name="color-wand" size={20} color="#002da5" />
            </View>
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] rounded-tl-none p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-body-md text-ink-black text-base mb-2">Okay, let's examine that thought: <Text className="font-bold">"I'm going to get fired."</Text></Text>
              <Text className="font-body-md text-ink-black text-base">What is the factual evidence that supports this thought? What makes it seem true right now?</Text>
            </View>
          </View>

          {/* Interactive Exercise Input Card */}
          <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 self-end w-full md:w-[90%] shadow-[4px_4px_0px_0px_#1A1A1A] relative mt-4">
            
            <View className="absolute -top-4 right-8 bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 flex-row items-center gap-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="pencil" size={16} color="#725c00" />
              <Text className="font-label-bold text-ink-black font-bold">Your Turn</Text>
            </View>

            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-6 mt-4">List the evidence <Text className="underline decoration-ink-black decoration-2">FOR</Text> the thought:</Text>
            
            <View className="flex-col gap-4">
              
              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white shrink-0">
                  <Text className="font-label-bold text-ink-black font-bold">1</Text>
                </View>
                <TextInput 
                  className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-body-md text-ink-black"
                  value="I was late to work twice last week."
                  editable={false}
                />
              </View>

              <View className="flex-row items-center gap-3">
                <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center bg-white shrink-0">
                  <Text className="font-label-bold text-ink-black font-bold">2</Text>
                </View>
                <TextInput 
                  className="flex-1 bg-[#f9f8f3] border-[1.5px] border-primary rounded-xl px-4 py-3 font-body-md text-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]"
                  placeholder="Type here..."
                  placeholderTextColor="#434655"
                  autoFocus
                />
              </View>

              <TouchableOpacity className="flex-row items-center gap-2 mt-2 self-start active:opacity-70">
                <Ionicons name="add" size={20} color="#434655" />
                <Text className="font-label-bold text-on-surface-variant font-bold">Add another point</Text>
              </TouchableOpacity>

            </View>

            <View className="mt-8 flex-row justify-end">
              <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-xl px-6 py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2">
                <Text className="font-label-bold text-white font-bold text-lg">Continue to Evidence Against</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </ScrollView>
    </View>
  );
}
