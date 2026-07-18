import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { trackingApi } from '../../api/tracking';
import { format } from 'date-fns';

export default function MedicationScreen() {
  const [medications, setMedications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const data = await trackingApi.getMedications();
      setMedications(data || []);
    } catch (error) {
      console.error('Error fetching medications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMedication = (id: string) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, is_taken: !m.is_taken } : m));
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <ActivityIndicator size="large" color="#002da5" />
      </View>
    );
  }

  const takenCount = medications.filter(m => m.is_taken).length;
  const progress = medications.length > 0 ? (takenCount / medications.length) * 100 : 0;

  return (
    <View className="flex-1 bg-cream-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4 w-full border-b-[1.5px] border-ink-black bg-cream-bg z-50">
        <View className="w-10" />
        <Text className="font-headline-sm text-primary font-bold text-xl uppercase tracking-tighter">Medication Plan</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full border-[1.5px] border-ink-black bg-accent-sage flex items-center justify-center">
           <Ionicons name="person" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View className="mb-8">
          <Text className="font-headline-md text-ink-black font-bold text-2xl mb-1">Medication Plan</Text>
          <Text className="font-body-md text-on-surface-variant">Prescribed by Dr. Sarah Chen • Updated 2 days ago</Text>
        </View>

        {/* Schedule */}
        <View className="bg-white border-[1.5px] border-ink-black rounded-[32px] p-6 shadow-[4px_4px_0px_0px_#1A1A1A] mb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-headline-sm text-ink-black font-bold text-lg">Today's Schedule</Text>
            <View className="bg-accent-sage px-4 py-1 rounded-full border-[1.5px] border-ink-black">
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">{format(new Date(), 'MMM dd')}</Text>
            </View>
          </View>

          <View className="flex-col gap-4">
            {medications.map(med => (
              <TouchableOpacity 
                key={med.id}
                onPress={() => toggleMedication(med.id)}
                className={`flex-row items-center justify-between p-4 border-[1.5px] border-ink-black rounded-2xl bg-[#fbf8ff] ${med.is_taken ? 'shadow-[4px_4px_0px_0px_#1A1A1A] bg-surface-container' : ''}`}
              >
                <View className="flex-row items-center gap-4">
                  <View className={`w-8 h-8 border-[1.5px] border-ink-black rounded-lg flex items-center justify-center ${med.is_taken ? 'bg-secondary-container' : 'bg-white'}`}>
                    {med.is_taken && <Ionicons name="checkmark" size={20} color="#1A1A1A" />}
                  </View>
                  <View>
                    <Text className="font-label-bold text-ink-black font-bold">{med.name}</Text>
                    <Text className="font-body-md text-on-surface-variant text-xs">{med.dosage} • {med.schedule}</Text>
                  </View>
                </View>
                <Ionicons name={med.schedule.toLowerCase().includes('night') ? "moon" : "sunny"} size={20} color="#747687" />
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-8">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">Daily Progress</Text>
              <Text className="font-label-bold text-ink-black font-bold text-xs uppercase">{Math.round(progress)}%</Text>
            </View>
            <View className="h-4 w-full bg-surface-container border-[1.5px] border-ink-black rounded-full overflow-hidden">
              <View className="h-full bg-secondary-container" style={{ width: `${progress}%` }} />
            </View>
          </View>
        </View>

        {/* Detailed Meds */}
        <View className="flex-col gap-4">
          {medications.map((med, idx) => (
            <View key={med.id} className={`border-[1.5px] border-ink-black rounded-[40px] p-6 flex-col justify-between shadow-[4px_4px_0px_0px_#1A1A1A] ${idx % 2 === 0 ? 'bg-accent-pink' : 'bg-accent-orange'}`}>
              <View>
                <View className="flex-row justify-between items-start mb-4">
                  <View className="p-3 bg-white rounded-2xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A]">
                    <Ionicons name="medkit" size={24} color="#002da5" />
                  </View>
                </View>
                <Text className="font-headline-sm text-ink-black font-bold text-xl">{med.name.split(' ')[0]}</Text>
                <Text className="font-body-md text-on-surface-variant">{med.type} • {med.dosage}</Text>
              </View>
              <View className="mt-6 flex-row justify-between items-end">
                <View>
                  <Text className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Refill Status</Text>
                  <Text className="font-label-bold text-ink-black font-bold">{med.refill_days} days left</Text>
                </View>
                <TouchableOpacity className="bg-primary text-white px-6 py-2 rounded-xl border-[1.5px] border-ink-black shadow-[2px_2px_0px_0px_#1A1A1A] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
                  <Text className="font-label-bold text-white font-bold">Refill</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
