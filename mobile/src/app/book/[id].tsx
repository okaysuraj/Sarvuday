import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appointmentsApi } from '../../api/appointments';
import { userApi } from '../../api/user';
import { format, addDays } from 'date-fns';

export default function BookAppointmentScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [sessionType, setSessionType] = useState<string | null>(null);
  
  const [therapist, setTherapist] = useState<any>(null);
  const [isLoadingTherapist, setIsLoadingTherapist] = useState(true);

  // Step 2 State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<any[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const data = await userApi.getTherapistById(id as string);
        setTherapist(data);
      } catch (error) {
        console.error('Error fetching therapist:', error);
      } finally {
        setIsLoadingTherapist(false);
      }
    };
    if (id) fetchTherapist();
  }, [id]);

  useEffect(() => {
    if (step === 2) {
      const fetchSlots = async () => {
        setIsLoadingSlots(true);
        try {
          const dateStr = format(selectedDate, 'yyyy-MM-dd');
          const data = await appointmentsApi.getTherapistAvailability(id as string, dateStr);
          // Suppose data returns { available_slots: [] }
          setSlots(data?.available_slots || []);
        } catch (error) {
          console.error('Error fetching slots:', error);
          setSlots([]);
        } finally {
          setIsLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [step, selectedDate, id]);

  const handleBook = async () => {
    if (!selectedSlot) return;
    router.push({
      pathname: '/book/confirm',
      params: {
        counsellor_id: id as string,
        slot_id: selectedSlot.availability_slot_id || selectedSlot.id,
        session_type: sessionType,
        slot_date: selectedSlot.date || selectedSlot.start_time
      }
    });
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  if (isLoadingTherapist) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full top-0 border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-40 bg-background">
        <TouchableOpacity 
          onPress={() => step === 2 ? setStep(1) : router.back()} 
          className="p-2 rounded-full active:bg-surface-container-high"
        >
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-lg">
          {step === 1 ? 'Choose Session Type' : 'Select a Time'}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        {step === 1 && (
          <View className="flex-col gap-6">
            <View className="items-center mb-4">
              <Text className="font-headline-sm text-ink-black font-bold text-2xl text-center">Choose Session Type</Text>
              <Text className="font-body-md text-on-surface-variant text-center mt-2">Select the format that best suits your needs today.</Text>
            </View>

            {/* Video */}
            <TouchableOpacity 
              onPress={() => setSessionType('video')}
              className={`p-6 border-[1.5px] border-ink-black rounded-[24px] ${sessionType === 'video' ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-surface shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <View className={`w-16 h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 ${sessionType === 'video' ? 'bg-white' : 'bg-accent-sage'}`}>
                <Ionicons name="videocam" size={28} color={sessionType === 'video' ? '#002da5' : '#1A1A1A'} />
              </View>
              <Text className={`font-headline-sm font-bold text-xl mb-2 ${sessionType === 'video' ? 'text-white' : 'text-ink-black'}`}>Video Session</Text>
              <Text className={`font-body-md ${sessionType === 'video' ? 'text-white opacity-90' : 'text-on-surface-variant'}`}>Connect face-to-face with your therapist from the comfort of your home.</Text>
            </TouchableOpacity>

            {/* Audio */}
            <TouchableOpacity 
              onPress={() => setSessionType('audio')}
              className={`p-6 border-[1.5px] border-ink-black rounded-[24px] ${sessionType === 'audio' ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-surface shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <View className={`w-16 h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 ${sessionType === 'audio' ? 'bg-white' : 'bg-accent-orange'}`}>
                <Ionicons name="call" size={28} color={sessionType === 'audio' ? '#002da5' : '#1A1A1A'} />
              </View>
              <Text className={`font-headline-sm font-bold text-xl mb-2 ${sessionType === 'audio' ? 'text-white' : 'text-ink-black'}`}>Audio Session</Text>
              <Text className={`font-body-md ${sessionType === 'audio' ? 'text-white opacity-90' : 'text-on-surface-variant'}`}>A focused voice-only conversation, ideal for privacy or lower bandwidth.</Text>
            </TouchableOpacity>

            {/* In-person */}
            <TouchableOpacity 
              onPress={() => setSessionType('inperson')}
              className={`p-6 border-[1.5px] border-ink-black rounded-[24px] ${sessionType === 'inperson' ? 'bg-primary shadow-[4px_4px_0px_0px_#1A1A1A]' : 'bg-surface shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
            >
              <View className={`w-16 h-16 rounded-full border-[1.5px] border-ink-black flex items-center justify-center mb-4 ${sessionType === 'inperson' ? 'bg-white' : 'bg-accent-pink'}`}>
                <Ionicons name="location" size={28} color={sessionType === 'inperson' ? '#002da5' : '#1A1A1A'} />
              </View>
              <Text className={`font-headline-sm font-bold text-xl mb-2 ${sessionType === 'inperson' ? 'text-white' : 'text-ink-black'}`}>In-person Session</Text>
              <Text className={`font-body-md ${sessionType === 'inperson' ? 'text-white opacity-90' : 'text-on-surface-variant'}`}>Visit our clinic for a traditional, face-to-face therapeutic environment.</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View className="flex-col gap-6">
            <View className="bg-white border-[1.5px] border-ink-black rounded-2xl p-4 flex-row items-center gap-4 shadow-[4px_4px_0px_0px_#1A1A1A]">
              <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
                 <Ionicons name="person" size={24} color="#1b1b20" />
              </View>
              <View>
                <Text className="font-label-bold text-ink-black font-bold">Dr. {therapist?.name || 'Therapist'}</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mt-1">{sessionType} Consult</Text>
              </View>
            </View>

            {/* Calendar Strip */}
            <View className="flex-col gap-2">
              <Text className="font-label-bold text-ink-black font-bold">{format(selectedDate, 'MMMM yyyy')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4 pt-2 -mx-6 px-6">
                {generateDates().map((d, i) => {
                  const isSelected = format(d, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  return (
                    <TouchableOpacity 
                      key={i} 
                      onPress={() => setSelectedDate(d)}
                      className={`min-w-[64px] h-[80px] border-[1.5px] border-ink-black rounded-xl items-center justify-center mr-3 ${isSelected ? 'bg-accent-orange shadow-[2px_2px_0px_0px_#1A1A1A]' : 'bg-white shadow-[4px_4px_0px_0px_#1A1A1A]'}`}
                    >
                      <Text className={`font-label-md uppercase text-xs ${isSelected ? 'text-ink-black' : 'text-on-surface-variant'}`}>{format(d, 'eee')}</Text>
                      <Text className={`font-headline-sm font-bold ${isSelected ? 'text-ink-black' : 'text-on-surface'}`}>{format(d, 'dd')}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Time Slots */}
            <View className="flex-col gap-4">
              <Text className="font-label-bold text-ink-black font-bold">Available Slots</Text>
              
              {isLoadingSlots ? (
                <ActivityIndicator size="small" color="#002da5" />
              ) : slots.length > 0 ? (
                <View className="flex-row flex-wrap gap-3">
                  {slots.map((slot, idx) => {
                    const isSelected = selectedSlot?.id === slot.id || selectedSlot?.availability_slot_id === slot.availability_slot_id;
                    return (
                      <TouchableOpacity 
                        key={idx} 
                        onPress={() => setSelectedSlot(slot)}
                        className={`border-[1.5px] border-ink-black rounded-full px-4 py-2 ${isSelected ? 'bg-primary' : 'bg-surface hover:bg-surface-variant'}`}
                      >
                        <Text className={`font-body-md ${isSelected ? 'text-white' : 'text-ink-black'}`}>
                           {format(new Date(slot.start_time || slot.date), 'hh:mm a')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                <View className="p-4 border border-dashed border-ink-black rounded-xl items-center">
                  <Text className="text-on-surface-variant">No slots available for this date.</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 w-full p-6 pt-10 bg-background/90" style={{ backgroundColor: 'rgba(251, 248, 255, 0.95)' }}>
        {step === 1 ? (
          <TouchableOpacity 
            onPress={() => sessionType ? setStep(2) : null}
            disabled={!sessionType}
            className={`w-full border-[1.5px] border-ink-black rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A] ${sessionType ? 'bg-primary' : 'bg-surface-variant opacity-50'}`}
          >
            <Text className="text-white font-headline-sm font-bold text-lg">Continue Setup</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-label-bold text-on-surface text-sm">{format(selectedDate, 'MMM dd, eee')}</Text>
              <Text className="font-body-lg text-primary font-bold text-xl">
                {selectedSlot ? format(new Date(selectedSlot.start_time || selectedSlot.date), 'hh:mm a') : 'Select Time'}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={handleBook}
              disabled={!selectedSlot || isBooking}
              className={`bg-primary text-on-primary border-[1.5px] border-ink-black rounded-full px-8 py-3 shadow-[4px_4px_0px_0px_#1A1A1A] ${(!selectedSlot || isBooking) ? 'opacity-50' : ''}`}
            >
              {isBooking ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-label-bold font-bold">Confirm</Text>}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
