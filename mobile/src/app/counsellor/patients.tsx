import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PatientsListScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
            <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <Text className="font-headline-sm font-bold text-ink-black text-xl">Patients Portal</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 border-[1.5px] border-ink-black bg-white rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
          <Ionicons name="notifications" size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Search and Filters */}
        <View className="mb-6 flex-row gap-2">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <Ionicons name="search" size={20} color="#747687" />
            </View>
            <TextInput 
              className="w-full pl-12 pr-4 py-3 bg-white border-[1.5px] border-ink-black rounded-[24px] focus:shadow-[2px_2px_0px_0px_#1A1A1A] transition-all font-body-md"
              placeholder="Search patients by name..."
              placeholderTextColor="#747687"
            />
          </View>
          <TouchableOpacity className="flex-row items-center justify-center gap-2 px-4 bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
            <Ionicons name="filter" size={20} color="#715b00" />
            <Text className="font-label-bold text-[#715b00] font-bold">Filters</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6 -mx-4 px-4">
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-2">
            <Text className="text-white font-label-md font-bold">All Patients</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-2 active:bg-surface-container">
            <Text className="text-on-surface-variant font-label-md font-bold">Anxiety</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-2 active:bg-surface-container">
            <Text className="text-on-surface-variant font-label-md font-bold">Depression</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-white border-[1.5px] border-ink-black rounded-full px-4 py-2 mr-2 active:bg-surface-container">
            <Text className="text-on-surface-variant font-label-md font-bold">Active</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Patient Grid */}
        <View className="flex-col gap-6">
          
          {/* Patient 1 */}
          <TouchableOpacity 
            onPress={() => router.push('/counsellor/patient/1')}
            className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <View className="flex-row justify-between items-start mb-6">
              <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-pink items-center justify-center">
                <Ionicons name="person" size={32} color="#331019" />
              </View>
              <View className="bg-[#C6F6D5] border-[1.5px] border-ink-black rounded-full px-3 py-1">
                <Text className="text-[#22543D] text-xs font-bold uppercase">Low Risk</Text>
              </View>
            </View>
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Alex Rivers</Text>
              <Text className="text-on-surface-variant font-label-md mb-4">Last Session: Oct 24, 2023</Text>
              <View className="flex-row gap-2">
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">Generalized Anxiety</Text></View>
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">Weekly</Text></View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Patient 2 */}
          <TouchableOpacity 
            onPress={() => router.push('/counsellor/patient/2')}
            className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <View className="flex-row justify-between items-start mb-6">
              <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-orange items-center justify-center">
                <Ionicons name="person" size={32} color="#93000a" />
              </View>
              <View className="bg-[#FEEBC8] border-[1.5px] border-ink-black rounded-full px-3 py-1">
                <Text className="text-[#744210] text-xs font-bold uppercase">Moderate Risk</Text>
              </View>
            </View>
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Sarah Jenkins</Text>
              <Text className="text-on-surface-variant font-label-md mb-4">Last Session: Oct 26, 2023</Text>
              <View className="flex-row gap-2">
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">MDD</Text></View>
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">Bi-Weekly</Text></View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Patient 3 */}
          <TouchableOpacity 
            onPress={() => router.push('/counsellor/patient/3')}
            className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <View className="flex-row justify-between items-start mb-6">
              <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                <Ionicons name="person" size={32} color="#1A1A1A" />
              </View>
              <View className="bg-[#FED7D7] border-[1.5px] border-ink-black rounded-full px-3 py-1">
                <Text className="text-[#822727] text-xs font-bold uppercase">High Risk</Text>
              </View>
            </View>
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Jordan Taylor</Text>
              <Text className="text-on-surface-variant font-label-md mb-4">Last Session: Yesterday</Text>
              <View className="flex-row gap-2">
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">Panic Disorder</Text></View>
                <View className="bg-surface-container border-[1px] border-ink-black rounded px-2 py-1"><Text className="text-[10px] font-bold uppercase text-ink-black">Urgent</Text></View>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View className="w-full bg-cream-bg border-t-[1.5px] border-ink-black flex-row justify-around items-center py-4 absolute bottom-0 z-50">
        <TouchableOpacity className="items-center px-4 py-1" onPress={() => router.push('/counsellor/dashboard')}>
          <Ionicons name="apps" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center bg-secondary-container border-[1.5px] border-ink-black rounded-xl px-4 py-1 shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="people" size={20} color="#715b00" />
          <Text className="text-[10px] font-bold text-[#715b00] mt-1">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center px-4 py-1">
          <Ionicons name="calendar" size={20} color="#434655" />
          <Text className="text-[10px] font-bold text-on-surface-variant mt-1">Schedule</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
