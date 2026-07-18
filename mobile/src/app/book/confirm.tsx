import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { appointmentsApi } from '../../api/appointments';
import { userApi } from '../../api/user';
import { format } from 'date-fns';

export default function BookingConfirmationScreen() {
  const { counsellor_id, slot_id, session_type, slot_date } = useLocalSearchParams();
  const router = useRouter();

  const [therapist, setTherapist] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const data = await userApi.getTherapistById(counsellor_id as string);
        setTherapist(data);
      } catch (error) {
        console.error('Error fetching therapist:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (counsellor_id) fetchTherapist();
  }, [counsellor_id]);

  const handleConfirm = async () => {
    setIsBooking(true);
    try {
      await appointmentsApi.bookAppointment({
        counsellor_id: counsellor_id as string,
        availability_slot_id: slot_id as string,
        reason: `Session type: ${session_type}`
      });
      router.push('/book/success');
    } catch (error) {
      console.error('Error booking:', error);
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const dateObj = slot_date ? new Date(slot_date as string) : new Date();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full top-0 border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-40 bg-background">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-container-high">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-sm text-primary font-bold text-xl">SarvUday</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 py-6" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="flex-col gap-2 mb-8">
          <Text className="font-headline-sm text-ink-black font-bold text-2xl">Confirm Booking</Text>
          <Text className="font-body-md text-on-surface-variant">Please review your session details below.</Text>
        </View>

        <View className="bg-surface border-[1.5px] border-ink-black rounded-[24px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] flex-col gap-6">
          <View className="flex-row items-center gap-4 pb-4 border-b-[1.5px] border-ink-black/20">
            <Image 
              source={{ uri: therapist?.profile_pic_url || `https://api.dicebear.com/7.x/notionists/png?seed=${therapist?.user_id}` }} 
              className="w-16 h-16 rounded-full border-[1.5px] border-ink-black object-cover"
            />
            <View>
              <Text className="font-headline-sm text-ink-black font-bold text-lg">Dr. {therapist?.name}</Text>
              <Text className="font-body-md text-on-surface-variant">Therapist</Text>
            </View>
          </View>

          <View className="flex-col gap-4">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-accent-pink border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="calendar" size={20} color="#5a3039" />
              </View>
              <View>
                <Text className="font-label-md text-on-surface-variant text-sm">Date</Text>
                <Text className="font-label-bold text-ink-black font-bold text-base">{format(dateObj, 'EEEE, MMM dd, yyyy')}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-secondary-fixed border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="time" size={20} color="#725c00" />
              </View>
              <View>
                <Text className="font-label-md text-on-surface-variant text-sm">Time</Text>
                <Text className="font-label-bold text-ink-black font-bold text-base">{format(dateObj, 'hh:mm a')}</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-xl bg-accent-sage border-[1.5px] border-ink-black items-center justify-center">
                <Ionicons name="videocam" size={20} color="#1b1b20" />
              </View>
              <View>
                <Text className="font-label-md text-on-surface-variant text-sm">Session Type</Text>
                <Text className="font-label-bold text-ink-black font-bold text-base capitalize">{session_type} Consultation</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-accent-sage/20 border-[1.5px] border-ink-black rounded-[24px] p-6 mt-6 flex-col gap-4">
          <Text className="font-label-bold text-on-surface-variant uppercase tracking-wider text-xs font-bold">Payment Summary</Text>
          <View className="flex-row justify-between items-center">
            <Text className="font-body-md text-ink-black">Consultation Fee</Text>
            <Text className="font-body-md text-ink-black">${therapist?.session_fee || '120.00'}</Text>
          </View>
          <View className="flex-row justify-between items-center pb-4 border-b-[1.5px] border-ink-black/20">
            <Text className="font-body-md text-ink-black">Platform Fee</Text>
            <Text className="font-body-md text-ink-black">$5.00</Text>
          </View>
          <View className="flex-row justify-between items-center pt-2">
            <Text className="font-headline-sm text-ink-black font-bold text-xl">Total</Text>
            <Text className="font-headline-sm text-primary font-bold text-xl">${((therapist?.session_fee || 120) + 5).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 w-full p-6 pt-10 bg-background/90" style={{ backgroundColor: 'rgba(251, 248, 255, 0.95)' }}>
        <TouchableOpacity 
          onPress={handleConfirm}
          disabled={isBooking}
          className="w-full bg-primary border-[1.5px] border-ink-black rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#1A1A1A]"
        >
          {isBooking ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text className="text-white font-headline-sm font-bold text-lg">Confirm Booking</Text>
              <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
