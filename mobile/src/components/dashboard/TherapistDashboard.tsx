import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';
import { userApi } from '../../api/user';
import { appointmentsApi } from '../../api/appointments';
import { format } from 'date-fns';

export const TherapistDashboard = () => {
  const user = useAuthStore(state => state.user);
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashData, apptsData] = await Promise.all([
          userApi.getTherapistDashboard(),
          appointmentsApi.getAppointments('therapist')
        ]);
        setDashboardData(dashData);
        setAppointments(apptsData?.appointments || []);
      } catch (error) {
        console.error('Error fetching therapist dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
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
          <Text className="font-body-md text-on-surface-variant text-base">Welcome back,</Text>
          <Text className="font-headline-md text-on-surface text-2xl font-bold">Dr. {user?.name || dashboardData?.name || 'Therapist'}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-variant items-center justify-center">
          <Ionicons name="notifications-outline" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 mb-8">
        <View className="flex-1 bg-primary-fixed p-4 rounded-xl border border-primary-fixed-dim">
          <Text className="font-label-md text-on-primary-fixed-variant mb-1">Today's Sessions</Text>
          <Text className="font-headline-md text-on-primary-fixed text-2xl font-bold">{dashboardData?.upcoming_appointments || 0}</Text>
        </View>
        <View className="flex-1 bg-secondary-fixed p-4 rounded-xl border border-secondary-fixed-dim">
          <Text className="font-label-md text-on-secondary-fixed-variant mb-1">Total Sessions</Text>
          <Text className="font-headline-md text-on-secondary-fixed text-2xl font-bold">{dashboardData?.total_sessions || 0}</Text>
        </View>
      </View>

      <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Upcoming Schedule</Text>
      <View className="gap-4 mb-8">
        {appointments.length > 0 ? appointments.map((appt, idx) => (
          <View key={appt.appointment_id || idx} className={`bg-surface-container-highest p-4 rounded-xl flex-row items-center border border-outline-variant ${idx > 0 ? 'opacity-70' : ''}`}>
            <View className="mr-4 items-center">
              <Text className="font-label-bold text-on-surface font-bold">{format(new Date(appt.scheduled_time), 'hh:mm')}</Text>
              <Text className="font-label-md text-on-surface-variant text-xs">{format(new Date(appt.scheduled_time), 'a')}</Text>
            </View>
            <View className={`w-1 h-12 rounded-full mr-4 ${idx === 0 ? 'bg-primary' : 'bg-outline'}`} />
            <View className="flex-1">
              <Text className="font-headline-md text-on-surface font-bold">Patient ID: {appt.user_id}</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">{appt.session_type || 'Consultation'}</Text>
            </View>
            {idx === 0 && (
              <TouchableOpacity onPress={() => router.push(`/session/${appt.appointment_id}` as any)} className="bg-primary-fixed px-3 py-2 rounded-lg">
                <Text className="text-on-primary-fixed font-label-bold text-xs">Start</Text>
              </TouchableOpacity>
            )}
          </View>
        )) : (
          <View className="bg-surface-variant p-6 rounded-xl border border-outline-variant items-center">
            <Text className="text-on-surface-variant text-center">No upcoming appointments.</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-headline-md text-on-surface text-lg font-bold">Recent Patient Activity</Text>
        <TouchableOpacity onPress={() => router.push('/therapist/patients')}>
          <Text className="text-primary font-label-bold">View All</Text>
        </TouchableOpacity>
      </View>
      
      {/* Assuming alerts might eventually come from backend, using placeholder for now */}
      <View className="bg-error-container p-4 rounded-xl flex-row items-center border border-error">
        <View className="w-10 h-10 rounded-full bg-error items-center justify-center mr-4">
          <Ionicons name="warning" size={20} color="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="font-headline-md text-on-error-container font-bold">Action Required</Text>
          <Text className="font-body-md text-on-error-container text-sm">Check pending reports</Text>
        </View>
      </View>
    </ScrollView>
  );
};
