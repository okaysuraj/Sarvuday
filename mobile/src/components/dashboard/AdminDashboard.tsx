import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';
import { userApi } from '../../api/user';

export const AdminDashboard = () => {
  const user = useAuthStore(state => state.user);
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await userApi.getAdminDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching admin dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-primary-fixed">
            <Image 
              source={{ uri: 'https://api.dicebear.com/7.x/notionists/png?seed=Admin' }}
              className="w-full h-full object-cover"
            />
          </View>
          <View>
            <Text className="font-headline-sm text-on-background font-bold text-xl">System Overview</Text>
            <Text className="font-label-md text-on-surface-variant opacity-70">Real-time health telemetry</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 flex items-center justify-center rounded-xl border-[1.5px] border-ink-black bg-surface shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="notifications" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      {/* Key Metrics Grid */}
      <View className="gap-4 mb-8">
        {/* Total Active Users */}
        <View className="bg-primary-fixed border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
          <View className="flex-row justify-between items-start">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center">
              <Ionicons name="people" size={24} color="#002da5" />
            </View>
            <View className="bg-white/50 px-2 py-1 rounded border border-ink-black">
              <Text className="font-label-bold text-xs text-ink-black">Live</Text>
            </View>
          </View>
          <View>
            <Text className="font-label-md text-on-surface-variant">Total Active Users</Text>
            <Text className="font-headline-md text-ink-black text-3xl font-bold">{dashboardData?.total_active_users || 0}</Text>
          </View>
        </View>

        {/* Active Therapists */}
        <View className="bg-secondary-fixed border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
          <View className="flex-row justify-between items-start">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center">
              <Ionicons name="medical" size={24} color="#725c00" />
            </View>
          </View>
          <View>
            <Text className="font-label-md text-on-surface-variant">Active Therapists</Text>
            <Text className="font-headline-md text-ink-black text-3xl font-bold">{dashboardData?.active_therapists || 0}</Text>
          </View>
        </View>

        {/* Total Revenue */}
        <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
          <View className="flex-row justify-between items-start">
            <View className="w-12 h-12 bg-white border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center">
              <Ionicons name="cash" size={24} color="#1b1b20" />
            </View>
          </View>
          <View>
            <Text className="font-label-md text-on-surface-variant">Total Revenue</Text>
            <Text className="font-headline-md text-ink-black text-3xl font-bold">${dashboardData?.total_revenue?.toLocaleString() || '0'}</Text>
          </View>
        </View>
      </View>

      {/* Safety Snapshot */}
      <View className="bg-surface border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Safety Snapshot</Text>
            <Text className="font-label-md text-on-surface-variant text-xs mt-1">Current Critical Incidents</Text>
          </View>
          <View className="bg-error-container border border-ink-black px-3 py-1 rounded-full">
            <Text className="font-label-bold text-on-error-container text-[10px]">1 HIGH RISK</Text>
          </View>
        </View>

        <View className="flex-col gap-4">
          <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center gap-4">
            <View className="w-12 h-12 bg-accent-orange border border-ink-black rounded-xl flex items-center justify-center">
              <Ionicons name="warning" size={24} color="#ba1a1a" />
            </View>
            <View className="flex-1">
              <Text className="font-label-bold text-ink-black">Suicidal Ideation Detection</Text>
              <Text className="font-body-md text-on-surface-variant text-xs mt-1">User ID: #88219 • Detected 4m ago</Text>
            </View>
            <TouchableOpacity className="bg-primary px-3 py-2 border-[1.5px] border-ink-black rounded-lg">
              <Text className="font-label-bold text-on-primary text-xs">Intervene</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* AI Risk Distribution */}
      <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
        <View>
          <Text className="font-headline-sm text-ink-black font-bold text-xl">AI Risk Levels</Text>
          <Text className="text-on-surface-variant text-sm mt-1">Sentiment variance across live chats</Text>
        </View>
        
        <View className="flex-col gap-4">
          <View className="space-y-2">
            <View className="flex-row justify-between text-xs font-label-bold mb-1">
              <Text className="font-label-bold">High Risk (Escalated)</Text>
              <Text className="font-label-bold">14%</Text>
            </View>
            <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
              <View className="h-full bg-error" style={{ width: '14%' }} />
            </View>
          </View>

          <View className="space-y-2 mt-4">
            <View className="flex-row justify-between text-xs font-label-bold mb-1">
              <Text className="font-label-bold">Monitoring Needed</Text>
              <Text className="font-label-bold">38%</Text>
            </View>
            <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
              <View className="h-full bg-secondary-container" style={{ width: '38%' }} />
            </View>
          </View>
          
          <View className="space-y-2 mt-4">
            <View className="flex-row justify-between text-xs font-label-bold mb-1">
              <Text className="font-label-bold">Stable Sentiment</Text>
              <Text className="font-label-bold">48%</Text>
            </View>
            <View className="w-full h-4 bg-white border-[1.5px] border-ink-black rounded-full overflow-hidden">
              <View className="h-full bg-primary" style={{ width: '48%' }} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
