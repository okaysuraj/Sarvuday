import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EmergencyHelpScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container">
            <Ionicons name="menu" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
          <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* SOS Trigger */}
        <View className="bg-error-container border-[1.5px] border-ink-black rounded-[48px] p-8 mb-8 items-center shadow-[4px_4px_0px_0px_#1A1A1A]">
          <Text className="font-headline-md text-[#93000a] font-bold text-3xl mb-2 text-center">Immediate Emergency?</Text>
          <Text className="font-body-lg text-[#93000a] text-center mb-8 max-w-sm">Press and hold the SOS button below for 3 seconds to alert emergency services and your primary contact.</Text>
          
          <TouchableOpacity className="w-40 h-40 rounded-full bg-[#ba1a1a] border-[2px] border-ink-black items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="medical" size={48} color="#ffffff" className="mb-2" />
            <Text className="font-label-bold text-white font-bold uppercase text-lg">SOS</Text>
          </TouchableOpacity>
        </View>

        {/* Helplines Grid */}
        <View className="flex-col md:flex-row gap-6 mb-8">
          
          <View className="flex-1 bg-white border-[1.5px] border-ink-black p-8 rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-4">
              <Ionicons name="shield" size={32} color="#ba1a1a" />
              <Text className="font-label-bold text-on-surface-variant uppercase font-bold">Local Services</Text>
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">911 Emergency</Text>
            <Text className="font-body-md text-on-surface-variant mb-6">Immediate police, fire, or medical assistance in the United States and Canada.</Text>
            
            <TouchableOpacity className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto">
              <Text className="font-label-bold text-white font-bold">CALL 911 NOW</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 bg-accent-sage border-[1.5px] border-ink-black p-8 rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-4">
              <Ionicons name="chatbox" size={32} color="#002da5" />
              <Text className="font-label-bold text-on-surface-variant uppercase font-bold">Text Based Support</Text>
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Crisis Text Line</Text>
            <Text className="font-body-md text-on-surface-variant mb-6">Text HOME to 741741 to connect with a Crisis Counselor 24/7. Free and confidential.</Text>
            
            <TouchableOpacity className="w-full bg-white border-[1.5px] border-ink-black rounded-xl py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto">
              <Text className="font-label-bold text-ink-black font-bold">TEXT "HOME"</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* 988 Lifeline */}
        <View className="bg-secondary-fixed border-[1.5px] border-ink-black p-8 rounded-[32px] flex-col md:flex-row items-center gap-8 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-1">
            <View className="flex-row items-center gap-3 mb-4">
              <Ionicons name="heart" size={32} color="#715b00" />
              <Text className="font-label-bold text-[#715b00] uppercase font-bold">National Helpline</Text>
            </View>
            <Text className="font-headline-sm text-[#715b00] font-bold text-2xl mb-2">988 Lifeline</Text>
            <Text className="font-body-md text-[#715b00] opacity-80">The 988 Lifeline provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.</Text>
          </View>
          
          <View className="flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            <TouchableOpacity className="bg-ink-black border-[1.5px] border-ink-black rounded-xl px-8 py-4 items-center active:translate-x-[2px] active:translate-y-[2px]">
              <Text className="font-label-bold text-white font-bold">CALL 988</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-8 py-4 items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <Text className="font-label-bold text-ink-black font-bold">CHAT ONLINE</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Map Context */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden mb-8">
          <View className="p-8 border-b-[1.5px] border-ink-black flex-row justify-between items-center">
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Nearest Help Centers</Text>
              <Text className="font-body-md text-on-surface-variant">Based on your current location: Los Angeles, CA</Text>
            </View>
            <Ionicons name="location" size={40} color="#002da5" />
          </View>
          
          <View className="h-64 bg-surface-container relative">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWe9ykPhZgxe3NNBQdVY6jWGYltSCcH00dLqmxHtGp-i0d35FO0bjOqzhDMsESNLySWxQ_PbhxJvjd_aJUAM0SM-YQ_8JfDSm9J4lfMz9RRxpjhaxRFBsDCI0yyswFYf1Dm-2k1ZMkrh_t8OZUrMKvLofh10AZxKfqD-5qa6-0yYjDuOG6At0bD6y824TIxZnnD55ZzD28ZUGJ1nELF33yXWChvMhhDnMOsi6WAJ0ICm3tmLZ-Xmlvpg' }} 
              className="w-full h-full opacity-50 grayscale"
            />
            <View className="absolute inset-0 items-center justify-center pointer-events-none">
              <View className="bg-white px-4 py-2 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] flex-row items-center gap-2">
                <View className="w-3 h-3 bg-primary rounded-full" />
                <Text className="font-label-bold text-ink-black font-bold">YOU ARE HERE</Text>
              </View>
            </View>
          </View>

          <View className="p-6 flex-col md:flex-row gap-4">
            <View className="p-4 bg-surface-container-low rounded-xl border-[1.5px] border-ink-black flex-1">
              <Text className="font-label-bold text-ink-black font-bold">Central Health Center</Text>
              <Text className="text-xs text-on-surface-variant mt-1">0.8 miles • Open 24h</Text>
            </View>
            <View className="p-4 bg-surface-container-low rounded-xl border-[1.5px] border-ink-black flex-1">
              <Text className="font-label-bold text-ink-black font-bold">Hope Memorial ER</Text>
              <Text className="text-xs text-on-surface-variant mt-1">1.4 miles • Open 24h</Text>
            </View>
            <View className="p-4 bg-surface-container-low rounded-xl border-[1.5px] border-ink-black flex-1">
              <Text className="font-label-bold text-ink-black font-bold">St. Jude Medical</Text>
              <Text className="text-xs text-on-surface-variant mt-1">2.1 miles • Open 24h</Text>
            </View>
          </View>
        </View>

        {/* Safe Contacts */}
        <View className="mb-8">
          <View className="flex-row items-center gap-2 mb-4">
            <Ionicons name="people" size={24} color="#002da5" />
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Primary Safe Contacts</Text>
          </View>

          <View className="flex-row flex-wrap gap-4">
            <TouchableOpacity className="bg-accent-pink border-[1.5px] border-ink-black px-6 py-4 rounded-2xl flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-white items-center justify-center">
                <Ionicons name="person" size={24} color="#1A1A1A" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold">Sarah (Mom)</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Direct Call Available</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-6 py-4 rounded-2xl flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
              <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                <Ionicons name="person" size={24} color="#1A1A1A" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold">Marcus</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Direct Call Available</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface-container border-[1.5px] border-dashed border-ink-black px-6 py-4 rounded-2xl flex-row items-center gap-4 active:bg-white">
              <Ionicons name="person-add" size={24} color="#002da5" />
              <Text className="font-label-bold text-ink-black font-bold">Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
