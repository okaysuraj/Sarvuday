import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MentalHealthDisclaimerScreen() {
  const router = useRouter();

  return (
    <View className="bg-cream-bg flex-1 justify-center items-center p-4">
      <View className="w-full max-w-md">
        
        {/* Sticker Card Container */}
        <View className="bg-accent-orange p-6 md:p-8 rounded-[24px] border-[1.5px] border-ink-black flex-col gap-6 relative overflow-hidden">
          
          {/* Decorative Elements */}
          <View className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-[1.5px] border-ink-black bg-white opacity-20" />
          <View className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border-[1.5px] border-ink-black bg-white opacity-20" />
          
          {/* Icon Header */}
          <View className="flex-row items-center gap-2 relative z-10">
            <View className="w-12 h-12 rounded-full bg-cream-bg border-[1.5px] border-ink-black flex items-center justify-center">
              <Ionicons name="warning" size={24} color="#1A1A1A" />
            </View>
          </View>

          {/* Content */}
          <View className="flex-col gap-3 relative z-10">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Important Disclaimer</Text>
            
            <View className="flex-col gap-3">
              <Text className="text-ink-black font-body-md text-base">
                SarvUday is designed to support your mental wellness journey through tracking, AI chat, and resources.
              </Text>
              
              <View className="bg-cream-bg/50 p-4 rounded-xl border border-ink-black/20">
                <Text className="font-bold text-ink-black font-body-md text-base">
                  This application is NOT a replacement for emergency crisis care, professional therapy, or medical treatment.
                </Text>
              </View>
              
              <Text className="text-ink-black font-body-md text-base">
                If you are experiencing a mental health emergency, experiencing thoughts of self-harm, or need immediate assistance, please contact your local emergency services or a crisis hotline immediately.
              </Text>
            </View>
          </View>

          {/* Action */}
          <View className="pt-3 relative z-10">
            <TouchableOpacity 
              onPress={() => router.push('/auth/consent')}
              className="w-full bg-primary py-4 px-6 rounded-full border-[1.5px] border-ink-black flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Text className="text-white font-label-bold font-bold text-base">I Understand</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

        </View>

        {/* Subtle help link below card */}
        <View className="mt-6 items-center">
          <TouchableOpacity onPress={() => router.push('/crisis/chat')}>
            <Text className="font-label-md text-outline font-bold text-sm hover:text-primary transition-colors underline">
              View Crisis Resources
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
