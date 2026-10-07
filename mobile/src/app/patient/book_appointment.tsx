import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, format } from 'date-fns';

export default function BookAppointmentScreen() {
  const router = useRouter();

  // Dynamic rolling calendar days from current date
  const availableDates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => {
      const d = addDays(today, i);
      return {
        fullDate: format(d, 'yyyy-MM-dd'),
        dayName: format(d, 'EEE'),
        dayNumber: format(d, 'dd'),
        monthName: format(d, 'MMM'),
        isToday: i === 0,
      };
    });
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0]?.fullDate || '');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [loading, setLoading] = useState(false);

  const fallbackSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM'
  ];

  const handleConfirm = () => {
    router.push({
      pathname: '/patient/pay_per_session' as any,
      params: {
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        counsellorName: 'Dr. Aisha Sharma',
        fee: '1500'
      }
    });
  };

  return (
    <View className="flex-1 bg-background">
      {/* Editorial Header */}
      <View className="flex-row items-center px-4 pt-12 pb-3.5 border-b border-outline bg-background">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-8 h-8 rounded-full border border-outline bg-surface items-center justify-center mr-3"
        >
          <Ionicons name="arrow-back" size={16} color="#18181B" />
        </TouchableOpacity>
        <Text className="text-on-surface font-semibold text-base">Schedule Consultation</Text>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Clinician Card */}
        <View className="bg-surface border border-outline rounded-2xl p-4 flex-row items-center gap-3.5 mb-6">
          <View className="w-12 h-12 rounded-full border border-outline bg-secondary-container items-center justify-center">
            <Ionicons name="person" size={24} color="#2E4B3E" />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface font-semibold text-sm">Dr. Aisha Sharma</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Licensed Clinical Psychologist</Text>
            <View className="flex-row items-center gap-1.5 mt-1">
              <View className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <Text className="text-on-secondary-container text-[11px] font-medium">50-Min Tele-consultation</Text>
            </View>
          </View>
        </View>

        {/* Date Picker Ribbon */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-on-surface font-semibold text-sm">Select Date</Text>
            <Text className="text-on-surface-variant text-xs">{format(new Date(), 'MMMM yyyy')}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {availableDates.map((item) => {
              const isSelected = selectedDate === item.fullDate;
              return (
                <TouchableOpacity
                  key={item.fullDate}
                  onPress={() => setSelectedDate(item.fullDate)}
                  className={`w-14 py-3 rounded-xl border items-center ${
                    isSelected 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-outline'
                  }`}
                >
                  <Text className={`text-[11px] uppercase font-medium ${isSelected ? 'text-white/70' : 'text-on-surface-variant'}`}>
                    {item.dayName}
                  </Text>
                  <Text className={`text-base font-bold mt-1 ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                    {item.dayNumber}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Available Time Slots */}
        <View className="mb-6">
          <Text className="text-on-surface font-semibold text-sm mb-3">
            Available Times for {selectedDate ? format(new Date(selectedDate), 'MMM dd') : ''}
          </Text>

          <View className="flex-col gap-2.5">
            {fallbackSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`w-full border rounded-xl py-3.5 px-4 flex-row justify-between items-center ${
                    isSelected 
                      ? 'bg-primary border-primary' 
                      : 'bg-surface border-outline'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                    {time}
                  </Text>
                  <View className={`px-2.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-surface-container'}`}>
                    <Text className={`text-[11px] font-medium ${isSelected ? 'text-white' : 'text-on-surface-variant'}`}>
                      50 min
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 bg-background/95 border-t border-outline px-5 py-4 flex-row items-center justify-between">
        <View>
          <Text className="text-[11px] text-on-surface-variant uppercase font-medium">Selected Slot</Text>
          <Text className="text-sm font-semibold text-on-surface mt-0.5">
            {selectedDate ? format(new Date(selectedDate), 'MMM dd') : ''} • {selectedTime}
          </Text>
        </View>
        <TouchableOpacity 
          onPress={handleConfirm}
          className="px-6 py-3 bg-primary rounded-xl items-center"
        >
          <Text className="text-white text-xs font-semibold">Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
