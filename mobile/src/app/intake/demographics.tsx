import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AgeDemographicsScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const genders = [
    'Woman',
    'Man',
    'Non-binary',
    'Prefer to self-describe',
    'Prefer not to say'
  ];

  return (
    <View className="flex-1 bg-cream-bg items-center justify-center p-4">
      
      {/* Progress Indicator */}
      <View className="w-full max-w-lg mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-label-bold text-on-surface-variant font-bold">Step 2 of 8</Text>
          <Text className="font-label-md text-primary font-bold">Basic Info</Text>
        </View>
        <View className="w-full h-3 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
          <View className="h-full bg-accent-orange border-r-[1.5px] border-ink-black" style={{ width: '25%' }} />
        </View>
      </View>

      {/* Main Card */}
      <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] w-full max-w-lg p-6 md:p-8 flex-col gap-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
        
        {/* Decorative Memphis Element */}
        <View className="absolute -top-6 -right-6 w-24 h-24 bg-accent-sage rounded-full border-[1.5px] border-ink-black opacity-50 z-0" />
        <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-fixed rounded-xl border-[1.5px] border-ink-black rotate-12 opacity-50 z-0" />
        
        <View className="relative z-10">
          <Text className="font-display-lg-mobile text-primary font-bold text-4xl mb-3 tracking-tighter">A bit about you</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">This helps us personalize your mental wellness journey. You can skip what you don't feel like sharing.</Text>
        </View>

        <View className="flex-col gap-6 relative z-10">
          
          {/* Date of Birth */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Date of Birth</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Ionicons name="calendar" size={20} color="#434655" />
              </View>
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl pl-12 pr-4 py-3 font-body-md text-ink-black focus:border-primary"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#434655"
              />
            </View>
          </View>

          {/* Gender Identity */}
          <View className="flex-col gap-3">
            <Text className="font-label-bold text-ink-black font-bold">Gender Identity <Text className="text-outline text-sm font-normal">(Optional)</Text></Text>
            <View className="flex-row flex-wrap gap-2">
              {genders.map((gender) => (
                <TouchableOpacity 
                  key={gender}
                  onPress={() => setSelectedGender(gender)}
                  className={`px-4 py-2 border-[1px] border-ink-black rounded-full active:translate-x-[1px] active:translate-y-[1px] ${selectedGender === gender ? 'bg-primary' : 'bg-white'}`}
                >
                  <Text className={`font-label-md font-bold ${selectedGender === gender ? 'text-white' : 'text-ink-black'}`}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View className="flex-col gap-2">
            <Text className="font-label-bold text-ink-black font-bold">Location <Text className="text-outline text-sm font-normal">(Optional)</Text></Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Ionicons name="location" size={20} color="#434655" />
              </View>
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl pl-12 pr-4 py-3 font-body-md text-ink-black focus:border-primary"
                placeholder="City, Country"
                placeholderTextColor="#434655"
              />
            </View>
          </View>

          {/* Actions */}
          <View className="flex-col sm:flex-row gap-4 mt-2 pt-6 border-t-[1.5px] border-surface-variant">
            <TouchableOpacity 
              className="w-full sm:w-auto px-6 py-4 bg-cream-bg border-[1.5px] border-ink-black rounded-xl items-center justify-center active:bg-surface-variant"
            >
              <Text className="font-label-bold text-ink-black font-bold">Skip Optional</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-full sm:flex-1 px-6 py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] flex-row items-center justify-center gap-2 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Text className="font-label-bold text-white font-bold">Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </View>
  );
}
