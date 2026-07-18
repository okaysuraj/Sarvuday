import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RescheduleAppointmentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        // Fetch current appointment (either by ID or just list and take first)
        const apptRes = await fetch(`http://10.0.2.2:8000/normal_user/appointments`, { headers });
        if (apptRes.ok) {
          const apptJson = await apptRes.json();
          const targetAppt = apptJson.appointments?.find((a: any) => a.appointment_id === id) || apptJson.appointments?.[0];
          setAppointment(targetAppt);
        }

        // Fetch slots
        const slotsRes = await fetch('http://10.0.2.2:8000/normal_user/appointments/slots', { headers });
        if (slotsRes.ok) {
          const slotsJson = await slotsRes.json();
          setAvailableSlots(slotsJson.slots || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getSlotsForDate = (date: number) => {
    return availableSlots.filter(slot => new Date(slot.start_time).getDate() === date);
  };

  const currentDaySlots = getSlotsForDate(selectedDate);
  const fallbackSlots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:15 PM'];

  if (loading) {
    return (
      <View className="flex-1 bg-cream-bg items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#434655" />
        </TouchableOpacity>
        <Text className="font-headline-md font-bold text-primary text-xl tracking-tighter">SarvUday</Text>
        <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="person-circle" size={28} color="#434655" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-8">
          <Text className="font-headline-md text-ink-black font-bold text-3xl mb-2">Reschedule Appointment</Text>
          <Text className="font-body-md text-on-surface-variant text-base">Pick a new date and time for your session.</Text>
        </View>

        <View className="flex-col md:flex-row gap-6">
          
          {/* Current Appointment Card */}
          <View className="flex-[5] flex-col gap-4">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Current</Text>
            
            <View className="bg-accent-pink border-[1.5px] border-ink-black rounded-[24px] p-6 relative overflow-hidden flex-1">
              <View className="absolute top-4 right-4 opacity-20">
                <Ionicons name="medkit" size={100} color="#1A1A1A" />
              </View>
              
              <View className="relative z-10">
                <Text className="font-label-bold text-tertiary-container font-bold uppercase tracking-wider mb-2">Therapy Session</Text>
                <Text className="font-headline-sm text-ink-black font-bold text-2xl mb-1">{appointment?.counsellor?.name || 'Dr. Aris Thorne'}</Text>
                <Text className="font-body-md text-on-surface-variant mb-6">{appointment?.counsellor?.specialization || 'Cognitive Behavioral Therapy'}</Text>
                
                <View className="flex-row items-center gap-2 mb-3">
                  <Ionicons name="calendar" size={20} color="#754650" />
                  <Text className="font-label-md text-ink-black font-bold">{appointment?.start_time ? new Date(appointment.start_time).toLocaleDateString() : 'Oct 24, 2023'}</Text>
                </View>
                
                <View className="flex-row items-center gap-2">
                  <Ionicons name="time" size={20} color="#754650" />
                  <Text className="font-label-md text-ink-black font-bold">{appointment?.start_time ? new Date(appointment.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '10:00 AM'}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Select New Time Section */}
          <View className="flex-[7] flex-col gap-4">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Select New Time</Text>
            
            <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col">
              
              {/* Calendar Placeholder */}
              <View className="mb-6">
                <View className="flex-row justify-between items-center mb-4">
                  <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
                    <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                  <Text className="font-label-bold text-ink-black font-bold text-lg">November 2023</Text>
                  <TouchableOpacity className="p-2 rounded-full active:bg-surface-variant">
                    <Ionicons name="chevron-forward" size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <Text key={i} className="font-label-md text-on-surface-variant w-8 text-center">{day}</Text>
                  ))}
                </View>

                <View className="flex-row flex-wrap gap-y-2 justify-between">
                  {/* Dummy Dates */}
                  <View className="w-8 items-center"><Text className="p-2 text-on-surface-variant opacity-50">29</Text></View>
                  <View className="w-8 items-center"><Text className="p-2 text-on-surface-variant opacity-50">30</Text></View>
                  <View className="w-8 items-center"><Text className="p-2 text-on-surface-variant opacity-50">31</Text></View>
                  
                  <View className="w-8 items-center">
                    <View className="w-8 h-8 items-center justify-center border-[1.5px] border-ink-black rounded-lg bg-surface-container-highest opacity-50">
                      <Text className="text-ink-black font-bold">1</Text>
                    </View>
                  </View>
                  
                  {Array.from({length: 5}).map((_, i) => {
                    const dayNum = new Date().getDate() + i;
                    return (
                      <TouchableOpacity key={dayNum} className="w-8 items-center" onPress={() => setSelectedDate(dayNum)}>
                        <View className={`w-8 h-8 items-center justify-center rounded-lg ${selectedDate === dayNum ? 'bg-primary border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white'}`}>
                          <Text className={`${selectedDate === dayNum ? 'text-white font-bold' : 'text-ink-black'}`}>{dayNum}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                  {/* Spacer for remaining days */}
                  <View className="w-full h-12" />
                </View>
              </View>

              {/* Time Slots */}
              <View>
                <Text className="font-label-bold text-ink-black font-bold mb-3">Available Times</Text>
                <View className="flex-row flex-wrap gap-3">
                  
                  {currentDaySlots.length > 0 ? currentDaySlots.map((slot) => {
                    const timeString = new Date(slot.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    const isSelected = selectedTime?.availability_slot_id === slot.availability_slot_id;
                    return (
                      <TouchableOpacity 
                        key={slot.availability_slot_id}
                        onPress={() => setSelectedTime(slot)}
                        className={`px-4 py-2 rounded-full border-[1.5px] border-ink-black active:translate-x-[1px] active:translate-y-[1px] ${isSelected ? 'bg-accent-sage shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-surface'}`}
                      >
                        <Text className="font-label-md text-ink-black font-bold">{timeString}</Text>
                      </TouchableOpacity>
                    );
                  }) : fallbackSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <TouchableOpacity 
                        key={time}
                        onPress={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-full border-[1.5px] border-ink-black active:translate-x-[1px] active:translate-y-[1px] ${isSelected ? 'bg-accent-sage shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-surface'}`}
                      >
                        <Text className="font-label-md text-ink-black font-bold">{time}</Text>
                      </TouchableOpacity>
                    );
                  })}

                </View>
              </View>

            </View>
          </View>

        </View>

        {/* Action Button */}
        <View className="mt-12 flex-row justify-end">
          <TouchableOpacity 
            className="w-full md:w-auto bg-primary border-[1.5px] border-ink-black rounded-xl py-4 px-8 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center"
          >
            <Text className="font-label-bold text-white font-bold text-lg">Confirm Change</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
