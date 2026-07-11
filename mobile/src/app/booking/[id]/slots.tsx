import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/CustomButton';
import { appointmentsApi } from '../../../api/appointments';
import { addDays, format, parseISO } from 'date-fns';

export default function SlotSelectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate 7 upcoming days
  const DATES = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(new Date(), i);
      dates.push({
        day: format(date, 'EEE'),
        date: format(date, 'dd'),
        full: format(date, 'yyyy-MM-dd'),
      });
    }
    return dates;
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      setIsLoading(true);
      try {
        const dateStr = DATES[selectedDateIdx].full;
        const response = await appointmentsApi.getTherapistAvailability(id, dateStr);
        setSlots(response.slots || []);
        setSelectedSlot(null);
      } catch (error) {
        console.error('Error fetching slots', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchSlots();
    }
  }, [id, selectedDateIdx]);

  const handleContinue = () => {
    if (selectedSlot) {
      router.push({
        pathname: `/booking/${id}/confirm`,
        params: { 
          slot_id: selectedSlot.availability_slot_id,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time
        }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Select Time
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 flex-row">
          {DATES.map((item, idx) => (
            <TouchableOpacity 
              key={idx}
              onPress={() => setSelectedDateIdx(idx)}
              className={`items-center justify-center w-16 h-20 rounded-xl border-2 mr-3 ${
                selectedDateIdx === idx ? 'bg-primary-fixed border-primary' : 'bg-surface-container-highest border-transparent'
              }`}
            >
              <Text className={`font-label-md mb-1 ${selectedDateIdx === idx ? 'text-primary' : 'text-on-surface-variant'}`}>{item.day}</Text>
              <Text className={`font-headline-md font-bold text-lg ${selectedDateIdx === idx ? 'text-primary' : 'text-on-surface'}`}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Available Slots</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#002da5" className="mt-8" />
        ) : slots.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {slots.map((slot, idx) => {
              const isSelected = selectedSlot?.availability_slot_id === slot.availability_slot_id;
              return (
                <TouchableOpacity
                  key={slot.availability_slot_id || idx}
                  onPress={() => setSelectedSlot(slot)}
                  className={`w-[48%] py-4 rounded-xl border-2 mb-4 items-center justify-center ${
                    isSelected ? 'bg-primary border-primary' : 'bg-surface-container-highest border-transparent'
                  }`}
                >
                  <Text className={`font-headline-md font-bold ${isSelected ? 'text-on-primary' : 'text-on-surface'}`}>
                    {format(parseISO(slot.start_time), 'hh:mm a')}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ) : (
          <View className="items-center py-12">
            <Text className="text-on-surface-variant text-center">No available slots for this date.</Text>
          </View>
        )}
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title="Continue to Confirm"
          onPress={handleContinue}
          disabled={!selectedSlot}
        />
      </View>
    </SafeAreaView>
  );
}
