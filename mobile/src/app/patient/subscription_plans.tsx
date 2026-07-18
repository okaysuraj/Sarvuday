import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SubscriptionPlansScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-surface border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant/20">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant/20">
          <Ionicons name="person-circle" size={28} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-12 max-w-7xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View className="items-center mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-4 text-center">Choose Your Journey</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg text-center max-w-2xl mx-auto">
            Flexible plans designed to support your mental well-being at every stage of growth. Transform your mindset with SarvUday.
          </Text>
        </View>

        {/* Pricing Tiers Grid */}
        <View className="flex-col md:flex-row items-stretch gap-6 mb-12">
          
          {/* FREE TIER */}
          <View className="flex-1 bg-surface border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col h-full relative">
            <View className="mb-6">
              <View className="self-start bg-accent-sage border-[1.5px] border-ink-black px-4 py-1 rounded-full mb-4">
                <Text className="font-label-bold text-ink-black uppercase font-bold text-xs">Standard</Text>
              </View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Free</Text>
              <View className="flex-row items-baseline mt-2">
                <Text className="font-display-lg text-primary font-bold text-4xl">$0</Text>
                <Text className="font-label-md text-on-surface-variant ml-2 text-base">/ month</Text>
              </View>
            </View>
            
            <View className="flex-grow flex-col gap-4 mb-8">
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Daily Mood Tracker</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Basic AI Journaling</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Community Support Groups</Text>
              </View>
              <View className="flex-row items-start gap-3 opacity-40">
                <View className="p-0.5">
                  <Ionicons name="close" size={18} color="#434655" />
                </View>
                <Text className="font-body-md text-on-surface-variant text-base flex-1">1-on-1 Therapist Access</Text>
              </View>
            </View>
            
            <View className="w-full py-4 bg-surface-variant border-[1.5px] border-ink-black rounded-xl items-center mt-auto">
              <Text className="text-on-surface-variant font-label-bold font-bold">Current Plan</Text>
            </View>
          </View>

          {/* PRO TIER (Featured) */}
          <View className="flex-1 bg-surface border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col h-full relative shadow-[4px_4px_0px_0px_#1A1A1A] scale-[1.02] z-10 md:mt-0 mt-4">
            <View className="absolute top-0 right-0 bg-secondary-container px-4 py-2 rounded-bl-[24px] rounded-tr-[30px] border-l-[1.5px] border-b-[1.5px] border-ink-black">
              <Text className="font-label-bold text-ink-black font-bold text-[10px]">MOST POPULAR</Text>
            </View>
            <View className="mb-6 mt-4">
              <View className="self-start bg-primary border-[1.5px] border-ink-black px-4 py-1 rounded-full mb-4">
                <Text className="font-label-bold text-white uppercase font-bold text-xs">Professional</Text>
              </View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Pro</Text>
              <View className="flex-row items-baseline mt-2">
                <Text className="font-display-lg text-primary font-bold text-4xl">$19</Text>
                <Text className="font-label-md text-on-surface-variant ml-2 text-base">/ month</Text>
              </View>
            </View>
            
            <View className="flex-grow flex-col gap-4 mb-8">
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Everything in Free</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Advanced AI Insights</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">2 Monthly Therapist Calls</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Priority Chat Support</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Custom Wellness Pathways</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={() => router.push('/patient/payment')}
              className="w-full py-4 bg-primary border-[1.5px] border-ink-black rounded-xl items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto"
            >
              <Text className="text-white font-label-bold font-bold">Upgrade to Pro</Text>
            </TouchableOpacity>
          </View>

          {/* ELITE TIER */}
          <View className="flex-1 bg-accent-pink/30 border-[1.5px] border-ink-black rounded-[32px] p-8 flex-col h-full relative overflow-hidden mt-4 md:mt-0">
            <View className="mb-6">
              <View className="self-start bg-tertiary-fixed border-[1.5px] border-ink-black px-4 py-1 rounded-full mb-4">
                <Text className="font-label-bold text-[#331019] uppercase font-bold text-xs">Ultimate</Text>
              </View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Elite</Text>
              <View className="flex-row items-baseline mt-2">
                <Text className="font-display-lg text-primary font-bold text-4xl">$49</Text>
                <Text className="font-label-md text-on-surface-variant ml-2 text-base">/ month</Text>
              </View>
            </View>
            
            <View className="flex-grow flex-col gap-4 mb-8">
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Everything in Pro</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Unlimited Therapist Access</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Family Member Access (Up to 3)</Text>
              </View>
              <View className="flex-row items-start gap-3">
                <View className="bg-secondary-container rounded-full border border-ink-black p-0.5">
                  <Ionicons name="checkmark" size={16} color="#725c00" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Personalized Meds Tracking</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={() => router.push('/patient/payment')}
              className="w-full py-4 bg-secondary-container border-[1.5px] border-ink-black rounded-xl items-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-auto"
            >
              <Text className="text-[#715b00] font-label-bold font-bold">Go Elite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comparative Feature List (Bento-style) */}
        <View className="mt-12">
          <Text className="font-headline-md text-ink-black text-center mb-8 font-bold text-3xl">Why choose SarvUday?</Text>
          <View className="flex-col md:flex-row gap-6">
            <View className="flex-1 bg-surface border-[1.5px] border-ink-black p-6 rounded-[24px]">
              <Ionicons name="shield-checkmark" size={32} color="#002da5" className="mb-2" />
              <Text className="font-label-bold font-bold text-lg mb-2 text-ink-black">Privacy First</Text>
              <Text className="font-body-md text-on-surface-variant">AES-256 encryption for all your journals and personal data.</Text>
            </View>
            <View className="flex-[2] bg-accent-sage border-[1.5px] border-ink-black p-6 rounded-[24px]">
              <Ionicons name="hardware-chip" size={32} color="#002da5" className="mb-2" />
              <Text className="font-label-bold font-bold text-lg mb-2 text-ink-black">Clinical Grade AI</Text>
              <Text className="font-body-md text-on-surface-variant">Our AI models are trained on validated therapeutic frameworks including CBT, DBT, and ACT to provide high-quality support.</Text>
            </View>
            <View className="flex-1 bg-surface border-[1.5px] border-ink-black p-6 rounded-[24px]">
              <Ionicons name="checkmark-circle" size={32} color="#002da5" className="mb-2" />
              <Text className="font-label-bold font-bold text-lg mb-2 text-ink-black">Expert Vetted</Text>
              <Text className="font-body-md text-on-surface-variant">All therapists are licensed professionals with 5+ years experience.</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation (Mobile Only) */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-[80px] px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="hardware-chip" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
