import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SelectSlotScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('13');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');

  const dates = [
    { day: 'Mon', date: '12', disabled: false },
    { day: 'Tue', date: '13', disabled: false },
    { day: 'Wed', date: '14', disabled: false },
    { day: 'Thu', date: '15', disabled: false },
    { day: 'Fri', date: '16', disabled: true },
  ];

  const morningSlots = [
    { time: '09:00 AM', disabled: false },
    { time: '09:30 AM', disabled: false },
    { time: '10:00 AM', disabled: true },
    { time: '11:00 AM', disabled: false },
  ];

  const afternoonSlots = [
    { time: '12:30 PM', disabled: false },
    { time: '02:00 PM', disabled: false },
    { time: '03:00 PM', disabled: false },
    { time: '04:30 PM', disabled: false },
  ];

  const eveningSlots = [
    { time: '06:00 PM', disabled: false },
    { time: '07:00 PM', disabled: true },
    { time: '08:00 PM', disabled: false },
  ];

  return (
    <View className="flex-1 bg-[#fbf8ff] items-center">
      
      {/* App Container */}
      <View className="w-full max-w-[480px] flex-1 bg-[#fbf8ff] md:border-x-[1.5px] md:border-ink-black md:shadow-[12px_12px_0px_0px_#1A1A1A] md:my-8 md:rounded-3xl overflow-hidden relative">
        
        {/* TopAppBar */}
        <View className="bg-[#fbf8ff] border-b-[1.5px] border-ink-black flex-row justify-between items-center w-full px-4 py-4 z-40 sticky top-0">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center rounded-full active:bg-surface-variant transition-colors">
            <Ionicons name="arrow-back" size={24} color="#002da5" />
          </TouchableOpacity>
          <Text className="font-headline-sm text-primary font-bold text-xl">Select a Time</Text>
          <View className="w-10" />
        </View>

        {/* Content Area */}
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ gap: 24, paddingBottom: 100 }}>
          
          {/* Therapist Info Card */}
          <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
            <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black overflow-hidden bg-[#d9d9e6]">
              <Ionicons name="person" size={48} color="#1A1A1A" style={{ alignSelf: 'center', marginTop: 8 }} />
            </View>
            <View>
              <Text className="font-label-bold text-ink-black font-bold">Dr. Aisha Sharma</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Clinical Psychologist</Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Ionicons name="videocam" size={16} color="#002da5" />
                <Text className="font-label-md text-primary text-xs font-bold">Video Consult</Text>
              </View>
            </View>
          </View>

          {/* Calendar Strip */}
          <View className="flex-col gap-2">
            <View className="flex-row justify-between items-center px-1">
              <Text className="font-label-bold text-ink-black font-bold">October 2023</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity className="w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center active:bg-surface-variant">
                  <Ionicons name="chevron-back" size={16} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity className="w-8 h-8 rounded-full border-[1.5px] border-ink-black items-center justify-center active:bg-surface-variant">
                  <Ionicons name="chevron-forward" size={16} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 16, paddingTop: 8 }}>
              {dates.map((d) => (
                <TouchableOpacity 
                  key={d.date}
                  disabled={d.disabled}
                  onPress={() => setSelectedDate(d.date)}
                  className={`w-16 h-20 border-[1.5px] border-ink-black rounded-xl items-center justify-center relative ${d.disabled ? 'bg-[#e4e1e8] opacity-50' : selectedDate === d.date ? 'bg-[#ffdad6] shadow-[0px_0px_0px_0px_#1A1A1A] translate-y-[2px] translate-x-[2px]' : 'bg-white shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
                >
                  <Text className={`font-label-md uppercase text-xs ${selectedDate === d.date ? 'text-ink-black font-bold' : 'text-on-surface-variant'}`}>{d.day}</Text>
                  <Text className={`font-headline-sm font-bold text-xl ${selectedDate === d.date ? 'text-ink-black' : d.disabled ? 'text-on-surface-variant' : 'text-ink-black'}`}>{d.date}</Text>
                  {selectedDate === d.date && (
                    <View className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full border-[1.5px] border-ink-black items-center justify-center">
                      <Ionicons name="checkmark" size={12} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="border-t-[1.5px] border-ink-black opacity-20" />

          {/* Time Slots */}
          <View className="flex-col gap-6">
            
            {/* Morning */}
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="sunny-outline" size={18} color="#434655" />
                <Text className="font-label-bold text-sm font-bold text-on-surface-variant">Morning</Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {morningSlots.map((slot) => (
                  <TouchableOpacity 
                    key={slot.time}
                    disabled={slot.disabled}
                    onPress={() => setSelectedTime(slot.time)}
                    className={`px-4 py-2 border-[1.5px] border-ink-black rounded-full transition-colors ${slot.disabled ? 'opacity-40 border-dashed bg-[#fbf8ff]' : selectedTime === slot.time ? 'bg-primary' : 'bg-[#fbf8ff]'}`}
                  >
                    <Text className={`font-body-md ${selectedTime === slot.time ? 'text-white' : 'text-ink-black'}`}>{slot.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Afternoon */}
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="partly-sunny-outline" size={18} color="#434655" />
                <Text className="font-label-bold text-sm font-bold text-on-surface-variant">Afternoon</Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {afternoonSlots.map((slot) => (
                  <TouchableOpacity 
                    key={slot.time}
                    disabled={slot.disabled}
                    onPress={() => setSelectedTime(slot.time)}
                    className={`px-4 py-2 border-[1.5px] border-ink-black rounded-full transition-colors ${slot.disabled ? 'opacity-40 border-dashed bg-[#fbf8ff]' : selectedTime === slot.time ? 'bg-primary' : 'bg-[#fbf8ff]'}`}
                  >
                    <Text className={`font-body-md ${selectedTime === slot.time ? 'text-white' : 'text-ink-black'}`}>{slot.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Evening */}
            <View className="flex-col gap-3">
              <View className="flex-row items-center gap-2">
                <Ionicons name="moon-outline" size={18} color="#434655" />
                <Text className="font-label-bold text-sm font-bold text-on-surface-variant">Evening</Text>
              </View>
              <View className="flex-row flex-wrap gap-3">
                {eveningSlots.map((slot) => (
                  <TouchableOpacity 
                    key={slot.time}
                    disabled={slot.disabled}
                    onPress={() => setSelectedTime(slot.time)}
                    className={`px-4 py-2 border-[1.5px] border-ink-black rounded-full transition-colors ${slot.disabled ? 'opacity-40 border-dashed bg-[#fbf8ff]' : selectedTime === slot.time ? 'bg-primary' : 'bg-[#fbf8ff]'}`}
                  >
                    <Text className={`font-body-md ${selectedTime === slot.time ? 'text-white' : 'text-ink-black'}`}>{slot.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>

        {/* Sticky Bottom Action */}
        <View className="absolute bottom-0 w-full bg-[#fbf8ff]/90 border-t-[1.5px] border-ink-black p-4 flex-row justify-between items-center z-50 md:rounded-b-3xl">
          <View className="flex-col">
            <Text className="font-label-bold text-ink-black font-bold text-sm">Oct {selectedDate}</Text>
            <Text className="font-body-lg text-primary font-bold text-lg">{selectedTime}</Text>
          </View>
          <TouchableOpacity className="bg-primary border-[1.5px] border-ink-black rounded-xl px-8 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-transform">
            <Text className="text-white font-label-bold font-bold">Confirm</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
