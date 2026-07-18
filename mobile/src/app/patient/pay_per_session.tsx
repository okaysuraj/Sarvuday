import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PayPerSessionScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 py-4 w-full z-50 bg-surface border-b-[1.5px] border-ink-black sticky top-0">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="hover:bg-surface-variant/20 p-2 rounded-lg active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md text-primary font-bold text-xl tracking-tight">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="hover:bg-surface-variant/20 p-2 rounded-lg active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="person-circle" size={28} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-10 max-w-6xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Hero Section */}
        <View className="items-center mb-16 relative">
          <View className="px-6 py-2 bg-accent-sage border-[1.5px] border-ink-black rounded-full mb-6 shadow-[2px_2px_0px_0px_#1A1A1A] -rotate-1">
            <Text className="font-label-bold font-bold text-ink-black">PAY-PER-SESSION</Text>
          </View>
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-4 text-center">
            No commitment.{'\n'}Just care when you need it.
          </Text>
          <Text className="font-body-lg text-on-surface-variant text-lg text-center max-w-2xl mx-auto">
            Flexible therapy and wellness sessions tailored to your schedule. Choose the duration that fits your goals today.
          </Text>
          
          {/* Abstract Sticker Elements (hidden on small screens, simulated here with absolute positioning) */}
          <View className="hidden lg:flex absolute -top-10 -left-10 w-24 h-24 bg-secondary-container border-[1.5px] border-ink-black rounded-xl rotate-[1.5deg] shadow-[4px_4px_0px_0px_#1A1A1A]" />
          <View className="hidden lg:flex absolute top-20 -right-5 w-32 h-32 bg-accent-pink border-[1.5px] border-ink-black rounded-full -rotate-1 shadow-[4px_4px_0px_0px_#1A1A1A]" />
        </View>

        {/* Pricing Grid */}
        <View className="flex-col md:flex-row gap-6 mb-20">
          
          {/* 30 Min Card */}
          <View className="flex-1 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[48px] p-8 flex-col items-center shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-20 h-20 bg-accent-sage border-[1.5px] border-ink-black rounded-full flex-row items-center justify-center mb-6">
              <Ionicons name="timer-outline" size={36} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Intro Session</Text>
            <Text className="font-display-lg text-primary font-bold text-4xl mb-4">$45</Text>
            <Text className="font-label-md text-on-surface-variant mb-8 text-center text-sm">Perfect for quick check-ins or focus-based guidance.</Text>
            
            <View className="w-full flex-col gap-4 mb-10">
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">30-minute video call</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">1 focused goal</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Follow-up notes</Text>
              </View>
            </View>

            <TouchableOpacity className="w-full py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center mt-auto">
              <Text className="text-white font-label-bold font-bold uppercase tracking-widest">Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* 60 Min Card (Most Popular) */}
          <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[48px] p-8 flex-col items-center shadow-[4px_4px_0px_0px_#1A1A1A] -rotate-1 relative mt-4 md:mt-0 z-10 scale-[1.02]">
            <View className="absolute -top-4 bg-secondary-container border-[1.5px] border-ink-black rounded-lg px-4 py-1 z-20">
              <Text className="text-on-secondary-fixed font-label-bold font-bold text-xs">MOST POPULAR</Text>
            </View>
            <View className="w-20 h-20 bg-secondary-fixed-dim border-[1.5px] border-ink-black rounded-full flex-row items-center justify-center mb-6">
              <Ionicons name="time-outline" size={36} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Deep Dive</Text>
            <Text className="font-display-lg text-primary font-bold text-4xl mb-4">$80</Text>
            <Text className="font-label-md text-on-surface-variant mb-8 text-center text-sm">Our standard comprehensive session for regular therapy.</Text>
            
            <View className="w-full flex-col gap-4 mb-10">
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">60-minute video call</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Full intake/assessment</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Personalized worksheet</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Priority booking next time</Text>
              </View>
            </View>

            <TouchableOpacity className="w-full py-4 bg-secondary-container border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center mt-auto">
              <Text className="text-ink-black font-label-bold font-bold uppercase tracking-widest">Book Now</Text>
            </TouchableOpacity>
          </View>

          {/* 90 Min Card */}
          <View className="flex-1 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[48px] p-8 flex-col items-center shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-20 h-20 bg-accent-pink border-[1.5px] border-ink-black rounded-full flex-row items-center justify-center mb-6">
              <Ionicons name="infinite" size={36} color="#1A1A1A" />
            </View>
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-2">Full Clarity</Text>
            <Text className="font-display-lg text-primary font-bold text-4xl mb-4">$110</Text>
            <Text className="font-label-md text-on-surface-variant mb-8 text-center text-sm">Extended breakthroughs for couples or complex topics.</Text>
            
            <View className="w-full flex-col gap-4 mb-10">
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">90-minute video call</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Deep restorative practice</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Ionicons name="checkmark-circle" size={20} color="#ebc22e" />
                <Text className="font-body-md text-ink-black text-base">Resource toolkit (PDF)</Text>
              </View>
            </View>

            <TouchableOpacity className="w-full py-4 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center mt-auto">
              <Text className="text-white font-label-bold font-bold uppercase tracking-widest">Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bento Breakdown Section */}
        <View className="flex-col md:flex-row gap-6 mb-20">
          <View className="flex-[2] bg-accent-orange border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-6">What's in every session?</Text>
            <View className="flex-col md:flex-row gap-6">
              <View className="flex-1 flex-col gap-2">
                <Ionicons name="shield-checkmark" size={24} color="#002da5" />
                <Text className="font-label-bold text-ink-black font-bold text-base">100% Encrypted</Text>
                <Text className="text-sm opacity-80 text-ink-black">Your privacy is our core foundation.</Text>
              </View>
              <View className="flex-1 flex-col gap-2">
                <Ionicons name="shield-checkmark" size={24} color="#002da5" />
                <Text className="font-label-bold text-ink-black font-bold text-base">Certified Pros</Text>
                <Text className="text-sm opacity-80 text-ink-black">Vetted clinical therapists only.</Text>
              </View>
            </View>
          </View>
          
          <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-center items-center text-center">
            <Ionicons name="person" size={40} color="#5a3039" className="mb-4" />
            <Text className="font-label-bold text-ink-black font-bold text-base mt-4 mb-2">Custom Matching</Text>
            <Text className="text-sm text-ink-black">We find the right therapist for you.</Text>
          </View>
          
          <View className="flex-1 bg-secondary-fixed border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-center items-center text-center">
            <Ionicons name="card" size={40} color="#1A1A1A" className="mb-4" />
            <Text className="font-label-bold text-ink-black font-bold text-base mt-4 mb-2">Zero Sub Fee</Text>
            <Text className="text-sm text-ink-black">Only pay when you book. No surprises.</Text>
          </View>
        </View>

        {/* FAQ Quick Section */}
        <View className="max-w-3xl mx-auto w-full flex-col gap-4">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl text-center mb-8">Common Questions</Text>
          
          <TouchableOpacity 
            onPress={() => toggleFaq(0)}
            className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl p-4 active:bg-surface-variant/20"
          >
            <View className="flex-row justify-between items-center">
              <Text className="font-label-bold text-ink-black font-bold">Can I switch to a subscription later?</Text>
              <Ionicons name={expandedFaq === 0 ? "chevron-up" : "chevron-down"} size={24} color="#1A1A1A" />
            </View>
            {expandedFaq === 0 && (
              <Text className="mt-4 text-on-surface-variant font-body-md">
                Yes! Any single sessions you've booked can be applied as a credit toward your first month of a subscription plan if you decide to join within 30 days.
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleFaq(1)}
            className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl p-4 active:bg-surface-variant/20"
          >
            <View className="flex-row justify-between items-center">
              <Text className="font-label-bold text-ink-black font-bold">What is the cancellation policy?</Text>
              <Ionicons name={expandedFaq === 1 ? "chevron-up" : "chevron-down"} size={24} color="#1A1A1A" />
            </View>
            {expandedFaq === 1 && (
              <Text className="mt-4 text-on-surface-variant font-body-md">
                We require at least 24 hours' notice for a full refund. Cancellations made within 24 hours are subject to a 50% rescheduling fee.
              </Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* BottomNavBar (Mobile only) */}
      <View className="md:hidden absolute bottom-0 w-full h-[80px] bg-surface border-t-[1.5px] border-ink-black px-4 flex-row justify-around items-center z-50">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="flex-col items-center justify-center p-2">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="hardware-chip" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="calendar" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold mt-1">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center p-2">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
