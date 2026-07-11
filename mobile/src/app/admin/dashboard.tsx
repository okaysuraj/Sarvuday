import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Admin Portal
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="flex-row gap-4 mb-8">
          <View className="flex-1 bg-primary-fixed p-4 rounded-xl border border-primary-fixed-dim">
            <Text className="font-label-md text-on-primary-fixed-variant mb-1">Active Users</Text>
            <Text className="font-headline-md text-on-primary-fixed text-3xl font-bold">12.4k</Text>
          </View>
          <View className="flex-1 bg-secondary-fixed p-4 rounded-xl border border-secondary-fixed-dim">
            <Text className="font-label-md text-on-secondary-fixed-variant mb-1">Active Therapists</Text>
            <Text className="font-headline-md text-on-secondary-fixed text-3xl font-bold">450</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">System Management</Text>
        <View className="gap-4 mb-8">
          <TouchableOpacity 
            onPress={() => router.push('/admin/moderation')}
            className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-error-container items-center justify-center mr-4">
                <Ionicons name="warning" size={20} color="#ba1a1a" />
              </View>
              <View>
                <Text className="font-headline-md text-on-surface font-bold text-base">Content Moderation</Text>
                <Text className="font-body-md text-error text-sm">43 flagged posts require review</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/admin/users')}
            className="bg-surface-container-highest p-4 rounded-xl flex-row items-center justify-between border border-outline-variant"
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center mr-4">
                <Ionicons name="people" size={20} color="#1b1b20" />
              </View>
              <View>
                <Text className="font-headline-md text-on-surface font-bold text-base">User Directory</Text>
                <Text className="font-body-md text-on-surface-variant text-sm">Manage accounts and bans</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#747687" />
          </TouchableOpacity>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">System Alerts</Text>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant">
          <Text className="font-headline-md text-on-surface font-bold text-base mb-2">API Rate Limits Nominal</Text>
          <Text className="font-body-md text-on-surface-variant text-sm">OpenAI inference running at 45% capacity. Video servers running at 20% capacity.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
