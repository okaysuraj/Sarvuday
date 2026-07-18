import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TriggerStressFactorsScreen() {
  const router = useRouter();
  const [selectedStressors, setSelectedStressors] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');

  const toggleStressor = (stressor: string) => {
    setSelectedStressors(prev => 
      prev.includes(stressor) ? prev.filter(s => s !== stressor) : [...prev, stressor]
    );
  };

  const handleNext = () => {
    // Save selections and go next
    router.replace('/patient/dashboard');
  };

  const StressorItem = ({ value, label, iconName, bgColor }: { value: string, label: string, iconName: keyof typeof Ionicons.glyphMap, bgColor: string }) => {
    const isSelected = selectedStressors.includes(value);
    
    return (
      <TouchableOpacity 
        onPress={() => toggleStressor(value)}
        className={`w-full bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col items-center justify-center gap-4 ${isSelected ? 'bg-[#ffe082] shadow-none translate-x-[2px] translate-y-[2px]' : 'shadow-[4px_4px_0px_0px_#1A1A1A]'} transition-all`}
      >
        <View className={`w-16 h-16 rounded-full flex items-center justify-center border-[1.5px] border-ink-black ${bgColor}`}>
          <Ionicons name={iconName} size={32} color="#1A1A1A" />
        </View>
        <Text className="font-headline-sm text-ink-black font-bold text-xl text-center">{label}</Text>
        
        {/* Check mark icon */}
        <View className={`absolute top-4 right-4 w-6 h-6 rounded-full border-[1.5px] border-ink-black bg-surface-container-lowest flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
          <Ionicons name="checkmark" size={16} color="#002da5" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row items-center justify-between px-4 h-16 w-full bg-cream-bg border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl">SarvUday</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Progress Indicator */}
        <View className="mb-8 w-full flex-col items-center">
          <Text className="font-label-bold text-outline mb-2 uppercase font-bold text-xs">Step 6 of 8</Text>
          <View className="w-full max-w-md h-3 border-[1.5px] border-ink-black rounded-full overflow-hidden bg-surface-container-lowest flex-row">
            <View className="h-full bg-secondary-fixed-dim border-r-[1.5px] border-ink-black" style={{ width: '75%' }} />
          </View>
        </View>

        {/* Header */}
        <View className="text-center items-center mb-8">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-3 text-center">What triggers your stress?</Text>
          <Text className="font-body-lg text-on-surface-variant max-w-2xl text-center text-lg">Select any areas that frequently cause you feeling overwhelmed. This helps us personalize your coping strategies.</Text>
        </View>

        {/* Stressor Chips */}
        <View className="flex-row flex-wrap justify-between gap-6 mb-8">
          <View className="w-[47%] md:w-[30%] mb-4">
            <StressorItem value="work" label="Work" iconName="briefcase-outline" bgColor="bg-accent-sage" />
          </View>
          <View className="w-[47%] md:w-[30%] mb-4">
            <StressorItem value="family" label="Family" iconName="home-outline" bgColor="bg-accent-pink" />
          </View>
          <View className="w-[47%] md:w-[30%] mb-4">
            <StressorItem value="health" label="Health" iconName="heart-outline" bgColor="bg-primary-fixed" />
          </View>
          <View className="w-[47%] md:w-[30%] mb-4">
            <StressorItem value="finances" label="Finances" iconName="card-outline" bgColor="bg-secondary-fixed" />
          </View>
          <View className="w-[47%] md:w-[30%] mb-4">
            <StressorItem value="social" label="Social" iconName="people-outline" bgColor="bg-accent-orange" />
          </View>

          {/* Other Text Input */}
          <View className="w-full md:w-[30%] mb-4">
            <View className="bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col items-start gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] h-full justify-center">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Other</Text>
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl px-4 py-3 font-body-md text-ink-black"
                placeholder="Type here..."
                placeholderTextColor="#747687"
                value={otherText}
                onChangeText={setOtherText}
              />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav / Actions */}
      <View className="md:hidden absolute bottom-0 left-0 w-full z-50 flex-row justify-between items-center px-4 py-4 bg-cream-bg border-t-[1.5px] border-ink-black">
        <TouchableOpacity onPress={() => router.back()} className="flex-col items-center justify-center px-6 py-2">
          <Ionicons name="chevron-back" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-xs mt-1">Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleNext} className="flex-col items-center justify-center bg-primary rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] px-6 py-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
          <Text className="font-label-bold text-white font-bold text-xs mt-1">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Desktop Actions */}
      <View className="hidden md:flex flex-row justify-between items-center w-full max-w-4xl mx-auto px-10 pb-12">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center justify-center gap-2 bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black px-6 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
          <Text className="font-label-bold text-ink-black font-bold text-sm">Previous</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleNext} className="flex-row items-center justify-center gap-2 bg-primary rounded-xl border-[1.5px] border-ink-black px-8 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Text className="font-label-bold text-white font-bold text-sm">Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
