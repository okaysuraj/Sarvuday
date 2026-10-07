import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { addDays, format } from 'date-fns';

export default function SelectSlotScreen() {
  const router = useRouter();

  // Dynamic rolling calendar days from current date
  const availableDates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
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

  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.fullDate || '');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const morningSlots = ['09:00 AM', '10:00 AM', '11:30 AM'];
  const afternoonSlots = ['02:00 PM', '03:30 PM', '05:00 PM'];
  const eveningSlots = ['06:30 PM', '07:30 PM'];

  const handleConfirm = () => {
    // Navigate to payment/booking confirmation with chosen slot
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
        <Text className="text-on-surface font-semibold text-base">Select Consultation Time</Text>
      </View>

      <ScrollView className="flex-1 px-5 py-6" contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Clinician Card */}
        <View className="bg-surface border border-outline rounded-2xl p-4 flex-row items-center gap-3.5 mb-6">
          <View className="w-12 h-12 rounded-full border border-outline bg-secondary-container items-center justify-center">
            <Ionicons name="person" size={24} color="#2E4B3E" />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface font-semibold text-sm">Dr. Aisha Sharma</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Clinical Psychologist • Cognitive Care</Text>
            <View className="flex-row items-center gap-1.5 mt-1">
              <View className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <Text className="text-on-secondary-container text-[11px] font-medium">50-Min Secure Video Session</Text>
            </View>
          </View>
        </View>

        {/* Date Selector */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-on-surface font-semibold text-sm">Available Dates</Text>
            <Text className="text-on-surface-variant text-xs">{availableDates[0]?.monthName} {format(new Date(), 'yyyy')}</Text>
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

        {/* Time Slot Sections */}
        <View className="mb-6">
          <Text className="text-on-surface font-semibold text-sm mb-3">Morning Slots</Text>
          <View className="flex-row flex-wrap gap-2.5">
            {morningSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-2.5 rounded-xl border ${
                    isSelected ? 'bg-primary border-primary' : 'bg-surface border-outline'
                  }`}
                >
                  <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-on-surface'}`}>{time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-on-surface font-semibold text-sm mb-3">Afternoon Slots</Text>
          <View className="flex-row flex-wrap gap-2.5">
            {afternoonSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-2.5 rounded-xl border ${
                    isSelected ? 'bg-primary border-primary' : 'bg-surface border-outline'
                  }`}
                >
                  <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-on-surface'}`}>{time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-on-surface font-semibold text-sm mb-3">Evening Slots</Text>
          <View className="flex-row flex-wrap gap-2.5">
            {eveningSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-2.5 rounded-xl border ${
                    isSelected ? 'bg-primary border-primary' : 'bg-surface border-outline'
                  }`}
                >
                  <Text className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-on-surface'}`}>{time}</Text>
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
          <Text className="text-white text-xs font-semibold">Proceed to Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
