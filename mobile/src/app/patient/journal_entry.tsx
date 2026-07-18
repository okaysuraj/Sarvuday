import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DailyJournalEntryScreen() {
  const router = useRouter();
  const [entry, setEntry] = useState('');

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-cream-bg"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TopAppBar */}
      <View className="w-full bg-cream-bg border-b-[1.5px] border-ink-black px-4 md:px-10 py-4 flex-row items-center justify-between sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full hover:bg-surface-variant active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full hover:bg-surface-variant active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="settings-outline" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      {/* Main Content Canvas */}
      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Section: Date & Mood */}
        <View className="flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <View>
            <Text className="font-label-bold text-outline font-bold uppercase tracking-widest mb-1 text-xs">Thursday, Oct 26</Text>
            <Text className="font-headline-md text-ink-black font-bold text-3xl">Daily Reflection</Text>
          </View>
          
          {/* Mood Tags */}
          <View className="flex-row items-center gap-2">
            <Text className="font-label-md text-on-surface-variant">Feeling:</Text>
            <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-full px-3 py-1 flex-row items-center gap-1">
              <Ionicons name="happy" size={18} color="#1A1A1A" />
              <Text className="font-label-md text-ink-black font-bold">Peaceful</Text>
            </View>
          </View>
        </View>

        {/* Prompt of the Day Bubble */}
        <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] p-6 relative shadow-[4px_4px_0px_0px_#1A1A1A] mb-6">
          {/* Decorative pin/sticker accent */}
          <View className="absolute -top-3 -right-3 w-8 h-8 bg-accent-pink border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] items-center justify-center transform rotate-12 z-10">
            <Ionicons name="pin" size={16} color="#1A1A1A" />
          </View>
          
          <View className="flex-row gap-4 items-start">
            <View className="bg-white border-[1.5px] border-ink-black rounded-full p-2 hidden sm:flex shrink-0">
              <Ionicons name="bulb" size={24} color="#002da5" />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black font-bold mb-1 uppercase tracking-wider text-xs">Prompt of the Day</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">What made you smile today, even just a little bit?</Text>
            </View>
          </View>
        </View>

        {/* Journal Entry Area (The Paper Sticker) */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] flex-col overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] min-h-[400px]">
          {/* Paper Header/Binding effect */}
          <View className="h-10 border-b-[1.5px] border-ink-black bg-accent-orange/30 flex-row items-center px-6 gap-2">
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
          </View>
          
          {/* Text Area */}
          <TextInput 
            className="flex-1 p-6 font-body-lg text-ink-black text-lg bg-transparent"
            placeholder="Start writing here... Let your thoughts flow without judgment."
            placeholderTextColor="#747687"
            multiline
            textAlignVertical="top"
            value={entry}
            onChangeText={setEntry}
          />
          
          {/* Bottom formatting bar */}
          <View className="border-t-[1.5px] border-ink-black bg-surface-variant/50 p-2 flex-row justify-end px-4 gap-2">
            <TouchableOpacity className="p-2 rounded hover:bg-surface-dim">
              <Ionicons name="image-outline" size={20} color="#434655" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded hover:bg-surface-dim">
              <Ionicons name="text-outline" size={20} color="#434655" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="absolute bottom-0 left-0 w-full z-50 bg-white border-t-[1.5px] border-ink-black px-4 py-4 flex-row justify-end pb-8">
        <TouchableOpacity 
          onPress={() => router.push('/patient/dashboard')}
          className="bg-primary px-8 py-3 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2"
        >
          <Text className="text-white font-label-bold font-bold text-base">Save Entry</Text>
          <Ionicons name="checkmark" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
