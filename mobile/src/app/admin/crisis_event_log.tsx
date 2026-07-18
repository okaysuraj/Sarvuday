import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function CrisisEventLogScreen() {
  const router = useRouter();

  const incidents = [
    { id: '1', type: 'SOS Triggered', time: '14:23:45', date: 'Today, Oct 12', user: 'Ethan Rivers', responder: 'Sarah Miller', responderInitials: 'SM', status: 'OPEN', typeIcon: 'warning', typeBg: '#ffdad6', typeColor: '#ba1a1a', responderBg: '#d9d9e6', statusBg: '#ba1a1a', statusColor: '#ffffff', action: 'INTERVENE' },
    { id: '2', type: 'Severe Risk AI Alert', time: '14:15:02', date: 'Today, Oct 12', user: 'Clara Jenkins', responder: 'Unassigned', responderInitials: '', status: 'PENDING', typeIcon: 'bulb', typeBg: '#ffdad6', typeColor: '#1A1A1A', responderBg: 'transparent', statusBg: '#fdd33f', statusColor: '#715b00', action: 'ASSIGN' },
    { id: '3', type: 'Helpline Request', time: '13:40:12', date: 'Today, Oct 12', user: 'Mark Knight', responder: 'John Doe', responderInitials: 'JD', status: 'RESOLVED', typeIcon: 'call', typeBg: '#d9d9e6', typeColor: '#1A1A1A', responderBg: '#dde1ff', statusBg: '#d9d9e6', statusColor: '#1b1b20', action: 'VIEW' },
    { id: '4', type: 'Panic Button Pressed', time: '13:12:00', date: 'Today, Oct 12', user: 'Alex Thorne', responder: 'Rachel Smith', responderInitials: 'RS', status: 'OPEN', typeIcon: 'warning', typeBg: '#ffdad6', typeColor: '#ba1a1a', responderBg: '#d9d9e6', statusBg: '#ba1a1a', statusColor: '#ffffff', action: 'INTERVENE' },
  ];

  return (
    <View className="flex-1 bg-surface">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-50">
        <View className="flex-row items-center gap-4">
          <Text className="font-headline-md text-primary font-bold text-2xl md:text-3xl">Crisis Event Log</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high relative">
            <Ionicons name="notifications" size={24} color="#002da5" />
            <View className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border border-surface" />
          </TouchableOpacity>
          <View className="hidden sm:flex-row items-center gap-3">
            <View className="items-end">
              <Text className="font-label-bold text-ink-black font-bold text-sm">Admin Profile</Text>
              <Text className="text-[10px] opacity-60">Operations</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 flex-row">
        {/* NavigationDrawer (Sidebar) - Desktop Only */}
        <View className="hidden md:flex flex-col gap-2 p-4 h-full w-72 bg-[#f5f2f9] border-r-[1.5px] border-ink-black">
          <View className="mb-8 px-2 flex-col items-start gap-1">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Admin Console</Text>
            <Text className="font-label-md text-on-surface-variant text-sm">Mental Health Platform</Text>
            <Text className="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">v2.4.0</Text>
          </View>
          <ScrollView className="flex-1">
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2" onPress={() => router.push('/admin/dashboard')}>
              <Ionicons name="grid" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2" onPress={() => router.push('/admin/users')}>
              <Ionicons name="people" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Therapists</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="shield-checkmark" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Safety Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="hardware-chip" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Risk AI</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-primary-container border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-2">
              <Ionicons name="warning" size={20} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold text-sm">Crisis Center</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="card" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Payments</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="chatbubbles" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Moderation</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="settings-outline" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Settings</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Main Content Area */}
        <ScrollView className="flex-1 p-4 md:p-10 mb-20 md:mb-0">
          
          {/* Live Ticker / High Priority Banner */}
          <View className="bg-[#ffdad6] border-[1.5px] border-ink-black rounded-xl overflow-hidden mb-8">
            <View className="flex-row items-center bg-[#ba1a1a] px-4 py-2 gap-2">
              <Ionicons name="warning" size={20} color="#ffffff" />
              <Text className="text-white font-label-bold font-bold text-xs uppercase">URGENT: 4 ACTIVE CRISIS EVENTS REQUIRE IMMEDIATE ATTENTION</Text>
            </View>
            <View className="p-3 bg-white flex-row flex-wrap gap-4 items-center">
              <View className="flex-row items-center gap-2 px-3 py-1 bg-[#ffdad6] rounded-full border-[1.5px] border-ink-black">
                <View className="w-2 h-2 bg-[#ba1a1a] rounded-full" />
                <Text className="text-[#93000a] font-label-bold font-bold text-[10px]">LAST SOS: 3 MIN AGO</Text>
              </View>
              <View className="flex-row items-center gap-2 px-3 py-1 bg-[#fdd33f] rounded-full border-[1.5px] border-ink-black">
                <Text className="text-[#715b00] font-label-bold font-bold text-[10px]">AVG RESPONSE: 45 SEC</Text>
              </View>
              <Text className="flex-1 text-right text-on-surface-variant font-label-md text-[12px]">Current System Load: <Text className="text-primary font-bold">Stable</Text></Text>
            </View>
          </View>

          {/* Filters & Search */}
          <View className="flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <View className="flex-row flex-wrap gap-3">
              <TouchableOpacity className="bg-secondary-container border-[1.5px] border-ink-black rounded-lg px-4 py-2 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none flex-row items-center gap-2">
                <Ionicons name="filter" size={16} color="#715b00" />
                <Text className="text-on-secondary-container font-label-bold font-bold text-sm">All Incidents</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container border-[1.5px] border-ink-black rounded-lg px-4 py-2 flex-row items-center gap-2 active:bg-surface-container-high">
                <Ionicons name="alert-circle" size={16} color="#ba1a1a" />
                <Text className="text-on-surface-variant font-label-bold font-bold text-sm">Open Only</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container border-[1.5px] border-ink-black rounded-lg px-4 py-2 flex-row items-center gap-2 active:bg-surface-container-high">
                <Ionicons name="checkmark-done" size={16} color="#434655" />
                <Text className="text-on-surface-variant font-label-bold font-bold text-sm">Resolved</Text>
              </TouchableOpacity>
            </View>
            <View className="relative w-full md:w-80 flex-row items-center">
              <Ionicons name="search" size={20} color="#747687" className="absolute left-3 z-10" />
              <TextInput 
                className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl pl-10 pr-4 py-2 font-body-md text-ink-black"
                placeholder="Search incidents, users..."
                placeholderTextColor="#747687"
              />
            </View>
          </View>

          {/* Crisis Logs List (Card based for React Native) */}
          <View className="flex-col gap-4">
            {incidents.map((incident) => (
              <View key={incident.id} className={`bg-white border-[1.5px] border-ink-black rounded-[24px] p-4 md:p-6 flex-col md:flex-row items-start md:items-center justify-between gap-4 ${incident.status === 'RESOLVED' ? 'opacity-70 grayscale' : ''}`}>
                <View className="flex-row items-center gap-3 w-full md:w-[25%]">
                  <View className="p-2 rounded-lg border-[1.5px] border-ink-black" style={{ backgroundColor: incident.typeBg }}>
                    <Ionicons name={incident.typeIcon as any} size={20} color={incident.typeColor} />
                  </View>
                  <Text className="font-label-bold text-ink-black font-bold text-sm flex-1">{incident.type}</Text>
                </View>
                
                <View className="flex-col w-full md:w-[15%]">
                  <Text className="font-label-bold text-ink-black font-bold text-sm">{incident.time}</Text>
                  <Text className="text-[10px] opacity-60 text-ink-black">{incident.date}</Text>
                </View>

                <View className="flex-row items-center gap-2 w-full md:w-[20%]">
                  <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                    <Ionicons name="person" size={16} color="#1A1A1A" />
                  </View>
                  <Text className="font-label-md text-ink-black text-sm">{incident.user}</Text>
                </View>

                <View className="flex-row items-center gap-2 w-full md:w-[20%]">
                  {incident.responderInitials ? (
                    <View className="w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center" style={{ backgroundColor: incident.responderBg }}>
                      <Text className="text-[10px] font-bold text-ink-black">{incident.responderInitials}</Text>
                    </View>
                  ) : (
                    <View className="w-8 h-8 rounded-full" />
                  )}
                  <Text className={`font-label-md text-sm ${!incident.responderInitials ? 'italic opacity-60 text-ink-black' : 'text-ink-black'}`}>{incident.responder}</Text>
                </View>

                <View className="flex-row items-center justify-between w-full md:w-auto md:justify-end gap-4">
                  <View className="px-3 py-1 rounded-full border-[1.5px] border-ink-black items-center justify-center" style={{ backgroundColor: incident.statusBg }}>
                    <Text className="font-label-bold font-bold text-[10px]" style={{ color: incident.statusColor }}>{incident.status}</Text>
                  </View>

                  {incident.action === 'VIEW' ? (
                    <TouchableOpacity className="p-2 rounded-lg active:bg-surface-container-high">
                      <Ionicons name="eye" size={24} color="#1A1A1A" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity className={`border-[1.5px] border-ink-black rounded-lg px-4 py-2 ${incident.action === 'INTERVENE' ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none' : 'bg-surface-container-high active:bg-surface-dim'}`}>
                      <Text className={`font-label-bold font-bold text-[10px] ${incident.action === 'INTERVENE' ? 'text-white' : 'text-ink-black'}`}>{incident.action}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Pagination */}
          <View className="p-6 bg-surface-container border-[1.5px] border-ink-black rounded-2xl flex-row justify-between items-center mt-6">
            <Text className="font-label-md text-ink-black text-sm">Showing <Text className="font-bold">4</Text> of 128 incidents</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-8 h-8 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-lg active:bg-surface-container-high">
                <Ionicons name="chevron-back" size={16} color="#1A1A1A" />
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 items-center justify-center bg-primary-container border-[1.5px] border-ink-black rounded-lg shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-on-primary-container font-bold text-xs">1</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-lg active:bg-surface-container-high">
                <Text className="font-label-bold text-ink-black font-bold text-xs">2</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-8 h-8 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-lg active:bg-surface-container-high">
                <Ionicons name="chevron-forward" size={16} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Crisis Hotspots / Summary Bento */}
          <View className="flex-row flex-wrap gap-6 justify-between mt-12">
            <View className="w-full sm:w-[48%] lg:w-[31%] bg-accent-pink p-6 rounded-[40px] border-[1.5px] border-ink-black flex-col justify-between h-48 relative overflow-hidden">
              <Ionicons name="warning" size={120} color="#1A1A1A" className="absolute -right-4 -bottom-4 opacity-10" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest text-xs opacity-70">Active Now</Text>
                <Text className="font-display-lg text-ink-black font-bold text-5xl mt-2">04</Text>
              </View>
              <Text className="text-[12px] font-label-bold text-ink-black font-bold">+2 since last hour</Text>
            </View>
            <View className="w-full sm:w-[48%] lg:w-[31%] bg-secondary-container p-6 rounded-[40px] border-[1.5px] border-ink-black flex-col justify-between h-48 relative overflow-hidden">
              <Ionicons name="time" size={120} color="#1A1A1A" className="absolute -right-4 -bottom-4 opacity-10" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest text-xs opacity-70">Avg. Response</Text>
                <Text className="font-display-lg text-ink-black font-bold text-5xl mt-2">45<Text className="text-2xl">s</Text></Text>
              </View>
              <Text className="text-[12px] font-label-bold text-on-secondary-container font-bold">Optimized State</Text>
            </View>
            <View className="w-full sm:w-[48%] lg:w-[31%] bg-accent-sage p-6 rounded-[40px] border-[1.5px] border-ink-black flex-col justify-between h-48 relative overflow-hidden">
              <Ionicons name="checkmark-circle" size={120} color="#1A1A1A" className="absolute -right-4 -bottom-4 opacity-10" />
              <View>
                <Text className="font-label-bold text-ink-black font-bold uppercase tracking-widest text-xs opacity-70">Resolved Today</Text>
                <Text className="font-display-lg text-ink-black font-bold text-5xl mt-2">24</Text>
              </View>
              <Text className="text-[12px] font-label-bold text-ink-black font-bold">92% Success Rate</Text>
            </View>
          </View>

        </ScrollView>
      </View>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity className="fixed absolute bottom-24 md:bottom-8 right-4 md:right-8 w-16 h-16 bg-primary rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center active:translate-y-[2px] active:shadow-none z-50">
        <Ionicons name="add" size={32} color="#ffffff" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar (Mobile only) */}
      <View className="md:hidden absolute bottom-0 left-0 w-full bg-surface border-t-[1.5px] border-ink-black flex-row justify-around items-center py-3 z-50">
        <TouchableOpacity className="flex-col items-center gap-1" onPress={() => router.push('/admin/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant font-bold">Dash</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="warning" size={24} color="#002da5" />
          <Text className="text-[10px] font-label-bold text-primary font-bold">Crisis</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="shield-checkmark" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant font-bold">Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="settings" size={24} color="#434655" />
          <Text className="text-[10px] font-label-bold text-on-surface-variant font-bold">Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
