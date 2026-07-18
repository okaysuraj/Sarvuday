import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CancelAppointmentScreen() {
  const router = useRouter();
  const [reason, setReason] = useState<string>('');

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="w-full top-0 bg-cream-bg border-b-[1.5px] border-ink-black flex-row justify-between items-center px-6 py-4 z-50">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full active:bg-surface-variant">
          <Ionicons name="arrow-back" size={24} color="#002da5" />
        </TouchableOpacity>
        <Text className="font-headline-md font-bold text-ink-black text-xl tracking-tighter">SarvUday</Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="flex-col gap-4 mb-8 text-center md:text-left">
          <Text className="font-display-lg-mobile text-ink-black font-bold text-4xl">Cancel Appointment</Text>
          <Text className="font-body-lg text-on-surface-variant text-lg">We understand that plans change. Please let us know why you're cancelling so we can better support you.</Text>
        </View>

        {/* Appointment Details Card */}
        <View className="bg-surface-container-low border-[1.5px] border-ink-black rounded-[24px] p-6 flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <View className="w-16 h-16 rounded-full border-[1.5px] border-ink-black bg-accent-sage items-center justify-center">
            <Ionicons name="person" size={32} color="#1A1A1A" />
          </View>
          <View className="flex-1">
            <Text className="font-headline-sm text-ink-black font-bold text-2xl">Dr. Alara Vance</Text>
            <Text className="font-body-md text-on-surface-variant text-base">Cognitive Behavioral Therapy</Text>
            <View className="flex-row items-center gap-2 mt-2">
              <Ionicons name="calendar" size={18} color="#002da5" />
              <Text className="font-label-bold text-primary font-bold">Oct 24, 2023 • 2:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Reason Selection */}
        <View className="flex-col gap-4 mb-6">
          <Text className="font-label-bold text-ink-black font-bold">Reason for cancellation</Text>
          
          <View className="flex-col sm:flex-row flex-wrap gap-4">
            
            <TouchableOpacity 
              onPress={() => setReason('schedule')}
              className={`flex-1 min-w-[200px] p-4 border-[1.5px] border-ink-black rounded-xl flex-row items-center gap-3 ${reason === 'schedule' ? 'bg-primary text-white' : 'bg-white text-ink-black'}`}
            >
              <Ionicons name="calendar-outline" size={24} color={reason === 'schedule' ? '#ffffff' : '#1A1A1A'} />
              <Text className={`font-body-md ${reason === 'schedule' ? 'text-white' : 'text-ink-black'}`}>Schedule Conflict</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setReason('health')}
              className={`flex-1 min-w-[200px] p-4 border-[1.5px] border-ink-black rounded-xl flex-row items-center gap-3 ${reason === 'health' ? 'bg-primary text-white' : 'bg-white text-ink-black'}`}
            >
              <Ionicons name="medkit-outline" size={24} color={reason === 'health' ? '#ffffff' : '#1A1A1A'} />
              <Text className={`font-body-md ${reason === 'health' ? 'text-white' : 'text-ink-black'}`}>Feeling Unwell</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setReason('financial')}
              className={`flex-1 min-w-[200px] p-4 border-[1.5px] border-ink-black rounded-xl flex-row items-center gap-3 ${reason === 'financial' ? 'bg-primary text-white' : 'bg-white text-ink-black'}`}
            >
              <Ionicons name="cash-outline" size={24} color={reason === 'financial' ? '#ffffff' : '#1A1A1A'} />
              <Text className={`font-body-md ${reason === 'financial' ? 'text-white' : 'text-ink-black'}`}>Financial Reasons</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setReason('other')}
              className={`flex-1 min-w-[200px] p-4 border-[1.5px] border-ink-black rounded-xl flex-row items-center gap-3 ${reason === 'other' ? 'bg-primary text-white' : 'bg-white text-ink-black'}`}
            >
              <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color={reason === 'other' ? '#ffffff' : '#1A1A1A'} />
              <Text className={`font-body-md ${reason === 'other' ? 'text-white' : 'text-ink-black'}`}>Other</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Additional Notes */}
        <View className="flex-col gap-2 mb-6">
          <Text className="font-label-bold text-ink-black font-bold">Additional Notes (Optional)</Text>
          <TextInput 
            className="w-full bg-[#f9f8f3] border-[1.5px] border-ink-black rounded-xl p-4 font-body-md text-ink-black min-h-[100px] text-left align-top focus:border-primary"
            placeholder="Is there anything you'd like your therapist to know?"
            placeholderTextColor="#434655"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Warning Banner */}
        <View className="bg-accent-orange border-[1.5px] border-ink-black rounded-[24px] p-6 flex-row items-start gap-4 mb-8">
          <Ionicons name="warning" size={28} color="#ba1a1a" />
          <View className="flex-1">
            <Text className="font-headline-sm text-ink-black font-bold text-xl mb-1">Cancellation Policy</Text>
            <Text className="font-body-md text-ink-black">Cancellations made less than 24 hours before the appointment are subject to a 50% fee. By proceeding, you acknowledge this policy.</Text>
          </View>
        </View>

        {/* Actions */}
        <View className="flex-col sm:flex-row gap-4 pt-6 border-t-[1.5px] border-ink-black">
          <TouchableOpacity 
            className="flex-1 bg-white border-[1.5px] border-ink-black rounded-xl px-8 py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center"
            onPress={() => router.back()}
          >
            <Text className="font-label-bold text-ink-black font-bold text-lg">Keep Appointment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 bg-error border-[1.5px] border-ink-black rounded-xl px-8 py-4 shadow-[4px_4px_0px_0px_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none items-center justify-center flex-row gap-2"
          >
            <Ionicons name="close-circle" size={24} color="#ffffff" />
            <Text className="font-label-bold text-white font-bold text-lg">Cancel Session</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
