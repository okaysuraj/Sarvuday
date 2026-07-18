import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage">
           <Ionicons name="person" size={40} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Header */}
        <View className="flex-col items-center mb-10">
          <View className="relative">
            <View className="w-32 h-32 rounded-full border-[2.5px] border-ink-black overflow-hidden p-1 bg-surface-container-lowest">
              <View className="w-full h-full rounded-full overflow-hidden border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                <Ionicons name="person" size={80} color="#1A1A1A" />
              </View>
            </View>
            <View className="absolute -bottom-2 -right-2 bg-secondary-container border-[1.5px] border-ink-black px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Text className="font-label-bold text-on-secondary-container uppercase font-bold text-xs">PRO MEMBER</Text>
            </View>
          </View>
          <Text className="font-headline-sm text-ink-black font-bold text-2xl mt-6 mb-1">
            {user?.name || 'Loading...'}
          </Text>
          <Text className="font-body-md text-on-surface-variant">
            {user?.email || ''}
          </Text>
        </View>

        <Text className="font-label-bold text-on-surface-variant uppercase tracking-widest font-bold mb-4">My Profile</Text>

        <View className="flex-col gap-4">
          <TouchableOpacity 
            onPress={() => router.push('/profile/edit')}
            className="w-full flex-row justify-between items-center bg-accent-pink rounded-[24px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-ink-black flex items-center justify-center">
                <Ionicons name="pencil" size={20} color="#ffffff" />
              </View>
              <Text className="font-headline-sm text-[18px] text-ink-black font-bold">Edit Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <TouchableOpacity className="w-full flex-row justify-between items-center bg-white rounded-[24px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-primary-container border-[1.5px] border-ink-black flex items-center justify-center">
                <Ionicons name="settings" size={20} color="#ffffff" />
              </View>
              <Text className="font-headline-sm text-[18px] text-ink-black font-bold">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <TouchableOpacity className="w-full flex-row justify-between items-center bg-accent-sage rounded-[24px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-ink-black flex items-center justify-center">
                <Ionicons name="shield-checkmark" size={20} color="#ffffff" />
              </View>
              <Text className="font-headline-sm text-[18px] text-ink-black font-bold">Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="w-full flex-row justify-between items-center bg-error-container rounded-[24px] p-6 border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-error border-[1.5px] border-ink-black flex items-center justify-center">
                <Ionicons name="log-out" size={20} color="#ffffff" />
              </View>
              <Text className="font-headline-sm text-[18px] text-on-error-container font-bold">Logout</Text>
            </View>
            <Ionicons name="log-out" size={24} color="#93000a" />
          </TouchableOpacity>
        </View>

        {/* Decorative CTA */}
        <View className="mt-12 mb-8 p-6 bg-primary text-white rounded-[32px] border-[1.5px] border-ink-black shadow-[4px_4px_0px_0px_#1A1A1A] relative overflow-hidden">
          <View className="relative z-10">
            <Text className="font-headline-sm text-white font-bold mb-2 text-xl">Need a break?</Text>
            <Text className="font-body-md text-white opacity-90 mb-4">Try a 2-minute mindful breathing session.</Text>
            <TouchableOpacity 
              onPress={() => router.push('/exercises')}
              className="bg-secondary-container px-6 py-3 rounded-full border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] w-40 items-center active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
            >
              <Text className="text-ink-black font-label-bold font-bold">Start Session</Text>
            </TouchableOpacity>
          </View>
          <View className="absolute -top-4 -right-4 w-24 h-24 bg-accent-pink rounded-full border-[1.5px] border-ink-black opacity-20" />
          <View className="absolute -bottom-8 left-1/2 w-32 h-32 bg-accent-orange rotate-45 border-[1.5px] border-ink-black opacity-10" />
        </View>

      </ScrollView>
    </View>
  );
}
