import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ModerationWarningScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Top Navigation Bar */}
      <View className="bg-surface border-b-[1.5px] border-ink-black flex-row justify-between items-center w-full px-4 py-4 sticky top-0 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 hover:bg-surface-variant/20 rounded-full active:translate-x-[1px] active:translate-y-[1px]">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-md font-bold text-primary text-xl">SarvUday</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <Ionicons name="person-circle" size={32} color="#002da5" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 max-w-5xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Hero Warning Section */}
        <View className="mb-10">
          <View className="bg-accent-orange p-8 md:p-12 rounded-[40px] border-[1.5px] border-error shadow-[4px_4px_0px_0px_#ba1a1a] flex-col md:flex-row items-center gap-8">
            <View className="bg-white border-[1.5px] border-ink-black p-6 rounded-full">
              <Ionicons name="warning" size={64} color="#ba1a1a" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-4 text-center md:text-left">Let's keep SarvUday safe</Text>
              <Text className="font-body-lg text-on-surface-variant text-lg text-center md:text-left">
                We noticed some of your recent activity might be out of step with our community standards. This is a gentle reminder to keep our space supportive and respectful for everyone.
              </Text>
            </View>
          </View>
        </View>

        {/* Bento Grid Guidelines */}
        <View className="flex-col md:flex-row gap-8 mb-10">
          
          {/* Do's Card */}
          <View className="flex-[1] bg-accent-sage p-6 md:p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-6">
              <Ionicons name="checkmark-circle" size={32} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">The 'Do's</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="add" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Share constructive feedback and personal insights.</Text>
              </View>
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="add" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Support others who are going through difficult times.</Text>
              </View>
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="add" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Keep sensitive discussions confidential and safe.</Text>
              </View>
            </View>
          </View>

          {/* Don'ts Card */}
          <View className="flex-[1] bg-accent-pink p-6 md:p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-6">
              <Ionicons name="close-circle" size={32} color="#ba1a1a" />
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">The 'Don'ts</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="close" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Avoid using inflammatory or aggressive language.</Text>
              </View>
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="close" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Do not share misleading medical or health advice.</Text>
              </View>
              <View className="flex-row gap-4 items-start">
                <View className="w-6 h-6 rounded-full bg-white border border-ink-black items-center justify-center mt-1">
                  <Ionicons name="close" size={16} color="#1A1A1A" />
                </View>
                <Text className="font-body-md text-ink-black text-base flex-1">Refrain from posting promotional or spam content.</Text>
              </View>
            </View>
          </View>

        </View>

        {/* Supportive Note & Actions */}
        <View className="flex-col items-center text-center gap-8 px-4 md:px-0">
          <View className="max-w-2xl">
            <Text className="font-body-md text-on-surface-variant italic text-center">
              "Growth isn't linear. We appreciate you being a part of this journey to make mental health support accessible to everyone. Your presence matters here."
            </Text>
          </View>
          
          <View className="flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <TouchableOpacity className="w-full md:w-auto bg-primary px-10 py-5 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
              <Text className="text-white font-label-bold font-bold">I UNDERSTAND</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="w-full md:w-auto bg-secondary-container px-10 py-5 rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
              <Text className="text-ink-black font-label-bold font-bold">VIEW GUIDELINES</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Navigation for Mobile */}
      <View className="md:hidden absolute bottom-0 w-full z-50 bg-surface border-t-[1.5px] border-ink-black flex-row justify-around items-center h-20 px-4 pb-safe">
        <TouchableOpacity onPress={() => router.push('/patient/dashboard')} className="items-center justify-center">
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <Ionicons name="chatbubbles" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center justify-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container font-bold">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
