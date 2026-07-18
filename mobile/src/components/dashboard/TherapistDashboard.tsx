import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Image, TextInput } from 'react-native';
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

  // Mock pending tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete 3 session notes', due: 'Due by EOD today', checked: false },
    { id: 2, text: 'Update treatment plan: Priya', due: 'Next session tomorrow', checked: false },
    { id: 3, text: "Review Marcus's intake form", due: 'New Patient', checked: false },
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
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background" contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
      {/* Header Section */}
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage">
            <Image 
              source={{ uri: 'https://api.dicebear.com/7.x/notionists/png?seed=DrRivera' }}
              className="w-full h-full object-cover"
            />
          </View>
          <View>
            <Text className="font-headline-sm text-on-background font-bold text-xl">Good Morning, Dr. {user?.name || dashboardData?.name || 'Therapist'}</Text>
            <Text className="font-label-md text-on-surface-variant opacity-70">{format(new Date(), 'eeee, MMM dd')}</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 flex items-center justify-center rounded-xl border-[1.5px] border-ink-black bg-surface shadow-[2px_2px_0px_0px_#1A1A1A]">
          <Ionicons name="notifications" size={20} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      {/* Today's Sessions Section */}
      <View className="mb-8">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="font-headline-md text-on-background font-bold text-2xl">Today's Sessions</Text>
          <TouchableOpacity>
            <Text className="font-label-bold text-primary underline underline-offset-4">View Full Calendar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4 -mx-6 px-6">
          {appointments.length > 0 ? appointments.map((appt, idx) => (
            <View key={appt.appointment_id || idx} className={`mr-4 w-[280px] bg-surface rounded-[32px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4 ${idx > 0 ? 'opacity-90 bg-accent-pink' : ''}`}>
              <View className="flex-row justify-between items-start">
                <View className="w-14 h-14 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-accent-sage">
                  <Image source={{ uri: `https://api.dicebear.com/7.x/notionists/png?seed=${appt.user_id}` }} className="w-full h-full object-cover" />
                </View>
                <View className="px-3 py-1 bg-secondary-container border-[1.5px] border-ink-black rounded-full">
                  <Text className="text-on-secondary-container font-label-bold text-[10px] uppercase">
                    {idx === 0 ? 'IN 15 MIN' : 'UPCOMING'}
                  </Text>
                </View>
              </View>
              <View>
                <Text className="font-headline-sm text-ink-black font-bold text-lg">Patient ID: {appt.user_id}</Text>
                <View className="flex-row items-center gap-2 mt-1">
                  <Ionicons name="time-outline" size={14} color="#434655" />
                  <Text className="font-body-md text-on-surface-variant text-sm">
                    {format(new Date(appt.scheduled_time), 'hh:mm a')}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="px-3 py-1 bg-surface-variant border-[1.5px] border-ink-black rounded-lg">
                  <Text className="font-label-md text-xs">{appt.session_type || 'Session'}</Text>
                </View>
                <View className="px-3 py-1 bg-accent-sage border-[1.5px] border-ink-black rounded-lg">
                  <Text className="font-label-md text-xs">Video</Text>
                </View>
              </View>
              {idx === 0 ? (
                <TouchableOpacity onPress={() => router.push(`/session/${appt.appointment_id}` as any)} className="mt-2 w-full py-3 bg-primary border-[1.5px] border-ink-black rounded-2xl items-center shadow-[4px_4px_0px_0px_#1A1A1A]">
                  <Text className="text-on-primary font-label-bold">Join Call</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="mt-2 w-full py-3 bg-surface border-[1.5px] border-ink-black rounded-2xl items-center shadow-[2px_2px_0px_0px_#1A1A1A]">
                  <Text className="text-ink-black font-label-bold">Prepare Notes</Text>
                </TouchableOpacity>
              )}
            </View>
          )) : (
            <View className="w-[300px] bg-surface rounded-[32px] border-[1.5px] border-ink-black p-6 shadow-[4px_4px_0px_0px_#1A1A1A] items-center justify-center">
               <Text className="font-body-md text-on-surface-variant">No appointments scheduled today.</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Patient Highlights */}
      <View className="mb-8">
        <View className="flex-row items-center gap-3 mb-4">
          <Text className="font-headline-md text-on-background font-bold text-2xl">Patient Highlights</Text>
          <View className="px-2 py-0.5 bg-primary-container border-[1.5px] border-ink-black rounded-md">
            <Text className="text-on-primary-container text-[10px] font-bold">AI POWERED</Text>
          </View>
        </View>

        <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-row gap-4">
          <View className="w-12 h-12 bg-surface border-[1.5px] border-ink-black rounded-2xl flex items-center justify-center shadow-[2px_2px_0px_0px_#1A1A1A]">
            <Ionicons name="trending-down" size={24} color="#ba1a1a" />
          </View>
          <View className="flex-1">
            <Text className="font-label-bold text-lg text-ink-black font-bold">Aarav's mood dipped 20%</Text>
            <Text className="font-body-md text-sm text-ink-black opacity-80 mt-1">Significant decline in journal sentiment scores over the last 48 hours.</Text>
            <TouchableOpacity className="mt-2 flex-row items-center gap-1">
              <Text className="text-primary font-label-bold">Review Journal</Text>
              <Ionicons name="arrow-forward" size={14} color="#002da5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Pending Tasks */}
      <View className="mb-8">
        <Text className="font-headline-md text-on-background font-bold text-2xl mb-4">Pending Tasks</Text>
        <View className="bg-surface border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-4">
          {tasks.map(task => (
            <TouchableOpacity 
              key={task.id} 
              onPress={() => toggleTask(task.id)}
              className="flex-row items-center gap-4 p-3 bg-surface-container rounded-2xl border-[1.5px] border-transparent active:border-ink-black"
            >
              <View className={`w-6 h-6 rounded border-2 border-ink-black items-center justify-center ${task.checked ? 'bg-primary' : 'bg-surface'}`}>
                {task.checked && <Ionicons name="checkmark" size={16} color="#ffffff" />}
              </View>
              <View className="flex-1">
                <Text className={`font-label-bold ${task.checked ? 'opacity-50 line-through' : 'text-ink-black'}`}>{task.text}</Text>
                <Text className="text-xs text-on-surface-variant mt-1">{task.due}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity className="mt-4 w-full py-4 border-[1.5px] border-dashed border-ink-black rounded-2xl items-center justify-center">
            <Text className="font-label-bold text-on-surface-variant">+ Add Custom Task</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekly Summary Banner */}
      <View className="bg-secondary-container border-[1.5px] border-ink-black rounded-[32px] p-8 shadow-[4px_4px_0px_0px_#1A1A1A] flex-row items-center justify-between">
        <View className="flex-col gap-2">
          <Text className="font-headline-sm text-ink-black font-bold">Earnings This Week</Text>
          <Text className="font-display-lg text-ink-black text-4xl font-bold">${dashboardData?.revenue?.toFixed(2) || '0.00'}</Text>
          <Text className="font-label-md text-on-secondary-fixed-variant opacity-80">+12% from last week</Text>
        </View>
      </View>
    </ScrollView>
  );
};
