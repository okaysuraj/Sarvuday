import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
      <View className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface" contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      <View className="flex-row justify-between items-center mb-8">
        <View>
          <Text className="font-body-md text-on-surface-variant text-base">Good Morning,</Text>
          <Text className="font-headline-md text-on-surface text-2xl font-bold">{user?.name || dashboardData?.user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center">
          <Ionicons name="notifications-outline" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">How are you feeling today?</Text>
      <View className="flex-row justify-between mb-8">
        {['Happy', 'Calm', 'Neutral', 'Sad', 'Stressed'].map((mood, idx) => (
          <TouchableOpacity key={idx} onPress={() => router.push('/tracking/mood-check-in')} className="items-center">
            <View className="w-12 h-12 rounded-full bg-surface-container-highest items-center justify-center mb-2">
              <Text className="text-xl">
                {idx === 0 ? '😊' : idx === 1 ? '😌' : idx === 2 ? '😐' : idx === 3 ? '😔' : '😫'}
              </Text>
            </View>
            <Text className="font-label-md text-on-surface-variant text-xs">{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Upcoming Sessions</Text>
      {dashboardData?.upcoming_sessions?.length > 0 ? (
        dashboardData.upcoming_sessions.map((session: any) => (
          <View key={session.session_id} className="bg-primary-container p-4 rounded-xl mb-4 flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-on-primary-container items-center justify-center mr-4">
              <Text className="text-primary-container font-bold">{format(new Date(session.session_scheduled_at), 'dd')}</Text>
              <Text className="text-primary-container text-xs">{format(new Date(session.session_scheduled_at), 'MMM').toUpperCase()}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-on-primary-container font-bold text-base">Therapist ID: {session.counsellor_id}</Text>
              <Text className="font-body-md text-on-primary-container text-xs mt-1">
                {format(new Date(session.session_scheduled_at), 'hh:mm a')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push(`/session/${session.session_id}` as any)} className="bg-on-primary-container px-3 py-2 rounded-lg">
              <Text className="text-primary-container font-label-bold text-xs">Join</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View className="bg-surface-variant p-6 rounded-xl mb-8 items-center border border-outline-variant">
           <Text className="text-on-surface-variant mb-4 text-center">You have no upcoming appointments.</Text>
           <TouchableOpacity onPress={() => router.push('/(tabs)/therapists')} className="bg-primary px-4 py-2 rounded-full">
             <Text className="text-on-primary font-bold">Find a Therapist</Text>
           </TouchableOpacity>
        </View>
      )}

      <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Suggested Activities</Text>
      <View className="gap-4">
        <TouchableOpacity onPress={() => router.push('/tracking/journal')} className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
          <View className="w-12 h-12 rounded-full bg-tertiary-fixed items-center justify-center mr-4">
            <Ionicons name="journal" size={20} color="#663a43" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-md text-on-surface font-bold">Daily Journal</Text>
            <Text className="font-body-md text-on-surface-variant text-sm">Reflect on your day</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#747687" />
        </TouchableOpacity>
        
        <TouchableOpacity className="bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant">
          <View className="w-12 h-12 rounded-full bg-primary-fixed-dim items-center justify-center mr-4">
            <Ionicons name="leaf" size={20} color="#0035be" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-md text-on-surface font-bold">Breathing Exercise</Text>
            <Text className="font-body-md text-on-surface-variant text-sm">5 mins to calm down</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#747687" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
