import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components/CustomButton';
import { appointmentsApi } from '../../../api/appointments';
import { format, parseISO } from 'date-fns';

export default function BookingConfirmationScreen() {
  const { id, slot_id, start_time, end_time } = useLocalSearchParams<{ id: string, slot_id: string, start_time: string, end_time: string }>();
  const router = useRouter();
  
  const [therapist, setTherapist] = useState<any>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await appointmentsApi.getTherapistProfile(id as string);
        setTherapist(profile);
      } catch (error) {
        console.error('Error fetching therapist profile', error);
      } finally {
        setIsPageLoading(false);
      }
    };
    if (id) loadProfile();
  }, [id]);

  const handleConfirm = async () => {
    setIsBooking(true);
    try {
      await appointmentsApi.bookAppointment({ 
        counsellor_id: id as string, 
        availability_slot_id: slot_id as string 
      });
      
      Alert.alert(
        'Booking Confirmed', 
        'Your session has been successfully scheduled.',
        [{ text: 'View Appointments', onPress: () => router.replace('/(tabs)/appointments') }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Booking Failed', 'Unable to confirm appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  if (isPageLoading) {
    return (
      <View className="flex-1 bg-surface justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const sessionFee = therapist?.session_fee || 80;
  const platformFee = 2.50;
  const total = sessionFee + platformFee;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Review & Confirm
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-6 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-surface-variant items-center justify-center mr-4">
            <Ionicons name="person" size={32} color="#747687" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-md text-on-surface font-bold text-lg">{therapist?.name || 'Therapist'}</Text>
            <Text className="font-body-md text-on-surface-variant text-sm">{therapist?.specializations?.join(', ') || 'General Consultation'}</Text>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Session Details</Text>
        <View className="bg-surface-container-highest rounded-xl border border-outline-variant mb-6 overflow-hidden">
          <View className="p-4 flex-row items-center border-b border-surface-variant">
            <Ionicons name="calendar-outline" size={24} color="#1b1b20" className="mr-4" />
            <View>
              <Text className="font-label-md text-on-surface-variant text-xs mb-1">Date</Text>
              <Text className="font-headline-md text-on-surface font-bold">{start_time ? format(parseISO(start_time as string), 'MMM dd, yyyy') : ''}</Text>
            </View>
          </View>
          <View className="p-4 flex-row items-center border-b border-surface-variant">
            <Ionicons name="time-outline" size={24} color="#1b1b20" className="mr-4" />
            <View>
              <Text className="font-label-md text-on-surface-variant text-xs mb-1">Time</Text>
              <Text className="font-headline-md text-on-surface font-bold">{start_time ? format(parseISO(start_time as string), 'hh:mm a') : ''}</Text>
            </View>
          </View>
          <View className="p-4 flex-row items-center">
            <Ionicons name="videocam-outline" size={24} color="#1b1b20" className="mr-4" />
            <View>
              <Text className="font-label-md text-on-surface-variant text-xs mb-1">Type</Text>
              <Text className="font-headline-md text-on-surface font-bold">Video Consultation ({therapist?.session_duration || 50}m)</Text>
            </View>
          </View>
        </View>

        <Text className="font-headline-md text-on-surface text-lg font-bold mb-4">Payment Summary</Text>
        <View className="bg-surface-container-highest p-4 rounded-xl border border-outline-variant mb-8">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-body-md text-on-surface-variant">Session Fee</Text>
            <Text className="font-body-md text-on-surface font-bold">${sessionFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between items-center pb-4 border-b border-surface-variant">
            <Text className="font-body-md text-on-surface-variant">Platform Fee</Text>
            <Text className="font-body-md text-on-surface font-bold">${platformFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between items-center pt-4">
            <Text className="font-headline-md text-on-surface font-bold text-lg">Total</Text>
            <Text className="font-headline-md text-primary font-bold text-lg">${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="p-6 border-t border-surface-variant bg-surface">
        <CustomButton 
          title={`Confirm & Pay $${total.toFixed(2)}`}
          onPress={handleConfirm}
          isLoading={isBooking}
        />
      </View>
    </SafeAreaView>
  );
}
