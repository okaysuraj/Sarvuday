import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SuggestedActionsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-background border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-high text-primary">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-display-lg-mobile md:font-display-lg text-primary font-bold text-3xl tracking-tight">MindEase</Text>
        </View>
        <View className="flex-row items-center gap-4">
          {/* Navigation Links for Desktop */}
          <View className="hidden md:flex flex-row gap-6 mr-6">
            <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high">
              <Text className="font-label-bold text-primary font-bold">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high">
              <Text className="font-label-bold text-on-surface-variant font-bold">AI Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high">
              <Text className="font-label-bold text-on-surface-variant font-bold">Meet</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high">
              <Text className="font-label-bold text-on-surface-variant font-bold">Profile</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 pt-8 pb-32 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-12">
          <Text className="font-headline-md text-on-background font-bold text-3xl mb-2">Suggested Actions</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Here are a few things you can do right now to check in with yourself.</Text>
        </View>

        <View className="flex-col md:flex-row flex-wrap gap-6 justify-between">
          
          {/* Talk Category */}
          <View className="w-full lg:w-[31%] flex-col gap-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="chatbubbles" size={24} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Talk</Text>
            </View>

            {/* Action Card 1 */}
            <TouchableOpacity className="w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-col gap-4 overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-accent-pink rounded-bl-full -mr-16 -mt-16 z-0" />
              <View className="w-12 h-12 rounded-full bg-accent-pink border-[1.5px] border-ink-black items-center justify-center z-10">
                <Ionicons name="hardware-chip" size={24} color="#1A1A1A" />
              </View>
              <View className="z-10">
                <Text className="font-headline-sm text-on-background font-bold text-xl mb-1">Chat with AI</Text>
                <Text className="font-body-md text-on-surface-variant text-base">Unload your thoughts in a safe space.</Text>
              </View>
            </TouchableOpacity>

            {/* Action Card 2 */}
            <TouchableOpacity className="w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-col gap-4 overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full -mr-16 -mt-16 z-0" />
              <View className="w-12 h-12 rounded-full bg-secondary-container border-[1.5px] border-ink-black items-center justify-center z-10">
                <Ionicons name="call" size={24} color="#1A1A1A" />
              </View>
              <View className="z-10">
                <Text className="font-headline-sm text-on-background font-bold text-xl mb-1">Call Therapist</Text>
                <Text className="font-body-md text-on-surface-variant text-base">Schedule or start an immediate session.</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Exercise Category */}
          <View className="w-full lg:w-[31%] flex-col gap-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="body" size={24} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Exercise</Text>
            </View>

            {/* Action Card 3 */}
            <TouchableOpacity className="w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-col gap-4 overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-accent-sage rounded-bl-full -mr-16 -mt-16 z-0" />
              <View className="w-12 h-12 rounded-full bg-accent-sage border-[1.5px] border-ink-black items-center justify-center z-10">
                <Ionicons name="leaf" size={24} color="#1A1A1A" />
              </View>
              <View className="z-10">
                <Text className="font-headline-sm text-on-background font-bold text-xl mb-1">5-min Breathing</Text>
                <Text className="font-body-md text-on-surface-variant text-base">Quick reset for your nervous system.</Text>
              </View>
            </TouchableOpacity>

            {/* Action Card 4 */}
            <TouchableOpacity className="w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-col gap-4 overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-accent-sage rounded-bl-full -mr-16 -mt-16 z-0" />
              <View className="w-12 h-12 rounded-full bg-accent-sage border-[1.5px] border-ink-black items-center justify-center z-10">
                <Ionicons name="headset" size={24} color="#1A1A1A" />
              </View>
              <View className="z-10">
                <Text className="font-headline-sm text-on-background font-bold text-xl mb-1">Guided Meditation</Text>
                <Text className="font-body-md text-on-surface-variant text-base">Focus your mind with gentle guidance.</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Learn Category */}
          <View className="w-full lg:w-[31%] flex-col gap-6">
            <View className="flex-row items-center gap-2">
              <Ionicons name="book" size={24} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Learn</Text>
            </View>

            {/* Action Card 5 */}
            <TouchableOpacity className="w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-col gap-4 overflow-hidden">
              <View className="absolute top-0 right-0 w-32 h-32 bg-accent-orange rounded-bl-full -mr-16 -mt-16 z-0" />
              <View className="w-12 h-12 rounded-full bg-accent-orange border-[1.5px] border-ink-black items-center justify-center z-10">
                <Ionicons name="document-text" size={24} color="#1A1A1A" />
              </View>
              <View className="z-10">
                <Text className="font-headline-sm text-on-background font-bold text-xl mb-1">Article on Anxiety</Text>
                <Text className="font-body-md text-on-surface-variant text-base">Understand triggers and coping mechanisms.</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        </View>
      </ScrollView>

      {/* BottomNavBar (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home" size={24} color="#002da5" />
          <Text className="font-label-bold text-ink-black font-bold text-[10px] mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubbles" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Meet</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
