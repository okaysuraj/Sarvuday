import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreatePostScreen() {
  const router = useRouter();
  const [selectedAlias, setSelectedAlias] = useState(0);

  const aliases = [
    { name: 'Friendly Bunny', icon: 'happy', bg: 'bg-secondary-container' },
    { name: 'Wild Flower', icon: 'leaf', bg: 'bg-surface' },
    { name: 'Quiet Cloud', icon: 'cloud', bg: 'bg-surface' },
    { name: 'Moon Seeker', icon: 'moon', bg: 'bg-surface' },
  ];

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 border-[1.5px] border-ink-black rounded-lg active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-primary text-xl">SarvUday</Text>
        </View>
        <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-lg px-6 py-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Text className="font-label-bold text-white font-bold">POST</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Title */}
        <View className="mb-6">
          <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4">Share Your Story</Text>
          <View className="bg-[#d9d9e6]/30 border-[1.5px] border-ink-black rounded-3xl p-6 flex-row gap-4 items-start">
            <View className="bg-secondary-container p-2 border-[1.5px] border-ink-black rounded-xl">
              <Ionicons name="bulb" size={24} color="#1A1A1A" />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black font-bold mb-1">Guidelines for Kind Communication</Text>
              <Text className="font-body-md text-on-surface-variant">Remember, your words have weight. Share with honesty, listen with empathy, and keep this space safe for everyone. We moderate all content to maintain a supportive environment.</Text>
            </View>
          </View>
        </View>

        {/* Text Area */}
        <View className="mb-6 relative">
          <View className="absolute inset-0 translate-x-2 translate-y-2 bg-ink-black rounded-[32px]" />
          <View className="relative w-full min-h-[300px] bg-white border-[1.5px] border-ink-black rounded-[32px] overflow-hidden">
            <TextInput
              multiline
              textAlignVertical="top"
              className="flex-1 p-6 font-body-lg text-lg text-on-surface focus:outline-none"
              placeholder="What's on your mind? Feel free to be yourself, anonymously..."
              placeholderTextColor="#747687"
            />
            <View className="absolute bottom-6 right-6 flex-row gap-2">
              <TouchableOpacity className="p-2 border-[1.5px] border-ink-black rounded-full active:bg-surface-container bg-white">
                <Ionicons name="image" size={24} color="#1A1A1A" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 border-[1.5px] border-ink-black rounded-full active:bg-surface-container bg-white">
                <Ionicons name="happy" size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Alias Selection */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="font-label-bold text-ink-black font-bold">Choose your Alias</Text>
            <Ionicons name="information-circle" size={24} color="#002da5" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row overflow-visible">
            {aliases.map((alias, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedAlias(idx)}
                className={`w-24 h-24 border-[1.5px] border-ink-black rounded-2xl flex-col items-center justify-center gap-2 mr-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${selectedAlias === idx ? 'bg-secondary-container' : 'bg-surface'}`}
              >
                <Ionicons name={alias.icon as any} size={32} color="#1A1A1A" />
                <Text className="font-label-md text-[10px] text-ink-black font-bold">{alias.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Toggles */}
        <View className="flex-col gap-4 mb-8">
          <View className="bg-accent-pink/20 border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-full items-center justify-center">
                <Ionicons name="chatbubbles" size={20} color="#002da5" />
              </View>
              <Text className="font-label-bold text-ink-black font-bold">Allow Comments</Text>
            </View>
            <View className="w-14 h-8 bg-secondary-container border-[1.5px] border-ink-black rounded-full justify-center px-[2px]">
              <View className="w-6 h-6 bg-white border-[1.5px] border-ink-black rounded-full translate-x-6" />
            </View>
          </View>
          
          <View className="bg-accent-orange/20 border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-white border-[1.5px] border-ink-black rounded-full items-center justify-center">
                <Ionicons name="eye-off" size={20} color="#002da5" />
              </View>
              <Text className="font-label-bold text-ink-black font-bold">Incognito Mode</Text>
            </View>
            <View className="w-14 h-8 bg-surface-variant border-[1.5px] border-ink-black rounded-full justify-center px-[2px]">
              <View className="w-6 h-6 bg-white border-[1.5px] border-ink-black rounded-full" />
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
