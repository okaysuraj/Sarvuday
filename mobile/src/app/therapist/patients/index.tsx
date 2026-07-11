import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MOCK_PATIENTS = [
  { id: '1', name: 'Alex Johnson', status: 'Active', nextSession: 'Oct 14, 10:00 AM', risk: 'Low' },
  { id: '2', name: 'Maria Garcia', status: 'Alert', nextSession: 'Oct 15, 2:00 PM', risk: 'High' },
  { id: '3', name: 'David Smith', status: 'Active', nextSession: 'Oct 16, 11:30 AM', risk: 'Medium' },
];

export default function TherapistPatientsListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-row items-center px-4 py-3 border-b border-surface-variant bg-surface">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 justify-center">
          <Ionicons name="arrow-back" size={24} color="#1b1b20" />
        </TouchableOpacity>
        <Text className="font-headline-md text-on-surface font-bold text-xl ml-2 flex-1">
          My Patients
        </Text>
      </View>

      <View className="px-6 py-4">
        <View className="flex-row items-center bg-surface-container-highest rounded-full px-4 py-2 mb-4">
          <Ionicons name="search" size={20} color="#747687" className="mr-2" />
          <TextInput
            className="flex-1 font-body-md text-on-surface py-2"
            placeholder="Search patients..."
            placeholderTextColor="#747687"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {MOCK_PATIENTS.map(patient => (
          <TouchableOpacity 
            key={patient.id}
            onPress={() => router.push(`/therapist/patients/${patient.id}`)}
            className="bg-surface-container-highest p-4 rounded-xl mb-4 border border-outline-variant flex-row items-center"
          >
            <View className="w-12 h-12 rounded-full bg-surface-variant items-center justify-center mr-4">
              <Ionicons name="person" size={24} color="#747687" />
            </View>
            <View className="flex-1">
              <Text className="font-headline-md text-on-surface font-bold text-lg">{patient.name}</Text>
              <Text className="font-body-md text-on-surface-variant text-sm">Next: {patient.nextSession}</Text>
            </View>
            
            {patient.risk === 'High' && (
              <View className="w-3 h-3 rounded-full bg-error" />
            )}
            {patient.risk === 'Medium' && (
              <View className="w-3 h-3 rounded-full bg-secondary" />
            )}
            
            <Ionicons name="chevron-forward" size={20} color="#747687" className="ml-3" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
