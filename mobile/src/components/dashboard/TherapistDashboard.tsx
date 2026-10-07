import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
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

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete session notes', due: 'Due today', checked: false },
    { id: 2, text: 'Review intake assessments', due: 'Priya S.', checked: false },
    { id: 3, text: 'Prepare follow-up materials', due: 'Marcus T.', checked: false },
  ]);

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

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="small" color="#18181B" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 }}>
      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-full border border-outline overflow-hidden bg-surface-container">
            <Image 
              source={{ uri: 'https://api.dicebear.com/7.x/notionists/png?seed=DrRivera' }}
              className="w-full h-full object-cover"
            />
          </View>
          <View>
            <Text className="text-on-surface text-lg font-bold tracking-tight">Dr. {user?.name || dashboardData?.name || 'Therapist'}</Text>
            <Text className="text-on-surface-variant text-xs">{format(new Date(), 'eeee, MMM dd')}</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 flex items-center justify-center rounded-full border border-outline bg-surface">
          <Ionicons name="notifications-outline" size={18} color="#18181B" />
        </TouchableOpacity>
      </View>

      {/* Today's Sessions Section */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-3.5">
          <Text className="text-on-surface font-semibold text-base">Today's Schedule</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/appointments')}>
            <Text className="text-on-surface-variant text-xs font-medium">Calendar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2 -mx-5 px-5">
          {appointments.length > 0 ? appointments.map((appt, idx) => (
            <View key={appt.appointment_id || idx} className="mr-3 w-[260px] bg-surface rounded-2xl border border-outline p-5 flex-col justify-between">
              <View className="flex-row justify-between items-start mb-3">
                <View className="w-10 h-10 rounded-full border border-outline overflow-hidden bg-surface-container">
                  <Image source={{ uri: `https://api.dicebear.com/7.x/notionists/png?seed=${appt.user_id}` }} className="w-full h-full object-cover" />
                </View>
                <View className="px-2.5 py-0.5 bg-secondary-container rounded-full">
                  <Text className="text-on-secondary-container text-[10px] font-semibold uppercase">
                    {idx === 0 ? 'Next Up' : 'Upcoming'}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="text-on-surface font-semibold text-sm">Consultation</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">
                  {format(new Date(appt.scheduled_time), 'hh:mm a')} • {appt.session_type || 'Video'}
                </Text>
              </View>

              {idx === 0 ? (
                <TouchableOpacity 
                  onPress={() => router.push(`/session/${appt.appointment_id}` as any)} 
                  className="w-full py-2.5 bg-primary rounded-xl items-center"
                >
                  <Text className="text-white text-xs font-medium">Join Call</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="w-full py-2.5 bg-surface-container border border-outline rounded-xl items-center">
                  <Text className="text-on-surface text-xs font-medium">Session Notes</Text>
                </TouchableOpacity>
              )}
            </View>
          )) : (
            <View className="w-[280px] bg-surface rounded-2xl border border-outline p-6 items-center justify-center">
               <Text className="text-on-surface-variant text-xs">No sessions scheduled for today.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Patient Insights / Alerts */}
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-3.5">
          <Text className="text-on-surface font-semibold text-base">Clinical Alerts</Text>
          <View className="px-2 py-0.5 bg-surface-container rounded-md border border-outline">
            <Text className="text-on-surface-variant text-[10px] font-medium uppercase tracking-wider">AI Monitored</Text>
          </View>
        </View>

        <View className="bg-surface border border-outline rounded-2xl p-5 flex-row gap-3.5">
          <View className="w-9 h-9 bg-accent-pink rounded-lg flex items-center justify-center shrink-0">
            <Ionicons name="alert-circle-outline" size={18} color="#932924" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-on-surface">Sentiment dip observed</Text>
            <Text className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">Recent journal reflection indicates elevated stress markers for patient session.</Text>
            <TouchableOpacity className="mt-2.5">
              <Text className="text-xs font-semibold text-primary">View Clinical Timeline →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Pending Tasks */}
      <View className="mb-6">
        <Text className="text-on-surface font-semibold text-base mb-3.5">Tasks & Notes</Text>
        <View className="bg-surface border border-outline rounded-2xl p-4 flex-col gap-2">
          {tasks.map(task => (
            <TouchableOpacity 
              key={task.id} 
              onPress={() => toggleTask(task.id)}
              className="flex-row items-center gap-3 p-2.5 rounded-xl bg-surface-container-low"
            >
              <View className={`w-5 h-5 rounded border border-outline items-center justify-center ${task.checked ? 'bg-primary' : 'bg-surface'}`}>
                {task.checked && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
              </View>
              <View className="flex-1">
                <Text className={`text-xs font-medium ${task.checked ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{task.text}</Text>
                <Text className="text-[10px] text-on-surface-variant mt-0.5">{task.due}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Weekly Summary Bento */}
      <View className="bg-surface border border-outline rounded-2xl p-5 flex-row items-center justify-between">
        <View>
          <Text className="text-xs font-medium text-on-surface-variant">Weekly Earnings</Text>
          <Text className="text-2xl font-bold text-on-surface tracking-tight mt-1">${dashboardData?.revenue?.toFixed(2) || '0.00'}</Text>
        </View>
        <View className="px-3 py-1 rounded-full bg-secondary-container">
          <Text className="text-on-secondary-container text-xs font-medium">On Track</Text>
        </View>
      </View>
    </ScrollView>
  );
};
