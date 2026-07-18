import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function WearablesScreen() {
  const router = useRouter();
  const [hrEnabled, setHrEnabled] = useState(true);
  const [sleepEnabled, setSleepEnabled] = useState(true);
  const [activityEnabled, setActivityEnabled] = useState(false);

  return (
    <View className="flex-1 bg-[#fbf8ff] flex-row">

      {/* Desktop Navigation Drawer */}
      <View className="hidden md:flex flex-col w-[280px] bg-[#fbf8ff] border-r-[1.5px] border-ink-black p-6 shadow-[4px_0px_0px_0px_#1A1A1A] z-[60]">
        <View className="mb-10 flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black bg-[#ffdad6] overflow-hidden items-center justify-center">
            <Ionicons name="person" size={24} color="#1A1A1A" />
          </View>
          <View>
            <Text className="font-label-bold font-bold text-ink-black">Saurabh</Text>
            <Text className="text-xs text-on-surface-variant">Pro Member</Text>
          </View>
        </View>

        <View className="flex-1 flex-col gap-2">
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-surface-variant transition-colors" onPress={() => router.push('/patient/dashboard')}>
            <Ionicons name="happy-outline" size={24} color="#1A1A1A" />
            <Text className="text-ink-black font-body-md">Mood Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-surface-variant transition-colors">
            <Ionicons name="document-text-outline" size={24} color="#1A1A1A" />
            <Text className="text-ink-black font-body-md">My Records</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg bg-primary border-[1.5px] border-ink-black transition-colors">
            <Ionicons name="watch" size={24} color="#ffffff" />
            <Text className="text-white font-body-md">Wearables</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 p-3 rounded-lg hover:bg-surface-variant transition-colors">
            <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
            <Text className="text-ink-black font-body-md">Settings</Text>
          </TouchableOpacity>
        </View>

        <View className="pt-6 border-t-[1.5px] border-ink-black">
          <TouchableOpacity className="flex-row items-center gap-3 p-3 text-on-surface-variant hover:text-primary transition-colors">
            <Ionicons name="help-circle-outline" size={24} color="#434655" />
            <Text className="text-on-surface-variant font-body-md">Help Center</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1">
        {/* Top App Bar */}
        <View className="flex-row justify-between items-center px-4 md:px-10 py-4 border-b-[1.5px] border-ink-black bg-[#fbf8ff] z-50 sticky top-0">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()} className="p-2 active:bg-surface-variant transition-colors rounded-full">
              <Ionicons name="arrow-back" size={24} color="#002da5" />
            </TouchableOpacity>
            <Text className="font-headline-md font-bold text-primary text-2xl">SarvUday</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={32} color="#002da5" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          
          {/* Welcome Section */}
          <View className="mb-12">
            <Text className="font-display-lg text-ink-black font-bold text-3xl mb-4">Connect Devices</Text>
            <Text className="font-body-lg text-on-surface-variant text-lg max-w-2xl">Manage your health ecosystem. Sync your wearables to provide a holistic view of your mental and physical well-being.</Text>
          </View>

          <View className="flex-col lg:flex-row gap-6">
            
            {/* Active Device Panel */}
            <View className="lg:w-[65%] flex-col gap-6">
              
              <View className="bg-[#d9d9e6] p-8 rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A]">
                <View className="flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <View className="flex-row gap-4 items-center">
                    <View className="w-16 h-16 bg-white border-[1.5px] border-ink-black rounded-2xl items-center justify-center">
                      <Ionicons name="watch" size={32} color="#002da5" />
                    </View>
                    <View>
                      <Text className="font-headline-sm text-ink-black font-bold text-xl">Apple Watch Series 9</Text>
                      <View className="flex-row items-center gap-2 mt-1">
                        <View className="w-3 h-3 bg-green-500 rounded-full border border-ink-black" />
                        <Text className="font-label-bold text-on-surface-variant font-bold text-xs uppercase">Connected & Syncing</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-4 py-2 rounded-xl active:bg-surface-variant transition-colors">
                    <Text className="font-label-bold text-ink-black font-bold">Disconnect</Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-col md:flex-row gap-6">
                  {/* Permission Toggles */}
                  <View className="flex-1 bg-white/50 border-[1.5px] border-ink-black p-6 rounded-2xl">
                    <Text className="font-label-bold text-ink-black font-bold mb-4 uppercase tracking-wider text-sm">Data Sync Permissions</Text>
                    <View className="flex-col gap-4">
                      
                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                          <Ionicons name="heart" size={24} color="#002da5" />
                          <Text className="font-body-md text-ink-black">Heart Rate</Text>
                        </View>
                        <Switch 
                          value={hrEnabled} 
                          onValueChange={setHrEnabled} 
                          trackColor={{ false: '#e4e1e8', true: '#002da5' }} 
                          thumbColor="#ffffff" 
                          ios_backgroundColor="#e4e1e8"
                        />
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                          <Ionicons name="moon" size={24} color="#002da5" />
                          <Text className="font-body-md text-ink-black">Sleep Tracking</Text>
                        </View>
                        <Switch 
                          value={sleepEnabled} 
                          onValueChange={setSleepEnabled} 
                          trackColor={{ false: '#e4e1e8', true: '#002da5' }} 
                          thumbColor="#ffffff" 
                          ios_backgroundColor="#e4e1e8"
                        />
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-3">
                          <Ionicons name="walk" size={24} color="#002da5" />
                          <Text className="font-body-md text-ink-black">Daily Activity</Text>
                        </View>
                        <Switch 
                          value={activityEnabled} 
                          onValueChange={setActivityEnabled} 
                          trackColor={{ false: '#e4e1e8', true: '#002da5' }} 
                          thumbColor="#ffffff" 
                          ios_backgroundColor="#e4e1e8"
                        />
                      </View>

                    </View>
                  </View>

                  {/* Sync Status */}
                  <View className="flex-1 bg-white/50 border-[1.5px] border-ink-black p-6 rounded-2xl justify-between">
                    <View>
                      <Text className="font-label-bold text-ink-black font-bold mb-4 uppercase tracking-wider text-sm">Sync Progress</Text>
                      <View className="flex-row justify-between mb-2">
                        <Text className="font-label-md text-ink-black">Last synced 2m ago</Text>
                        <Text className="font-label-md text-ink-black">85%</Text>
                      </View>
                      <View className="w-full h-3 bg-[#e4e1e8] rounded-full border-[1.5px] border-ink-black flex-row">
                        <View className="h-full bg-primary border-r-[1.5px] border-ink-black" style={{ width: '85%' }} />
                      </View>
                    </View>
                    <TouchableOpacity className="mt-6 w-full py-3 bg-primary border-[1.5px] border-ink-black rounded-xl shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform items-center">
                      <Text className="text-white font-label-bold font-bold">Force Refresh</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

              {/* Recommended Actions */}
              <View className="flex-col md:flex-row gap-6">
                <View className="flex-1 bg-[#ffd9df] p-6 rounded-[32px] border-dashed border-[2px] border-ink-black items-center text-center">
                  <Ionicons name="add-circle-outline" size={48} color="#1A1A1A" className="mb-3" />
                  <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2 text-center">Add New Device</Text>
                  <Text className="text-on-surface-variant font-body-md mb-4 text-center">Connect a second wearable or fitness equipment.</Text>
                  <TouchableOpacity className="bg-white border-[1.5px] border-ink-black px-6 py-2 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-1 active:translate-y-1 active:shadow-none transition-transform">
                    <Text className="font-label-bold text-ink-black font-bold">Scan Nearby</Text>
                  </TouchableOpacity>
                </View>

                <View className="flex-1 bg-white p-6 rounded-[32px] border-[1.5px] border-ink-black">
                  <View className="flex-row items-center gap-4 mb-4">
                    <View className="p-3 bg-[#fdd33f] border-[1.5px] border-ink-black rounded-xl">
                      <Ionicons name="shield-checkmark" size={24} color="#715b00" />
                    </View>
                    <Text className="font-headline-sm text-ink-black font-bold text-xl">Privacy Vault</Text>
                  </View>
                  <Text className="text-on-surface-variant font-body-md mb-4">Your health data is encrypted end-to-end. Only you can view your detailed biometric logs.</Text>
                  <TouchableOpacity className="flex-row items-center gap-1">
                    <Text className="text-primary font-label-bold font-bold underline">Manage Privacy Settings</Text>
                    <Ionicons name="open-outline" size={14} color="#002da5" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Side Cards: Available Integrations */}
            <View className="lg:w-[32%] flex-col gap-6">
              
              <View className="bg-white border-[1.5px] border-ink-black rounded-[40px] p-8">
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-6">Popular Integrations</Text>
                
                <View className="flex-col gap-6">
                  {/* Fitbit */}
                  <TouchableOpacity className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-12 h-12 bg-[#f5f2f9] border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                        <Ionicons name="fitness-outline" size={24} color="#1A1A1A" />
                      </View>
                      <View>
                        <Text className="font-label-bold text-ink-black font-bold">Fitbit</Text>
                        <Text className="text-xs text-on-surface-variant">Alta, Charge, Sense</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#434655" />
                  </TouchableOpacity>
                  <View className="border-t-[1.5px] border-ink-black opacity-10" />

                  {/* Oura */}
                  <TouchableOpacity className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-12 h-12 bg-[#f5f2f9] border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                        <Ionicons name="ellipse-outline" size={24} color="#1A1A1A" />
                      </View>
                      <View>
                        <Text className="font-label-bold text-ink-black font-bold">Oura Ring</Text>
                        <Text className="text-xs text-on-surface-variant">Sleep & Readiness</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#434655" />
                  </TouchableOpacity>
                  <View className="border-t-[1.5px] border-ink-black opacity-10" />

                  {/* Garmin */}
                  <TouchableOpacity className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View className="w-12 h-12 bg-[#f5f2f9] border-[1.5px] border-ink-black rounded-xl items-center justify-center">
                        <Ionicons name="compass-outline" size={24} color="#1A1A1A" />
                      </View>
                      <View>
                        <Text className="font-label-bold text-ink-black font-bold">Garmin</Text>
                        <Text className="text-xs text-on-surface-variant">Fenix, Venu, Forerunner</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#434655" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity className="mt-8 w-full py-4 bg-[#d9d9e6] border-[1.5px] border-ink-black rounded-2xl active:bg-surface-variant transition-colors items-center">
                  <Text className="font-label-bold text-ink-black font-bold">View All 50+ Apps</Text>
                </TouchableOpacity>
              </View>

              {/* Stats Summary Sticker */}
              <View className="bg-[#fdd33f] border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A]">
                <Ionicons name="pulse" size={32} color="#715b00" className="mb-4" />
                <Text className="font-headline-sm text-ink-black font-bold text-xl mb-2">Sync Health</Text>
                <Text className="text-[#564500] font-body-md mb-6">98% of your data has been successfully integrated this week.</Text>
                <View className="flex-row -space-x-2">
                  <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-[#ffd9df] items-center justify-center">
                    <Ionicons name="heart" size={16} color="#1A1A1A" />
                  </View>
                  <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-[#ffdad6] items-center justify-center">
                    <Ionicons name="walk" size={16} color="#1A1A1A" />
                  </View>
                  <View className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-primary items-center justify-center">
                    <Ionicons name="moon" size={16} color="#ffffff" />
                  </View>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Navigation Bar */}
      <View className="md:hidden absolute bottom-0 w-full z-50 bg-[#fbf8ff] border-t-[1.5px] border-ink-black h-20 px-4 flex-row justify-around items-center">
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/dashboard')}>
          <Ionicons name="home-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/ai_personality')}>
          <Ionicons name="chatbubbles-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs">AI Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center" onPress={() => router.push('/patient/therapist_list')}>
          <Ionicons name="calendar-outline" size={24} color="#434655" />
          <Text className="font-label-md text-on-surface-variant text-xs">Book</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center justify-center bg-[#fdd33f] border-[1.5px] border-ink-black rounded-xl px-4 py-1">
          <Ionicons name="person" size={24} color="#715b00" />
          <Text className="font-label-md text-[#715b00] font-bold text-xs">Profile</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}
