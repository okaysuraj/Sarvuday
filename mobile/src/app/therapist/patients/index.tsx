import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TherapistPatientsListScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const res = await fetch('http://10.0.2.2:8000/counsellor/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          // Extract unique patients from appointments
          const patientMap = new Map();
          if (json.appointments) {
            json.appointments.forEach((appt: any) => {
              if (appt.normal_user && !patientMap.has(appt.normal_user.user_id)) {
                patientMap.set(appt.normal_user.user_id, {
                  id: appt.normal_user.user_id,
                  name: appt.normal_user.name || 'Unknown Patient',
                  status: 'Active',
                  nextSession: new Date(appt.start_time).toLocaleDateString(),
                  risk: 'Low' // mock risk level since backend doesn't provide it yet
                });
              }
            });
          }
          setPatients(Array.from(patientMap.values()));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size="large" color="#002da5" />
      </SafeAreaView>
    );
  }

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
        {filteredPatients.length > 0 ? filteredPatients.map(patient => (
          <TouchableOpacity 
            key={patient.id}
            onPress={() => router.push(`/counsellor/patient/${patient.id}`)}
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
        )) : (
          <View className="items-center justify-center py-10">
            <Text className="font-body-md text-on-surface-variant">No patients found.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
