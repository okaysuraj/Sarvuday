import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function AppointmentManagementScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-[#fbf8ff] border-b-[1.5px] border-ink-black sticky top-0 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
          <Text className="font-headline-sm-mobile font-bold text-ink-black text-xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="active:translate-x-[2px] active:translate-y-[2px] transition-transform">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full mb-20">
        {/* Weekly Calendar Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-end mb-4">
            <View>
              <Text className="font-label-bold text-[#747687] font-bold uppercase tracking-wider text-xs">November 2024</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Your Schedule</Text>
            </View>
            <TouchableOpacity className="flex-row items-center gap-1 border-[1.5px] border-ink-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none bg-white">
              <Text className="font-label-bold text-primary font-bold text-xs">Today</Text>
              <Ionicons name="calendar" size={12} color="#002da5" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between gap-2">
            <TouchableOpacity className="flex-1 flex-col items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-[#fbf8ff] active:bg-surface-container">
              <Text className="font-label-md text-on-surface-variant text-sm">Mon</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">11</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1 flex-col items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-primary shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
              <Text className="font-label-md text-white opacity-80 text-sm">Tue</Text>
              <Text className="font-headline-sm text-white font-bold text-xl">12</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-[#fbf8ff] active:bg-surface-container">
              <Text className="font-label-md text-on-surface-variant text-sm">Wed</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">13</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-[#fbf8ff] active:bg-surface-container">
              <Text className="font-label-md text-on-surface-variant text-sm">Thu</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">14</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center py-4 rounded-[24px] border-[1.5px] border-ink-black bg-[#fbf8ff] active:bg-surface-container">
              <Text className="font-label-md text-on-surface-variant text-sm">Fri</Text>
              <Text className="font-headline-sm text-ink-black font-bold text-xl">15</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Vertical Timeline Section */}
        <View className="flex-col gap-4">
          
          {/* Timeline Item 1 */}
          <View className="flex-row gap-4">
            <View className="flex-col items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold text-sm">09:00</Text>
              <View className="w-[2px] flex-1 bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-primary rounded-[32px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform flex-row justify-between items-start">
              <View>
                <View className="bg-white/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-white font-label-bold font-bold uppercase text-[10px]">Confirmed</Text>
                </View>
                <Text className="font-headline-sm text-white font-bold text-xl">Dr. Elias Vance</Text>
                <View className="flex-row items-center gap-2 mt-1 opacity-90">
                  <Ionicons name="videocam" size={14} color="#ffffff" />
                  <Text className="font-label-md text-white text-sm">Video Session • 50m</Text>
                </View>
              </View>
              <View className="bg-white w-10 h-10 rounded-full items-center justify-center border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="play" size={20} color="#002da5" className="ml-0.5" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Timeline Item 2 */}
          <View className="flex-row gap-4">
            <View className="flex-col items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold text-sm">10:30</Text>
              <View className="w-[2px] flex-1 bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-accent-pink rounded-[32px] p-6 border-[1.5px] border-ink-black flex-row justify-between items-start active:translate-y-[2px] transition-transform">
              <View>
                <View className="bg-[#754650]/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-[#5a3039] font-label-bold font-bold uppercase text-[10px]">Pending</Text>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Sarah Jenkins</Text>
                <View className="flex-row items-center gap-2 mt-1 text-on-surface-variant">
                  <Ionicons name="chatbubble" size={14} color="#434655" />
                  <Text className="font-label-md text-on-surface-variant text-sm">Chat Consultation • 30m</Text>
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="bg-white p-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="close" size={20} color="#ba1a1a" />
                </View>
                <View className="bg-primary-container p-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Ionicons name="checkmark" size={20} color="#ffffff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Empty Slot Indicator */}
          <View className="flex-row gap-4">
            <View className="flex-col items-center w-12 pt-2">
              <Text className="font-label-bold text-[#747687] font-bold text-sm">12:00</Text>
              <View className="w-[2px] h-20 bg-ink-black mt-2 rounded-full opacity-10" />
            </View>
            <View className="flex-1 h-24 border-[1.5px] border-ink-black border-dashed rounded-[32px] items-center justify-center bg-[#f5f2f9]/50">
              <Text className="text-on-surface-variant font-label-md text-sm">Lunch Break • No Appointments</Text>
            </View>
          </View>

          {/* Timeline Item 3 */}
          <View className="flex-row gap-4">
            <View className="flex-col items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold text-sm">14:00</Text>
              <View className="w-[2px] flex-1 bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-accent-orange rounded-[32px] p-6 border-[1.5px] border-ink-black active:translate-y-[2px] transition-transform flex-row justify-between items-start">
              <View>
                <View className="bg-[#564500]/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-[#564500] font-label-bold font-bold uppercase text-[10px]">Rescheduled</Text>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Michael Thorne</Text>
                <View className="flex-row items-center gap-2 mt-1 text-on-surface-variant">
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
            <View className="flex-col items-center w-12 pt-4">
              <Text className="font-label-bold text-ink-black font-bold text-sm">16:00</Text>
              <View className="w-[2px] flex-1 bg-ink-black mt-2 rounded-full opacity-20" />
            </View>
            <TouchableOpacity className="flex-1 bg-primary rounded-[32px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform flex-row justify-between items-start">
              <View>
                <View className="bg-white/20 px-2 py-0.5 rounded-full mb-2 self-start">
                  <Text className="text-white font-label-bold font-bold uppercase text-[10px]">Confirmed</Text>
                </View>
                <Text className="font-headline-sm text-white font-bold text-xl">Elena Rodriguez</Text>
                <View className="flex-row items-center gap-2 mt-1 opacity-90">
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
      <TouchableOpacity className="absolute bottom-24 right-6 w-16 h-16 bg-secondary-container rounded-2xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform z-50 items-center justify-center">
        <Ionicons name="add" size={32} color="#715b00" />
      </TouchableOpacity>

      {/* BottomNavBar */}
      <View className="absolute bottom-0 left-0 w-full bg-[#fbf8ff] border-t-[1.5px] border-ink-black flex-row justify-around items-center px-4 py-3 z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/patient_list')}>
          <Ionicons name="people" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black">
          <Ionicons name="calendar" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] font-bold text-xs">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/payments')}>
          <Ionicons name="card" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
