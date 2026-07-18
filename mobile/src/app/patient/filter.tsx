import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function FilterScreen() {
  const router = useRouter();
  const [selectedSpec, setSelectedSpec] = useState(['Anxiety', 'Stress']);
  const [minRating, setMinRating] = useState('4.5+');

  const specializations = ['Anxiety', 'Depression', 'Stress', 'Relationships', 'Trauma', 'Grief'];
  const ratings = ['3+', '4+', '4.5+'];

  const toggleSpec = (spec: string) => {
    if (selectedSpec.includes(spec)) {
      setSelectedSpec(selectedSpec.filter(s => s !== spec));
    } else {
      setSelectedSpec([...selectedSpec, spec]);
    }
  };

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-4 sticky top-0 bg-[#fbf8ff] z-10">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full border-[1.5px] border-ink-black bg-[#fbf8ff] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="close" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-ink-black font-bold text-xl">Filters</Text>
        <TouchableOpacity>
          <Text className="font-label-bold text-primary font-bold text-sm">Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ gap: 24, paddingBottom: 120 }}>
        
        {/* Specialization Section */}
        <View className="bg-white rounded-3xl p-6 border-[1.5px] border-ink-black flex-col gap-4">
          <Text className="font-headline-sm text-ink-black font-semibold text-xl">Specialization</Text>
          <View className="flex-row flex-wrap gap-3">
            {specializations.map((spec) => (
              <TouchableOpacity 
                key={spec} 
                onPress={() => toggleSpec(spec)}
                className={`px-4 py-2 rounded-full border-[1.5px] border-ink-black transition-colors ${selectedSpec.includes(spec) ? 'bg-primary' : 'bg-[#fbf8ff]'}`}
              >
                <Text className={`font-label-md text-sm ${selectedSpec.includes(spec) ? 'text-white' : 'text-on-surface'}`}>{spec}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range Section */}
        <View className="bg-[#ffdad6] rounded-3xl p-6 border-[1.5px] border-ink-black flex-col gap-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-headline-sm text-ink-black font-semibold text-xl">Price per session</Text>
            <Text className="font-label-bold text-ink-black font-bold text-sm">$50 - $150</Text>
          </View>
          <View className="py-4">
            <View className="w-full h-3 bg-[#ffe082] rounded-full border-[1.5px] border-ink-black relative justify-center">
              <View className="absolute w-6 h-6 rounded-full bg-white border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]" style={{ left: '50%', marginLeft: -12 }} />
            </View>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-on-surface-variant font-label-md text-sm">$0</Text>
            <Text className="text-on-surface-variant font-label-md text-sm">$300+</Text>
          </View>
        </View>

        {/* Language Dropdown Section */}
        <View className="bg-[#d9d9e6] rounded-3xl p-6 border-[1.5px] border-ink-black flex-col gap-4">
          <Text className="font-headline-sm text-ink-black font-semibold text-xl mb-2">Language</Text>
          <View className="relative w-full">
            <View className="w-full bg-white border-[1.5px] border-ink-black rounded-xl py-3 px-4 flex-row justify-between items-center">
              <Text className="font-body-md text-ink-black">English</Text>
              <Ionicons name="chevron-down" size={20} color="#1A1A1A" />
            </View>
          </View>
        </View>

        {/* Minimum Rating Section */}
        <View className="bg-white rounded-3xl p-6 border-[1.5px] border-ink-black flex-col gap-4">
          <Text className="font-headline-sm text-ink-black font-semibold text-xl mb-2">Minimum Rating</Text>
          <View className="flex-row items-center gap-4">
            {ratings.map((rating) => (
              <TouchableOpacity 
                key={rating}
                onPress={() => setMinRating(rating)}
                className={`w-12 h-12 items-center justify-center rounded-xl border-[1.5px] border-ink-black transition-all ${minRating === rating ? 'bg-[#fdd33f] shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-[#fbf8ff]'}`}
              >
                <Text className={`font-label-bold font-bold text-sm ${minRating === rating ? 'text-[#715b00]' : 'text-ink-black'}`}>{rating}</Text>
              </TouchableOpacity>
            ))}
            
            <View className="flex-row items-center gap-1 ml-auto">
              <Ionicons name="star" size={16} color="#fdd33f" />
              <Text className="font-label-bold text-ink-black font-bold text-sm">Selected</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View className="absolute bottom-0 w-full p-4 bg-[#fbf8ff]/90 border-t-[1.5px] border-transparent z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-full bg-primary py-4 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2"
        >
          <Text className="text-white font-headline-sm font-bold text-xl">Apply Filters</Text>
          <Ionicons name="arrow-forward" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
