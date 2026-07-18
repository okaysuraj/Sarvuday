import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function PatientListScreen() {
  const router = useRouter();

  const patients = [
    { id: '1', name: 'Alex Rivers', risk: 'Low Risk', riskBg: '#C6F6D5', riskColor: '#22543D', date: 'Oct 24, 2023', condition: 'Generalized Anxiety', freq: 'Weekly', avatarBg: '#ffd9df' },
    { id: '2', name: 'Sarah Jenkins', risk: 'Moderate Risk', riskBg: '#FEEBC8', riskColor: '#744210', date: 'Oct 26, 2023', condition: 'MDD', freq: 'Bi-Weekly', avatarBg: '#ffdad6' },
    { id: '3', name: 'Jordan Taylor', risk: 'High Risk', riskBg: '#FED7D7', riskColor: '#822727', date: 'Yesterday', condition: 'Panic Disorder', freq: 'Urgent', avatarBg: '#d9d9e6' },
    { id: '4', name: 'David Chen', risk: 'Low Risk', riskBg: '#C6F6D5', riskColor: '#22543D', date: 'Oct 20, 2023', condition: 'Bereavement', freq: 'Monthly', avatarBg: '#fdd33f' },
    { id: '5', name: 'Maya Gupta', risk: 'Moderate Risk', riskBg: '#FEEBC8', riskColor: '#744210', date: 'Oct 22, 2023', condition: 'Adjustment Disorder', freq: 'Weekly', avatarBg: '#dde1ff' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* Top AppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-[#fbf8ff] border-b-[1.5px] border-ink-black sticky top-0 z-50">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
          <Text className="font-headline-sm-mobile font-bold text-ink-black text-xl md:text-2xl">Good Morning</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-xl border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none bg-white transition-all">
          <Ionicons name="notifications" size={24} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 flex-row">
        {/* Desktop Sidebar/Nav */}
        <View className="hidden md:flex flex-col w-64 bg-white border-r-[1.5px] border-ink-black p-6 pt-10">
          <View className="flex-col gap-4">
            <TouchableOpacity className="flex-row items-center gap-4 p-4 rounded-[16px] active:bg-surface-container" onPress={() => router.push('/therapist/dashboard')}>
              <Ionicons name="grid" size={24} color="#434655" />
              <Text className="font-label-bold text-on-surface-variant font-bold text-sm">Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-4 p-4 rounded-[16px] bg-secondary-container border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform">
              <Ionicons name="people" size={24} color="#715b00" />
              <Text className="font-label-bold text-[#715b00] font-bold text-sm">Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-4 p-4 rounded-[16px] active:bg-surface-container" onPress={() => router.push('/therapist/appointment_management')}>
              <Ionicons name="calendar" size={24} color="#434655" />
              <Text className="font-label-bold text-on-surface-variant font-bold text-sm">Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-4 p-4 rounded-[16px] active:bg-surface-container" onPress={() => router.push('/therapist/payments')}>
              <Ionicons name="card" size={24} color="#434655" />
              <Text className="font-label-bold text-on-surface-variant font-bold text-sm">Earnings</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-auto p-4 bg-accent-pink rounded-[16px] border-[1.5px] border-ink-black">
            <Text className="text-[10px] font-bold uppercase text-ink-black opacity-60 mb-2">Weekly Goal</Text>
            <View className="flex-row justify-between items-end mb-2">
              <Text className="font-headline-sm text-ink-black font-bold text-xl">18/24</Text>
              <Text className="text-label-md text-ink-black text-sm">Sessions</Text>
            </View>
            <View className="w-full h-3 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden flex-row">
              <View className="h-full bg-primary border-r-[1.5px] border-ink-black" style={{ width: '75%' }} />
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView className="flex-1 px-4 md:px-10 py-6 max-w-7xl mx-auto w-full mb-20 md:mb-0">
          
          {/* Search and Filter Bar */}
          <View className="mb-6 flex-col md:flex-row gap-4 items-stretch md:items-center">
            <View className="relative flex-1 flex-row items-center">
              <Ionicons name="search" size={20} color="#747687" className="absolute left-4 z-10" />
              <TextInput 
                className="w-full pl-12 pr-4 py-4 bg-white border-[1.5px] border-ink-black rounded-[24px] text-ink-black font-body-md"
                placeholder="Search patients by name..."
                placeholderTextColor="#747687"
              />
            </View>
            <TouchableOpacity className="flex-row items-center justify-center gap-2 px-6 py-4 bg-secondary-container border-[1.5px] border-ink-black rounded-[24px] shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform">
              <Ionicons name="filter" size={20} color="#715b00" />
              <Text className="font-label-bold text-[#715b00] font-bold text-sm">Filters</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Filters Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 flex-row" contentContainerStyle={{ gap: 8 }}>
            <TouchableOpacity className="px-4 py-2 bg-primary border-[1.5px] border-ink-black rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none">
              <Text className="text-white text-label-md font-bold text-sm">All Patients</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full active:bg-surface-container">
              <Text className="text-on-surface-variant text-label-md font-bold text-sm">Anxiety</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full active:bg-surface-container">
              <Text className="text-on-surface-variant text-label-md font-bold text-sm">Depression</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full active:bg-surface-container">
              <Text className="text-on-surface-variant text-label-md font-bold text-sm">Active</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-white border-[1.5px] border-ink-black rounded-full active:bg-surface-container">
              <Text className="text-on-surface-variant text-label-md font-bold text-sm">On-Hold</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Patient Grid (Bento Style) */}
          <View className="flex-row flex-wrap justify-between gap-y-6">
            
            {patients.map((patient) => (
              <TouchableOpacity key={patient.id} className="w-full md:w-[48%] lg:w-[32%] bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none transition-transform flex-col">
                <View className="flex-row justify-between items-start mb-6">
                  <View className="w-16 h-16 rounded-2xl border-[1.5px] border-ink-black overflow-hidden items-center justify-center" style={{ backgroundColor: patient.avatarBg }}>
                    <Ionicons name="person" size={32} color="#1A1A1A" />
                  </View>
                  <View className="px-3 py-1 border-[1.5px] border-ink-black rounded-full" style={{ backgroundColor: patient.riskBg }}>
                    <Text className="text-[10px] font-bold uppercase tracking-wider" style={{ color: patient.riskColor }}>{patient.risk}</Text>
                  </View>
                </View>
                <View>
                  <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">{patient.name}</Text>
                  <Text className="text-on-surface-variant text-label-md text-sm mb-4">Last Session: {patient.date}</Text>
                  <View className="flex-row items-center gap-2">
                    <View className="px-2 py-1 bg-surface-container border border-ink-black rounded">
                      <Text className="text-[10px] font-bold uppercase text-ink-black">{patient.condition}</Text>
                    </View>
                    <View className="px-2 py-1 bg-surface-container border border-ink-black rounded">
                      <Text className="text-[10px] font-bold uppercase text-ink-black">{patient.freq}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Add Patient Placeholder */}
            <TouchableOpacity className="w-full md:w-[48%] lg:w-[32%] border-[1.5px] border-dashed border-ink-black rounded-[24px] p-6 flex-col items-center justify-center text-center active:bg-surface-container transition-colors min-h-[220px]">
              <View className="w-12 h-12 rounded-full bg-white border-[1.5px] border-ink-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Ionicons name="add" size={24} color="#002da5" />
              </View>
              <Text className="font-headline-sm text-on-surface-variant font-bold text-xl">Add New Patient</Text>
              <Text className="text-label-md text-outline text-sm mt-1">Start a new patient intake</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar (Mobile) */}
      <View className="md:hidden absolute bottom-0 left-0 w-full bg-[#fbf8ff] border-t-[1.5px] border-ink-black flex-row justify-around items-center px-4 py-3 z-50">
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-secondary-container rounded-xl px-4 py-1 border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="people" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] font-bold text-xs">Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/appointment_management')}>
          <Ionicons name="calendar" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center px-4 py-1" onPress={() => router.push('/therapist/payments')}>
          <Ionicons name="card" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant font-bold text-xs">Earnings</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
