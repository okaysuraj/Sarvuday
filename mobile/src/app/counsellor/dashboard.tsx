import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TherapistDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
          <View>
            <Text className="font-headline-sm font-bold text-ink-black text-lg">Good Morning, Dr. Rivera</Text>
            <Text className="font-label-md text-on-surface-variant">Monday, Oct 24</Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="w-10 h-10 border-[1.5px] border-ink-black bg-white rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="notifications" size={20} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Today's Sessions Section */}
        <View className="mb-8">
          <View className="flex-row justify-between items-end mb-4">
            <Text className="font-headline-md text-ink-black font-bold text-2xl">Today's Sessions</Text>
            <TouchableOpacity>
              <Text className="font-label-bold text-primary font-bold underline">View Full Calendar</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row -mx-4 px-4 overflow-visible">
            {/* Session Card 1 */}
            <View className="w-[300px] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4 mr-4">
              <View className="flex-row justify-between items-start">
                <View className="w-14 h-14 rounded-full border-[1.5px] border-ink-black bg-accent-pink items-center justify-center">
                  <Ionicons name="person" size={24} color="#331019" />
                </View>
                <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-full px-3 py-1">
                  <Text className="font-label-bold text-[#715b00] text-xs font-bold">IN 15 MIN</Text>
                </View>
              </View>
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Aarav Patel</Text>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="font-body-md text-on-surface-variant">09:00 - 10:00 AM</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-surface-variant border-[1.5px] border-ink-black rounded-lg px-3 py-1"><Text className="font-label-md text-sm">CBT Session</Text></View>
                <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-lg px-3 py-1"><Text className="font-label-md text-sm">Video</Text></View>
              </View>
              <TouchableOpacity className="mt-2 bg-primary border-[1.5px] border-ink-black rounded-2xl py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center">
                <Text className="font-label-bold text-white font-bold">Join Call</Text>
              </TouchableOpacity>
            </View>

            {/* Session Card 2 */}
            <View className="w-[300px] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4 mr-4">
              <View className="flex-row justify-between items-start">
                <View className="w-14 h-14 rounded-full border-[1.5px] border-ink-black bg-accent-orange items-center justify-center">
                  <Ionicons name="person" size={24} color="#93000a" />
                </View>
                <View className="bg-surface-variant border-[1.5px] border-ink-black rounded-full px-3 py-1">
                  <Text className="font-label-bold text-on-surface-variant text-xs font-bold">UPCOMING</Text>
                </View>
              </View>
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Priya Sharma</Text>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="#434655" />
                  <Text className="font-body-md text-on-surface-variant">11:30 - 12:30 PM</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-surface-variant border-[1.5px] border-ink-black rounded-lg px-3 py-1"><Text className="font-label-md text-sm">Family Therapy</Text></View>
                <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-lg px-3 py-1"><Text className="font-label-md text-sm">In-person</Text></View>
              </View>
              <TouchableOpacity className="mt-2 bg-white border-[1.5px] border-ink-black rounded-2xl py-3 items-center active:bg-surface-container">
                <Text className="font-label-bold text-ink-black font-bold">Prepare Notes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Patient Highlights */}
        <View className="mb-8 flex-col gap-4">
          <View className="flex-row items-center gap-3">
            <Text className="font-headline-md text-ink-black font-bold text-xl">Patient Highlights</Text>
            <View className="bg-primary-container border-[1.5px] border-ink-black px-2 py-0.5 rounded-md">
              <Text className="text-on-primary-container text-[10px] font-bold">AI POWERED</Text>
            </View>
          </View>

          <View className="flex-col gap-4">
            <View className="bg-[#ffd9df]/20 border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-row gap-4">
              <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-2xl items-center justify-center">
                <Ionicons name="trending-down" size={24} color="#ba1a1a" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-lg font-bold">Aarav's mood dipped 20%</Text>
                <Text className="font-body-md text-sm text-on-surface-variant mt-1">Significant decline in journal sentiment scores over the last 48 hours.</Text>
                <TouchableOpacity className="mt-2 flex-row items-center gap-1">
                  <Text className="text-primary font-label-bold text-sm font-bold">Review Journal</Text>
                  <Ionicons name="arrow-forward" size={14} color="#002da5" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="bg-[#ffdad6]/20 border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-row gap-4">
              <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-2xl items-center justify-center">
                <Ionicons name="information-circle" size={24} color="#002da5" />
              </View>
              <View className="flex-1">
                <Text className="font-label-bold text-lg font-bold">System Alert: 3 Medication logs missed</Text>
                <Text className="font-body-md text-sm text-on-surface-variant mt-1">Marcus Chen has not logged medication for three consecutive days. Consider follow-up.</Text>
                <View className="flex-row gap-3 mt-3">
                  <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 active:bg-surface-variant">
                    <Text className="text-xs font-bold text-ink-black">Send Nudge</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-xl px-4 py-1.5 active:bg-surface-variant">
                    <Text className="text-xs font-bold text-ink-black">Call Marcus</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Bottom Nav */}
      <View className="w-full bg-cream-bg border-t-[1.5px] border-ink-black flex-row justify-around items-center py-4 absolute bottom-0 z-50">
        <TouchableOpacity className="items-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="apps" size={20} color="#715b00" />
          <Text className="text-[10px] font-bold text-[#715b00] mt-1">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1" onPress={() => router.push('/counsellor/patients')}>
          <Ionicons name="people" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1">
          <Ionicons name="calendar" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
