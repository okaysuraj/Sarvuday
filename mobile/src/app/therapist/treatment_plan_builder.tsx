import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function TreatmentPlanBuilderScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      {/* Top Navigation */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-background border-b-[1.5px] border-ink-black sticky top-0 z-50 max-w-7xl mx-auto">
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={20} color="#1A1A1A" />
          </View>
          <Text className="font-headline-sm-mobile md:font-headline-sm text-ink-black font-bold text-xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="p-2 items-center justify-center">
          <Ionicons name="notifications" size={24} color="#002da5" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-24" contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Title Section */}
        <View className="mb-8">
          <Text className="font-display-lg-mobile md:font-display-lg text-ink-black font-bold text-3xl md:text-5xl mb-2">Build Plan</Text>
          <Text className="font-body-lg text-on-surface-variant text-base md:text-lg">Configure a new treatment pathway for Sarah J.</Text>
        </View>

        <View className="flex-col lg:flex-row flex-wrap gap-6">
          
          {/* Section 1: Primary Focus */}
          <View className="w-full lg:w-[58%] bg-white border-[1.5px] border-ink-black rounded-[40px] p-6 active:translate-x-[2px] active:translate-y-[2px] shadow-[4px_4px_0px_0px_#1A1A1A] transition-all">
            <View className="flex-row items-center gap-3 mb-6">
              <Ionicons name="git-network-outline" size={32} color="#002da5" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Primary Focus</Text>
            </View>
            <View className="flex-col gap-4">
              <View className="p-4 bg-accent-orange border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-ink-black font-bold text-xs uppercase mb-2">Therapeutic Approach</Text>
                {/* Simplified dropdown for RN visual representation */}
                <View className="bg-white border-[1.5px] border-ink-black rounded-lg p-3 flex-row justify-between items-center">
                  <Text className="font-body-md text-ink-black text-sm">CBT for Social Anxiety</Text>
                  <Ionicons name="chevron-down" size={20} color="#1A1A1A" />
                </View>
              </View>
              <TextInput 
                className="w-full h-32 bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black"
                multiline
                textAlignVertical="top"
                placeholder="Enter clinical notes or session summaries..."
                placeholderTextColor="#747687"
              />
            </View>
          </View>

          {/* Section 3: Frequency & Duration */}
          <View className="w-full lg:w-[38%] bg-secondary-container border-[1.5px] border-ink-black rounded-[40px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row items-center gap-3 mb-6">
              <Ionicons name="time" size={32} color="#715b00" />
              <Text className="font-headline-sm text-ink-black font-bold text-xl">Frequency & Duration</Text>
            </View>
            <View className="flex-col gap-6">
              <View className="flex-row gap-4">
                <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl p-4 items-center">
                  <Text className="font-label-bold text-ink-black font-bold text-[10px] opacity-70 uppercase mb-1">Cadence</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">Weekly</Text>
                </View>
                <View className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl p-4 items-center">
                  <Text className="font-label-bold text-ink-black font-bold text-[10px] opacity-70 uppercase mb-1">Count</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-lg">12 Sessions</Text>
                </View>
              </View>
              <View className="flex-col gap-2">
                <View className="flex-row justify-between font-label-bold">
                  <Text className="text-ink-black font-bold text-xs">Projected Completion</Text>
                  <Text className="text-ink-black font-bold text-xs">April 2024</Text>
                </View>
                <View className="h-4 w-full bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
                  <View className="h-full bg-secondary w-1/3" />
                </View>
              </View>
              <TouchableOpacity className="w-full bg-ink-black rounded-xl py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none items-center justify-center">
                <Text className="font-label-bold text-white font-bold text-sm">Edit Cadence</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 2: Core Goals */}
          <View className="w-full bg-white border-[1.5px] border-ink-black rounded-[40px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons name="flag" size={32} color="#5a3039" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Core Goals</Text>
              </View>
              <TouchableOpacity className="flex-row items-center gap-2 bg-tertiary-fixed border-[1.5px] border-ink-black rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <Ionicons name="add-circle" size={20} color="#331019" />
                <Text className="font-label-bold text-[#331019] font-bold text-xs">Add Goal</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-col md:flex-row flex-wrap gap-6">
              {/* Goal 1 */}
              <View className="w-full md:w-[48%] lg:w-[31%] p-6 bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] flex-col justify-between">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-[10px] opacity-60 uppercase mb-2">MEASURABLE</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl leading-tight">Reduce panic attacks by 50%</Text>
                </View>
                <View className="mt-6 flex-row items-center justify-between">
                  <View className="px-3 py-1 bg-white border border-ink-black rounded-full">
                    <Text className="text-[10px] font-bold uppercase text-ink-black">Clinical</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="pencil" size={20} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Goal 2 */}
              <View className="w-full md:w-[48%] lg:w-[31%] p-6 bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] flex-col justify-between">
                <View>
                  <Text className="font-label-bold text-ink-black font-bold text-[10px] opacity-60 uppercase mb-2">SOCIAL</Text>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl leading-tight">Initiate 2 conversations weekly</Text>
                </View>
                <View className="mt-6 flex-row items-center justify-between">
                  <View className="px-3 py-1 bg-white border border-ink-black rounded-full">
                    <Text className="text-[10px] font-bold uppercase text-ink-black">Behavioral</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="pencil" size={20} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Goal 3 Placeholder */}
              <TouchableOpacity className="w-full md:w-[48%] lg:w-[31%] p-6 border-[1.5px] border-ink-black rounded-[32px] items-center justify-center active:bg-surface-container" style={{ borderStyle: 'dashed' }}>
                <View className="items-center">
                  <Ionicons name="add" size={40} color="#747687" className="mb-2" />
                  <Text className="font-label-bold text-outline font-bold text-sm mt-2">New Objective</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section 4: Assigned Exercises */}
          <View className="w-full bg-[#f4e6e8] border-[1.5px] border-ink-black rounded-[40px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <View className="flex-row items-center gap-3">
                <Ionicons name="barbell" size={32} color="#002da5" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl">Assigned Exercises</Text>
              </View>
              <View className="relative w-full md:w-96 flex-row items-center">
                <Ionicons name="search" size={20} color="#747687" className="absolute left-3 z-10" />
                <TextInput 
                  className="w-full pl-10 pr-4 py-2 bg-white border-[1.5px] border-ink-black rounded-xl font-body-md text-ink-black"
                  placeholder="Search breathing, CBT, tools..."
                  placeholderTextColor="#747687"
                />
              </View>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-4">
              {/* Tool 1 */}
              <TouchableOpacity className="w-full sm:w-[48%] lg:w-[23%] bg-white p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center gap-4 active:bg-primary-container">
                <View className="w-12 h-12 bg-accent-orange border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="leaf" size={24} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Box Breathing</Text>
                  <Text className="text-[10px] opacity-70 text-ink-black">Stress Relief</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#002da5" />
              </TouchableOpacity>

              {/* Tool 2 */}
              <TouchableOpacity className="w-full sm:w-[48%] lg:w-[23%] bg-white p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center gap-4 active:bg-primary-container">
                <View className="w-12 h-12 bg-accent-sage border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="document-text" size={24} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Thought Record</Text>
                  <Text className="text-[10px] opacity-70 text-ink-black">CBT Core</Text>
                </View>
                <Ionicons name="add-circle" size={20} color="#c4c5d8" />
              </TouchableOpacity>

              {/* Tool 3 */}
              <TouchableOpacity className="w-full sm:w-[48%] lg:w-[23%] bg-white p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center gap-4 active:bg-primary-container">
                <View className="w-12 h-12 bg-accent-pink border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="body" size={24} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Body Scan</Text>
                  <Text className="text-[10px] opacity-70 text-ink-black">Meditation</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#002da5" />
              </TouchableOpacity>

              {/* Tool 4 */}
              <TouchableOpacity className="w-full sm:w-[48%] lg:w-[23%] bg-white p-4 border-[1.5px] border-ink-black rounded-2xl flex-row items-center gap-4 active:bg-primary-container">
                <View className="w-12 h-12 bg-secondary-container border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                  <Ionicons name="flash" size={24} color="#1A1A1A" />
                </View>
                <View className="flex-1">
                  <Text className="font-label-bold text-ink-black font-bold text-sm">Fear Hierarchy</Text>
                  <Text className="text-[10px] opacity-70 text-ink-black">Exposure</Text>
                </View>
                <Ionicons name="add-circle" size={20} color="#c4c5d8" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Global CTA - Desktop */}
        <View className="hidden lg:flex flex-row justify-end mt-10">
          <TouchableOpacity className="bg-primary px-12 py-5 border-[1.5px] border-ink-black rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none flex-row items-center gap-3">
            <Ionicons name="save" size={24} color="#ffffff" />
            <Text className="text-white font-headline-sm font-bold text-xl">Finalize Treatment Plan</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Global CTA - Mobile */}
      <View className="lg:hidden absolute bottom-[90px] left-0 w-full px-4 z-40">
        <TouchableOpacity className="w-full bg-primary p-4 border-[1.5px] border-ink-black rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none flex-row justify-center items-center gap-3">
          <Ionicons name="save" size={20} color="#ffffff" />
          <Text className="text-white font-headline-sm font-bold text-lg">Finalize Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav (Mobile) */}
      <View className="md:hidden absolute bottom-0 w-full bg-surface border-t-[1.5px] border-ink-black h-20 px-4 pb-4 flex-row justify-around items-center z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-2" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1.5 bg-secondary-container rounded-xl border-[1.5px] border-ink-black">
          <Ionicons name="people" size={24} color="#715b00" />
          <Text className="font-label-md text-on-secondary-container text-[10px] mt-1 font-bold">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-2">
          <Ionicons name="cash" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-[10px] mt-1 font-bold">Earnings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
