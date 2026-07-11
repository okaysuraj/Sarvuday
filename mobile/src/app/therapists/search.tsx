import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appointmentsApi } from '../../api/appointments';
import { useDebounce } from 'use-debounce'; // Assuming we might want to debounce later, but for now simple state

export default function TherapistSearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTherapists = async () => {
      setIsLoading(true);
      try {
        const results = await appointmentsApi.searchTherapists(debouncedQuery);
        setTherapists(results || []);
      } catch (error) {
        console.error('Error fetching therapists:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTherapists();
  }, [debouncedQuery]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          Find a Therapist
        </Text>
        <TouchableOpacity className="w-10 h-10 justify-center items-end">
          <Ionicons name="options" size={24} color="#1b1b20" />
        </TouchableOpacity>
      </View>

      <View className="px-6 py-4">
        <View className="flex-row items-center bg-surface-container-highest rounded-full px-4 py-2 mb-6 border border-outline-variant">
          <Ionicons name="search" size={20} color="#747687" className="mr-2" />
          <TextInput
            className="flex-1 font-body-md text-on-surface py-2"
            placeholder="Search by name, specialty..."
            placeholderTextColor="#747687"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false} horizontal className="mb-6 h-10 flex-grow-0">
          {['All', 'Anxiety', 'Depression', 'Relationships', 'Trauma'].map((tag, idx) => (
            <TouchableOpacity 
              key={idx} 
              className={`px-4 py-2 rounded-full mr-3 border ${idx === 0 ? 'bg-primary border-primary' : 'bg-surface border-outline-variant'}`}
            >
              <Text className={`font-label-bold ${idx === 0 ? 'text-on-primary' : 'text-on-surface'}`}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6">
        {isLoading ? (
          <ActivityIndicator size="large" color="#002da5" className="mt-8" />
        ) : therapists.length > 0 ? (
          therapists.map(therapist => (
            <TouchableOpacity 
              key={therapist.user_id}
              onPress={() => router.push(`/therapists/${therapist.user_id}`)}
              className="bg-surface-container-highest p-4 rounded-xl mb-4 border border-outline-variant flex-row"
            >
              <View className="w-20 h-20 rounded-lg bg-surface-variant items-center justify-center mr-4">
                <Ionicons name="person" size={40} color="#747687" />
              </View>
              <View className="flex-1">
                <Text className="font-headline-md text-on-surface font-bold text-lg mb-1">{therapist.name}</Text>
                <Text className="font-body-md text-on-surface-variant text-sm mb-2" numberOfLines={1}>
                  {therapist.specializations?.join(', ') || 'General Counselor'}
                </Text>
                <View className="flex-row justify-between items-center mt-auto">
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#ebc22e" className="mr-1" />
                    <Text className="font-label-bold text-on-surface text-xs">{therapist.average_rating || '5.0'}</Text>
                    <Text className="font-body-md text-on-surface-variant text-xs ml-1">({therapist.total_reviews || '0'})</Text>
                  </View>
                  <Text className="font-headline-md text-primary font-bold text-sm">${therapist.session_fee || '80'}/session</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View className="items-center py-12">
            <Text className="text-on-surface-variant text-center">No therapists found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
