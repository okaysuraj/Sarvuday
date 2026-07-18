import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function UpcomingAppointmentsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* TopAppBar for Desktop */}
      <View className="hidden md:flex flex-row justify-between items-center px-10 py-4 w-full bg-background border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <View className="flex-row items-center gap-2">
          <Ionicons name="medical" size={32} color="#002da5" />
          <Text className="font-display-lg text-primary font-bold text-3xl tracking-tight">MindEase</Text>
        </View>
        <View className="flex-row items-center gap-6">
          <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high"><Text className="font-headline-sm text-on-surface-variant font-bold text-lg">Home</Text></TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high"><Text className="font-headline-sm text-on-surface-variant font-bold text-lg">AI Chat</Text></TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high"><Text className="font-headline-sm text-primary font-bold text-lg">Meet</Text></TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 rounded-xl active:bg-surface-container-high"><Text className="font-headline-sm text-on-surface-variant font-bold text-lg">Profile</Text></TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
            <Ionicons name="notifications" size={24} color="#002da5" />
          </TouchableOpacity>
        </View>
      </View>

      {/* TopAppBar for Mobile */}
      <View className="md:hidden flex-row justify-between items-center px-4 py-4 w-full bg-background border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <View className="flex-row items-center gap-2">
          <Ionicons name="medical" size={28} color="#002da5" />
          <Text className="font-display-lg-mobile text-primary font-bold text-2xl tracking-tight">MindEase</Text>
        </View>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-8 md:py-12 max-w-7xl mx-auto w-full mb-20 md:mb-0" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="mb-12">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-4xl mb-2">Appointments</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">Manage your upcoming therapy sessions.</Text>
        </View>

        <View className="flex-col lg:flex-row gap-6">
          {/* Left Column: Next Appointment (Hero) */}
          <View className="w-full lg:w-[58%] flex-col gap-6">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Next Appointment</Text>
            
            <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col md:flex-row gap-6 items-center relative overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="absolute -top-10 -right-10 w-32 h-32 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-50 hidden md:flex" />
              
              <View className="relative">
                <View className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-white z-10 items-center justify-center">
                  <Ionicons name="person" size={64} color="#1A1A1A" />
                </View>
                <View className="absolute bottom-2 right-2 bg-secondary-container border-[1.5px] border-ink-black rounded-full w-8 h-8 items-center justify-center z-20">
                  <Ionicons name="checkmark-circle" size={16} color="#1A1A1A" />
                </View>
              </View>

              <View className="flex-1 flex-col items-center md:items-start text-center md:text-left z-10">
                <Text className="font-headline-md text-ink-black font-bold text-3xl mb-1">Dr. Sarah Jenkins</Text>
                <View className="flex-row items-center gap-1 mb-4">
                  <Ionicons name="medical" size={16} color="#434655" />
                  <Text className="font-body-md text-on-surface-variant text-base">Clinical Psychologist</Text>
                </View>

                <View className="flex-col gap-2 w-full max-w-sm">
                  <View className="flex-row items-center gap-3 bg-white border-[1.5px] border-ink-black rounded-xl p-3">
                    <View className="bg-accent-sage rounded-lg p-2 border-[1.5px] border-ink-black">
                      <Ionicons name="calendar" size={20} color="#1A1A1A" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider text-xs">Thursday, Oct 26</Text>
                      <Text className="font-body-md text-on-surface-variant text-sm mt-0.5">2:00 PM - 2:50 PM</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-3 bg-white border-[1.5px] border-ink-black rounded-xl p-3">
                    <View className="bg-accent-orange rounded-lg p-2 border-[1.5px] border-ink-black">
                      <Ionicons name="videocam" size={20} color="#1A1A1A" />
                    </View>
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold uppercase tracking-wider text-xs">Video Session</Text>
                      <Text className="font-body-md text-on-surface-variant text-sm mt-0.5">Secure MindEase Link</Text>
                    </View>
                  </View>
                </View>

                <View className="mt-6 flex-col sm:flex-row gap-4 w-full">
                  <TouchableOpacity className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-xl py-4 px-6 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[4px] active:shadow-none transition-transform">
                    <Ionicons name="videocam" size={20} color="#ffffff" />
                    <Text className="text-white font-headline-sm font-bold text-xl">Join Session</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-none bg-surface border-[1.5px] border-ink-black rounded-xl py-4 px-6 items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[4px] active:shadow-none transition-transform">
                    <Ionicons name="ellipsis-horizontal" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Right Column: Upcoming List */}
          <View className="w-full lg:w-[38%] flex-col gap-6">
            <View className="flex-row justify-between items-center">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl">Upcoming</Text>
              <TouchableOpacity>
                <Text className="font-label-bold text-primary font-bold text-sm">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-col gap-4">
              {/* List Item 1 */}
              <TouchableOpacity className="bg-surface-bright border-[1.5px] border-ink-black rounded-[24px] p-4 flex-row items-center gap-4 active:bg-surface-container-low transition-colors group shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
                <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-xl p-3 flex-col items-center justify-center min-w-[72px]">
                  <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">NOV</Text>
                  <Text className="font-headline-md text-ink-black font-bold text-2xl leading-none">02</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Dr. Sarah Jenkins</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm mt-1">10:00 AM • Video</Text>
                </View>
                <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
                  <Ionicons name="calendar-outline" size={20} color="#1A1A1A" />
                </View>
              </TouchableOpacity>

              {/* List Item 2 */}
              <TouchableOpacity className="bg-surface-bright border-[1.5px] border-ink-black rounded-[24px] p-4 flex-row items-center gap-4 active:bg-surface-container-low transition-colors group shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
                <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-xl p-3 flex-col items-center justify-center min-w-[72px]">
                  <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">NOV</Text>
                  <Text className="font-headline-md text-ink-black font-bold text-2xl leading-none">09</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Dr. Sarah Jenkins</Text>
                  <Text className="font-body-md text-on-surface-variant text-sm mt-1">2:00 PM • Video</Text>
                </View>
                <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
                  <Ionicons name="calendar-outline" size={20} color="#1A1A1A" />
                </View>
              </TouchableOpacity>

              {/* Book New Card */}
              <TouchableOpacity className="bg-white p-6 flex-col items-center justify-center gap-3 border-2 border-ink-black rounded-[24px] mt-2 active:bg-surface-container-low" style={{ borderStyle: 'dashed' }}>
                <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-full p-3 items-center justify-center">
                  <Ionicons name="add" size={24} color="#002da5" />
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-lg">Book New Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* BottomNavBar */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-2" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="chatbubbles" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1.5 border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="calendar" size={24} color="#002da5" />
          <Text className="font-label-bold text-primary font-bold text-[10px] mt-1">Meet</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="person" size={24} color="#434655" />
          <Text className="font-label-bold text-on-surface-variant font-bold text-[10px] mt-1">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
