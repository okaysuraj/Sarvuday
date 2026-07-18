import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookAppointmentScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<number>(9);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        // Fetch slots for current month - backend might need counsellor_id, we fetch generic for now
        const response = await fetch('http://10.0.2.2:8000/normal_user/appointments/slots', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const json = await response.json();
          setAvailableSlots(json.slots || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, []);

  const daysInMonth = 31; // Dummy for October
  const startDay = 0; // Dummy start day (Sunday)

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty slots
    for (let i = 0; i < startDay; i++) {
      days.push(<View key={`empty-${i}`} className="w-10 h-10 m-1" />);
    }

    // Actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const isPast = i < new Date().getDate(); // approximate past checking
      const isSelected = i === selectedDate;
      // check if any slots exist on this day
      const hasSlots = availableSlots.some(slot => new Date(slot.start_time).getDate() === i);

      days.push(
        <TouchableOpacity 
          key={`day-${i}`}
          disabled={isPast}
          onPress={() => setSelectedDate(i)}
          className={`w-10 h-10 m-1 items-center justify-center border-[1.5px] border-ink-black rounded-lg ${isPast ? 'bg-surface-container-lowest opacity-50' : isSelected ? 'bg-primary shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-surface-container-lowest active:bg-surface-container-high active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'}`}
        >
          <Text className={`font-label-md font-bold ${isPast ? 'text-on-surface-variant line-through' : isSelected ? 'text-white' : 'text-ink-black'}`}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const getSlotsForDate = (date: number) => {
    return availableSlots.filter(slot => new Date(slot.start_time).getDate() === date);
  };

  const currentDaySlots = getSlotsForDate(selectedDate);
  const fallbackSlots = ['9:00 AM', '11:30 AM', '2:00 PM', '4:15 PM'];

  if (loading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      {/* Header */}
      <View className="w-full top-0 bg-background border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center border-[1.5px] border-ink-black rounded-full active:bg-surface-container-high active:translate-x-[2px] active:translate-y-[2px]">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm font-bold text-ink-black tracking-tighter text-xl">MindEase</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-6 max-w-md mx-auto w-full" contentContainerStyle={{ paddingBottom: 120 }}>
        
        <View className="text-center mb-6 items-center">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl">Select a Date & Time</Text>
          <Text className="font-body-md text-on-surface-variant mt-2 text-base">Dr. Sarah Jenkins - Initial Consultation</Text>
        </View>

        {/* Tactile Calendar Component */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col gap-4 mb-6 shadow-[4px_4px_0px_0px_#1A1A1A]">
          
          {/* Month Header */}
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity className="w-8 h-8 items-center justify-center border-[1.5px] border-ink-black rounded-full bg-accent-sage active:translate-x-[2px] active:translate-y-[2px]">
              <Ionicons name="chevron-back" size={20} color="#1A1A1A" />
            </TouchableOpacity>
            <Text className="font-headline-sm text-ink-black font-bold text-xl">October 2023</Text>
            <TouchableOpacity className="w-8 h-8 items-center justify-center border-[1.5px] border-ink-black rounded-full bg-accent-sage active:translate-x-[2px] active:translate-y-[2px]">
              <Ionicons name="chevron-forward" size={20} color="#1A1A1A" />
            </TouchableOpacity>
          </View>

          {/* Days of Week */}
          <View className="flex-row justify-between mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <Text key={day} className="font-label-bold text-on-surface-variant font-bold w-10 text-center">{day}</Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View className="flex-row flex-wrap justify-between">
            {renderCalendarDays()}
          </View>

        </View>

        {/* Time Slots */}
        <View className="flex-col gap-2">
          <Text className="font-label-bold text-on-surface-variant font-bold mb-2 px-2">Available Slots for Oct {selectedDate}</Text>
          
          {currentDaySlots.length > 0 ? currentDaySlots.map((slot) => {
            const timeString = new Date(slot.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const isSelected = selectedTime?.availability_slot_id === slot.availability_slot_id;
            return (
              <TouchableOpacity 
                key={slot.availability_slot_id}
                onPress={() => setSelectedTime(slot)}
                className={`w-full border-[1.5px] border-ink-black rounded-xl py-4 px-6 flex-row justify-between items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-3 ${isSelected ? 'bg-primary' : 'bg-white'}`}
              >
                <Text className={`font-headline-sm font-bold text-lg ${isSelected ? 'text-white' : 'text-ink-black'}`}>{timeString}</Text>
                <View className={`px-3 py-1 rounded-full border-[1.5px] border-ink-black ${isSelected ? 'bg-white' : 'bg-surface-container'}`}>
                  <Text className={`font-label-md font-bold ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>50 min</Text>
                </View>
              </TouchableOpacity>
            )
          }) : fallbackSlots.map((time) => {
             const isSelected = selectedTime === time;
             return (
               <TouchableOpacity 
                 key={time}
                 onPress={() => setSelectedTime(time)}
                 className={`w-full border-[1.5px] border-ink-black rounded-xl py-4 px-6 flex-row justify-between items-center shadow-[2px_2px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mb-3 ${isSelected ? 'bg-primary' : 'bg-white'}`}
               >
                 <Text className={`font-headline-sm font-bold text-lg ${isSelected ? 'text-white' : 'text-ink-black'}`}>{time}</Text>
                 <View className={`px-3 py-1 rounded-full border-[1.5px] border-ink-black ${isSelected ? 'bg-white' : 'bg-surface-container'}`}>
                   <Text className={`font-label-md font-bold ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>50 min</Text>
                 </View>
               </TouchableOpacity>
             )
          })}
        </View>

      </ScrollView>

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 w-full bg-surface/90 border-t-[1.5px] border-ink-black p-4 z-50 flex-row justify-center pb-8">
        <TouchableOpacity className="w-full max-w-md bg-secondary-container border-[1.5px] border-ink-black rounded-xl py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none flex-row items-center justify-center gap-2">
          <Text className="font-headline-sm text-ink-black font-bold text-xl">Confirm Booking</Text>
          <Ionicons name="checkmark-circle" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

    </View>
  );
}
