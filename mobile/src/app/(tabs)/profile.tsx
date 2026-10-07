import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../../store/authStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-4 bg-background border-b border-outline">
        <Text className="text-on-surface font-semibold text-base tracking-tight">Account & Settings</Text>
        <TouchableOpacity 
          onPress={handleLogout}
          className="px-3 py-1 rounded-lg border border-outline bg-surface"
        >
          <Text className="text-xs font-medium text-error">Sign Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Profile Card */}
        <View className="bg-surface border border-outline rounded-2xl p-6 mb-6 flex-row items-center gap-4">
          <View className="w-16 h-16 rounded-full border border-outline bg-secondary-container items-center justify-center">
            <Ionicons name="person-outline" size={28} color="#2E4B3E" />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-lg font-bold tracking-tight">
              {user?.name || 'Member Profile'}
            </Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">
              {user?.email || 'member@sarvuday.com'}
            </Text>
            <View className="mt-2 self-start px-2 py-0.5 rounded-full bg-surface-container border border-outline">
              <Text className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                {user?.role === 'therapist' ? 'Clinical Provider' : 'Active Member'}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Settings List */}
        <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mb-3 px-1">
          Preferences
        </Text>

        <View className="bg-surface border border-outline rounded-2xl overflow-hidden mb-6">
          <TouchableOpacity 
            onPress={() => router.push('/profile/edit')}
            className="p-4 flex-row items-center justify-between border-b border-outline"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-surface-container items-center justify-center">
                <Ionicons name="create-outline" size={16} color="#18181B" />
              </View>
              <Text className="text-sm font-medium text-on-surface">Edit Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#8E8D9A" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/wallet')}
            className="p-4 flex-row items-center justify-between border-b border-outline"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-surface-container items-center justify-center">
                <Ionicons name="card-outline" size={16} color="#18181B" />
              </View>
              <Text className="text-sm font-medium text-on-surface">Billing & Consultations</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#8E8D9A" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="p-4 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-surface-container items-center justify-center">
                <Ionicons name="shield-checkmark-outline" size={16} color="#18181B" />
              </View>
              <Text className="text-sm font-medium text-on-surface">Data Privacy & Consent</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#8E8D9A" />
          </TouchableOpacity>
        </View>

        {/* Emergency Resources */}
        <View className="bg-surface-container border border-outline rounded-2xl p-5 mb-6">
          <View className="flex-row items-center gap-2 mb-1.5">
            <Ionicons name="alert-circle-outline" size={16} color="#932924" />
            <Text className="text-xs font-semibold text-error">Crisis Hotline Notice</Text>
          </View>
          <Text className="text-[11px] text-on-surface-variant leading-relaxed">
            Need urgent assistance? Reach out to the national mental health crisis helpline by calling or texting 988 anytime.
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}
