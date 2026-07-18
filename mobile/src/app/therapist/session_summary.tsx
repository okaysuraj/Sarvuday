import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SessionSummaryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* TopAppBar for Mobile */}
      <View className="md:hidden flex-row justify-between items-center px-4 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-40">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant text-primary">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md-mobile text-primary font-bold text-xl flex-1 text-center">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant text-primary">
          <Ionicons name="person-circle-outline" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 flex-row">
        {/* Navigation Drawer for Web/Tablet */}
        <View className="hidden md:flex flex-col w-[280px] h-full bg-surface rounded-r-xl border-r-[1.5px] border-ink-black p-6 shadow-[4px_0px_0px_0px_#1A1A1A] z-40">
          <View className="flex-row items-center mb-12 gap-4">
            <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
              <Ionicons name="person" size={24} color="#1A1A1A" />
            </View>
            <View>
              <Text className="font-headline-sm text-primary font-bold text-lg">Saurabh</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Pro Member</Text>
              <Text className="font-body-md text-on-surface-variant text-xs mt-1">Premium Account</Text>
            </View>
          </View>
          
          <View className="flex-col gap-2 flex-1">
            <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg active:bg-surface-variant">
              <Ionicons name="happy-outline" size={24} color="#1A1A1A" />
              <Text className="font-body-md text-ink-black text-base">Mood Tracker</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 p-3 bg-primary rounded-lg border-[1.5px] border-ink-black">
              <Ionicons name="document-text" size={24} color="#ffffff" />
              <Text className="font-body-md text-white text-base">My Records</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg active:bg-surface-variant">
              <Ionicons name="medkit-outline" size={24} color="#1A1A1A" />
              <Text className="font-body-md text-ink-black text-base">Therapists</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-2 mt-auto">
            <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg active:bg-surface-variant">
              <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
              <Text className="font-body-md text-ink-black text-base">Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg active:bg-surface-variant">
              <Ionicons name="help-circle-outline" size={24} color="#1A1A1A" />
              <Text className="font-body-md text-ink-black text-base">Help</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content Area */}
        <ScrollView className="flex-1 bg-cream-bg p-4 md:p-10" contentContainerStyle={{ paddingBottom: 60 }}>
          <View className="max-w-4xl mx-auto flex-col gap-6 w-full">
            
            {/* Header Section */}
            <View className="flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
              <View>
                <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Session Summary</Text>
                <Text className="font-body-lg text-on-surface-variant text-base">Review your recent progress and insights.</Text>
              </View>
              <TouchableOpacity className="bg-primary py-3 px-6 rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex-row items-center justify-center gap-2">
                <Ionicons name="download" size={20} color="#ffffff" />
                <Text className="font-label-bold text-white font-bold uppercase tracking-wider text-xs">Save Report</Text>
              </TouchableOpacity>
            </View>

            {/* Bento Grid Layout */}
            <View className="flex-col md:flex-row gap-6 flex-wrap">
              
              {/* Meta Data Card */}
              <View className="w-full md:w-[32%] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4 relative overflow-hidden">
                <View className="absolute -right-8 -top-8 w-24 h-24 bg-accent-sage rounded-full opacity-50 border-[1.5px] border-ink-black" />
                
                <View>
                  <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider mb-1 font-bold text-[10px]">Date</Text>
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="calendar" size={20} color="#002da5" />
                    <Text className="font-headline-sm text-ink-black font-bold text-lg">Oct 24, 2023</Text>
                  </View>
                </View>
                
                <View>
                  <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider mb-1 font-bold text-[10px]">Duration</Text>
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="time" size={20} color="#ebc22e" />
                    <Text className="font-headline-sm text-ink-black font-bold text-lg">50 mins</Text>
                  </View>
                </View>

                <View>
                  <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider mb-1 font-bold text-[10px]">Therapist</Text>
                  <View className="flex-row items-center gap-3 mt-2">
                    <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-pink items-center justify-center">
                      <Ionicons name="person" size={20} color="#1A1A1A" />
                    </View>
                    <Text className="font-headline-sm text-ink-black font-bold text-base">Dr. Sarah Jenkins</Text>
                  </View>
                </View>
              </View>

              {/* Mood Shift Card */}
              <View className="w-full md:w-[65%] bg-accent-orange border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col justify-center">
                <Text className="font-headline-md text-ink-black font-bold text-2xl mb-6">Mood Shift</Text>
                
                <View className="flex-col md:flex-row items-center gap-6 md:gap-4 w-full">
                  
                  {/* Before */}
                  <View className="flex-1 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-xl p-4 flex-col items-center justify-center text-center w-full z-10">
                    <Ionicons name="sad-outline" size={32} color="#747687" className="mb-2" />
                    <Text className="font-headline-sm text-ink-black font-bold text-lg">Anxious</Text>
                    <Text className="font-label-md text-on-surface-variant text-xs mt-1">Start of Session</Text>
                  </View>
                  
                  {/* Arrow */}
                  <View className="flex-col items-center justify-center px-2 py-2">
                    <Ionicons name="arrow-down" size={32} color="#1A1A1A" className="md:hidden" />
                    <Ionicons name="arrow-forward" size={32} color="#1A1A1A" className="hidden md:flex" />
                  </View>

                  {/* After */}
                  <View className="flex-1 bg-surface-container-lowest border-[1.5px] border-ink-black rounded-xl p-4 flex-col items-center justify-center text-center w-full z-10">
                    <Ionicons name="happy" size={32} color="#002da5" className="mb-2" />
                    <Text className="font-headline-sm text-ink-black font-bold text-lg">Calm</Text>
                    <Text className="font-label-md text-on-surface-variant text-xs mt-1">End of Session</Text>
                  </View>
                </View>
              </View>

              {/* Exercises / Homework */}
              <View className="w-full md:w-[48%] bg-surface-container-lowest border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col">
                <View className="flex-row items-center gap-3 mb-6">
                  <View className="bg-secondary-fixed p-2 rounded-lg border-[1.5px] border-ink-black">
                    <Ionicons name="bulb" size={24} color="#1A1A1A" />
                  </View>
                  <Text className="font-headline-md text-ink-black font-bold text-2xl">Exercises</Text>
                </View>

                <View className="flex-col gap-4 flex-1">
                  <View className="flex-row items-start gap-3 bg-surface p-4 rounded-xl border-[1.5px] border-ink-black">
                    <Ionicons name="checkmark-circle" size={24} color="#002da5" className="mt-1" />
                    <View className="flex-1">
                      <Text className="font-body-md text-ink-black font-bold text-base">Box Breathing Daily</Text>
                      <Text className="font-label-md text-on-surface-variant text-sm mt-1 leading-tight">Practice 4-4-4-4 breathing technique for 5 minutes every morning to center yourself.</Text>
                    </View>
                  </View>

                  <View className="flex-row items-start gap-3 bg-surface p-4 rounded-xl border-[1.5px] border-ink-black">
                    <Ionicons name="ellipse-outline" size={24} color="#c4c5d8" className="mt-1" />
                    <View className="flex-1">
                      <Text className="font-body-md text-ink-black font-bold text-base">Journaling</Text>
                      <Text className="font-label-md text-on-surface-variant text-sm mt-1 leading-tight">Write down three things you are grateful for each evening.</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Next Session */}
              <View className="w-full md:w-[48%] bg-primary-fixed border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col relative overflow-hidden">
                <View className="absolute -right-4 bottom-4 w-32 h-32 border-4 border-ink-black opacity-10" style={{ transform: [{ rotate: '12deg' }] }} />
                
                <View className="flex-row items-center gap-3 mb-6 relative z-10">
                  <View className="bg-surface p-2 rounded-lg border-[1.5px] border-ink-black">
                    <Ionicons name="calendar" size={24} color="#002da5" />
                  </View>
                  <Text className="font-headline-md text-ink-black font-bold text-2xl">Next Session</Text>
                </View>

                <View className="bg-surface-container-lowest rounded-xl border-[1.5px] border-ink-black p-6 flex-col gap-4 relative z-10">
                  <View className="flex-row justify-between items-center border-b-[1.5px] border-ink-black pb-4" style={{ borderStyle: 'dashed' }}>
                    <View>
                      <Text className="font-label-md text-on-surface-variant uppercase text-[10px] font-bold">Date</Text>
                      <Text className="font-body-lg text-ink-black font-bold text-lg mt-1">Oct 31, 2023</Text>
                    </View>
                    <View className="items-end">
                      <Text className="font-label-md text-on-surface-variant uppercase text-[10px] font-bold">Time</Text>
                      <Text className="font-body-lg text-ink-black font-bold text-lg mt-1">10:00 AM</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center gap-2">
                      <Ionicons name="videocam" size={20} color="#ebc22e" />
                      <Text className="font-body-md text-ink-black text-sm font-bold">Video Call</Text>
                    </View>
                    <TouchableOpacity className="bg-secondary-fixed border-[1.5px] border-ink-black rounded-lg px-4 py-2 active:bg-secondary-container">
                      <Text className="font-label-bold text-ink-black font-bold text-xs">Add to Calendar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
