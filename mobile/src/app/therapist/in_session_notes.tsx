import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function InSessionNotesScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant text-primary">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md-mobile md:font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant md:hidden text-on-surface-variant">
          <Ionicons name="person-circle-outline" size={24} color="#434655" />
        </TouchableOpacity>
        <View className="w-10 hidden md:flex" />
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <View>
            <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Notes with Dr. Jenkins</Text>
            <View className="flex-row items-center gap-2 text-on-surface-variant">
              <Ionicons name="calendar" size={16} color="#434655" />
              <Text className="font-label-md text-sm">October 24, 2023 • 2:00 PM</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-primary rounded-xl border-[1.5px] border-ink-black px-6 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2">
            <Ionicons name="save-outline" size={20} color="#ffffff" />
            <Text className="font-label-bold text-white font-bold">Save Notes</Text>
          </TouchableOpacity>
        </View>

        {/* Bento Grid Layout */}
        <View className="flex-col md:flex-row gap-6">
          
          {/* Main Notepad Area */}
          <View className="flex-[2] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A] flex-col overflow-hidden min-h-[400px]">
            <View className="bg-accent-sage border-b-[1.5px] border-ink-black p-4 flex-row justify-between items-center z-10">
              <View className="flex-row items-center gap-2">
                <Ionicons name="pencil" size={24} color="#1A1A1A" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Reflections</Text>
              </View>
              <View className="flex-row gap-2">
                <TouchableOpacity className="w-8 h-8 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                  <Text className="font-bold text-ink-black text-sm">B</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-8 h-8 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                  <Text className="italic text-ink-black text-sm">I</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-6 flex-1 relative bg-white">
              {/* Note: React Native TextInput doesn't natively support repeating linear gradient background pattern like CSS lined-paper, so we use a plain white background or a flat color */}
              <TextInput 
                className="flex-1 w-full font-body-lg text-ink-black text-lg leading-loose"
                multiline
                textAlignVertical="top"
                placeholder="Start typing your thoughts here..."
                placeholderTextColor="#747687"
                defaultValue="Discussed the anxiety triggers around work deadlines. Need to remember to step back when feeling overwhelmed."
              />
            </View>
          </View>

          {/* Sidebar / Takeaways */}
          <View className="flex-[1] flex-col gap-6">
            
            {/* Key Takeaways Card */}
            <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-1">
              <View className="flex-row items-center gap-2 mb-4">
                <Ionicons name="pin" size={24} color="#1A1A1A" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Key Takeaways</Text>
              </View>
              <View className="flex-col gap-3">
                <View className="flex-row items-start gap-2">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-1" />
                  <Text className="font-body-md text-ink-black flex-1 text-base">Practice 5-4-3-2-1 grounding technique.</Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-1" />
                  <Text className="font-body-md text-ink-black flex-1 text-base">Journal 10 mins before bed.</Text>
                </View>
                <View className="flex-row items-start gap-2">
                  <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-1" />
                  <Text className="font-body-md text-ink-black flex-1 text-base">Set firm work-off hours.</Text>
                </View>
              </View>
              <View className="mt-6">
                <TextInput 
                  className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-3 font-body-md"
                  placeholder="Add a takeaway..."
                  placeholderTextColor="#747687"
                />
              </View>
            </View>

            {/* Mood Snapshot Mini Card */}
            <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-label-bold text-on-secondary-container font-bold text-xs uppercase tracking-wider mb-3">Post-Session Mood</Text>
              <View className="flex-row justify-between gap-2">
                <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                  <Ionicons name="sad-outline" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-surface items-center justify-center">
                  <Ionicons name="happy-outline" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-primary items-center justify-center transform scale-110 shadow-[4px_4px_0px_0px_#1A1A1A]">
                  <Ionicons name="happy" size={24} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-2" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubbles" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 -translate-y-2 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="calendar" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] font-bold text-[10px] mt-1">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
