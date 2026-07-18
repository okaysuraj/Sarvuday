import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EscalationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full z-50 bg-[#fbf8ff] sticky top-0">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-transform">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary tracking-tighter uppercase font-bold text-xl">MindEase AI</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 md:py-12 max-w-4xl mx-auto w-full" contentContainerStyle={{ gap: 48, paddingBottom: 100 }}>
        
        {/* Hero Intro */}
        <View className="items-center w-full max-w-3xl mx-auto flex-col gap-3">
          <Text className="font-display-lg text-ink-black font-bold text-3xl md:text-5xl text-center leading-tight">
            You don't have to navigate this <Text className="underline text-secondary-container decoration-[3px]">alone</Text>.
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-center pt-2 text-lg">
            Sometimes, an AI guide isn't quite enough. Speaking directly with a licensed human professional can provide the deep, personalized support you need to move forward.
          </Text>
        </View>

        {/* Primary Escalation Card: Therapist Profile */}
        <View className="bg-[#fdd33f] border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          {/* Decorative Elements */}
          <View className="absolute -top-12 -right-12 w-32 h-32 bg-[#ffd9df] rounded-full border-[1.5px] border-ink-black opacity-80" />
          <View className="absolute bottom-8 -left-6 w-16 h-16 bg-[#fbf8ff] rounded-lg border-[1.5px] border-ink-black opacity-80" style={{ transform: [{ rotate: '12deg' }] }} />

          <View className="relative z-10 flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            
            {/* Profile Image Container */}
            <View className="w-28 h-28 md:w-40 md:h-40 rounded-[24px] border-[1.5px] border-ink-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#1A1A1A] bg-[#d9d9e6]" style={{ transform: [{ rotate: '-2deg' }] }}>
              <Ionicons name="person" size={100} color="#1A1A1A" style={{ alignSelf: 'center', marginTop: 10 }} />
            </View>

            {/* Profile Info & CTA */}
            <View className="flex-1 flex-col gap-6 w-full">
              <View className="flex-col gap-1">
                <View className="flex-row items-center gap-2">
                  <Text className="font-headline-md text-ink-black font-bold text-2xl">Dr. Sarah Jenkins</Text>
                  <Ionicons name="checkmark-circle" size={28} color="#002da5" />
                </View>
                <Text className="font-label-bold text-[#715b00] uppercase tracking-widest font-bold">Licensed Clinical Psychologist</Text>
              </View>

              <View className="flex-col gap-3">
                <Text className="font-body-md text-on-surface font-medium">Benefits of professional care:</Text>
                <View className="flex-col gap-2">
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" style={{ marginTop: 2 }} />
                    <Text className="font-body-md text-on-surface flex-1">Personalized coping strategies tailored to your specific needs.</Text>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" style={{ marginTop: 2 }} />
                    <Text className="font-body-md text-on-surface flex-1">A safe, confidential environment to unpack complex emotions.</Text>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" style={{ marginTop: 2 }} />
                    <Text className="font-body-md text-on-surface flex-1">Evidence-based treatments like CBT and DBT.</Text>
                  </View>
                </View>
              </View>

              <View className="pt-2">
                <TouchableOpacity className="w-full md:w-auto bg-primary border-[1.5px] border-ink-black rounded-xl py-4 px-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-transform flex-row items-center justify-center gap-3" onPress={() => router.push('/patient/therapist_list')}>
                  <Ionicons name="calendar" size={24} color="#ffffff" />
                  <Text className="text-white font-label-bold font-bold">View Booking Calendar</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>

        {/* Alternative Support: Crisis Banner */}
        <View className="bg-[#efedf4] border-[1.5px] border-ink-black rounded-[24px] p-8 flex-col md:flex-row items-center justify-between gap-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <View className="flex-row items-start md:items-center gap-4 w-full md:w-auto flex-1">
            <View className="w-12 h-12 rounded-full bg-[#ffdad6] border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="medkit" size={24} color="#ba1a1a" />
            </View>
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">In an immediate crisis?</Text>
              <Text className="font-body-md text-on-surface-variant mt-1">Free, confidential 24/7 support is available immediately.</Text>
            </View>
          </View>
          <TouchableOpacity className="w-full md:w-auto bg-white border-[1.5px] border-ink-black rounded-lg py-3 px-6 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform flex-row items-center justify-center gap-2">
            <Ionicons name="call" size={20} color="#1A1A1A" />
            <Text className="text-ink-black font-label-bold font-bold">Get Crisis Help</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
