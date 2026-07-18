import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TherapistScheduleScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage">
            <Ionicons name="person" size={24} color="#1A1A1A" style={{ alignSelf: 'center', marginTop: 8 }} />
          </View>
          <Text className="font-headline-sm-mobile font-bold text-ink-black text-lg">Good Morning</Text>
        </View>
        <TouchableOpacity className="active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Weekly Calendar Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-end mb-4">
            <View>
              <Text className="font-label-bold text-outline uppercase tracking-wider font-bold mb-1">November 2024</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Your Schedule</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-1 border-[1.5px] border-ink-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white">
              <Text className="font-label-bold text-primary font-bold">Today</Text>
              <Ionicons name="calendar" size={14} color="#002da5" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between gap-2">
            <TouchableOpacity className="flex-1 min-w-[56px] items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-white active:translate-x-[2px] active:translate-y-[2px]">
              <Text className="font-label-md text-on-surface-variant mb-1">Mon</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">11</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 min-w-[56px] items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-primary shadow-[4px_4px_0px_0px_#1A1A1A]">
              <Text className="font-label-md text-white opacity-80 mb-1">Tue</Text>
              <Text className="font-headline-sm text-white font-bold text-xl">12</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 min-w-[56px] items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-white active:translate-x-[2px] active:translate-y-[2px]">
              <Text className="font-label-md text-on-surface-variant mb-1">Wed</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">13</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 min-w-[56px] items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-white active:translate-x-[2px] active:translate-y-[2px]">
              <Text className="font-label-md text-on-surface-variant mb-1">Thu</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">14</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 min-w-[56px] items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-white active:translate-x-[2px] active:translate-y-[2px]">
              <Text className="font-label-md text-on-surface-variant mb-1">Fri</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">15</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vertical Timeline Section */}
        <View className="flex-col gap-4">
          
          {/* Timeline Item 1 */}
          <View className="flex-row gap-4">
            <View className="items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold">09:00</Text>
              <View className="w-[2px] h-full bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-primary rounded-[32px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none relative overflow-hidden flex-row justify-between items-start">
              <View>
                <View className="bg-white/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-white font-label-bold text-[10px] uppercase font-bold">Confirmed</Text>
                </View>
                <Text className="font-headline-sm text-white font-bold text-xl mb-1">Dr. Elias Vance</Text>
                <View className="flex-row items-center gap-2 opacity-90">
                  <Ionicons name="videocam" size={14} color="#ffffff" />
                  <Text className="font-label-md text-white text-sm">Video Session • 50m</Text>
                </View>
              </View>
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="play" size={20} color="#002da5" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Timeline Item 2 */}
          <View className="flex-row gap-4">
            <View className="items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold">10:30</Text>
              <View className="w-[2px] h-full bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-accent-pink rounded-[32px] p-6 border-[1.5px] border-ink-black active:translate-x-[2px] active:translate-y-[2px] flex-col justify-between items-start">
              <View className="flex-row justify-between w-full">
                <View>
                  <View className="bg-[#754650]/20 px-2 py-0.5 rounded-full mb-2 self-start">
                    <Text className="text-[#754650] font-label-bold text-[10px] uppercase font-bold">Pending</Text>
                  </View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Sarah Jenkins</Text>
                  <View className="flex-row items-center gap-2 text-on-surface-variant">
                    <Ionicons name="chatbubble" size={14} color="#434655" />
                    <Text className="font-label-md text-on-surface-variant text-sm">Chat Consultation • 30m</Text>
                  </View>
                </View>
                <View className="flex-row gap-2">
                  <TouchableOpacity className="bg-white w-10 h-10 rounded-xl items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Ionicons name="close" size={20} color="#ba1a1a" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-primary w-10 h-10 rounded-xl items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                    <Ionicons name="checkmark" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Empty Slot */}
          <View className="flex-row gap-4">
            <View className="items-center w-12 pt-2">
              <Text className="font-label-bold text-outline font-bold">12:00</Text>
              <View className="w-[2px] h-20 bg-transparent mt-2 opacity-30 border-l-[2px] border-ink-black border-dashed" />
            </View>
            <View className="flex-1 h-24 border-[1.5px] border-ink-black border-dashed rounded-[32px] items-center justify-center bg-surface-container-low/50">
              <Text className="text-on-surface-variant font-label-md font-bold">Lunch Break • No Appointments</Text>
            </View>
          </View>

          {/* Timeline Item 3 */}
          <View className="flex-row gap-4">
            <View className="items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold">14:00</Text>
              <View className="w-[2px] h-full bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-accent-orange rounded-[32px] p-6 border-[1.5px] border-ink-black active:translate-x-[2px] active:translate-y-[2px] flex-row justify-between items-start">
              <View>
                <View className="bg-[#564500]/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-[#564500] font-label-bold text-[10px] uppercase font-bold">Rescheduled</Text>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Michael Thorne</Text>
                <View className="flex-row items-center gap-2 text-on-surface-variant">
                  <Ionicons name="videocam" size={14} color="#434655" />
                  <Text className="font-label-md text-on-surface-variant text-sm">Video Session • 50m</Text>
                </View>
              </View>
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="ellipsis-vertical" size={20} color="#1A1A1A" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Timeline Item 4 */}
          <View className="flex-row gap-4">
            <View className="items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold">16:00</Text>
              <View className="w-[2px] h-full bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-primary rounded-[32px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row justify-between items-start">
              <View>
                <View className="bg-white/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-white font-label-bold text-[10px] uppercase font-bold">Confirmed</Text>
                </View>
                <Text className="font-headline-sm text-white font-bold text-xl mb-1">Elena Rodriguez</Text>
                <View className="flex-row items-center gap-2 opacity-90">
                  <Ionicons name="person" size={14} color="#ffffff" />
                  <Text className="font-label-md text-white text-sm">In-Person • 60m</Text>
                </View>
              </View>
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="map" size={20} color="#002da5" />
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 w-16 h-16 bg-secondary-container rounded-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center z-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
        <Ionicons name="add" size={32} color="#1A1A1A" />
      </TouchableOpacity>
    </View>
  );
}
