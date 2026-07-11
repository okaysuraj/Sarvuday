import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { CustomButton } from '../../components/CustomButton';
import { appointmentsApi } from '../../api/appointments';
import { format } from 'date-fns';

export default function AppointmentsScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isTherapist = user?.role === 'therapist';
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentsApi.getAppointments(user?.role);
        setAppointments(response.appointments || []);
      } catch (error) {
        console.error('Error fetching appointments', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, [user]);

  const displayedAppointments = appointments.filter(appt => {
    const isUpcoming = new Date(appt.scheduled_time) >= new Date();
    return activeTab === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="px-6 pt-4 pb-2">
        <Text className="font-headline-md text-on-surface text-3xl font-bold mb-6">Sessions</Text>

        <View className="flex-row bg-surface-container-highest p-1 rounded-xl mb-6">
          <TouchableOpacity 
            onPress={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'upcoming' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`font-headline-md font-bold ${activeTab === 'upcoming' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('past')}
            className={`flex-1 py-2 items-center rounded-lg ${activeTab === 'past' ? 'bg-surface shadow-sm' : ''}`}
          >
            <Text className={`font-headline-md font-bold ${activeTab === 'past' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Past
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {isLoading ? (
          <ActivityIndicator size="large" color="#002da5" className="mt-12" />
        ) : displayedAppointments.length > 0 ? (
          displayedAppointments.map(session => (
            <View key={session.appointment_id} className="bg-surface-container-highest p-4 rounded-xl mb-4 border border-outline-variant">
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="font-headline-md text-on-surface font-bold text-lg">
                    {isTherapist ? `Patient: ${session.user_id}` : `Therapist: ${session.counsellor_id}`}
                  </Text>
                  <Text className="font-body-md text-on-surface-variant text-sm">{session.session_type || 'Consultation'}</Text>
                </View>
                <View className="bg-primary-fixed px-3 py-1 rounded-full">
                  <Text className="text-on-primary-fixed-variant font-label-bold text-xs">{session.status}</Text>
                </View>
              </View>
              
              <View className="flex-row items-center gap-4 mb-4">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={16} color="#747687" className="mr-1" />
                  <Text className="font-body-md text-on-surface-variant text-sm">{format(new Date(session.scheduled_time), 'MMM dd, yyyy')}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#747687" className="mr-1" />
                  <Text className="font-body-md text-on-surface-variant text-sm">{format(new Date(session.scheduled_time), 'hh:mm a')}</Text>
                </View>
              </View>
              
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  onPress={() => router.push(`/session/${session.appointment_id}` as any)}
                  className="flex-1 bg-primary py-3 rounded-lg items-center"
                >
                  <Text className="text-on-primary font-headline-md font-bold">Join Session</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-surface-variant px-4 py-3 rounded-lg items-center justify-center">
                  <Ionicons name="ellipsis-horizontal" size={20} color="#1b1b20" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <View className="w-16 h-16 rounded-full bg-surface-variant items-center justify-center mb-4">
              <Ionicons name="calendar" size={32} color="#747687" />
            </View>
            <Text className="font-headline-md text-on-surface font-bold text-lg mb-2">No {activeTab} sessions</Text>
            <Text className="font-body-md text-on-surface-variant text-center mb-6">
              You don't have any {activeTab} appointments.
            </Text>
          </View>
        )}

        {!isTherapist && activeTab === 'upcoming' && !isLoading && (
          <CustomButton 
            title="Find a Therapist" 
            onPress={() => router.push('/therapists/search')}
            className="mt-4 mb-8"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
