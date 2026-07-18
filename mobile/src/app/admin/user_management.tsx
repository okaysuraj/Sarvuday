import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function UserManagementScreen() {
  const router = useRouter();

  const users = [
    { id: '1', name: 'Dr. Aris Thorne', email: 'aris.thorne@mindguard.io', role: 'Elite Tier', status: 'Active', bgColor: '#ffdad6', color: '#2D5A27', bgStatus: '#E2F7E1' },
    { id: '2', name: 'Julian Marc', email: 'j.marc@network.com', role: 'Pro Tier', status: 'Suspended', bgColor: '#ffd9df', color: '#93000a', bgStatus: '#ffdad6' },
    { id: '3', name: 'Sarah Jenkins', email: 's.jenkins@hospitals.org', role: 'Elite Tier', status: 'Active', bgColor: '#d9d9e6', color: '#2D5A27', bgStatus: '#E2F7E1' },
    { id: '4', name: 'David Chen', email: 'd.chen@innovation.ai', role: 'Pro Tier', status: 'Active', bgColor: '#dde1ff', color: '#2D5A27', bgStatus: '#E2F7E1' },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff]">
      {/* TopAppBar */}
      <View className="flex-row justify-between items-center px-4 md:px-10 py-4 w-full bg-surface border-b-[1.5px] border-ink-black sticky top-0 z-50">
        <View className="flex-row items-center gap-4">
          <Text className="font-headline-md text-primary font-bold text-2xl md:text-3xl">MindGuard Admin</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <TouchableOpacity className="p-2 rounded-full active:bg-surface-container-high">
            <Ionicons name="notifications" size={24} color="#1b1b20" />
          </TouchableOpacity>
          <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={20} color="#1A1A1A" />
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
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl bg-primary-container border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-2">
              <Ionicons name="people" size={20} color="#ffffff" />
              <Text className="font-label-bold text-white font-bold text-sm">Therapists</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="shield-checkmark" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Safety Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="hardware-chip" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Risk AI</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-3 px-4 py-3 rounded-xl active:bg-surface-container-high mb-2">
              <Ionicons name="warning" size={20} color="#434655" />
              <Text className="font-label-md text-on-surface-variant text-sm">Crisis Center</Text>
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
          
          {/* Page Header & Search */}
          <View className="mb-12 flex-col md:flex-row md:items-end justify-between gap-6">
            <View>
              <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">User Directory</Text>
              <Text className="text-on-surface-variant font-body-md max-w-xl text-base">Manage platform access, monitor safety profiles, and verify membership status for all therapists and users.</Text>
            </View>
            <View className="relative w-full md:w-96 flex-row items-center">
              <Ionicons name="search" size={20} color="#434655" className="absolute left-4 z-10" />
              <TextInput 
                className="w-full pl-12 pr-4 py-4 bg-[#f9f8f3] rounded-xl border-[1.5px] border-ink-black text-ink-black font-body-md text-base"
                placeholder="Search by name, email, or ID..."
                placeholderTextColor="#747687"
              />
            </View>
          </View>

          {/* Dashboard Stats Bar */}
          <View className="flex-row flex-wrap gap-6 justify-between mb-12">
            <View className="w-full sm:w-[48%] lg:w-[23%] bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-2">
              <Text className="font-label-bold text-[#663a43] font-bold text-xs uppercase">Total Users</Text>
              <Text className="font-display-lg text-ink-black font-bold text-4xl">12,482</Text>
            </View>
            <View className="w-full sm:w-[48%] lg:w-[23%] bg-secondary-fixed border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-2">
              <Text className="font-label-bold text-[#564500] font-bold text-xs uppercase">Active Now</Text>
              <Text className="font-display-lg text-ink-black font-bold text-4xl">1,204</Text>
            </View>
            <View className="w-full sm:w-[48%] lg:w-[23%] bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-2">
              <Text className="font-label-bold text-on-surface-variant font-bold text-xs uppercase">Pending Verif.</Text>
              <Text className="font-display-lg text-ink-black font-bold text-4xl">45</Text>
            </View>
            <View className="w-full sm:w-[48%] lg:w-[23%] bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 flex-col gap-2">
              <Text className="font-label-bold text-error font-bold text-xs uppercase">Flagged</Text>
              <Text className="font-display-lg text-ink-black font-bold text-4xl">12</Text>
            </View>
          </View>

          {/* User Directory List */}
          <View className="flex-col gap-4">
            {users.map((user) => (
              <View key={user.id} className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col md:flex-row items-center justify-between gap-6 hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
                <View className="flex-row items-center gap-6 w-full md:w-auto">
                  <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black overflow-hidden items-center justify-center" style={{ backgroundColor: user.bgColor }}>
                    <Ionicons name="person" size={32} color="#1A1A1A" />
                  </View>
                  <View>
                    <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">{user.name}</Text>
                    <Text className="text-on-surface-variant font-body-md text-sm">{user.email}</Text>
                  </View>
                </View>

                <View className="flex-row flex-wrap items-center gap-4 w-full md:w-auto justify-end">
                  <View className="px-4 py-1 rounded-full border border-ink-black bg-secondary-container">
                    <Text className="text-on-secondary-container font-label-bold font-bold text-xs">{user.role}</Text>
                  </View>
                  <View className="px-4 py-1 rounded-full border border-ink-black" style={{ backgroundColor: user.bgStatus }}>
                    <Text className="font-label-bold font-bold text-xs" style={{ color: user.color }}>{user.status}</Text>
                  </View>
                  <View className="hidden md:flex h-8 w-[1.5px] bg-ink-black/10 mx-2" />
                  <View className="flex-row gap-2">
                    <TouchableOpacity className="bg-primary text-white border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:shadow-none px-6 py-2 rounded-xl items-center justify-center">
                      <Text className="font-label-bold text-white font-bold text-sm">{user.status === 'Suspended' ? 'Review' : 'Manage'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-surface border-[1.5px] border-ink-black px-4 py-2 rounded-xl items-center justify-center active:bg-surface-container-high">
                      <Ionicons name="ellipsis-vertical" size={20} color="#1A1A1A" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Pagination */}
          <View className="mt-12 flex-row items-center justify-center gap-4">
            <TouchableOpacity className="w-12 h-12 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-high">
              <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity className="w-12 h-12 items-center justify-center bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[2px_2px_0px_0px_#1A1A1A]">
                <Text className="font-label-bold text-white font-bold text-sm">1</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-high">
                <Text className="font-label-bold text-ink-black font-bold text-sm">2</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-12 h-12 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-high">
                <Text className="font-label-bold text-ink-black font-bold text-sm">3</Text>
              </TouchableOpacity>
              <Text className="px-2">...</Text>
              <TouchableOpacity className="w-12 h-12 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-high">
                <Text className="font-label-bold text-ink-black font-bold text-sm">12</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="w-12 h-12 items-center justify-center bg-white border-[1.5px] border-ink-black rounded-xl active:bg-surface-container-high">
              <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity className="fixed absolute bottom-24 md:bottom-10 right-4 md:right-10 w-16 h-16 bg-secondary-container rounded-full border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center active:translate-y-[2px] active:shadow-none z-50">
        <Ionicons name="person-add" size={28} color="#715b00" />
      </TouchableOpacity>

      {/* Bottom Navigation Bar (Mobile only) */}
      <View className="md:hidden absolute bottom-0 left-0 w-full bg-[#f5f2f9] border-t-[1.5px] border-ink-black flex-row justify-around items-center py-3 z-50">
        <TouchableOpacity className="flex-col items-center gap-1" onPress={() => router.push('/admin/dashboard')}>
          <Ionicons name="grid" size={24} color="#434655" />
          <Text className="text-[10px] font-label-md text-on-surface-variant font-bold">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="people" size={24} color="#002da5" />
          <Text className="text-[10px] font-label-bold text-primary font-bold">Users</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="shield-checkmark" size={24} color="#434655" />
          <Text className="text-[10px] font-label-md text-on-surface-variant font-bold">Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center gap-1">
          <Ionicons name="settings" size={24} color="#434655" />
          <Text className="text-[10px] font-label-md text-on-surface-variant font-bold">Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
