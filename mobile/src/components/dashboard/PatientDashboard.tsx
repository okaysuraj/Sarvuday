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
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const userName = user?.name || dashboardData?.user?.name || 'User';

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      {/* Greeting Section */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="font-label-md text-on-surface-variant uppercase tracking-widest mb-1">Welcome back,</Text>
          <Text className="font-headline-md text-on-surface text-3xl font-bold">{userName}! 👋</Text>
        </View>
        <View className="w-14 h-14 rounded-full border-[1.5px] border-ink-black overflow-hidden shadow-[4px_4px_0px_0px_#1A1A1A] bg-accent-sage">
          <Image 
            source={{ uri: dashboardData?.user?.profile_pic || 'https://api.dicebear.com/7.x/notionists/png?seed=Felix' }}
            className="w-full h-full object-cover"
          />
        </View>
      </View>

      {/* Hero/Affirmation Bento Box */}
      <View className="relative rounded-[32px] border-[1.5px] border-ink-black overflow-hidden min-h-[240px] flex items-end p-6 bg-accent-orange shadow-[4px_4px_0px_0px_#1A1A1A] mb-6">
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' }} 
          className="absolute inset-0 w-full h-full opacity-60"
        />
        <View className="relative z-10 bg-background border-[1.5px] border-ink-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] w-[90%]">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="star" size={12} color="#1b1b20" />
            <Text className="font-label-bold text-ink-black uppercase text-xs tracking-widest">Daily Affirmation</Text>
          </View>
          <Text className="font-headline-sm text-on-surface text-lg font-bold leading-snug">
            "Every day is a new canvas. Breathe deeply and paint it with intention."
          </Text>
        </View>
      </View>

      {/* Quick Actions Bento Row */}
      <View className="flex-row gap-4 mb-6">
        {/* Chat with AI */}
        <TouchableOpacity 
          onPress={() => router.push('/chat/ai')}
          className="flex-1 bg-primary border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]"
        >
          <View className="flex-row justify-between items-start mb-8">
            <View className="w-12 h-12 bg-on-primary rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="hardware-chip-outline" size={24} color="#002da5" />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#ffffff" className="opacity-50" />
          </View>
          <Text className="font-headline-sm text-on-primary font-bold text-lg">Chat with AI</Text>
          <Text className="font-body-md text-primary-fixed mt-1 opacity-90 text-xs">Got something on your mind?</Text>
        </TouchableOpacity>

        {/* Book Therapist */}
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/therapists')}
          className="flex-1 bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]"
        >
          <View className="flex-row justify-between items-start mb-8">
            <View className="w-12 h-12 bg-background rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="calendar" size={24} color="#1b1b20" />
            </View>
            <Ionicons name="arrow-forward" size={24} color="#1b1b20" className="opacity-50" />
          </View>
          <Text className="font-headline-sm text-ink-black font-bold text-lg">Book Therapist</Text>
          <Text className="font-body-md text-on-secondary-container mt-1 text-xs">Schedule your next session.</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Sessions Box */}
      <View className="bg-surface border-[1.5px] border-ink-black rounded-[32px] p-6 mb-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="font-headline-md text-on-surface font-bold text-xl">Upcoming Sessions</Text>
        </View>
        {dashboardData?.upcoming_sessions?.length > 0 ? (
          dashboardData.upcoming_sessions.map((session: any) => (
            <View key={session.session_id} className="bg-surface-variant p-4 rounded-2xl flex-row items-center border-[1.5px] border-ink-black mb-3">
              <View className="w-14 h-14 bg-background border-[1.5px] border-ink-black rounded-full items-center justify-center mr-4">
                <Text className="text-ink-black font-bold text-lg">{format(new Date(session.session_scheduled_at), 'dd')}</Text>
                <Text className="text-ink-black text-[10px] uppercase font-bold">{format(new Date(session.session_scheduled_at), 'MMM')}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-headline-sm text-ink-black font-bold">Session with Therapist</Text>
                <Text className="font-body-md text-on-surface-variant text-xs mt-1">
                  {format(new Date(session.session_scheduled_at), 'hh:mm a')}
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push(`/session/${session.session_id}` as any)} className="bg-primary px-4 py-2 rounded-xl border-[1.5px] border-ink-black">
                <Text className="text-on-primary font-label-bold">Join</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="items-center py-4">
             <Text className="text-on-surface-variant mb-4">No upcoming appointments.</Text>
          </View>
        )}
      </View>

      {/* Mood Snapshot Card */}
      <View className="bg-accent-sage border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
        <View className="flex-row items-center justify-between border-b-[1.5px] border-ink-black pb-4 mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-background rounded-full border-[1.5px] border-ink-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
              <Ionicons name="bar-chart" size={20} color="#1b1b20" />
            </View>
            <Text className="font-headline-sm font-bold text-xl text-on-surface">Mood Snapshot</Text>
          </View>
          <View className="bg-surface-container py-1 px-3 rounded-full border border-ink-black">
            <Text className="font-label-bold text-on-surface-variant text-xs">This Week</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/tracking/mood-check-in')} 
          className="bg-background border-[1.5px] border-ink-black rounded-2xl p-4 items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]"
        >
          <Text className="font-headline-sm font-bold text-ink-black">Check In Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
