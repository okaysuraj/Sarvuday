import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SupportEscalationScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white">
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text className="font-headline-sm font-bold text-primary text-xl tracking-tighter uppercase">MindEase AI</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-4xl mx-auto" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Intro */}
        <View className="items-center mb-12 max-w-3xl mx-auto">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl text-center leading-tight mb-4">
            You don't have to navigate this <Text className="text-secondary-container underline">alone</Text>.
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-center">
            Sometimes, an AI guide isn't quite enough. Speaking directly with a licensed human professional can provide the deep, personalized support you need to move forward.
          </Text>
        </View>

        {/* Primary Escalation Card */}
        <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden mb-8">
          
          {/* Decorative Elements */}
          <View className="absolute -top-12 -right-12 w-32 h-32 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-80" />
          <View className="absolute bottom-8 -left-6 w-16 h-16 bg-white rounded-lg border-[1.5px] border-ink-black rotate-12 opacity-80" />
          
          <View className="relative z-10 flex-col md:flex-row gap-8 items-center">
            
            <View className="w-40 h-40 shrink-0 rounded-[24px] border-[1.5px] border-ink-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_#1A1A1A] -rotate-2">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHrsfr2swv302npW8ZFi23T-lThYrtSH-gt6qtaPX_Aa2EvhPwADC5KTbSjlYhi950skYoeDFzrcQ-cphokFNBcFLEtUgNjhy2oUkeTOU5rnhH1z7hBSKpUVE53ws8SxReJihTqUAuJC0RreSo6M_tkFLeYQh1KADlyIRHj-Z76F2iQtK9_ECS7eDHHB3bIkpUbXB1mlNG8N530pesfyGo0jCzh6l_5w17rkkIqckHYGmdls-C9e5JpA' }}
                className="w-full h-full"
              />
            </View>

            <View className="flex-1 w-full">
              <View className="mb-6">
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-headline-md text-ink-black font-bold text-3xl">Dr. Sarah Jenkins</Text>
                  <Ionicons name="checkmark-circle" size={28} color="#002da5" />
                </View>
                <Text className="font-label-bold text-ink-black uppercase tracking-widest font-bold">Licensed Clinical Psychologist</Text>
              </View>
              
              <View className="mb-6">
                <Text className="font-body-md text-ink-black font-medium mb-3">Benefits of professional care:</Text>
                <View className="gap-2">
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-0.5" />
                    <Text className="font-body-md text-ink-black flex-1">Personalized coping strategies tailored to your specific needs.</Text>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-0.5" />
                    <Text className="font-body-md text-ink-black flex-1">A safe, confidential environment to unpack complex emotions.</Text>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Ionicons name="checkmark-circle" size={20} color="#002da5" className="mt-0.5" />
                    <Text className="font-body-md text-ink-black flex-1">Evidence-based treatments like CBT and DBT.</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="w-full md:w-auto bg-primary border-[1.5px] border-ink-black rounded-xl py-4 px-8 flex-row items-center justify-center gap-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Ionicons name="calendar" size={24} color="#ffffff" />
                <Text className="font-label-bold text-white font-bold">View Booking Calendar</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>

        {/* Alternative Support */}
        <View className="bg-surface-container border-[1.5px] border-ink-black rounded-[24px] p-8 flex-col md:flex-row items-center justify-between gap-6 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <View className="flex-row items-center gap-4 w-full md:w-auto flex-1">
            <View className="w-12 h-12 shrink-0 rounded-full bg-[#ffdad6] border-[1.5px] border-ink-black items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="warning" size={24} color="#ba1a1a" />
            </View>
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">In an immediate crisis?</Text>
              <Text className="font-body-md text-on-surface-variant mt-1">Free, confidential 24/7 support is available immediately.</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={() => router.push('/crisis/resources')}
            className="w-full md:w-auto shrink-0 bg-white border-[1.5px] border-ink-black rounded-lg py-3 px-6 flex-row items-center justify-center gap-2 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Ionicons name="call" size={20} color="#1A1A1A" />
            <Text className="font-label-bold text-ink-black font-bold">Get Crisis Help</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
