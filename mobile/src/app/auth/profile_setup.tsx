import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BasicProfileSetupScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row items-center justify-between px-6 h-16 z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 items-center justify-center rounded-full active:bg-surface-container-low"
        >
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        <View className="w-10" />
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Progress Indicator */}
        <View className="flex-col gap-3 mb-8">
          <View className="flex-row justify-between items-end">
            <Text className="font-label-bold text-on-surface-variant font-bold uppercase tracking-wider text-xs">Step 1 of 8</Text>
            <Text className="font-label-md text-primary font-bold">Profile Setup</Text>
          </View>
          <View className="h-3 w-full rounded-full border-[1.5px] border-ink-black bg-surface-container-low overflow-hidden flex-row">
            <View className="h-full bg-secondary-container border-r-[1.5px] border-ink-black" style={{ width: '12.5%' }} />
          </View>
        </View>

        {/* Header */}
        <View className="text-center flex-col gap-2 mb-8 items-center">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl mb-2 text-center">Let's get to know you</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-md text-center">Setting up your profile helps us personalize your journey and connect you with the right resources.</Text>
        </View>

        {/* Form Card */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 md:p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
          
          {/* Avatar Selection */}
          <View className="flex-col items-center gap-3">
            <TouchableOpacity className="relative group cursor-pointer active:translate-x-[2px] active:translate-y-[2px]">
              <View className="w-32 h-32 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] bg-accent-sage items-center justify-center overflow-hidden active:shadow-none">
                <Ionicons name="person" size={64} color="#1A1A1A" />
              </View>
              <View className="absolute bottom-0 right-0 w-10 h-10 bg-secondary-fixed border-[1.5px] border-ink-black rounded-full items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="camera" size={20} color="#1A1A1A" />
              </View>
            </TouchableOpacity>
            <Text className="font-label-bold text-on-surface-variant font-bold mt-2">Choose an Avatar</Text>
          </View>

          {/* Input: Full Name */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Full Name</Text>
            <TextInput 
              className="bg-surface-container-low border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black focus:border-primary focus:bg-white"
              placeholder="e.g. Jane Doe"
              placeholderTextColor="#c4c5d8"
            />
          </View>

          {/* Textarea: Bio */}
          <View className="flex-col gap-2">
            <View className="flex-row justify-between">
              <Text className="font-label-bold text-ink-black font-bold">Bio / About Me</Text>
              <Text className="font-label-md text-outline">Optional</Text>
            </View>
            <TextInput 
              className="bg-surface-container-low border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black focus:border-primary focus:bg-white min-h-[100px] align-top"
              placeholder="Share a little bit about yourself, your interests, or what brings you here..."
              placeholderTextColor="#c4c5d8"
              multiline
              numberOfLines={4}
            />
          </View>

        </View>

        {/* Actions */}
        <View className="pt-6 mt-4">
          <TouchableOpacity 
            className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl p-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2"
          >
            <Text className="font-label-bold text-white font-bold text-lg">Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
