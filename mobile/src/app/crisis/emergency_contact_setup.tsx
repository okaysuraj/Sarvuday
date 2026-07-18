import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmergencyContactSetupScreen() {
  const router = useRouter();
  const [relationship, setRelationship] = useState('');

  return (
    <View className="flex-1 bg-cream-bg items-center justify-center p-4 md:p-10">
      
      {/* Progress Indicator */}
      <View className="w-full max-w-2xl mb-6 flex-row items-center justify-between">
        <Text className="font-label-bold text-[#747687] uppercase font-bold text-xs">Step 7 of 8</Text>
        <View className="flex-1 ml-6 h-[12px] border-[1.5px] border-ink-black rounded-full bg-surface-variant overflow-hidden">
          <View className="h-full bg-accent-orange" style={{ width: '87.5%' }} />
        </View>
      </View>

      {/* Main Container */}
      <View className="w-full max-w-2xl bg-white rounded-[32px] p-8 md:p-12 border-[1.5px] border-ink-black overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
        
        {/* Decorative Elements */}
        <View className="absolute -top-6 -right-6 w-24 h-24 bg-[#ffe082] rounded-full border-[1.5px] border-ink-black z-0" />
        <View className="absolute bottom-10 -left-4 w-12 h-12 bg-accent-pink rounded-lg transform rotate-12 border-[1.5px] border-ink-black z-0" />
        
        <View className="relative z-10">
          
          {/* Header */}
          <View className="mb-12 items-center">
            <View className="w-16 h-16 rounded-full bg-accent-sage border-[1.5px] border-ink-black items-center justify-center mb-6">
              <Ionicons name="medkit" size={32} color="#1A1A1A" />
            </View>
            <Text className="font-headline-md text-ink-black font-bold text-3xl mb-4 text-center md:text-5xl">Emergency Contact</Text>
            
            <View className="bg-accent-pink/30 rounded-xl p-4 border-[1.5px] border-ink-black flex-row items-start mt-6 max-w-md mx-auto">
              <Ionicons name="information-circle" size={24} color="#754650" className="mr-3 mt-1" />
              <Text className="font-body-md text-on-surface-variant flex-1 ml-3">
                We only use this information to ensure your safety during sessions. Your privacy is our priority, and we will never contact them unless absolutely necessary.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View className="flex-col gap-6 max-w-md mx-auto w-full">
            
            {/* Contact Name */}
            <View className="flex-col gap-2">
              <Text className="font-label-bold text-ink-black font-bold">Contact Name</Text>
              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <Ionicons name="person" size={20} color="#747687" />
                </View>
                <TextInput
                  className="w-full bg-[#f9f8f3] rounded-xl py-3 pl-12 pr-4 border-[1.5px] border-ink-black font-body-lg text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                  placeholder="Jane Doe"
                  placeholderTextColor="#747687"
                />
              </View>
            </View>

            {/* Relationship */}
            <View className="flex-col gap-2">
              <Text className="font-label-bold text-ink-black font-bold">Relationship</Text>
              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <Ionicons name="people" size={20} color="#747687" />
                </View>
                {/* Simulated Select Input for React Native */}
                <TouchableOpacity className="w-full bg-[#f9f8f3] rounded-xl py-3 pl-12 pr-10 border-[1.5px] border-ink-black">
                  <Text className="font-body-lg text-ink-black">Select relationship</Text>
                </TouchableOpacity>
                <View className="absolute right-4 z-10">
                  <Ionicons name="chevron-down" size={20} color="#747687" />
                </View>
              </View>
            </View>

            {/* Phone Number */}
            <View className="flex-col gap-2">
              <Text className="font-label-bold text-ink-black font-bold">Phone Number</Text>
              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <Ionicons name="call" size={20} color="#747687" />
                </View>
                <TextInput
                  className="w-full bg-[#f9f8f3] rounded-xl py-3 pl-12 pr-4 border-[1.5px] border-ink-black font-body-lg text-ink-black focus:border-primary focus:shadow-[2px_2px_0px_0px_#1A1A1A]"
                  placeholder="(555) 123-4567"
                  placeholderTextColor="#747687"
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Actions */}
            <View className="pt-6 flex-row gap-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="flex-1 bg-surface-container-highest rounded-xl border-[1.5px] border-ink-black py-4 items-center justify-center active:translate-x-[2px] active:translate-y-[2px]"
              >
                <Text className="font-label-bold text-ink-black font-bold">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => router.push('/(tabs)')}
                className="flex-[2] bg-primary rounded-xl border-[1.5px] border-ink-black py-4 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <Text className="font-label-bold text-white font-bold">Continue</Text>
                <Ionicons name="arrow-forward" size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </View>
  );
}
