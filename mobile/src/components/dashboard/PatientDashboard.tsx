import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';
import { userApi } from '../../api/user';
import { format } from 'date-fns';

export const PatientDashboard = () => {
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await userApi.getPatientDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboard();
  }, []);
  
  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="small" color="#18181B" />
      </View>
    );
  }

  const userName = user?.name || dashboardData?.user?.name || 'Member';

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}>
      {/* Greeting Section */}
      <View className="flex-row items-center justify-between mb-8">
        <View>
          <Text className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase mb-1">Daily Overview</Text>
          <Text className="text-on-surface text-2xl font-bold tracking-tight">{userName}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/profile')}
          className="w-11 h-11 rounded-full border border-outline overflow-hidden bg-surface-container"
        >
          <Image 
            source={{ uri: dashboardData?.user?.profile_pic || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix' }}
            className="w-full h-full object-cover"
          />
        </TouchableOpacity>
      </View>

      {/* Editorial Affirmation Bento Card */}
      <View className="bg-surface border border-outline rounded-2xl p-6 mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-2 h-2 rounded-full bg-secondary" />
            <Text className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-widest">Mindful Focus</Text>
          </View>
          <Text className="text-on-surface-variant text-xs">Today</Text>
        </View>
        <Text className="text-on-surface text-base font-normal leading-relaxed text-[#2F3437]">
          "Every day is a new canvas. Breathe deeply, ground your thoughts, and move with gentle intention."
        </Text>
      </View>

      {/* Quick Actions Bento Row */}
      <View className="flex-row gap-3 mb-6">
        {/* Chat with AI */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/ai_chat')}
          className="flex-1 bg-primary rounded-2xl p-5 justify-between min-h-[140px]"
        >
          <View className="flex-row justify-between items-start">
            <View className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
            </View>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" opacity={0.6} />
          </View>
          <View>
            <Text className="text-white font-semibold text-base">Assistant</Text>
            <Text className="text-white/70 text-xs mt-0.5">Private check-in</Text>
          </View>
        </TouchableOpacity>

        {/* Book Therapist */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/therapists')}
          className="flex-1 bg-surface border border-outline rounded-2xl p-5 justify-between min-h-[140px]"
        >
          <View className="flex-row justify-between items-start">
            <View className="w-9 h-9 bg-surface-container rounded-lg flex items-center justify-center">
              <Ionicons name="calendar-outline" size={18} color="#18181B" />
            </View>
            <Ionicons name="arrow-forward" size={16} color="#18181B" opacity={0.5} />
          </View>
          <View>
            <Text className="text-on-surface font-semibold text-base">Therapist</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Schedule session</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Upcoming Sessions Box */}
      <View className="bg-surface border border-outline rounded-2xl p-5 mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-on-surface font-semibold text-base">Upcoming Sessions</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/appointments')}>
            <Text className="text-on-surface-variant text-xs font-medium">View all</Text>
          </TouchableOpacity>
        </View>

        {dashboardData?.upcoming_sessions?.length > 0 ? (
          dashboardData.upcoming_sessions.map((session: any) => (
            <View key={session.session_id} className="bg-surface-container-low p-3.5 rounded-xl flex-row items-center border border-outline mb-2.5">
              <View className="w-12 h-12 bg-surface border border-outline rounded-lg items-center justify-center mr-3.5">
                <Text className="text-on-surface font-semibold text-base leading-tight">{format(new Date(session.session_scheduled_at), 'dd')}</Text>
                <Text className="text-on-surface-variant text-[10px] uppercase font-medium">{format(new Date(session.session_scheduled_at), 'MMM')}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-on-surface font-medium text-sm">Consultation</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">
                  {format(new Date(session.session_scheduled_at), 'hh:mm a')}
                </Text>
              </View>
              <TouchableOpacity 
                onPress={() => router.push(`/session/video/${session.session_id}` as any)} 
                className="bg-primary px-3.5 py-1.5 rounded-lg"
              >
                <Text className="text-white text-xs font-medium">Join</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="items-center py-6">
             <Text className="text-on-surface-variant text-xs">No upcoming sessions scheduled.</Text>
             <TouchableOpacity 
               onPress={() => router.push('/(tabs)/therapists')}
               className="mt-3 px-4 py-2 rounded-lg bg-surface-container border border-outline"
             >
               <Text className="text-on-surface text-xs font-medium">Find a Therapist</Text>
             </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Clinical Screener Bento Card */}
      <View className="bg-surface border border-outline rounded-2xl p-5 mb-6">
        <View className="flex-row items-center justify-between pb-3.5 border-b border-outline mb-3.5">
          <View className="flex-row items-center gap-2.5">
            <View className="w-8 h-8 bg-tertiary-container rounded-lg flex items-center justify-center">
              <Ionicons name="clipboard-outline" size={16} color="#204165" />
            </View>
            <Text className="font-semibold text-sm text-on-surface">Clinical Check-in</Text>
          </View>
          <View className="bg-surface-container px-2.5 py-0.5 rounded-full border border-outline">
            <Text className="text-on-surface-variant text-[11px] font-medium">PHQ-9 / BDI</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/patient/assessments' as any)} 
          className="bg-surface-container border border-outline rounded-xl p-3.5 items-center justify-center active:opacity-80"
        >
          <Text className="font-medium text-sm text-on-surface">Take Clinical Screener</Text>
        </TouchableOpacity>
      </View>

      {/* Mood Snapshot Card */}
      <View className="bg-surface border border-outline rounded-2xl p-5">
        <View className="flex-row items-center justify-between pb-3.5 border-b border-outline mb-3.5">
          <View className="flex-row items-center gap-2.5">
            <View className="w-8 h-8 bg-secondary-container rounded-lg flex items-center justify-center">
              <Ionicons name="pulse-outline" size={16} color="#2E4B3E" />
            </View>
            <Text className="font-semibold text-sm text-on-surface">Emotional Well-being</Text>
          </View>
          <View className="bg-surface-container px-2.5 py-0.5 rounded-full border border-outline">
            <Text className="text-on-surface-variant text-[11px] font-medium">Daily</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/tracking/mood-check-in')} 
          className="bg-surface-container border border-outline rounded-xl p-3.5 items-center justify-center active:opacity-80"
        >
          <Text className="font-medium text-sm text-on-surface">Log Today's Reflection</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
