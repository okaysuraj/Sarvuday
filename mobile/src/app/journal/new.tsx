import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { trackingApi } from '../../api/tracking';
import { format } from 'date-fns';

export default function NewJournalEntryScreen() {
  const router = useRouter();
  
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    
    setIsSaving(true);
    try {
      await trackingApi.submitJournal({ text: content });
      router.back();
    } catch (error) {
      console.error('Error saving journal:', error);
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-cream-bg pb-safe"
    >
      {/* Header */}
      <View className="w-full bg-background border-b-[1.5px] border-ink-black px-4 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="text-primary hover:bg-surface-variant transition-colors active:translate-x-[2px] active:translate-y-[2px] rounded-full p-2 flex items-center justify-center">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-display-lg-mobile text-primary font-bold text-xl uppercase tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="text-primary hover:bg-surface-variant transition-colors active:translate-x-[2px] active:translate-y-[2px] rounded-full p-2 flex items-center justify-center">
          <Ionicons name="settings-outline" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex-col gap-6">
        
        {/* Header Section: Date & Mood */}
        <View className="flex-col justify-between gap-4">
          <View>
            <Text className="font-label-bold text-outline font-bold text-xs uppercase tracking-widest mb-1">
              {format(new Date(), 'EEEE, MMM dd')}
            </Text>
            <Text className="font-headline-md text-ink-black font-bold text-3xl">Daily Reflection</Text>
          </View>
        </View>

        {/* Prompt of the Day Bubble */}
        <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] p-6 relative shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="absolute -top-3 -right-3 w-8 h-8 bg-accent-pink border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] flex items-center justify-center" style={{ transform: [{ rotate: '12deg' }] }}>
            <Ionicons name="pin" size={16} color="#1A1A1A" />
          </View>
          <View className="flex-row gap-4 items-start">
            <View className="bg-white border-[1.5px] border-ink-black rounded-full p-2">
              <Ionicons name="bulb-outline" size={20} color="#002da5" />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase tracking-wider mb-1">Prompt of the Day</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">What made you smile today, even just a little bit?</Text>
            </View>
          </View>
        </View>

        {/* Journal Entry Area */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] flex-1 flex-col relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] mt-4">
          <View className="h-10 border-b-[1.5px] border-ink-black bg-[#ffdad6] opacity-30 flex-row items-center px-6 gap-2">
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
            <View className="w-3 h-3 rounded-full border-[1.5px] border-ink-black bg-cream-bg" />
          </View>
          <TextInput 
            className="flex-1 p-6 font-body-lg text-ink-black text-lg text-justify align-top"
            placeholder="Start writing here... Let your thoughts flow without judgment."
            multiline
            textAlignVertical="top"
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#747687"
          />
        </View>
      </View>

      {/* Bottom Action Bar */}
      <View className="w-full bg-white border-t-[1.5px] border-ink-black px-6 py-4 flex-row justify-end">
        <TouchableOpacity 
          onPress={handleSave}
          disabled={!content.trim() || isSaving}
          className={`px-8 py-3 rounded-full border-[1.5px] border-ink-black flex-row items-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${!content.trim() || isSaving ? 'bg-surface-variant opacity-70' : 'bg-primary'}`}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <>
              <Text className="font-label-bold text-white font-bold text-sm">Save Entry</Text>
              <Ionicons name="checkmark" size={18} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
