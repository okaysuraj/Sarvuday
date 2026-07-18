import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResearchConsentScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top App Bar */}
      <View className="bg-surface border-b-[1.5px] border-ink-black flex-row justify-between items-center w-full px-4 py-4 sticky top-0 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 hover:bg-surface-variant/20 rounded-full active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="person-circle" size={32} color="#002da5" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Hero Section */}
        <View className="mb-10 text-center md:text-left items-center md:items-start">
          <View className="bg-secondary-container border-[1.5px] border-ink-black px-4 py-1 rounded-full mb-4">
            <Text className="font-label-bold text-ink-black font-bold uppercase">Community Science</Text>
          </View>
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-4 text-center md:text-left">Help us advance mental health research.</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg max-w-2xl text-center md:text-left">
            Your anonymized data contributes to a global database used by researchers to identify patterns and build better support systems for everyone.
          </Text>
        </View>

        {/* Sticker Grid */}
        <View className="flex-col md:flex-row flex-wrap gap-6 mb-10">
          
          {/* What we share */}
          <View className="flex-[1] md:min-w-[30%] bg-accent-pink rounded-[32px] p-6 md:p-8 flex-col gap-4 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-12 h-12 bg-surface rounded-full border-[1.5px] border-ink-black items-center justify-center mb-2">
              <Ionicons name="share-social" size={24} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">What we share</Text>
            <Text className="font-body-md text-on-surface-variant text-base flex-1">
              Aggregated mood trends, sleep metrics, and activity levels. We never share names, emails, or personal identifiers.
            </Text>
            <View className="mt-auto pt-4 flex-row flex-wrap gap-2">
              <View className="px-3 py-1 bg-surface border-[1px] border-ink-black rounded-full">
                <Text className="text-xs font-bold text-ink-black">ANONYMIZED</Text>
              </View>
              <View className="px-3 py-1 bg-surface border-[1px] border-ink-black rounded-full">
                <Text className="text-xs font-bold text-ink-black">ENCRYPTED</Text>
              </View>
            </View>
          </View>

          {/* Your privacy */}
          <View className="flex-[1] md:min-w-[30%] bg-accent-sage rounded-[40px] p-6 md:p-8 flex-col gap-4 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] lg:mt-6">
            <View className="w-12 h-12 bg-surface rounded-full border-[1.5px] border-ink-black items-center justify-center mb-2">
              <Ionicons name="shield-half" size={24} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Your privacy</Text>
            <Text className="font-body-md text-on-surface-variant text-base flex-1">
              You own your data. You can opt-out and request data deletion at any time with a single click in your settings.
            </Text>
            <View className="mt-auto pt-4">
              <View className="w-full bg-surface border-[1.5px] border-ink-black h-3 rounded-full overflow-hidden flex-row">
                <View className="bg-secondary h-full border-r-[1.5px] border-ink-black" style={{ width: '100%' }} />
              </View>
              <Text className="text-[10px] mt-1 font-bold text-ink-black">100% SECURE PROTECTION</Text>
            </View>
          </View>

          {/* Your impact */}
          <View className="flex-[1] md:min-w-[30%] bg-accent-orange rounded-[32px] p-6 md:p-8 flex-col gap-4 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] md:col-span-2 lg:col-span-1">
            <View className="w-12 h-12 bg-surface rounded-full border-[1.5px] border-ink-black items-center justify-center mb-2">
              <Ionicons name="heart" size={24} color="#002da5" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Your impact</Text>
            <Text className="font-body-md text-on-surface-variant text-base flex-1">
              Your contribution helps scientists develop predictive models for early intervention in anxiety and depression.
            </Text>
            <View className="w-full h-32 mt-4 rounded-xl border-[1.5px] border-ink-black bg-white items-center justify-center overflow-hidden">
              <Ionicons name="people" size={48} color="#002da5" opacity={0.5} />
            </View>
          </View>

        </View>

        {/* Call to Action Section */}
        <View className="flex-col items-center justify-center gap-6 py-8 border-t-[1.5px] border-ink-black border-dashed">
          <TouchableOpacity className="bg-primary px-12 py-5 rounded-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Text className="font-headline-sm text-white font-bold text-xl">Join Research</Text>
          </TouchableOpacity>
          <View className="flex-col items-center gap-2 mt-2">
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold underline text-base">Read Full Participation Agreement</Text>
            </TouchableOpacity>
            <Text className="font-label-md text-on-surface-variant">Estimated reading time: 4 minutes</Text>
          </View>
        </View>

        {/* Trust Badges */}
        <View className="mt-10 flex-row flex-wrap justify-between gap-6 opacity-70">
          <View className="flex-col items-center gap-1 w-[40%] md:w-auto">
            <Ionicons name="checkmark-circle" size={32} color="#1A1A1A" />
            <Text className="font-label-bold text-[10px] text-ink-black font-bold">HIPAA COMPLIANT</Text>
          </View>
          <View className="flex-col items-center gap-1 w-[40%] md:w-auto">
            <Ionicons name="lock-closed" size={32} color="#1A1A1A" />
            <Text className="font-label-bold text-[10px] text-ink-black font-bold">AES-256 ENCRYPTION</Text>
          </View>
          <View className="flex-col items-center gap-1 w-[40%] md:w-auto">
            <Ionicons name="hammer" size={32} color="#1A1A1A" />
            <Text className="font-label-bold text-[10px] text-ink-black font-bold">ETHICS BOARD APPROVED</Text>
          </View>
          <View className="flex-col items-center gap-1 w-[40%] md:w-auto">
            <Ionicons name="earth" size={32} color="#1A1A1A" />
            <Text className="font-label-bold text-[10px] text-ink-black font-bold">GLOBAL STANDARDS</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
