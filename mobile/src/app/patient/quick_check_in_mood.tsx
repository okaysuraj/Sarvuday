import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QuickCheckInMoodScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSave = () => {
    // In a real app, save checkin to backend
    router.replace('/patient/dashboard');
  };

  return (
    <View className="flex-1 bg-cream-bg">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 24, paddingBottom: 100 }}>
        
        {/* Decorative Memphis Elements */}
        <View className="absolute top-10 left-10 w-16 h-16 bg-accent-pink rounded-full border-[1.5px] border-ink-black hidden md:flex opacity-50" />
        <View className="absolute bottom-20 right-10 w-24 h-24 bg-secondary-container border-[1.5px] border-ink-black hidden md:flex opacity-50" style={{ transform: [{ rotate: '12deg' }] }} />
        
        <View className="w-full max-w-2xl bg-surface-container-lowest rounded-[32px] border-[1.5px] border-ink-black p-8 relative z-10 shadow-[4px_4px_0px_0px_#1A1A1A]">
          <View className="mb-8 text-center items-center">
            <Text className="font-display-lg-mobile md:font-display-lg text-primary font-bold text-3xl md:text-5xl mb-3">How are you feeling?</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg">Tap a mood sticker to check in.</Text>
          </View>

          {/* Mood Stickers Row */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8" contentContainerStyle={{ paddingHorizontal: 8, gap: 16 }}>
            {/* Mood: Great */}
            <TouchableOpacity 
              onPress={() => setSelectedMood('great')}
              className={`w-24 h-24 rounded-2xl bg-secondary-container border-[1.5px] border-ink-black flex-col items-center justify-center gap-2 ${selectedMood === 'great' ? 'shadow-none translate-x-[2px] translate-y-[2px] border-primary border-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <Text className="text-4xl">🤩</Text>
              <Text className="font-label-bold text-[#715b00] font-bold">Great</Text>
            </TouchableOpacity>

            {/* Mood: Good */}
            <TouchableOpacity 
              onPress={() => setSelectedMood('good')}
              className={`w-24 h-24 rounded-2xl bg-accent-sage border-[1.5px] border-ink-black flex-col items-center justify-center gap-2 ${selectedMood === 'good' ? 'shadow-none translate-x-[2px] translate-y-[2px] border-primary border-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <Text className="text-4xl">🙂</Text>
              <Text className="font-label-bold text-ink-black font-bold">Good</Text>
            </TouchableOpacity>

            {/* Mood: Okay */}
            <TouchableOpacity 
              onPress={() => setSelectedMood('okay')}
              className={`w-24 h-24 rounded-2xl bg-surface-variant border-[1.5px] border-ink-black flex-col items-center justify-center gap-2 ${selectedMood === 'okay' ? 'shadow-none translate-x-[2px] translate-y-[2px] border-primary border-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <Text className="text-4xl">😐</Text>
              <Text className="font-label-bold text-ink-black font-bold">Okay</Text>
            </TouchableOpacity>

            {/* Mood: Bad */}
            <TouchableOpacity 
              onPress={() => setSelectedMood('bad')}
              className={`w-24 h-24 rounded-2xl bg-accent-orange border-[1.5px] border-ink-black flex-col items-center justify-center gap-2 ${selectedMood === 'bad' ? 'shadow-none translate-x-[2px] translate-y-[2px] border-primary border-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <Text className="text-4xl">😔</Text>
              <Text className="font-label-bold text-ink-black font-bold">Bad</Text>
            </TouchableOpacity>

            {/* Mood: Awful */}
            <TouchableOpacity 
              onPress={() => setSelectedMood('awful')}
              className={`w-24 h-24 rounded-2xl bg-tertiary-fixed-dim border-[1.5px] border-ink-black flex-col items-center justify-center gap-2 ${selectedMood === 'awful' ? 'shadow-none translate-x-[2px] translate-y-[2px] border-primary border-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <Text className="text-4xl">😫</Text>
              <Text className="font-label-bold text-ink-black font-bold">Awful</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Optional Note Area */}
          <View className="mb-8">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-3">
              What's on your mind? <Text className="text-on-surface-variant text-base font-normal">(Optional)</Text>
            </Text>
            <TextInput
              className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black h-24"
              placeholder="Jot down a quick thought..."
              placeholderTextColor="#747687"
              multiline
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            onPress={handleSave}
            disabled={!selectedMood}
            className={`w-full ${!selectedMood ? 'bg-surface-variant' : 'bg-primary'} border-[1.5px] border-ink-black py-4 rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row justify-center items-center gap-2`}
          >
            <Text className={`${!selectedMood ? 'text-on-surface-variant' : 'text-white'} font-headline-sm font-bold text-lg`}>Save Check-in</Text>
            <Ionicons name="checkmark-circle" size={24} color={!selectedMood ? '#434655' : '#ffffff'} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
